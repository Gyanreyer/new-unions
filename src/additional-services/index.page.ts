import { css, html, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeading } from "../_components/SecondaryPageMainSectionHeading.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-08-16",
};

const AdditionalServicesPage: YetiPageComponent = ({
  page
}) => html`<${PageBorderLayout} url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeading}>
      Looking for the final touches?
    </${SecondaryPageMainSectionHeading}>
    <div class="services-grid-row styling">
      <div class="image-column">
        <${ResponsiveImage} src="/img/offerings/ColorfulBeadedDresses.jpg" alt="" />
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
        <${ResponsiveImage} src="/img/offerings/ColorfulBeadedDresses.jpg" alt="" />
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
          Drop your garment off during our retail hours
        </p>
      </div>
    </div>
  </main>
</${PageBorderLayout}>`;

AdditionalServicesPage.css = css`
  .services-grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-l-xl);
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
      position: relative;
      overflow: hidden;
      border-radius: 24px;

      img {
        display: block;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        width: 100%;
        height: auto;
      }
    }
  }

  .services-grid-row.steaming {
    .text-overlay {
      position: absolute;
      inset: 0;
      padding-block: var(--space-m);
      padding-inline: var(--space-l);
      background-color: rgba(0, 0, 0, 0.4);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      row-gap: var(--space-s);

      h3 {
        font-size: var(--font-size-m);
      }

      p {
        font-size: var(--font-size-s);
      }

      .disclaimer {
        font-size: var(--font-size-xs);
        margin-block-start: var(--space-2xs);
      }
    }

    .dropoff {
      font-weight: bold;
      font-style: italic;
      text-decoration: underline;
      font-size: var(--font-size-xl);
      margin-block-start: var(--space-m);
    }
  }
`;

export default AdditionalServicesPage;