import { JOINTS, MOTIONS, SOURCES } from "@/data/catalog";

export function NamingGuidePage() {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Joint Naming</h2>
        <p className="mt-1 text-sm text-slate-400">Short labels, full labels, joint type and DOF.</p>

        <div className="mt-3 overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-slate-300">
                <th className="border-b border-slate-700 px-2 py-2">ID</th>
                <th className="border-b border-slate-700 px-2 py-2">Short</th>
                <th className="border-b border-slate-700 px-2 py-2">Full</th>
                <th className="border-b border-slate-700 px-2 py-2">Type</th>
                <th className="border-b border-slate-700 px-2 py-2">DOF</th>
              </tr>
            </thead>
            <tbody>
              {JOINTS.map((joint) => (
                <tr key={joint.id}>
                  <td className="border-b border-slate-800 px-2 py-2 font-mono text-xs">{joint.id}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{joint.shortLabel}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{joint.fullLabel}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{joint.jointType}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{joint.dof}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Motion Naming & Sign Convention</h2>
        <p className="mt-1 text-sm text-slate-400">
          Neutral position is defined as 0°. Positive and negative directions follow motion definitions.
        </p>
        <div className="mt-3 overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-slate-300">
                <th className="border-b border-slate-700 px-2 py-2">Motion ID</th>
                <th className="border-b border-slate-700 px-2 py-2">Label</th>
                <th className="border-b border-slate-700 px-2 py-2">Positive</th>
                <th className="border-b border-slate-700 px-2 py-2">Negative</th>
              </tr>
            </thead>
            <tbody>
              {MOTIONS.map((motion) => (
                <tr key={motion.id}>
                  <td className="border-b border-slate-800 px-2 py-2 font-mono text-xs">{motion.id}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{motion.label}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{motion.positiveDirection}</td>
                  <td className="border-b border-slate-800 px-2 py-2">{motion.negativeDirection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-300">Sources</h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          {SOURCES.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-slate-400">{source.id}</span> · {source.title}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
