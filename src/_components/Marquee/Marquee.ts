import { css, html, js, type YetiComponent } from "yeti-js";
import { Icon } from "../Icon.component.ts";

/**
 * Scrolls its content continuously in a loop using the `<marq-uee>` custom element.
 *
 * Pass a single element as children (e.g. a `<ul>`); that element is the unit
 * which gets cloned to fill the width. Without JS, or when the user prefers
 * reduced motion, the content is shown once without moving.
 *
 * Set `--marquee-gap` on the element to change the space between copies, and
 * `--marquee-fade` to fade the content out toward each edge while it scrolls.
 * While scrolling it shows a pause/play button; pass `pause-label` and
 * `play-label` to name it for what's scrolling.
 * Use `marq-uee:state(scrolling)` to style things only while it's animating.
 */
export const Marquee: YetiComponent = ({ children, ...attrs }) =>
  html`<marq-uee ...${attrs}>
    ${children}
    <${Icon} name="pause" slot="pause-icon" aria-hidden="true" />
    <${Icon} name="play" slot="play-icon" aria-hidden="true" />
  </marq-uee>`;

Marquee.css = css`
  /* Make sure the element is block-level before the custom element is defined */
  marq-uee {
    display: block;
  }

  /* The pause/play icons are only shown in the element's button, so hide them
     until it's defined (and for good without JS) */
  marq-uee:not(:defined) > [slot] {
    display: none;
  }
`;

Marquee.js = js`
  ${js.import("./marq-uee.ts")}
`;
