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
    <p class="subtext">
      Long &amp; Short Dresses&nbsp;|&nbsp;Bridal Separates&nbsp;|&nbsp;
      Unique Wedding Outfits&nbsp;|&nbsp;Veils&nbsp;|&nbsp;Accessories
    </p>
  </section>
`;

OfferingsSection.css = css`
  ${css.bundle("home")}
  #offerings {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: var(--space-m-l);
    text-align: center;

    .subtext {
      font-weight: 500;
      max-width: 600px;
    }
  }
`;