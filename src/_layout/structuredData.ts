/**
 * Builds the schema.org JSON-LD that BaseLayout puts in every page's <head>.
 *
 * Every page gets the same core components: the WebSite, the ClothingStore, and a
 * WebPage for the current page. Pages can add properties to the ClothingStore
 * with the `structuredData` prop's `store` field (e.g. `makesOffer`).
 */
import { ORIGIN } from "../_constants/site.ts";
import {
  ADDRESS,
  AREA_SERVED,
  BUSINESS_NAME,
  BUSINESS_PRICE_RANGE,
  BUSINESS_SHORT_NAME,
  CONTACT_EMAIL,
  GEO,
  GOOGLE_MAPS_URL,
  PHONE,
  RETAIL_HOURS,
  SOCIAL_PROFILES,
} from "../_constants/business.ts";

export type JsonLdNode = Record<string, unknown>;

export type PageStructuredData = {
  store?: JsonLdNode;
};

const HOME_URL = `${ORIGIN}/`;
export const STORE_ID = `${ORIGIN}/#store`;
export const WEBSITE_ID = `${ORIGIN}/#website`;

const absoluteURL = (path: string) => new URL(path, ORIGIN).toString();

function storeNode(extra: JsonLdNode = {}): JsonLdNode {
  return {
    "@type": "ClothingStore",
    "@id": STORE_ID,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_SHORT_NAME,
    url: HOME_URL,
    logo: absoluteURL("/img/logo.png"),
    image: absoluteURL("/img/store/store-exterior-close.jpg"),
    telephone: PHONE.e164,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.street}, ${ADDRESS.suite}`,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: RETAIL_HOURS.map(({ day, opens, closes }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens,
      closes,
    })),
    priceRange: BUSINESS_PRICE_RANGE,
    areaServed: AREA_SERVED,
    sameAs: Object.values(SOCIAL_PROFILES),
    ...extra,
  };
}

/**
 * Builds the page's JSON-LD graph as a string that's safe to put inside a
 * <script> tag.
 */
export function buildStructuredData({
  canonicalURL,
  title,
  description,
  extra = {},
}: {
  canonicalURL: string;
  title: string;
  description: string;
  extra?: PageStructuredData;
}): string {
  const webPageId = `${canonicalURL}#webpage`;

  const graph: JsonLdNode[] = [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: HOME_URL,
      name: BUSINESS_NAME,
      alternateName: BUSINESS_SHORT_NAME,
      inLanguage: "en-US",
      publisher: { "@id": STORE_ID },
    },
    storeNode(extra.store),
    {
      "@type": "WebPage",
      "@id": webPageId,
      url: canonicalURL,
      name: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": STORE_ID },
    },
  ];

  // Escape "<" so content can't close the <script> tag early
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
