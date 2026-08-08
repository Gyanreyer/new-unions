import { css, html, type YetiComponent } from "yeti-js";
import { AutoplayVideo } from "../_components/AutoplayVideo.component.ts";
import { Sparkle } from "../_components/Sparkle.component.ts";

export const JumpsuitSpotlightSection: YetiComponent = () => html`
  <section id="jumpsuit-spotlight">
    <div class="sparkle-group" data-idx="0">
      <${Sparkle} data-idx="0" />
      <${Sparkle} data-idx="1" />
    </div>
    <h3 class="section-heading">
      <span class="product-spotlight">Product Spotlight:</span><br/>Jumpsuits
    </h3>
    <${AutoplayVideo} src="/video/offerings/JumpsuitsVideo.mp4" label="A looping video of models wearing a variety of different styles of bridal jumpsuits." />
    <div class="copy">
      <p>
        Looking for a queer and inclusive bridal look?
        Our jumpsuit selection is the largest in our area!
        All of our jumpsuits can be ordered in sizes 0-30,
        and our custom lines can also be created into jumpsuits or separates.
      </p>
      <a href="/offerings" class="action-btn primary">View more product!</a>
    </div>
    <div class="sparkle-group two" data-idx="1">
      <${Sparkle} data-idx="0" />
      <${Sparkle} data-idx="1" />
      <${Sparkle} data-idx="2" />
    </div>
  </section>
`;

JumpsuitSpotlightSection.css = css`
#jumpsuit-spotlight {
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto auto 1fr;
  column-gap: var(--space-l);
  row-gap: var(--space-m);

  h3.section-heading {
    position: relative;

    .product-spotlight {
      font-weight: 200;
    }
  }

  .copy {
    position: relative;

    .action-btn {
      margin-block-start: var(--space-m);
    }
  }

  video {
    inline-size: 100%;
    block-size: auto;
    border-radius: 24px;
    /** The video spans all rows in the first column */
    grid-row: 1 / -1;
    grid-column: 1 / 2;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    object-position: top;
  }

  /* Base sparkle styles + twinkle keyframes live in the shared Sparkle
     component; here we only size and offset each one. */
  .sparkle-group[data-idx="0"] {
    margin-inline-start: auto;
    margin-block-start: auto;

    .sparkle[data-idx="0"] {
      inline-size: 52px;
      margin-inline-start: 14px;
      animation-duration: 3.2s;
    }

    .sparkle[data-idx="1"] {
      inline-size: 32px;
      margin-block-start: -4px;
      animation-delay: -1.1s;
      animation-duration: 2.4s;
    }
  }

  .sparkle-group[data-idx="1"] {
    .sparkle[data-idx="0"] {
      inline-size: 26px;
      margin-inline-start: 48px;
      animation-delay: -1.9s;
      animation-duration: 2.8s;
    }
    .sparkle[data-idx="1"] {
      inline-size: 20px;
      margin-block-start: -12px;
      animation-delay: -0.6s;
      animation-duration: 3.6s;
    }
    .sparkle[data-idx="2"] {
      inline-size: 48px;
      margin-block-start: -4px;
      margin-inline-start: 12px;
      animation-delay: -2.5s;
      animation-duration: 3s;
    }
  }

  /** Mobile styling; everything flows into a single column */
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    video {
      grid-row: auto;
    }

    .sparkle-group[data-idx], h3.section-heading, .copy {
      grid-column: auto;
    }

    .sparkle-group[data-idx="0"] {
      /* Move the sparkles into the same row as the video so we can
         position relative to the video's top right corner */
      grid-row: 2 / 3;
      /** Flip the sparkles on x axis */
      margin-block-end: -84px;
      transform: translate(45%, -25%) scaleX(-1);
    }

    .sparkle-group[data-idx="1"] {
      margin-block-start: -110px;
    }
  }

  @media (max-width: 800px) {
    .sparkle-group[data-idx="1"] {
      margin-block-start: -12px;
    }

    .action-btn {
      inline-size: 100%;
    }
  }
}
`;