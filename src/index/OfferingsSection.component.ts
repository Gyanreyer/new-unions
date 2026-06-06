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
    <ul class="offering-list">
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
    <a href="/offerings" class="action-btn secondary">See more of our offerings</a>
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
      /* Line-height 1 makes column rules less crazy; we'll just use bigger row gaps to compensate */
      line-height: 1;
      max-width: 720px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      column-gap: var(--space-m);
      row-gap: var(--space-2xs);

      /* Try to use gap decorations to add a separator line between each
         list item without having to worry about trailing separators at the end of rows.
         Browser support is low, so in the meantime we'll fall back to the uglier option of just
         living with trailing separators */
      column-rule: 2px solid currentColor;

      @supports not (column-rule-break: intersection) {
        column-gap: 0;

        li:not(:last-child)::after {
          content: "|";
          margin: 0 var(--space-xs);
        }
      }
    }
  
    .action-btn {
      margin-block-start: var(--space-m);
    }
  }
`;
