import { css, html } from "yeti-js";
import { Sparkle } from "../../_components/SparkleGroup/Sparkle.component.ts";
import { SparkleGroup } from "../../_components/SparkleGroup/SparkleGroup.ts";

export const IntroSection = () => html`
<section id="intro">
  <h2 class="section-heading">
    We celebrate love <span class="scroll-reveal-underline sparkle-anchor">differently.<${SparkleGroup} anchor="top-end" size="clamp(22px, 4cqi, 42px)">
      <${Sparkle} x="1.73" y="0.47" />
      <${Sparkle} x="0.89" y="-0.16" scale="0.62" />
      <${Sparkle} x="0.78" y="0.8" scale="0.47" />
    </${SparkleGroup}></span>
  </h2>
  <p class="sparkle-anchor">
    A love letter to anyone searching for wedding attire that deviates
    from the traditional, rooted in a safe space that celebrates everyone.
    New Unions is a wedding attire experience dedicated to couples tired
    of the typical wedding industry, looking for a cozy and affordable experience.
    <${SparkleGroup} anchor="bottom-start" size="clamp(22px, 3.5cqi, 36px)">
      <${Sparkle} x="-1.07" y="0.28" />
      <${Sparkle} x="-0.03" y="-0.18" scale="0.82" />
      <${Sparkle} x="-0.07" y="0.62" scale="0.73" />
    </${SparkleGroup}>
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

    /* No room beside the text for the paragraph sparkles (they stop fitting
       at ~620px), so tuck them into padding under it. */
    @media (width < 45rem) {
      p {
        padding-block-end: 1.25em;
        --sparkle-group-offset-x: 1.8;
        --sparkle-group-offset-y: -0.6;
      }
    }
  }
`;