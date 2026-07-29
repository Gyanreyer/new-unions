import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { JumpsuitSpotlightSection } from "./JumpsuitSpotlightSection.component.ts";

export const OfferingsSection = () => html`
  <section id="offerings">
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
    <${JumpsuitSpotlightSection} />
    <ul class="offering-list" role="list" aria-label="Offerings">
      <li>Bridal Gowns</li>
      <li>Short Wedding Dresses</li>
      <li>Colorful Wedding Dresses</li>
      <li>Bridal Jumpsuits</li>
      <li>Bridal Separates</li>
      <li>Vintage Wedding Dresses</li>
      <li>Unique Wedding Outfits</li>
      <li>Traditional &amp; Colorful Veils</li>
      <li>Accessories</li>
      <li>Bridal Capes &amp; Jackets</li>
      <li>Headpieces</li>
      <li>Jewelry</li>
      <li>Purses</li>
      <li>Wedding Gifts</li>
    </ul>
  </section>
`;

OfferingsSection.css = css`
  #offerings {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2.section-heading {
      margin-block-end: var(--space-m-l);
    }

    .carousel-container {
      margin-block-end: var(--space-xl);
    }

    .offering-list {
      font-weight: 500;
      font-style: italic;
      font-size: var(--font-size-xs);
      margin-block-start: var(--space-l);

      li {
        display: inline;
      }

      li:not(:last-child)::after {
        /* Decorative separator between items: star + wbr char (word break opportunity)
           to ensure we allow a break between the star and the first word of the next list item */
        content: "✦\\200b" / "";
        font-weight: 700;
        font-size: var(--font-size-s);
        margin-inline: var(--space-2xs);
      }
    }
  }
`;
