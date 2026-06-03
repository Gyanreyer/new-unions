import { css, html, js } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { BookAppointmentButton } from "../_components/BookAppointmentButton.component.ts";

export const IntroSection = () =>
  html`<section id="intro">
    <div class="text-column">
      <h2 class="section-heading">
        We celebrate love <br />
        <span class="scroll-reveal-underline">differently.</span>
      </h2>
      <p>
        A love letter to anyone searching for wedding attire that deviates from
        the traditional, rooted in a safe space that celebrates everyone. New
        Unions is a wedding attire experience dedicated to couples that fit
        outside of the binary.
      </p>
      <p>
        We welcome everyone and anyone to shop with us to find a wedding outfit
        that is as unique as you.
      </p>
      <${BookAppointmentButton} />
    </div>
    <aside class="image-column">
      <video
        src="/video/store/store-interior.mp4"
        muted
        autoplay
        loop
        playsinline
        loading="lazy"
        aria-label="A looping video of the store's interior, showcasing the space and some of the offerings."
        class="img-1"
      />
      <${ResponsiveImage}
        src="/img/offerings/ColorfulBeadedDresses.jpg"
        alt="Beaded dresses on a rack."
        class="img-2"
      />
    </aside>
  </section>`;

IntroSection.js = js`
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

IntroSection.css = css`
  #intro {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    column-gap: var(--space-2xl);
    row-gap: var(--space-m-l);

    @media screen and (width <= 1200px) {
      grid-template-columns: 1fr;
    }

    .text-column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: var(--space-m);

      p {
        text-align: left;
        line-height: 1.325;
        text-wrap: pretty;
      }

      @media screen and (width <= 800px) {
        .action-btn {
          /** Change order so action button comes before paragraphs */
          order: 10;
        }

        p {
          order: 20;
        }
      }
    }

    .image-column {
      display: flex;
      justify-content: center;
      flex-direction: column;

      img,
      video {
        width: 100%;
        max-width: 400px;
        height: auto;
        background-color: #e3e3e3;
        border-radius: 24px;
        object-fit: cover;
        box-shadow: var(--image-drop-shadow);
      }

      .img-1 {
        width: 85%;
        align-self: flex-start;
        background-color: #c0bebe;
        aspect-ratio: 72 / 100;
      }

      .img-2 {
        width: 67%;
        align-self: flex-end;
        /* Shift up to overlap with 1st image */
        margin-block-start: -30%;
        aspect-ratio: 82 / 100;
        z-index: 1;
      }
    }
  }
`;
