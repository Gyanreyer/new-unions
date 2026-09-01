import { css, html, js, type YetiComponent } from "yeti-js";

const dialogID = "steaming-menu";

export const SteamingMenu: YetiComponent = () => html`
<dialog
  id=${dialogID}
  aria-label="Steaming Services Menu"
  closedby="any"
  itemprop="hasOfferCatalog"
  itemscope
  itemtype="https://schema.org/OfferCatalog"
>
  <meta itemprop="name" content="Steaming Services Menu" />

  <button type="button" commandfor=${dialogID} command="close" aria-label="Close">&#x2715;</button>

  <ul>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
      <h3><span itemprop="name">Basic Steam</span> $<span itemprop="price">59</span></h3>
      <meta itemprop="priceCurrency" content="USD" />
      <p itemprop="description">
        (Formal gown, bridesmaid dress)<br/>
        Includes linen garment bag
      </p>
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
      <h3>
        <span itemprop="name">Bridal Steam</span>
        $<span itemprop="priceSpecification" itemscope itemtype="https://schema.org/PriceSpecification">
          <span itemprop="minPrice">89</span>–<span itemprop="maxPrice">99</span>
          <meta itemprop="priceCurrency" content="USD" />
        </span>
      </h3>
      <div itemprop="description">
        <p>(Simple bridal gown, price assessed on complexity of garment)</p>
        <p>Includes veil steaming</p>
        <p>Includes linen garment bag</p>
      </div>
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/Offer">
      <h3>
        <span itemprop="name">Ball Gown Steam</span>
        $<span itemprop="priceSpecification" itemscope itemtype="https://schema.org/PriceSpecification">
          <span itemprop="minPrice">150</span>–<span itemprop="maxPrice">200</span>
          <meta itemprop="priceCurrency" content="USD" />
        </span>
      </h3>
      <div itemprop="description">
        <p>(Ball gown bridal gown, price assessed on complexity of garment)</p>
        <p>Includes veil steaming</p>
        <p aria-details="oversized-bags-disclaimer">Includes linen garment bag*</p>
        <p class="disclaimer" id="oversized-bags-disclaimer">
          *We do not carry oversized bags. If your gown requires this, you will not be charged for a garment bag
        </p>
      </div>
    </li>
  </ul>
  <p class="disclaimer" id="steaming-disclaimer">
    As with all steaming services, once the gown is placed in the bag,
    we cannot guarantee it will stay perfect.
    Please allow your garment to be laid out before your event.
  </p>
  <p class="dropoff">
    <a href="/#hours">
      Drop your garment off during our retail hours
    </a>
  </p>
</dialog>
`;

SteamingMenu.css = css`
  dialog#${dialogID} {
    max-inline-size: min(600px, 90vw);

    border-radius: 24px;
    padding-inline: var(--space-l);
    padding-block: var(--space-2xl);
    border: none;

    color: var(--white);
    background-color: #2F2963;
    text-align: center;

    transition-property: opacity, transform, display, overlay;
    transition-duration: 0.15s;
    transition-behavior: allow-discrete;


    &:not([open]) {
      opacity: 0;
      transform: translateY(var(--space-l));

      &::backdrop {
        opacity: 0;
      }
    }

    @starting-style {
      &[open] {
        opacity: 0;
        transform: translateY(var(--space-l));
      }

      &[open]::backdrop {
        opacity: 0;
      }
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      transition-property: opacity, display, overlay;
      transition-duration: 0.15s;
      transition-behavior: allow-discrete;
    }

    button[command="close"] {
      position: absolute;
      inset-block-start: var(--space-m);
      inset-inline-end: var(--space-m);
      padding: var(--space-2xs);
      color: inherit;
      background: none;
      border: none;
      font-size: var(--font-size-xl);
      line-height: 1;
      cursor: pointer;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-l);

      li {
        h3 {
          font-size: var(--font-size-l);
          margin-block-end: var(--space-2xs);
        }

        p {
          font-size: var(--font-size-s);
        }
      }
    }

    .disclaimer {
      font-style: italic;
    }

    #oversized-bags-disclaimer {
      margin-block-start: var(--space-2xs);
      font-size: var(--font-size-xs);
    }

    #steaming-disclaimer {
      margin-block-start: var(--space-m);
      font-size: var(--font-size-s);
    }

    .dropoff {
      font-weight: bold;
      font-style: italic;
      text-decoration: underline;
      font-size: var(--font-size-xl);
      margin-block-start: var(--space-m);
      text-wrap: balance;
    }
  }
`;

SteamingMenu.js = js`
  const dialog = document.getElementById("${dialogID}");
  if(window.location.hash === \`#${dialogID}\`) {
    dialog.showModal();
    // Make sure we shift focus to the dialog
    dialog.focus();
  }
  dialog.addEventListener("toggle", () => {
    // Toggle the modal hash on the URL when the dialog is opened/closed
    history.replaceState(null, "", \`\${window.location.pathname}\${window.location.search}\${dialog.open ? \`#${dialogID}\` : ""}\`);
  });
`;

export const SteamingMenuButton: YetiComponent = ({
  children
}) => html`
  <button
    type="button"
    commandfor=${dialogID}
    command="show-modal"
    class="action-btn primary"
  >${children}</button>
`;
