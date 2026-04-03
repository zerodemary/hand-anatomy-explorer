import { describe, expect, it } from "vitest";
import {
  CATALOG,
  FINGERS,
  JOINTS,
  MOTIONS,
  PROFILES,
  ROM_MEASUREMENTS,
  SEGMENTS,
  SEGMENT_MEASUREMENTS,
  SOURCES
} from "@/data/catalog";

describe("catalog integrity", () => {
  it("loads full dataset", () => {
    expect(CATALOG.sources.length).toBeGreaterThan(0);
    expect(CATALOG.profiles.length).toBeGreaterThanOrEqual(2);
  });

  it("uses unique IDs across each entity", () => {
    const collections = [
      SOURCES,
      PROFILES,
      FINGERS,
      JOINTS,
      MOTIONS,
      SEGMENTS,
      ROM_MEASUREMENTS,
      SEGMENT_MEASUREMENTS
    ];

    collections.forEach((rows) => {
      const ids = rows.map((row) => row.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  it("keeps references valid", () => {
    const profileIds = new Set(PROFILES.map((x) => x.id));
    const jointIds = new Set(JOINTS.map((x) => x.id));
    const motionIds = new Set(MOTIONS.map((x) => x.id));
    const segmentIds = new Set(SEGMENTS.map((x) => x.id));
    const sourceIds = new Set(SOURCES.map((x) => x.id));

    MOTIONS.forEach((motion) => expect(jointIds.has(motion.jointId)).toBe(true));
    ROM_MEASUREMENTS.forEach((row) => {
      expect(profileIds.has(row.profileId)).toBe(true);
      expect(motionIds.has(row.motionId)).toBe(true);
      row.sourceIds.forEach((sourceId) => expect(sourceIds.has(sourceId)).toBe(true));
    });
    SEGMENT_MEASUREMENTS.forEach((row) => {
      expect(profileIds.has(row.profileId)).toBe(true);
      expect(segmentIds.has(row.segmentId)).toBe(true);
      row.sourceIds.forEach((sourceId) => expect(sourceIds.has(sourceId)).toBe(true));
    });
  });
});
