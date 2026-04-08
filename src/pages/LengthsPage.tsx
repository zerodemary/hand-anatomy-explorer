import { useEffect, useMemo, useState } from "react";
import type { Profile } from "@/data/schema";
import type { SegmentLengthReadRow } from "@/domain/read-models";
import {
  getDefaultComparisonProfileId,
  getLengthComparisonRows,
  getLengthComparisonSummary,
  getProfileById,
  listComparisonProfiles
} from "@/domain/read-models";

function formatSigned(value: number | null, suffix = ""): string {
  if (value === null) {
    return "-";
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}${suffix}`;
}

function MeasurementCell({ row }: { row: SegmentLengthReadRow | null }) {
  if (!row) {
    return <span className="text-slate-500">-</span>;
  }

  return (
    <div className="flex min-w-24 flex-col gap-1">
      <span className="font-semibold text-slate-100">{row.lengthMm.toFixed(1)} mm</span>
      <span
        className={`w-fit rounded px-1.5 py-0.5 text-[11px] ${
          row.meta.isDerived
            ? "border border-amber-500/40 bg-amber-500/10 text-amber-200"
            : "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
        }`}
      >
        {row.meta.isDerived ? "derived" : "direct"}
      </span>
      {row.meta.evidenceLevel && (
        <span className="text-[11px] uppercase text-slate-400">{row.meta.evidenceLevel}</span>
      )}
    </div>
  );
}

function SummaryCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-100">{value}</p>
      {note && <p className="text-xs text-slate-500">{note}</p>}
    </div>
  );
}

export function LengthsPage({ profile }: { profile: Profile }) {
  const [compareProfileId, setCompareProfileId] = useState(() =>
    getDefaultComparisonProfileId(profile.id)
  );

  const comparisonProfiles = useMemo(() => listComparisonProfiles(profile.id), [profile.id]);

  useEffect(() => {
    const isValid = comparisonProfiles.some((item) => item.id === compareProfileId);
    if (!isValid || compareProfileId === profile.id) {
      setCompareProfileId(getDefaultComparisonProfileId(profile.id));
    }
  }, [compareProfileId, comparisonProfiles, profile.id]);

  const rows = useMemo(
    () => getLengthComparisonRows(profile.id, compareProfileId),
    [profile.id, compareProfileId]
  );
  const summary = useMemo(
    () => getLengthComparisonSummary(profile.id, compareProfileId),
    [profile.id, compareProfileId]
  );

  const compareProfile = getProfileById(compareProfileId);
  const avgDeltaMm = useMemo(() => {
    const values = rows.map((row) => row.deltaMm).filter((value): value is number => value !== null);
    if (values.length === 0) {
      return null;
    }
    return values.reduce((total, value) => total + value, 0) / values.length;
  }, [rows]);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">Lengths</h2>
      <p className="mt-1 text-sm text-slate-400">
        Commit 4 comparison view: active profile vs compare profile with explicit derived markers.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="text-sm text-slate-300">
          Compare against
          <select
            className="ml-2 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
            value={compareProfileId}
            onChange={(event) => setCompareProfileId(event.target.value)}
            aria-label="Compare against"
          >
            {comparisonProfiles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Comparable Segments"
          value={`${summary.comparableCount}/${summary.segmentCount}`}
          note={`${profile.id} vs ${summary.compareProfileId}`}
        />
        <SummaryCard label={`${profile.id} Derived`} value={`${summary.activeDerivedCount}`} />
        <SummaryCard
          label={`${summary.compareProfileId} Derived`}
          value={`${summary.compareDerivedCount}`}
        />
        <SummaryCard
          label="Avg Delta (mm)"
          value={formatSigned(avgDeltaMm)}
          note="active - compare"
        />
      </div>

      <div className="mt-4 overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-slate-300">
              <th className="border-b border-slate-700 px-2 py-2">Segment</th>
              <th className="border-b border-slate-700 px-2 py-2">{profile.label}</th>
              <th className="border-b border-slate-700 px-2 py-2">{compareProfile?.label ?? compareProfileId}</th>
              <th className="border-b border-slate-700 px-2 py-2">Delta (mm)</th>
              <th className="border-b border-slate-700 px-2 py-2">Delta (%)</th>
              <th className="border-b border-slate-700 px-2 py-2">Sources</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.segment.id} className="align-top text-slate-100">
                <td className="border-b border-slate-800 px-2 py-2">
                  <p className="font-mono text-xs">{row.segment.id}</p>
                  <p className="text-xs text-slate-400">{row.segment.label}</p>
                </td>
                <td className="border-b border-slate-800 px-2 py-2">
                  <MeasurementCell row={row.active} />
                </td>
                <td className="border-b border-slate-800 px-2 py-2">
                  <MeasurementCell row={row.compare} />
                </td>
                <td
                  className={`border-b border-slate-800 px-2 py-2 font-mono ${
                    row.deltaMm !== null && row.deltaMm > 0 ? "text-cyan-300" : "text-slate-200"
                  }`}
                >
                  {formatSigned(row.deltaMm, " mm")}
                </td>
                <td
                  className={`border-b border-slate-800 px-2 py-2 font-mono ${
                    row.deltaPct !== null && row.deltaPct > 0 ? "text-cyan-300" : "text-slate-200"
                  }`}
                >
                  {formatSigned(row.deltaPct, "%")}
                </td>
                <td className="border-b border-slate-800 px-2 py-2 text-xs text-slate-400">
                  <p className="font-mono">A: {row.active?.sourceTrace.sourceIds.join(", ") ?? "-"}</p>
                  <p className="mt-1 font-mono">B: {row.compare?.sourceTrace.sourceIds.join(", ") ?? "-"}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        `derived` indicates scaled or inferred values. `direct` indicates directly referenced measurements.
      </p>
    </section>
  );
}
