import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { BackLink } from "../_components/BackLink.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";
// Appt scheduling link: https://calendar.proton.me/u/0/bookings#94R1UdAukt3JdhyTwciYyyJRLxn81skWQARs_E2CPb8=

const FAQPage: YetiPageComponent = () => html`<${PageBorderLayout}>
  <header>
    <nav>
      <${BackLink} href="/" label="Home" />
    </nav>
    <${ResponsiveImage}
      src="/img/logo.png"
      alt="New Unions Bridal"
      fetchpriority="high"
      loading="eager"
      sizes="(width >= 575px) 420px, 80vw"
    />
  </header>
  <main>
    <h1 class="section-heading underlined-text">Book an Appointment</h1>
    <section>
        <p>
            <a class="book-appt action-btn primary"
                href="https://calendar.proton.me/u/0/bookings#8GyKjMe-61U4jif7tMND9n4jhEokR1oLbbqT2c2REbQ=">
                Book an Appointment
            </a>
        </p>
    </section>
  </main>
  <style>${css.inline("faq")}</style>
</${PageBorderLayout}>`;

export default FAQPage;

FAQPage.css = css`
  ${css.bundle("faq")}
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
  }

  section {
    max-width: 1200px;

    h2 {
      font-size: var(--font-size-2xl);
      font-weight: 400;
    }

    p {
      margin-block: var(--space-xs) var(--space-l);
    }
  }
`;
