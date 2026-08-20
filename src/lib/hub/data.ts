/** Mock data for the internal-tool onboarding hub. */

export type Team = { id: string; name: string };
export type Role = { id: string; name: string; teamId: string };

export type ToolCategory =
  | "Communication"
  | "Documentation"
  | "Engineering"
  | "Project tracking"
  | "Sales & CRM";

export type DocLink = { label: string; url: string };

export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  owner: string;
  ownerEmail: string;
  accessRequirements: string[];
  provisioningTime: string;
  docs: DocLink[];
  teams: string[];
  roles: string[];
  accent: string;
};

export type Step = {
  id: string;
  title: string;
  body: string;
  checklist: string[];
  estimate: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Quiz = { id: string; title: string; passMark: number; questions: Question[] };

export type Module = {
  id: string;
  toolId: string;
  title: string;
  summary: string;
  level: "Essential" | "Recommended" | "Advanced";
  dueInDays: number;
  status: "published" | "draft" | "archived";
  steps: Step[];
  quiz: Quiz;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  teamId: string;
  roleId: string;
  isAdmin: boolean;
  startDate: string;
};

export const TEAMS: Team[] = [
  { id: "eng", name: "Engineering" },
  { id: "rev", name: "Revenue" },
  { id: "ops", name: "People & Ops" },
];

export const ROLES: Role[] = [
  { id: "swe", name: "Software Engineer", teamId: "eng" },
  { id: "em", name: "Engineering Manager", teamId: "eng" },
  { id: "ae", name: "Account Executive", teamId: "rev" },
  { id: "pop", name: "People Operations", teamId: "ops" },
];

export const USERS: User[] = [
  {
    id: "u1",
    name: "Amara Ndlovu",
    email: "amara.ndlovu@company.example",
    avatar: "AN",
    teamId: "eng",
    roleId: "swe",
    isAdmin: false,
    startDate: "2026-08-17",
  },
  {
    id: "u2",
    name: "Jonas Weber",
    email: "jonas.weber@company.example",
    avatar: "JW",
    teamId: "rev",
    roleId: "ae",
    isAdmin: false,
    startDate: "2026-08-10",
  },
  {
    id: "u3",
    name: "Rhea Patel",
    email: "rhea.patel@company.example",
    avatar: "RP",
    teamId: "ops",
    roleId: "pop",
    isAdmin: true,
    startDate: "2025-02-03",
  },
];

export const TOOLS: Tool[] = [
  {
    id: "slack",
    name: "Slack",
    tagline: "Where day-to-day conversation happens",
    description:
      "Slack is the default channel for synchronous and lightly asynchronous conversation. Decisions that outlive the week get written up in Notion; everything else lives here.",
    category: "Communication",
    owner: "People & Ops — Rhea Patel",
    ownerEmail: "rhea.patel@company.example",
    accessRequirements: ["Company email (SSO)", "Device enrolled in MDM"],
    provisioningTime: "Automatic on day one",
    docs: [
      { label: "Channel naming conventions", url: "https://slack.com/help" },
      { label: "Notification etiquette", url: "https://slack.com/help" },
    ],
    teams: ["eng", "rev", "ops"],
    roles: ["swe", "em", "ae", "pop"],
    accent: "oklch(0.55 0.15 300)",
  },
  {
    id: "notion",
    name: "Notion",
    tagline: "The written record of how we work",
    description:
      "Notion holds specs, policies, runbooks and meeting notes. If a decision needs to be findable in six months, it belongs in a Notion page with an owner and a date.",
    category: "Documentation",
    owner: "People & Ops — Rhea Patel",
    ownerEmail: "rhea.patel@company.example",
    accessRequirements: ["Company email (SSO)", "Accepted confidentiality policy"],
    provisioningTime: "Automatic on day one",
    docs: [
      { label: "Workspace map", url: "https://notion.so/help" },
      { label: "Page template library", url: "https://notion.so/help" },
    ],
    teams: ["eng", "rev", "ops"],
    roles: ["swe", "em", "ae", "pop"],
    accent: "oklch(0.45 0.02 60)",
  },
  {
    id: "jira",
    name: "Jira",
    tagline: "Delivery tracking for product and engineering",
    description:
      "Jira tracks work in flight: epics, sprints and bugs. Every ticket carries an owner, an estimate and a definition of done before it enters a sprint.",
    category: "Project tracking",
    owner: "Engineering — Tomas Meyer",
    ownerEmail: "tomas.meyer@company.example",
    accessRequirements: ["Company email (SSO)", "Manager approval", "Assigned to a delivery squad"],
    provisioningTime: "1 business day",
    docs: [
      { label: "Ticket hygiene guide", url: "https://atlassian.com/software/jira/guides" },
      { label: "Sprint ceremonies", url: "https://atlassian.com/software/jira/guides" },
    ],
    teams: ["eng"],
    roles: ["swe", "em"],
    accent: "oklch(0.52 0.16 250)",
  },
  {
    id: "github",
    name: "GitHub",
    tagline: "Source control, review and deploys",
    description:
      "All production code lives in GitHub. Branch protection, required reviews and CI checks are enforced on every repository — nothing merges to main without a green build and one approval.",
    category: "Engineering",
    owner: "Engineering — Tomas Meyer",
    ownerEmail: "tomas.meyer@company.example",
    accessRequirements: [
      "Company email (SSO)",
      "Hardware security key enrolled",
      "Signed contributor agreement",
    ],
    provisioningTime: "1–2 business days",
    docs: [
      { label: "Branching and review policy", url: "https://docs.github.com" },
      { label: "Local environment setup", url: "https://docs.github.com" },
    ],
    teams: ["eng"],
    roles: ["swe", "em"],
    accent: "oklch(0.35 0.02 280)",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    tagline: "Pipeline, accounts and forecasting",
    description:
      "Salesforce is the single source of truth for customer records and revenue forecasting. Pipeline that is not in Salesforce does not exist for reporting purposes.",
    category: "Sales & CRM",
    owner: "Revenue — Lena Fischer",
    ownerEmail: "lena.fischer@company.example",
    accessRequirements: [
      "Company email (SSO)",
      "Revenue team membership",
      "Completed data-handling training",
    ],
    provisioningTime: "2–3 business days",
    docs: [
      { label: "Opportunity stage definitions", url: "https://help.salesforce.com" },
      { label: "Forecast submission rules", url: "https://help.salesforce.com" },
    ],
    teams: ["rev"],
    roles: ["ae"],
    accent: "oklch(0.6 0.13 235)",
  },
];

const step = (id: string, title: string, estimate: string, body: string, checklist: string[]): Step => ({
  id,
  title,
  estimate,
  body,
  checklist,
});

export const MODULES: Module[] = [
  {
    id: "m-slack",
    toolId: "slack",
    title: "Working in Slack",
    summary: "Channels, threads, status and the etiquette that keeps notifications survivable.",
    level: "Essential",
    dueInDays: 3,
    status: "published",
    steps: [
      step(
        "s-slack-1",
        "Set up your profile and notifications",
        "6 min",
        "Your profile is how colleagues find you across time zones. Set a full name, role, pronouns and working hours, then tune notifications so only direct mentions reach you outside those hours.",
        [
          "Add photo, role title and working hours",
          "Set notification schedule to your working day",
          "Mute channels you were auto-joined to but do not need",
        ],
      ),
      step(
        "s-slack-2",
        "Join the right channels",
        "5 min",
        "Channels follow a naming convention: #team-*, #proj-*, #help-* and #social-*. Join your team channel, your squad's project channel and the help channels for the tools you use.",
        [
          "Join #team-<your team>",
          "Join at least one #help-* channel",
          "Post a short introduction in your team channel",
        ],
      ),
      step(
        "s-slack-3",
        "Thread, don't flood",
        "4 min",
        "Replies belong in threads. Use 'also send to channel' only when the update genuinely concerns everyone. Anything that needs a decision gets a summary message once the thread resolves.",
        ["Reply in a thread", "Summarise one resolved thread back to the channel"],
      ),
    ],
    quiz: {
      id: "q-slack",
      title: "Slack essentials",
      passMark: 2,
      questions: [
        {
          id: "q-slack-1",
          prompt: "Where should a long back-and-forth on a channel message happen?",
          options: ["In a new channel message", "In a thread", "In a DM to everyone", "In Notion"],
          answerIndex: 1,
          explanation: "Threads keep channels readable and preserve context next to the original message.",
        },
        {
          id: "q-slack-2",
          prompt: "Which prefix marks a project channel?",
          options: ["#team-", "#proj-", "#help-", "#social-"],
          answerIndex: 1,
          explanation: "#proj-* is reserved for time-boxed project work.",
        },
        {
          id: "q-slack-3",
          prompt: "A thread reaches a decision. What happens next?",
          options: [
            "Nothing, it is in the thread",
            "DM the decision to your manager",
            "Post a short summary to the channel",
            "Delete the thread",
          ],
          answerIndex: 2,
          explanation: "A channel-level summary makes the outcome findable without reading the thread.",
        },
      ],
    },
  },
  {
    id: "m-notion",
    toolId: "notion",
    title: "Documenting in Notion",
    summary: "Where things live, how pages are named and what a good doc looks like.",
    level: "Essential",
    dueInDays: 5,
    status: "published",
    steps: [
      step(
        "s-notion-1",
        "Learn the workspace map",
        "7 min",
        "The workspace has four top-level areas: Company, Teams, Projects and Archive. Nothing is created outside these. Personal scratch pages live in your private area until they are ready to share.",
        ["Open each top-level area", "Bookmark your team's home page"],
      ),
      step(
        "s-notion-2",
        "Write your first doc from a template",
        "10 min",
        "Every shared page starts from a template so it carries an owner, a status and a review date. Use the Decision Record template for anything that changes how a team works.",
        ["Duplicate the Decision Record template", "Fill in owner, status and review date", "Share with your team"],
      ),
    ],
    quiz: {
      id: "q-notion",
      title: "Notion essentials",
      passMark: 2,
      questions: [
        {
          id: "q-notion-1",
          prompt: "What must every shared Notion page carry?",
          options: ["A cover image", "An owner, status and review date", "A table of contents", "A comment"],
          answerIndex: 1,
          explanation: "Ownership and a review date are what stop the workspace from rotting.",
        },
        {
          id: "q-notion-2",
          prompt: "Where does a half-finished draft belong?",
          options: ["Company area", "Your private area", "Archive", "Projects"],
          answerIndex: 1,
          explanation: "Drafts stay private until they are ready to be shared.",
        },
      ],
    },
  },
  {
    id: "m-jira",
    toolId: "jira",
    title: "Running work through Jira",
    summary: "Ticket anatomy, sprint flow and what 'done' means here.",
    level: "Essential",
    dueInDays: 7,
    status: "published",
    steps: [
      step(
        "s-jira-1",
        "Anatomy of a good ticket",
        "8 min",
        "A ticket needs a user-facing title, acceptance criteria, an estimate and a single owner. Tickets without acceptance criteria are rejected at sprint planning.",
        ["Open a recent ticket in your squad", "Write one ticket with acceptance criteria"],
      ),
      step(
        "s-jira-2",
        "The sprint board",
        "6 min",
        "Columns are Backlog, Ready, In progress, In review and Done. Work moves one column at a time and you pull rather than push — never assign work to someone else's In progress column.",
        ["Move one ticket across a column", "Attend or watch a recorded standup"],
      ),
    ],
    quiz: {
      id: "q-jira",
      title: "Jira essentials",
      passMark: 2,
      questions: [
        {
          id: "q-jira-1",
          prompt: "What gets a ticket rejected at sprint planning?",
          options: ["No estimate label", "No acceptance criteria", "Too few comments", "No epic colour"],
          answerIndex: 1,
          explanation: "Acceptance criteria define done; without them the ticket cannot be sized.",
        },
        {
          id: "q-jira-2",
          prompt: "How does work move on the board?",
          options: ["Pushed by the manager", "Pulled by the owner", "Randomly", "Only at retro"],
          answerIndex: 1,
          explanation: "Engineers pull the next ready item rather than having work pushed onto them.",
        },
      ],
    },
  },
  {
    id: "m-github",
    toolId: "github",
    title: "Shipping code with GitHub",
    summary: "Access, branch protection, review expectations and CI.",
    level: "Essential",
    dueInDays: 7,
    status: "published",
    steps: [
      step(
        "s-github-1",
        "Get access safely",
        "10 min",
        "Access is granted through SSO with a hardware security key. Personal access tokens are short-lived and scoped; long-lived tokens are a policy violation.",
        ["Enrol a hardware key", "Confirm SSO on your org membership", "Clone one repository"],
      ),
      step(
        "s-github-2",
        "Open your first pull request",
        "12 min",
        "Branch from main, keep the diff under roughly 400 lines, write a description that explains the why, and request one reviewer. CI must be green before merge.",
        ["Open a draft PR", "Request one reviewer", "Watch CI run to completion"],
      ),
      step(
        "s-github-3",
        "Review someone else's code",
        "8 min",
        "Reviews are for correctness, clarity and risk — not style, which the formatter owns. Leave at most three blocking comments; anything else is a suggestion.",
        ["Review one open PR", "Distinguish blocking from non-blocking comments"],
      ),
    ],
    quiz: {
      id: "q-github",
      title: "GitHub essentials",
      passMark: 2,
      questions: [
        {
          id: "q-github-1",
          prompt: "What is required before a merge to main?",
          options: ["A green CI run and one approval", "Manager sign-off", "A Jira epic", "Two days' notice"],
          answerIndex: 0,
          explanation: "Branch protection enforces CI plus at least one approving review.",
        },
        {
          id: "q-github-2",
          prompt: "Which is a policy violation?",
          options: ["A draft PR", "A 300-line diff", "A long-lived personal access token", "A suggestion comment"],
          answerIndex: 2,
          explanation: "Tokens must be short-lived and narrowly scoped.",
        },
      ],
    },
  },
  {
    id: "m-salesforce",
    toolId: "salesforce",
    title: "Selling with Salesforce",
    summary: "Account hygiene, stage definitions and forecast discipline.",
    level: "Essential",
    dueInDays: 5,
    status: "published",
    steps: [
      step(
        "s-sf-1",
        "Accounts, contacts and opportunities",
        "9 min",
        "An opportunity always hangs off an account with at least one named contact. Duplicate accounts are merged weekly, so search before you create.",
        ["Search before creating an account", "Create one opportunity with a named contact"],
      ),
      step(
        "s-sf-2",
        "Stage definitions and forecast categories",
        "10 min",
        "Stages are evidence-based: a deal only moves to Proposal when a written proposal has been sent. Forecast categories are set by stage and may not be overridden without manager approval.",
        ["Read the stage definition table", "Set a close date and forecast category"],
      ),
    ],
    quiz: {
      id: "q-sf",
      title: "Salesforce essentials",
      passMark: 2,
      questions: [
        {
          id: "q-sf-1",
          prompt: "When can a deal move to the Proposal stage?",
          options: [
            "When the buyer sounds keen",
            "When a written proposal has been sent",
            "At the start of the quarter",
            "When the manager says so",
          ],
          answerIndex: 1,
          explanation: "Stages are evidence-based, not sentiment-based.",
        },
        {
          id: "q-sf-2",
          prompt: "What should you do before creating a new account?",
          options: ["Search for an existing one", "Email the owner", "Create a task", "Nothing"],
          answerIndex: 0,
          explanation: "Duplicates are merged weekly, so search first.",
        },
      ],
    },
  },
];

export const CATEGORIES: ToolCategory[] = [
  "Communication",
  "Documentation",
  "Engineering",
  "Project tracking",
  "Sales & CRM",
];

export const teamName = (id: string) => TEAMS.find((t) => t.id === id)?.name ?? "—";
export const roleName = (id: string) => ROLES.find((r) => r.id === id)?.name ?? "—";
export const getTool = (id: string) => TOOLS.find((t) => t.id === id);
export const modulesForTool = (toolId: string) => MODULES.filter((m) => m.toolId === toolId);

/** Tools assigned to a user, based on their team and role. */
export function toolsForUser(user: User): Tool[] {
  return TOOLS.filter((t) => t.teams.includes(user.teamId) && t.roles.includes(user.roleId));
}

export function modulesForUser(user: User): Module[] {
  const ids = new Set(toolsForUser(user).map((t) => t.id));
  return MODULES.filter((m) => m.status === "published" && ids.has(m.toolId));
}

export function dueDate(user: User, m: Module): Date {
  const start = new Date(`${user.startDate}T00:00:00`);
  start.setDate(start.getDate() + m.dueInDays);
  return start;
}
