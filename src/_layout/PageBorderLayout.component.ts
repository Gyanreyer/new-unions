import { css, html, type YetiComponent } from "yeti-js";
import { BaseLayout } from "./BaseLayout.component.ts";
import { Icon } from "../_components/Icon.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

/**
 * Layout to wrap page contents in the standard border layout + footer cutout
 */
export const PageBorderLayout: YetiComponent = ({ children, ...spreadAttrs }) => {
  return html`<${BaseLayout} ...${spreadAttrs}>
  <div id="page-wrapper">
    ${children}
    <footer id="page-footer">
      <div class="badges">
        <a rel='nofollow' target='_blank' href='https://www.theknot.com/marketplace/redirect-2105972?utm_source=vendor_website&utm_medium=banner&utm_term=c676db0a-ae1a-479b-81ef-dac3d37fe82b&utm_campaign=vendor_badge_assets'>
          <${ResponsiveImage} src="/img/badges/the-knot.png" alt="As seen on The Knot" />
        </a>
        <a rel='nofollow' target='_blank' href='https://www.weddingwire.com'>
          <${ResponsiveImage} src="/img/badges/wedding-wire.png" alt="Find me on WeddingWire" />
        </a>
        <a rel='nofollow' target='_blank' href='https://safespacealliance.com/'>
          <${ResponsiveImage} src="/img/badges/safe-space-alliance.png" alt="Safe Space Alliance" />
        </a>
      </div>
      <nav>
        <a href="/about" class="underlined-link underline-target">About Us</a>
        <span class="spacer"></span>
        <a href="/faq" class="underlined-link underline-target">FAQ</a>
      </nav>
      <p class="queer-owned">
        Queer woman-owned local business in Southeast Michigan
      </p>
      <div class="social-links">
        <div class="links-wrapper">
          <a rel='nofollow' target='_blank' href="https://www.facebook.com/profile.php?id=61588584009876" class="fb" itemprop="sameAs">
            <${Icon} name="facebook" label="Facebook Page" height="23" width="13" />
          </a>
          <a rel='nofollow' target='_blank' href="https://www.instagram.com/newunionsbridal/" class="insta" itemprop="sameAs">
            <${Icon} name="instagram" label="Instagram Page" width="20" height="20" />
          </a>
          <a rel='nofollow' target='_blank' href="https://www.tiktok.com/@newunionsbridal" class="tiktok" itemprop="sameAs">
            <${Icon} name="tiktok" label="TikTok Page" width="19" height="22" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</${BaseLayout}>`;
};

PageBorderLayout.css = css`
${css.bundle("critical")}
#page-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: var(--space-s-2xl);
  padding-inline: var(--space-s-2xl);
  flex: 1;
  --page-border-width: 3px;
  border: var(--page-border-width) solid var(--white);
  border-bottom: none;
  padding-block-end: var(--space-l);
  view-transition-name: page-wrapper;
}

#page-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-start: var(--space-xl-2xl);

  nav {
    display: flex;
    align-items: center;
    column-gap: var(--space-s);
    margin-block: var(--space-2xs) var(--space-s);

    .spacer {
      height: 0.8lh;
      width: 1px;
      background-color: currentColor;
    }
  }

  .queer-owned {
    font-size: var(--font-size-xs);
    text-align: center;
    text-wrap: balance;
  }

  .badges {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, minmax(75px, 120px));
    column-gap: var(--space-m);

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  /** Footer icons wrapper adds lines to form the bottom of the page border
      with a break for the footer icons */
  .social-links {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: calc(var(--page-border-width) * -1);
    width: calc(100% + var(--page-border-width) * 2);
    translate: 0 50%;

    &::before,
    &::after {
      content: "";
      display: block;
      height: var(--page-border-width);
      background-color: var(--white);
    }
  }

  .links-wrapper {
    padding-inline: var(--space-m);
    display: flex;
    align-items: center;
    column-gap: var(--space-m);

    .fb svg {
      width: 0.8125rem;
      height: auto;
    }

    .insta svg {
      width: 1.25rem;
      height: auto;
    }

    .tiktok svg {
      width: 1.1875rem;
      height: auto;
    }
  }
`;