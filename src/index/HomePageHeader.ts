import { css, html } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const HomePageHeader = () => html`
<header id="home-header">
  <h1>
    <${ResponsiveImage}
      src="/img/logo.png"
      alt="New Unions Bridal"
      fetchpriority="high"
      loading="eager"
      sizes="(width >= 850px) 640px, 80vw"
    />
  </h1>
  <div class="action-btn-group">
    <a href="/book/" class="action-btn primary">Book an Appointment</a>
    <a href="/products/" class="action-btn secondary">Explore our Products</a>
  </div>
</header>
`;

HomePageHeader.css = css`
  header#home-header {
    display: flex;
    flex-direction: column;
    z-index: 1000;
    margin-block: var(--space-2xl-3xl) 0;

    h1 {
      display: flex;
      justify-content: center;
      transform-origin: top center;

      img {
        width: min(640px, 100%);
        height: auto;
        z-index: 100;
      }
    }

    .action-btn-group {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      column-gap: var(--space-l);
      row-gap: var(--space-s);
      margin-top: var(--space-xl-2xl);

      .action-btn {
        flex-grow: 1;
      }
    }
  }
`;