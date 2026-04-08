import { JOINTS, MOTIONS } from "@/data/catalog";
import type { Joint, Motion, Source } from "@/data/schema";
import { buildSourceTrace, type SourceTrace } from "@/domain/traceability";

const JOINT_NAMING_SOURCE_IDS = ["fipat_ta2", "ifssh_nomenclature"];
const MOTION_NAMING_SOURCE_IDS = ["aaos_joint_motion_2e", "kapandji_upper_limb_6e"];
const NEUTRAL_AND_SIGN_SOURCE_IDS = ["aaos_joint_motion_2e", "kapandji_upper_limb_6e", "fipat_ta2"];

export type NamingRuleReadModel = {
  id: string;
  title: string;
  definition: string;
  example: string;
  sourceTrace: SourceTrace;
};

export type JointNamingRowReadModel = {
  joint: Joint;
  sourceTrace: SourceTrace;
};

export type MotionNamingRowReadModel = {
  motion: Motion;
  sourceTrace: SourceTrace;
};

export type NamingGuideReadModel = {
  rules: NamingRuleReadModel[];
  jointRows: JointNamingRowReadModel[];
  motionRows: MotionNamingRowReadModel[];
  sourceTrace: SourceTrace;
};

function toJointNamingRow(joint: Joint): JointNamingRowReadModel {
  return {
    joint,
    sourceTrace: buildSourceTrace(JOINT_NAMING_SOURCE_IDS)
  };
}

function toMotionNamingRow(motion: Motion): MotionNamingRowReadModel {
  return {
    motion,
    sourceTrace: buildSourceTrace(MOTION_NAMING_SOURCE_IDS)
  };
}

function uniqueSources(sources: Source[]): Source[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.id)) {
      return false;
    }
    seen.add(source.id);
    return true;
  });
}

export function getNamingGuideReadModel(): NamingGuideReadModel {
  const rules: NamingRuleReadModel[] = [
    {
      id: "joint_id_pattern",
      title: "Joint ID Pattern",
      definition: "Joint IDs follow <finger>_<joint> to keep ID semantics stable across UI, data and rendering.",
      example: "index_mcp, index_pip, thumb_cmc",
      sourceTrace: buildSourceTrace(JOINT_NAMING_SOURCE_IDS)
    },
    {
      id: "motion_id_pattern",
      title: "Motion ID Pattern",
      definition:
        "Motion IDs follow <joint>_<motionCode>. Motion code uses fe (flex/ext), aa (ab/adduction), ps (pro/supination).",
      example: "index_mcp_fe, index_mcp_aa, thumb_cmc_fe",
      sourceTrace: buildSourceTrace(MOTION_NAMING_SOURCE_IDS)
    },
    {
      id: "neutral_definition",
      title: "Neutral Position",
      definition:
        "Neutral is recorded as 0 deg. Positive/negative values are signed relative to this neutral reference.",
      example: "MCP FE: flexion positive, extension negative",
      sourceTrace: buildSourceTrace(NEUTRAL_AND_SIGN_SOURCE_IDS)
    },
    {
      id: "sign_convention",
      title: "Sign Convention",
      definition:
        "Sign direction follows the motion definition in the dataset: positiveDirection / negativeDirection per motion row.",
      example: "AA: abduction positive, adduction negative",
      sourceTrace: buildSourceTrace(NEUTRAL_AND_SIGN_SOURCE_IDS)
    }
  ];

  const jointRows = JOINTS.map(toJointNamingRow);
  const motionRows = MOTIONS.map(toMotionNamingRow);
  const sourceTrace = buildSourceTrace(
    uniqueSources([
      ...rules.flatMap((rule) => rule.sourceTrace.sources),
      ...jointRows.flatMap((row) => row.sourceTrace.sources),
      ...motionRows.flatMap((row) => row.sourceTrace.sources)
    ]).map((source) => source.id)
  );

  return {
    rules,
    jointRows,
    motionRows,
    sourceTrace
  };
}
