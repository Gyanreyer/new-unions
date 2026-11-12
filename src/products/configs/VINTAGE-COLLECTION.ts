import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const VINTAGE_COLLECTION_CONFIG: ProductSectionConfig = {
  id: "vintage",
  title: "Vintage Collection",
  description: html`
    Vintage bridal and formal wear from the 1950s to the early 2000s.
    Check in store for our rotating selection!
    <em>*We do not currently accept used wedding gowns that are not older than 25 years old</em>
  `,
  priceRange: "$200+",
  images: [
    {
      src: "/img/vintage/jessica-mcclintock-gown-cathedral-veil.jpg",
      alt: "Model in a long-sleeved vintage satin gown with a lace-edged cathedral veil",
      caption: "This vintage Jessica McClintock gown pairs beautifully with our lace cathedral veil.",
    },
    {
      src: "/img/vintage/corset-bodice-gown-bubble-bustle.jpg",
      alt: "Black and white photo of a model in a vintage gown with a corset bodice, long sleeves, and a full skirt",
      caption: "This gown features a corset style bodice and sleeves, and a bubble bustle in the back.",
    },
    {
      src: "/img/vintage/VintageWeddingDress_2.jpg",
      alt: "Model in a high-neck vintage gown with sheer puffed sleeves and a vintage headpiece",
      caption: "This late 70s vintage wedding gown shines with a vintage headpiece.",
    },
    {
      src: "/img/vintage/VintageWeddingDress_1.jpg",
      alt: "Model in a vintage gown with sheer puffed sleeves and a full skirt with a long train",
      caption: "Our vintage gown selection is carefully curated, and features gowns from many eras.",
    },
    {
      src: "/img/vintage/VintageGown_80s_Plus_1.jpg",
      alt: "Model in an off-the-shoulder 1980s gown with bow details and a full skirt",
      caption: "This vintage 80s gown is new and never worn, with bow details and a cap sleeve.",
    },
    {
      src: "/img/vintage/VintageGown_80s_Plus_2.jpg",
      alt: "Model in an off-the-shoulder 1980s gown with a full skirt, standing in the shop",
      caption: "When you try on our vintage gowns, we always love talking about how we can make them your own!",
    },
    {
      src: "/img/vintage/Vintage80sBridal_MIL.jpg",
      alt: "1980s satin gown with a beaded lace sweetheart bodice on a dress form, with a pearl necklace",
      caption: "Come see our full rotating vintage bridal collection in store. These gowns don’t last long, and are truly one of a kind!",
    },
  ],
};