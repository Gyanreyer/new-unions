import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";
import { ProductSection } from "./ProductSection/ProductSection.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-11-11",
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
      description=${html`<strong>Exclusive to New Unions Bridal!</strong> Made to measure gowns in any color.`}
      priceRange="$1,300 – $3,800+"
      link=${{
        text: "See more of their collection",
        href: "https://lucycantdance.com/",
      }}
      images=${[
        {
          src: "/img/lucy/LCD-ATOMIC_BLOOM-327.jpg",
          alt: "Model with pink hair in a sheer star-embroidered top over an ivory gown that fades to purple at the hem",
          caption: "Our starry Vegas top can be paired over any color gown.",
        },
        {
          src: "/img/lucy/LucyCantDance_WithFeathers_1.jpg",
          alt: "Model in a lace top with sheer feather-trimmed sleeves over a gown that fades from ivory to teal",
          caption: "Our Moonstone lace top with feather sleeves can be paired with any slip, even our custom colored ones.",
        },
        {
          src: "/img/lucy/LCDGC-89--vertical-crop.jpg",
          alt: "Model in a gown that fades from ivory to hot pink, standing in a red lounge",
          caption: "Any dress can be made in ANY color, pink, blue, purple, green; any color you can imagine!",
        },
        {
          src: "/img/lucy/LUCYCANTDANCE-390.jpg",
          alt: "Model in a long-sleeved, all-over black lace gown against a pink backdrop",
          caption: "Our Mabel gown is an amazing all over lace that can be paired with a black slip, ivory slip, or a custom dyed slip.",
        },
        {
          src: "/img/lucy/Lucy_Cant_dance098.jpg",
          alt: "Model with teal hair showing the low back of an ivory lace overlay gown",
          caption: "Labyrinth is a stunning lace overlay that goes perfect over color, ivory, or black.",
        },
        {
          src: "/img/lucy/Lucy_cant_dance_2018_collection199.jpg",
          alt: "Model twirling in a long-sleeved gown that fades from ivory to peach at the hem",
          caption: "This stunning peach gown is an updated version of a blush gown if you are looking for something more unique.",
        },
        {
          src: "/img/lucy/Lucy_Cant_DanceMegan_Elle_Photography0402.jpg",
          alt: "Model in a sparkling beaded lace overlay gown in front of an iridescent sequin backdrop",
          caption: "Galactic Blue is a stunning sparkle lace overlay that can be paired with an ivory slip, black, or dip-dye.",
        },
        {
          src: "/img/lucy/Lucy_Cant_dance112.jpg",
          alt: "Model with teal hair in an ivory gown with a sheer bodice and a long train that fades to pale blue",
          caption: "Every gown is entirely made to measure. Pulp Fiction is a stunning base dress that is made to your exact measurements, meaning it is plus size friendly, petite friendly, and height friendly! They can also be made into bridal jumpsuits or bridal separates.",
        },
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
        href: "https://loulettebride.com/",
      }}
      images=${[
        {
          src: "/img/loulette/Loulette_PaintedBlushGown.webp",
          alt: "Model with arms outstretched in a blush A-line gown with a corset bodice and hand-painted details",
          caption: "The Julia gown features a blush, A-line gown with a corset bodice.",
        },
        {
          src: "/img/loulette/LouletteBride_RosemaryGown_Image1.jpg",
          alt: "Model with one arm raised in a fitted silk jacquard fit and flare gown, standing on a wooden floor",
          caption: "Rosemary is a floral silk jacquard fit and flare with the softest feel.",
        },
        {
          src: "/img/loulette/LouletteBride_JuliaGown_Bothcolorways_Handpainted.webp",
          alt: "Two models side by side in the Julia gown, one in ivory and one in hand-painted blush",
          caption: "The Julia gown can be made in blush or ivory, and is hand painted in any color detail.",
        },
        {
          src: "/img/loulette/LouletteBride_MoreGowns.jpg",
          alt: "Four models walking together in different white Loulette Bride gowns and separates",
          caption: "The Loulette Bride line is fully custom and made to measure, meaning any gown can be a jumpsuit, a bridal separate, and in any size! Custom options are what makes Loulette special.",
        },
        {
          src: "/img/loulette/rosemary-gown-leaning-on-ladder-1.jpg",
          alt: "Model leaning on a wooden ladder in an ivory slip-style fit and flare gown with a long veil",
          caption: "Rosemary can fit anybody, and is one of the most figure flattering silhouettes you’ll find!",
        },
        {
          src: "/img/loulette/rosemary-gown-veil-closeup.jpg",
          alt: "Close-up of a model in an ivory cowl-neck gown, lifting a sheer veil",
          caption: "Rosemary goes perfect with any accessory.",
        },
      ]}
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
      title="Paloma Blanca & Mikaella"
      description=${html`
        For the more traditional bride, these are handmade designer gowns
        made in Canada with the finest materials. Customizations are available!
      `}
      priceRange="$2,200+"
      link=${{
        text: "See more of their collection",
        href: "https://palomablanca.com/",
      }}
      images=${[
        {
          src: "/img/paloma-mikaella/PalomaStyle_P5232_PaintedLace-Ballgown.webp",
          alt: "Model in a strapless A-line gown with a plunging neckline and a jeweled waist",
          caption: "Paloma 5232 is a duchesse satin and hand painted lace A-line gown with a strapless plunging neckline.",
        },
        {
          src: "/img/paloma-mikaella/MikaellaStyle_M2628.webp",
          alt: "Model on a staircase in a crepe fit and flare gown with a folded off-the-shoulder neckline",
          caption: "Mikaella 2628 is a crepe fit and flare with a detachable shoulder detail.",
        },
        {
          src: "/img/paloma-mikaella/PalomaStyle_P5233_Ballgown_Sparkletop.webp",
          alt: "Model in a satin ballgown with a sheer beaded corset bodice",
          caption: "Paloma 5233 is a satin ballgown with a see-through beaded corset top.",
        },
        {
          src: "/img/paloma-mikaella/MikaellaStyle_M2633_FitandFlare_Lace_slit.webp",
          alt: "Model in an off-the-shoulder fit and flare gown with a lace-lined front slit",
          caption: "Mikaella 2633 is a fit and flare with a lace slit, that is truly a one of a kind gown.",
        },
        {
          src: "/img/paloma-mikaella/PalomaStyle_P5120_ClassicSwagSleeve.webp",
          alt: "Model in a soft fit and flare gown with draped off-the-shoulder swag sleeves",
          caption: "Paloma 5120 is a stunningly soft fit and flare with a detachable swag sleeve and buttons all the way down the train.",
        },
        {
          src: "/img/paloma-mikaella/MikaellaStyle_M2612_Twopiece_Lace_Withdetachableskirt.webp",
          alt: "Model in an arched doorway wearing a lace fit and flare gown with a sheer detachable overskirt",
          caption: "Mikaella 2612 is a fit and flare lace gown with a detachable overskirt.",
        },
        {
          src: "/img/paloma-mikaella/PalomaStyle_P5160_Twopiece.webp",
          alt: "Model in a two-piece look with a structured strapless corset top and fitted skirt",
          caption: "Paloma 5160 is a two piece bridal separate corset top with a fit and flare skirt.",
        },
        {
          src: "/img/paloma-mikaella/MikaellaStyle_M2576_StraplessCrepe.webp",
          alt: "Model in a strapless crepe fit and flare gown with a train",
          caption: "Mikaella 2576 is a strapless crepe timeless fit and flare gown.",
        },
      ]}
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
      images=${[
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
      ]}
    />
    <${ProductSection}
      id="accessories"
      title="Jewelry, Headpieces, Veils, Purses, Gifts & More!"
      description=${html`
        We don’t just carry bridal headpieces and jewelry, we have something with sparkle for everyone!
      `}
      priceRange="$15+"
      images=${[
        {
          src: "/img/accessories/bridal-hat.jpg",
          alt: "Model in a wide-brimmed white bridal hat and satin slip, lounging on a blue armchair",
          caption: "Bridal hats are so back, and ours are made in the USA.",
        },
        {
          src: "/img/accessories/Colorful_FloralVeil_Withblusher_2.jpg",
          alt: "Model under a two-layer tulle veil with a blusher, scattered with colorful embroidered flowers",
          caption: "We carry a large range of colorful floral veils, and this double layer soft tulle is stunning.",
        },
        {
          src: "/img/accessories/FitandFlare_Accessories.jpg",
          alt: "Model in an off-the-shoulder gown with a gold floral hair comb and a long veil",
          caption: "Our veils and headpieces help complete your bridal look!",
        },
        {
          src: "/img/accessories/Gold_Bridal_Jewelry.jpg",
          alt: "Close-up of a model wearing crystal drop earrings and a gold pendant necklace",
          caption: "Our bridal jewelry selection includes earrings, necklaces, and everything in between. Come find affordable options to handmade pieces in store.",
        },
        {
          src: "/img/accessories/neck-bow-satin-dress.jpg",
          alt: "Model in a satin slip dress with a large ivory bow tied at the neck",
          caption: "Our selection of neck bows and neckties includes styles for all genders. We also handmake ties in store.",
        },
        {
          src: "/img/accessories/PerfectMatch_Matchbox_Ornament.jpg",
          alt: "Glass matchbox ornament reading “Perfect Match”",
          caption: "Gifting options in store also include this cute matchbox ornament!",
        },
        {
          src: "/img/accessories/Beaded_Capelet.jpg",
          alt: "Model wearing a sheer beaded lace capelet over a black dress",
          caption: "Our beaded capelets are the perfect topper for wedding gowns or your second look.",
        },
        {
          src: "/img/accessories/BlackAccessories_1.jpg",
          alt: "Model with a long black tulle veil over a black lace gown",
          caption: "Black wedding veils are perfect for our goth or untraditional brides.",
        },
        {
          src: "/img/accessories/RainbowdriedFlowers.jpg",
          alt: "Hand holding a rainbow bouquet of dried flowers wrapped in kraft paper",
          caption: "Dried rainbow flowers from a small woman owned company? So cute!",
        },
        {
          src: "/img/accessories/JulietCapVeil.jpg",
          alt: "Model wearing a crochet lace Juliet cap veil",
          caption: "Juliet cap veils are super trendy right now! This one is a crochet lace cathedral veil.",
        },
        {
          src: "/img/accessories/Accessories_Purse_Necklace_Earrings.jpg",
          alt: "Model in a black slip dress holding a beaded silver handbag, with matching earrings and necklace",
          caption: "An earring and necklace set isn’t complete without a beaded handbag.",
        },
        {
          src: "/img/accessories/CrystalEarrings.jpg",
          alt: "Iridescent crystal chandelier earrings on a display stand",
          caption: "Our jewelry is great for gift giving, guests, or any formal occasion.",
        },
        {
          src: "/img/accessories/Lizzy4--vertical-crop.jpg",
          alt: "Model wearing a crystal star headpiece with a sheer black veil",
          caption: "Our selection of unique bridal headpieces is unmatched.",
        },
        {
          src: "/img/accessories/ColorfulAccessories.jpg",
          alt: "Emerald and gold drop earrings on a black and gold floral clutch and a green patterned scarf",
          caption: "You can never have enough color when it comes to accessories.",
        },
        {
          src: "/img/accessories/ColorfulFloralVeil_2.jpg",
          alt: "Model holding out a long cathedral veil embroidered with autumn-colored flowers",
          caption: "This fall colored floral cathedral veil is even more stunning in person.",
        },
        {
          src: "/img/accessories/RainbowJewelry.jpg",
          alt: "Rainbow beaded tassel earrings and a rainbow crystal necklace on display",
          caption: "Looking for rainbow jewelry? As a queer friendly store, we scream pride year round.",
        },
        {
          src: "/img/accessories/SparklingHeadpiece.jpg",
          alt: "Model wearing a crystal and floral bridal tiara",
          caption: "Our crystal and floral bridal tiaras are all handmade.",
        },
      ]}
    />
    <${ProductSection}
      id="occasion"
      title="Occasion Collection"
      description=${html`
        We offer a rotating collection of off the rack mother
        of the bride/groom & formal wear.
      `}
      priceRange="$70+"
      images=${[
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
      ]}
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
