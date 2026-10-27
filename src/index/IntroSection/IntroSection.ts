import { css, html } from "yeti-js";

export const IntroSection = () => html`
<section id="intro">
  <h2 class="section-heading">
    We celebrate love <span class="scroll-reveal-underline">differently.</span>
  </h2>
  <p>
    A love letter to anyone searching for wedding attire that deviates
    from the traditional, rooted in a safe space that celebrates everyone.
    New Unions is a wedding attire experience dedicated to couples tired
    of the typical wedding industry, looking for a cozy and affordable experience.
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
  }
`;