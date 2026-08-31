import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-07-23",
};

// Props to apply to eagerly loaded images from the first row
const eagerImageProps = {
  fetchpriority: "high",
  loading: "eager",
  // Sizes tuned for portrait-oriented images in the first row
  sizes: "(width >= 1600px) 278px, (width >= 1200px) 200px, (width >= 750px) 35vw, 75vw"
};

const OfferingsPage: YetiPageComponent = ({ page }) => html`<${PageBorderLayout} title="Offerings | New Unions Bridal" url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>A look at our selection</h1>
      <p>
        We are always receiving new products.
        Please check our social pages and visit us in store to see everything we have to offer!
      </p>
    </${SecondaryPageMainSectionHeader}>
    <ul class="gallery">
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <!-- Eagerly load first row of images -->
          <li><${ResponsiveImage}
            src="/img/offerings/Full_Length_LaceDress.jpg"
            alt="A full-length lace wedding dress."
            ...${eagerImageProps}
          /></li>
          <li><${ResponsiveImage}
            src="/img/loulette/Loulette2025_Final_0059.jpeg"
            alt="A model wearing a Loulette wedding dress."
            ...${eagerImageProps}
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Short_Dress_Beaded.jpg"
            alt="A short beaded wedding dress."
            ...${eagerImageProps}
          /></li>
          <li><${ResponsiveImage}
            src="/img/loulette/Loulette2025_Final_0159.jpeg"
            alt="A model sitting on a chair wearing a rainbow beaded Loulette wedding dress."
            ...${eagerImageProps}
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
              src="/img/store/store-interior-mannequin-dress.jpg"
              alt="A mannequin wearing a short white wedding dress with a pearl necklace and a floral headpiece."
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LCD-ATOMIC_BLOOM-324.jpg"
              alt="A model wearing a dip-dyed wedding gown with a white top and a gradient from white to pink to purple on the bottom. They are wearing a celestial wedding cape decorated with stars."
              aria-labelledby="coming-soon-1"
            />
            <span class="coming-soon-badge" id="coming-soon-1">Arriving soon!</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/store/store-interior-mirror.jpg"
              alt="A large mirror in front of a couch, surrounded by disco balls on the floor and strings of flowers hung on the wall around it."
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LCDGC-89--vertical-crop.jpg"
              alt="A model wearing a dip-dyed wedding gown with a white top and a gradient from white to pink on the bottom."
              aria-labelledby="coming-soon-2"
            />
            <span class="coming-soon-badge" id="coming-soon-2">Arriving soon!</span>
          </li>
          </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="landscape">
          <li><${ResponsiveImage}
            src="/img/offerings/Floral_Formal_Hangbags_Purses.jpg"
            alt="A display of floral formal handbags and purses."
          /></li>
          <li><${ResponsiveImage}
            src="/img/store/store-interior-from-couch.jpg"
            alt="A view of the store interior, showing a white dress and red suit jacket on mannequins, a rack of wedding attire, and some shelves with accessories on them."
            /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Tea_Length_Dress_with_Cape.jpg"
            alt="A white tea-length dress with a cape."
            style="object-position: top"
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
              src="/img/lucy/Lucy_Cant_dance104.JPG"
              alt="A model wearing an elaborate white lacey wedding gown."
              aria-labelledby="coming-soon-3"
            />
            <span class="coming-soon-badge" id="coming-soon-3">Arriving soon!</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/offerings/jumpsuit-and-short-dress-rack.jpg"
              alt="A rack of white bridal jumpsuits and short white wedding dresses."
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LUCYCANTDANCE-390.jpg"
              alt="A model wearing a black wedding gown with lacy detail."
              aria-labelledby="coming-soon-4"
            />
            <span class="coming-soon-badge" id="coming-soon-4">Arriving soon!</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/offerings/circular-display-shelf.jpg"
              alt="A display shelf with accessories including handbags, rainbow dried flower arrangements, and bracelets."
            /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
            src="/img/offerings/Black_Ballgown_Wedding_Dress.jpg"
            alt="A black ballgown wedding dress."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Tea_Length_Dress_Reception_with_Bridal_Hat.jpg"
            alt="A white tea-length reception dress with a big bow, paired with a bridal hat."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Long_FitandFlare_Beaded_WeddingDress_2.jpg"
            alt="A long fit-and-flare wedding dress with intricate beaded details."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Black_Dress_With_Ruffle_Robe.jpg"
            alt="A black dress paired with a black ruffle robe."
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="landscape">
          <li><${ResponsiveImage}
            src="/img/offerings/Headpieces.jpg"
            alt="A tray of wedding headpieces."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Bee_Handbag.jpg"
            alt="A black handbag with gold beaded bees on it."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Accessories_Necklaces_Earrings.jpg"
            alt="A display of wedding accessories including necklaces and earrings."
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
            src="/img/store/store-entrance-with-broached-ties.jpg"
            alt="The entrance of the store, showing broached ties on display as well as pride tote bags, bandanas, and hats."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Champagne_Full_Beaded_ALine.jpg"
            alt="A champagne full beaded a-line wedding gown."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Long_ALine_Sparkle_Champagne_Wedding_Dress_with_Slit.jpg"
            alt="A long A-line champagne wedding dress with sparkly beaded detail and a slit."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Vintage_Jessica_Mcclintock.jpg"
            alt="A vintage Jessica Mcclintock wedding dress."
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
            src="/img/offerings/Cowboy_Hat_Womens_Blazer_with_bows_Handmade.jpg"
            alt="A handmade brown cowboy hat with lace detail and a tulle bow, paired with a handmade white women's blazer decorated with bows."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Full_Champagne_Colored_Beaded_Ballgown.jpg"
            alt="A champagne-colored ballgown with colored beading details."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Tea_Length_Lace_Dress_with_Bridal_Cape.jpg"
            alt="A white tea-length lace dress paired with a bridal cape."
          /></li>
          <li><${ResponsiveImage}
            src="/img/offerings/Vintage_Beaded_WeddingDress.jpg"
            alt="A close-up view of beaded details on the back of a vintage wedding dress."
          /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="landscape">
          <li><${ResponsiveImage}
            src="/img/offerings/BeadedHandbag_Purse.jpg"
            alt="A display of a beaded handbag and jewelry."
          /></li>
          <li><${ResponsiveImage}
            src="/img/store/store-interior-mocktail-bar.jpg"
            alt="A bar cart with a set of glasses and a variety of colorful bottles of mocktail mixes."
          /></li>
          <li><${ResponsiveImage}
            src="/img/store/store-interior-book.jpg"
            alt="The Book of Nearlyweds, a photo book filled with polaroids of our customers rocking the wedding outfit they picked."
            /></li>
        </ul>
      </li>
    </ul>
  </main>
</${PageBorderLayout}>`;

