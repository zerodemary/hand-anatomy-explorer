import {
  FINGERS,
  JOINTS,
  MOTIONS,
  PROFILES,
  ROM_MEASUREMENTS,
  SEGMENTS,
  SEGMENT_MEASUREMENTS
} from "@/data/catalog";
import type { Joint, Motion, Profile, RomMeasurement, Segment, SegmentMeasurement } from "@/data/schema";
import { buildSourceTrace, buildSourceTraceFromRows, type SourceTrace } from "@/domain/traceability";
import { getMeasurementMeta, type MeasurementMeta } from "@/domain/measurement-meta";

export type JointRomReadRow = {
  measurementId: string;
  motion: Motion;
  minDeg: number;
  maxDeg: number;
  sourceTrace: SourceTrace;
  meta: MeasurementMeta;
};

export type SegmentLengthReadRow = {
  measurementId: string;
  segment: Segment;
  lengthMm: number;
  sourceTrace: SourceTrace;
  meta: MeasurementMeta;
};

export type JointExplorerDetailReadModel = {
  joint: Joint;
  romRows: JointRomReadRow[];
  fingerSegments: SegmentLengthReadRow[];
  sourceTrace: SourceTrace;
};

export type SegmentExplorerDetailReadModel = {
  segment: Segment;
  measurement: SegmentLengthReadRow | null;
  sourceTrace: SourceTrace;
};

export type LengthComparisonRowReadModel = {
  segment: Segment;
  active: SegmentLengthReadRow | null;
  compare: SegmentLengthReadRow | null;
  deltaMm: number | null;
  deltaPct: number | null;
};

export type LengthComparisonSummaryReadModel = {
  activeProfileId: string;
  compareProfileId: string;
  segmentCount: number;
  comparableCount: number;
  activeDerivedCount: number;
  compareDerivedCount: number;
};

function toJointRomReadRow(measurement: RomMeasurement, motion: Motion): JointRomReadRow {
  return {
    measurementId: measurement.id,
    motion,
    minDeg: measurement.minDeg,
    maxDeg: measurement.maxDeg,
    sourceTrace: buildSourceTrace(measurement.sourceIds),
    meta: getMeasurementMeta(measurement)
  };
}

function toSegmentLengthReadRow(measurement: SegmentMeasurement, segment: Segment): SegmentLengthReadRow {
  return {
    measurementId: measurement.id,
    segment,
    lengthMm: measurement.lengthMm,
    sourceTrace: buildSourceTrace(measurement.sourceIds),
    meta: getMeasurementMeta(measurement)
  };
}

export function getProfileById(profileId: string): Profile | undefined {
  return PROFILES.find((profile) => profile.id === profileId);
}

export function getProfileScaleById(profileId: string): number {
  return getProfileById(profileId)?.scale ?? 1;
}

export function getJointById(jointId: string): Joint | undefined {
  return JOINTS.find((joint) => joint.id === jointId);
}

export function getDefaultJointId(): string {
  return JOINTS[0]?.id ?? "thumb_cmc";
}

export function listExplorerJointOptions(): Array<{ id: string; label: string; fingerId: string }> {
  return JOINTS.map((joint) => ({
    id: joint.id,
    label: `${joint.id.replace("_", " · ")} (${joint.shortLabel})`,
    fingerId: joint.fingerId
  }));
}

export function getFingerSegmentLengths(profileId: string, fingerId: string): SegmentLengthReadRow[] {
  const segments = SEGMENTS.filter((segment) => segment.fingerId === fingerId).sort(
    (a, b) => a.order - b.order
  );

  return segments
    .map((segment) => {
      const measurement = SEGMENT_MEASUREMENTS.find(
        (item) => item.profileId === profileId && item.segmentId === segment.id
      );
      return measurement ? toSegmentLengthReadRow(measurement, segment) : null;
    })
    .filter((row): row is SegmentLengthReadRow => row !== null);
}

