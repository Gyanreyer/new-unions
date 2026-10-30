/**
 * Adds previous/next buttons to a horizontally scrolling list.
 *
 * Expected markup (the `ScrollableList` component renders this):
 *
 * <scrollable-list>
 *   <ul role="list" aria-label="Loulette Bride photos" tabindex="0">
 *     <li>…</li>
 *   </ul>
 * </scrollable-list>
 *
 * Without JS, the <ul> is a plain snapping strip you can swipe, trackpad- or
 * keyboard-scroll. Once this element is defined it adds the buttons (in its
 * shadow DOM), hides the scrollbar, and hides whichever button has nothing
 * left to scroll to. Every item stays reachable; nothing is made inert.
 *
 * Button layout depends on the screen:
 * - When `gutter-media` matches (default `(width >= 64rem)`): the previous
 *   button hangs outside the list's start edge (into the page gutter) and the
 *   next button sits in a column at the end.
 * - Otherwise, on touch-only screens: no buttons; swipe to scroll.
 * - Otherwise: buttons overlay the list's edges.
 *
 * Attributes and the list's items are read once when the element connects;
 * changing them afterwards has no effect (this site is static).
 *
 * Attributes:
 * - `arrow-icon` (required): URL of the arrow icon to `<use>`, pointing toward
 *   inline-end, e.g. "/icons.svg#arrow" (the `ScrollableList` component sets it).
 * - `gutter-media`: media query for when the gutter layout has room.
 * - `prev-label` / `next-label`: accessible names for the buttons.
 *
 * Style hooks:
 * - `::part(button)`, `::part(prev)`, `::part(next)`
 * - `--scrollable-list-button-size` (default 2.75rem)
 * - `:state(enhanced)`, `:state(at-start)`, `:state(at-end)`
 * - `[data-layout="gutter" | "overlay" | "touch"]`: the current layout, set by
 *   the element itself (absent until it has loaded)
 */

type Layout = "gutter" | "overlay" | "touch";
const DEFAULT_GUTTER_MEDIA = "(width >= 64rem)";
const TOUCH_ONLY_MEDIA = "(hover: none) and (pointer: coarse)";

const SVG_NS = "http://www.w3.org/2000/svg";

const styles = new CSSStyleSheet();
styles.replaceSync(/*css*/`
  :host {
    --_button-size: var(--scrollable-list-button-size, 2.75rem);
    --_gap: var(--scrollable-list-arrow-gap, 0.5rem);
    display: block;
  }

  /* Variations are written as ":host(...) &" so :host stays outside the
     nesting selector; :host inside :is() isn't matched reliably everywhere. */

  .layout {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    column-gap: var(--_gap);

    /* gutter: pull the start column out past the list's own edge */
    :host([data-layout="gutter"]) & {
      margin-inline-start: calc(-1 * (var(--_button-size) + var(--_gap)));
    }

    /* touch and overlay: just the list (buttons are hidden, or float over it) */
    :host([data-layout="touch"]) &,
    :host([data-layout="overlay"]) & {
      grid-template-columns: minmax(0, 1fr);
    }

    :host([data-layout="overlay"]) & {
      position: relative;
    }
  }

  button {
    display: grid;
    place-items: center;
    inline-size: var(--_button-size);
    block-size: var(--_button-size);
    padding: 0;
    border: none;
    border-radius: 50%;
    background: none;
    color: inherit;
    cursor: pointer;

    &:hover {
      background-color: color-mix(in srgb, currentColor 12%, transparent);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    :host([data-layout="touch"]) & {
      display: none;
    }

    :host([data-layout="overlay"]) & {
      position: absolute;
      inset-block-start: 50%;
      translate: 0 -50%;
      z-index: 1;
      color: var(--scrollable-list-overlay-color, #fff);
      background-color: var(--scrollable-list-overlay-background, rgb(0 0 0 / 0.5));
      backdrop-filter: blur(4px);

      &:hover {
        background-color: var(--scrollable-list-overlay-background-hover, rgb(0 0 0 / 0.7));
      }
    }
  }

  svg {
    inline-size: 80%;
    block-size: auto;
  }

  /* The icon points toward inline-end, so it flips for "previous" in
     left-to-right text and for "next" in right-to-left text.
     Each button hides (keeping its space) when there's nowhere to go. */
  .prev {
    svg {
      transform: scaleX(-1);
    }

    :host(:dir(rtl)) & svg {
      transform: none;
    }

    :host(:state(at-start)) & {
      visibility: hidden;
    }

    :host([data-layout="overlay"]) & {
      inset-inline-start: var(--_gap);
    }
  }

  .next {
    :host(:dir(rtl)) & svg {
      transform: scaleX(-1);
    }

    :host(:state(at-end)) & {
      visibility: hidden;
    }

    :host([data-layout="overlay"]) & {
      inset-inline-end: var(--_gap);
    }
  }
`);

export class ScrollableListElement extends HTMLElement {
  static TAGNAME = "scrollable-list";

  static #touchOnlyQuery = window.matchMedia(TOUCH_ONLY_MEDIA);

