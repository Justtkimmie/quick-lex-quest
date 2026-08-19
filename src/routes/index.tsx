import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sprint Research Strategy for International Commercial Law" },
      {
        name: "description",
        content:
          "A time-boxed research strategy for international commercial law: 25-minute sprints, source hierarchy, triage rules and a note system for finding key information fast.",
      },
      { property: "og:title", content: "Sprint Research Strategy for International Commercial Law" },
      {
        property: "og:description",
        content:
          "Work through treaties, arbitral awards and doctrine in short blocks with a repeatable triage, capture and retrieval system.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sprints = [
  {
    length: "15 min",
    name: "Scoping sprint",
    goal: "Turn a vague question into a searchable one",
    steps: [
      "Write the issue as: [party/transaction] + [legal question] + [governing regime].",
      "List the 3 candidate regimes (e.g. CISG, Incoterms 2020, UNIDROIT Principles, NY Convention).",
      "Draft 5 search strings, including one in a second language if the forum is civil-law.",
    ],
  },
  {
    length: "25 min",
    name: "Source-mapping sprint",
    goal: "Build the shelf before you read anything",
    steps: [
      "Collect only citations, never prose: treaty article, case/award number, commentary paragraph.",
      "Tag each hit with tier (primary / interpretive / secondary) and jurisdiction.",
      "Stop at 10 items. Excess sources are a scoping failure, not diligence.",
    ],
  },
  {
    length: "25 min",
    name: "Deep-read sprint",
    goal: "One source, read properly",
    steps: [
      "Read the holding/article first, then the reasoning, then the facts — in that order.",
      "Extract one rule sentence and one authority quote (max 40 words).",
      "Note the counter-authority the source itself concedes.",
    ],
  },
  {
    length: "10 min",
    name: "Synthesis sprint",
    goal: "Convert notes into an argument",
    steps: [
      "Merge new rule sentences into the running issue outline.",
      "Mark each proposition: settled / contested / unsupported.",
      "Write the single next question at the top of tomorrow's block.",
    ],
  },
];

const hierarchy = [
  {
    tier: "Tier 1 — Binding text",
    items: [
      "Conventions and treaties (CISG, New York Convention, Hague Choice of Court)",
      "Applicable national commercial codes and implementing statutes",
      "The contract itself: choice of law, forum, Incoterm, hardship clauses",
    ],
  },
  {
    tier: "Tier 2 — Interpretive authority",
    items: [
      "Arbitral awards (ICC, LCIA, SCC digests) and national case law on the same instrument",
      "UNCITRAL CLOUT digests and the CISG-online / Pace databases",
      "Travaux préparatoires and model-law guides to enactment",
    ],
  },
  {
    tier: "Tier 3 — Persuasive commentary",
    items: [
      "Article-by-article commentaries (Schlechtriem & Schwenzer, Born on arbitration)",
      "Peer-reviewed journals and law-firm cross-border practice notes",
      "Institutional soft law: UNIDROIT Principles, ICC rules and guidance",
    ],
  },
];

const triage = [
  {
    rule: "The 90-second test",
    body: "Read title, headnote/abstract, and the first line of the holding. If none names your instrument or issue, close it. No source earns a second minute on hope.",
  },
  {
    rule: "Search inside the document, not around it",
    body: "Ctrl+F the article number, the defining term (\"fundamental breach\", \"seat\", \"public policy\") and the negation (\"however\", \"unless\", \"save that\"). Exceptions carry the law.",
  },
  {
    rule: "Read backwards",
    body: "Start with conclusions, dispositif, or the commentary's summary box. Reasoning is only worth reading once you know it points your way.",
  },
  {
    rule: "Follow one citation deep, not ten wide",
    body: "Take the single most-cited authority a source relies on. Depth beats breadth when time is fragmented.",
  },
  {
    rule: "Date and jurisdiction gate",
    body: "Filter before reading: post-amendment only, and only forums whose decisions your tribunal would actually weigh.",
  },
];

const capture = [
  {
    field: "Citation",
    detail: "Full, final, formatted at capture time — never \"fix later\".",
  },
  { field: "Tier", detail: "1 binding / 2 interpretive / 3 persuasive." },
  { field: "Issue tag", detail: "One controlled tag: #formation #passing-of-risk #enforcement #jurisdiction." },
  { field: "Rule sentence", detail: "Your own words, one sentence, usable in a memo unedited." },
  { field: "Quote", detail: "Max 40 words with pinpoint paragraph or article number." },
  { field: "Strength", detail: "Settled / contested / outlier — decides how hard you can argue it." },
  { field: "Next move", detail: "The one follow-up this source created, or \"closed\"." },
];

const week = [
  { day: "Mon", block: "Scoping + source mapping", out: "Ten-item shelf, tagged" },
  { day: "Tue", block: "Two deep reads (Tier 1)", out: "Two rule sentences" },
  { day: "Wed", block: "Two deep reads (Tier 2)", out: "Counter-authority list" },
  { day: "Thu", block: "One deep read + synthesis", out: "Outline with strength marks" },
  { day: "Fri", block: "Gap sprint", out: "Unsupported propositions resolved or flagged" },
  { day: "Weekend", block: "15-min review", out: "Next week's single question" },
];

