/**
 * Makes a group of focusable items a single tab stop ("roving tabindex").
 *
 * <roving-focus id="loulette-photos">
 *   …<button data-roving-focus-id="loulette-photos">…</button>…
 * </roving-focus>
 *
 * Items join the group by naming its `id` in `data-roving-focus-id`. They're
 * looked up across the whole document, so they don't have to be inside the
 * element (but usually are).
 *
 * The current item has tabindex="0" and every other item tabindex="-1", so
 * Tab enters the group at the current item and the next Tab leaves it.
 * Within the group:
 * - Left/Right arrows move to the previous/next item (flipped for
 *   right-to-left text). They stop at the ends instead of wrapping.
 * - Home/End move to the first/last item.
 * Focusing an item any other way (clicking, tapping) makes it current too.
 *
 * Up/Down are left alone so they still scroll the page.
 *
 * The id and items are read once when the element connects; changing them
 * afterwards has no effect (this site is static).
 *
 * Attributes:
 * - `id` (required): names the group for its items.
 *
 * Items must already be focusable (buttons, links), in document order.
 */
export class RovingFocusElement extends HTMLElement {
  static TAGNAME = "roving-focus";
  static ITEM_ATTRIBUTE = "data-roving-focus-id";

  static {
    window.customElements.define(this.TAGNAME, this);
  }

  #items: HTMLElement[] = [];

  connectedCallback() {
    if (!this.id) {
      console.error(`<${RovingFocusElement.TAGNAME}> needs an \`id\` for its items to reference.`, this);
      return;
    }
    this.#items = [...document.querySelectorAll<HTMLElement>(
      `[${RovingFocusElement.ITEM_ATTRIBUTE}="${CSS.escape(this.id)}"]`,
    )];
    if (this.#items.length === 0) {
      console.warn(`<${RovingFocusElement.TAGNAME} id="${this.id}"> found no items.`, this);
      return;
    }
    this.#setCurrent(0);
    // Listen on the items themselves, since they needn't be inside this element
    for (const item of this.#items) {
      item.addEventListener("keydown", this.#onKeyDown);
      item.addEventListener("focus", this.#onFocus);
    }
  }

  disconnectedCallback() {
    for (const item of this.#items) {
      item.removeEventListener("keydown", this.#onKeyDown);
      item.removeEventListener("focus", this.#onFocus);
    }
    this.#items = [];
  }

  #onFocus = (event: FocusEvent) => {
    this.#setCurrent(this.#items.indexOf(event.currentTarget as HTMLElement));
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const item = event.currentTarget as HTMLElement;
    const index = this.#items.indexOf(item);

    const forward = item.matches(":dir(rtl)") ? "ArrowLeft" : "ArrowRight";
    const backward = forward === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    const last = this.#items.length - 1;

    let target: number;
    switch (event.key) {
      case forward: {
        target = Math.min(index + 1, last);
        break;
      }
      case backward: {
        target = Math.max(index - 1, 0);
        break;
      }
      case "Home": {
        target = 0;
        break;
      }
      case "End": {
        target = last;
        break;
      }
      default: {
        return;
      }
    }

    // Also stops the arrow keys from scrolling a scroll container we're in;
    // focusing the item scrolls it into view instead.
    event.preventDefault();
    this.#items[target].focus();
  };

  #setCurrent(index: number) {
    this.#items.forEach((item, i) => {
      item.tabIndex = i === index ? 0 : -1;
    });
  }
}
