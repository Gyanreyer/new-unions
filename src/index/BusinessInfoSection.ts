import { css, html } from "yeti-js";
import { AutoplayVideo } from "../_components/AutoplayVideo/AutoplayVideo.ts";

import { ADDRESS, CONTACT_EMAIL, GOOGLE_MAPS_URL, PHONE, RETAIL_HOURS } from "../_constants/business.ts";
import { formatTime } from "../_utils/formatTime.ts";

export const BusinessInfoSection = () => html`
  <section id="business-info">
    <div class="business-info-column">
      <h2 class="section-heading">
        We can&rsquo;t wait<br />
        <span class="scroll-reveal-underline">to meet you.</span>
      </h2>
      <address>
        <p>
          <a
            href=${GOOGLE_MAPS_URL}
            class="underlined-link underline-target"
          >
            ${ADDRESS.street}&#32;${ADDRESS.suite}<br />
            ${ADDRESS.locality}, ${ADDRESS.region}&nbsp;${ADDRESS.postalCode}
          </a>
        </p>
        <p>
          <a
            href="tel:${PHONE.e164}"
            class="underlined-link underline-target"
          >
            ${PHONE.display}
          </a>
        </p>
        <p>
          <a
            href="mailto:${CONTACT_EMAIL}"
            class="underlined-link underline-target"
          >
            ${CONTACT_EMAIL}
          </a>
        </p>
      </address>
      <section id="hours">
        <h3>Retail Hours</h3>
        <p>Closed Monday</p>
        <p>Tuesday &amp; Wednesday<br/>Appointment Only</p>
        ${RETAIL_HOURS.map(({ day, opens, closes }) => html`<p>
          ${day} <time datetime=${opens}>${formatTime(opens)}</time> -
          <time datetime=${closes}>${formatTime(closes)}</time>
        </p>`)}
      </section>
      <a href="/book/" class="action-btn primary">Book an Appointment</a>
    </div>
    <${AutoplayVideo}
      src="/video/store/store-interior.mp4"
      poster="/img/store/store-interior-poster.jpg"
      label="A looping video of the store's interior, showcasing the space and some of the offerings."
      class="store-img"
    />
  </section>
`;

BusinessInfoSection.css = css`
  address {
    font-style: normal;
  }

  #business-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: var(--space-2xl);
    row-gap: var(--space-m);

    .business-info-column {
      max-width: 100%;

      @media screen and (width <= 1024px) {
        flex-basis: 100%;
      }
    }

    h2 {
      margin-block-end: var(--space-l);
    }

    p {
      margin-block-end: var(--space-s);
    }

    .action-btn {
      margin-block-start: var(--space-xs);
    }

    #hours {
      h3 {
        margin-block-end: var(--space-2xs);
      }

      p {
        font-size: var(--font-size-s);
        margin-block-end: var(--space-xs);
      }
    }

    .store-img {
      flex: 1;
      width: 100%;
      height: auto;
      min-width: 240px;
      max-width: 520px;
      margin-block: auto;
      border-radius: 24px;
      aspect-ratio: 72 / 100;
      box-shadow: var(--image-drop-shadow);

      @media screen and (width <= 1024px) {
        flex-basis: 100%;
        margin-inline-end: auto;
      }
    }
  }
`;
