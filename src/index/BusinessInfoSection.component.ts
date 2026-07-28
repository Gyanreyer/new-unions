import { css, html } from "yeti-js";
import { BookAppointmentButton } from "../_components/BookAppointmentButton.component.ts";
import { AutoplayVideo } from "../_components/AutoplayVideo.component.ts";

import { CONTACT_EMAIL } from "../constants.ts";

export const BusinessInfoSection = () => html`
  <section id="business-info">
    <div class="business-info-column">
      <h2 class="section-heading">
        We can&rsquo;t wait<br />
        <span class="scroll-reveal-underline">to meet you.</span>
      </h2>
      <address>
        <p
          itemprop="address"
          itemscope
          itemtype="http://schema.org/PostalAddress"
        >
          <a
            href="https://maps.app.goo.gl/H9M8DWVo8fJhf1gF9"
            class="underlined-link underline-target"
          >
            <span itemprop="streetAddress">359 Livernois Ave</span>&#32;
            <span itemprop="extendedAddress">Suite 101</span><br />
            <span itemprop="addressLocality">Ferndale</span>,
            <span itemprop="addressRegion">MI</span>&nbsp;<span
              itemprop="postalCode"
              >48220</span
            >
          </a>
        </p>
        <p itemprop="telephone">
          <a
            href="tel:+13133143517"
            class="underlined-link underline-target"
          >
            (313) 314-3517
          </a>
        </p>
        <p itemprop="email">
          <a
            href="mailto:${CONTACT_EMAIL}"
            class="underlined-link underline-target"
          >
            ${CONTACT_EMAIL}
          </a>
        </p>
      </address>
      <section
        itemprop="openingHoursSpecification"
        itemscope
        itemtype="http://schema.org/OpeningHoursSpecification"
        id="hours"
      >
        <h3>Hours</h3>
        <p>Closed Monday</p>
        <p>Tuesday &amp; Wednesday<br/>Appointment Only</p>
        <p>
          <link
            itemprop="dayOfWeek"
            href="https://schema.org/Thursday"
          />Thursday <time itemprop="opens" content="12:00:00">12PM</time> -
          <time itemprop="closes" content="16:30:00">4:30PM</time>
        </p>
        <p>
          <link itemprop="dayOfWeek" href="https://schema.org/Friday" />Friday
          <time itemprop="opens" content="11:00:00">11AM</time> -
          <time itemprop="closes" content="18:00:00">6PM</time>
        </p>
        <p>
          <link
            itemprop="dayOfWeek"
            href="https://schema.org/Saturday"
          />Saturday <time itemprop="opens" content="11:00:00">11AM</time> -
          <time itemprop="closes" content="18:00:00">6PM</time>
        </p>
        <p>
          <link itemprop="dayOfWeek" href="https://schema.org/Sunday" />Sunday
          <time itemprop="opens" content="12:00:00">12PM</time> -
          <time itemprop="closes" content="16:30:00">4:30PM</time>
        </p>
      </section>
      <${BookAppointmentButton} />
    </div>
    <${AutoplayVideo}
      src="/video/store/store-interior.mp4"
      aria-label="A looping video of the store's interior, showcasing the space and some of the offerings."
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
      background-color: #e3e3e3;
      border-radius: 24px;
      aspect-ratio: 72 / 100;
      object-fit: cover;
      box-shadow: var(--image-drop-shadow);

      @media screen and (width <= 1024px) {
        flex-basis: 100%;
        margin-inline-end: auto;
      }
    }
  }
`;
