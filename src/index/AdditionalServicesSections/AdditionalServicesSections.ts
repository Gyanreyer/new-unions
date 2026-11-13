import { css, html } from "yeti-js";

import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { Sparkle } from "../../_components/SparkleGroup/Sparkle.component.ts";
import { SparkleGroup } from "../../_components/SparkleGroup/SparkleGroup.ts";
import { SteamingMenu, SteamingMenuButton } from "./SteamingMenu.ts";

export const AdditionalServicesSections = () => html`
<div id="additional-services" class="sparkle-anchor">
  <${SparkleGroup} anchor="top-start" class="services-sparkles-top" size="var(--services-sparkle-size)">
    <${Sparkle} x="-1.26" y="-0.72" />
    <${Sparkle} x="-0.39" y="-0.1" scale="0.68" />
    <${Sparkle} x="-0.28" y="-0.91" scale="0.66" />
  </${SparkleGroup}>
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
      <a href="/book/" class="action-btn primary">Book a styling appointment</a>
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
  <${SparkleGroup} anchor="bottom-end" class="services-sparkles-bottom" size="var(--services-sparkle-size)">
    <${Sparkle} x="1.19" y="0.1" />
    <${Sparkle} x="2.01" y="0.57" scale="0.83" />
    <${Sparkle} x="2.14" y="-0.25" scale="0.48" />
  </${SparkleGroup}>
</div>
`;

AdditionalServicesSections.css = css`
#additional-services {
  /* Shared by both sparkle groups and the padding that makes room for them. */
  --services-sparkle-size: clamp(28px, 4cqi, 44px);

  display: flex;
  flex-direction: column;
  row-gap: var(--space-l-xl);

  /* Sparkle placement steps down as the page gutter shrinks. The breakpoints
     leave a few px of room: a group whose placement doesn't fit is hidden.
     Wide gutter (as authored): up-left of the heading, and off to the right
     of the photo's bottom corner. Offsets below nudge from there. */

  /* Narrower gutter: tighter to the corners. */
  @media (width < 104rem) {
    .services-sparkles-top {
      --sparkle-group-offset-x: 0.36;
      --sparkle-group-offset-y: -0.34;
    }
    .services-sparkles-bottom {
      --sparkle-group-offset-x: -0.86;
      --sparkle-group-offset-y: 0.44;
    }
  }

  /* No room in the gutter: tucked into padding above and below the content. */
  @media (width < 50rem) {
    padding-block: calc(1.8 * var(--services-sparkle-size));

    .services-sparkles-top {
      --sparkle-group-offset-x: 1.86;
      --sparkle-group-offset-y: 1.36;
    }
    .services-sparkles-bottom {
      --sparkle-group-offset-x: -2.46;
      --sparkle-group-offset-y: -1.16;
    }
  }

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