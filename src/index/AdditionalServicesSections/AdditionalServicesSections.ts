import { css, html } from "yeti-js";

import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { SparkleGroup } from "../../_components/SparkleGroup/SparkleGroup.ts";
import { SteamingMenu, SteamingMenuButton } from "./SteamingMenu.ts";

export const AdditionalServicesSections = () => html`
<div id="additional-services" class="sparkle-anchor">
  <${SparkleGroup}
    seed="services-topleft-4"
    size="var(--services-sparkle-size)"
    count="3"
    spread="2 1.6"
    placement=${[
    // Up and to the left of the heading.
    { anchor: "top-start", offsetX: -0.86, offsetY: -0.46 },
    // Tighter to the corner when the gutter is narrower.
    { anchor: "top-start", offsetX: -0.5, offsetY: -0.8 },
    // Tucked into the top padding when there's no room in the gutter.
    { anchor: "top-start", offsetX: 1, offsetY: 0.9 },
  ]}
  />
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
  <${SparkleGroup}
    seed="services-bottomright-3"
    size="var(--services-sparkle-size)"
    count="3"
    spread="2 1.6"
    placement=${[
    // Off to the right of the photo's bottom corner.
    { anchor: "bottom-end", offsetX: 1.46, offsetY: 0.26 },
    // Hanging diagonally off the corner when the gutter is narrower.
    { anchor: "bottom-end", offsetX: 0.6, offsetY: 0.7 },
    // Tucked into the bottom padding when there's no room in the gutter.
    { anchor: "bottom-end", offsetX: -1, offsetY: -0.9 },
  ]}
  />
</div>
`;

AdditionalServicesSections.css = css`
#additional-services {
  /* Shared by both sparkle groups and the padding that makes room for them. */
  --services-sparkle-size: clamp(28px, 4cqi, 44px);

  display: flex;
  flex-direction: column;
  row-gap: var(--space-l-xl);

  /* Room above and below the content for the sparkle groups' tucked
     fallbacks. Kept a bit wider than where those fallbacks kick in (~720px). */
  @media (width < 48rem) {
    padding-block: calc(1.8 * var(--services-sparkle-size));
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