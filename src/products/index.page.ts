import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-10-30",
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