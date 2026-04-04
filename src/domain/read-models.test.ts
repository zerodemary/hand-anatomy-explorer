import { describe, expect, it } from "vitest";
import {
  getDefaultJointId,
  getJointExplorerDetail,
  getLengthComparisonRows,
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

  it("builds comparison rows with active profile selection", () => {
    const rows = getLengthComparisonRows("asian_male_50");
    const row = rows.find((item) => item.segment.id === "thumb_mc");

    expect(rows.length).toBeGreaterThan(0);
    expect(row?.western?.lengthMm).toBe(49);
    expect(row?.asian?.lengthMm).toBe(45.8);
    expect(row?.current?.meta.isDerived).toBe(true);
  });

  it("returns stable default joint", () => {
    expect(getDefaultJointId()).toBeTruthy();
  });
});
