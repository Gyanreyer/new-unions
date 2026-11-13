import { css, html, type YetiComponent, type YetiElementNode } from "yeti-js";
import {
  ANCHORS,
  autoGroupDelay,
  boundsOf,
  durationFor,
  isAnchor,
  parseNumber,
  placementStyles,
  readSparkles,
  staggerFor,
  type SparkleAnchor,
} from "./sparkleGeometry.ts";

export type { SparkleAnchor };

/**
 * A decorative cluster of twinkling sparkles, placed with CSS anchor
 * positioning against its host: the nearest ancestor with
 * `class="sparkle-anchor"`.
 *
 * ```ts
 * <p class="sparkle-anchor">
 *   Hello
 *   <${SparkleGroup} anchor="bottom-start" size="2rem">
 *     <${Sparkle} x="-1.07" y="0.28" />
 *     <${Sparkle} x="-0.03" y="-0.18" scale="0.82" />
 *     <${Sparkle} x="-0.07" y="0.62" scale="0.73" />
 *   </${SparkleGroup}>
 * </p>
 * ```
 *
 * Each `<Sparkle>`'s `x`/`y` is its center, measured from the anchor point:
 * +x toward inline-end (right in English), +y toward block-end (down),
 * whatever the anchor. Every length is a multiple of `size` (a full-size
 * sparkle's width), so the whole arrangement scales together. See `Sparkle`
 * for its props.
 *
 * Props:
 * - `anchor` (required): the point on the host that coordinates are measured
 *   from. One of: top-start, top, top-end, start, center, end, bottom-start,
 *   bottom, bottom-end.
 * - `size`: any CSS length, e.g. "32px" or "clamp(20px, 8cqi, 42px)"
 *   (default 2rem).
 * - `delay`: seconds to shift the whole group's twinkle. By default each group
 *   gets a phase from a hash of its layout, so groups don't twinkle in sync;
 *   set this if two identical groups end up matching.
 * - `class`: extra classes for the group.
 *
 * Children must all be `<Sparkle>`s. Twinkle timing is staggered by order.
 *
 * Host and boundary:
 * - The host needs `class="sparkle-anchor"` and must NOT be positioned
 *   (`position: relative` etc.), or anchoring breaks.
 * - The group hides entirely when the box around its sparkles would cross its
 *   boundary: its nearest positioned ancestor. Add `class="sparkle-boundary"`
 *   to an ancestor to use that instead; any positioned element between the
 *   group and it wins.
 *
 * CSS hooks for the group. Set them on the group's `class` (e.g. in a media
 * query); set on an ancestor, they apply to every group inside.
 * - `--sparkle-group-size`: overrides `size`.
 * - `--sparkle-group-offset-x`, `--sparkle-group-offset-y`: nudge the whole
 *   cluster from where it's authored, in multiples of `size`.
 * - `--sparkle-group-opacity`.
 * - `--sparkle-group-tempo`: twinkle speed multiplier; 2 = twice as fast.
 * - `--sparkle-group-delay`: a time (e.g. `0.4s`) that replaces the group's
 *   phase.
 *
 * CSS hooks for one sparkle (target it with a `class` or `:nth-child`):
 * - `--sparkle-x`, `--sparkle-y`, `--sparkle-scale`: override its props. The
 *   group's box is measured at build time, so moving a sparkle past the
 *   authored bounds won't be counted when deciding whether the group fits.
 *
 * The group ignores pointer events, is hidden from assistive tech, and isn't
 * shown at all in browsers without anchor positioning.
 */
export const SparkleGroup: YetiComponent<{
  anchor: SparkleAnchor;
  size?: string;
  delay?: number | string;
  class?: string;
}> = ({ anchor, size, delay, class: className = "", children }) => {
  if (!isAnchor(anchor)) {
    throw new Error(
      `SparkleGroup: \`anchor\` must be one of: ${Object.keys(ANCHORS).join(", ")}; got "${anchor}"`,
    );
  }
  const sparkles = readSparkles(children);
  const points = sparkles.map((s) => s.point);
  const groupDelay = delay === undefined ? autoGroupDelay(anchor, points) : parseNumber("delay", delay);

  sparkles.forEach(({ node, point, delay, duration }, i) => {
    addStyle(node, [
      `--_x: ${point.x}`,
      `--_y: ${point.y}`,
      `--_s: ${point.scale}`,
      `--_stagger: ${delay ?? staggerFor(i)}`,
      `--_duration: ${duration ?? durationFor(i)}`,
    ]);
  });

  const groupStyle = [
    size ? `--_size: ${size}` : "",
    `--_group-delay: ${groupDelay}s`,
    ...placementStyles(anchor, boundsOf(points)),
  ]
    .filter(Boolean)
    .join("; ");

  return html`<span
    class=${`sparkle-group${className ? ` ${className}` : ""}`}
    aria-hidden="true"
    style=${groupStyle}
  >${children}</span>`;
};

function addStyle(node: YetiElementNode, declarations: string[]) {
  node.attributes ??= {};
  const existing = node.attributes.style;
  node.attributes.style = [...declarations, ...(typeof existing === "string" && existing ? [existing] : [])]
    .join("; ");
}

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
  /* Props land in private --_* vars; the public --sparkle-* vars win when
     set, so parent CSS can change them at breakpoints. Placement
     (position-area, margins) is inline, computed from the sparkles. */
  --_unit: var(--sparkle-group-size, var(--_size, 2rem));

  position: absolute;
  position-anchor: --sparkle-anchor;
  /* If the group doesn't fit, hide it rather than cross the boundary. */
  position-visibility: no-overflow;

  display: block;
  inline-size: calc(var(--_box-x) * var(--_unit));
  block-size: calc(var(--_box-y) * var(--_unit));
  opacity: var(--sparkle-group-opacity, 1);
  pointer-events: none;

  .sparkle {
    --_scale: var(--sparkle-scale, var(--_s));

    position: absolute;
    inset-inline-start: calc(
      (var(--sparkle-x, var(--_x)) - var(--_min-x) - var(--_scale) / 2) * var(--_unit)
    );
    inset-block-start: calc(
      (var(--sparkle-y, var(--_y)) - var(--_min-y) - var(--_scale) / 2) * var(--_unit)
    );
    inline-size: calc(var(--_scale) * var(--_unit));
    animation-duration: calc(var(--_duration) * 1s / var(--sparkle-group-tempo, 1));
    animation-delay: calc(
      (var(--_stagger) * 1s + var(--sparkle-group-delay, var(--_group-delay)))
        / var(--sparkle-group-tempo, 1)
    );
  }
}

@supports not (anchor-name: --a) {
  .sparkle-group {
    display: none;
  }
}
`;
