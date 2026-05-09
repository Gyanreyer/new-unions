import { html, type YetiComponent } from "yeti-js";
import sharp from 'sharp';
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir } from "node:fs/promises";

const srcsetWidths = [240, 480, 720, 1080, 1920];

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
  };
}

// Use a cache to avoid redundant processing of the same image if it's used multiple times across the site.
const processedImageCache = new Map<string, Promise<ProcessedImageData> | ProcessedImageData>();

async function ensureDir(filePath: string) {
  const outputDir = dirname(filePath);
  try {
    await access(outputDir);
  } catch {
    await mkdir(outputDir, { recursive: true });
  }
}

const LEADING_IMG_DIR_REGEX = /^\/?img\//;

export const ResponsiveImage: YetiComponent<{
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | "auto";
}> = async ({ src, alt, loading = "lazy", ...spreadAttrs }) => {
  const imageFilePath = fileURLToPath(import.meta.resolve(join('../public', src)));

  let imageMetadata: sharp.Metadata;
  let resizedOriginalFormatImages: ResizedImageResultInfo[];
  let resizedWebpImages: ResizedImageResultInfo[];

  const cachedResult = processedImageCache.get(src);
  if (cachedResult) {
    const result = cachedResult instanceof Promise ? await cachedResult : cachedResult;
    imageMetadata = result.metadata;
    resizedOriginalFormatImages = result.images.originalFormat;
    resizedWebpImages = result.images.webp;
  } else {
    const sharpImage = sharp(imageFilePath);
    imageMetadata = await sharpImage.metadata();

    const extension = extname(src);
    // Slice off the file extension and remove any leading "/img" directory from the source path to create a consistent base
    // for output paths.
    const srcWithoutExtension = src.slice(0, -extension.length).replace(LEADING_IMG_DIR_REGEX, '');

    const resizePromises = new Array<Promise<ResizedImageResultInfo>>();
    const webpPromises = new Array<Promise<ResizedImageResultInfo>>();
    for (const srcsetWidth of srcsetWidths) {
      if (srcsetWidth >= imageMetadata.width) {
        // Skip widths larger than the original
        break;
      }

      resizePromises.push(
        (async () => {
          const outputSrc = join('/img', `${srcWithoutExtension}.${srcsetWidth}w${extension}`);
          const outputFilePath = fileURLToPath(import.meta.resolve(join('../../_site', outputSrc)));
          await ensureDir(outputFilePath);
          const outputInfo = await sharpImage.resize(srcsetWidth).toFile(outputFilePath);
          return {
            width: outputInfo.width,
            height: outputInfo.height,
            format: outputInfo.format,
            src: outputSrc,
          };
        })(),
      );

      webpPromises.push(
        (async () => {
          const outputSrc = join('/img', `${srcWithoutExtension}.${srcsetWidth}w.webp`);
          const outputFilePath = fileURLToPath(import.meta.resolve(join('../../_site', outputSrc)));
          await ensureDir(outputFilePath);
          const outputInfo = await sharpImage.resize(srcsetWidth).webp().toFile(outputFilePath);
          return {
            width: outputInfo.width,
            height: outputInfo.height,
            format: outputInfo.format,
            src: outputSrc,
          };
        })(),
      );
    }

    const combinedResizePromise = Promise.all([
      Promise.all(resizePromises),
      Promise.all(webpPromises),
    ]).then(([resizedResults, webpResults]) => {
      const processedImageData: ProcessedImageData = {
        metadata: imageMetadata,
        images: {
          originalFormat: resizedResults,
          webp: webpResults,
        },
      };
      processedImageCache.set(src, processedImageData);
      return processedImageData;
    });
    processedImageCache.set(src, combinedResizePromise);
    ({
      images: {
        originalFormat: resizedOriginalFormatImages,
        webp: resizedWebpImages,
      }
    } = await combinedResizePromise);
  }

  return html`
    <picture>
      <source
        type="image/webp"
        srcset=${resizedWebpImages.map(info => `${info.src} ${info.width}w`).join(', ')}
        sizes="auto"
      />
      <img
        src=${src}
        alt=${alt}
        srcset=${resizedOriginalFormatImages.map(info => `${info.src} ${info.width}w`).join(', ')}
        sizes="auto"
        width=${imageMetadata.width}
        height=${imageMetadata.height}
        loading=${loading}
        ...${spreadAttrs}
      />
    </picture>
  `;
};