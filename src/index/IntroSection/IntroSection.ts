import { css, html } from "yeti-js";
import { SparkleGroup } from "../../_components/SparkleGroup/SparkleGroup.ts";

export const IntroSection = () => html`
<section id="intro">
  <h2 class="section-heading">
    We celebrate love <span class="scroll-reveal-underline sparkle-anchor">differently.<${SparkleGroup}
      seed="intro"
      count="3"
      size="clamp(22px, 4cqi, 42px)"
      spread="2 1.6"
      placement=${{ anchor: "top-end", offsetX: 1.4, offsetY: 0.3 }}
    /></span>
  </h2>
  <p class="sparkle-anchor">
    A love letter to anyone searching for wedding attire that deviates
    from the traditional, rooted in a safe space that celebrates everyone.
    New Unions is a wedding attire experience dedicated to couples tired
    of the typical wedding industry, looking for a cozy and affordable experience.
    <${SparkleGroup}
      seed="intro-paragraph"
      count="3"
      size="clamp(22px, 3.5cqi, 36px)"
      spread="2 1.6"
      placement=${[
    { anchor: "bottom-start", offsetX: -0.6, offsetY: 0.2 },
    // Tucked under the text when there's no room beside it.
    { anchor: "bottom-start", offsetX: 1.2, offsetY: -0.4 },
  ]}
    />
  </p>
</section>
`;

IntroSection.css = css`
  section#intro {
    text-align: center;

    h2 {
      margin-bottom: var(--space-s);
    }

    p {
      text-wrap: balance;
      max-width: 48ch;
      margin-inline: auto;
    }

    /* Room under the text for the paragraph sparkles' tucked fallback.
       Kept a bit wider than where the fallback kicks in (~640px). */
    @media (width < 45rem) {
      p {
        padding-block-end: 1.25em;
      }
    }
  }
`;