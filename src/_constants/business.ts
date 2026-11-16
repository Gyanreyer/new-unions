/**
 * Details about the business, shared by the visible page content (address,
 * hours, footer links) and the schema.org structured data, so the two can't
 * drift apart.
 */

export const BUSINESS_NAME = "New Unions Bridal";
export const BUSINESS_SHORT_NAME = "New Unions";

export const CONTACT_EMAIL = "hello@newunionsbridal.com";

export const PHONE = {
  display: "(313) 314-3517",
  /** E.164 format, for `tel:` links and structured data */
  e164: "+13133143517",
};

export const ADDRESS = {
  street: "359 Livernois Ave",
  suite: "Suite 101",
  locality: "Ferndale",
  region: "MI",
  postalCode: "48220",
  country: "US",
  countryName: "United States",
};

export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/H9M8DWVo8fJhf1gF9";

/** The store's pin on Google Maps */
export const GEO = {
  latitude: 42.4485901,
  longitude: -83.1428398,
};

/** Walk-in retail hours, as 24-hour "HH:MM" times */
export const RETAIL_HOURS = [
  { day: "Thursday", opens: "12:00", closes: "16:30" },
  { day: "Friday", opens: "11:00", closes: "18:00" },
  { day: "Saturday", opens: "11:00", closes: "18:00" },
  { day: "Sunday", opens: "12:00", closes: "16:30" },
] as const;

export const FACEBOOK_PAGE_ID = "61588584009876";

export const SOCIAL_PROFILES = {
  facebook: `https://www.facebook.com/profile.php?id=${FACEBOOK_PAGE_ID}`,
  instagram: "https://www.instagram.com/newunionsbridal/",
  tiktok: "https://www.tiktok.com/@newunionsbridal",
};

export const AREA_SERVED = [
  "Ferndale, MI",
  "Royal Oak, MI",
  "Birmingham, MI",
  "Ann Arbor, MI",
  "Metro Detroit",
];

/**
 * Overall price range for structured data. Covers clothing (occasion wear
 * up to custom gowns) rather than starting at the cheapest accessory.
 */
export const BUSINESS_PRICE_RANGE = "$100–$3,800+";
