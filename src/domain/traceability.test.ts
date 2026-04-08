import { describe, expect, it } from "vitest";
import { buildSourceTrace, buildSourceTraceFromRows } from "@/domain/traceability";

describe("traceability helpers", () => {
  it("deduplicates source IDs while preserving order", () => {
    const trace = buildSourceTrace(["a", "b", "a", "c", "b"]);
    expect(trace.sourceIds).toEqual(["a", "b", "c"]);
  });

  it("aggregates source IDs from row collections", () => {
    const trace = buildSourceTraceFromRows([
      { sourceIds: ["aaos_joint_motion_2e", "kuo_2009_scale"] },
      { sourceIds: ["kuo_2009_scale", "buryanov_kotiuk_2010"] }
    ]);

    expect(trace.sourceIds).toEqual([
      "aaos_joint_motion_2e",
      "kuo_2009_scale",
      "buryanov_kotiuk_2010"
    ]);
  });
});
