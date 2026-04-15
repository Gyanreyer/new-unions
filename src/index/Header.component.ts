import { css, html } from "yeti-js";

export const Header = () => html`<header>
  <h1>
    <meta itemprop="name" content="New Unions Bridal" />
    <img
      src="/img/logo.png"
      alt="New Unions Bridal"
      width="1510"
      height="420"
      fetchpriority="high"
      itemprop="logo"
    />
  </h1>
</header>`;

Header.css = css`
  @keyframes header-shrink {
    from {
      scale: 1;
    }
    to {
      scale: 0.5;
    }
  }

  header {
    margin-block: 4rem 8rem;
    display: flex;
    flex-direction: column;
    z-index: 1000;

    @media screen and (width >= 1200px) {
      margin-block: 30vh 25vh;
    }

    h1 {
      display: flex;
      justify-content: center;
      transform-origin: top center;

      img {
        width: min(640px, 100%);
        max-width: 1200px;
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