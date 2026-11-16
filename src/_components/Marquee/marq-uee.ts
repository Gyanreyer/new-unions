/**
 * Applies a marquee effect to the content within the element.
 * Loops the content continuously by cloning it and scrolling a track by exactly
 * one copy's width, so clones can be added or removed on resize without a jump.
 *
 * The element expects a single element child (without a `slot` attribute), which
 * is the unit that gets measured and cloned. Without JS, or when the user prefers
 * reduced motion, the content is shown once as normal.
 *
 * While scrolling, a pause/play button sits at the inline end, so the motion
 * can be stopped (WCAG 2.2.2). Hovering over or focusing inside the scrolling
 * content also pauses it while the pointer or focus is there.
 *
 * Slots:
 * - `pause-icon` / `play-icon`: the icons shown in the button (mark them
 *   `aria-hidden`; the button is named by the labels below). Hide them with
 *   `marq-uee:not(:defined) > [slot]` so they don't show before JS runs.
 *
 * Attributes:
 * - `pause-label` / `play-label`: the button's accessible names
 *   (default "Pause" / "Play")
 *
 * Style hooks:
 * - `--marquee-gap`: space between copies (default 2rem)
 * - `--marquee-fade`: width of the fade-out at each edge while scrolling (default 0)
 * - `--marquee-toggle-size`: size of the pause/play button (default 2rem)
 * - `::part(track)`: the scrolling track
 * - `::part(toggle)`: the pause/play button
 * - `:state(scrolling)`: matches while the marquee is animating (JS loaded and
 *   the user hasn't asked for reduced motion), e.g. `marq-uee:state(scrolling)`
 * - `:state(paused)`: matches while the user has paused it with the button
 *
 * @example
 * <marq-uee>
 *   <ul>
 *     <li>Content to apply marquee effect to</li>
 *   </ul>
 *   <svg slot="pause-icon" aria-hidden="true">…</svg>
 *   <svg slot="play-icon" aria-hidden="true">…</svg>
 * </marq-uee>
 */

const SPEED_PX_PER_SEC = 60;

const styles = new CSSStyleSheet();
styles.replaceSync(/*css*/`
  :host {
    display: block;
  }

  .layout {
    display: flex;
    align-items: center;
    gap: var(--marquee-gap, 2rem);
  }

  .viewport {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  /* Fade the content out toward each edge. A mask fades the content itself,
     so it works on any background without knowing its color. */
  :host(:state(scrolling)) .viewport {
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

  /* Pause while the pointer or focus is on the content itself. This is scoped
     to the viewport rather than the host so that using the toggle button
     (which keeps focus and the pointer after a click) doesn't hold it paused. */
  :host(:state(scrolling)) .viewport:is(:hover, :focus-within) .track,
  :host(:state(scrolling):state(paused)) .track {
    animation-play-state: paused;
  }

  .toggle {
    flex: none;
    display: grid;
    place-items: center;
    inline-size: var(--marquee-toggle-size, var(--space-m));
    block-size: var(--marquee-toggle-size, var(--space-m));
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
  }

  .toggle ::slotted(svg) {
    inline-size: 60%;
    block-size: 60%;
  }

  /* Nothing to pause when the content isn't moving */
  :host(:not(:state(scrolling))) .toggle {
    display: none;
  }

  :host(:state(paused)) slot[name="pause-icon"],
  :host(:not(:state(paused))) slot[name="play-icon"] {
    display: none;
  }

  :host(:state(scrolling)) .track ::slotted(*) {
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
  #viewport: HTMLElement | null = null;
  #toggle: HTMLButtonElement | null = null;
  #paused = false;
  #clones: HTMLElement[] = [];
  #internals = this.attachInternals();
  #observer = new ResizeObserver(() => this.#sync());
  #onMotionPreferenceChange = () => this.#sync();

  connectedCallback() {
    // The content is the first child that isn't slotted into the button
    this.#original ??= this.querySelector<HTMLElement>(":scope > :not([slot])");
    if (!this.#original) {
      return;
    }

    if (!this.shadowRoot) {
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [styles];
      root.innerHTML = /*html*/`
        <div class="layout">
          <div class="viewport"><div class="track" part="track"><slot></slot></div></div>
          <button type="button" class="toggle" part="toggle">
            <slot name="pause-icon"></slot>
            <slot name="play-icon"></slot>
          </button>
        </div>`;
      this.#viewport = root.querySelector(".viewport");
      this.#toggle = root.querySelector(".toggle");
      this.#toggle?.addEventListener("click", () => this.#setPaused(!this.#paused));
      this.#setPaused(this.#paused);
    }

    MarqueeElement.#reducedMotionQuery.addEventListener("change", this.#onMotionPreferenceChange);

    // Re-sync when the container resizes, and when the content itself changes
    // size (web fonts loading, breakpoints changing text size, etc).
    this.#observer.observe(this);
    this.#observer.observe(this.#original);
  }

  #setPaused(paused: boolean) {
    this.#paused = paused;
    if (paused) {
      this.#internals.states.add("paused");
    } else {
      this.#internals.states.delete("paused");
    }
    this.#toggle?.setAttribute(
      "aria-label",
      paused ? (this.getAttribute("play-label") ?? "Play") : (this.getAttribute("pause-label") ?? "Pause"),
    );
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
    const visibleWidth = this.#viewport?.clientWidth ?? this.clientWidth;
    const neededCloneCount = isScrolling && unitWidth > 0 ? Math.ceil(visibleWidth / unitWidth) : 0;

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
