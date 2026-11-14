import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const LUCY_CANT_DANCE_CONFIG: ProductSectionConfig = {
  id: "lucy-cant-dance",
  title: "Lucy Can’t Dance",
  description: html`<strong>Exclusive to New Unions Bridal!</strong> Made to measure gowns in any color.`,
  priceRange: "$1,300 – $3,800+",
  link: {
    text: "See more of their collection",
    href: "https://lucycantdance.com/",
  },
  images: [
    {
      src: "/img/lucy/LCD-ATOMIC_BLOOM-327.jpg",
      alt: "Model with pink hair in a sheer star-embroidered top over an ivory gown that fades to purple at the hem",
      caption: html`Our starry <strong>Vegas</strong> top can be paired over any color gown.`,
    },
    {
      src: "/img/lucy/LucyCantDance_WithFeathers_1.jpg",
      alt: "Model in a lace top with sheer feather-trimmed sleeves over a gown that fades from ivory to teal",
      caption: html`Our <strong>Moonstone</strong> lace top with feather sleeves can be paired with any slip, even our custom colored ones.`,
    },
    {
      src: "/img/lucy/LCDGC-89--vertical-crop.jpg",
      alt: "Model in a gown that fades from ivory to hot pink, standing in a red lounge",
      caption: html`Any dress can be made in <strong>ANY</strong> color, pink, blue, purple, green; any color you can imagine!`,
    },
    {
      src: "/img/lucy/LUCYCANTDANCE-390.jpg",
      alt: "Model in a long-sleeved, all-over black lace gown against a pink backdrop",
      caption: html`Our <strong>Mabel</strong> gown is an amazing all over lace that can be paired with a black slip, ivory slip, or a custom dyed slip.`,
    },
    {
      src: "/img/lucy/Lucy_Cant_dance098.jpg",
      alt: "Model with teal hair showing the low back of an ivory lace overlay gown",
      caption: html`<strong>Labyrinth</strong> is a stunning lace overlay that goes perfect over color, ivory, or black.`,
    },
    {
      src: "/img/lucy/Lucy_cant_dance_2018_collection199.jpg",
      alt: "Model twirling in a long-sleeved gown that fades from ivory to peach at the hem",
      caption: "This stunning peach gown is an updated version of a blush gown if you are looking for something more unique.",
    },
    {
      src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0402.jpg",
      alt: "Model in a sparkling beaded lace overlay gown in front of an iridescent sequin backdrop",
      caption: html`<strong>Galactic Blue</strong> is a stunning sparkle lace overlay that can be paired with an ivory slip, black, or dip-dye.`,
    },
    {
      src: "/img/lucy/Lucy_Cant_dance112.jpg",
      alt: "Model with teal hair in an ivory gown with a sheer bodice and a long train that fades to pale blue",
      caption: html`
        Every gown is entirely made to measure.
        <strong>Pulp Fiction</strong> is a stunning base dress that is made to your exact measurements,
        meaning it is plus size friendly, petite friendly, and height friendly!
        They can also be made into bridal jumpsuits or bridal separates.`,
    },
  ],
};