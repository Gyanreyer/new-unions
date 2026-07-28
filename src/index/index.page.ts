import { html, css, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { Header } from "./Header.component.ts";
import { IntroSection } from "./IntroSection/IntroSection.component.ts";
import { OfferingsSection } from "./OfferingsSection.component.ts";
import { BusinessInfoSection } from "./BusinessInfoSection.component.ts";
import { LucySection } from "./LucySection.component.ts";

export const config = {
  permalink: "/",
};

const IndexPage: YetiPageComponent =
  ({ page }) => html`<${PageBorderLayout} itemscope itemtype="http://schema.org/Store" url=${page.url}>
  <${Header} />
  <main>
    <${IntroSection} />
    <${OfferingsSection} />
    <${LucySection} />
    <${BusinessInfoSection} />
  </main>
</${PageBorderLayout}>`;

IndexPage.css = css`
  :root {
    background-image: linear-gradient(
      to bottom,
      var(--orange),
      var(--blue) 75vh,
      var(--blue) 150vh,
      var(--orange) 225vh
    );
    background-repeat: repeat-y;
    background-size: 100vw 250vh;
  }

  @keyframes slide-fade-in {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    row-gap: var(--space-2xl-3xl);

    @media screen and (width >= 1200px) and (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        opacity: 0;
        animation-name: slide-fade-in;
        animation-timeline: scroll(block);
        animation-fill-mode: both;
        animation-range: entry 0% entry 10%;
      }
    }
  }
`;

export default IndexPage;
