import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { YETI_NODE_TYPE, type YetiChildNode } from "yeti-js";
import {
  autoGroupDelay,
  boundsOf,
  CYCLE,
  parseNumber,
  placementStyles,
  readSparkles,
  SPARKLE_DATA,
  staggerFor,
  type SparkleData,
} from "./sparkleGeometry.ts";

const sparkleNode = (data: SparkleData): YetiChildNode => ({
  type: YETI_NODE_TYPE.ELEMENT,
  tagName: "svg",
  attributes: { class: "sparkle", [SPARKLE_DATA]: data } as Record<string, unknown>,
});
const text = (content: string): YetiChildNode => ({ type: YETI_NODE_TYPE.TEXT, content });

describe("boundsOf", () => {
  it("measures a sparkle by its center and scale", () => {
    assert.deepEqual(boundsOf([{ x: 0, y: 0, scale: 1 }]), {
      minX: -0.5,
      minY: -0.5,
      maxX: 0.5,
      maxY: 0.5,
    });
  });

  it("covers every sparkle", () => {
    const bounds = boundsOf([
      { x: 1, y: -1, scale: 1 },
      { x: 3, y: 0.5, scale: 0.5 },
    ]);
    assert.deepEqual(bounds, { minX: 0.5, minY: -1.5, maxX: 3.25, maxY: 0.75 });
  });

  it("rejects an empty group", () => {
    assert.throws(() => boundsOf([]));
  });
});

describe("placementStyles", () => {
  const bounds = { minX: 0.5, minY: -1.5, maxX: 3.25, maxY: 0.75 };
  const style = (anchor: Parameters<typeof placementStyles>[0]) =>
    Object.fromEntries(placementStyles(anchor, bounds).map((d) => d.split(/:\s(.*)/s, 2)));

  it("sizes the box to the bounds", () => {
    const s = style("top-end");
    assert.equal(s["--_box-x"], "2.75");
    assert.equal(s["--_box-y"], "2.25");
    assert.equal(s["--_min-x"], "0.5");
    assert.equal(s["--_min-y"], "-1.5");
  });

  it("starts the box at `min` past an end edge", () => {
    const s = style("bottom-end");
    assert.equal(s["position-area"], "block-end inline-end");
    assert.match(s["margin-inline"]!, /^calc\(\(0\.5 \+ var\(--sparkle-group-offset-x, 0\)\)/);
    assert.match(s["margin-block"]!, /^calc\(\(-1\.5 \+ var\(--sparkle-group-offset-y, 0\)\)/);
  });

  it("ends the box at `max` before a start edge", () => {
    const s = style("top-start");
    assert.equal(s["position-area"], "block-start inline-start");
    assert.match(s["margin-inline"]!, /^0px calc\(\(-1 \* 3\.25 - var\(--sparkle-group-offset-x, 0\)\)/);
    assert.match(s["margin-block"]!, /^0px calc\(\(-1 \* 0\.75 - var\(--sparkle-group-offset-y, 0\)\)/);
  });

  it("shifts by the box's center on a center axis", () => {
    const s = style("center");
    assert.equal(s["position-area"], "span-all span-all");
    assert.equal(s["justify-self"], "anchor-center");
    assert.match(s["margin-inline"]!, /^calc\(\(1\.875 \+ /);
    assert.match(s["margin-block"]!, /^calc\(\(-0\.375 \+ /);
  });
});

describe("timing", () => {
  it("staggers sparkles in a group well apart", () => {
    const delays = [0, 1, 2].map(staggerFor).sort((a, b) => a - b);
    for (let i = 1; i < delays.length; i++) {
      assert.ok(delays[i]! - delays[i - 1]! >= 0.2 * CYCLE, `delays ${delays} too close`);
    }
    assert.ok(delays.every((d) => d <= 0 && d > -CYCLE));
  });

  it("gives a group the same phase on every build", () => {
    const points = [{ x: 1, y: 0.5, scale: 1 }];
    assert.equal(autoGroupDelay("top-end", points), autoGroupDelay("top-end", points));
  });

  it("spreads group phases across the cycle", () => {
    const buckets = new Set<number>();
    for (let i = 0; i < 50; i++) {
      const delay = autoGroupDelay("top-end", [{ x: i / 10, y: 0, scale: 1 }]);
      assert.ok(delay <= 0 && delay > -CYCLE);
      buckets.add(Math.floor((-delay / CYCLE) * 5));
    }
    assert.equal(buckets.size, 5);
  });

  it("changes phase with the anchor", () => {
    const points = [{ x: 1, y: 0.5, scale: 1 }];
    assert.notEqual(autoGroupDelay("top-end", points), autoGroupDelay("bottom-end", points));
  });
});

describe("readSparkles", () => {
  it("reads sparkles in order, skipping whitespace and comments", () => {
    const sparkles = readSparkles([
      text("\n  "),
      sparkleNode({ x: 1, y: 2, scale: 1 }),
      { type: YETI_NODE_TYPE.COMMENT, content: "note" },
      sparkleNode({ x: 3, y: 4, scale: 0.5, delay: -1 }),
    ]);
    assert.deepEqual(
      sparkles.map(({ point, delay }) => ({ ...point, delay })),
      [
        { x: 1, y: 2, scale: 1, delay: undefined },
        { x: 3, y: 4, scale: 0.5, delay: -1 },
      ],
    );
  });

  it("rejects non-sparkle children", () => {
    assert.throws(() => readSparkles([text("hi")]), /<Sparkle> components only/);
    assert.throws(
      () => readSparkles([{ type: YETI_NODE_TYPE.ELEMENT, tagName: "span" }]),
      /<Sparkle> components only/,
    );
  });

  it("requires x and y", () => {
    assert.throws(() => readSparkles([sparkleNode({ x: 1, scale: 1 })]), /`x` and `y`/);
  });

  it("requires at least one sparkle", () => {
    assert.throws(() => readSparkles([text(" ")]), /at least one/);
  });
});

describe("parseNumber", () => {
  it("accepts numbers and numeric strings", () => {
    assert.equal(parseNumber("x", "-0.5"), -0.5);
    assert.equal(parseNumber("x", 2), 2);
  });

  it("rejects blanks and junk", () => {
    assert.throws(() => parseNumber("x", ""));
    assert.throws(() => parseNumber("x", "abc"));
  });
});
