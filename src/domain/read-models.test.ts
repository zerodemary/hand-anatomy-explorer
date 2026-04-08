import { describe, expect, it } from "vitest";
import {
  getDefaultComparisonProfileId,
  getDefaultJointId,
  getJointExplorerDetail,
  getLengthComparisonRows,
  getLengthComparisonSummary,
  getSegmentExplorerDetail
} from "@/domain/read-models";

describe("domain read models", () => {
  it("provides profile-aware joint detail with source trace", () => {
    const detail = getJointExplorerDetail("western_male_50", "index_mcp");

    expect(detail).not.toBeNull();
    expect(detail?.joint.id).toBe("index_mcp");
    expect(detail?.romRows.length).toBeGreaterThan(0);
    expect(detail?.sourceTrace.sourceIds.length).toBeGreaterThan(0);
  });

  it("marks derived segment measurement metadata for asian profile", () => {
    const detail = getSegmentExplorerDetail("asian_male_50", "index_mc");

    expect(detail).not.toBeNull();
    expect(detail?.measurement).not.toBeNull();
    expect(detail?.measurement?.meta.isDerived).toBe(true);
  });

  it("builds comparison rows with active vs compare profile and delta values", () => {
    const rows = getLengthComparisonRows("asian_male_50", "western_male_50");
    const row = rows.find((item) => item.segment.id === "thumb_mc");

    expect(rows.length).toBeGreaterThan(0);
    expect(row?.active?.lengthMm).toBe(45.8);
    expect(row?.compare?.lengthMm).toBe(49);
    expect(row?.active?.meta.isDerived).toBe(true);
    expect(row?.compare?.meta.isDerived).toBe(false);
    expect(row?.deltaMm).toBeCloseTo(-3.2, 5);
    expect(row?.deltaPct).toBeCloseTo(-6.5306, 3);
  });

  it("returns comparison summary with derived counts", () => {
    const summary = getLengthComparisonSummary("asian_male_50", "western_male_50");

    expect(summary.segmentCount).toBeGreaterThan(0);
    expect(summary.comparableCount).toBe(summary.segmentCount);
    expect(summary.activeDerivedCount).toBe(summary.segmentCount);
    expect(summary.compareDerivedCount).toBe(0);
  });

  it("returns a stable default comparison profile", () => {
    expect(getDefaultComparisonProfileId("asian_male_50")).toBe("western_male_50");
  });

  it("returns stable default joint", () => {
    expect(getDefaultJointId()).toBeTruthy();
  });
});
