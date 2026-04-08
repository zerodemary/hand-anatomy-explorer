import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { FINGERS } from "@/data/catalog";
import type { Profile } from "@/data/schema";
import { getFingerSegmentLengths, getProfileScaleById } from "@/domain/read-models";
import type { HandModelAdapterProps, SelectableId } from "@/core/hand-model-adapter";

const JOINT_CHAINS: Record<string, string[]> = {
  thumb: ["thumb_mcp", "thumb_ip"],
  index: ["index_mcp", "index_pip", "index_dip"],
  middle: ["middle_mcp", "middle_pip", "middle_dip"],
  ring: ["ring_mcp", "ring_pip", "ring_dip"],
  little: ["little_mcp", "little_pip", "little_dip"]
};

const FINGER_COLORS: Record<string, string> = {
  thumb: "#f59e0b",
  index: "#22d3ee",
  middle: "#34d399",
  ring: "#f87171",
  little: "#f472b6"
};

const FINGER_OFFSETS = {
  thumb: [-3.2, 0, 0.8],
  index: [-1.4, 0, 0],
  middle: [0, 0, 0],
  ring: [1.4, 0, 0],
  little: [2.8, 0, 0]
} as const;

function mmToUnits(mm: number): number {
  return mm * 0.018;
}

function isActive(selection: SelectableId | undefined, target: SelectableId): boolean {
  return selection?.type === target.type && selection?.id === target.id;
}

type HandGeometryProps = {
  profile: Profile;
  selected?: SelectableId;
  hovered?: SelectableId;
  onSelect: (selection: SelectableId) => void;
  onHover: (selection: SelectableId | undefined) => void;
};

function HandGeometry({ profile, selected, hovered, onSelect, onHover }: HandGeometryProps) {
  const grouped = useMemo(() => {
    return FINGERS.map((finger) => {
      const segments = getFingerSegmentLengths(profile.id, finger.id);
      return { finger, segments };
    });
  }, [profile.id]);

  return (
    <group rotation={[-0.35, -0.15, 0]} position={[0, -0.2, 0]}>
      <mesh position={[0, 0.4, -0.4]}>
        <boxGeometry args={[7.2, 1.2, 2.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.6} />
      </mesh>

      {grouped.map(({ finger, segments }) => {
        const offset = FINGER_OFFSETS[finger.id as keyof typeof FINGER_OFFSETS] ?? [0, 0, 0];
        const color = FINGER_COLORS[finger.id] ?? "#e2e8f0";
        const jointIds = JOINT_CHAINS[finger.id] ?? [];

        let currentY = 1.0;

        return (
          <group key={finger.id} position={offset as [number, number, number]}>
            {finger.id === "thumb" && (
              <mesh
                position={[0, currentY, 0]}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHover({ type: "joint", id: "thumb_cmc" });
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  onHover(undefined);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect({ type: "joint", id: "thumb_cmc" });
                }}
              >
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial
                  color={
                    isActive(selected, { type: "joint", id: "thumb_cmc" })
                      ? "#ffffff"
                      : isActive(hovered, { type: "joint", id: "thumb_cmc" })
                        ? "#d1fae5"
                        : color
                  }
                  emissive={color}
                  emissiveIntensity={
                    isActive(selected, { type: "joint", id: "thumb_cmc" })
                      ? 0.42
                      : isActive(hovered, { type: "joint", id: "thumb_cmc" })
                        ? 0.34
                        : 0.25
                  }
                />
              </mesh>
            )}

            {segments.map((segment, idx) => {
              const h = mmToUnits(segment.lengthMm);
              const segmentId = segment.segment.id;
              const segmentSel: SelectableId = { type: "segment", id: segmentId };
              const isSegmentSelected = isActive(selected, segmentSel);
              const isSegmentHovered = isActive(hovered, segmentSel);
              const jointId = jointIds[idx];

              const body = (
                <group key={segmentId}>
                  <mesh
                    position={[0, currentY + h / 2, 0]}
                    onPointerOver={(e) => {
                      e.stopPropagation();
                      onHover(segmentSel);
                    }}
                    onPointerOut={(e) => {
                      e.stopPropagation();
                      onHover(undefined);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(segmentSel);
                    }}
                  >
                    <cylinderGeometry args={[0.16, 0.18, h, 12]} />
                    <meshStandardMaterial
                      color={isSegmentSelected ? "#e2e8f0" : isSegmentHovered ? "#bfdbfe" : "#334155"}
                      emissive={isSegmentSelected ? "#22d3ee" : isSegmentHovered ? "#38bdf8" : "#0f172a"}
                      emissiveIntensity={isSegmentSelected ? 0.3 : isSegmentHovered ? 0.2 : 0.1}
                    />
                  </mesh>

                  {jointId && (
                    <mesh
                      position={[0, currentY + h, 0]}
                      onPointerOver={(e) => {
                        e.stopPropagation();
                        onHover({ type: "joint", id: jointId });
                      }}
                      onPointerOut={(e) => {
                        e.stopPropagation();
                        onHover(undefined);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect({ type: "joint", id: jointId });
                      }}
                    >
                      <sphereGeometry args={[0.14, 16, 16]} />
                      <meshStandardMaterial
                        color={
                          isActive(selected, { type: "joint", id: jointId })
                            ? "#ffffff"
                            : isActive(hovered, { type: "joint", id: jointId })
                              ? "#d1fae5"
                              : color
                        }
                        emissive={color}
                        emissiveIntensity={
                          isActive(selected, { type: "joint", id: jointId })
                            ? 0.42
                            : isActive(hovered, { type: "joint", id: jointId })
                              ? 0.34
                              : 0.25
                        }
                      />
                    </mesh>
                  )}
                </group>
              );

              currentY += h;
              return body;
            })}
          </group>
        );
      })}
    </group>
  );
}

export function ParametricHandScene({
  profile,
  selected,
  hovered,
  onSelect,
  onHover
}: HandModelAdapterProps) {
  const scale = getProfileScaleById(profile.id);

  return (
    <div className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <Canvas
        camera={{ position: [0, 7, 14], fov: 38 }}
        onPointerMissed={() => {
          onHover(undefined);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[7, 10, 8]} intensity={1.2} />
        <directionalLight position={[-7, 8, -3]} intensity={0.4} />
        <Grid args={[30, 30]} cellColor="#1f2937" sectionColor="#334155" position={[0, 0, 0]} />
        <group scale={[scale, scale, scale]}>
          <HandGeometry
            profile={profile}
            selected={selected}
            hovered={hovered}
            onSelect={onSelect}
            onHover={onHover}
          />
        </group>
        <OrbitControls makeDefault enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}
