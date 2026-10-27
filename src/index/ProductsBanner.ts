import { css, html } from "yeti-js";

export const ProductsBanner = () => html`
<section id="products-banner">
  <h2 class="visually-hidden">What we carry</h2>
  <ul role="list">
    <li>Bridal Gowns</li>
    <li>Short Wedding Dresses</li>
    <li>Colorful Wedding Dresses</li>
    <li>Bridal Jumpsuits</li>
    <li>Bridal Separates</li>
    <li>Vintage Wedding Dresses</li>
    <li>Unique Wedding Outfits</li>
    <li>Traditional &amp; Colorful Veils</li>
    <li>Accessories</li>
    <li>Bridal Capes &amp; Jackets</li>
    <li>Headpieces</li>
    <li>Jewelry</li>
    <li>Purses</li>
    <li>Wedding Gifts</li>
  </ul>
</section>
`;

ProductsBanner.css = css`
  #products-banner {
    /* Run border-to-border instead of sitting in <main>'s content column */
    grid-column: full;

    background-color: var(--white);
    color: var(--blue);

    padding-block: var(--space-xs);
    padding-inline: var(--space-l);

    font-weight: 500;
    font-style: italic;
    font-size: var(--font-size-xs);

    text-align: center;
    /* Even out line lengths so the last line isn't much shorter than the rest */
    text-wrap: balance;

    ul {
      max-width: var(--page-content-max-width);
      margin-inline: auto;
    }

    li {
      /* Keep each item on one line; lines can still break between items */
      display: inline-block;
    }

    li:not(:last-child)::after {
      /* Decorative separator between items */
      content: "✦" / "";
      font-weight: 700;
      font-size: var(--font-size-s);
      margin-inline: var(--space-2xs);
    }
  }
`;