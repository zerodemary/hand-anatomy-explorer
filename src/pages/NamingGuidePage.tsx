import { useMemo } from "react";
import { EnZh } from "@/components/EnZh";
import { getNamingGuideReadModel } from "@/domain/naming-guide";

function SourceBadges({ sourceIds }: { sourceIds: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {sourceIds.map((sourceId) => (
        <span
          key={sourceId}
          className="rounded border border-cyan-300/20 bg-[#0b2247]/65 px-1.5 py-0.5 font-mono text-[11px] text-sky-100/90"
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
      <article className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
        <h2 className="text-lg font-semibold">
          <EnZh en="Naming Guide" zh="命名规范指南" />
        </h2>
        <p className="mt-1 text-sm text-sky-100/75">
          Explicit naming rules, neutral definition, sign convention, and source trace 明确命名规则与符号约定。
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {model.rules.map((rule, index) => (
            <div key={rule.id} className="rounded-lg border border-cyan-300/20 bg-[#0b2247]/65 p-3">
              <p className="text-sm font-semibold text-slate-100">{rule.title}</p>
              <p className="mt-1 text-sm text-sky-100/85">
                {rule.definition}
                <span className="ml-1 text-xs text-sky-200/65">
                  {index === 0
                    ? "（关节 ID 命名规则）"
                    : index === 1
                      ? "（动作 ID 命名规则）"
                      : index === 2
                        ? "（中立位定义）"
                        : "（角度正负号约定）"}
                </span>
              </p>
              <p className="mt-1 font-mono text-xs text-cyan-300">{rule.example}</p>
              <div className="mt-2">
                <SourceBadges sourceIds={rule.sourceTrace.sourceIds} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
          <h3 className="text-base font-semibold">
            <EnZh en="Joint Naming" zh="关节命名" />
          </h3>
          <p className="mt-1 text-sm text-sky-100/75">
            Short label, full label, type, DOF, and source trace 缩写、全称、关节类型、自由度与来源。
          </p>

          <div className="mt-3 overflow-auto">
            <table className="min-w-full border-collapse text-sm">
              <caption className="sr-only">Joint naming table</caption>
              <thead>
                <tr className="text-left text-sky-100/90">
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    ID 编号
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Short 缩写
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Full 全称
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Type 类型
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    DOF 自由度
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Sources 来源
                  </th>
                </tr>
              </thead>
              <tbody>
                {model.jointRows.map((row) => (
                  <tr key={row.joint.id} className="align-top">
                    <td className="border-b border-cyan-300/15 px-2 py-2 font-mono text-xs">{row.joint.id}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.joint.shortLabel}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.joint.fullLabel}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.joint.jointType}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.joint.dof}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">
                      <SourceBadges sourceIds={row.sourceTrace.sourceIds} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
          <h3 className="text-base font-semibold">
            <EnZh en="Motion Naming & Sign Convention" zh="动作命名与正负号约定" />
          </h3>
          <p className="mt-1 text-sm text-sky-100/75">
            Neutral position is 0 deg. Positive and negative follow per-motion definitions 中立位为 0 度。
          </p>
          <div className="mt-3 overflow-auto">
            <table className="min-w-full border-collapse text-sm">
              <caption className="sr-only">Motion naming and sign convention table</caption>
              <thead>
                <tr className="text-left text-sky-100/90">
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Motion ID 动作编号
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Label 标签
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Positive 正向
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Negative 反向
                  </th>
                  <th scope="col" className="border-b border-cyan-300/25 px-2 py-2">
                    Sources 来源
                  </th>
                </tr>
              </thead>
              <tbody>
                {model.motionRows.map((row) => (
                  <tr key={row.motion.id} className="align-top">
                    <td className="border-b border-cyan-300/15 px-2 py-2 font-mono text-xs">{row.motion.id}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.motion.label}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.motion.positiveDirection}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">{row.motion.negativeDirection}</td>
                    <td className="border-b border-cyan-300/15 px-2 py-2">
                      <SourceBadges sourceIds={row.sourceTrace.sourceIds} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <article className="rounded-xl border border-cyan-300/20 bg-[#10294f]/78 p-4 shadow-[0_18px_45px_rgba(3,10,25,0.35)]">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
          <EnZh en="Source List" zh="来源列表" />
        </h3>
        <ul className="mt-2 space-y-2 text-sm text-sky-100/85">
          {model.sourceTrace.sources.map((source) => (
            <li key={source.id}>
              <span className="font-mono text-xs text-sky-200/70">{source.id}</span> · {source.title}
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
