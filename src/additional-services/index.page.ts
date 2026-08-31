import { css, html, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-08-16",
};

const AdditionalServicesPage: YetiPageComponent = ({
  page
}) => html`<${PageBorderLayout} url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>Looking for the final touches?</h1>
    </${SecondaryPageMainSectionHeader}>
    <div class="services-grid-row styling">
      <div class="image-column">
        <${ResponsiveImage} src="/img/store/veil_close_up.webp" alt="" />
      </div>
      <div class="text-column">
        <h2>Looking for styling help?</h2>
        <p>
          If you already have your main wedding outfit,
          but you are still in need of a bit of sparkle,
          we would love to help you! From veils to accessories,
          let us help you complete your look.
        </p>
        <a href="mailto:hello@newunionsbridal.com" class="action-btn primary">Send us an email to book</a>
      </div>
    </div>
    <div class="services-grid-row steaming">
      <div class="image-column">
        <${ResponsiveImage} src="/img/store/dresses_on_rack.jpg" alt="" />
        <div class="text-overlay" id="steaming-service-pricing">
          <div>
            <h3>Basic Steam $59</h3>
            <p>
              (Formal gown, bridesmaid dress)<br/>
              Includes linen garment bag
            </p>
          </div>
          <div>
            <h3>Bridal Steam $89–$99</h3>
            <p>(Simple bridal gown, price assessed on complexity of garment)</p>
            <p>Includes veil steaming</p>
            <p>Includes linen garment bag</p>
          </div>
          <div>
            <h3>Ball Gown Steam $150–$200</h3>
            <p>(Ball gown bridal gown, price assessed on complexity of garment)</p>
            <p>Includes veil steaming</p>
            <p aria-details="oversized-bags-disclaimer">Includes linen garment bag*</p>
            <p class="disclaimer" id="oversized-bags-disclaimer">
              *We do not carry oversized bags. If your gown requires this, you will not be charged for a garment bag
            </p>
          </div>
          <p>
            As with all steaming services, once the gown is placed in the bag, we cannot guarantee it will stay perfect. Please allow your garment to be laid out before your event.
          </p>
        </div>
      </div>
      <div class="text-column" aria-describedby="steaming-service-pricing">
        <h2>Need a dress steamed?</h2>
        <p>
          Purchase your look elsewhere, but need some help making it perfect?
          We steam wedding gowns and other formal wear too!
        </p>
        <p>
          (Drop off minimum 2 weeks before event)
        </p>
        <p class="dropoff">
          <a href="/#hours">
            Drop your garment off during our retail hours
          </a>
        </p>
      </div>
    </div>
  </main>
</${PageBorderLayout}>`;

AdditionalServicesPage.css = css`
  main {
    max-inline-size: 1200px;
    margin-inline: auto;
  }

  .services-grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-l-xl);
    row-gap: var(--space-m);
    margin-block-end: var(--space-l);

    .text-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      text-wrap: pretty;

      h2 {
        margin-block-end: var(--space-s);
      }

      .action-btn {
        margin-block-start: var(--space-m);
      }
    }

    .image-column {
      display: grid;
      overflow: hidden;
      border-radius: 24px;

      /* Stack the image and any overlay in the same cell, so the column's
         height is whichever is taller: the square image or the overlay text */
      > * {
        grid-area: 1 / 1;
      }

      img {
        display: block;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &:not(:last-of-type) {
      margin-block-end: var(--space-l);

      @media (max-width: 1500px) {
        margin-block-end: var(--space-2xl);
      }
    }
  }

  .services-grid-row.styling {
    img {
      object-position: top;
    }
  }

  .services-grid-row.steaming {
    .text-overlay {
      padding-block: var(--space-l);
      padding-inline: var(--space-l);
      backdrop-filter: blur(2px);
      background-color: rgb(0 0 0 / 0.4);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      row-gap: var(--space-s);

      h3 {
        font-size: var(--font-size-l);
      }

      p {
        font-size: var(--font-size-s);
      }

      .disclaimer {
        font-size: var(--font-size-2xs);
        margin-block-start: var(--space-2xs);
      }
    }

    .dropoff {
      font-weight: bold;
      font-style: italic;
      text-decoration: underline;
      font-size: var(--font-size-l);
      margin-block-start: var(--space-m);
    }
  }

  @media (max-width: 1500px) {
    .services-grid-row {
      grid-template-columns: 1fr;

      .text-column {
        order: -1;
      }

      .image-column {
        img {
          aspect-ratio: 10 / 5;
        }
      }

      &.steaming .image-column {
        /* Un-stack the text overlay so it displays as a card with the image at the top and text at the bottom */
        > * {
          grid-area: auto;
        }

        .text-overlay {
          /** Remove backdrop blur and lighten the background color for the card */
          backdrop-filter: none;
          background-color: rgb(0 0 0 / 0.25);
        }
      }
    }
  }
`;

export default AdditionalServicesPage;