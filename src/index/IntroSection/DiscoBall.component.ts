import { css, html } from "yeti-js";
import { Icon } from "../../_components/Icon.component.ts";
import { Sparkle } from "../../_components/Sparkle.component.ts";

const SPARKLE_COUNT = 13;

export const DiscoBall = () => html`
<div class="disco-ball">
  <${Icon} name="disco-ball" width="24" height="50" class="disco-ball-icon" />
  <div class="disco-ball-sparkles">
  ${function* () {
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      yield html`<${Sparkle} class="sparkle" data-idx=${i} />`;
    }
  }}
  </div>
</div>`;

DiscoBall.css = css`
@property --sparkles-opacity {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}

.disco-ball {
  position: relative;
  container-type: inline-size;

  .disco-ball-icon {
    width: 100%;
    height: auto;

    anchor-name: --disco-ball-icon;
  }

  .disco-ball-sparkles {
    opacity: var(--sparkles-opacity);
  }

  .sparkle {
    position: absolute;
    position-anchor: --disco-ball-icon;
    transform-origin: center;
    transform: translate(-50%, -50%);

    /** CLEAN ME UP: temp to get un-positioned sparkles out of the way */
    inset-block-start: anchor(0%);
    inset-inline-start: anchor(0%);
    /**
     * Reminder: the center of the ball is approximately anchor(80%), anchor(50%),
     * so all sparkles should be positioned around this point
     */

    /** ~~~ Left side ~~~ */
    &[data-idx="0"] {
      inline-size: 22cqw;
      inset-block-start: anchor(55%);
      inset-inline-start: anchor(-1%);
      animation-delay: -1.3s;
      animation-duration: 3.0s;
    }
    &[data-idx="1"] {
      inline-size: 8cqw;
      inset-block-start: anchor(65%);
      inset-inline-start: anchor(-4%);
      animation-delay: -1.9s;
      animation-duration: 2.7s;
    }
    &[data-idx="2"] {
      inline-size: 14cqw;
      inset-block-start: anchor(72%);
      inset-inline-start: anchor(-20%);
      animation-delay: -0.4s;
      animation-duration: 2.4s;
    }
    &[data-idx="3"] {
      inline-size: 16cqw;
      inset-block-start: anchor(82%);
      inset-inline-start: anchor(-19%);
      animation-delay: -2.7s;
      animation-duration: 3.4s;
    }
    &[data-idx="4"] {
      inline-size: 8cqw;
      inset-block-start: anchor(90%);
      inset-inline-start: anchor(-2%);
      animation-delay: -0.3s;
      animation-duration: 2.8s;
    }
    &[data-idx="5"] {
      inline-size: 24cqw;
      inset-block-start: anchor(98%);
      inset-inline-start: anchor(-5%);
      animation-delay: -1.1s;
      animation-duration: 2.6s;
    }
    &[data-idx="6"] {
      inline-size: 18cqw;
      inset-block-start: anchor(107%);
      inset-inline-start: anchor(25%);
      animation-delay: -2.4s;
      animation-duration: 3.3s;
    }

    /** ~~~ Right side ~~~ */
    &[data-idx="7"] {
      inline-size: 12cqw;
      inset-block-start: anchor(57%);
      inset-inline-start: anchor(97%);
      animation-delay: -0.7s;
      animation-duration: 3.5s;
    }
    &[data-idx="8"] {
      inline-size: 20cqw;
      inset-block-start: anchor(68%);
      inset-inline-start: anchor(113%);
      animation-delay: -2.2s;
      animation-duration: 2.9s;
    }
    &[data-idx="9"] {
      inline-size: 24cqw;
      inset-block-start: anchor(86%);
      inset-inline-start: anchor(110%);
      animation-delay: -1.5s;
      animation-duration: 2.5s;
    }
    &[data-idx="10"] {
      inline-size: 10cqw;
      inset-block-start: anchor(95%);
      inset-inline-start: anchor(95%);
      animation-delay: -1.7s;
      animation-duration: 2.3s;
    }
    &[data-idx="11"] {
      inline-size: 12cqw;
      inset-block-start: anchor(99%);
      inset-inline-start: anchor(85%);
      animation-delay: -0.9s;
      animation-duration: 3.2s;
    }
    &[data-idx="12"] {
      inline-size: 8cqw;
      inset-block-start: anchor(105%);
      inset-inline-start: anchor(60%);
      animation-delay: -2.9s;
      animation-duration: 3.1s;
    }
  }
}`;
