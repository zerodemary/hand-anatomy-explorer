import { useEffect, useMemo, useState } from "react";
import { EnZh } from "@/components/EnZh";
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
    return <span className="text-sky-200/45">-</span>;
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
        {row.meta.isDerived ? "derived 派生" : "direct 直接"}
      </span>
      {row.meta.evidenceLevel && (
        <span className="text-[11px] uppercase text-sky-100/65">{row.meta.evidenceLevel}</span>
      )}
    </div>
  );
}

function SummaryCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border border-cyan-300/20 bg-[#0b2247]/65 px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-sky-100/70">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-50">{value}</p>
      {note && <p className="text-xs text-sky-200/55">{note}</p>}
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
    <section className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
      <h2 className="text-lg font-semibold">
        <EnZh en="Lengths" zh="长度对比" />
      </h2>
      <p className="mt-1 text-sm text-sky-100/75">
        Active profile vs compare profile with explicit derived markers 当前模型与对比模型的骨段长度对照。
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="text-sm text-sky-100/90">
          <EnZh en="Compare against" zh="对比模型" zhClassName="ml-1 text-[11px] text-sky-200/70" />
          <select
            className="ml-2 rounded border border-cyan-300/25 bg-[#0a2040]/80 px-2 py-1 text-sm"
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
          label="Comparable Segments 可比骨段"
          value={`${summary.comparableCount}/${summary.segmentCount}`}
          note={`${profile.id} vs ${summary.compareProfileId}`}
        />
        <SummaryCard label={`${profile.id} Derived 派生值`} value={`${summary.activeDerivedCount}`} />
        <SummaryCard
          label={`${summary.compareProfileId} Derived 派生值`}
          value={`${summary.compareDerivedCount}`}
        />
        <SummaryCard
          label="Avg Delta (mm) 平均差值"
          value={formatSigned(avgDeltaMm)}
          note="active - compare"
        />
      </div>

      <div className="mt-4 overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-sky-100/90">
              <th className="border-b border-cyan-300/25 px-2 py-2">Segment 骨段</th>
              <th className="border-b border-cyan-300/25 px-2 py-2">{profile.label}</th>
              <th className="border-b border-cyan-300/25 px-2 py-2">
                {compareProfile?.label ?? compareProfileId}
              </th>
              <th className="border-b border-cyan-300/25 px-2 py-2">Delta (mm) 差值</th>
              <th className="border-b border-cyan-300/25 px-2 py-2">Delta (%) 差值</th>
              <th className="border-b border-cyan-300/25 px-2 py-2">Sources 来源</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.segment.id} className="align-top text-slate-100">
                <td className="border-b border-cyan-300/15 px-2 py-2">
                  <p className="font-mono text-xs">{row.segment.id}</p>
                  <p className="text-xs text-sky-100/70">{row.segment.label}</p>
                </td>
                <td className="border-b border-cyan-300/15 px-2 py-2">
                  <MeasurementCell row={row.active} />
                </td>
                <td className="border-b border-cyan-300/15 px-2 py-2">
                  <MeasurementCell row={row.compare} />
                </td>
                <td
                  className={`border-b border-cyan-300/15 px-2 py-2 font-mono ${
                    row.deltaMm !== null && row.deltaMm > 0 ? "text-cyan-200" : "text-sky-50/90"
                  }`}
                >
                  {formatSigned(row.deltaMm, " mm")}
                </td>
                <td
                  className={`border-b border-cyan-300/15 px-2 py-2 font-mono ${
                    row.deltaPct !== null && row.deltaPct > 0 ? "text-cyan-200" : "text-sky-50/90"
                  }`}
                >
                  {formatSigned(row.deltaPct, "%")}
                </td>
                <td className="border-b border-cyan-300/15 px-2 py-2 text-xs text-sky-100/70">
                  <p className="font-mono">A: {row.active?.sourceTrace.sourceIds.join(", ") ?? "-"}</p>
                  <p className="mt-1 font-mono">B: {row.compare?.sourceTrace.sourceIds.join(", ") ?? "-"}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-sky-100/65">
        `derived` indicates scaled or inferred values（缩放/推导值）. `direct` indicates directly referenced
        measurements（直接文献值）.
      </p>
    </section>
  );
}
