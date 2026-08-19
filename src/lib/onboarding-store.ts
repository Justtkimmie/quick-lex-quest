import { useCallback, useEffect, useState } from "react";

export type TaskPhase = "Pre-start" | "Day one" | "Week one" | "First 30 days";
export type DocStatus = "outstanding" | "received" | "verified";

export type Task = { id: string; label: string; phase: TaskPhase; owner: string; done: boolean };
export type Doc = { id: string; label: string; status: DocStatus };

export type Hire = {
  id: string;
  name: string;
  role: string;
  email: string;
  startDate: string;
  manager: string;
  tasks: Task[];
  docs: Doc[];
  notes: string;
};

const STORAGE_KEY = "onboarding.hires.v1";

const uid = () => Math.random().toString(36).slice(2, 10);

export const TASK_TEMPLATE: Omit<Task, "id" | "done">[] = [
  { label: "Send offer letter and contract for signature", phase: "Pre-start", owner: "HR" },
  { label: "Right-to-work and ID verification", phase: "Pre-start", owner: "HR" },
  { label: "Order laptop, phone and access card", phase: "Pre-start", owner: "IT" },
  { label: "Create email, SSO and directory account", phase: "Pre-start", owner: "IT" },
  { label: "Assign a buddy and notify the team", phase: "Pre-start", owner: "Manager" },
  { label: "Welcome, workspace tour and equipment handover", phase: "Day one", owner: "Manager" },
  { label: "Payroll, tax and benefits enrolment", phase: "Day one", owner: "HR" },
  { label: "Security, confidentiality and data-protection briefing", phase: "Day one", owner: "Compliance" },
  { label: "Access to core systems and shared drives", phase: "Day one", owner: "IT" },
  { label: "Role expectations and 90-day goals set", phase: "Week one", owner: "Manager" },
  { label: "Team introductions and stakeholder map", phase: "Week one", owner: "Buddy" },
  { label: "Complete required compliance training", phase: "Week one", owner: "Compliance" },
  { label: "First deliverable assigned and reviewed", phase: "Week one", owner: "Manager" },
  { label: "30-day check-in and feedback session", phase: "First 30 days", owner: "Manager" },
  { label: "Probation objectives confirmed in writing", phase: "First 30 days", owner: "HR" },
];

export const DOC_TEMPLATE: string[] = [
  "Signed employment contract",
  "Photo ID / passport",
  "Right-to-work evidence",
  "Tax registration form",
  "Bank details for payroll",
  "Emergency contact form",
  "Signed NDA / confidentiality undertaking",
  "Policy handbook acknowledgement",
];

export const PHASES: TaskPhase[] = ["Pre-start", "Day one", "Week one", "First 30 days"];

export function makeHire(input: {
  name: string;
  role: string;
  email: string;
  startDate: string;
  manager: string;
}): Hire {
  return {
    id: uid(),
    ...input,
    tasks: TASK_TEMPLATE.map((t) => ({ ...t, id: uid(), done: false })),
    docs: DOC_TEMPLATE.map((label) => ({ id: uid(), label, status: "outstanding" as DocStatus })),
    notes: "",
  };
}

function seed(): Hire[] {
  const a = makeHire({
    name: "Amara Ndlovu",
    role: "Associate, Cross-border Trade",
    email: "amara.ndlovu@firm.example",
    startDate: "2026-09-01",
    manager: "T. Meyer",
  });
  a.tasks = a.tasks.map((t, i) => ({ ...t, done: i < 6 }));
  a.docs = a.docs.map((d, i) => ({ ...d, status: i < 3 ? "verified" : i < 5 ? "received" : "outstanding" }));

  const b = makeHire({
    name: "Jonas Weber",
    role: "Paralegal",
    email: "jonas.weber@firm.example",
    startDate: "2026-09-15",
    manager: "R. Patel",
  });
  b.tasks = b.tasks.map((t, i) => ({ ...t, done: i < 2 }));
  b.docs = b.docs.map((d, i) => ({ ...d, status: i < 2 ? "received" : "outstanding" }));

  return [a, b];
}

export function useHires() {
  const [hires, setHires] = useState<Hire[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setHires(raw ? (JSON.parse(raw) as Hire[]) : seed());
    } catch {
      setHires(seed());
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(hires));
  }, [hires, loaded]);

  const addHire = useCallback((h: Hire) => setHires((p) => [...p, h]), []);
  const removeHire = useCallback((id: string) => setHires((p) => p.filter((h) => h.id !== id)), []);
  const updateHire = useCallback(
    (id: string, fn: (h: Hire) => Hire) => setHires((p) => p.map((h) => (h.id === id ? fn(h) : h))),
    [],
  );

  return { hires, loaded, addHire, removeHire, updateHire };
}

export const progress = (h: Hire) => ({
  tasksDone: h.tasks.filter((t) => t.done).length,
  tasksTotal: h.tasks.length,
  docsDone: h.docs.filter((d) => d.status !== "outstanding").length,
  docsTotal: h.docs.length,
  percent: h.tasks.length
    ? Math.round((h.tasks.filter((t) => t.done).length / h.tasks.length) * 100)
    : 0,
});
