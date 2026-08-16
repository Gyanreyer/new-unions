import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeading } from "../_components/SecondaryPageMainSectionHeading.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-06-12",
};

const BookingPage: YetiPageComponent = ({
  page,
}) => html`<${PageBorderLayout} title="Book an Appointment | New Unions Bridal" url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeading}>
      Book Your Appointment
    </${SecondaryPageMainSectionHeading}>
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
            <a href="https://securelink-prod.valorpaytech.com:4430/?redirect=1&uid=73abbab1-6680-11f1-aa7a-12a0879a85b1" class="underlined-text">Pay your $50 deposit here.</a> This deposit will be credited toward your wedding outfit.
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
