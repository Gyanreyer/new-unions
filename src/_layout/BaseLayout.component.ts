import { css, html, js, type YetiComponent } from "yeti-js";

export const BaseLayout: YetiComponent<{
  title: string;
  description: string;
}> = ({
  title = "New Unions Bridal",
  description = "New Unions is a wedding attire experience dedicated to couples that fit outside of the binary.",
  children,
}) => {
    return html`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  
    <!-- Preload font -->
    <link
      rel="preload"
      href="/font/DMSans.ttf"
      as="font"
      type="font/ttf"
      crossorigin
    />

    <!-- Metadata -->
    <meta name="description" content="${description}" />
    <meta name="theme-color" content="#454372" />
    <meta name="subject" content="Wedding Attire" />
    <meta name="keywords" content="wedding, bridal, attire, LGBTQ+, queer" />
    <meta name="web_author" content="Ryan Geyer, https://geyer.dev" />
    <meta property="fb:page_id" content="61588584009876" />

    <!-- OG Metadata -->
    <meta name="og:type" content="website" />
    <meta name="og:url" content="https://newunionsbridal.com/" />
    <meta name="og:title" content="${title}" />
    <meta name="og:description" content="${description}" />
    <meta
      name="og:image"
      content="https://newunionsbridal.com/img/newunions_og.png"
    />
    <meta name="og:image:alt" content="New Unions Bridal Logo" />
    <meta name="og:image:type" content="image/png" />
    <meta name="og:image:width" content="1200" />
    <meta name="og:image:height" content="630" />
    <meta name="og:locale" content="en_US" />
    <!-- Business Address Metadata -->
    <meta name="og:street-address" content="359 Livernois Ave">
    <meta name="og:locality" content="Ferndale" />
    <meta name="og:region" content="MI" />
    <meta name='og:postal-code' content='48220'>
    <meta name="og:country-name" content="United States" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link
      rel="icon"
      type="image/png"
      href="https://newunionsbridal.com/favicon.png"
    />

    <style>${css.inline("critical")}</style>
    <script type="module">${js.inline("critical")}</script>
  </head>
  <body>
    ${children}
    <link rel="preload" href=${css.src("*")} as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href=${css.src("*")}></noscript>
    <script type="module" src=${js.src("*")}></script>
  </body>
</html>`;
  };

// Basic reset styles shared across all pages
BaseLayout.css = css`
  ${css.import("/_styles/reset.css", "critical")}
  ${css.import("/_styles/utils.css", "components")}
`;

BaseLayout.js = js`
${js.bundle("critical")}
{
  const areInvokersSupported = (
    typeof HTMLButtonElement !== "undefined" &&
    "command" in HTMLButtonElement.prototype &&
    "source" in ((globalThis.CommandEvent || {}).prototype || {})
  );
  if (!areInvokersSupported) {
    // Load invoker polyfill for browsers that don't support it natively
    import("/js/polyfill/invokers.js");
  }
}
`;