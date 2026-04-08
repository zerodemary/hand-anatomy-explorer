import { useMemo } from "react";
import { getNamingGuideReadModel } from "@/domain/naming-guide";

function SourceBadges({ sourceIds }: { sourceIds: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {sourceIds.map((sourceId) => (
        <span
          key={sourceId}
          className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 font-mono text-[11px] text-slate-300"
        >
          {sourceId}
        </span>
      ))}
    </div>
  );
}

export function NamingGuidePage() {
  const model = useMemo(() => getNamingGuideReadModel(), []);

  return (
    <section className="space-y-5">
      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Naming Guide</h2>
        <p className="mt-1 text-sm text-slate-400">
          Commit 5 hardening: explicit naming rules, neutral definition, sign convention, and source trace.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {model.rules.map((rule) => (
            <div key={rule.id} className="rounded-lg border border-slate-700 bg-slate-950 p-3">
              <p className="text-sm font-semibold text-slate-100">{rule.title}</p>
              <p className="mt-1 text-sm text-slate-300">{rule.definition}</p>
              <p className="mt-1 font-mono text-xs text-cyan-300">{rule.example}</p>
              <div className="mt-2">
                <SourceBadges sourceIds={rule.sourceTrace.sourceIds} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-semibold">Joint Naming</h3>
          <p className="mt-1 text-sm text-slate-400">Short label, full label, type, DOF, and source trace.</p>

          <div className="mt-3 overflow-auto">
            <table className="min-w-full border-collapse text-sm">
              <caption className="sr-only">Joint naming table</caption>
              <thead>
                <tr className="text-left text-slate-300">
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    ID
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Short
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Full
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Type
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    DOF
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Sources
                  </th>
                </tr>
              </thead>
              <tbody>
                {model.jointRows.map((row) => (
                  <tr key={row.joint.id} className="align-top">
                    <td className="border-b border-slate-800 px-2 py-2 font-mono text-xs">{row.joint.id}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.joint.shortLabel}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.joint.fullLabel}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.joint.jointType}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.joint.dof}</td>
                    <td className="border-b border-slate-800 px-2 py-2">
                      <SourceBadges sourceIds={row.sourceTrace.sourceIds} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-semibold">Motion Naming & Sign Convention</h3>
          <p className="mt-1 text-sm text-slate-400">
            Neutral position is 0 deg. Positive and negative follow per-motion definitions.
          </p>
          <div className="mt-3 overflow-auto">
            <table className="min-w-full border-collapse text-sm">
              <caption className="sr-only">Motion naming and sign convention table</caption>
              <thead>
                <tr className="text-left text-slate-300">
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Motion ID
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Label
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Positive
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Negative
                  </th>
                  <th scope="col" className="border-b border-slate-700 px-2 py-2">
                    Sources
                  </th>
                </tr>
              </thead>
              <tbody>
                {model.motionRows.map((row) => (
                  <tr key={row.motion.id} className="align-top">
                    <td className="border-b border-slate-800 px-2 py-2 font-mono text-xs">{row.motion.id}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.motion.label}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.motion.positiveDirection}</td>
                    <td className="border-b border-slate-800 px-2 py-2">{row.motion.negativeDirection}</td>
                    <td className="border-b border-slate-800 px-2 py-2">
                      <SourceBadges sourceIds={row.sourceTrace.sourceIds} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Source List</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {model.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-slate-400">{source.id}</span> · {source.title}
              {source.url && (
                <>
                  {" "}
                  ·{" "}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 underline decoration-cyan-700 hover:text-cyan-200"
                  >
                    link
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
