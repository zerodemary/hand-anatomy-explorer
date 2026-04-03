import { useMemo, useState } from "react";
import { JOINTS, SEGMENTS } from "@/data/catalog";
import type { Profile } from "@/data/schema";
import { getDefaultJointId, getJointById, getRomByProfileAndJoint, getSegmentMeasurementsByFinger, getSourcesByIds } from "@/core/selectors";
import { ParametricHandScene } from "@/components/ParametricHandScene";
import { ACTIVE_HAND_MODEL_ADAPTER } from "@/core/hand-model-adapter";
import type { SelectableId } from "@/core/hand-model-adapter";

function JointDetails({ profile, jointId }: { profile: Profile; jointId: string }) {
  const joint = getJointById(jointId);
  const rom = getRomByProfileAndJoint(profile.id, jointId);

  if (!joint) {
    return <p className="text-sm text-slate-400">Select a joint.</p>;
  }

  const segmentRows = getSegmentMeasurementsByFinger(profile.id, joint.fingerId);
  const sourceIds = Array.from(new Set([...rom.flatMap((r) => r.sourceIds), ...segmentRows.flatMap((s) => s.sourceIds)]));
  const sources = getSourcesByIds(sourceIds);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-semibold">{joint.id}</h3>
        <p className="mt-1 text-sm text-slate-300">
          {joint.fullLabel} · {joint.jointType} · DOF {joint.dof}
        </p>
      </div>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">ROM</h4>
        <div className="space-y-2">
          {rom.map((item) => (
            <div key={item.id} className="rounded border border-slate-800 bg-slate-900 p-2 text-sm">
              <div>{item.motion.label}</div>
              <div className="text-slate-300">
                {item.minDeg}° to {item.maxDeg}° ({item.motion.negativeDirection} / {item.motion.positiveDirection})
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Segment Lengths (same finger)</h4>
        <div className="space-y-2">
          {segmentRows.map((row) => (
            <div key={row.id} className="flex justify-between rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm">
              <span>{row.segmentLabel}</span>
              <span>{row.lengthMm.toFixed(1)} mm</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Sources</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          {sources.map((source) => (
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
  const segment = SEGMENTS.find((s) => s.id === segmentId);
  if (!segment) {
    return <p className="text-sm text-slate-400">Select a segment.</p>;
  }
  const rows = getSegmentMeasurementsByFinger(profile.id, segment.fingerId);
  const current = rows.find((row) => row.segmentId === segment.id);
  const sources = getSourcesByIds(current?.sourceIds ?? []);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{segment.id}</h3>
        <p className="mt-1 text-sm text-slate-300">{segment.label}</p>
      </div>
      {current ? (
        <div className="rounded border border-slate-800 bg-slate-900 p-3 text-sm">
          Length: <span className="font-semibold">{current.lengthMm.toFixed(1)} mm</span>
          {current.evidenceLevel === "derived" && (
            <p className="mt-1 text-xs text-amber-300">Derived value ({profile.label})</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-400">No measurement found for selected profile.</p>
      )}

      <section>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-300">Sources</h4>
        <ul className="space-y-1 text-sm text-slate-300">
          {sources.map((source) => (
            <li key={source.id}>{source.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ExplorerPage({ profile }: { profile: Profile }) {
  const [selected, setSelected] = useState<SelectableId>({ type: "joint", id: getDefaultJointId() });

  const jointOptions = useMemo(() => JOINTS.map((joint) => joint.id), []);

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">3D Explorer (Approach A: Parametric)</h2>
            <p className="text-sm text-slate-400">Adapter: {ACTIVE_HAND_MODEL_ADAPTER.id}</p>
          </div>
          <label className="text-xs text-slate-300">
            Quick joint select
            <select
              className="ml-2 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              value={selected.type === "joint" ? selected.id : ""}
              onChange={(e) => setSelected({ type: "joint", id: e.target.value })}
            >
              {jointOptions.map((jointId) => (
                <option key={jointId} value={jointId}>
                  {jointId}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ParametricHandScene profile={profile} selected={selected} onSelect={setSelected} />
      </article>

      <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        {selected.type === "joint" ? (
          <JointDetails profile={profile} jointId={selected.id} />
        ) : (
          <SegmentDetails profile={profile} segmentId={selected.id} />
        )}
      </aside>
    </section>
  );
}
