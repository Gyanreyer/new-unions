import { css, html, js, type YetiComponent, type PageContext } from "yeti-js";
import { ORIGIN } from "../_constants/site.ts";
import { ADDRESS, BUSINESS_NAME, BUSINESS_SHORT_NAME, FACEBOOK_PAGE_ID } from "../_constants/business.ts";
import { buildStructuredData, type PageStructuredData } from "./structuredData.ts";

const OG_IMAGE_URL = new URL("/img/newunions_og.png", ORIGIN).toString();

export const BaseLayout: YetiComponent<{
  title: string;
  description: string;
  page: PageContext;
  /** Page-specific additions to the schema.org structured data; see structuredData.ts */
  structuredData?: PageStructuredData;
}> = ({
  title = BUSINESS_NAME,
  description = "New Unions is a wedding attire experience dedicated to couples that fit outside of the binary.",
  page,
  structuredData,
  children,
  ...htmlSpreadAttrs
}) => {
    if (!page) {
      throw new Error("The `page` prop is required for BaseLayout.");
    }

    const canonicalPageURL = new URL(page.url, ORIGIN).toString();

    const structuredDataJSON = buildStructuredData({
      canonicalURL: canonicalPageURL,
      title,
      description,
      extra: structuredData,
    });

    return html`<!DOCTYPE html>
    <html lang="en" ...${htmlSpreadAttrs}>
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
          href="/font/DMSans-latin.woff2"
          as="font"
          type="font/woff2"
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
        <meta property="fb:page_id" content=${FACEBOOK_PAGE_ID} />

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
        <meta property="og:street-address" content=${ADDRESS.street} />
        <meta property="og:locality" content=${ADDRESS.locality} />
        <meta property="og:region" content=${ADDRESS.region} />
        <meta property="og:postal-code" content=${ADDRESS.postalCode} />
        <meta property="og:country-name" content=${ADDRESS.countryName} />

        <!-- Schema.org structured data -->
        <script type="application/ld+json">${structuredDataJSON}</script>

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content=${BUSINESS_SHORT_NAME} />
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
