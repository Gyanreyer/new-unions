import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildStructuredData, STORE_ID } from "./structuredData.ts";

const graphOf = (json: string) => JSON.parse(json)["@graph"] as Array<Record<string, any>>;
const byType = (graph: Array<Record<string, any>>, type: string) =>
  graph.find((node) => node["@type"] === type);

describe("buildStructuredData", () => {
  it("includes the website, store, and current page", () => {
    const graph = graphOf(buildStructuredData({
      canonicalURL: "https://newunionsbridal.com/",
      title: "New Unions Bridal",
      description: "Description",
    }));

    assert.ok(byType(graph, "WebSite"));
    assert.equal(byType(graph, "ClothingStore")?.["@id"], STORE_ID);
    assert.equal(byType(graph, "WebPage")?.url, "https://newunionsbridal.com/");
  });

  it("merges page additions into the store", () => {
    const graph = graphOf(buildStructuredData({
      canonicalURL: "https://newunionsbridal.com/",
      title: "New Unions Bridal",
      description: "Description",
      extra: { store: { makesOffer: [] } },
    }));

    assert.deepEqual(byType(graph, "ClothingStore")?.makesOffer, []);
  });

  it("escapes < so the JSON can't close its <script> tag", () => {
    const json = buildStructuredData({
      canonicalURL: "https://newunionsbridal.com/",
      title: "New Unions Bridal",
      description: "</script><script>alert(1)</script>",
    });

    assert.ok(!json.includes("<"));
    assert.equal(byType(graphOf(json), "WebPage")?.description, "</script><script>alert(1)</script>");
  });
});
