import { css, html } from "yeti-js";
import { ResponsiveImage } from "../../_components/ResponsiveImage.component.ts";
import { BookAppointmentButton } from "../../_components/BookAppointmentButton.component.ts";
import { Sparkle } from "../../_components/Sparkle.component.ts";
import { DiscoBall } from "./DiscoBall.component.ts";

export const IntroSection = () =>
  html`<section id="intro">
    <div class="text-column">
      <h2 class="section-heading">
        We celebrate love <br />
        <span class="scroll-reveal-underline">differently.</span>
      </h2>
      <p>
        A love letter to anyone searching for wedding attire that deviates from
        the traditional, rooted in a safe space that celebrates everyone. New
        Unions is a wedding attire experience dedicated to couples that fit
        outside of the binary.
      </p>
      <p>
        We welcome everyone and anyone to shop with us to find a wedding outfit
        that is as unique as you. Sizes 0-30 celebrated here!
      </p>
      <div class="action-buttons">
        <${BookAppointmentButton} />
        <a href="/faq" class="action-btn secondary" id="what-to-expect">What to Expect at an Appointment</a>
      </div>
    </div>
    <aside class="image-column">
      <div class="sparkle-group">
        <${Sparkle} data-idx="0"/>
        <${Sparkle} data-idx="1"/>
        <${Sparkle} data-idx="2"/>
      </div>
      <${ResponsiveImage}
        src="/img/offerings/Feather_Dress_Reception_Party.jpg"
        alt="A white reception party dress with feather details on a mannequin."
        class="img-1"
      />
      <${ResponsiveImage}
        src="/img/offerings/Sequins_Together_2.jpg"
        alt="Two brides modeling together wearing sequined bridal jumpsuits in white and champagne."
        class="img-2"
      />
      <${DiscoBall} />
    </aside>
  </section>`;


IntroSection.css = css`
  @keyframes disco-ball-appear {
    0% {
      opacity: 0;
      transform: translateY(-60%) scale(0.85) rotate(-3deg);
      --sparkles-opacity: 0;
    }
    30% {
      opacity: 1;
    }
    55% {
      /* one gentle overshoot past the resting point */
      transform: translateY(3%) scale(1.03) rotate(2deg);
    }
    80% {
      /* single soft swing-back, then settle */
      transform: translateY(0) scale(1) rotate(-0.8deg);
    }
    /* hold the sparkles hidden until the ball is nearly still, then fade
       them in gradually across the settle rather than snapping on */
    65% {
      --sparkles-opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0);
      --sparkles-opacity: 1;
    }
  }

  @keyframes disco-ball-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  #intro {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    column-gap: var(--space-2xl);
    row-gap: var(--space-m-l);

    @media screen and (width <= 1200px) {
      grid-template-columns: 1fr;
    }

    .text-column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: var(--space-m);

      p {
        text-align: left;
        line-height: 1.325;
        text-wrap: pretty;
      }

      .action-buttons {
        display: flex;
        flex-direction: column;
        row-gap: var(--space-s);

        .action-btn {
          text-align: center;
        }

        #what-to-expect {
          font-size: var(--font-size-s);
          padding-inline: var(--space-s);
        }
        @media screen and (width <= 480px) {
          width: 100%;
        }
      }

      @media screen and (width <= 800px) {
        .action-buttons {
          /** Change order so action buttons come before paragraphs */
          order: 10;
        }

        p {
          order: 20;
        }
      }
    }

    .image-column {
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      container-type: inline-size;

      img {
        width: 100%;
        height: auto;
        background-color: #e3e3e3;
        border-radius: 24px;
        object-fit: cover;
        box-shadow: var(--image-drop-shadow);
      }

      .img-1 {
        width: 85%;
        align-self: flex-start;
        background-color: #c0bebe;
        aspect-ratio: 84 / 100;
        object-position: top;
        anchor-name: --img-1;
      }

      .img-2 {
        width: 67%;
        align-self: flex-end;
        /* Shift up to overlap with 1st image */
        margin-block-start: -25%;
        aspect-ratio: 86 / 100;
        z-index: 1;
      }
    }

    .sparkle-group {
      position: absolute;
      inset-block-start: -28px;
      inset-inline-end: 0;

      /* Base sparkle styles + twinkle keyframes live in the shared Sparkle
         component; here we only size and offset each one. */
      .sparkle[data-idx="0"] {
        inline-size: 20px;
        animation-delay: -1.1s;
        animation-duration: 2.4s;
      }

      .sparkle[data-idx="1"] {
        inline-size: 42px;
        animation-delay: -2.5s;
        animation-duration: 2.8s;
        margin-block-start: -26px;
        margin-inline-start: 28px;
      }

      .sparkle[data-idx="2"] {
        inline-size: 26px;
        animation-delay: -0.8s;
        animation-duration: 2.6s;
        margin-inline-start: 16px;
        margin-block-start: -2px;
      }
    }
    
    .disco-ball {
      position: absolute;
      position-anchor: --img-1;
      inset-block-start: anchor(94%);
      inset-inline-start: anchor(5%);
      inline-size: 25cqw;
      z-index: -1;

      /* Pivot from the top of the string so the rotate() reads as a
         pendulum swing rather than a spin. */
      transform-origin: top center;

      animation-name: disco-ball-appear;
      animation-fill-mode: both;
      animation-timeline: view();
      /* Scroll-scrubbed, so this range (not a duration) is the pacing —
         widen it to give the settle room to read, tighten it to snap. */
      animation-range: cover 12% cover 40%;

      @media (prefers-reduced-motion: reduce) {
        /* No drop or swing — just fade the ball in. */
        animation-name: disco-ball-fade;
        transform: none;
      }
    }
  }
`;
