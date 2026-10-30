import { css, html, js, type YetiComponent } from "yeti-js";

/**
 * A horizontally scrolling list with previous/next buttons, via the
 * `<scrollable-list>` custom element (see scrollable-list.ts).
 *
 * Children must be `<li>` elements; put anything inside them.
 *
 * ```ts
 * <${ScrollableList} label="Loulette Bride photos">
 *   ${photos.map((p) => html`<li><${ResponsiveImage} src=${p.src} alt=${p.alt} /></li>`)}
 * </${ScrollableList}>
 * ```
 *
 * Without JS it's a plain strip you can swipe or scroll (the list itself is
 * focusable, so arrow keys work). The element adds previous/next buttons
 * (in the page gutter on wide screens, over the list on narrow ones, none on
 * touch-only phones).
 *
 * Pass `gutter-media` to change when the gutter layout is used (default
 * `(width >= 64rem)`, which is when this site's page gutter fits a button).
 *
 * The list sets each item's width; items fill it. Columns visible:
 * 4 / 3 / 2 / 1.4 as the list narrows. Keep at least one full item visible
 * (columns >= 1): the buttons rely on scroll snapping, and browsers
 * don't snap items wider than the visible area. CSS hooks:
 * - `--scrollable-list-columns`: force a column count
 * - `--scrollable-list-gap`: space between items
 */
export const ScrollableList: YetiComponent<{
  label: string;
  "gutter-media"?: string;
  "prev-label"?: string;
  "next-label"?: string;
  class?: string;
}> = ({ label, children, ...attrs }) => {
  if (!label) {
    throw new Error("ScrollableList: `label` is required (it names the list for screen readers)");
  }
  // The arrow joins the shared icon sprite; the element <use>s it for its buttons
  return html`${html.import("/_icons/arrow.svg", { bundleName: "icons" })}
  <scrollable-list arrow-icon="${html.src("icons")}#arrow" ...${attrs}>
    <ul role="list" aria-label=${label} tabindex="0">${children}</ul>
  </scrollable-list>`;
};

ScrollableList.css = css`
${css.bundle("components")}
scrollable-list {
  display: block;
}

scrollable-list > :is(ul, ol) {
  --_gap: var(--scrollable-list-gap, var(--space-s, 1rem));
  container-type: inline-size;
  display: flex;
  gap: var(--_gap);
  margin: 0;
  /* Room so focus outlines on items aren't clipped by the scroll box */
  padding: 4px 0;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  > li {
    --_columns: var(--scrollable-list-columns, 1.4);
    flex: 0 0 calc((100cqi - (var(--_columns) - 1) * var(--_gap)) / var(--_columns));
    min-inline-size: 0;
    scroll-snap-align: start;
  }
}

@container (width >= 26rem) {
  scrollable-list > :is(ul, ol) > li {
    --_columns: var(--scrollable-list-columns, 2);
  }
}

@container (width >= 38rem) {
  scrollable-list > :is(ul, ol) > li {
    --_columns: var(--scrollable-list-columns, 3);
  }
}

@container (width >= 52rem) {
  scrollable-list > :is(ul, ol) > li {
    --_columns: var(--scrollable-list-columns, 4);
  }
}

@media (prefers-reduced-motion: no-preference) {
  scrollable-list > :is(ul, ol) {
    scroll-behavior: smooth;
  }
}

/* With the buttons available, the scrollbar is redundant. */
scrollable-list:state(connected) > :is(ul, ol) {
  scrollbar-width: none;
}

/* Line snapped items up just past the overlaid "previous" button */
scrollable-list[data-layout="overlay"] > :is(ul, ol) {
  scroll-padding-inline-start: calc(var(--scrollable-list-button-size, 2.75rem) + 1rem);
}
`;

ScrollableList.js = js`
  ${js.import("./scrollable-list.ts")}
`;
