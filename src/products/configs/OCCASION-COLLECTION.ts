import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const OCCASION_COLLECTION_CONFIG: ProductSectionConfig = {
  id: "occasion",
  title: "Occasion Collection",
  description: html`
    We offer a rotating collection of off the rack mother of the bride/groom & formal wear.
  `,
  priceRange: "$100+",
  images: [
    {
      src: "/img/occasion/white-high-neck-feather-gown-black-and-white.webp",
      alt: "Black and white photo of a model in a flowing high-neck gown with feather trim, standing in a field with a partner",
      caption: "This flowy white high neck gown features a floral feather detail.",
    },
    {
      src: "/img/occasion/red-sequin-gown-seated.webp",
      alt: "Model in a red and burgundy all-over sequin gown, seated on a dining table",
      caption: "This all over sequin gown is a red showstopper.",
    },
    {
      src: "/img/occasion/champagne-strapless-tea-length-gown.webp",
      alt: "Two models on a pink velvet sofa, one in a champagne strapless tea-length gown",
      caption: "This champagne strapless tea length gown is perfect for the untraditional bride, elopement, or even wedding guest.",
    },
    {
      src: "/img/occasion/black-velvet-gold-sequin-gowns.webp",
      alt: "Two models in black velvet dresses scattered with gold sequins",
      caption: "This black velvet floor length gown with gold sequins is the perfect guest dress, or perfect for a New Year’s party.",
    },
    {
      src: "/img/occasion/Rackofdresses_Occasion.jpg",
      alt: "Rack of sequined and floral formal dresses in silver, white, blue, and pink",
      caption: "Come see our full collection in person! We carry a rotating assortment of off the rack and made to order mother of the bride, mother of the groom, and guest attire.",
    },
  ],
};