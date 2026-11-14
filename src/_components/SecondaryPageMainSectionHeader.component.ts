import { html, css, type YetiComponent } from "yeti-js";

export const SecondaryPageMainSectionHeader: YetiComponent = ({
  children
}) => html`<header class="secondary-page-main-section-header">${children}</header>`;

SecondaryPageMainSectionHeader.css = css`
@layer util {
  header.secondary-page-main-section-header {
    margin-block-start: var(--space-xl-2xl);
    margin-block-end: var(--space-l);
    margin-inline: auto;

    h1 {
      font-size: var(--font-size-3xl);
      font-weight: 500;
      text-wrap: balance;
      text-align: center;

      /** Duplicating util styles from h1.underlined-text */
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-underline-offset: var(--space-xs);
      line-height: calc(1em + var(--space-2xs) + 1px);
    }

    p {
      margin-block-start: var(--space-m);
      text-wrap: pretty;
      text-align: center;
      max-width: 720px;
    }
  }
}
`;