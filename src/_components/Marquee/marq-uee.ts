/**
 * Applies a marquee effect to the content within the element.
 * Loops the content continuously by cloning it and scrolling a track by exactly
 * one copy's width, so clones can be added or removed on resize without a jump.
 *
 * The element expects a single element child, which is the unit that gets measured
 * and cloned. Without JS, or when the user prefers reduced motion, the content is
 * shown once as normal.
 *
 * Style hooks:
 * - `--marquee-gap`: space between copies (default 2rem)
 * - `--marquee-fade`: width of the fade-out at each edge while scrolling (default 0)
 * - `::part(track)`: the scrolling track
 * - `:state(scrolling)`: matches while the marquee is animating (JS loaded and
 *   the user hasn't asked for reduced motion), e.g. `marq-uee:state(scrolling)`
 *
 * @example
 * <marq-uee>
 *   <ul>
 *     <li>Content to apply marquee effect to</li>
 *   </ul>
 * </marq-uee>
 */

const SPEED_PX_PER_SEC = 60;

const styles = new CSSStyleSheet();
styles.replaceSync(/*css*/`
  :host {
    display: block;
    overflow: hidden;
  }

  /* Fade the content out toward each edge. A mask fades the content itself,
     so it works on any background without knowing its color. */
  :host(:state(scrolling)) {
    --_fade: var(--marquee-fade, 0px);
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 var(--_fade),
      #000 calc(100% - var(--_fade)),
      transparent
    );
  }

  :host(:state(scrolling)) .track {
    display: flex;
    gap: var(--marquee-gap, 2rem);
    width: max-content;
    animation: marquee-scroll var(--marquee-duration, 20s) linear infinite;
  }

  :host(:state(scrolling):is(:hover, :focus-within)) .track {
    animation-play-state: paused;
  }

  :host(:state(scrolling)) ::slotted(*) {
    flex: none;
  }

  @keyframes marquee-scroll {
    to {
      transform: translateX(calc(-1 * var(--marquee-unit-width, 0px)));
    }
  }
`);

export class MarqueeElement extends HTMLElement {
  static TAGNAME = "marq-uee";

  static #reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  static {
    window.customElements.define(this.TAGNAME, this);
  }

  #original: HTMLElement | null = null;
  #clones: HTMLElement[] = [];
  #internals = this.attachInternals();
  #observer = new ResizeObserver(() => this.#sync());
  #onMotionPreferenceChange = () => this.#sync();

  connectedCallback() {
    this.#original ??= this.firstElementChild as HTMLElement | null;
    if (!this.#original) {
      return;
    }

    if (!this.shadowRoot) {
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [styles];
      root.innerHTML = /*html*/`<div class="track" part="track"><slot></slot></div>`;
    }

    MarqueeElement.#reducedMotionQuery.addEventListener("change", this.#onMotionPreferenceChange);

    // Re-sync when the container resizes, and when the content itself changes
    // size (web fonts loading, breakpoints changing text size, etc).
    this.#observer.observe(this);
    this.#observer.observe(this.#original);
  }

  disconnectedCallback() {
    this.#observer.disconnect();
    MarqueeElement.#reducedMotionQuery.removeEventListener("change", this.#onMotionPreferenceChange);
  }

  /**
   * Turns scrolling on or off based on the user's motion preference, then adds or
   * removes clones so the track always covers the container width plus one extra
   * copy, which is what the loop scrolls through.
   */
  #sync() {
    const original = this.#original;
    if (!original) {
      return;
    }

    const isScrolling = !MarqueeElement.#reducedMotionQuery.matches;
    // Set the state before measuring, since it switches the track to its
    // single-row layout and the measurement below forces a fresh layout.
    if (isScrolling) {
      this.#internals.states.add("scrolling");
    } else {
      this.#internals.states.delete("scrolling");
    }

    // One copy plus the gap after it is the exact distance one loop scrolls.
    // The gap lives on the shadow track because page styles override ::slotted() rules,
    // so a consumer's own padding/margin can't break the loop distance.
    const track = this.shadowRoot?.querySelector(".track");
    const gap = track ? parseFloat(getComputedStyle(track).columnGap) || 0 : 0;
    const contentWidth = original.getBoundingClientRect().width;
    const unitWidth = contentWidth > 0 ? contentWidth + gap : 0;
    const neededCloneCount = isScrolling && unitWidth > 0 ? Math.ceil(this.clientWidth / unitWidth) : 0;

    while (this.#clones.length < neededCloneCount) {
      const clone = original.cloneNode(true) as HTMLElement;
      // Screen readers and keyboard users only get the original copy
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      this.append(clone);
      this.#clones.push(clone);
    }

    while (this.#clones.length > neededCloneCount) {
      this.#clones.pop()?.remove();
    }

    this.style.setProperty("--marquee-unit-width", `${unitWidth}px`);
    if (unitWidth > 0) {
      // Keep the scroll speed constant regardless of content length
      this.style.setProperty("--marquee-duration", `${unitWidth / SPEED_PX_PER_SEC}s`);
    }
  }
}
