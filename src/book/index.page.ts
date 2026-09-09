import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { SecondaryPageNavHeader } from "../_components/SecondaryPageNavHeader.component.ts";
import { SecondaryPageMainSectionHeader } from "../_components/SecondaryPageMainSectionHeader.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-08-31",
};

const BookingPage: YetiPageComponent = ({
  page,
}) => html`<${PageBorderLayout} title="Book an Appointment | New Unions Bridal" url=${page.url}>
  <${SecondaryPageNavHeader} />
  <main>
    <${SecondaryPageMainSectionHeader}>
      <h1>Book Your Appointment</h1>
      <p>
        Walk-in appointments during retail hours have no fitting room reservation fee,
        but we cannot guarantee availability because our space is an intimate experience
        limited to one room.
      </p>
    </${SecondaryPageMainSectionHeader}>
    <ol>
      <li>
        <section>
          <h2>Step 1</h2>
          <p>
            Review the FAQ to make sure you understand the rules and expectations for your appointment.
          </p>
          <p>
            <a href="/faq" class="action-btn primary">Read the FAQ</a>
          </p>
        </section>
      </li>
      <li>
        <section>
          <h2>Step 2</h2>
          <p>
            Book a time slot in the calendar.
          </p>
          <p>
            Appointments are 90 minutes.
          </p>
          <p>
            <a href="https://calendar.proton.me/u/0/bookings#8GyKjMe-61U4jif7tMND9n4jhEokR1oLbbqT2c2REbQ=" class="action-btn primary">
              Book your appointment
            </a>
          </p>
        </section>
      </li>
      <li>
        <section>
          <h2>Step 3</h2>
          <p>
            Pay your $50 reservation fee.
            This reservation fee will be credited toward your wedding outfit.
          </p>
          <p>
            <strong>If you do not pay this fee before your appointment, your booking will not be honored.</strong>
          </p>
          <p>
            <a href="https://securelink-prod.valorpaytech.com:4430/?redirect=1&uid=73abbab1-6680-11f1-aa7a-12a0879a85b1" class="action-btn primary">
              Pay the reservation fee
            </a>
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