function Index() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-8">
      <header className="border-b border-rule pb-10">
        <p className="eyebrow">Research method · International commercial law</p>
        <h1 className="mt-4 text-5xl leading-[1.05] text-ink sm:text-6xl">
          A <span className="marker">sprint-based</span> research strategy for fragmented time
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
          Built for research done in 10–25 minute blocks between other work. Every block has one
          output, every source passes one triage test, and every note is written so that the next
          block can start cold without re-reading anything.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-4">
          {[
            ["Block length", "10–25 min"],
            ["Sources per shelf", "Max 10"],
            ["Triage window", "90 sec"],
            ["Output per block", "Exactly 1"],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-4 py-3">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 font-display text-xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section n="01" title="The four sprint types">
        <p className="text-ink-soft">
          Never open a database without knowing which sprint you are running. Mixing them is what
          turns twenty minutes into nothing.
        </p>
        <div className="mt-6 space-y-4">
          {sprints.map((s) => (
            <article key={s.name} className="paper rounded-md p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl text-ink">{s.name}</h3>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {s.length}
                </span>
              </div>
              <p className="mt-1 text-sm italic text-ink-soft">{s.goal}</p>
              <ol className="mt-4 space-y-2">
                {s.steps.map((st, i) => (
                  <li key={st} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span className="font-display text-lg leading-none text-accent">{i + 1}</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section n="02" title="Source hierarchy: always descend">
        <p className="text-ink-soft">
          Work strictly downward. Commentary read before the instrument distorts how you read the
          instrument.
        </p>
        <div className="mt-6 space-y-6">
          {hierarchy.map((h) => (
            <div key={h.tier} className="border-l-2 border-primary pl-5">
              <h3 className="text-xl text-ink">{h.tier}</h3>
              <ul className="mt-2 space-y-1.5">
                {h.items.map((i) => (
                  <li key={i} className="text-sm leading-relaxed text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section n="03" title="Finding key information fast">
        <div className="mt-2 divide-y divide-rule border-y border-rule">
          {triage.map((t) => (
            <div key={t.rule} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="text-lg text-ink">{t.rule}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="paper mt-6 rounded-md p-5">
          <p className="eyebrow">Search syntax worth memorising</p>
          <ul className="mt-3 space-y-1.5 font-mono text-xs leading-relaxed text-ink">
            <li>"CISG" "art. 79" force majeure -blog site:uncitral.org</li>
            <li>"fundamental breach" AND (avoidance OR termination) date:2015-2026</li>
            <li>"public policy" /s "New York Convention" /p refus!  (Boolean databases)</li>
          </ul>
        </div>
      </Section>

      <Section n="04" title="One note format, seven fields">
        <p className="text-ink-soft">
          Same template every time. Fixed fields are what make notes searchable months later and
          let a cold restart take thirty seconds.
        </p>
        <dl className="mt-6 overflow-hidden rounded-md border border-rule">
          {capture.map((c, i) => (
            <div
              key={c.field}
              className={`grid gap-1 px-5 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6 ${
                i % 2 ? "bg-muted" : "bg-card"
              }`}
            >
              <dt className="font-semibold text-sm text-ink">{c.field}</dt>
              <dd className="text-sm leading-relaxed text-ink-soft">{c.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-ink-soft">
          Store notes in one flat folder with filenames as{" "}
          <span className="font-mono text-xs text-ink">tier-issue-shortcite.md</span>. Folders
          hide things; tags and filenames surface them.
        </p>
      </Section>

      <Section n="05" title="A week of small blocks">
        <div className="mt-2 overflow-hidden rounded-md border border-rule">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-2 font-semibold">Day</th>
                <th className="px-4 py-2 font-semibold">Block</th>
                <th className="px-4 py-2 font-semibold">Required output</th>
              </tr>
            </thead>
            <tbody>
              {week.map((w, i) => (
                <tr key={w.day} className={i % 2 ? "bg-muted" : "bg-card"}>
                  <td className="px-4 py-2.5 font-semibold text-ink">{w.day}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{w.block}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{w.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section n="06" title="Stop rules">
        <ul className="mt-2 space-y-3">
          {[
            "Three sources agreeing on the same rule closes the point. Move on.",
            "If a block ends with no note, the question was too broad — re-scope, don't retry.",
            "Never end a block mid-source without writing the rule sentence, even a rough one.",
            "Anything still unsupported by Friday becomes an explicit caveat, not more searching.",
          ].map((s) => (
            <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <footer className="mt-16 border-t border-rule pt-6 text-xs text-ink-soft">
        Adapt the sprint lengths to your calendar, but keep the rule of one output per block.
      </footer>
    </main>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl text-accent">{n}</span>
        <h2 className="text-3xl text-ink">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
