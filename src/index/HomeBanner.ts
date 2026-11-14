import { css, html } from "yeti-js";
import { Marquee } from "../_components/Marquee/Marquee.ts";

export const HomeBanner = () => html`<section id="home-banner" aria-label="Store announcements">
  <${Marquee}>
    <ul>
      <li>We offer open walk-in retail hours Thursday–Sunday</li>
      <li>Bridal appointments are first come first serve</li>
    </ul>
  </${Marquee}>
</section>`;

HomeBanner.css = css`
  #home-banner {
    /* Run border-to-border instead of sitting in the page's padded content column */
    grid-column: full;
    background-color: var(--white);
    color: var(--blue);
    padding-block: var(--space-s);
    --marquee-fade: var(--space-s);
    --marquee-gap: var(--space-2xs)
  }

  #home-banner marq-uee {
    margin-inline: var(--space-m);

    ul {
      column-gap: var(--space-l);
    }

    &:state(scrolling){
      /* If the marquee is scrolling (JS enabled and user doesn't prefer reduced motion)
         we want to bump down the margin and add a decorative separator between list items */
      margin-inline: var(--space-xs);

      ul {
        column-gap: var(--marquee-gap);
      }

      ul li::after {
        content: "✦" / "";
        margin-inline-start: var(--marquee-gap);
        font-size: var(--font-size-s);
        vertical-align: center;
      }
    }
  }

  #home-banner ul {
    display: flex;
    flex-wrap: wrap;
    row-gap: var(--space-xs);
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-wrap: balance;
  }
`;
