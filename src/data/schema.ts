import { z } from "zod";

export const SourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url().optional(),
  publisher: z.string().optional(),
  year: z.number().int().optional(),
  version: z.string().optional(),
  note: z.string().optional()
});

export const ProfileSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  basedOn: z.string().optional(),
  scaleModel: z.enum(["uniform", "per-segment", "direct"]).optional(),
  scale: z.number().positive().optional(),
  note: z.string().optional()
});

export const FingerSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  order: z.number().int().nonnegative()
});

export const JointSchema = z.object({
  id: z.string().min(1),
  fingerId: z.string().min(1),
  shortLabel: z.string().min(1),
  fullLabel: z.string().min(1),
  jointType: z.string().min(1),
  dof: z.number().int().nonnegative()
});

export const MotionSchema = z.object({
  id: z.string().min(1),
  jointId: z.string().min(1),
  code: z.enum(["fe", "aa", "ps"]),
  label: z.string().min(1),
  positiveDirection: z.string().min(1),
  negativeDirection: z.string().min(1),
  neutralDefinition: z.string().optional()
});

export const SegmentSchema = z.object({
  id: z.string().min(1),
  fingerId: z.string().min(1),
  label: z.string().min(1),
  order: z.number().int().nonnegative()
});

export const RomMeasurementSchema = z.object({
  id: z.string().min(1),
  profileId: z.string().min(1),
  motionId: z.string().min(1),
  minDeg: z.number(),
  maxDeg: z.number(),
  sourceIds: z.array(z.string().min(1)).min(1),
  measurementType: z.enum(["active", "passive", "reference"]).optional(),
  evidenceLevel: z.enum(["high", "medium", "low", "derived"]).optional(),
  notes: z.array(z.string()).optional()
});

export const SegmentMeasurementSchema = z.object({
  id: z.string().min(1),
  profileId: z.string().min(1),
  segmentId: z.string().min(1),
  lengthMm: z.number().positive(),
  sourceIds: z.array(z.string().min(1)).min(1),
  evidenceLevel: z.enum(["high", "medium", "low", "derived"]).optional(),
  notes: z.array(z.string()).optional()
});

export const DatasetSchema = z.object({
  sources: z.array(SourceSchema),
  profiles: z.array(ProfileSchema),
  fingers: z.array(FingerSchema),
  joints: z.array(JointSchema),
  motions: z.array(MotionSchema),
  segments: z.array(SegmentSchema),
  romMeasurements: z.array(RomMeasurementSchema),
  segmentMeasurements: z.array(SegmentMeasurementSchema)
});

export type Source = z.infer<typeof SourceSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Finger = z.infer<typeof FingerSchema>;
export type Joint = z.infer<typeof JointSchema>;
export type Motion = z.infer<typeof MotionSchema>;
export type Segment = z.infer<typeof SegmentSchema>;
export type RomMeasurement = z.infer<typeof RomMeasurementSchema>;
export type SegmentMeasurement = z.infer<typeof SegmentMeasurementSchema>;
export type Dataset = z.infer<typeof DatasetSchema>;
