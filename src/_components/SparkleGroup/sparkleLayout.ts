/**
 * Deterministic layout + timing for SparkleGroup.
 *
 * All lengths are in multiples of the group's `size` (the size of its largest
 * sparkle). `x`/`y` are a sparkle's center, measured from the top-start corner
 * of the group's box.
 */

export type Seed = string | number;

export type SparklePosition = { x: number; y: number; size: number };
export type SparkleTiming = { delay: number; duration: number };

/** Smallest sparkle, relative to the full-size one. */
export const MIN_SIZE = 0.45;
/** Non-hero sparkles stay below this so the full-size one reads as the focal point. */
const MAX_SECONDARY_SIZE = 0.85;

/** Seconds; matches the range that looked good when tuned by hand. */
export const MIN_DURATION = 2.4;
export const MAX_DURATION = 2.8;
const CYCLE = (MIN_DURATION + MAX_DURATION) / 2;

/** Gap between sparkle edges that's "good enough" to accept a candidate. */
const TARGET_GAP = 0.2;
const CANDIDATES_PER_SPARKLE = 100;
const MAX_ATTEMPTS = 20;

/** FNV-1a hash → 32-bit int. Type-prefixed so `7` and `"7"` differ. */
function hashSeed(seed: Seed, stream: string): number {
  const input = `${typeof seed}:${seed}|${stream}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32: tiny seeded PRNG returning floats in [0, 1). */
function createRandom(seed: Seed, stream: string): () => number {
  let state = hashSeed(seed, stream);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(n * factor) / factor;
};

function assertCount(count: number) {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(`SparkleGroup: count must be a positive integer, got ${count}`);
  }
}

/**
 * Scatter `count` sparkles inside a `spread` box ([width, height]).
 *
 * The first sparkle is full size; the rest are smaller. Positions use
 * best-candidate sampling: each sparkle tries several random spots and takes
 * the first one that clears TARGET_GAP from the others, or else the roomiest
 * one it found. That avoids clumping without shoving everything into corners.
 */
export function generatePositions({
  seed,
  count,
  spread: [width, height],
}: {
  seed: Seed;
  count: number;
  spread: [number, number];
}): SparklePosition[] {
  assertCount(count);
  if (!(width >= 1 && height >= 1)) {
    throw new Error(
      `SparkleGroup: spread must be at least 1×1 to fit a full-size sparkle, got ${width}×${height}`,
    );
  }

  // Placing sparkles one at a time can occasionally paint the last one into a
  // corner. When that happens, re-roll the whole layout from a derived stream
  // (still deterministic) and keep the roomiest attempt.
  let best: SparklePosition[] = [];
  let bestGap = -Infinity;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const { placements, gap } = placeSparkles(
      createRandom(seed, `placement#${attempt}`),
      count,
      width,
      height,
    );
    if (gap > bestGap) {
      best = placements;
      bestGap = gap;
    }
    if (gap >= 0) break;
  }
  return best;
}

function placeSparkles(
  random: () => number,
  count: number,
  width: number,
  height: number,
): { placements: SparklePosition[]; gap: number } {
  const placements: SparklePosition[] = [];
  let layoutGap = Infinity;

  for (let i = 0; i < count; i++) {
    const size = i === 0 ? 1 : round(MIN_SIZE + random() * (MAX_SECONDARY_SIZE - MIN_SIZE), 2);
    // Valid center range, rounded inward so rounding can't push a sparkle out of the box.
    const minX = Math.ceil((size / 2) * 1000) / 1000;
    const maxX = Math.floor((width - size / 2) * 1000) / 1000;
    const minY = Math.ceil((size / 2) * 1000) / 1000;
    const maxY = Math.floor((height - size / 2) * 1000) / 1000;

    let best: SparklePosition | null = null;
    let bestGap = -Infinity;
    for (let c = 0; c < CANDIDATES_PER_SPARKLE; c++) {
      const candidate = {
        x: round(minX + random() * (maxX - minX), 3),
        y: round(minY + random() * (maxY - minY), 3),
        size,
      };
      const gap = smallestGap(candidate, placements);
      if (gap > bestGap) {
        best = candidate;
        bestGap = gap;
      }
      if (gap >= TARGET_GAP) break;
    }
    placements.push(best!);
    layoutGap = Math.min(layoutGap, bestGap);
  }

  return { placements, gap: layoutGap };
}

/** Distance between `p`'s edge and the nearest other sparkle's edge. */
function smallestGap(p: SparklePosition, others: SparklePosition[]): number {
  let smallest = Infinity;
  for (const o of others) {
    smallest = Math.min(smallest, Math.hypot(p.x - o.x, p.y - o.y) - (p.size + o.size) / 2);
  }
  return smallest;
}

/**
 * Per-sparkle twinkle timing. Delays are negative (so every sparkle is already
 * mid-twinkle on page load) and land in shuffled, evenly spaced slots across
 * one cycle, so no two sparkles peak together.
 */
export function generateTimings({ seed, count }: { seed: Seed; count: number }): SparkleTiming[] {
  assertCount(count);
  const random = createRandom(seed, "timing");

  const slots = Array.from({ length: count }, (_, i) => i);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [slots[i], slots[j]] = [slots[j]!, slots[i]!];
  }

  return slots.map((slot) => ({
    // Jitter stays within the middle 60% of each slot, keeping neighbors apart.
    delay: round(-((slot + 0.2 + random() * 0.6) / count) * CYCLE, 2),
    duration: round(MIN_DURATION + random() * (MAX_DURATION - MIN_DURATION), 2),
  }));
}

/** Smallest [width, height] box (from the origin) that contains every sparkle. */
export function boundsOf(placements: SparklePosition[]): [number, number] {
  let width = 0;
  let height = 0;
  for (const { x, y, size } of placements) {
    width = Math.max(width, x + size / 2);
    height = Math.max(height, y + size / 2);
  }
  return [round(width, 3), round(height, 3)];
}
