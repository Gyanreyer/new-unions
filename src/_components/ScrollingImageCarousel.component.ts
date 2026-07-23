import { css, html, type YetiComponent } from "yeti-js";

export const ScrollingImageCarousel: YetiComponent<{
  direction?: "left" | "right";
}> = ({ children, direction = "left", ...spreadAttrs }) => html`
  <div class="carousel-container" ...${spreadAttrs}>
    <div class="scrolling-image-carousel" data-dir=${direction} >
      <div class="images">
        ${children}
      </div>
    </div>
  </div>
`;

ScrollingImageCarousel.css = css`
  .carousel-container {
    container-type: inline-size;
    width: 100%;
  }

  /* Default fallback when the scroll-driven carousel animation should be disabled: display images in a grid */
  .scrolling-image-carousel .images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 1fr));
    gap: var(--space-s-m);
  }

  .scrolling-image-carousel img {
    background-color: #e3e3e3;
    border-radius: 24px;
    aspect-ratio: 9/10;
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    box-shadow: var(--image-drop-shadow);
  }

  @keyframes carousel-scroll-ltr {
    from {
      transform: translateX(calc(-50% + var(--overflow-size)));
    }
    to {
      transform: translateX(calc(-50% - var(--overflow-size)));
    }
  }

  @keyframes carousel-scroll-rtl {
    from {
      transform: translateX(calc(-50% - var(--overflow-size)));
    }
    to {
      transform: translateX(calc(-50% + var(--overflow-size)));
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .scrolling-image-carousel {
        /** Flex from 320px->420px
         * @link https://utopia.fyi/clamp/calculator?a=360,1240,320—420
         */
        height: clamp(20rem, 17.4432rem + 11.3636vw, 26.25rem);
        width: 100vw;
        margin-inline: calc(50% - 50vw);
        position: relative;
        overflow-x: clip;

        .images {
          position: absolute;
          height: 100%;
          /* Override the fallback grid to display on single row */
          display: flex;
          /* Center on page by default; this will be enhanced to a fancy scrolling effect if supported */
          transform: translateX(-50%);
          left: 50%;
          /* Overflow size is the difference between the <main> element container width and the total width of the carousel;
            if we shift the images by this amount off of -50%, one of the edges will be flush with the container */
          --overflow-size: calc(((100% - 100cqw) / 2));
          animation-timeline: view();
          animation-timing-function: linear;
          animation-range: cover;

          animation-name: carousel-scroll-ltr;
        }

        img {
          /** Size images to fill row height */
          height: 100%;
          width: auto;
        }
      }

      .scrolling-image-carousel[data-dir="right"] .images {
        animation-name: carousel-scroll-rtl;
      }
    }
  }
`;