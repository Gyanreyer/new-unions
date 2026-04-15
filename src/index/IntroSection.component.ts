import { css, html } from "yeti-js";

export const IntroSection = () => html`<section id="intro">
  <div class="text-column">
    <h2>
      We celebrate love <br />
      <span class="underlined">differently.</span>
    </h2>
    <p>
      A love letter to anyone searching for wedding attire that deviates
      from the traditional, rooted in a safe space that celebrates
      everyone. New Unions is a wedding attire experience dedicated to
      couples that fit outside of the binary.
    </p>
    <p>
      We welcome everyone and anyone to shop with us to find a wedding
      outfit that is as unique as you.
    </p>
    <a class="action-btn primary">Book an Appointment</a>
  </div>
  <aside class="image-column">
    <img
      src="/img/harrison-tongue.jpg"
      alt=""
      width="720"
      height="956"
    />
    <img src="/img/harrison-mad.jpg" alt="" width="720" height="956" />
  </aside>
</section>`;

IntroSection.css = css`
  #intro {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    column-gap: 8rem;

    @media screen and (width <= 1200px) {
      grid-template-columns: 1fr;
      row-gap: 4rem;
    }

    .text-column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 2rem;

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

      img {
        width: 100%;
        max-width: 400px;
        height: auto;
        background-color: #e3e3e3;
        border-radius: 48px;
        aspect-ratio: 82 / 100;
        object-fit: cover;
        box-shadow: var(--image-drop-shadow);
      }

      img:nth-child(1) {
        width: 85%;
        align-self: flex-start;
        background-color: #c0bebe;
      }

      img:nth-child(2) {
        width: 67%;
        align-self: flex-end;
        /* Shift up to overlap with 1st image */
        margin-block-start: -30%;
      }
    }
  }
`;