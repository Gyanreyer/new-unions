import { css, html } from "yeti-js";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const BusinessInfoSection = () => html`
  <section id="business-info">
    <div class="business-info-column">
      <h2>
        We can't wait<br />
        <span class="underlined">to meet you.</span>
      </h2>
      <address>
        <p
          itemprop="address"
          itemscope
          itemtype="http://schema.org/PostalAddress"
        >
          <span itemprop="streetAddress">359 Livernois Ave</span> <span itemprop="extendedAddress">Suite 101</span><br />
          <span itemprop="addressLocality">Ferndale</span>, <span itemprop="addressRegion">MI</span> <span itemprop="postalCode">48220</span>
        </p>
        <p itemprop="telephone">(313) 314-3517</p>
        <p itemprop="email">
          <a href="mailto:hello@newunionsbridal.com" class="underlined-link">
            hello@newunionsbridal.com
          </a>
        </p>
      </address>
      <meta itemprop="openingHours" content="Mo-We 12:00-17:00" />
      <p>12-5 Wed-Friday</p>
      <meta itemprop="openingHours" content="Sa-Su 11:00-18:00" />
      <p>11-6 Sat-Sun</p>
      <a class="action-btn primary">Book an Appointment</a>
    </div>
    <${ResponsiveImage} src="/img/headshots/jess_1.jpg" alt="" />
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
      display: block;
      margin-block-start: var(--space-m);
    }

    img {
      flex: 1;
      width: 100%;
      height: auto;
      min-width: 240px;
      max-width: 520px;
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