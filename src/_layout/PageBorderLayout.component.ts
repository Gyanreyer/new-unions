import { css, html, type YetiComponent } from "yeti-js";
import { BaseLayout } from "./BaseLayout.component.ts";
import { Icon } from "../_components/Icon.component.ts";

/**
 * Layout to wrap page contents in the standard border layout + footer cutout
 */
export const PageBorderLayout: YetiComponent = ({ children, ...spreadAttrs }) => {
  return html`<${BaseLayout} ...${spreadAttrs}>
  <div id="page-wrapper">
    ${children}
    <footer id="page-footer">
      <nav>
        <a href="/about" class="underlined-link">About Us</a>
        <span class="spacer"></span>
        <a href="/faq" class="underlined-link">FAQ</a>
      </nav>
      <p class="queer-owned">
        Queer woman-owned local business in Southeast Michigan
      </p>
      <div class="social-links">
        <div class="links-wrapper">
          <a href="https://www.facebook.com/profile.php?id=61588584009876" class="fb">
            <${Icon} name="facebook" label="Facebook Page" height="23" width="13" />
          </a>
          <a href="https://www.instagram.com/newunionsbridal/" class="insta">
            <${Icon} name="instagram" label="Instagram Page" width="20" height="20" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</${BaseLayout}>`;
};

PageBorderLayout.css = css`
body {
  background-image: linear-gradient(
    to bottom,
    var(--orange),
    var(--blue) 75vh,
    var(--blue) 150vh,
    var(--orange) 225vh
  );
  background-repeat: repeat-y;
  background-size: 100vw 250vh;

  --outer-spacing: 72px;
  padding: var(--outer-spacing);
  @media screen and (width <= 1024px) {
    --outer-spacing: 48px;
  }
  @media screen and (width <= 640px) {
    --outer-spacing: 24px;
  }
}

#page-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-inline: var(--outer-spacing);
  flex: 1;
  --page-border-width: 3px;
  border: var(--page-border-width) solid var(--white);
  border-bottom: none;
  padding-block-end: 3rem;
}

#page-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;

  nav {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    .spacer {
      height: 0.8lh;
      width: 1px;
      background-color: currentColor;
    }
  }

  .queer-owned {
    font-size: 1rem;
    margin-block-start: auto;
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
    padding-inline: 2.5rem;
    display: flex;
    align-items: center;
    column-gap: 2.25rem;

    .fb svg {
      width: 0.8125rem;
      height: auto;
    }

    .insta svg {
      width: 1.25rem;
      height: auto;
    }
  }
}
`;