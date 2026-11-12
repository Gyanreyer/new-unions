import { css, html, js, type YetiComponent } from "yeti-js";
import { Icon } from "../../_components/Icon.component.ts";
import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { RovingFocus } from "../../_components/RovingFocus/RovingFocus.ts";
import { ScrollableList } from "../../_components/ScrollableList/ScrollableList.ts";

export type ProductSectionImage = {
  src: string;
  alt: string;
  caption: string | ReturnType<typeof html>;
};

export type ProductSectionConfig = {
  id: string;
  title: string;
  description: string | ReturnType<typeof html>;
  link?: {
    text: string;
    href: string;
  };
  priceRange: string | ReturnType<typeof html>;
  images: ProductSectionImage[];
}

export const ProductSection: YetiComponent<{
  config: ProductSectionConfig;
}> = ({
  config: {
    id,
    title,
    description,
    link,
    priceRange,
    images,
  },
}) => {
    const rovingFocusId = `${id}-photos`;

    return html`<section id=${id} class="product-section">
  <h2>${title}</h2>
  <p class="description">${description}</p>
  <p class="additional-info">
    <span class="price-range" aria-label="Price range">${priceRange}</span>
    ${link ? html`<a href="${link.href}" class="product-link">${link.text}</a>` : ""}
  </p>
  <${RovingFocus} id=${rovingFocusId}>
    <${ScrollableList} label="${title} photos" next-label="Next ${title} photos" prev-label="Previous ${title} photos">
      ${images.map((image, i) => {
      const captionId = `${id}-caption-${i + 1}`;

      return html`<li>
          <product-photo>
            <figure>
              <${ResponsiveImage} src=${image.src} alt=${image.alt} />
              <figcaption id=${captionId}>
                <span class="caption-text">${image.caption}</span>
              </figcaption>
            </figure>
            <button
              type="button" class="caption-toggle"
              aria-expanded="false" aria-controls=${captionId}
              data-roving-focus-id=${rovingFocusId}
            >
              <${Icon} name="info" class="icon-open" aria-hidden="true" />
              <${Icon} name="close" class="icon-close" aria-hidden="true" />
              <span class="visually-hidden">Caption</span>
            </button>
          </product-photo>
        </li>`;
    })}
    </${ScrollableList}>
  </${RovingFocus}>
</section>`;
  };

ProductSection.css = css`
  .product-section {
    margin-block: var(--space-m) var(--space-l);

    h2 {
      font-size: var(--font-size-2xl);
      text-decoration: 2px underline;
      text-underline-offset: var(--space-xs);
      margin-block-end: var(--space-xs);
    }

    .additional-info {
      margin-block: var(--space-3xs) var(--space-xs);
      display: flex;
      align-items: center;
      gap: var(--space-s);
    }

    .price-range {
      font-weight: bold;
    }

    .product-link {
      text-decoration: underline;
      text-underline-offset: 0.25em;
      font-style: italic;
      font-size: var(--font-size-s);
    }
  }

  .product-section scrollable-list li {
    product-photo {
      display: block;
      position: relative;

      --caption-toggle-size: var(--space-l);
    }

    img {
      display: block;
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 2 / 3;
      object-fit: cover;
      border-radius: 16px;
    }

    figure {
      position: relative;
      overflow: clip;
      border-radius: 16px;
      margin: 0;
    }

    /*
     * Hidden with opacity alone (not visibility), so screen readers always
     * read the caption, open or not.
     */
    figcaption {
      font-size: var(--font-size-s);
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--orange) 75%, transparent);
      color: white;
      /* Bottom padding keeps text clear of the toggle button */
      padding: var(--space-s) var(--space-xs) calc(var(--space-s) + var(--caption-toggle-size));
      display: flex;
      align-items: safe center;
      justify-content: safe center;
      text-align: center;
      overflow-y: auto;

      opacity: 0;
      pointer-events: none;
      transition-property: opacity;
      transition-duration: 0.3s;

      .caption-text {
        translate: 0 var(--space-xs);
        transition-property: translate;
        transition-duration: inherit;
      }
    }

    @media (hover: hover) {
      figure:hover figcaption {
        opacity: 1;
        pointer-events: auto;

        .caption-text {
          translate: 0 0;
        }
      }
    }

    product-photo:has(.caption-toggle[aria-expanded="true"]) figcaption {
      /**
       * Show caption overlay if the toggle is expanded
       */
      opacity: 1;
      pointer-events: auto;

      .caption-text {
        translate: 0 0;
      }
    }

    /*
     * The toggle is for touch and keyboard users; mouse users get the
     * caption on hover. It's hidden (but still focusable) otherwise.
     */
    .caption-toggle {
      position: absolute;
      inset-block-end: var(--space-2xs);
      inset-inline-end: var(--space-2xs);
      z-index: 1;
      display: grid;
      place-items: center;
      inline-size: var(--caption-toggle-size);
      block-size: var(--caption-toggle-size);
      padding: 0;
      border: none;
      border-radius: 50%;
      color: white;
      background-color: rgb(0 0 0 / 0.55);
      backdrop-filter: blur(4px);
      cursor: pointer;

      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;

      &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }

      svg {
        inline-size: 70%;
        block-size: 70%;
      }

      &[aria-expanded="true"] .icon-open,
      &[aria-expanded="false"] .icon-close {
        display: none;
      }
    }

    @media (any-pointer: coarse) {
      /** Show the caption toggle for touch devices */
      .caption-toggle {
        opacity: 1;
        pointer-events: auto;
      }
    }

    /** If a caption toggle is actively expanded, make sure the button is visible */
    .caption-toggle[aria-expanded="true"] {
      opacity: 1;
      pointer-events: auto;
    }
  }

  /* If keyboard focus is on any of the caption toggles, show all of them */
  .product-section ul:has(.caption-toggle:focus-visible) .caption-toggle {
    opacity: 1;
    pointer-events: auto;
  }

  /**
   * Hide caption toggle buttons if the product photo component JS
   * hasn't set up their functionality yet.
   * Unfortunately if something goes wrong, captions will just not be accessible
   * other than by mouse hover interactions.
   */
  .product-section product-photo:not(:defined) .caption-toggle {
    display: none;
  }
`;

ProductSection.js = js`
  ${js.import("./product-photo.ts")}
`;
