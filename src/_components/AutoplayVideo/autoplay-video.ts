/**
 * Plays a muted looping background video while it's on screen.
 * Also supports a pause/play button for user control for accessibility purposes.
 *
 * Expected structure:
 *
 * <autoplay-video>
 *   <video muted loop playsinline preload="none" poster="…" src="…"></video>
 *   <button type="button" class="autoplay-video-toggle" aria-label="Pause video">…</button>
 * </autoplay-video>
 *
 * Not using `autoplay`/`loading="lazy"` because lazy-loading is only supported in Chrome as of now
 * and we have a lot of mobile Safari users.
 */
export class AutoplayVideoElement extends HTMLElement {
  static TAGNAME = "autoplay-video";

  static #reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  static {
    window.customElements.define(this.TAGNAME, this);
  }

  #internals = this.attachInternals();
  #video: HTMLVideoElement | null = null;
  #toggle: HTMLButtonElement | null = null;

  /** Whether the video should play while it's on screen */
  #shouldPlay = !AutoplayVideoElement.#reducedMotion.matches;
  #isOnScreen = false;

  #observer = new IntersectionObserver(
    ([entry]) => {
      this.#isOnScreen = entry.isIntersecting;
      this.#sync();
    },
    // Start a little before it scrolls into view so it's already moving
    { rootMargin: "200px 0px" },
  );

  connectedCallback() {
    this.#video = this.querySelector("video");
    this.#toggle = this.querySelector(".autoplay-video-toggle");
    if (!this.#video || !this.#toggle) {
      console.error(`<${AutoplayVideoElement.TAGNAME}> expects a <video> and a .autoplay-video-toggle button.`, this);
      return;
    }

    this.#video.addEventListener("play", this.#updateState);
    this.#video.addEventListener("pause", this.#updateState);
    this.#toggle.addEventListener("click", this.#onToggle);
    AutoplayVideoElement.#reducedMotion.addEventListener("change", this.#onReducedMotionChange);
    this.#observer.observe(this);
    this.#updateState();
  }

  disconnectedCallback() {
    this.#video?.removeEventListener("play", this.#updateState);
    this.#video?.removeEventListener("pause", this.#updateState);
    this.#toggle?.removeEventListener("click", this.#onToggle);
    AutoplayVideoElement.#reducedMotion.removeEventListener("change", this.#onReducedMotionChange);
    this.#observer.disconnect();
  }

  #onToggle = () => {
    this.#shouldPlay = !this.#shouldPlay;
    this.#sync();
  };

  #onReducedMotionChange = (event: MediaQueryListEvent) => {
    this.#shouldPlay = !event.matches;
    this.#sync();
  };

  /** Plays or pauses the video to match what's wanted and whether it's visible */
  #sync() {
    const video = this.#video;
    if (!video) {
      return;
    }

    if (this.#shouldPlay && this.#isOnScreen) {
      if (video.paused) {
        video.play().catch(() => {
          // Playback was blocked; show the "Play" button so the user can start it
          this.#shouldPlay = false;
          this.#updateState();
        });
      }
    } else if (!video.paused) {
      video.pause();
    }

    this.#updateState();
  }

  /** Updates the button and `playing` state from what the user wants */
  #updateState = () => {
    // Labels follow the user's choice rather than the video's current state,
    // so the button doesn't flip while the video is off screen.
    const playing = this.#shouldPlay;
    if (playing) {
      this.#internals.states.add("playing");
    } else {
      this.#internals.states.delete("playing");
    }
    this.#toggle?.setAttribute("aria-label", playing ? "Pause video" : "Play video");
  };
}
