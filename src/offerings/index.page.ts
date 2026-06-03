import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { BackLink } from "../_components/BackLink.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

const OfferingsPage: YetiPageComponent = () => html`<${PageBorderLayout}>
  <header>
    <nav>
      <${BackLink} href="/" label="Home" />
    </nav>
    <a href="/">
      <${ResponsiveImage}
        src="/img/logo.png"
        alt="New Unions Bridal"
        fetchpriority="high"
        loading="eager"
        sizes="(width >= 575px) 420px, 80vw"
      />
    </a>
  </header>
  <main>
    <h1 class="section-heading underlined-text">A look at our selection</h1>
    <p class="section-subheading">We are always receiving new products. Please check our social pages and visit us in store to see everything we have to offer!</p>
    <ul class="gallery">
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
              src="/img/store/store-interior-mannequin-dress.jpg"
              alt="A white wedding dress on a mannequin in the store"
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LCD-ATOMIC_BLOOM-324.jpg"
              alt="A person wearing a dip-dyed wedding gown with a white top and a gradient from white to pink to purple on the bottom. They are wearing a celestial wedding cape decorated with stars."
              aria-labelledby="coming-soon-1"
            />
            <span class="coming-soon-badge" id="coming-soon-1">Coming Summer '26</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/store/store-interior-mirror.jpg"
              alt="A large mirror in front of a couch, surrounded by disco balls on the floor and strings of flowers hung on the wall around it."
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LCDGC-89.jpg"
              alt="A person wearing a dip-dyed wedding gown with a white top and a gradient from white to pink on the bottom."
              aria-labelledby="coming-soon-2"
            />
            <span class="coming-soon-badge" id="coming-soon-2">Coming Summer '26</span>
          </li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="landscape">
          <li><${ResponsiveImage}
            src="/img/store/store-interior-mocktail-bar.jpg"
            alt="A bar cart with a set of glasses and a variety of colorful bottles of mocktail mixes."
          /></li>
          <li><${ResponsiveImage}
            src="/img/store/store-interior-from-couch.jpg"
            alt="A view of the store interior, showing a white dress and red suit jacket on mannequins, a rack of wedding attire, and some shelves with accessories on them."
            /></li>
          <li><${ResponsiveImage}
            src="/img/store/store-interior-book.jpg"
            alt="The Book of Nearlyweds, a photo book filled with polaroids of our customers rocking the wedding outfit they picked."
            /></li>
        </ul>
      </li>
      <li>
        <ul class="gallery-row" data-orientation="portrait">
          <li><${ResponsiveImage}
              src="/img/lucy/Lucy_Cant_dance104.JPG"
              alt="A person wearing an elaborate white lacey wedding gown."
              aria-labelledby="coming-soon-3"
            />
            <span class="coming-soon-badge" id="coming-soon-3">Coming Summer '26</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/offerings/jumpsuit-and-short-dress-rack.jpg"
              alt="A rack of white bridal jumpsuits and short white wedding dresses."
            /></li>
          <li><${ResponsiveImage}
              src="/img/lucy/LUCYCANTDANCE-390.jpg"
              alt="A person wearing a black wedding gown with lacy detail."
              aria-labelledby="coming-soon-4"
            />
            <span class="coming-soon-badge" id="coming-soon-4">Coming Summer '26</span>
          </li>
          <li><${ResponsiveImage}
              src="/img/offerings/circular-display-shelf.jpg"
              alt="A display shelf with accessories including handbags, rainbow dried flower arrangements, and bracelets."
            /></li>
        </ul>
      </li>
    </ul>
  </main>
</${PageBorderLayout}>`;

export default OfferingsPage;

OfferingsPage.css = css`
  header {
    nav {
      margin-block-start: var(--space-m-l);
    }

    img {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--space-l-xl);
      width: min(420px, 100%);
      height: auto;
      z-index: 100;
      view-transition-name: header-logo;
    }
  }

  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-inline-size: 1200px;
    margin-inline: auto;
    width: 100%;

    h1 {
      margin-block: var(--space-xl-2xl) var(--space-m);
      margin-inline: auto;
      text-wrap: balance;
    }

    .section-subheading {
      max-width: 720px;
      margin-block-end: var(--space-l-2xl);
      text-wrap: pretty;
    }
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

      picture {
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

      picture {
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

    picture {
      display: block;
      width: 100%;
    }

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
