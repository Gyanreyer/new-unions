import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const CORE_COLLECTION_CONFIG: ProductSectionConfig = {
  id: "core",
  title: "New Unions Core Collection",
  description: html`
    Unique and affordable bridal gowns and jumpsuits sized 0 to 30,
    offered in Ivory & Black. These gowns can be ordered to your size,
    or sold directly off the rack for you to take home the same day!
  `,
  priceRange: "$500-$1,699",
  images: [],
};