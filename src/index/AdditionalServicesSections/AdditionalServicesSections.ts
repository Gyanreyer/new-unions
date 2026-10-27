import { css, html } from "yeti-js";

import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { SteamingMenu, SteamingMenuButton } from "./SteamingMenu.ts";

export const AdditionalServicesSections = () => html`
<div id="additional-services">
  <section id="bridal-styling-services" class="service-section styling" itemprop="makesOffer" itemscope itemtype="https://schema.org/Offer">
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
      <${ResponsiveImage} src="/img/offerings/Wildflower_Veil.jpg" alt="" />
    </aside>
  </section>
  <section id="dress-steaming-services" class="service-section steaming" itemprop="makesOffer" itemscope itemtype="https://schema.org/Offer">
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
</div>
`;

AdditionalServicesSections.css = css`
#additional-services {
  display: flex;
  flex-direction: column;
  row-gap: var(--space-l-xl);

  .service-section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: var(--space-3xl);
    row-gap: var(--space-m);

    h2 {
      margin-block-end: var(--space-s);
      font-size: var(--font-size-2xl);
    }

    .text-column {
      flex: 1 1 300px;
    }

    aside {
      flex: 0.5 1 150px;

      img {
        display: block;
        inline-size: 100%;
        block-size: auto;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 24px;
      }

      @media screen and (width <= 1000px) {
        flex-basis: 100%;
      }
    }

    .action-btn {
      margin-block-start: var(--space-s);
    }
  }
}
`;