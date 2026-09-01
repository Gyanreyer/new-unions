import { css, html, js, type YetiComponent } from "yeti-js";
import { GOOGLE_MAPS_URL, ORIGIN } from "../constants.ts";

const OG_IMAGE_URL = new URL("/img/newunions_og.png", ORIGIN).toString();

export const BaseLayout: YetiComponent<{
  title: string;
  description: string;
  url: string;
}> = ({
  title = "New Unions Bridal",
  description = "New Unions is a wedding attire experience dedicated to couples that fit outside of the binary.",
  url,
  children,
  ...htmlSpreadAttrs
}) => {
    if (!url) {
      throw new Error("The 'url' prop is required for BaseLayout.");
    }

    const canonicalPageURL = new URL(url, ORIGIN).toString();

    return html`<!DOCTYPE html>
    <html
      lang="en"
      itemscope
      itemtype="https://schema.org/ClothingStore"
      itemid="${ORIGIN}/#store"
      ...${htmlSpreadAttrs}
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="canonical" href=${canonicalPageURL} />

        <!-- Inlined critical CSS -->
        <style>
          ${css.inline("critical")}
        </style>

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
        <meta
          name="keywords"
          content="wedding, bridal, attire, LGBTQ+, queer, Metro Detroit, Ferndale, Michigan"
        />
        <meta name="web_author" content="Ryan Geyer, https://geyer.dev" />
        <meta property="fb:page_id" content="61588584009876" />

        <!-- OG Metadata -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content=${canonicalPageURL} />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta
          property="og:image"
          content=${OG_IMAGE_URL}
        />
        <meta property="og:image:alt" content="New Unions Bridal Logo" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <!-- Business Address Metadata -->
        <meta property="og:street-address" content="359 Livernois Ave" />
        <meta property="og:locality" content="Ferndale" />
        <meta property="og:region" content="MI" />
        <meta property="og:postal-code" content="48220" />
        <meta property="og:country-name" content="United States" />

        <!-- Schema.org Metadata -->
        <meta itemprop="name" content="New Unions Bridal" />
        <link itemprop="url" href=${ORIGIN} />
        <link itemprop="logo" href=${new URL("/img/logo.png", ORIGIN).toString()} />
        <link itemprop="image" href=${new URL("/img/store/store-exterior-close.jpg", ORIGIN).toString()} />
        <link itemprop="hasMap" href=${GOOGLE_MAPS_URL} />

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="New Unions" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        ${children}
        <link
          rel="preload"
          href=${css.src("*")}
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <noscript><link rel="stylesheet" href=${css.src("*")} /></noscript>
        <style>
          ${css.inline("@page")}
        </style>
        <script>
          ${js.inline("*")}
        </script>
      </body>
    </html>`;
  };

// Basic reset styles shared across all pages
BaseLayout.css = css`
  ${css.import("/_styles/reset.css", "critical")}
  ${css.import("/_styles/utils.css", "components")}
`;
