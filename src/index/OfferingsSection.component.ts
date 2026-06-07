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
    <div class="offering-list" role="list" aria-label="Offerings">
      <span role="listitem">Bridal Gowns</span><span role="separator">✦</span>
      <span role="listitem">Short Wedding Dresses</span><span role="separator">✦</span>
      <span role="listitem">Colorful Wedding Dresses</span><span role="separator">✦</span>
      <span role="listitem">Bridal Jumpsuits</span><span role="separator">✦</span>
      <span role="listitem">Bridal Separates</span><span role="separator">✦</span>
      <span role="listitem">Vintage Wedding Dresses</span><span role="separator">✦</span>
      <span role="listitem">Unique Wedding Outfits</span><span role="separator">✦</span>
      <span role="listitem">Traditional &amp; Colorful Veils</span><span role="separator">✦</span>
      <span role="listitem">Accessories</span><span role="separator">✦</span>
      <span role="listitem">Bridal Capes &amp; Jackets</span><span role="separator">✦</span>
      <span role="listitem">Headpieces</span><span role="separator">✦</span>
      <span role="listitem">Jewelry</span><span role="separator">✦</span>
      <span role="listitem">Purses</span><span role="separator">✦</span>
      <span role="listitem">Wedding Gifts</span>
    </div>
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
      font-size: var(--font-size-2xs)

      text-wrap: balance;

      span {
        display: inline-block;

        &:not(:first-child) {
          margin-inline-start: var(--space-2xs);
        }
        &:not(:last-child) {
          margin-inline-end: var(--space-2xs);
        }
      }
    }
  
    .action-btn {
      margin-block-start: var(--space-m);
    }
  }
`;
