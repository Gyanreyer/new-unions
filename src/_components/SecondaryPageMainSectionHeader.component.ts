import { html, css, type YetiComponent } from "yeti-js";

export const SecondaryPageMainSectionHeader: YetiComponent = ({
  children
}) => html`<header class="secondary-page-main-section-header">${children}</header>`;

SecondaryPageMainSectionHeader.css = css`
@layer util {
  header.secondary-page-main-section-header {
    margin-block: var(--space-xl-2xl) var(--space-l-2xl);
    margin-inline: auto;

    h1 {
      font-size: var(--font-size-2xl-3xl);
      font-weight: 500;
      text-wrap: balance;
      text-align: center;
      margin-block-end: var(--space-m);

      /** Duplicating util styles from h1.underlined-text */
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-underline-offset: var(--space-xs);
      line-height: calc(1em + var(--space-2xs) + 1px);
    }

    p {
      text-wrap: pretty;
      text-align: center;
      max-width: 720px;
    }
  }
}
`;