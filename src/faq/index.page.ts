import { css, html, type YetiPageComponent } from "yeti-js";
import { PageBorderLayout } from "../_layout/PageBorderLayout.component.ts";
import { BackLink } from "../_components/BackLink.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

export const config = {
  // UPDATEME: make sure to bump this date when this page's content meaningfully changes
  lastmod: "2026-08-20",
};

const FAQPage: YetiPageComponent = ({ page }) => html`<${PageBorderLayout} title="FAQ | New Unions Bridal" url=${page.url}>
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
    <h1 class="section-heading underlined-text">What to expect at New Unions.</h1>
    <div id="faqs">
      <section id="appointment-length">
        <h2>How long are appointments?</h2>
        <p>
          Appointments are typically 90 minutes. During your appointment, you can expect
          to work directly with a stylist who is trained in servicing nearlyweds of all backgrounds.
        </p>
      </section>
      <section id="guest-count">
        <h2>How many guests can I bring?</h2>
        <p>
          Our store is an intimate setting, where we only work with one customer (or couple!) at a time.
          Please limit your guests to 5 or fewer. The ideal about is around 3 to 4.
          We have our own parking lot and are wheelchair accessible.
        </p>
      </section>
      <section id="appointment-fee">
        <h2>Is there an appointment fee?</h2>
        <p>
          There is a $50 fee for appointments. That $50 will be used as a credit toward your wedding outfit.
          If you don’t find what you are looking for, you will be credited in the future.
        </p>
      </section>
      <section id="alcohol-policy">
        <h2>Can I bring champagne?</h2>
        <p>
          Unfortunately we do not have a liquor license at our location. In our lovely corridor of Ferndale
          we have a variety of businesses within walking distance to us, including a coffee shop, a brewery,
          restaurants, and other lovely retail. We encourage you to explore our block and love our neighbors
          as much as we do!
        </p>
      </section>
      <section id="sizes">
        <h2>What sizes do you carry?</h2>
        <p>
          We carry a range of sizes, aiming to fit all couples. Most of our collections range from sizes 0 to 30.
        </p>
      </section>
      <section id="alterations">
        <h2>Do you do alterations?</h2>
        <p>
          We currently do not offer alterations. Our team has a preferred set of LGBTQ+ friendly seamstresses
          that we can refer you to for your outfits.
        </p>
        <p>
          <strong><a href="/new-unions-alterations-referral-list.pdf" class="underlined-text">See our alterations referral list here</a></strong>
        </p>
      </section>
      <section id="return-policy">
        <h2>What is your return policy?</h2>
        <p>
          We currently do not accept returns. New pieces with tags, in unworn condition will be awarded store credit.
          Vintage, pre loved pieces, and accessories are final sale. In the event of a wedding cancellation,
          please give us a call and we are willing to work with you!
        </p>
      </section>
      <section id="order-timeline">
        <h2>How long do dresses/outfits take to come in?</h2>
        <p>
          We sell styles directly off the rack and order new to fit your needs.
          For most collections, if there is something in store you love
          and it fits, we would love for you to take it home that day!
          Please allow for at least 4 to 5 months before your wear date to order any gown.
          Our Lucy Can&rsquo;t Dance line has the longest lead time of 8 to 10 months.
          Please allow additional time before your wear date for alterations.
          When in doubt, ask Jess about ordering any specific outfit in store!

        </p>
      </section>
      <section id="payment">
        <h2>Is full payment required at the time of purchase?</h2>
        <p>
          We require full payment at the time of purchase, and do not accept payment plans.
          When we place an order for our gowns, our designers require the full payment.
          If anything happens to your gown between the time of order and receiving on the end of
          the manufacturer, we will refund your purchase. We choose designers and companies that we trust,
          meet with them in person, all before we bring them in store to you! This helps us know
          we have the best vendors who will treat you like we would want to be treated!
        </p>
        <p>
          <strong><a href="/new-unions-contract.pdf" class="underlined-text">See our purchase agreement here</a></strong>
        </p>
      </section>
    </div>
  </main>
</${PageBorderLayout}>`;

export default FAQPage;

FAQPage.css = css`
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

  #faqs {
    max-width: 1200px;
  }

  section {
    h2 {
      font-size: var(--font-size-2xl);
      font-weight: 400;
    }

    p {
      margin-block: var(--space-xs);
    }

    margin-block-end: var(--space-l);
  }
`;
