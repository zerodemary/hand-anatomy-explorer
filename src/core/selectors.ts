import {
  JOINTS,
  MOTIONS,
  ROM_MEASUREMENTS,
  SEGMENT_MEASUREMENTS,
  SEGMENTS,
  SOURCES
} from "@/data/catalog";
import type { Joint, Motion, Profile, RomMeasurement, SegmentMeasurement, Source } from "@/data/schema";

export function getJointById(jointId: string): Joint | undefined {
  return JOINTS.find((joint) => joint.id === jointId);
}

export function getMotionsByJointId(jointId: string): Motion[] {
  return MOTIONS.filter((motion) => motion.jointId === jointId);
}

export function getRomByProfileAndJoint(profileId: string, jointId: string): Array<RomMeasurement & { motion: Motion }> {
  const motions = getMotionsByJointId(jointId);
  return motions
    .map((motion) => {
      const measurement = ROM_MEASUREMENTS.find(
        (item) => item.profileId === profileId && item.motionId === motion.id
      );
      if (!measurement) {
        return null;
      }
      return { ...measurement, motion };
    })
    .filter((item): item is RomMeasurement & { motion: Motion } => item !== null);
}

export function getSegmentMeasurementsByFinger(
  profileId: string,
  fingerId: string
): Array<SegmentMeasurement & { segmentLabel: string }> {
  const segments = SEGMENTS.filter((segment) => segment.fingerId === fingerId).sort(
    (a, b) => a.order - b.order
  );
  return segments
    .map((segment) => {
      const measurement = SEGMENT_MEASUREMENTS.find(
        (item) => item.profileId === profileId && item.segmentId === segment.id
      );
      if (!measurement) {
        return null;
      }
      return { ...measurement, segmentLabel: segment.label };
    })
    .filter((item): item is SegmentMeasurement & { segmentLabel: string } => item !== null);
}

export function getProfileComparison(segmentId: string): {
  western?: SegmentMeasurement;
  asian?: SegmentMeasurement;
} {
  return {
    western: SEGMENT_MEASUREMENTS.find(
      (item) => item.profileId === "western_male_50" && item.segmentId === segmentId
    ),
    asian: SEGMENT_MEASUREMENTS.find(
      (item) => item.profileId === "asian_male_50" && item.segmentId === segmentId
    )
  };
}

export function getSourcesByIds(ids: string[]): Source[] {
  const idSet = new Set(ids);
  return SOURCES.filter((source) => idSet.has(source.id));
}

export function getDefaultJointId(): string {
  return JOINTS[0]?.id ?? "thumb_cmc";
}

export function getJointListForExplorer() {
  return JOINTS.map((joint) => ({
    id: joint.id,
    label: `${joint.id.replace("_", " · ")} (${joint.shortLabel})`,
    fingerId: joint.fingerId
  }));
}

export function isDerivedMeasurement(item: { evidenceLevel?: string; notes?: string[] }): boolean {
  return item.evidenceLevel === "derived" || Boolean(item.notes?.some((note) => note.includes("Derived")));
}

export function getProfileScale(profile: Profile): number {
  return profile.scale ?? 1;
}
