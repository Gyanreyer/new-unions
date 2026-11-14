import { html } from "yeti-js";
import { type ProductSectionConfig } from "../ProductSection/ProductSection.ts";

export const PALOMA_BLANCA_AND_MIKAELLA_CONFIG: ProductSectionConfig = {
  id: "paloma-blanca",
  title: "Paloma Blanca & Mikaella",
  description: html`
    For the more traditional bride, these are handmade designer gowns
    made in Canada with the finest materials. Customizations are available!
  `,
  priceRange: "$2,200+",
  link: {
    text: "See more of their collection",
    href: "https://palomablanca.com/",
  },
  images: [
    {
      src: "/img/paloma-mikaella/PalomaStyle_P5232_PaintedLace-Ballgown.webp",
      alt: "Model in a strapless A-line gown with a plunging neckline and a jeweled waist",
      caption: html`<strong>Paloma 5232</strong> is a duchesse satin and hand painted lace A-line gown with a strapless plunging neckline.`,
    },
    {
      src: "/img/paloma-mikaella/MikaellaStyle_M2628.webp",
      alt: "Model on a staircase in a crepe fit and flare gown with a folded off-the-shoulder neckline",
      caption: html`<strong>Mikaella 2628</strong> is a crepe fit and flare with a detachable shoulder detail.`,
    },
    {
      src: "/img/paloma-mikaella/PalomaStyle_P5233_Ballgown_Sparkletop.webp",
      alt: "Model in a satin ballgown with a sheer beaded corset bodice",
      caption: html`<strong>Paloma 5233</strong> is a satin ballgown with a see-through beaded corset top.`,
    },
    {
      src: "/img/paloma-mikaella/MikaellaStyle_M2633_FitandFlare_Lace_slit.webp",
      alt: "Model in an off-the-shoulder fit and flare gown with a lace-lined front slit",
      caption: html`<strong>Mikaella 2633</strong> is a fit and flare with a lace slit, that is truly a one of a kind gown.`,
    },
    {
      src: "/img/paloma-mikaella/PalomaStyle_P5120_ClassicSwagSleeve.webp",
      alt: "Model in a soft fit and flare gown with draped off-the-shoulder swag sleeves",
      caption: html`<strong>Paloma 5120</strong> is a stunningly soft fit and flare with a detachable swag sleeve and buttons all the way down the train.`,
    },
    {
      src: "/img/paloma-mikaella/MikaellaStyle_M2612_Twopiece_Lace_Withdetachableskirt.webp",
      alt: "Model in an arched doorway wearing a lace fit and flare gown with a sheer detachable overskirt",
      caption: html`<strong>Mikaella 2612</strong> is a fit and flare lace gown with a detachable overskirt.`,
    },
    {
      src: "/img/paloma-mikaella/PalomaStyle_P5160_Twopiece.webp",
      alt: "Model in a two-piece look with a structured strapless corset top and fitted skirt",
      caption: html`<strong>Paloma 5160</strong> is a two piece bridal separate corset top with a fit and flare skirt.`,
    },
    {
      src: "/img/paloma-mikaella/MikaellaStyle_M2576_StraplessCrepe.webp",
      alt: "Model in a strapless crepe fit and flare gown with a train",
      caption: html`<strong>Mikaella 2576</strong> is a strapless crepe timeless fit and flare gown.`,
    },
  ],
};