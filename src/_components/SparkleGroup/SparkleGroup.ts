import { css, html, type YetiComponent } from "yeti-js";
import { Sparkle } from "../Sparkle.component.ts";
import {
  boundsOf,
  generatePositions,
  generateTimings,
  type Seed,
  type SparklePosition,
} from "./sparkleLayout.ts";

type Edge = "start" | "center" | "end";

/** [block edge, inline edge] of the host that each anchor point sits on. */
const ANCHORS = {
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

export type SparklePlacement = {
  /** Point on the host the group's center sits on. Default "top-end". */
  anchor?: SparkleAnchor;
  /** Nudge toward inline-end (right in English), in multiples of `size`. */
  offsetX?: number;
  /** Nudge toward block-end (down), in multiples of `size`. */
  offsetY?: number;
};

/** Must match the number of `@position-try --sparkle-try-N` rules below, plus one. */
const MAX_PLACEMENTS = 4;

/** Seed used for timing when explicit `sparkles` are given without a seed. */
const DEFAULT_TIMING_SEED = "sparkle-group";

/**
 * A decorative cluster of twinkling sparkles, placed with CSS anchor
 * positioning against its host: the nearest ancestor with
 * `class="sparkle-anchor"`.
 *
 * ```ts
 * <p class="sparkle-anchor">
 *   Hello
 *   <${SparkleGroup}
 *     seed="hello"
 *     placement=${[
 *       { anchor: "bottom-start", offsetX: -0.6 },
 *       { anchor: "bottom-start", offsetX: 1.2, offsetY: -0.4 },
 *     ]}
 *   />
 * </p>
 * ```
 *
 * Layout and twinkle timing are generated at build time from `seed`, so a
 * group looks the same on every build. Change the seed to re-roll it.
 *
 * Every length is a multiple of `size` (the largest sparkle's width), so the
 * whole arrangement scales together.
 *
 * Props:
 * - `seed` (required unless `sparkles` is given): string or number.
 * - `count`: number of sparkles (default 3).
 * - `spread`: "w h" or [w, h] (or one number for a square) area the sparkles
 *   scatter across, in multiples of `size` (default "3 2"). At least 1×1.
 * - `size`: any CSS length, e.g. "32px" or "clamp(20px, 8cqi, 42px)"
 *   (default 2rem).
 * - `placement`: one `{ anchor, offsetX, offsetY }` object, or an array of up
 *   to 4 tried in order. The browser uses the first one that keeps the group
 *   inside its boundary, and hides the group if none do.
 * - `sparkles`: hand-placed `[{ x, y, size }]` (centers from the top-start
 *   corner, all in multiples of `size`). Replaces generated positions;
 *   `spread` defaults to the bounding box. `seed` then only affects timing.
 * - `class`: extra classes for the group.
 *
 * Host and boundary:
 * - The host needs `class="sparkle-anchor"` and must NOT be positioned
 *   (`position: relative` etc.), or anchoring breaks.
 * - The boundary the group must stay inside is its nearest positioned
 *   ancestor. Add `class="sparkle-boundary"` to an ancestor to use that
 *   instead; any positioned element between the group and it wins.
 *
 * Parent CSS hooks. Size and offsets override the matching props (offsets
 * affect the first placement only), so set them on the group's `class`, e.g.
 * inside a media query. Set on an ancestor, they apply to every group inside.
 * - `--sparkle-group-size`, `--sparkle-group-offset-x`, `--sparkle-group-offset-y`.
 * - `--sparkle-group-opacity`.
 * - `--sparkle-group-tempo`: twinkle speed multiplier; 2 = twice as fast.
 *
 * The group ignores pointer events, is hidden from assistive tech, and isn't
 * shown at all in browsers without anchor positioning.
 */
export const SparkleGroup: YetiComponent<{
  seed?: Seed;
  count?: number | string;
  spread?: number | string | [number, number];
  size?: string;
  placement?: SparklePlacement | SparklePlacement[];
  sparkles?: SparklePosition[];
  class?: string;
}> = ({
  seed,
  count = 3,
  spread,
  size,
  placement = {},
  sparkles,
  class: className = "",
}) => {
  let positions: SparklePosition[];
  let box: [number, number];
  if (sparkles) {
    positions = sparkles;
    box = spread === undefined ? boundsOf(sparkles) : parseSpread(spread);
  } else {
    if (seed === undefined || seed === "") {
      throw new Error("SparkleGroup: `seed` is required unless explicit `sparkles` are given");
    }
    box = parseSpread(spread ?? "3 2");
    positions = generatePositions({ seed, count: parseNumber("count", count), spread: box });
  }
  const timings = generateTimings({ seed: seed ?? DEFAULT_TIMING_SEED, count: positions.length });

  const placements = Array.isArray(placement) ? placement : [placement];
  if (placements.length < 1 || placements.length > MAX_PLACEMENTS) {
    throw new Error(
      `SparkleGroup: placement takes 1–${MAX_PLACEMENTS} entries, got ${placements.length}`,
    );
  }

  const groupStyle = [
    size ? `--_size: ${size}` : "",
    `--_spread-x: ${box[0]}`,
    `--_spread-y: ${box[1]}`,
    ...placements.flatMap((p, i) => placementVars(p, i, box)),
    placements.length > 1
      ? `--_tries: ${placements.slice(1).map((_, i) => `--sparkle-try-${i + 1}`).join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("; ");

  return html`<span
    class=${`sparkle-group${className ? ` ${className}` : ""}`}
    aria-hidden="true"
    style=${groupStyle}
  >${positions.map(({ x, y, size: s }, i) => {
    const { delay, duration } = timings[i]!;
    return html`<${Sparkle}
      style=${`--_x: ${x}; --_y: ${y}; --_s: ${s}; --_delay: ${delay}; --_duration: ${duration}`}
    />`;
  })}</span>`;
};

/**
 * Turns one placement into the custom properties that the base rule
 * (index 0) or `@position-try --sparkle-try-N` reads.
 *
 * Each axis puts the group in the position-area cell beyond the anchor edge,
 * aligned against the anchor, then uses margins to center it on the edge and
 * apply the offset. Margins pulling back toward the anchor shrink the margin
 * box by exactly as much as the box crosses the edge, so the browser's "does
 * it fit?" check matches whether the visible box crosses the boundary.
 */
function placementVars(
  { anchor = "top-end", offsetX = 0, offsetY = 0 }: SparklePlacement,
  i: number,
  [spreadX, spreadY]: [number, number],
): string[] {
  const edges = ANCHORS[anchor];
  if (!edges) {
    throw new Error(
      `SparkleGroup: unknown anchor "${anchor}". Use one of: ${Object.keys(ANCHORS).join(", ")}`,
    );
  }
  const ox = parseNumber("offsetX", offsetX);
  const oy = parseNumber("offsetY", offsetY);
  // Only the first placement listens to the CSS override hooks.
  const x = i === 0 ? `var(--sparkle-group-offset-x, ${ox})` : `${ox}`;
  const y = i === 0 ? `var(--sparkle-group-offset-y, ${oy})` : `${oy}`;
  const block = axis("block", edges[0], y, spreadY);
  const inline = axis("inline", edges[1], x, spreadX);
  return [
    `--_area-${i}: ${block.area} ${inline.area}`,
    `--_align-${i}: ${block.self}`,
    `--_justify-${i}: ${inline.self}`,
    `--_mbs-${i}: ${block.marginStart}`,
    `--_mbe-${i}: ${block.marginEnd}`,
    `--_mis-${i}: ${inline.marginStart}`,
    `--_mie-${i}: ${inline.marginEnd}`,
  ];
}

function axis(name: "block" | "inline", edge: Edge, offset: string, extent: number) {
  const half = extent / 2;
  switch (edge) {
    // Cell past the end edge; box starts at the edge, pulled back by half its size.
    case "end":
      return {
        area: `${name}-end`,
        self: "normal",
        marginStart: `calc((${offset} - ${half}) * var(--_unit))`,
        marginEnd: "0px",
      };
    // Cell before the start edge; box ends at the edge, pushed forward by half its size.
    case "start":
      return {
        area: `${name}-start`,
        self: "normal",
        marginStart: "0px",
        marginEnd: `calc((-1 * ${offset} - ${half}) * var(--_unit))`,
      };
    // Whole row/column, centered on the anchor's middle, then shifted.
    case "center":
      return {
        area: "span-all",
        self: "anchor-center",
        marginStart: `calc(${offset} * var(--_unit))`,
        marginEnd: `calc(-1 * ${offset} * var(--_unit))`,
      };
  }
}

function parseNumber(name: string, value: number | string): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`SparkleGroup: ${name} must be a number, got "${value}"`);
  }
  return n;
}

function parseSpread(spread: number | string | [number, number]): [number, number] {
  const parts = Array.isArray(spread) ? spread : String(spread).trim().split(/\s+/);
  const [w, h = w] = parts.map((p) => parseNumber("spread", p));
  if (parts.length > 2 || w === undefined) {
    throw new Error(`SparkleGroup: spread must be "w h" or a single number, got "${spread}"`);
  }
  return [w, h];
}

const tryRule = (i: number) => `
@position-try --sparkle-try-${i} {
  position-area: var(--_area-${i});
  align-self: var(--_align-${i});
  justify-self: var(--_justify-${i});
  margin-block: var(--_mbs-${i}) var(--_mbe-${i});
  margin-inline: var(--_mis-${i}) var(--_mie-${i});
}`;

SparkleGroup.css = css`
${css.bundle("components")}
.sparkle-anchor {
  anchor-name: --sparkle-anchor;
  /* Each group only sees its own host, even though every host shares a name. */
  anchor-scope: --sparkle-anchor;
}

.sparkle-boundary {
  position: relative;
}

.sparkle-group {
  /* Props land in private --_* vars; the public --sparkle-group-* vars win
     when set, so parent CSS can change them at breakpoints. */
  --_unit: var(--sparkle-group-size, var(--_size, 2rem));

  position: absolute;
  position-anchor: --sparkle-anchor;
  position-area: var(--_area-0);
  align-self: var(--_align-0);
  justify-self: var(--_justify-0);
  margin-block: var(--_mbs-0) var(--_mbe-0);
  margin-inline: var(--_mis-0) var(--_mie-0);
  position-try-fallbacks: var(--_tries, none);
  /* If no placement fits, hide rather than cross the boundary. */
  position-visibility: no-overflow;

  display: block;
  inline-size: calc(var(--_spread-x) * var(--_unit));
  block-size: calc(var(--_spread-y) * var(--_unit));
  opacity: var(--sparkle-group-opacity, 1);
  pointer-events: none;

  .sparkle {
    position: absolute;
    inset-block-start: calc((var(--_y) - var(--_s) / 2) * var(--_unit));
    inset-inline-start: calc((var(--_x) - var(--_s) / 2) * var(--_unit));
    inline-size: calc(var(--_s) * var(--_unit));
    animation-duration: calc(var(--_duration) * 1s / var(--sparkle-group-tempo, 1));
    animation-delay: calc(var(--_delay) * 1s / var(--sparkle-group-tempo, 1));
  }
}
${[1, 2, 3].map(tryRule).join("\n")}

@supports not (anchor-name: --a) {
  .sparkle-group {
    display: none;
  }
}
`;
