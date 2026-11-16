/**
 * A price or price range in whole US dollars.
 *
 * - `{ min: 59 }` is a single price: "$59"
 * - `{ min: 89, max: 99 }` is a range: "$89–$99"
 * - `{ min: 200, openEnded: true }` is a starting price: "$200+"
 * - `{ min: 1300, max: 3800, openEnded: true }` is a typical range that custom work can exceed: "$1,300–$3,800+"
 */
export type PriceRange = {
  min: number;
  max?: number;
  openEnded?: boolean;
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats a price range for display, e.g. "$1,300–$3,800+" */
export function formatPriceRange({ min, max, openEnded = false }: PriceRange): string {
  const range = max === undefined ? usd.format(min) : `${usd.format(min)}–${usd.format(max)}`;
  return openEnded ? `${range}+` : range;
}

/**
 * Schema.org price properties for an Offer: a plain `price` for a single
 * price, or a `priceSpecification` with min/max for a range.
 */
export function offerPriceSchema({ min, max, openEnded = false }: PriceRange): Record<string, unknown> {
  if (max === undefined && !openEnded) {
    return { price: min, priceCurrency: "USD" };
  }

  return {
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: min,
      // An open-ended range has no real maximum, so it's left off
      ...(max !== undefined && !openEnded ? { maxPrice: max } : {}),
      priceCurrency: "USD",
    },
  };
}
