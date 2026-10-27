import { css, html, type YetiComponent } from "yeti-js";
import { BaseLayout } from "./BaseLayout.component.ts";
import { Icon } from "../_components/Icon.component.ts";
import { ResponsiveImage } from "../_components/ResponsiveImage.component.ts";

/**
 * Layout to wrap page contents in the standard border layout + footer cutout.
 *
 * The page wrapper is a grid with three nested column ranges:
 * - `full`: border to border
 * - `wide`: inside the page gutters (default for the header and footer)
 * - `content`: `wide`, capped at a max width and centered (default for everything in `<main>`)
 *
 * `<main>` is a subgrid spanning `full`, so its children can use the same names,
 * e.g. `grid-column: full` for a full-bleed banner.
 *
 * Deeper descendants can't reach the grid lines, so they can break out with a
 * width variable instead:
 * - `--page-inline-size`: the page's width inside the border
 * - `--window-inline-size`: the window's width (excluding any scrollbar)
 *
 * `width: var(--page-inline-size); margin-inline: calc(50% - var(--page-inline-size) / 2);`
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
        <a href="/about/" class="underlined-link underline-target">About Us</a>
        <span class="spacer"/>
        <a href="/faq/" class="underlined-link underline-target">FAQ</a>
        <span class="spacer"/>
        <a href="/#additional-services" class="underlined-link underline-target">Additional Services</a>
        <span class="spacer"/>
        <a href="/products/" class="underlined-link underline-target">Our Products</a>
        <span class="spacer"/>
        <a href="/#business-info" class="underlined-link underline-target">Visit Us</a>
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
  --page-gutter: var(--space-s-2xl);
  --page-content-max-width: 1200px;
  --page-margin: var(--space-s-2xl);
  position: relative;
  /* Lets descendants measure the page's width with container units (see --page-inline-size) */
  container-type: inline-size;
  display: grid;
  grid-template-columns:
    [full-start] var(--page-gutter)
    [wide-start] minmax(0, 1fr)
    [content-start] min(100% - 2 * var(--page-gutter), var(--page-content-max-width))
    [content-end] minmax(0, 1fr)
    [wide-end] var(--page-gutter)
    [full-end];
  /* Keep rows packed at the top instead of stretching to fill the page height */
  align-content: start;
  margin: var(--page-margin);
  flex: 1;
  --page-border-width: 3px;
  border: var(--page-border-width) solid var(--white);
  border-bottom: none;
  padding-block-end: var(--space-l);
  view-transition-name: page-wrapper;
}

/* Page and window widths, as fixed lengths so they mean the same thing at any
  depth (a bare \`100cqi\` would measure the nearest container instead).
  Unlike \`100vw\`, the window width doesn't include the scrollbar. */
@property --page-inline-size {
  syntax: "<length>";
  inherits: true;
  initial-value: 100vw;
}

@property --window-inline-size {
  syntax: "<length>";
  inherits: true;
  initial-value: 100vw;
}

/* The rules below have zero specificity so any element can override its placement */
:where(#page-wrapper > *) {
  grid-column: wide;
  --page-inline-size: 100cqi;
  /* The page is centered in the window, so add back its margin and border on both sides */
  --window-inline-size: calc(100cqi + 2 * (var(--page-margin) + var(--page-border-width)));
}

:where(#page-wrapper > main) {
  grid-column: full;
  display: grid;
  grid-template-columns: subgrid;
  align-content: start;
}

:where(#page-wrapper > main > *) {
  grid-column: content;
}

#page-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-start: var(--space-xl-2xl);

  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: var(--space-s);
    margin-block: var(--space-2xs) var(--space-s);
    text-align: center;

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