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
        alt="A model with blue hair wearing a blue gown underneath a white lace overlay."
      />
      <${ResponsiveImage}
        src="/img/lucy/lucycantdance-396.jpg"
        alt="A plus size model wearing a black wedding gown underneath a black lace overlay."
      />
      <${ResponsiveImage}
        src="/img/lucy/lcd-atomic_bloom-184.jpg"
        alt="A model showing the back of a white wedding gown with a white lace overlay with star detailing."
      />
      <${ResponsiveImage}
        src="/img/lucy/lucy_cant_dance_2018_collection297.jpg"
        alt="Three models standing together in front of a pink and blue striped 'Candy Shack' backdrop. Each model is wearing a dip-dyed wedding gown in a different color: gray, blue, and orange."
      />
      <${ResponsiveImage}
        src="/img/lucy/lucycantdance-385.jpg"
        alt="A model wearing separate white pants and a white top with a sparkly sequin overlay."
      />
      <${ResponsiveImage}
        src="/img/lucy/LCDGC-89.jpg"
        alt="A model wearing a dip-dyed wedding gown with a white top and a gradient from white to pink on the bottom."
      />
    </${ScrollingImageCarousel}>
    <p>
      Lucy Can&rsquo;t Dance is a UK based, woman-owned small brand.
      Every dress is handmade with beautiful and intricate craftsmanship.
      New Unions Bridal is the first and only store in the US to carry this brand!
      Lucy Can&rsquo;t Dance specializes in custom dip-dyed dresses, coming in any color combination you can imagine.
      <br/>
      <strong><em>Arriving soon!</em></strong>
    </p>
  </section>
`;

LucySection.css = css`
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
