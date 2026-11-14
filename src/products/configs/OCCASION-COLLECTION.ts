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
      src: "/img/occasion/MOB_Brocade_Blackfloral_3.jpg",
      alt: "Model in an off-the-shoulder black brocade gown with a metallic rose pattern",
      caption: "This black brocade gown is great for any mother of the bride or wedding guest.",
    },
    {
      src: "/img/occasion/MOB_GuestFloral.jpg",
      alt: "Model in a flowing pink and green floral wrap gown with flutter sleeves",
      caption: "This floral flowing occasion dress has a flutter sleeve detail, and is super bra friendly!",
    },
    {
      src: "/img/occasion/GuestDress_Allredsequin.jpg",
      alt: "Model in a full-length red and pink sequin mermaid gown with rosette shoulders",
      caption: "This full length red and pink sequin gown is great for a gala, a special event, or even a Valentine’s Day bride.",
    },
    {
      src: "/img/occasion/Guestattire_Blackjumpsuit.jpg",
      alt: "Model in a long-sleeved black wrap jumpsuit with a gold buckle at the waist",
      caption: "When a dress doesn’t feel right, reach for a jumpsuit! This black jumpsuit is super figure flattering, and gender affirming.",
    },
    {
      src: "/img/occasion/MOB_Huntergreen_Sequin.jpg",
      alt: "Model in a hunter green gown with a sequined cap-sleeve bodice and a draped skirt",
      caption: "This hunter green gown with a sequin top is stunning for a mother of the bride or mother of the groom.",
    },
    {
      src: "/img/occasion/MOB_Sparkle_ChampagneGown.jpg",
      alt: "Model in a fitted gold shimmer gown with flutter sleeves and ruching",
      caption: "This sleeved gold shimmer gown has ruching that hits in all the right places.",
    },
    {
      src: "/img/occasion/Guest_Velvet_Black.jpg",
      alt: "Model in a black velvet column dress with a square neckline, scattered with gold sequins",
      caption: "If you’re looking for a New Year’s Eve party look, this black velvet dress is it!",
    },
    {
      src: "/img/occasion/Guestattire_Plum_offtheshoulder.jpg",
      alt: "Model in a plum off-the-shoulder gown with rosettes along the neckline and a ruffled front slit",
      caption: "This plum off the shoulder gown is also stocked in our store in navy!",
    },
    {
      src: "/img/occasion/MOB_Green_Longsleeve.jpg",
      alt: "Model in a long-sleeved emerald wrap gown with a jeweled brooch at the waist",
      caption: "Looking for a long sleeve mother of the bride or guest gown? We also stock this in cranberry.",
    },
    {
      src: "/img/occasion/SequinandFeathers_2.jpg",
      alt: "Model in a short pink and silver sequin dress with pink feather-trimmed bell sleeves",
      caption: "This all over sequin gown with a feather sleeve is a handmade piece, that we also stock in black.",
    },
    {
      src: "/img/occasion/Rackofdresses_Occasion.jpg",
      alt: "Rack of sequined and floral formal dresses in silver, white, blue, and pink",
      caption: "Come see our full collection in person! We carry a rotating assortment of off the rack and made to order mother of the bride, mother of the groom, and guest attire.",
    },
  ],
};
