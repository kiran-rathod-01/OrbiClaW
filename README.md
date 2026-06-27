<div align="center">

```
 ██████╗ ██████╗ ██████╗ ██╗ ██████╗██╗      █████╗ ██╗    ██╗
██╔═══██╗██╔══██╗██╔══██╗██║██╔════╝██║     ██╔══██╗██║    ██║
██║   ██║██████╔╝██████╔╝██║██║     ██║     ███████║██║ █╗ ██║
██║   ██║██╔══██╗██╔══██╗██║██║     ██║     ██╔══██║██║███╗██║
╚██████╔╝██║  ██║██████╔╝██║╚██████╗███████╗██║  ██║╚███╔███╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝
```

**Your personal AI coding agent — run it from the terminal or control it via Telegram from anywhere.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![OpenRouter](https://img.shields.io/badge/LLM-OpenRouter-6C47FF?style=flat-square)](https://openrouter.ai)
[![Telegraf](https://img.shields.io/badge/Telegram-Telegraf-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://telegraf.js.org)

[Features](#-features) • [How It Works](#-how-it-works) • [Getting Started](#-getting-started) • [Usage](#-usage-guide) • [Architecture](#-architecture) • [Roadmap](#-future-improvements)

</div>

---

## 📸 Preview

> **CLI Mode** — interactive TUI with banner, mode selector, and approval flow

```
$ bun run index.ts wakeup
```
 ██████╗ ██████╗ ██████╗ ██╗ ██████╗██╗      █████╗ ██╗    ██╗
██╔═══██╗██╔══██╗██╔══██╗██║██╔════╝██║     ██╔══██╗██║    ██║
██║   ██║██████╔╝██████╔╝██║██║     ██║     ███████║██║ █╗ ██║
██║   ██║██╔══██╗██╔══██╗██║██║     ██║     ██╔══██║██║███╗██║
╚██████╔╝██║  ██║██████╔╝██║╚██████╗███████╗██║  ██║╚███╔███╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝
```

◆ Which mode you want to proceed with?
  ● CLI
  ○ Telegram
  ○ Exit

🤖 Agent Mode
◆ What would you like the agent to do?
  › Refactor all fetch calls to use a shared api client

  ✓ list_files      {"path":"src","recursive":true}
  ✓ read_file       {"path":"src/utils/fetch.ts"}
  ✓ create_file     {"path":"src/lib/api-client.ts"}
  ✓ modify_file     {"path":"src/hooks/useUser.ts"}
  ✓ modify_file     {"path":"src/hooks/usePosts.ts"}

◆ Apply staged changes?
  ● Approve and apply all
  ○ Review one by one       ← shows unified diff per file
  ○ Cancel

✓ Applied.
```

> **Telegram Mode** — same power, from your phone

```
You  → /plan add a dark mode toggle to the settings page

Bot  → 🧭 Generating a plan…

Bot  → 📋 Plan for: add a dark mode toggle to the settings page
       ✅ 1. Create useTheme hook [low]
       ✅ 2. Add toggle component [low]
       ✅ 3. Wire into Settings page [medium]
       ✅ 4. Persist preference to localStorage [low]

       [✅ Select All]  [⬜ Deselect All]
       [🚀 Proceed]

You  → (tap Proceed)

Bot  → 🚀 Executing 4 step(s)…

Bot  → Staged changes — review before applying
       📄 src/hooks/useTheme.ts (file_create)
       📄 src/components/ThemeToggle.tsx (file_create)
       📄 src/pages/Settings.tsx (file_modify)
       Total: 3 change(s)

       [📋 Show Diff]
       [✅ Accept All]  [❌ Reject All]

You  → (tap Show Diff, read the patch, tap Accept All)

Bot  → ✅ All changes applied.
```

---

## 🌟 Features

| | Feature | Description |
|---|---|---|
| 🤖 | **Autonomous Agent** | Give a goal in plain English; the AI loops through tools for up to 40 steps to complete it |
| ❓ | **Codebase Q&A** | Ask any question; the AI reads relevant files and answers with full context |
| 🧭 | **Plan & Execute** | AI researches your code, generates a structured plan with complexity ratings, you cherry-pick steps |
| 🔐 | **Stage-first safety** | Nothing ever touches disk until you explicitly approve — every mutation is staged in memory |
| 📋 | **Diff viewer** | See a full unified diff per file before approving, both in CLI and Telegram |
| 📱 | **Telegram control** | Full agent access from your phone via a private, owner-only Telegram bot |
| 🌐 | **Web research** | Optional Firecrawl integration for `web_search`, `web_crawl`, and `fetch_url` during planning |
| 🧰 | **Rich toolset** | Read files, search globs, analyze codebase structure, create/modify/delete files, run shell commands |
| 🎯 | **Skill-aware** | Reads `.cursor/rules` / `CLAUDE.md` skill files to follow your project conventions |
| 🔒 | **Owner-only bot** | Telegram bot guards every action with an `isOwner()` check — no one else can touch it |

---

## 🔧 How It Works

orbiclaw uses a **stage → review → apply** pipeline. The AI can never write directly to disk.

```
You give a goal (CLI prompt or Telegram command)
            │
            ▼
    ┌───────────────┐
    │  AI Agent     │  ToolLoopAgent runs up to 40 steps
    │  (LLM loop)   │  calling tools to explore & plan
    └───────┬───────┘
            │  tool calls
            ▼
    ┌───────────────┐
    │ ToolExecutor  │  read calls → execute immediately
    │               │  write calls → stage in memory only
    └───────┬───────┘
            │  staged actions
            ▼
    ┌───────────────┐
    │ ActionTracker │  every action logged with id, type,
    │               │  before/after snapshot, status=pending
    └───────┬───────┘
            │
            ▼
    ┌─────────────────────────────────┐
    │         Approval Flow           │
    │                                 │
    │  CLI:       interactive TUI     │
    │             diff per file       │
    │             accept / reject     │
    │                                 │
    │  Telegram:  inline keyboard     │
    │             Show Diff button    │
    │             Accept / Reject     │
    └──────────────┬──────────────────┘
                   │
          ┌────────┴────────┐
        Accept            Reject
          │                  │
    applyApproved()    clearStaging()
    writes to disk     nothing changes
```

### Three Modes

**❓ Ask Mode** — Read-only exploration. The AI searches and reads your files to answer questions. No mutations unless you ask to save the answer as a `.md` file.

**🤖 Agent Mode** — Autonomous coder. Give a goal; the agent reads the codebase, decides what to change, stages everything, then waits for your approval before writing a single byte.

**🧭 Plan Mode** — Think, then act. The AI first produces a structured, researched plan with step titles, descriptions, and complexity ratings. You toggle individual steps on/off before execution. All changes from all steps queue into one shared approval flow at the end.

---

## 📦 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Runtime | [Bun](https://bun.sh) | Fast TypeScript execution, no build step |
| Language | TypeScript 5 (strict ESM) | Type safety across the whole codebase |
| AI SDK | [Vercel AI SDK](https://sdk.vercel.ai) | `ToolLoopAgent` + `generateText` with structured output |
| LLM Provider | [OpenRouter](https://openrouter.ai) | Swap any model (Claude, GPT-4, Gemini) via a single env var |
| Telegram | [Telegraf](https://telegraf.js.org) | Bot framework with inline keyboard support |
| CLI Prompts | [@clack/prompts](https://github.com/natemoo-re/clack) | Beautiful interactive terminal UI |
| Diff Engine | [diff](https://www.npmjs.com/package/diff) | `createTwoFilesPatch` for unified diffs |
| Web Scraping | [Firecrawl](https://www.firecrawl.dev) | Web search, crawl, and URL fetch (optional) |
| Validation | [Zod](https://zod.dev) | Schema validation for AI-generated plan output |
| Terminal MD | marked + marked-terminal | Renders markdown beautifully in the terminal |
| Banner | [figlet](https://github.com/patorjk/figlet.js) + chalk | ASCII art logo with shadow effect |

---

## 🗂 Folder Structure

```
orbiclaw/
│
├── index.ts                        # Entry point — CLI via commander
│
├── tui/
│   ├── wakeup.ts                   # ASCII banner + CLI/Telegram mode selector
│   └── terminal-md.ts              # marked → terminal markdown renderer
│
├── ai/
│   └── ai.config.ts                # OpenRouter provider setup
│
└── modes/
    │
    ├── agent/                      # Core engine — shared by CLI & Telegram
    │   ├── action-tracker.ts       # Logs every action: id, type, status, snapshots
    │   ├── tool-executor.ts        # Routes tool calls to read or stage
    │   ├── agent-tools.ts          # Full tool definitions (read + write + shell)
    │   ├── approval.ts             # CLI interactive approval flow
    │   ├── diff-view.ts            # Unified diff composer
    │   └── types.ts                # ActionLog, AgentConfig, ActionStatus, ActionType
    │
    ├── plan/
    │   ├── planner.ts              # Generates structured Plan via Zod schema + AI
    │   ├── selection.ts            # CLI multi-select step picker
    │   ├── web-tool.ts             # Firecrawl tools: web_search, web_crawl, fetch_url
    │   └── types.ts                # Plan, PlanStep interfaces
    │
    ├── cli/
    │   └── orchestrator.ts         # Ask / Agent / Plan orchestrators for CLI
    │
    └── telegram/
        ├── index.ts                # Bot setup, launch, graceful SIGINT shutdown
        ├── handlers.ts             # All /commands and inline button action handlers
        ├── agent-run.ts            # runAsk / runAgent / runPlanSteps (Telegram-aware)
        ├── approval-session.ts     # Per-chat approval state + inline keyboard builder
        ├── plan-session.ts         # Per-chat plan state + step toggle keyboard
        ├── auth.ts                 # isOwner() — single-user security guard
        ├── constants.ts            # WELCOME message text
        └── text.ts                 # clip(), replyMd(), commandArg() helpers
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- An [OpenRouter](https://openrouter.ai) API key
- *(Telegram mode)* A bot token from [@BotFather](https://t.me/BotFather) and your numeric Telegram user ID
- *(Optional)* A [Firecrawl](https://www.firecrawl.dev) API key to enable web tools

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/kiran-rathod-01/OrbiClaW
cd orbiclaw

# 2. Install dependencies
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# ── Required ──────────────────────────────────────────
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3.5-sonnet

# ── Telegram mode (required if using Telegram) ────────
TELEGRAM_BOT_TOKEN=123456:ABC-your-bot-token
TELEGRAM_OWNER_ID=987654321          # your numeric Telegram user ID

# ── Optional: enables web_search / web_crawl / fetch_url
FIRECRAWL_API_KEY=fc-...
```

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | ✅ Always | Your OpenRouter API key |
| `OPENROUTER_DEFAULT_MODEL` | ✅ Always | Model string, e.g. `anthropic/claude-3.5-sonnet` |
| `TELEGRAM_BOT_TOKEN` | ✅ Telegram mode | Token from @BotFather |
| `TELEGRAM_OWNER_ID` | ✅ Telegram mode | Your Telegram numeric user ID |
| `FIRECRAWL_API_KEY` | ⚙️ Optional | Enables web search & crawl tools |

### Run

```bash
bun run index.ts wakeup
```

You'll see the orbiclaw banner. Pick **CLI** for the terminal experience or **Telegram** to launch the bot.

---

## 📖 Usage Guide

### CLI Mode

After choosing CLI, you'll get a second menu to pick a mode:

```
◆ Select a mode:
  ● Ask       — question answering (read-only)
  ○ Agent     — autonomous file editor
  ○ Plan      — structured multi-step execution
```

**Ask example:**
```bash
# Answers questions about your codebase
> What does the ActionTracker class do and where is it used?
```

**Agent example:**
```bash
# Describes a goal in plain English
> Add rate limiting middleware to all Express routes
```

**Plan example:**
```bash
# Generates a plan first, you select steps, then it executes
> Migrate the project from CommonJS to ESM
```

After any agent or plan run, you choose how to handle staged changes:
```
◆ Apply staged changes?
  ● Approve and apply all
  ○ Review one by one      ← shows a unified diff per file group
  ○ Cancel
```

### Telegram Mode

Start the bot, then message your private chat:

```
/ask  <question>    → codebase Q&A
/agent <goal>       → autonomous coding agent  
/plan  <goal>       → plan → step selection → execution
```

**Plan step selection** happens via inline buttons — tap to toggle steps on/off, then tap 🚀 Proceed.

**Approval** for file changes also happens inline — tap 📋 Show Diff first if you want to review, then ✅ Accept All or ❌ Reject All.

---

## 📡 Telegram Bot — Command Reference

| Command | Args | What it does |
|---|---|---|
| `/ask` | `<question>` | Searches and reads your codebase to answer the question |
| `/agent` | `<goal>` | Runs the full autonomous agent loop; prompts approval for changes |
| `/plan` | `<goal>` | Generates a researched, stepped plan with inline step toggles |

### Inline Button Actions

| Button | When it appears | What it does |
|---|---|---|
| `⬜/✅ Step N` | After `/plan` | Toggles that step in/out of the execution set |
| `✅ Select All` | After `/plan` | Selects all steps |
| `⬜ Deselect All` | After `/plan` | Deselects all steps |
| `🚀 Proceed` | After `/plan` | Starts executing the selected steps |
| `📋 Show Diff` | After agent/plan | Sends the full unified diff for all staged changes |
| `✅ Accept All` | After agent/plan | Applies every staged change to disk |
| `❌ Reject All` | After agent/plan | Discards everything; nothing is written |

---

## 🏗 Architecture — Data Flow Detail

### ActionLog lifecycle

Every action the AI attempts is recorded as an `ActionLog`:

```typescript
interface ActionLog {
  id: string;           // unique, e.g. "action_3"
  timestamp: Date;
  type: ActionType;     // file_create | file_modify | file_delete
                        // folder_create | tool_execute | code_analysis
  path: string;
  details: {
    before?: string;    // original file content (for diffs)
    after?: string;     // new file content
    command?: string;   // shell command (for tool_execute)
    error?: string;
  };
  status: ActionStatus; // pending → approved | rejected
  userApproved?: boolean;
}
```

### Tool availability by mode

| Tool | Ask | Agent | Plan |
|---|---|---|---|
| `read_file` | ✅ | ✅ | ✅ |
| `list_files` | ✅ | ✅ | ✅ |
| `search_files` | ✅ | ✅ | ✅ |
| `analyze_codebase` | ✅ | ✅ | ✅ |
| `create_file` | ❌ | ✅ | ✅ |
| `modify_file` | ❌ | ✅ | ✅ |
| `delete_file` | ❌ | ✅ | ✅ |
| `create_folder` | ❌ | ✅ | ✅ |
| `execute_shell` | ❌ | ✅ | ✅ |
| `web_search` | ✅* | ✅* | ✅* |
| `web_crawl` | ✅* | ✅* | ✅* |
| `list_skills` | ✅ | ✅ | ✅ |
| `read_skill` | ✅ | ✅ | ✅ |

*Requires `FIRECRAWL_API_KEY`

---

## 🧗 Challenges Faced

**1. Stateful approval across async Telegram callbacks**
The agent runs asynchronously and finishes before the user taps any button. Storing the `ActionTracker` and `ToolExecutor` instances in a per-chat `approvalSessions` Map bridged this — the callback handler retrieves the live objects and calls `applyApprovedFromTracker()` directly.

**2. Structured AI output for plan generation**
Getting the LLM to reliably return a valid, typed plan object required combining Vercel AI SDK's `Output.object()`, `extractJsonMiddleware`, and a Zod schema — not just prompting for JSON. Without the middleware, the model occasionally wrapped output in markdown fences.

**3. Accurate diff composition across multiple staged actions**
A single file can have multiple staged actions (e.g., create then modify in one session). `composeBeforeAfter()` has to sort actions by timestamp and correctly detect `file_create` (no `before`) vs `file_delete` (no `after`) to build a coherent patch.

**4. Dual-interface code sharing**
The core agent engine had to be completely interface-agnostic so the same `ToolExecutor` and `ActionTracker` work identically whether driven by a clack TUI or a Telegraf callback. This forced a clean separation between the engine layer (`modes/agent/`) and the presentation layer (`modes/cli/`, `modes/telegram/`).

**5. Preventing AI from writing directly**
The Vercel AI SDK's tool `execute` functions could theoretically write files inside their implementation. Enforcing the staging model required wrapping every mutation in `ToolExecutor` so the tool definitions in `agent-tools.ts` never touch `fs` directly.

---

## 💡 What I Learned

- **Agentic loop design** — how to structure a multi-step AI agent that can recover from partial tool failures without corrupting state
- **Tool schema design** — poorly described input schemas cause the LLM to guess wrong; precise Zod descriptions with examples dramatically improve tool call accuracy
- **Session state in stateless bots** — Telegram bots have no persistent connection; every callback is stateless, requiring explicit in-memory session management with Maps keyed by chat ID
- **Structured output vs. prompt engineering** — using SDK-level schema enforcement (`Output.object`) is far more reliable than asking the model to "respond in JSON"
- **Safe AI mutation patterns** — the stage/approve model is a transferable pattern for any AI system that modifies external state: never let the AI act directly, always route through an auditable intermediary
- **Dual-mode architecture** — designing the core engine to be UI-agnostic from day one (not as an afterthought) made adding the Telegram interface take hours instead of days

---

## 🔮 Future Improvements

- [ ] **Streaming responses** — stream agent output token-by-token to Telegram instead of sending one big message at the end
- [ ] **Per-file approval in Telegram** — currently Telegram only offers Accept All / Reject All; add per-file inline buttons matching the CLI experience  
- [ ] **Conversation memory** — persist chat history between sessions so the agent remembers context across multiple `/ask` or `/agent` calls
- [ ] **Git integration** — auto-commit approved changes with a generated commit message; show `git diff` instead of a raw patch
- [ ] **Multi-user support** — replace the single `TELEGRAM_OWNER_ID` guard with a whitelist or role-based access
- [ ] **Web UI** — a browser-based interface alongside CLI and Telegram, sharing the same core engine
- [ ] **Plugin system** — let users register custom tools (e.g., run tests, lint, deploy) that the agent can call during its loop
- [ ] **Undo** — keep a local snapshot store so any applied change can be rolled back with a single command
- [ ] **Cost tracking** — log token usage per session so you can monitor spend across OpenRouter models

---

## 👤 Author

**Kiran Ravi Rathod**
- GitHub: [@kiran-rathod-01](https://github.com/kiran-rathod-01)
- LinkedIn: [@Kiran Rathod](https://www.linkedin.com/in/kiran-rathod-1a3039320/)

---

If you find this project useful, consider giving it a ⭐ — it helps others discover it!
