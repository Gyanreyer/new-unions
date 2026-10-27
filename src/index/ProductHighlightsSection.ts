import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const ProductHighlightsSection = () => html`
<section id="product-highlights">
  <h2 class="section-heading">
    We carry a variety of new, pre&#8209;loved, and vintage pieces.
  </h2>
  <${ScrollingImageCarousel}>
    <${ResponsiveImage}
      src="/img/offerings/ColorfulAccessories.jpg"
      alt="A predominantly green, black, and gold display of accessories including a necktie, jewelry, and a lipstick case."
    />
    <${ResponsiveImage}
      src="/img/offerings/Floralshoulderdetaildress.jpg"
      alt="A close-up shot of the floral shoulder detailing on a white wedding dress on a rack."
    />
    <${ResponsiveImage}
      src="/img/offerings/Accessories2.jpg"
      alt="A predominantly white and gold display of various accessories including jewelry, a handbag, and a lipstick case."
    />
    <${ResponsiveImage}
      src="/img/offerings/SparkleDressandBag.jpg"
      alt="A close-up shot of the shoulder of a sparkly sequined wedding gown and a beaded white handbag with a red heart and gold detailing."
    />
    <${ResponsiveImage}
      src="/img/offerings/DavidJefferyBag2.jpg"
      alt="An elaborately beaded flower handbag with red, white, blue, and green beads forming petals radiating out from the center."
    />
    <${ResponsiveImage}
        src="/img/store/store-interior-mannequin-dress.jpg"
        alt="A mannequin wearing a short white wedding dress with a pearl necklace and a floral headpiece."
    />
  </${ScrollingImageCarousel}>
  <a href="/products/" class="action-btn secondary">See something you&rsquo;d like to try on?</a>
</section>
`;

ProductHighlightsSection.css = css`
  #product-highlights {
    text-align: center;

    .section-heading {
      font-size: var(--font-size-xl);
      text-align: center;
      margin-block-end: var(--space-m-l);
    }

    .action-btn {
      margin-block-start: var(--space-l-xl);
    }
  }
`;