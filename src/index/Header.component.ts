import { css, html } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const Header = () => html`<header>
  <h1>
    <meta itemprop="name" content="New Unions Bridal" />
    <${ResponsiveImage}
      src="/img/logo.png"
      alt="New Unions Bridal"
      fetchpriority="high"
      itemprop="logo"
      loading="eager"
      sizes="(width >= 850px) 640px, 80vw"
    />
  </h1>
</header>`;

Header.css = css`
  ${css.bundle("home")}
  @keyframes header-shrink {
    from {
      scale: 1;
    }
    to {
      scale: 0.5;
    }
  }

  header {
    margin-block: var(--space-3xl);
    display: flex;
    flex-direction: column;
    z-index: 1000;

    /* On desktop, shift the header down toward the center of the viewport; we'll do a fancy
       scroll-driven animation where it shrinks and the main page contents fade in */
    @media screen and (width >= 1200px) {
      margin-block: 30vh 25vh;
    }

    h1 {
      display: flex;
      justify-content: center;
      transform-origin: top center;

      img {
        width: min(640px, 100%);
        height: auto;
        z-index: 100;

        @media screen and (width >= 1200px) {
          @supports (animation-timeline: view()) {
            animation-name: header-shrink;
            animation-timeline: view();
            animation-fill-mode: both;
            animation-range: contain 55% contain 85%;
          }
        }
      }
    }
  }
`;