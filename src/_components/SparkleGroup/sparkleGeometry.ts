/**
 * Build-time layout + timing for SparkleGroup.
 *
 * All lengths are in multiples of the group's `size`. A sparkle's `x`/`y` is
 * its center, measured from the group's anchor point: +x toward inline-end
 * (right), +y toward block-end (down), whatever the anchor.
 */
import { YETI_NODE_TYPE, type YetiChildNode, type YetiElementNode } from "yeti-js";

type Edge = "start" | "center" | "end";

/** [block edge, inline edge] of the host that each anchor point sits on. */
export const ANCHORS = {
  "top-start": ["start", "start"],
  top: ["start", "center"],
  "top-end": ["start", "end"],
  start: ["center", "start"],
  center: ["center", "center"],
  end: ["center", "end"],
  "bottom-start": ["end", "start"],
  bottom: ["end", "center"],
  "bottom-end": ["end", "end"],
} as const satisfies Record<string, [block: Edge, inline: Edge]>;

export type SparkleAnchor = keyof typeof ANCHORS;

export function isAnchor(value: unknown): value is SparkleAnchor {
  return typeof value === "string" && Object.hasOwn(ANCHORS, value);
}

/**
 * Props a `<Sparkle>` hands to its group. Stored under a symbol key on the
 * rendered `<svg>`'s attributes, which yeti never renders (it only walks string
 * keys), so the data never reaches the page.
 */
export const SPARKLE_DATA = Symbol("sparkle-data");

export type SparkleData = {
  x?: number;
  y?: number;
  scale: number;
  delay?: number;
  duration?: number;
};

export type SparklePoint = { x: number; y: number; scale: number };

export type ReadSparkle = {
  node: YetiElementNode;
  point: SparklePoint;
  delay?: number;
  duration?: number;
};

/** Pulls each `<Sparkle>` out of a group's children, rejecting anything else. */
export function readSparkles(children: YetiChildNode[] | undefined): ReadSparkle[] {
  const sparkles: ReadSparkle[] = [];
  for (const child of children ?? []) {
    if (child.type === YETI_NODE_TYPE.COMMENT) continue;
    if (child.type === YETI_NODE_TYPE.TEXT && child.content.trim() === "") continue;
    const data =
      child.type === YETI_NODE_TYPE.ELEMENT
        ? (child.attributes as Record<symbol, SparkleData | undefined> | undefined)?.[SPARKLE_DATA]
        : undefined;
    if (child.type !== YETI_NODE_TYPE.ELEMENT || !data) {
      throw new Error("SparkleGroup: children must be <Sparkle> components only");
    }
    const { x, y, scale, delay, duration } = data;
    if (x === undefined || y === undefined) {
      throw new Error("SparkleGroup: every <Sparkle> needs both `x` and `y`");
    }
    sparkles.push({ node: child, point: { x, y, scale }, delay, duration });
  }
  if (sparkles.length === 0) {
    throw new Error("SparkleGroup: needs at least one <Sparkle> child");
  }
  return sparkles;
}

export type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

/** Smallest box, in anchor-relative units, that contains every sparkle. */
export function boundsOf(points: SparklePoint[]): Bounds {
  if (points.length === 0) throw new Error("SparkleGroup: can't measure an empty group");
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const { x, y, scale } of points) {
    const half = scale / 2;
    bounds.minX = Math.min(bounds.minX, x - half);
    bounds.minY = Math.min(bounds.minY, y - half);
    bounds.maxX = Math.max(bounds.maxX, x + half);
    bounds.maxY = Math.max(bounds.maxY, y + half);
  }
  return {
    minX: round(bounds.minX, 3),
    minY: round(bounds.minY, 3),
    maxX: round(bounds.maxX, 3),
    maxY: round(bounds.maxY, 3),
  };
}

/**
 * Inline style declarations that place the group's box (sized to `bounds`)
 * so its sparkles land at their anchor-relative coordinates.
 *
 * Each axis puts the box in the position-area cell beyond the anchor edge,
 * aligned against the anchor, then uses margins to slide it into place. A
 * margin pulling back toward the anchor shrinks the margin box by exactly as
 * much as the box crosses the edge, so the browser's "does it fit?" check
 * matches whether the visible box crosses the boundary.
 */
