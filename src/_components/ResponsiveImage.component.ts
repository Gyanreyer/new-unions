import { css, html, type YetiComponent } from "yeti-js";
import sharp from "sharp";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const srcsetWidths = [240, 360, 420, 480, 600, 720, 1080, 1920];

// Cloudflare's /cdn-cgi/image/ transforms only work on the newunionsbridal.com zone.
// Preview deploys and local dev/builds don't have them, so we'll disable image transforms in those environments.
// A Cloudflare production deploy will be running against the `main` branch, so we can enable image transforms only when building `main` in CI.
const useImageTransforms = process.env.WORKERS_CI_BRANCH === "main";

interface ImageMetadata {
  width: number;
  height: number;
}

// In-memory cache so an image used on multiple pages only has its header parsed once per build.
const metadataCache = new Map<string, Promise<ImageMetadata>>();

async function getImageMetadata(imageFilePath: string): Promise<ImageMetadata> {
  // sharp().metadata() only parses the image header — no decode/resize/encode — so this is
  // cheap even though we read the file. This is the only build-time work left per image.
  const buffer = await readFile(imageFilePath);
  const { width, height } = await sharp(buffer).metadata();
  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error(`Could not read dimensions for image ${imageFilePath}`);
  }
  return { width, height };
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

    let metadataPromise = metadataCache.get(src);
    if (!metadataPromise) {
      metadataPromise = getImageMetadata(imageFilePath);
      metadataCache.set(src, metadataPromise);
    }
    const { width, height } = await metadataPromise;

    // Only offer srcset candidates that don't exceed source width
    const candidateWidths = srcsetWidths.filter((w) => w < width);
    candidateWidths.push(width);

    const srcset = candidateWidths
      // Using Cloudflare image transform params: https://developers.cloudflare.com/images/transform-images/transform-via-url/
      // Targets the given width, not scaling up past the source dimensions,
      // and automatically negotiate the best format to serve at 80/100 quality
      .map((w) => `/cdn-cgi/image/fit=scale-down,width=${w},q=80,format=auto${src} ${w}w`)
      .join(", ");

    return html`
      <img
        src=${src}
        alt=${alt}
        ...${useImageTransforms ? { srcset, sizes } : {}}
        width=${width}
        height=${height}
        loading=${loading}
        data-responsive-image
        onerror="this.setAttribute('data-load-failed','')"
        ...${spreadAttrs}
      />`;
  } catch (err) {
    console.error(`Error processing image ${src}:`, err);
    return html`<div style="outline:2px dashed red;color:red;font-weight:bold;">
      Error loading image
    </div>`;
  }
};

ResponsiveImage.css = css`
/* Putting alt text styling into critical bundle instead of components bundle
   because basically every page uses images and we don't really want a flash text */
${css.bundle("critical")}
/*
 * Hide alt text while the image loads, so slow connections don't flash it.
 * Screen readers still read it. It comes back if the image fails to load.
 */
img[data-responsive-image] {
  color: transparent;
}

img[data-responsive-image][data-load-failed] {
  color: inherit;
}
`;
