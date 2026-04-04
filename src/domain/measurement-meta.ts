import type { RomMeasurement, SegmentMeasurement } from "@/data/schema";

export type MeasurementLike = RomMeasurement | SegmentMeasurement;

export type MeasurementMeta = {
  isDerived: boolean;
  evidenceLevel?: "high" | "medium" | "low" | "derived";
  measurementType?: "active" | "passive" | "reference";
  notes: string[];
};

export function getMeasurementMeta(measurement: MeasurementLike): MeasurementMeta {
  const notes = measurement.notes ?? [];
  const evidenceLevel = measurement.evidenceLevel;
  const isDerived =
    evidenceLevel === "derived" ||
    notes.some((note) => note.toLowerCase().includes("derived"));

  return {
    isDerived,
    evidenceLevel,
    measurementType: "measurementType" in measurement ? measurement.measurementType : undefined,
    notes
  };
}
