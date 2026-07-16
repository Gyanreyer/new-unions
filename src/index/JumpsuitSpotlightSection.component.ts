import { css, html, type YetiComponent } from "yeti-js";
import { AutoplayVideo } from "../_components/AutoplayVideo.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { Icon } from "../_components/Icon.component.ts";

export const JumpsuitSpotlightSection: YetiComponent = () => html`
  <section id="jumpsuit-spotlight">
    <div class="sparkle-group one">
      <${Icon} name="sparkle" width="24" height="24" class="sparkle one" />
      <${Icon} name="sparkle" width="24" height="24" class="sparkle two" />
    </div>
    <h3 class="section-heading">
      <span class="product-spotlight">Product Spotlight:</span><br/>Jumpsuits
    </h3>
    <${AutoplayVideo} src="/video/offerings/JumpsuitsVideo.mp4" label="A looping video of models wearing a variety of different styles of bridal jumpsuits." />
    <div class="copy">
      <p>
        Want something different?
        Our jumpsuit selection is the largest in our area!
        All of our jumpsuits can be ordered in sizes 0-30,
        and our custom lines can also be created into jumpsuits or separates.
      </p>
      <a href="/offerings" class="action-btn primary">View more product!</a>
    </div>
    <div class="sparkle-group two">
      <${Icon} name="sparkle" width="24" height="24" class="sparkle one" />
      <${Icon} name="sparkle" width="24" height="24" class="sparkle two" />
      <${Icon} name="sparkle" width="24" height="24" class="sparkle three" />
    </div>
  </section>
`;

JumpsuitSpotlightSection.css = css`
  @keyframes twinkle {
    0% {
      opacity: 0.5;
      transform: scale(0.82);
      filter: drop-shadow(0 0 0 rgb(255 255 255 / 0));
      animation-timing-function: cubic-bezier(0.3, 0, 0.15, 1);
    }
    14% {
      opacity: 1;
      filter: drop-shadow(0 0 7px rgb(255 255 255 / 0.55));
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    22% {
      transform: scale(1.07);
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }
    62%, 100% {
      opacity: 0.5;
      transform: scale(0.82);
      filter: drop-shadow(0 0 0 rgb(255 255 255 / 0));
    }
  }

#jumpsuit-spotlight {
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto auto 1fr;
  column-gap: var(--space-l);
  row-gap: var(--space-m);

  h3.section-heading {
    position: relative;
    grid-column: 2 / -1;
    grid-row: 2 / 3;

    .product-spotlight {
      font-weight: 200;
    }
  }

  .copy {
    grid-column: 2 / -1;
    grid-row: 3 / 4;
    position: relative;

    .action-btn {
      margin-block-start: var(--space-m);
    }
  }

  video {
    inline-size: 100%;
    block-size: auto;
    border-radius: 24px;
    grid-column: 1 / 2;
    grid-row: 1 / 5;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    object-position: top;
  }

  .sparkle-group .sparkle {
    display: block;
    position: relative;
    block-size: auto;
    animation: twinkle 3s infinite;
    transform-origin: center;
    will-change: opacity, transform, filter;
  }

  .sparkle-group.one {
    margin-inline-start: auto;
    margin-block-start: auto;

    grid-column: 2 / -1;
    grid-row: 1 / 2;

    .sparkle.one {
      inline-size: 52px;
      margin-inline-start: 14px;
      animation-duration: 3.2s;
    }

    .sparkle.two {
      inline-size: 32px;
      margin-block-start: -4px;
      animation-delay: -1.1s;
      animation-duration: 2.4s;
    }
  }

  .sparkle-group.two {

    .sparkle.one {
      inline-size: 26px;
      margin-inline-start: 48px;
      animation-delay: -1.9s;
      animation-duration: 2.8s;
    }
    .sparkle.two {
      inline-size: 20px;
      margin-block-start: -12px;
      animation-delay: -0.6s;
      animation-duration: 3.6s;
    }
    .sparkle.three {
      inline-size: 48px;
      margin-block-start: -4px;
      margin-inline-start: 12px;
      animation-delay: -2.5s;
      animation-duration: 3s;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sparkle-group .sparkle {
      animation: none;
    }
  }
}
`;