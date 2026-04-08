import { useMemo, useState } from "react";
import { EnZh } from "@/components/EnZh";
import type { Profile } from "@/data/schema";
import { HandModelAdapterHost } from "@/components/HandModelAdapterHost";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import {
  ACTIVE_HAND_MODEL_ADAPTER_ID,
  HAND_MODEL_ADAPTERS,
  getHandModelAdapterById,
  type HandModelAdapterId,
  type SelectableId
} from "@/core/hand-model-adapter";
import {
  getDefaultJointId,
  getJointExplorerDetail,
  getSegmentExplorerDetail,
  listExplorerJointOptions
} from "@/domain/read-models";

function JointDetails({ profileId, jointId }: { profileId: string; jointId: string }) {
  const detail = getJointExplorerDetail(profileId, jointId);

  if (!detail) {
    return <p className="text-sm text-sky-100/70">Select a joint 选择一个关节。</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-semibold">{detail.joint.id}</h3>
        <p className="mt-1 text-sm text-sky-100/85">
          {detail.joint.fullLabel} · {detail.joint.jointType} · DOF {detail.joint.dof}
        </p>
      </div>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          <EnZh en="ROM" zh="活动范围" />
        </h4>
        <div className="space-y-2">
          {detail.romRows.map((row) => (
            <div
              key={row.measurementId}
              className="rounded border border-cyan-300/20 bg-[#0b2247]/65 p-2 text-sm"
            >
              <div>{row.motion.label}</div>
              <div className="text-sky-100/85">
                {row.minDeg}° to {row.maxDeg}° ({row.motion.negativeDirection} / {row.motion.positiveDirection})
              </div>
              {row.meta.isDerived && (
                <div className="mt-1 text-xs text-amber-200">Derived measurement 派生测量值</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          <EnZh en="Segment Lengths (same finger)" zh="同一手指骨段长度" />
        </h4>
        <div className="space-y-2">
          {detail.fingerSegments.map((row) => (
            <div
              key={row.measurementId}
              className="flex justify-between rounded border border-cyan-300/20 bg-[#0b2247]/65 px-3 py-2 text-sm"
            >
              <span>{row.segment.label}</span>
              <span>{row.lengthMm.toFixed(1)} mm</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          <EnZh en="Sources" zh="数据来源" />
        </h4>
        <ul className="space-y-1 text-sm text-sky-100/85">
          {detail.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-sky-200/70">{source.id}</span> · {source.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SegmentDetails({ profile, segmentId }: { profile: Profile; segmentId: string }) {
  const detail = getSegmentExplorerDetail(profile.id, segmentId);

  if (!detail) {
    return <p className="text-sm text-sky-100/70">Select a segment 选择一个骨段。</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{detail.segment.id}</h3>
        <p className="mt-1 text-sm text-sky-100/85">{detail.segment.label}</p>
      </div>
      {detail.measurement ? (
        <div className="rounded border border-cyan-300/20 bg-[#0b2247]/65 p-3 text-sm">
          <EnZh en="Length" zh="长度" />:{" "}
          <span className="font-semibold">{detail.measurement.lengthMm.toFixed(1)} mm</span>
          {detail.measurement.meta.isDerived && (
            <p className="mt-1 text-xs text-amber-200">Derived value 派生值 ({profile.label})</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-sky-100/70">
          No measurement found for selected profile 未找到对应测量值。
        </p>
      )}

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200">
          <EnZh en="Sources" zh="数据来源" />
        </h4>
        <ul className="space-y-1 text-sm text-sky-100/85">
          {detail.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-sky-200/70">{source.id}</span> · {source.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SelectionBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-cyan-300/20 bg-[#0a2040]/85 px-2 py-1 text-xs text-sky-100/90">
      <span className="text-sky-100/70">{label}: </span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export function ExplorerPage({ profile }: { profile: Profile }) {
  const [selected, setSelected] = useState<SelectableId>({ type: "joint", id: getDefaultJointId() });
  const [hovered, setHovered] = useState<SelectableId | undefined>(undefined);
  const [adapterId, setAdapterId] = useState<HandModelAdapterId>(ACTIVE_HAND_MODEL_ADAPTER_ID);

  const jointOptions = useMemo(() => listExplorerJointOptions(), []);
  const currentAdapter = getHandModelAdapterById(adapterId);

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">
              <EnZh en="3D Explorer (Approach A Primary)" zh="三维浏览（当前主路径）" />
            </h2>
            <p className="text-sm text-sky-100/75">{currentAdapter.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-sky-100/90">
              <EnZh en="Mesh adapter" zh="网格适配器" zhClassName="ml-1 text-[11px] text-sky-200/70" />
              <select
                className="ml-2 rounded border border-cyan-300/25 bg-[#0a2040]/80 px-2 py-1 text-sm"
                value={adapterId}
                onChange={(e) => setAdapterId(e.target.value as HandModelAdapterId)}
              >
                {HAND_MODEL_ADAPTERS.map((adapter) => (
                  <option key={adapter.id} value={adapter.id}>
                    {adapter.label} ({adapter.status})
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs text-sky-100/90">
              <EnZh
                en="Quick joint select"
                zh="快速选择关节"
                zhClassName="ml-1 text-[11px] text-sky-200/70"
              />
              <select
                className="ml-2 rounded border border-cyan-300/25 bg-[#0a2040]/80 px-2 py-1 text-sm"
                value={selected.type === "joint" ? selected.id : ""}
                onChange={(e) => setSelected({ type: "joint", id: e.target.value })}
              >
                {jointOptions.map((joint) => (
                  <option key={joint.id} value={joint.id}>
                    {joint.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          <SelectionBadge label="adapter" value={adapterId} />
          <SelectionBadge label="selected" value={`${selected.type}:${selected.id}`} />
          <SelectionBadge label="hover" value={hovered ? `${hovered.type}:${hovered.id}` : "none"} />
        </div>

        <SceneErrorBoundary>
          <HandModelAdapterHost
            adapterId={adapterId}
            profile={profile}
            selected={selected}
            hovered={hovered}
            onSelect={(next) => {
              setSelected(next);
            }}
            onHover={(next) => {
              setHovered(next);
            }}
          />
        </SceneErrorBoundary>
      </article>

      <aside className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
        {selected.type === "joint" ? (
          <JointDetails profileId={profile.id} jointId={selected.id} />
        ) : (
          <SegmentDetails profile={profile} segmentId={selected.id} />
        )}
      </aside>
    </section>
  );
}