  static {
    window.customElements.define(this.TAGNAME, this);
  }

  #internals = this.attachInternals();
  #list: HTMLElement | null = null;
  #prev: HTMLButtonElement | null = null;
  #next: HTMLButtonElement | null = null;
  #gutterQuery: MediaQueryList | null = null;
  #onMediaChange = () => this.#applyLayout();
  #resizeObserver = new ResizeObserver(() => this.#updateEnds());

  /**
   * Update which scroll buttons are visible as the list is scrolled
   */
  #onScroll = () => this.#updateEnds();

  connectedCallback() {
    const list = this.querySelector<HTMLElement>(":scope > ul, :scope > ol");
    if (!list) {
      console.error(`<${ScrollableListElement.TAGNAME}> expects a <ul> or <ol> as its direct child.`, this);
      return;
    }
    this.#list = list;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" }).adoptedStyleSheets = [styles];
    }
    this.#render();
    this.#gutterQuery = window.matchMedia(this.getAttribute("gutter-media") ?? DEFAULT_GUTTER_MEDIA);
    this.#gutterQuery.addEventListener("change", this.#onMediaChange);
    ScrollableListElement.#touchOnlyQuery.addEventListener("change", this.#onMediaChange);
    this.#applyLayout();

    list.addEventListener("scroll", this.#onScroll, { passive: true });
    this.#resizeObserver.observe(list);
    this.#internals.states.add("connected");
    this.#updateEnds();
  }

  disconnectedCallback() {
    this.#list?.removeEventListener("scroll", this.#onScroll);
    this.#gutterQuery?.removeEventListener("change", this.#onMediaChange);
    ScrollableListElement.#touchOnlyQuery.removeEventListener("change", this.#onMediaChange);
    this.#resizeObserver.disconnect();
  }

  /** Picks the button layout for the current screen size and input type. */
  #applyLayout() {
    // If the window is wide enough, show arrows in the gutters around the list
    const layout: Layout = this.#gutterQuery?.matches
      ? "gutter"
      : ScrollableListElement.#touchOnlyQuery.matches
        // If the device is small and touch-only, hide the arrows; the user can swipe through
        ? "touch"
        // If the device is small but not touch-only, show overlay arrows
        : "overlay";
    this.dataset.layout = layout;
  }

  #render() {
    const root = this.shadowRoot!;
    const prev = this.#createScrollButton("prev", this.getAttribute("prev-label") ?? "Previous items", -1);
    const next = this.#createScrollButton("next", this.getAttribute("next-label") ?? "Next items", 1);
    const slot = document.createElement("slot");
    const layout = document.createElement("div");
    layout.className = "layout";

    // DOM order is tab order, and matches the visual order in every layout
    layout.append(prev, slot, next);

    root.replaceChildren(layout);
    this.#prev = prev;
    this.#next = next;
  }

  #createScrollButton(name: "prev" | "next", label: string, direction: 1 | -1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = name;
    button.part.add("button", name);
    button.setAttribute("aria-label", label);
    button.append(this.#createArrowIcon());
    button.addEventListener("click", () => this.#scrollByPage(direction));
    return button;
  }

  /** An <svg> that `<use>`s the arrow from the icon sprite. */
  #createArrowIcon() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", this.getAttribute("arrow-icon") ?? "");
    svg.append(use);
    return svg;
  }

  /**
   * Scrolls by one page width. CSS scroll snapping + scroll behavior
   * handles the rest.
   */
  #scrollByPage(direction: 1 | -1) {
    const list = this.#list;
    if (!list) {
      return;
    }
    const style = getComputedStyle(list);
    // Scroll padding (room for overlaid buttons) isn't part of the "page"
    const pageWidth =
      list.clientWidth -
      (parseFloat(style.scrollPaddingInlineStart) || 0) -
      (parseFloat(style.scrollPaddingInlineEnd) || 0);
    // scrollLeft runs negative in right-to-left lists
    const sign = style.direction === "rtl" ? -1 : 1;
    list.scrollBy({ left: direction * sign * pageWidth });
  }

  /** Shows or hides each button based on whether there's anything to scroll to. */
  #updateEnds() {
    const list = this.#list;
    if (!list) {
      return;
    }

    // scrollLeft runs negative in right-to-left lists
    const position = Math.abs(list.scrollLeft);
    const max = list.scrollWidth - list.clientWidth;
    const atStart = position <= 1;
    const atEnd = position >= max - 1;

    const active = this.shadowRoot?.activeElement ?? null;
    if (atStart) {
      this.#internals.states.add("at-start");
      if (active === this.#prev) {
        // If the previous button is focused and we're at the start,
        // move focus to the next button or the list itself.
        (atEnd ? list : this.#next)?.focus();
      }
    } else {
      this.#internals.states.delete("at-start");
    }

    if (atEnd) {
      this.#internals.states.add("at-end");
      if (active === this.#next) {
        // If the next button is focused and we're at the end,
        // move focus to the previous button or the list itself.
        (atStart ? list : this.#prev)?.focus();
      }
    } else {
      this.#internals.states.delete("at-end");
    }
  }
}
