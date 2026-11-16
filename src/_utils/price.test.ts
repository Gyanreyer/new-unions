import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatPriceRange, offerPriceSchema } from "./price.ts";

describe("formatPriceRange", () => {
  it("formats a single price", () => {
    assert.equal(formatPriceRange({ min: 59 }), "$59");
  });

  it("formats a range with an en dash and thousands separators", () => {
    assert.equal(formatPriceRange({ min: 500, max: 1699 }), "$500–$1,699");
  });

  it("formats a starting price", () => {
    assert.equal(formatPriceRange({ min: 3000, openEnded: true }), "$3,000+");
  });

  it("formats a typical range that can be exceeded", () => {
    assert.equal(formatPriceRange({ min: 1300, max: 3800, openEnded: true }), "$1,300–$3,800+");
  });
});

describe("offerPriceSchema", () => {
  it("uses a plain price for a single price", () => {
    assert.deepEqual(offerPriceSchema({ min: 59 }), { price: 59, priceCurrency: "USD" });
  });

  it("uses min and max for a closed range", () => {
    assert.deepEqual(offerPriceSchema({ min: 89, max: 99 }), {
      priceSpecification: { "@type": "PriceSpecification", minPrice: 89, maxPrice: 99, priceCurrency: "USD" },
    });
  });

  it("leaves out the max for an open-ended range", () => {
    assert.deepEqual(offerPriceSchema({ min: 1300, max: 3800, openEnded: true }), {
      priceSpecification: { "@type": "PriceSpecification", minPrice: 1300, priceCurrency: "USD" },
    });
  });
});
