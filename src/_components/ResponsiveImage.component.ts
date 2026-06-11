import { html, type YetiComponent } from "yeti-js";
import sharp from "sharp";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const srcsetWidths = [240, 480, 600, 720, 1080, 1920];

const WEBP_QUALITY = 80;
const AVIF_QUALITY = 50;
// Bump this whenever the encoding settings above change (widths, quality, formats, etc.)
// so that previously-cached output files on disk are invalidated and regenerated.
const CACHE_SETTINGS_VERSION = "v1";

interface ResizedImageResultInfo {
  width: number;
  height: number;
  format: string;
  src: string;
}

interface ProcessedImageData {
  metadata: sharp.Metadata;
  images: {
    originalFormat: ResizedImageResultInfo[];
    webp: ResizedImageResultInfo[];
    avif: ResizedImageResultInfo[];
  };
}

// In-memory cache to avoid redundant processing of the same image when it's used multiple
// times within a single build run. The on-disk hashed output files (see resizeToFile) are
// what make caching survive across separate build processes.
const processedImageCache = new Map<
  string,
  Promise<ProcessedImageData> | ProcessedImageData
>();

async function ensureDir(filePath: string) {
  const outputDir = dirname(filePath);
  try {
    await access(outputDir);
  } catch {
    await mkdir(outputDir, { recursive: true });
  }
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const LEADING_IMG_DIR_REGEX = /^\/?img\//;

interface ResizeToFileArgs {
  sharpImage: sharp.Sharp;
  metadata: sharp.Metadata;
  srcWithoutExtension: string;
  srcsetWidth: number;
  hash: string;
  extension: string;
  format: "webp" | "avif" | "source";
}

/**
 * Resize the source image to a single width/format and write it to disk, skipping the
 * (expensive) resize + encode + write entirely when a file with the matching content hash
 * already exists. The hash is part of the filename, so a changed source produces a new name
 * and any genuinely stale cache entry is bypassed.
 */
async function resizeToFile({
  sharpImage,
  metadata,
  srcWithoutExtension,
  srcsetWidth,
  hash,
  extension,
  format,
}: ResizeToFileArgs): Promise<ResizedImageResultInfo> {
  let outputExtension: string;
  switch (format) {
    case "webp":
      outputExtension = ".webp";
      break;
    case "avif":
      outputExtension = ".avif";
      break;
    case "source":
    default:
      outputExtension = extension;
      break;
  }
  const outputSrc = join(
    "/img",
    `${srcWithoutExtension}.${srcsetWidth}w.${hash}${outputExtension}`,
  );
  const outputFilePath = fileURLToPath(
    import.meta.resolve(join("../../_site", outputSrc)),
  );

  if (await fileExists(outputFilePath)) {
    // A matching cached file already exists, so skip processing. The srcset only needs the
    // width descriptor; derive the height from the original aspect ratio for completeness.
    const expectedHeight = Math.round(
      metadata.height * (srcsetWidth / metadata.width),
    );

    return {
      width: srcsetWidth,
      height: expectedHeight,
      format: format === "source" ? metadata.format : format,
      src: outputSrc,
    };
  }

  await ensureDir(outputFilePath);
  // Clone the pipeline per output: a sharp instance is a stateful pipeline, so reusing one
  // across concurrent resize operations corrupts shared state.
  let pipeline = sharpImage.clone().resize(srcsetWidth);
  switch (format) {
    case "webp":
      pipeline = pipeline.webp({ quality: WEBP_QUALITY });
      break;
    case "avif":
      pipeline = pipeline.avif({ quality: AVIF_QUALITY });
      break;
    case "source":
    default:
      // Don't change the format; just resize.
      break;
  }

  const outputInfo = await pipeline.toFile(outputFilePath);
  return {
    width: outputInfo.width,
    height: outputInfo.height,
    format: outputInfo.format,
    src: outputSrc,
  };
}

async function processImage(
  src: string,
  imageFilePath: string,
): Promise<ProcessedImageData> {
  // Read the source once so we can both hash its bytes and feed those same bytes to sharp.
  const buffer = await readFile(imageFilePath);
  const hash = createHash("sha256")
    .update(new Uint8Array(buffer))
    .update(CACHE_SETTINGS_VERSION)
    .digest("hex")
    .slice(0, 8);

  const sharpImage = sharp(buffer);
  const metadata = await sharpImage.metadata();

  const extension = extname(src);
  // Slice off the file extension and remove any leading "/img" directory from the source path
  // to create a consistent base for output paths.
  const srcWithoutExtension = src
    .slice(0, -extension.length)
    .replace(LEADING_IMG_DIR_REGEX, "");

  const resizePromises = new Array<Promise<ResizedImageResultInfo>>();
  const webpPromises = new Array<Promise<ResizedImageResultInfo>>();
  const avifPromises = new Array<Promise<ResizedImageResultInfo>>();
  for (const srcsetWidth of srcsetWidths) {
    if (srcsetWidth >= metadata.width) {
      // Skip widths larger than the original
      break;
    }

    resizePromises.push(
      resizeToFile({
        sharpImage,
        metadata,
        srcWithoutExtension,
        srcsetWidth,
        hash,
        extension,
        format: "source",
      }),
    );
    webpPromises.push(
      resizeToFile({
        sharpImage,
        metadata,
        srcWithoutExtension,
        srcsetWidth,
        hash,
        extension,
        format: "webp",
      }),
    );
    avifPromises.push(
      resizeToFile({
        sharpImage,
        metadata,
        srcWithoutExtension,
        srcsetWidth,
        hash,
        extension,
        format: "avif",
      }),
    );
  }

  const [resizedResults, webpResults, avifResults] = await Promise.all([
    Promise.all(resizePromises),
    Promise.all(webpPromises),
    Promise.all(avifPromises),
  ]);

  return {
    metadata,
    images: {
      originalFormat: resizedResults,
      webp: webpResults,
      avif: avifResults,
    },
  };
}

export const ResponsiveImage: YetiComponent<{
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | "auto";
  sizes?: string;
}> = async ({ src, alt, loading = "lazy", sizes = "auto", ...spreadAttrs }) => {
  try {
    const imageFilePath = fileURLToPath(
      import.meta.resolve(join("../public", src)),
    );

    let result: ProcessedImageData;
    const cachedResult = processedImageCache.get(src);
    if (cachedResult) {
      result =
        cachedResult instanceof Promise ? await cachedResult : cachedResult;
    } else {
      // Register the in-flight promise synchronously (before any await) so that concurrent
      // renders of the same image await this single promise instead of each starting their
      // own processing pass.
      const processingPromise = processImage(src, imageFilePath);
      processedImageCache.set(src, processingPromise);
      result = await processingPromise;
      // Swap the resolved value in so later lookups don't need to await.
      processedImageCache.set(src, result);
    }

    const imageMetadata = result.metadata;
    const resizedOriginalFormatImages = result.images.originalFormat;
    const resizedWebpImages = result.images.webp;
    const resizedAvifImages = result.images.avif;

    return html`
      <picture>
        <source
          type="image/avif"
          srcset=${resizedAvifImages
        .map((info) => `${info.src} ${info.width}w`)
        .join(", ")}
          sizes=${sizes}
        />
        <source
          type="image/webp"
          srcset=${resizedWebpImages
        .map((info) => `${info.src} ${info.width}w`)
        .join(", ")}
          sizes=${sizes}
        />
        <img
          src=${src}
          alt=${alt}
          srcset=${resizedOriginalFormatImages
        .map((info) => `${info.src} ${info.width}w`)
        .join(", ")}
          sizes=${sizes}
          width=${imageMetadata.width}
          height=${imageMetadata.height}
          loading=${loading}
          ...${spreadAttrs}
        />
      </picture>
    `;
  } catch (err) {
    console.error(`Error processing image ${src}:`, err);
    return html`<div style="outline:2px dashed red;color:red;font-weight:bold;">
      Error loading image
    </div>`;
  }
};
