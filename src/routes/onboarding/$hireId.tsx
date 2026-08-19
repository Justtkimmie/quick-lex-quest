import { createFileRoute, Link } from "@tanstack/react-router";
import { PHASES, progress, useHires, type DocStatus } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/$hireId")({
  head: () => ({
    meta: [
      { title: "Joiner Checklist — Onboarding Tracker" },
      {
        name: "description",
        content:
          "Work through a single joiner's onboarding: phased task checklist, document status, owners and handover notes.",
      },
      { property: "og:title", content: "Joiner Checklist — Onboarding Tracker" },
      {
        property: "og:description",
        content: "Phased tasks, document status and notes for one new joiner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HireDetail,
});

const statusStyles: Record<DocStatus, string> = {
  outstanding: "bg-muted text-ink-soft",
  received: "bg-highlight text-ink",
  verified: "bg-primary text-primary-foreground",
};

function HireDetail() {
  const { hireId } = Route.useParams();
  const { hires, loaded, updateHire } = useHires();
  const hire = hires.find((h) => h.id === hireId);

  if (!loaded) return <main className="mx-auto max-w-4xl px-6 pt-12 text-ink-soft">Loading…</main>;

  if (!hire) {
    return (
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:px-8">
        <h1 className="text-3xl text-ink">Joiner not found</h1>
        <Link to="/onboarding" className="mt-4 inline-block text-sm font-semibold text-primary underline">
          Back to dashboard
        </Link>
      </main>
    );
  }

  const p = progress(hire);

  const toggleTask = (taskId: string) =>
    updateHire(hire.id, (h) => ({
      ...h,
      tasks: h.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    }));

  const cycleDoc = (docId: string) =>
    updateHire(hire.id, (h) => ({
      ...h,
      docs: h.docs.map((d) =>
        d.id === docId
          ? {
              ...d,
              status:
                d.status === "outstanding"
                  ? "received"
                  : d.status === "received"
                    ? "verified"
                    : "outstanding",
            }
          : d,
      ),
    }));

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:px-8">
      <Link to="/onboarding" className="eyebrow hover:text-ink">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">{hire.name}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {hire.role || "Role TBC"} · {hire.email || "no email"} · starts {hire.startDate || "TBC"} ·
        manager {hire.manager || "TBC"}
      </p>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary" style={{ width: `${p.percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        {p.tasksDone}/{p.tasksTotal} tasks complete · {p.docsDone}/{p.docsTotal} documents in
      </p>

      <section className="mt-12">
        <h2 className="text-3xl text-ink">Checklist</h2>
        <div className="mt-4 space-y-6">
          {PHASES.map((phase) => {
            const tasks = hire.tasks.filter((t) => t.phase === phase);
            if (!tasks.length) return null;
            return (
              <div key={phase} className="border-l-2 border-primary pl-5">
                <h3 className="text-xl text-ink">{phase}</h3>
                <ul className="mt-2 divide-y divide-rule">
                  {tasks.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 py-2.5">
                      <input
                        id={t.id}
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleTask(t.id)}
                        className="mt-1 h-4 w-4 accent-[oklch(0.36_0.075_165)]"
                      />
                      <label htmlFor={t.id} className="flex-1 cursor-pointer text-sm leading-relaxed">
                        <span className={t.done ? "text-ink-soft line-through" : "text-ink"}>
                          {t.label}
                        </span>
                        <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                          {t.owner}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl text-ink">Documents</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Click a status to cycle: outstanding → received → verified.
        </p>
        <div className="mt-4 overflow-hidden rounded-md border border-rule">
          {hire.docs.map((d, i) => (
            <div
              key={d.id}
              className={`flex items-center justify-between gap-4 px-5 py-3 ${
                i % 2 ? "bg-muted" : "bg-card"
              }`}
            >
              <span className="text-sm text-ink">{d.label}</span>
              <button
                onClick={() => cycleDoc(d.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${statusStyles[d.status]}`}
              >
                {d.status}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl text-ink">Notes</h2>
        <textarea
          value={hire.notes}
          onChange={(e) => updateHire(hire.id, (h) => ({ ...h, notes: e.target.value }))}
          rows={5}
          placeholder="Handover notes, blockers, agreed adjustments…"
          className="mt-3 w-full rounded-md border border-input bg-card px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:ring-2 focus:ring-ring"
        />
      </section>
    </main>
  );
}
