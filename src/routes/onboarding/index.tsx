import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  daysUntilStart,
  downloadCsv,
  hiresToCsv,
  hireStatus,
  makeHire,
  progress,
  STATUS_LABEL,
  useHires,
  type HireStatus,
} from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "Employee Onboarding Dashboard — Checklists & Documents" },
      {
        name: "description",
        content:
          "Track every new joiner in one place: templated onboarding checklists, outstanding documents, owners, start-date countdowns and at-risk flags.",
      },
      { property: "og:title", content: "Employee Onboarding Dashboard" },
      {
        property: "og:description",
        content: "Checklist progress, document status, risk flags and owners for every new joiner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const statusStyles: Record<HireStatus, string> = {
  "on-track": "bg-secondary text-secondary-foreground",
  "at-risk": "bg-highlight text-ink",
  overdue: "bg-destructive text-destructive-foreground",
  complete: "bg-primary text-primary-foreground",
};

const countdown = (startDate: string) => {
  const d = daysUntilStart(startDate);
  if (d === null) return "start date TBC";
  if (d === 0) return "starts today";
  if (d > 0) return `starts in ${d} day${d === 1 ? "" : "s"}`;
  return `started ${Math.abs(d)} day${Math.abs(d) === 1 ? "" : "s"} ago`;
};

type Filter = "all" | HireStatus;
const FILTERS: Filter[] = ["all", "at-risk", "overdue", "on-track", "complete"];

function Dashboard() {
  const { hires, loaded, addHire, removeHire } = useHires();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    startDate: "",
    manager: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addHire(makeHire(form));
    setForm({ name: "", role: "", email: "", startDate: "", manager: "" });
    setOpen(false);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hires
      .filter((h) => (filter === "all" ? true : hireStatus(h) === filter))
      .filter((h) =>
        q
          ? [h.name, h.role, h.manager, h.email].some((v) => v.toLowerCase().includes(q))
          : true,
      )
      .sort((a, b) => (a.startDate || "9999").localeCompare(b.startDate || "9999"));
  }, [hires, query, filter]);

  const totalTasks = hires.reduce((n, h) => n + h.tasks.length, 0);
  const doneTasks = hires.reduce((n, h) => n + h.tasks.filter((t) => t.done).length, 0);
  const outstandingDocs = hires.reduce(
    (n, h) => n + h.docs.filter((d) => d.status === "outstanding").length,
    0,
  );
  const needsAttention = hires.filter((h) => ["at-risk", "overdue"].includes(hireStatus(h))).length;

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 sm:px-8">
      <p className="eyebrow">Internal tool · People operations</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Onboarding dashboard</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Every new joiner runs the same fifteen-step checklist and eight-document pack. Joiners are
        sorted by start date and flagged when pre-start work is running late. Data is stored locally
        in this browser.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-4">
        {[
          ["In progress", String(hires.length)],
          ["Tasks complete", `${doneTasks}/${totalTasks}`],
          ["Docs outstanding", String(outstandingDocs)],
          ["Needs attention", String(needsAttention)],
        ].map(([k, v]) => (
          <div key={k} className="bg-card px-4 py-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="no-print mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl text-ink">New joiners</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadCsv("onboarding-status.csv", hiresToCsv(hires))}
            disabled={!hires.length}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-muted disabled:opacity-40"
          >
            Export CSV
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {open ? "Cancel" : "Add joiner"}
          </button>
        </div>
      </div>

      <div className="no-print mt-4 flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role or manager…"
          className="min-w-56 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-rule bg-card text-ink-soft hover:text-ink"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <form onSubmit={submit} className="paper mt-4 grid gap-3 rounded-md p-5 sm:grid-cols-2">
          {(
            [
              ["name", "Full name", "text"],
              ["role", "Role", "text"],
              ["email", "Work email", "email"],
              ["startDate", "Start date", "date"],
              ["manager", "Manager", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <label key={key} className="block text-sm">
              <span className="eyebrow">{label}</span>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          ))}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Create checklist
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-3">
        {loaded && hires.length === 0 && (
          <p className="paper rounded-md p-5 text-sm text-ink-soft">
            No joiners tracked yet. Add one to generate their checklist and document pack.
          </p>
        )}
        {loaded && hires.length > 0 && visible.length === 0 && (
          <p className="paper rounded-md p-5 text-sm text-ink-soft">
            No joiners match this search or filter.
          </p>
        )}
        {visible.map((h) => {
          const p = progress(h);
          const status = hireStatus(h);
          const missingDocs = h.docs.filter((d) => d.status === "outstanding").length;
          return (
            <article key={h.id} className="paper lift rounded-md p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl text-ink">{h.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[status]}`}
                    >
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {h.role || "Role TBC"} · {countdown(h.startDate)} · manager {h.manager || "TBC"}
                  </p>
                </div>
                <div className="no-print flex items-center gap-2">
                  <Link
                    to="/onboarding/$hireId"
                    params={{ hireId: h.id }}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-muted"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => removeHire(h.id)}
                    className="rounded-md px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-[width] duration-500"
                  style={{ width: `${p.percent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                {p.percent}% · {p.tasksDone}/{p.tasksTotal} tasks · {p.docsDone}/{p.docsTotal}{" "}
                documents received
                {missingDocs > 0 && ` · ${missingDocs} outstanding`}
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-ink-soft">
        Reference material lives in the{" "}
        <Link to="/resources" className="font-semibold text-primary underline underline-offset-2">
          resource hub
        </Link>
        .
      </p>
    </main>
  );
}
