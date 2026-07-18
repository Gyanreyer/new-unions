import { css, html, type YetiComponent } from "yeti-js";
import { Icon } from "./Icon.component.ts";

/**
 * A single twinkling sparkle icon.
 *
 * Owns the base styles shared by every sparkle on the site (the `twinkle`
 * keyframes, the base `.sparkle` rule, and the reduced-motion guard) in the
 * shared "components" bundle, so they're defined exactly once and available on
 * any page — not accidentally inherited from whichever component happens to be
 * on the same page.
 *
 * Positioning, sizing, and per-instance animation timing are left to the call
 * site (via extra classes or inline style), since those are unique per layout.
 */
export const Sparkle: YetiComponent<{ class?: string }> = (
  { class: className = "", ...attrs },
) =>
  html`<${Icon} name="sparkle" width="24" height="24" class=${`sparkle${className ? ` ${className}` : ""}`} ...${attrs} />`;

Sparkle.css = css`
${css.bundle("components")}
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

.sparkle {
  display: block;
  position: relative;
  block-size: auto;
  animation: twinkle 3s infinite;
  animation-composition: add;
  transform-origin: center;
  will-change: opacity, transform, filter;
}

@media (prefers-reduced-motion: reduce) {
  .sparkle {
    animation: none;
  }
}
`;
