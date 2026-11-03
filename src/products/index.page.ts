import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { ProductSection } from "./ProductSection/ProductSection.ts";

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
    <${ProductSection}
      id="lucy-cant-dance"
      title="Lucy Can’t Dance"
      description=${html`<strong>Exclusive to New Unions Bridal!</strong> Made to measure gowns gowns in any color.`}
      priceRange="$1,300 – $3,800+"
      link=${{
    text: "See more of their collection",
    href: "https://lucycantdance.com/"
  }}
      images=${[
    {
      src: "/img/lucy/LCD-ATOMIC_BLOOM-326.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Yet another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/LCD-ATOMIC_BLOOM-327.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/LCDGC-89.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/LCDGC-95.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_cant_dance_2018_collection199.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_cant_dance_2018_collection200.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_dance098.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_dance112.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_dance120.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0296.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0301.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0402.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0407.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/LUCYCANTDANCE-390.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    },
    {
      src: "/img/lucy/LUCYCANTDANCE-401.jpg",
      alt: "Lucy Can't Dance gown",
      caption: "Another beautiful Lucy Can’t Dance gown"
    }
  ]}
    />
    <${ProductSection}
      id="loulette"
      title="Loulette Bride"
      description=${html`
        Handmade, custom gowns made in Brooklyn, New York.
        Specializing in gender neutral fits, two pieces, and jumpsuits!
        All styles can be customized to you!
      `}
      priceRange="$3,000+"
      link=${{
    text: "See more of their collection",
    href: "https://loulettebride.com/"
  }}
      images=${[]}
    />
    <${ProductSection}
      id="core"
      title="New Unions Core Collection"
      description=${html`
        Unique and affordable bridal gowns and jumpsuits sized 0 to 30,
        offered in Ivory & Black. These gowns can be ordered to your size,
        or sold directly off the rack for you to take home the same day!
      `}
      priceRange="$500-$1,699"
      images=${[]}
    />
    <${ProductSection}
      id="paloma-blanca"
      title="Paloma Blanca & Mikaella "
      description=${html`
        For the more traditional bride, these are handmade designer gowns
        made in Canada with the finest materials. Customizations are available!
      `}
      priceRange="$2,200+"
      link=${{
    text: "See more of their collection",
    href: "https://palomablanca.com/"
  }}
      images=${[]}
    />
    <${ProductSection}
      id="vintage"
      title="Vintage Collection"
      description=${html`
        Vintage bridal and formal wear from the 1950s to the early 2000s.
        Check in store for our rotating selection!
        <em>*We do not currently accept used wedding gowns that are not older than 25 years old</em>
      `}
      priceRange="$200+"
      images=${[]}
    />
    <${ProductSection}
      id="accessories"
      title="Jewelry, Headpieces, Veils, Purses, Gifts & More!"
      description=${html`
        We don’t just carry bridal headpieces and jewelry, we have something with sparkle for everyone!
      `}
      priceRange="$15+"
      images=${[]}
    />
    <${ProductSection}
      id="occasion"
      title="Occasion Collection"
      description=${html`
        We offer a rotating collection of off the rack mother
        of the bride/groom & formal wear.
      `}
      priceRange="$70+"
      images=${[]}
    />
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