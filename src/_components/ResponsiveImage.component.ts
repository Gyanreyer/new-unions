import { html, type YetiComponent } from "yeti-js";
import sharp from 'sharp';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir } from "node:fs/promises";

const srcsetWidths = [240, 480, 720, 1080, 1920];

export const ResponsiveImage: YetiComponent<{
  src: string;
  alt: string;
  loading?: "eager" | "lazy" | "auto";
}> = async ({ src, alt, loading = "lazy", ...spreadAttrs }) => {
  const imageFilePath = fileURLToPath(import.meta.resolve(join('../public', src)));

  const sharpImage = sharp(imageFilePath);
  const imageMetadata = await sharpImage.metadata();

  const resizePromises = new Array<Promise<{
    width: number;
    height: number;
    format: string;
    src: string;
  }>>();
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

  const outputInfo = await Promise.all(resizePromises);

  return html`
    <img
      src=${src}
      alt=${alt}
      srcset=${outputInfo.map(info => `${info.src} ${info.width}w`).join(', ')}
      sizes="auto"
      width=${imageMetadata.width}
      height=${imageMetadata.height}
      loading=${loading}
      ...${spreadAttrs}
    />
  `;
};