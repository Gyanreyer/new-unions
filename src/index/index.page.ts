import { html, css, type YetiPageComponent } from "yeti-js";

import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { BusinessInfoSection } from "./BusinessInfoSection.ts";
import { HomeBanner } from "./HomeBanner.ts";
import { HomePageHeader } from "./HomePageHeader.ts";
import { IntroSection } from "./IntroSection/IntroSection.ts";
import { ProductsBanner } from "./ProductsBanner.ts";
import { ProductHighlightsSection } from "./ProductHighlightsSection.ts";
import { AdditionalServicesSections } from "./AdditionalServicesSections/AdditionalServicesSections.ts";

export const config = {
  permalink: "/",
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-10-31",
};

const IndexPage: YetiPageComponent =
  ({ page }) => html`<${PageBorderLayout} page=${page}>
  <${HomeBanner} />
  <main>
    <${HomePageHeader} />
    <${IntroSection} />
    <${ProductsBanner} />
    <${ProductHighlightsSection} />
    <${AdditionalServicesSections} />
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

  main {
    row-gap: var(--space-l-xl);
  }
`;

export default IndexPage;