export default OfferingsPage;

OfferingsPage.css = css`
  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-inline-size: 1200px;
    margin-inline: auto;
    width: 100%;
  }

  .gallery-row {
    display: grid;
    gap: var(--space-m);

    & > li {
      position: relative;
    }

    &[data-orientation="portrait"] {
      grid-template-columns: repeat(4, 1fr);

      & > :nth-child(2) img {
        --i: 1;
      }
      & > :nth-child(3) img {
        --i: 2;
      }
      & > :nth-child(4) img {
        --i: 3;
      }

      @media screen and (width <= 1200px) {
        grid-template-columns: repeat(2, 1fr);

        & > :nth-child(3) img {
          --i: 0;
        }
        & > :nth-child(4) img {
          --i: 1;
        }
      }

      @media screen and (width <= 750px) {
        grid-template-columns: 1fr;

        & > :nth-child(n) img {
          --i: 0;
        }
      }

      img {
        aspect-ratio: 7 / 10;
      }
    }

    &[data-orientation="landscape"] {
      grid-template-columns: repeat(3, 1fr);

      & > :nth-child(2) img {
        --i: 1;
      }
      & > :nth-child(3) img {
        --i: 2;
      }

      @media screen and (width <= 1200px) {
        grid-template-columns: 1fr;

        & > :nth-child(n) img {
          --i: 0;
        }
      }

      img {
        aspect-ratio: 12 / 10;
      }
    }
  }

  @keyframes slideFadeOfferingsImg {
    from {
      opacity: 0;
      translate: 0 var(--space-s-l);
    }

    to {
      opacity: 1;
      translate: 0;
    }
  }

  .gallery {
    width: 100%;
    max-width: 1200px;

    display: flex;
    flex-direction: column;
    gap: var(--space-m);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 24px;

      --i: 0;

      @media (prefers-reduced-motion: no-preference) {
        @supports (animation-timeline: view()) {
          animation-name: slideFadeOfferingsImg;
          animation-duration: 0.5s;
          animation-timeline: view();
          animation-range: entry calc(var(--i) * 20%) entry calc(70% + var(--i) * 20%);
          animation-fill-mode: both;
        }
      }
    }
  }

  @property --coming-soon-badge-bg-shift {
    syntax: "<length> | <percentage>";
    inherits: true;
    initial-value: 0%;
  }

  @keyframes comingSoonBadgeAppear {
    0% {
      opacity: 0.5;
      --coming-soon-badge-bg-shift: -75%;
      color: transparent;
    }

    60% {
      opacity: 1;
      color: transparent;
    }

    80% {
      --coming-soon-badge-bg-shift: 0%;
    }

    100% {
      --coming-soon-badge-bg-shift: 0%;
      color: var(--white);
    }
  }

  .coming-soon-badge {
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: var(--space-m);
    color: var(--white);
    font-size: var(--font-size-xs);
    font-weight: 700;
    line-height: 1;
    padding: var(--space-2xs) var(--space-xs);
    z-index: 0;
    overflow: clip;

    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        animation-name: comingSoonBadgeAppear;
        animation-timeline: view();
        animation-range: cover 0% cover 15%;
        animation-fill-mode: both;
      }
    }


    &:before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: var(--orange);
      --rounded-corner-radius: 8px;
      border-start-end-radius: var(--rounded-corner-radius);
      border-end-end-radius: var(--rounded-corner-radius);
      z-index: -1;
      transform: translateX(var(--coming-soon-badge-bg-shift));
    }
  }
`;