export function getJointExplorerDetail(profileId: string, jointId: string): JointExplorerDetailReadModel | null {
  const joint = getJointById(jointId);

  if (!joint) {
    return null;
  }

  const motions = MOTIONS.filter((motion) => motion.jointId === joint.id);
  const romRows = motions
    .map((motion) => {
      const measurement = ROM_MEASUREMENTS.find(
        (item) => item.profileId === profileId && item.motionId === motion.id
      );
      return measurement ? toJointRomReadRow(measurement, motion) : null;
    })
    .filter((row): row is JointRomReadRow => row !== null);

  const fingerSegments = getFingerSegmentLengths(profileId, joint.fingerId);
  const sourceTrace = buildSourceTraceFromRows([
    ...romRows.map((row) => ({ sourceIds: row.sourceTrace.sourceIds })),
    ...fingerSegments.map((row) => ({ sourceIds: row.sourceTrace.sourceIds }))
  ]);

  return {
    joint,
    romRows,
    fingerSegments,
    sourceTrace
  };
}

export function getSegmentExplorerDetail(
  profileId: string,
  segmentId: string
): SegmentExplorerDetailReadModel | null {
  const segment = SEGMENTS.find((item) => item.id === segmentId);

  if (!segment) {
    return null;
  }

  const measurement = SEGMENT_MEASUREMENTS.find(
    (item) => item.profileId === profileId && item.segmentId === segment.id
  );

  const readMeasurement = measurement ? toSegmentLengthReadRow(measurement, segment) : null;

  return {
    segment,
    measurement: readMeasurement,
    sourceTrace: readMeasurement
      ? buildSourceTrace(readMeasurement.sourceTrace.sourceIds)
      : { sourceIds: [], sources: [] }
  };
}

function getSegmentMeasurementByProfile(
  profileId: string,
  segmentId: string
): SegmentMeasurement | undefined {
  return SEGMENT_MEASUREMENTS.find(
    (item) => item.profileId === profileId && item.segmentId === segmentId
  );
}

function getLengthDelta(activeLength: number, compareLength: number) {
  const deltaMm = activeLength - compareLength;
  const deltaPct = compareLength === 0 ? null : (deltaMm / compareLength) * 100;
  return { deltaMm, deltaPct };
}

export function getDefaultComparisonProfileId(activeProfileId: string): string {
  return PROFILES.find((profile) => profile.id !== activeProfileId)?.id ?? activeProfileId;
}

export function listComparisonProfiles(activeProfileId: string): Profile[] {
  const otherProfiles = PROFILES.filter((profile) => profile.id !== activeProfileId);
  return otherProfiles.length > 0 ? otherProfiles : PROFILES;
}

export function getLengthComparisonRows(
  activeProfileId: string,
  compareProfileId = getDefaultComparisonProfileId(activeProfileId)
): LengthComparisonRowReadModel[] {
  return SEGMENTS.map((segment) => {
    const active = getSegmentMeasurementByProfile(activeProfileId, segment.id);
    const compare = getSegmentMeasurementByProfile(compareProfileId, segment.id);

    const activeRead = active ? toSegmentLengthReadRow(active, segment) : null;
    const compareRead = compare ? toSegmentLengthReadRow(compare, segment) : null;
    const delta =
      activeRead && compareRead ? getLengthDelta(activeRead.lengthMm, compareRead.lengthMm) : null;

    return {
      segment,
      active: activeRead,
      compare: compareRead,
      deltaMm: delta?.deltaMm ?? null,
      deltaPct: delta?.deltaPct ?? null
    };
  });
}

export function getLengthComparisonSummary(
  activeProfileId: string,
  compareProfileId = getDefaultComparisonProfileId(activeProfileId)
): LengthComparisonSummaryReadModel {
  const rows = getLengthComparisonRows(activeProfileId, compareProfileId);
  const comparableRows = rows.filter((row) => row.active !== null && row.compare !== null);

  return {
    activeProfileId,
    compareProfileId,
    segmentCount: rows.length,
    comparableCount: comparableRows.length,
    activeDerivedCount: rows.filter((row) => row.active?.meta.isDerived).length,
    compareDerivedCount: rows.filter((row) => row.compare?.meta.isDerived).length
  };
}

export function listFingerIdsInOrder(): string[] {
  return [...FINGERS]
    .sort((a, b) => a.order - b.order)
    .map((finger) => finger.id);
}
