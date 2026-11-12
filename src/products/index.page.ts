import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { ProductSection } from "./ProductSection/ProductSection.ts";

// Product section configs
import { LUCY_CANT_DANCE_CONFIG } from "./configs/LUCY-CANT-DANCE.ts";
import { LOULETTE_CONFIG } from "./configs/LOULETTE.ts";
import { CORE_COLLECTION_CONFIG } from "./configs/CORE-COLLECTION.ts";
import { PALOMA_BLANCA_AND_MIKAELLA_CONFIG } from "./configs/PALOMA-BLANCA-AND-MIKAELLA.ts";
import { VINTAGE_COLLECTION_CONFIG } from "./configs/VINTAGE-COLLECTION.ts";
import { ACCESSORIES_COLLECTION_CONFIG } from "./configs/ACCESSORIES.ts";
import { OCCASION_COLLECTION_CONFIG } from "./configs/OCCASION-COLLECTION.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-11-11",
};

const ProductsPage: YetiPageComponent = ({ page }) => html`
<${PageBorderLayout} title="Our Products | New Unions Bridal" page=${page}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>A look at our selection</h1>
      <p>
        We offer a range of small designer gowns &amp; core bridal collection,
        making our selection affordable and customizable to your needs!
        <strong>Appointments are not required, but recommended due to our one person team.</strong>
      </p>
    </${SecondaryPageMainSectionHeader}>
    <a href="/book/" class="action-btn primary book-appt">
      Book an Appointment
    </a>
    <${ProductSection} config=${LUCY_CANT_DANCE_CONFIG} />
    <${ProductSection} config=${LOULETTE_CONFIG} />
    <${ProductSection} config=${CORE_COLLECTION_CONFIG} />
    <${ProductSection} config=${PALOMA_BLANCA_AND_MIKAELLA_CONFIG} />
    <${ProductSection} config=${VINTAGE_COLLECTION_CONFIG} />
    <${ProductSection} config=${ACCESSORIES_COLLECTION_CONFIG} />
    <${ProductSection} config=${OCCASION_COLLECTION_CONFIG} />
    <a href="/book/" class="action-btn primary book-appt">
      Book an Appointment
    </a>
  </main>
</${PageBorderLayout}>`;

export default ProductsPage;

ProductsPage.css = css`
  .book-appt.action-btn {
    margin-inline: auto;
  }
`;
