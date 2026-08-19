import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Onboarding Resource Hub — Guides, Policies & Systems" },
      {
        name: "description",
        content:
          "Everything a new joiner needs in one place: policies, system guides, training links and who to ask for what during the first 30 days.",
      },
      { property: "og:title", content: "Onboarding Resource Hub" },
      {
        property: "og:description",
        content: "Policies, system guides, training and contacts for new joiners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

const groups = [
  {
    title: "Policies & compliance",
    items: [
      ["Employee handbook", "Working hours, leave, conduct and escalation routes"],
      ["Confidentiality & client data policy", "Read and acknowledge before system access"],
      ["Conflicts of interest procedure", "Declare prior engagements within week one"],
      ["Information security standard", "Device encryption, MFA and password manager"],
    ],
  },
  {
    title: "Systems & access",
    items: [
      ["SSO and MFA setup guide", "Enrol on day one before any other system"],
      ["Document management system", "Naming conventions and matter folders"],
      ["Time recording", "Daily entry rules and codes"],
      ["Research databases", "Access routes for treaty, case and commentary sources"],
    ],
  },
  {
    title: "Training",
    items: [
      ["Data protection module", "Mandatory, complete in week one"],
      ["Anti-money-laundering basics", "Mandatory for client-facing roles"],
      ["Internal drafting standards", "House style for memos and advice notes"],
      ["Research method: sprint strategy", "Time-boxed research technique used by the team"],
    ],
  },
  {
    title: "Who to ask",
    items: [
      ["HR — contracts, payroll, leave", "hr@firm.example"],
      ["IT service desk — access & hardware", "it@firm.example"],
      ["Compliance — conflicts, AML, data", "compliance@firm.example"],
      ["Your buddy — everything unwritten", "Assigned before day one"],
    ],
  },
];

function Resources() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:px-8">
      <p className="eyebrow">Internal tool · Onboarding</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Resource hub</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        The reference shelf for a new joiner's first thirty days. If something is asked twice, it
        belongs here.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {groups.map((g) => (
          <section key={g.title} className="paper rounded-md p-5">
            <h2 className="text-2xl text-ink">{g.title}</h2>
            <ul className="mt-4 space-y-3">
              {g.items.map(([label, detail]) => (
                <li key={label}>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{detail}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="paper mt-8 rounded-md p-5">
        <p className="eyebrow">Next step</p>
        <p className="mt-2 text-sm text-ink-soft">
          Track an individual joiner's checklist and documents on the{" "}
          <Link to="/onboarding" className="font-semibold text-primary underline underline-offset-2">
            onboarding dashboard
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
