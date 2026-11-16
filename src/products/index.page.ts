import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { ProductSection, type ProductSectionConfig } from "./ProductSection/ProductSection.ts";
import { ORIGIN } from "../_constants/site.ts";
import { offerPriceSchema } from "../_utils/price.ts";
import type { PageStructuredData } from "../_layout/structuredData.ts";

// Product section configs
import { LUCY_CANT_DANCE_CONFIG } from "./configs/LUCY-CANT-DANCE.ts";
import { LOULETTE_CONFIG } from "./configs/LOULETTE.ts";
import { CORE_COLLECTION_CONFIG } from "./configs/CORE-COLLECTION.ts";
import { PALOMA_BLANCA_AND_MIKAELLA_CONFIG } from "./configs/PALOMA-BLANCA-AND-MIKAELLA.ts";
import { VINTAGE_COLLECTION_CONFIG } from "./configs/VINTAGE-COLLECTION.ts";
import { ACCESSORIES_COLLECTION_CONFIG } from "./configs/ACCESSORIES.ts";
import { OCCASION_COLLECTION_CONFIG } from "./configs/OCCASION-COLLECTION.ts";

const PRODUCT_SECTIONS: ProductSectionConfig[] = [
  LUCY_CANT_DANCE_CONFIG,
  LOULETTE_CONFIG,
  CORE_COLLECTION_CONFIG,
  PALOMA_BLANCA_AND_MIKAELLA_CONFIG,
  VINTAGE_COLLECTION_CONFIG,
  ACCESSORIES_COLLECTION_CONFIG,
  OCCASION_COLLECTION_CONFIG,
];

const PRODUCTS_URL = `${ORIGIN}/products/`;

/**
 * Adds the collections to the store as an OfferCatalog, and the designer
 * brands it carries. Offers are kept at the collection level (not Product)
 * since there aren't individual products with fixed prices.
 */
const structuredData: PageStructuredData = {
  store: {
    brand: PRODUCT_SECTIONS.flatMap(({ brands = [] }) => brands).map((name) => ({ "@type": "Brand", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": `${PRODUCTS_URL}#catalog`,
      name: "Our Products",
      url: PRODUCTS_URL,
      itemListElement: PRODUCT_SECTIONS.map(({ id, title, price }) => ({
        "@type": "Offer",
        name: title,
        url: `${PRODUCTS_URL}#${id}`,
        ...offerPriceSchema(price),
      })),
    },
  },
};

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-11-13",
};

const ProductsPage: YetiPageComponent = ({ page }) => html`
<${PageBorderLayout} title="Our Products | New Unions Bridal" page=${page} structuredData=${structuredData}>
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
    ${PRODUCT_SECTIONS.map((sectionConfig) => html`<${ProductSection} config=${sectionConfig} />`)}
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
