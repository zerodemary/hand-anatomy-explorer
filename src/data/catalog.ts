import sourcesJson from "@/data/raw/sources.json";
import profilesJson from "@/data/raw/profiles.json";
import fingersJson from "@/data/raw/fingers.json";
import jointsJson from "@/data/raw/joints.json";
import motionsJson from "@/data/raw/motions.json";
import segmentsJson from "@/data/raw/segments.json";
import romMeasurementsJson from "@/data/raw/rom-measurements.json";
import segmentMeasurementsJson from "@/data/raw/segment-measurements.json";
import { DatasetSchema, type Dataset } from "@/data/schema";

function assertUniqueIds(items: Array<{ id: string }>, label: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Duplicate id in ${label}: ${item.id}`);
    }
    seen.add(item.id);
  }
}

function assertReferences(dataset: Dataset) {
  const profileIds = new Set(dataset.profiles.map((p) => p.id));
  const sourceIds = new Set(dataset.sources.map((s) => s.id));
  const fingerIds = new Set(dataset.fingers.map((f) => f.id));
  const jointIds = new Set(dataset.joints.map((j) => j.id));
  const motionIds = new Set(dataset.motions.map((m) => m.id));
  const segmentIds = new Set(dataset.segments.map((s) => s.id));

  dataset.profiles.forEach((profile) => {
    if (profile.basedOn && !profileIds.has(profile.basedOn)) {
      throw new Error(`Profile basedOn missing: ${profile.id} -> ${profile.basedOn}`);
    }
  });

  dataset.joints.forEach((joint) => {
    if (!fingerIds.has(joint.fingerId)) {
      throw new Error(`Joint fingerId missing: ${joint.id} -> ${joint.fingerId}`);
    }
  });

  dataset.motions.forEach((motion) => {
    if (!jointIds.has(motion.jointId)) {
      throw new Error(`Motion jointId missing: ${motion.id} -> ${motion.jointId}`);
    }
  });

  dataset.segments.forEach((segment) => {
    if (!fingerIds.has(segment.fingerId)) {
      throw new Error(`Segment fingerId missing: ${segment.id} -> ${segment.fingerId}`);
    }
  });

  dataset.romMeasurements.forEach((measurement) => {
    if (!profileIds.has(measurement.profileId)) {
      throw new Error(`ROM profileId missing: ${measurement.id} -> ${measurement.profileId}`);
    }
    if (!motionIds.has(measurement.motionId)) {
      throw new Error(`ROM motionId missing: ${measurement.id} -> ${measurement.motionId}`);
    }
    measurement.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`ROM sourceId missing: ${measurement.id} -> ${sourceId}`);
      }
    });
  });

  dataset.segmentMeasurements.forEach((measurement) => {
    if (!profileIds.has(measurement.profileId)) {
      throw new Error(`Segment profileId missing: ${measurement.id} -> ${measurement.profileId}`);
    }
    if (!segmentIds.has(measurement.segmentId)) {
      throw new Error(`Segment measurement segmentId missing: ${measurement.id} -> ${measurement.segmentId}`);
    }
    measurement.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        throw new Error(`Segment sourceId missing: ${measurement.id} -> ${sourceId}`);
      }
    });
  });
}

const parsed = DatasetSchema.parse({
  sources: sourcesJson,
  profiles: profilesJson,
  fingers: fingersJson,
  joints: jointsJson,
  motions: motionsJson,
  segments: segmentsJson,
  romMeasurements: romMeasurementsJson,
  segmentMeasurements: segmentMeasurementsJson
});

assertUniqueIds(parsed.sources, "sources");
assertUniqueIds(parsed.profiles, "profiles");
assertUniqueIds(parsed.fingers, "fingers");
assertUniqueIds(parsed.joints, "joints");
assertUniqueIds(parsed.motions, "motions");
assertUniqueIds(parsed.segments, "segments");
assertUniqueIds(parsed.romMeasurements, "romMeasurements");
assertUniqueIds(parsed.segmentMeasurements, "segmentMeasurements");
assertReferences(parsed);

export const CATALOG: Dataset = Object.freeze(parsed);

export const SOURCES = CATALOG.sources;
export const PROFILES = CATALOG.profiles;
export const FINGERS = CATALOG.fingers;
export const JOINTS = CATALOG.joints;
export const MOTIONS = CATALOG.motions;
export const SEGMENTS = CATALOG.segments;
export const ROM_MEASUREMENTS = CATALOG.romMeasurements;
export const SEGMENT_MEASUREMENTS = CATALOG.segmentMeasurements;
