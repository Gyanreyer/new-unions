import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

const productHighlightImages: {
  src: string;
  alt: string;
}[] = [
    {
      src: "/img/lucy/LCD-ATOMIC_BLOOM-334.jpg",
      alt: "Two people wearing Lucy Can't Dance dresses"
    },
    {
      src: "/img/loulette/Loulette_PaintedBlushGown.webp",
      alt: "A person wearing a Loulette Painted Blush Gown"
    }
  ];

export const ProductHighlightsSection = () => html`
<section id="product-highlights">
  <h2 class="section-heading">
    We carry a variety of new, vintage, & handmade pieces.
  </h2>
  <p class="section-subheading">
    Our size range is 0 to 30, with samples of many sizes to try on in store.
    Our store is a <strong><em>queer friendly and size inclusive space</em></strong>. Bridal made to order, made to measure, and off the rack styles are all included in our range!
  </p>
  <${ScrollingImageCarousel}>
    ${productHighlightImages.map((image) => html`
      <${ResponsiveImage} src=${image.src} alt=${image.alt} />
    `)}
  </${ScrollingImageCarousel}>
  <a href="/products/" class="action-btn secondary">See something you&rsquo;d like to try on?</a>
</section>
`;

ProductHighlightsSection.css = css`
  #product-highlights {
    text-align: center;

    .section-heading {
      font-size: var(--font-size-xl);
      margin-block-end: var(--space-s);
    }

    .section-subheading {
      margin-inline: auto;
      margin-block-end: var(--space-m-l);
      text-wrap: balance;
      max-width: 48ch;
    }

    .action-btn {
      margin-block-start: var(--space-l-xl);
    }
  }
`;