import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatTime } from "./formatTime.ts";

describe("formatTime", () => {
  it("formats 24-hour times for display", () => {
    assert.equal(formatTime("11:00"), "11AM");
    assert.equal(formatTime("12:00"), "12PM");
    assert.equal(formatTime("16:30"), "4:30PM");
    assert.equal(formatTime("00:15"), "12:15AM");
  });
});
