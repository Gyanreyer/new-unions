import { css, html, js, type YetiComponent } from "yeti-js";

/**
 * Scrolls its content continuously in a loop using the `<marq-uee>` custom element.
 *
 * Pass a single element as children (e.g. a `<ul>`); that element is the unit
 * which gets cloned to fill the width. Without JS, or when the user prefers
 * reduced motion, the content is shown once without moving.
 *
 * Set `--marquee-gap` on the element to change the space between copies, and
 * `--marquee-fade` to fade the content out toward each edge while it scrolls.
 * Use `marq-uee:state(scrolling)` to style things only while it's animating.
 */
export const Marquee: YetiComponent = ({ children, ...attrs }) =>
  html`<marq-uee ...${attrs}>${children}</marq-uee>`;

Marquee.css = css`
  /* Make sure the element is block-level before the custom element is defined */
  marq-uee {
    display: block;
  }
`;

Marquee.js = js`
  ${js.import("./marq-uee.ts")}
`;
