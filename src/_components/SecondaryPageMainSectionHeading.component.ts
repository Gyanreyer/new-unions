import { html, css, type YetiComponent } from "yeti-js";

export const SecondaryPageMainSectionHeading: YetiComponent = ({
  children
}) => html`<h1 class="secondary-page section-heading underlined-text">${children}</h1>`;

SecondaryPageMainSectionHeading.css = css`
  h1.secondary-page.section-heading {
    margin-block: var(--space-xl-2xl) var(--space-l-2xl);
    margin-inline: auto;
    text-align: center;
    text-wrap: balance;
  }
`;