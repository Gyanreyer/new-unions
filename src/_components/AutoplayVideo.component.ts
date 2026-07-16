import { html, js, type YetiComponent } from "yeti-js";

type AutoplayVideoProps = {
  src: string;
  label: string;
  loading?: "lazy" | "eager";
};

export const AutoplayVideo: YetiComponent<AutoplayVideoProps> = ({ src, label, loading = "lazy", ...attrs }) => html`
  <video
    src=${src}
    muted
    autoplay
    loop
    playsinline
    loading=${loading}
    aria-label=${label}
    ...${attrs}
  />
`;

AutoplayVideo.js = js`
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // If the user prefers reduced motion, disable autoplay on videos and show controls instead
    const autoplayVideos = document.querySelectorAll("video[autoplay]");
    for (const video of autoplayVideos) {
      video.pause();
      video.removeAttribute("autoplay");
      video.setAttribute("controls", "true");
    }
  }
`;