import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const OfferingsSection = () => html`
  <section id="offerings">
    <h2 class="section-heading">
      We carry a variety of new, pre&#8209;loved, and vintage pieces.
    </h2>
    <${ScrollingImageCarousel}>
      <${ResponsiveImage}
        src="/img/offerings/ColorfulAccessories.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/offerings/Floralshoulderdetaildress.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/offerings/Accessories2.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/offerings/SparkleDressandBag.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/offerings/DavidJefferyBag2.jpg"
        alt=""
      />
    </${ScrollingImageCarousel}>
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
    <a href="/offerings" class="action-btn primary">View more product!</a>
  </section>
`;

OfferingsSection.css = css`
  #offerings {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .section-heading {
      margin-block-end: var(--space-m-l);
    }

    .carousel-container {
      margin-block-end: var(--space-l);
    }

    .offering-list {
      font-weight: 500;
      font-style: italic;
      font-size: var(--font-size-xs);

      li {
        display: inline;
      }

      li:not(:last-child)::after {
        /* Decorative separator between items: star + wbr char (word break opportunity)
           to ensure we allow a break between the star and the first word of the next list item */
        content: "✦\\200b" / "";
        font-weight: bold;
        font-size: var(--font-size-s);
        margin-inline: var(--space-2xs);
      }
    }
  
    .action-btn {
      margin-block-start: var(--space-m);
    }
  }
`;
