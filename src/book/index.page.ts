import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { BackLink } from "../_components/BackLink.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

const BookingPage: YetiPageComponent = () => html`<${PageBorderLayout} title="Book an Appointment | New Unions Bridal">
  <header>
    <nav>
      <${BackLink} href="/" label="Home" />
    </nav>
    <a href="/">
      <${ResponsiveImage}
        src="/img/logo.png"
        alt="New Unions Bridal"
        fetchpriority="high"
        loading="eager"
        sizes="(width >= 575px) 420px, 80vw"
      />
    </a>
  </header>
  <main>
    <h1 class="section-heading underlined-text">Book Your Appointment</h1>
    <ol>
      <li>
        <section>
          <h2>Step 1</h2>
          <p>
            <a href="/faq" class="underlined-text">Review the FAQ</a> to make sure you understand the rules and expectations for your appointment.
          </p>
        </section>
      </li>
      <li>
        <section>
          <h2>Step 2</h2>
          <p>
            <a href="https://securelink-prod.valorpaytech.com:4430/?redirect=1&uid=3efa21f5-5d0e-11f1-a8e1-12a0879a85b1" class="underlined-text">Pay your $50 deposit here.</a> This deposit will be credited toward your wedding outfit.
          </p>
          <p>
            <strong>If you do not pay this deposit before your appointment, your booking will not be honored.</strong>
          </p>
        </section>
      </li>
      <li>
        <section>
          <h2>Step 3</h2>
          <p>
            <a href="https://calendar.proton.me/u/0/bookings#8GyKjMe-61U4jif7tMND9n4jhEokR1oLbbqT2c2REbQ=" class="underlined-text">Book a time slot in the calendar.</a>
          </p>
          <p>
            Appointments are 90 minutes.
          </p>
        </section>
      </li>
      <li>
        <section>
          <h2>Step 4</h2>
          <p>
            Celebrate your love with us!
          </p>
        </section>
      </li>
    </ol>
  </main>
</${PageBorderLayout}>`;

export default BookingPage;

BookingPage.css = css`
  header {
    nav {
      margin-block-start: var(--space-m-l);
    }

    img {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--space-l-xl);
      width: min(420px, 100%);
      height: auto;
      z-index: 100;
      view-transition-name: header-logo;
    }
  }

  h1 {
    margin-block: var(--space-xl-2xl) var(--space-l-2xl);
    margin-inline: auto;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-inline-size: 1200px;
    margin-inline: auto;

    ol {
      h2 {
        font-size: var(--font-size-2xl);
        font-weight: 400;
      }

      p {
        margin-block: var(--space-xs);
      }

      li {
        margin-block-end: var(--space-l);
      }
    }
  }
`;
