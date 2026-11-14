import { css, html, type YetiComponent } from "yeti-js";
import { Icon } from "../Icon.component.ts";
import { parseNumber, SPARKLE_DATA, type SparkleData } from "./sparkleGeometry.ts";

type NumberProp = number | string;

/**
 * A single twinkling sparkle icon.
 *
 * Inside a `SparkleGroup`, place it with `x`/`y` (its center, in multiples of
 * the group's `size`, measured from the group's anchor point: +x right, +y
 * down) and optionally `scale` (default 1). `delay` (seconds, relative to the
 * group's phase) and `duration` (seconds) override the group's automatic
 * timing for this sparkle.
 *
 * Owns the base styles shared by every sparkle on the site (the `twinkle`
 * keyframes, the base `.sparkle` rule, and the reduced-motion guard) in the
 * shared "components" bundle, so they're defined exactly once and available on
 * any page — not accidentally inherited from whichever component happens to be
 * on the same page.
 */
export const Sparkle: YetiComponent<{
  x?: NumberProp;
  y?: NumberProp;
  scale?: NumberProp;
  delay?: NumberProp;
  duration?: NumberProp;
  class?: string;
}> = ({ x, y, scale = 1, delay, duration, class: className = "", children: _, ...attrs }) => {
  // Attaching sparkle data to a special `SPARKLE_DATA` attribute so the parent `SparkleGroup` can read it;
  // this data will not be rendered in the HTML
  const data: SparkleData = {
    x: x === undefined ? undefined : parseNumber("x", x),
    y: y === undefined ? undefined : parseNumber("y", y),
    scale: parseNumber("scale", scale),
    delay: delay === undefined ? undefined : parseNumber("delay", delay),
    duration: duration === undefined ? undefined : parseNumber("duration", duration),
  };
  return html`<${Icon}
    name="sparkle"
    width="24"
    height="24"
    class=${`sparkle${className ? ` ${className}` : ""}`}
    ...${{ ...attrs, [SPARKLE_DATA]: data }}
  />`;
};

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
