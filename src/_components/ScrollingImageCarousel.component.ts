import { css, html, type YetiComponent } from "yeti-js";

export const ScrollingImageCarousel: YetiComponent<{
  direction?: "left" | "right";
}> = ({ children, direction = "left", ...spreadAttrs }) => html`
  <div class="carousel-container">
    <div class="scrolling-image-carousel" data-dir=${direction} ...${spreadAttrs}>
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

  .scrolling-image-carousel {
    --carousel-height: 420px;
    height: var(--carousel-height);
    width: 100vw;
    margin-inline: calc(50% - 50vw);
    position: relative;
    overflow-x: clip;

    .images {
      position: absolute;
      height: 100%;
      display: flex;
      gap: 42px;
      /* Center on page by default; this will be enhanced to a fancy scrolling effect if supported */
      transform: translateX(-50%);
      left: 50%;
      @supports (animation-timeline: view()) {
        /* Overflow size is the difference between the <main> element container width and the total width of the carousel;
          if we shift the images by this amount off of -50%, one of the edges will be flush with the container */
        --overflow-size: calc(((100% - 100cqw) / 2));
        animation-timeline: view();
        animation-timing-function: linear;
        animation-range: cover;

        animation-name: carousel-scroll-ltr;
      }
    }

    &[data-dir="right"] .images {
      animation-name: carousel-scroll-rtl;
    }

    img {
      background-color: #e3e3e3;
      border-radius: 48px;
      aspect-ratio: 9/10;
      height: 100%;
      width: auto;
      display: block;
      object-fit: cover;
      box-shadow: var(--image-drop-shadow);
    }
  }
`;