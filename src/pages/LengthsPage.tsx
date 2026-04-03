import { SEGMENTS } from "@/data/catalog";
import type { Profile } from "@/data/schema";
import { getProfileComparison } from "@/core/selectors";

export function LengthsPage({ profile }: { profile: Profile }) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">Lengths</h2>
      <p className="mt-1 text-sm text-slate-400">
        Commit 1 baseline table with profile comparison and derived marker.
      </p>

      <div className="mt-4 overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-slate-300">
              <th className="border-b border-slate-700 px-2 py-2">Segment ID</th>
              <th className="border-b border-slate-700 px-2 py-2">Western 50th</th>
              <th className="border-b border-slate-700 px-2 py-2">Asian 50th</th>
              <th className="border-b border-slate-700 px-2 py-2">Current ({profile.id})</th>
              <th className="border-b border-slate-700 px-2 py-2">Derived</th>
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((segment) => {
              const cmp = getProfileComparison(segment.id);
              const current = profile.id === "western_male_50" ? cmp.western : cmp.asian;
              return (
                <tr key={segment.id} className="text-slate-100">
                  <td className="border-b border-slate-800 px-2 py-2 font-mono text-xs">{segment.id}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{cmp.western?.lengthMm.toFixed(1) ?? "-"}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{cmp.asian?.lengthMm.toFixed(1) ?? "-"}</td>
                  <td className="border-b border-slate-800 px-2 py-2 font-semibold">{current?.lengthMm.toFixed(1) ?? "-"}</td>
                  <td className="border-b border-slate-800 px-2 py-2 text-xs text-amber-300">
                    {current?.evidenceLevel === "derived" ? "yes" : "no"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
