import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const LOULETTE_CONFIG: ProductSectionConfig = {
  id: "loulette",
  title: "Loulette Bride",
  description: html`
    Handmade, custom gowns made in Brooklyn, New York.
    Specializing in gender neutral fits, two pieces, and jumpsuits!
    All styles can be customized to you!
  `,
  priceRange: "$3,000+",
  link: {
    text: "See more of their collection",
    href: "https://loulettebride.com/",
  },
  images: [
    {
      src: "/img/loulette/Loulette_PaintedBlushGown.webp",
      alt: "Model with arms outstretched in a blush A-line gown with a corset bodice and hand-painted details",
      caption: html`The <strong>Julia</strong> gown features a blush, A-line gown with a corset bodice.`,
    },
    {
      src: "/img/loulette/LouletteBride_RosemaryGown_Image1.jpg",
      alt: "Model with one arm raised in a fitted silk jacquard fit and flare gown, standing on a wooden floor",
      caption: html`<strong>Rosemary</strong> is a floral silk jacquard fit and flare with the softest feel.`,
    },
    {
      src: "/img/loulette/LouletteBride_JuliaGown_Bothcolorways_Handpainted.webp",
      alt: "Two models side by side in the Julia gown, one in ivory and one in hand-painted blush",
      caption: html`The <strong>Julia</strong> gown can be made in blush or ivory, and is hand painted in any color detail.`,
    },
    {
      src: "/img/loulette/LouletteBride_MoreGowns.jpg",
      alt: "Four models walking together in different white Loulette Bride gowns and separates",
      caption: html`
        The <em>Loulette Bride</em> line is fully custom and made to measure,
        meaning any gown can be a jumpsuit, a bridal separate, and in any size!
        Custom options are what makes Loulette special.`,
    },
    {
      src: "/img/loulette/rosemary-gown-leaning-on-ladder-1.jpg",
      alt: "Model leaning on a wooden ladder in an ivory slip-style fit and flare gown with a long veil",
      caption: html`<strong>Rosemary</strong> can fit anybody, and is one of the most figure flattering silhouettes you’ll find!`,
    },
    {
      src: "/img/loulette/rosemary-gown-veil-closeup.jpg",
      alt: "Close-up of a model in an ivory cowl-neck gown, lifting a sheer veil",
      caption: html`<strong>Rosemary</strong> goes perfect with any accessory.`,
    },
  ]
};