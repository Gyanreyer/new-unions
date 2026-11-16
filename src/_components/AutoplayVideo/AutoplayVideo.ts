import { css, html, js, type YetiComponent } from "yeti-js";
import { Icon } from "../Icon.component.ts";

type AutoplayVideoProps = {
  src: string;
  poster: string;
  label: string;
};

/**
 * Lazy-loaded muted looping background video
 */
export const AutoplayVideo: YetiComponent<AutoplayVideoProps> = ({ src, poster, label, ...attrs }) => html`
  <autoplay-video ...${attrs}>
    <video
      src=${src}
      poster=${poster}
      muted
      loop
      playsinline
      preload="none"
      aria-label=${label}
    />
    <button type="button" class="autoplay-video-toggle" aria-label="Pause video">
      <${Icon} name="pause" class="icon-pause" aria-hidden="true" />
      <${Icon} name="play" class="icon-play" aria-hidden="true" />
    </button>
  </autoplay-video>
`;

AutoplayVideo.css = css`
  autoplay-video {
    display: block;
    position: relative;
    overflow: clip;

    video {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }
  }

  .autoplay-video-toggle {
    position: absolute;
    inset-block-end: var(--space-xs);
    inset-inline-end: var(--space-xs);
    display: grid;
    place-items: center;
    inline-size: var(--space-l);
    block-size: var(--space-l);
    padding: 0;
    border: none;
    border-radius: 50%;
    color: white;
    background-color: rgb(0 0 0 / 0.55);
    backdrop-filter: blur(4px);
    cursor: pointer;

    &:hover {
      background-color: rgb(0 0 0 / 0.7);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    svg {
      inline-size: 60%;
      block-size: 60%;
    }

    /* Without JS there's nothing to control; the poster shows on its own */
    autoplay-video:not(:defined) & {
      display: none;
    }

    autoplay-video:state(playing) & .icon-play,
    autoplay-video:not(:state(playing)) & .icon-pause {
      display: none;
    }
  }
`;

AutoplayVideo.js = js`
  ${js.import("./autoplay-video.ts")}
`;
