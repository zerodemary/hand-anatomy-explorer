import { useMemo, useState } from "react";
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
    return <p className="text-sm text-slate-400">Select a joint.</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-semibold">{detail.joint.id}</h3>
        <p className="mt-1 text-sm text-slate-300">
          {detail.joint.fullLabel} · {detail.joint.jointType} · DOF {detail.joint.dof}
        </p>
      </div>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">ROM</h4>
        <div className="space-y-2">
          {detail.romRows.map((row) => (
            <div key={row.measurementId} className="rounded border border-slate-800 bg-slate-900 p-2 text-sm">
              <div>{row.motion.label}</div>
              <div className="text-slate-300">
                {row.minDeg}° to {row.maxDeg}° ({row.motion.negativeDirection} / {row.motion.positiveDirection})
              </div>
              {row.meta.isDerived && <div className="mt-1 text-xs text-amber-300">Derived measurement</div>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Segment Lengths (same finger)</h4>
        <div className="space-y-2">
          {detail.fingerSegments.map((row) => (
            <div
              key={row.measurementId}
              className="flex justify-between rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            >
              <span>{row.segment.label}</span>
              <span>{row.lengthMm.toFixed(1)} mm</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Sources</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          {detail.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-slate-400">{source.id}</span> · {source.title}
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
    return <p className="text-sm text-slate-400">Select a segment.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{detail.segment.id}</h3>
        <p className="mt-1 text-sm text-slate-300">{detail.segment.label}</p>
      </div>
      {detail.measurement ? (
        <div className="rounded border border-slate-800 bg-slate-900 p-3 text-sm">
          Length: <span className="font-semibold">{detail.measurement.lengthMm.toFixed(1)} mm</span>
          {detail.measurement.meta.isDerived && (
            <p className="mt-1 text-xs text-amber-300">Derived value ({profile.label})</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-400">No measurement found for selected profile.</p>
      )}

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Sources</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          {detail.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-slate-400">{source.id}</span> · {source.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SelectionBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-300">
      <span className="text-slate-400">{label}: </span>
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
      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">3D Explorer (Approach A Primary)</h2>
            <p className="text-sm text-slate-400">{currentAdapter.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-slate-300">
              Mesh adapter
              <select
                className="ml-2 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
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

            <label className="text-xs text-slate-300">
              Quick joint select
              <select
                className="ml-2 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
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

      <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        {selected.type === "joint" ? (
          <JointDetails profileId={profile.id} jointId={selected.id} />
        ) : (
          <SegmentDetails profile={profile} segmentId={selected.id} />
        )}
      </aside>
    </section>
  );
}
