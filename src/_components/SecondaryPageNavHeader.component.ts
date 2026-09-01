import { css, html, type YetiComponent } from "yeti-js";
import { BackLink } from "./BackLink.component.ts";
import { ResponsiveImage } from "./ResponsiveImage.component.ts";

export const SecondaryPageNavHeader: YetiComponent = () =>
  html`<header class="secondary-page-header">
  <nav>
    <${BackLink} href="/" label="Home" />
  </nav>
  <a href="/" class="home-logo-link">
    <${ResponsiveImage}
      src="/img/logo.png"
      alt="New Unions Bridal"
      fetchpriority="high"
      loading="eager"
      sizes="(width >= 575px) 420px, 80vw"
    />
  </a>
</header>`;

SecondaryPageNavHeader.css = css`
  header {
    nav {
      margin-block-start: var(--space-m-l);
    }

    img {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--space-l-xl);
      width: min(420px, 100%);
      height: auto;
      z-index: 100;
      view-transition-name: header-logo;
    }
  }
`;