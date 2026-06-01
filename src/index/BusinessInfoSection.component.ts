import { css, html } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
import { BookAppointmentButton } from "../_components/BookAppointmentButton.component.ts";

export const BusinessInfoSection = () => html`
  <section id="business-info">
    <div class="business-info-column">
      <h2 class="section-heading">
        We can't wait<br />
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
        <p itemprop="telephone">(313) 314-3517</p>
        <p itemprop="email">
          <a
            href="mailto:hello@newunionsbridal.com"
            class="underlined-link underline-target"
          >
            hello@newunionsbridal.com
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
        <p>Closed Monday, Tuesday, Wednesday</p>
      </section>
      <${BookAppointmentButton} />
    </div>
    <${ResponsiveImage}
      src="/img/store/store-exterior.jpg"
      alt="An exterior shot of the New Unions Bridal store from the street. The store has a pride flag and mannequins wearing wedding attire displayed in the windows, and a variety of potted plants outside."
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

    img {
      flex: 1;
      width: 100%;
      height: auto;
      min-width: 240px;
      max-width: 520px;
      margin-block: auto;
      background-color: #e3e3e3;
      border-radius: 24px;
      aspect-ratio: 96 / 100;
      object-fit: cover;
      box-shadow: var(--image-drop-shadow);

      @media screen and (width <= 1024px) {
        flex-basis: 100%;
        margin-inline-end: auto;
      }
    }
  }
`;
