import { css, html, type YetiComponent } from "yeti-js";
import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { ScrollableList } from "../../_components/ScrollableList/ScrollableList.ts";

export type ProductSectionImage = {
  src: string;
  alt: string;
  caption: string | ReturnType<typeof html>;
};

export const ProductSection: YetiComponent<{
  id: string;
  title: string;
  description: string | ReturnType<typeof html>;
  link?: {
    text: string;
    href: string;
  };
  priceRange: string | ReturnType<typeof html>;
  images: ProductSectionImage[];
}> = ({
  id,
  title,
  description,
  link,
  priceRange,
  images,
}) => html`<section id=${id} class="product-section">
  <h2>${title}</h2>
  <p class="description">${description}</p>
  <p class="additional-info">
    <span class="price-range" aria-label="Price range">${priceRange}</span>
    ${link ? html`<a href="${link.href}" class="product-link">${link.text}</a>` : ""}
  </p>
  <${ScrollableList} label="${title} photos" next-label="Next photos" prev-label="Previous photos">
    ${images.map((image) => html`<li>
      <figure>
        <${ResponsiveImage} src=${image.src} alt=${image.alt} />
        <figcaption>
          <span class="caption-text">${image.caption}</span>
        </figcaption>
      </figure>
    </li>`
)}
  </${ScrollableList}>
</section>`;

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
    img {
      display: block;
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      border-radius: 16px;
    }

    figure {
      position: relative;
      overflow: clip;
      border-radius: 16px;
      margin: 0;
    }

    figcaption {
      font-size: var(--font-size-s);
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--orange) 60%, transparent);
      color: white;
      padding: var(--space-s) var(--space-xs);
      display: flex;
      align-items: safe center;
      justify-content: safe center;
      text-align: center;
      overflow-y: auto;

      visibility: hidden;
      opacity: 0;
      transition-property: visibility, opacity;
      transition-duration: 0.3s;

      .caption-text {
        translate: 0 var(--space-xs);
        transition-property: translate;
        transition-duration: inherit;
      }

      figure:hover & {
        visibility: visible;
        opacity: 1;

        .caption-text {
          translate: 0 0;
        }
      }
    }
  }
`;