export function placementStyles(anchor: SparkleAnchor, bounds: Bounds): string[] {
  const [blockEdge, inlineEdge] = ANCHORS[anchor];
  const block = axis("block", blockEdge, bounds.minY, bounds.maxY, "var(--sparkle-group-offset-y, 0)");
  const inline = axis("inline", inlineEdge, bounds.minX, bounds.maxX, "var(--sparkle-group-offset-x, 0)");
  return [
    `position-area: ${block.area} ${inline.area}`,
    `align-self: ${block.self}`,
    `justify-self: ${inline.self}`,
    `margin-block: ${block.marginStart} ${block.marginEnd}`,
    `margin-inline: ${inline.marginStart} ${inline.marginEnd}`,
    `--_box-x: ${round(bounds.maxX - bounds.minX, 3)}`,
    `--_box-y: ${round(bounds.maxY - bounds.minY, 3)}`,
    `--_min-x: ${bounds.minX}`,
    `--_min-y: ${bounds.minY}`,
  ];
}

function axis(name: "block" | "inline", edge: Edge, min: number, max: number, nudge: string) {
  const unit = "var(--_unit)";
  switch (edge) {
    // Cell past the end edge; box starts at the edge, slid to `min`.
    case "end":
      return {
        area: `${name}-end`,
        self: "normal",
        marginStart: `calc((${min} + ${nudge}) * ${unit})`,
        marginEnd: "0px",
      };
    // Cell before the start edge; box ends at the edge, slid to `max`.
    case "start":
      return {
        area: `${name}-start`,
        self: "normal",
        marginStart: "0px",
        marginEnd: `calc((-1 * ${max} - ${nudge}) * ${unit})`,
      };
    // Whole row/column, centered on the anchor's middle, slid to the box's center.
    case "center": {
      const center = round((min + max) / 2, 3);
      return {
        area: "span-all",
        self: "anchor-center",
        marginStart: `calc((${center} + ${nudge}) * ${unit})`,
        marginEnd: `calc((-1 * ${center} - ${nudge}) * ${unit})`,
      };
    }
  }
}

/** Seconds; one twinkle cycle, roughly. */
export const CYCLE = 2.6;

/** Cycled through by index, so neighbors drift apart over time. */
export const DURATIONS = [2.6, 2.45, 2.75, 2.5, 2.7] as const;

const GOLDEN_RATIO_CONJUGATE = 0.6180339887498949;

/**
 * A sparkle's delay within its group, in seconds. Steps around the cycle by
 * the golden ratio, so any number of sparkles land well apart and adjacent
 * sparkles never peak back-to-back. Negative, so every sparkle is already
 * mid-twinkle on page load.
 */
export function staggerFor(index: number): number {
  return phaseDelay((index * GOLDEN_RATIO_CONJUGATE) % 1);
}

export function durationFor(index: number): number {
  return DURATIONS[index % DURATIONS.length]!;
}

/**
 * A whole group's phase, in seconds, from a hash of its layout. Keeps groups
 * on the same page out of sync without anyone picking numbers, and stays put
 * across builds as long as the layout does.
 */
export function autoGroupDelay(anchor: SparkleAnchor, points: SparklePoint[]): number {
  const key = [anchor, ...points.map(({ x, y, scale }) => `${x},${y},${scale}`)].join("|");
  return phaseDelay(fnv1aSeededRandom(key) / 2 ** 32);
}

/** A fraction of the cycle [0, 1) → a delay in (-CYCLE, 0] seconds. */
function phaseDelay(fraction: number): number {
  // Rounding can land on exactly -CYCLE, which is the same phase as 0.
  return (round(-fraction * CYCLE, 2) % CYCLE) + 0;
}

function fnv1aSeededRandom(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function parseNumber(name: string, value: number | string): number {
  const n = typeof value === "number" ? value : Number(value);
  if ((typeof value === "string" && value.trim() === "") || !Number.isFinite(n)) {
    throw new Error(`Sparkle: ${name} must be a number, got "${value}"`);
  }
  return n;
}

function round(n: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(n * factor) / factor + 0; // `+ 0` turns -0 into 0
}
