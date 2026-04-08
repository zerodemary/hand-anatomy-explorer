import { useMemo, useState } from "react";
import { PROFILES } from "@/data/catalog";
import { EnZh } from "@/components/EnZh";
import { ExplorerPage } from "@/pages/ExplorerPage";
import { LengthsPage } from "@/pages/LengthsPage";
import { NamingGuidePage } from "@/pages/NamingGuidePage";

type TabKey = "explorer" | "lengths" | "naming";

const TABS: Array<{ id: TabKey; label: string }> = [
  { id: "explorer", label: "Explorer 探索器" },
  { id: "lengths", label: "Lengths 长度对比" },
  { id: "naming", label: "Naming Guide 命名规则" }
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("explorer");
  const [profileId, setProfileId] = useState("western_male_50");

  const currentProfile = useMemo(
    () => PROFILES.find((p) => p.id === profileId) ?? PROFILES[0],
    [profileId]
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#143a72_0%,#0f2b57_44%,#091a3b_100%)] text-slate-50">
      <header className="border-b border-cyan-400/20 bg-[#0b2248]/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Dexterous Hand Design Reference 灵巧手设计参考
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Hand Anatomy Explorer v0.3</h1>
            <p className="mt-2 text-sm text-sky-100/80">
              Public static 3D reference tool for dexterous-hand design with traceable data
            </p>
          </div>
          <label className="flex min-w-64 flex-col gap-2 text-sm text-sky-100/90">
            <EnZh en="Population Profile" zh="人群参数模型" zhClassName="ml-2 text-xs text-sky-200/80" />
            <select
              className="rounded-md border border-cyan-300/25 bg-[#0a2040]/80 px-3 py-2 text-slate-100"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              aria-label="Population Profile"
            >
              {PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.id === "western_male_50"
                    ? `${profile.label}（西方男性 50 分位）`
                    : profile.id === "asian_male_50"
                      ? `${profile.label}（亚洲男性 50 分位）`
                      : profile.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <nav className="mx-auto flex max-w-7xl gap-3 px-6 py-4" aria-label="Main sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm transition ${
              tab === item.id
                ? "border-cyan-300 bg-cyan-300/15 text-cyan-50"
                : "border-cyan-300/25 bg-[#0b2247]/70 text-sky-100/90 hover:border-cyan-200/50"
            }`}
            onClick={() => setTab(item.id)}
            aria-pressed={tab === item.id}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-7xl px-6 pb-10">
        {tab === "explorer" && <ExplorerPage profile={currentProfile} />}
        {tab === "lengths" && <LengthsPage profile={currentProfile} />}
        {tab === "naming" && <NamingGuidePage />}
      </main>
    </div>
  );
}
