import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  boundsOf,
  generatePositions,
  generateTimings,
  MAX_DURATION,
  MIN_DURATION,
  MIN_SIZE,
} from "./sparkleLayout.ts";

const SEEDS = Array.from({ length: 200 }, (_, i) => i);

describe("generatePositions", () => {
  it("returns identical output for the same seed", () => {
    const a = generatePositions({ seed: "intro", count: 5, spread: [3, 2] });
    const b = generatePositions({ seed: "intro", count: 5, spread: [3, 2] });
    assert.deepEqual(a, b);
  });

  it("returns different output for different seeds", () => {
    const a = generatePositions({ seed: "intro", count: 3, spread: [3, 2] });
    const b = generatePositions({ seed: "outro", count: 3, spread: [3, 2] });
    assert.notDeepEqual(a, b);
  });

  it("treats string and number seeds as distinct but both stable", () => {
    const a = generatePositions({ seed: 7, count: 3, spread: [3, 2] });
    const b = generatePositions({ seed: 7, count: 3, spread: [3, 2] });
    assert.deepEqual(a, b);
  });

  it("respects count", () => {
    for (const count of [1, 2, 3, 6]) {
      const placements = generatePositions({ seed: "c", count, spread: [4, 3] });
      assert.equal(placements.length, count);
    }
  });

  it("has exactly one full-size sparkle, the rest between MIN_SIZE and full", () => {
    for (const seed of SEEDS) {
      const placements = generatePositions({ seed, count: 4, spread: [3, 3] });
      const full = placements.filter((p) => p.size === 1);
      assert.equal(full.length, 1, `seed ${seed}`);
      for (const p of placements) {
        assert.ok(p.size >= MIN_SIZE && p.size <= 1, `seed ${seed}: size ${p.size}`);
      }
    }
  });

  it("keeps every sparkle fully inside the spread box", () => {
    for (const seed of SEEDS) {
      const spread: [number, number] = [3, 2];
      for (const { x, y, size } of generatePositions({ seed, count: 3, spread })) {
        assert.ok(x - size / 2 >= -1e-9 && x + size / 2 <= spread[0] + 1e-9, `seed ${seed}: x ${x}`);
        assert.ok(y - size / 2 >= -1e-9 && y + size / 2 <= spread[1] + 1e-9, `seed ${seed}: y ${y}`);
      }
    }
  });

  it("never lets sparkles overlap when there is room", () => {
    for (const seed of SEEDS) {
      const placements = generatePositions({ seed, count: 3, spread: [3, 2] });
      for (let i = 0; i < placements.length; i++) {
        for (let j = i + 1; j < placements.length; j++) {
          const a = placements[i]!;
          const b = placements[j]!;
          const gap = Math.hypot(a.x - b.x, a.y - b.y) - (a.size + b.size) / 2;
          assert.ok(gap >= 0, `seed ${seed}: sparkles ${i} and ${j} overlap by ${-gap}`);
        }
      }
    }
  });

  it("rejects a spread too small to hold a full-size sparkle", () => {
    assert.throws(() => generatePositions({ seed: 1, count: 2, spread: [0.5, 2] }), /spread/);
  });

  it("rejects a non-positive or fractional count", () => {
    assert.throws(() => generatePositions({ seed: 1, count: 0, spread: [3, 2] }), /count/);
    assert.throws(() => generatePositions({ seed: 1, count: 2.5, spread: [3, 2] }), /count/);
  });
});

describe("generateTimings", () => {
  it("returns identical output for the same seed", () => {
    assert.deepEqual(generateTimings({ seed: "intro", count: 4 }), generateTimings({ seed: "intro", count: 4 }));
  });

  it("keeps durations within the fixed range", () => {
    for (const seed of SEEDS) {
      for (const { duration } of generateTimings({ seed, count: 5 })) {
        assert.ok(duration >= MIN_DURATION && duration <= MAX_DURATION, `seed ${seed}: ${duration}`);
      }
    }
  });

  it("spreads delays across one cycle so no two sparkles start together", () => {
    for (const seed of SEEDS) {
      const delays = generateTimings({ seed, count: 4 })
        .map((t) => t.delay)
        .sort((a, b) => a - b);
      for (const delay of delays) {
        assert.ok(delay <= 0 && delay > -MAX_DURATION, `seed ${seed}: delay ${delay}`);
      }
      for (let i = 1; i < delays.length; i++) {
        assert.ok(delays[i]! - delays[i - 1]! >= 0.1, `seed ${seed}: delays too close ${delays}`);
      }
    }
  });
});

describe("boundsOf", () => {
  it("returns the smallest box that contains every sparkle", () => {
    assert.deepEqual(
      boundsOf([
        { x: 0.5, y: 0.5, size: 1 },
        { x: 2, y: 1.25, size: 0.5 },
      ]),
      [2.25, 1.5],
    );
  });
});
