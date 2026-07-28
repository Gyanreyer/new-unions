import { css, html, js, type YetiComponent } from "yeti-js";
import { ORIGIN } from "../constants.ts";

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
    <html lang="en" ...${htmlSpreadAttrs}>
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
        <meta name="canonical" content=${canonicalPageURL} />
        <meta
          name="keywords"
          content="wedding, bridal, attire, LGBTQ+, queer"
        />
        <meta name="web_author" content="Ryan Geyer, https://geyer.dev" />
        <meta property="fb:page_id" content="61588584009876" />

        <!-- OG Metadata -->
        <meta name="og:type" content="website" />
        <meta name="og:url" content=${canonicalPageURL} />
        <meta name="og:title" content="${title}" />
        <meta name="og:description" content="${description}" />
        <meta
          name="og:image"
          content=${OG_IMAGE_URL}
        />
        <meta name="og:image:alt" content="New Unions Bridal Logo" />
        <meta name="og:image:type" content="image/png" />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="630" />
        <meta name="og:locale" content="en_US" />
        <!-- Business Address Metadata -->
        <meta name="og:street-address" content="359 Livernois Ave" />
        <meta name="og:locality" content="Ferndale" />
        <meta name="og:region" content="MI" />
        <meta name="og:postal-code" content="48220" />
        <meta name="og:country-name" content="United States" />

        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Preconnect for Cloudflare Web Analytics domains -->
        <link rel="preconnect" href="https://static.cloudflareinsights.com" crossorigin />
        <link rel="preconnect" href="https://cloudflareinsights.com" crossorigin />

        <style>
          ${css.inline("critical")}
        </style>
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
        <!-- Cloudflare Web Analytics -->
        <script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7afe9a1f12984bdf8f4888f38a642ccb"}'></script>
      </body>
    </html>`;
  };

// Basic reset styles shared across all pages
BaseLayout.css = css`
  ${css.import("/_styles/reset.css", "critical")}
  ${css.import("/_styles/utils.css", "components")}
`;
