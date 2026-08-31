import { css, html, type YetiComponent } from "yeti-js";

const dialogID = "steaming-menu-dialog";

export const SteamingMenu: YetiComponent = () => html`
<dialog id=${dialogID} aria-label="Steaming Services Menu" itemprop="hasOfferCatalog" itemscope itemtype="https://schema.org/OfferCatalog">
  <meta itemprop="name" content="Steaming Services Menu" />

  <button type="button" commandfor=${dialogID} command="close" aria-label="Close">X</button>

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
  <p>
    As with all steaming services, once the gown is placed in the bag, we cannot guarantee it will stay perfect. Please allow your garment to be laid out before your event.
  </p>
</dialog>
`;

SteamingMenu.css = css``;

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
