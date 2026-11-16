/**
 * Opens and closes a product photo's caption hover overlay with a toggle button
 * for touch and keyboard users.
 *
 * Expected child structure:
 *
 * <product-photo>
 *   <figure>
 *     <img …>
 *     <figcaption id="…">…</figcaption>
 *   </figure>
 *   <button class="caption-toggle" aria-pressed="false" aria-describedby="…">…</button>
 * </product-photo>
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
    return this.#toggle?.getAttribute("aria-pressed") === "true";
  }

  #setOpen(open: boolean) {
    this.#toggle?.setAttribute("aria-pressed", String(open));
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
