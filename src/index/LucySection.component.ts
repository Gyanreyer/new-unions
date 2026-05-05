import { css, html } from "yeti-js";
import { ScrollingImageCarousel } from "../_components/ScrollingImageCarousel.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const LucySection = () => html`
  <section id="lucy-cant-dance">
    <h2 class="section-heading">
      Exclusively with us!
      <${ResponsiveImage} alt="Lucy Can't Dance" src="/img/lucy/logo.png" />
    </h2>
    <${ScrollingImageCarousel} direction="right">
      <${ResponsiveImage}
        src="/img/lucy/lcd-52.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/lucy/lucycantdance-396.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/lucy/lcd-atomic_bloom-184.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/lucy/lucy_cant_dance_2018_collection297.jpg"
        alt=""
      />
      <${ResponsiveImage}
        src="/img/lucy/lucycantdance-385.jpg"
        alt=""
      />
    </${ScrollingImageCarousel}>
    <p>
      Lucy Can&apos;t Dance is a UK based, woman-owned small brand. Every dress is handmade with beautiful and intricate craftsmanship. New Unions Bridal is the first and only store in the US to carry this brand! Lucy Can’t Dance specializes in custom dip-dyed dresses, coming in any color combination you can imagine. Come fall in love with them with us!
    </p>
  </section>
`;

LucySection.css = css`
  ${css.bundle("home")}
  #lucy-cant-dance {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-m-l);

    h2 {
      text-align: center;

      img {
        display: block;
        width: 16ch;
        max-width: 100%;
        height: auto;
        margin-block-start: var(--space-s);
        margin-inline: auto;
      }
    }

    p {
      text-align: center;
      text-wrap: balance;
    }
  }
`;