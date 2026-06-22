import { css, html } from 'yeti-js';
import { ResponsiveImage } from '../_components/ResponsiveImage.component.ts';

export const LouletteTrunkShow = () => html`
  <section id="loulette-trunk-show">
    <${ResponsiveImage}
      src="/img/loulette/loulette-stage-cropped-3.jpg"
      alt="Four people on a stage wearing white wedding outfits from Loulette."
      class="section-bg"
    />
    <div class="section-contents">
      <div>
        <h2 class="section-heading">
          <${ResponsiveImage} src="/img/loulette/logo.png" alt="Loulette Bride" class="logo" />
          Trunk Show: July 1st-19th
        </h2>
        <p class="section-subheading">
          Book an appointment and get 10% off your dress!
        </p>
      </div>
    </div>
    <a href="/book" class="book-card-link">
      Book an Appointment
    </a>
  </section>
`;

LouletteTrunkShow.css = css`
#loulette-trunk-show {
  position: relative;
  padding: var(--space-m-2xl);

  .section-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
    z-index: -1;
    border-radius: 24px;
  }

  .logo {
    width: clamp(10rem, 100%, 30rem);
    height: auto;
    display: block;
    margin: 0 auto var(--space-s);
  }

  .section-contents {
    text-align: center;
    /*  Use grid so we can reserve space under the section whose size is
        relative to the section's content; this is used to give space for
        the people in the background image to stand underneath the text content above them. */
    display: grid;
    grid-template-rows: 1fr 1.6fr;
  }

  .section-heading {
    margin-bottom: var(--space-2xs);

    @media (width <= 900px) {
      font-size: var(--font-size-2xl);
    }

    @media (width <= 700px) {
      font-size: var(--font-size-xl);
    }
  }

  .section-subheading {
    font-size: var(--font-size-l);
    font-weight: 500;
    text-wrap: pretty;

    @media (width <= 900px) {
      font-size: var(--font-size-m);
    }
  }

  .book-card-link {
    /* This link is visually hidden with transparent text and its click target is expanded
       to cover the entire section so that it acts as a clickable card while still having a
       reasonable link experience for screen reader users */
    position: absolute;
    inset: 0;
    color: transparent;
  }
}
`;