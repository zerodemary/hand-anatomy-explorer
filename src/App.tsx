import { useMemo, useState } from "react";
import { PROFILES } from "@/data/catalog";
import { ExplorerPage } from "@/pages/ExplorerPage";
import { LengthsPage } from "@/pages/LengthsPage";
import { NamingGuidePage } from "@/pages/NamingGuidePage";

type TabKey = "explorer" | "lengths" | "naming";

const TABS: Array<{ id: TabKey; label: string }> = [
  { id: "explorer", label: "Explorer" },
  { id: "lengths", label: "Lengths" },
  { id: "naming", label: "Naming Guide" }
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("explorer");
  const [profileId, setProfileId] = useState("western_male_50");

  const currentProfile = useMemo(
    () => PROFILES.find((p) => p.id === profileId) ?? PROFILES[0],
    [profileId]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Dexterous Hand Design Reference
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Hand Anatomy Explorer v0.3</h1>
            <p className="mt-2 text-sm text-slate-400">
              Commit 1 foundation: React + TS + Vite + Tailwind + R3F + Zod
            </p>
          </div>
          <label className="flex min-w-64 flex-col gap-2 text-sm text-slate-300">
            Population Profile
            <select
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              aria-label="Population Profile"
            >
              {PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <nav className="mx-auto flex max-w-7xl gap-3 px-6 py-4">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm transition ${
              tab === item.id
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
            }`}
            onClick={() => setTab(item.id)}
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
