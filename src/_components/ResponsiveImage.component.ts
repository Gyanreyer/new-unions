import { html, type YetiComponent } from "yeti-js";
import sharp from 'sharp';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir } from "node:fs/promises";

const srcsetWidths = [240, 480, 720, 1080, 1920];

interface ResizedImageResultInfo {
  width: number;
  height: number;
  format: string;
  src: string;
}

// Use a cache to avoid redundant processing of the same image if it's used multiple times across the site.
const processedImageCache = new Map<string, Promise<{
  metadata: sharp.Metadata;
  resizedImages: ResizedImageResultInfo[]
}> | {
  metadata: sharp.Metadata;
  resizedImages: ResizedImageResultInfo[]
}>();

export const ResponsiveImage: YetiComponent<{
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | "auto";
}> = async ({ src, alt, loading = "lazy", ...spreadAttrs }) => {
  const imageFilePath = fileURLToPath(import.meta.resolve(join('../public', src)));

  let imageMetadata: sharp.Metadata;
  let resizedImages: ResizedImageResultInfo[];

  const cachedResult = processedImageCache.get(src);
  if (cachedResult) {
    const result = cachedResult instanceof Promise ? await cachedResult : cachedResult;
    imageMetadata = result.metadata;
    resizedImages = result.resizedImages;
  } else {
    const sharpImage = sharp(imageFilePath);
    imageMetadata = await sharpImage.metadata();

    const resizePromises = new Array<Promise<ResizedImageResultInfo>>();
    for (const srcsetWidth of srcsetWidths) {
      if (srcsetWidth >= imageMetadata.width) {
        // Skip widths larger than the original
        break;
      }

      resizePromises.push(
        (async () => {
          const outputSrc = join(`/img/${srcsetWidth}w`, src);
          const outputFilePath = fileURLToPath(import.meta.resolve(join('../../_site', outputSrc)));
          const outputDir = dirname(outputFilePath);
          try {
            await access(outputDir);
          } catch {
            await mkdir(outputDir, { recursive: true });
          }
          const outputInfo = await sharpImage.resize(srcsetWidth).toFile(outputFilePath);
          return {
            width: outputInfo.width,
            height: outputInfo.height,
            format: outputInfo.format,
            src: outputSrc,
          };
        })(),
      );
    }

    const combinedResizePromise = Promise.all(resizePromises).then((results) => {
      const processedImageData = {
        metadata: imageMetadata,
        resizedImages: results,
      };
      processedImageCache.set(src, processedImageData);
      return processedImageData;
    });
    processedImageCache.set(src, combinedResizePromise);
    ({ resizedImages } = await combinedResizePromise);
  }

  return html`
    <img
      src=${src}
      alt=${alt}
      srcset=${resizedImages.map(info => `${info.src} ${info.width}w`).join(', ')}
      sizes="auto"
      width=${imageMetadata.width}
      height=${imageMetadata.height}
      loading=${loading}
      ...${spreadAttrs}
    />
  `;
};