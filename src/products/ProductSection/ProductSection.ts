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
        <figcaption>${image.caption}</figcaption>
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
      text-underline-offset: var(--space-2xs);
      margin-block-end: var(--space-2xs);
    }

    .additional-info {
      margin-block: var(--space-3xs) var(--space-xs);
      display: flex;
      align-items: center;
    }

    .price-range {
      font-weight: bold;
    }

    .separator {
      display: inline-block;
      height: 1.2em;
      border-inline-start: 1px solid currentColor;
      margin-inline: var(--space-s);
    }

    .product-link {
      text-decoration: underline;
      text-underline-offset: 0.25em;
      font-style: italic;
      margin-inline-start: var(--space-s);
    }
  }

  .product-section scrollable-list li {
    img {
      display: block;
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
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
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--orange) 50%, transparent);
      color: white;
      padding: var(--space-2xs);
      display: flex;
      align-items: center;
      justify-content: center;

      visibility: hidden;
      opacity: 0;
      transition: visibility 0.3s, opacity 0.3s;

      figure:hover & {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;