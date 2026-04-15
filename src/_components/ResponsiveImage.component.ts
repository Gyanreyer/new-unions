import { html, type YetiComponent } from "yeti-js";
import sharp from 'sharp';
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, mkdir } from "node:fs/promises";

const srcsetWidths = [200, 400, 720, 1080];

export const ResponsiveImage: YetiComponent<{
  src: string;
  alt: string;
}> = async ({ src, alt, ...spreadAttrs }) => {
  const imageFilePath = fileURLToPath(import.meta.resolve(join('../public', src)));

  const sharpImage = sharp(imageFilePath);
  const [imageMetadata, ...outputInfo] = await Promise.all([
    sharpImage.metadata(),
    ...srcsetWidths.map(async (width) => {
      const outputSrc = join(`/img/${width}w`, src);
      const outputFilePath = fileURLToPath(import.meta.resolve(join('../../_site', outputSrc)));
      const outputDir = dirname(outputFilePath);
      try {
        await access(outputDir);
      } catch {
        await mkdir(outputDir, { recursive: true });
      }
      const outputInfo = await sharpImage.resize(width).toFile(outputFilePath);
      return {
        width: outputInfo.width,
        height: outputInfo.height,
        format: outputInfo.format,
        src: outputSrc,
      };
    }),
  ]);

  return html`
    <img
      src=${src}
      alt=${alt}
      srcset=${outputInfo.map(info => `${info.src} ${info.width}w`).join(', ')}
      sizes="auto"
      width=${imageMetadata.width}
      height=${imageMetadata.height}
      ...${spreadAttrs}
    />
  `;
};