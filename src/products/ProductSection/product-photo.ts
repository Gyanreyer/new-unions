/**
 * Opens and closes a product photo's caption overlay with its toggle button,
 * for touch and keyboard users (mouse users also get the caption on hover).
 *
 * Expected markup (ProductSection renders this):
 *
 * <product-photo>
 *   <figure>
 *     <img …>
 *     <figcaption id="…">…</figcaption>
 *   </figure>
 *   <button class="caption-toggle" aria-expanded="false" aria-controls="…">…</button>
 * </product-photo>
 *
 * The button flips `aria-expanded`; CSS shows the caption from that. Escape
 * closes the caption (returning focus to the button), and so does tapping
 * the open caption.
 */
export class ProductPhotoElement extends HTMLElement {
  static TAGNAME = "product-photo";

  static {
    window.customElements.define(this.TAGNAME, this);
  }

  #toggle: HTMLButtonElement | null = null;

  connectedCallback() {
    this.#toggle = this.querySelector<HTMLButtonElement>(".caption-toggle");
    if (!this.#toggle) {
      console.error(`<${ProductPhotoElement.TAGNAME}> expects a .caption-toggle button.`, this);
      return;
    }
    this.addEventListener("click", this.#onClick);
    this.addEventListener("keydown", this.#onKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#onClick);
    this.removeEventListener("keydown", this.#onKeyDown);
  }

  get #open() {
    return this.#toggle?.getAttribute("aria-expanded") === "true";
  }

  #setOpen(open: boolean) {
    this.#toggle?.setAttribute("aria-expanded", String(open));
  }

  #onClick = (event: MouseEvent) => {
    const target = event.target as Element;
    if (this.#toggle?.contains(target)) {
      this.#setOpen(!this.#open);
    } else if (this.#open && target.closest("figcaption")) {
      this.#setOpen(false);
    }
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.#open) {
      event.preventDefault();
      this.#setOpen(false);
      this.#toggle?.focus();
    }
  };
}
