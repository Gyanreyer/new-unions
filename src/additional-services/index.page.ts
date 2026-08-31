import { css, html, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { SteamingMenu, SteamingMenuButton } from "./SteamingMenu.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-08-31",
};

const AdditionalServicesPage: YetiPageComponent = ({
  page
}) => html`<${PageBorderLayout} url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>Looking for the final touches?</h1>
    </${SecondaryPageMainSectionHeader}>
    <section class="service-section styling" itemprop="makesOffer" itemscope itemtype="https://schema.org/Offer">
      <div class="text-column" itemprop="itemOffered" itemscope itemtype="https://schema.org/Service">
        <meta itemprop="name" content="Bridal styling services" />
        <meta itemprop="serviceType" content="Bridal styling" />

        <h2>Looking for styling help?</h2>
        <p itemprop="description">
          If you already have your main wedding outfit
          but you are still in need of a bit of sparkle,
          we would love to help you! From veils to accessories,
          let us help you complete your look.
        </p>
        <a href="mailto:hello@newunionsbridal.com" class="action-btn primary">Send us an email to book</a>
      </div>
      <aside>
        <${ResponsiveImage} src="/img/store/veil_close_up.webp" alt="" />
      </aside>
    </section>
    <section class="service-section steaming" itemprop="makesOffer" itemscope itemtype="https://schema.org/Offer">
      <div class="text-column" itemprop="itemOffered" itemscope itemtype="https://schema.org/Service">
        <meta itemprop="name" content="Dress steaming services" />
        <meta itemprop="serviceType" content="Dress steaming" />

        <h2>Need a dress steamed?</h2>
        <p itemprop="description">
          Purchase your look elsewhere but need some help making it perfect?
          We steam wedding gowns and other formal wear too!
        </p>
        <p>
          (Drop off minimum 2 weeks before event)
        </p>
        <${SteamingMenuButton}>
          View our steaming menu
        </${SteamingMenuButton}>
        <${SteamingMenu} />
      </div>
      <aside>
        <${ResponsiveImage} src="/img/store/dresses_on_rack.jpg" alt="" />
      </aside>
    </section>
  </main>
</${PageBorderLayout}>`;

AdditionalServicesPage.css = css`
  main {
    max-inline-size: 1200px;
    margin-inline: auto;
  }

  .service-section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: var(--space-2xl);
    row-gap: var(--space-m);

    h2 {
      margin-block-end: var(--space-s);
      font-size: var(--font-size-2xl);
    }
    
    .text-column {
      flex: 1 1 300px;
    }

    aside {
      flex: 0.6 1 300px;

      img {
        display: block;
        inline-size: 100%;
        block-size: auto;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 24px;
      }
    }

    &.styling {
      .action-btn {
        margin-block-start: var(--space-s);
      }
    }
  }
`;

export default AdditionalServicesPage;