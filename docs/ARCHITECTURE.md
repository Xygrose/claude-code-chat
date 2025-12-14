# Architecture: The Control Room

## Core Design Principle

**Wrap, don't replace.** We're building a superior UI layer on top of Claude Code CLI. All actual AI functionality comes from the CLI - we just orchestrate and display it better.

---

## Component Architecture

### 1. Agent Process Manager

Each agent is a separate CLI process:

```typescript
interface Agent {
  id: string;
  name: string;
  process: ChildProcess;
  sessionId: string | null;
  status: 'idle' | 'running' | 'completed' | 'error';
  workingDir: string;
  output: Message[];
  cost: number;
  startedAt: number;
}

class AgentPool {
  private agents: Map<string, Agent> = new Map();

  spawn(config: AgentConfig): Agent { }
  stop(agentId: string): void { }
  resume(agentId: string, prompt: string): void { }
  getAll(): Agent[] { }
}
```

### 2. Stream Parser

Claude CLI with `--output-format stream-json` emits newline-delimited JSON:

```typescript
class StreamParser {
  private buffer: string = '';

  feed(chunk: Buffer): Message[] {
    this.buffer += chunk.toString();
    const messages: Message[] = [];
    
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || ''; // Keep incomplete line
    
    for (const line of lines) {
      if (line.trim()) {
        messages.push(JSON.parse(line));
      }
    }
    return messages;
  }
}
```

### 3. IPC Message Types

```typescript
// Extension → Webview
type ToWebview =
  | { type: 'agent:created'; agent: AgentSummary }
  | { type: 'agent:output'; agentId: string; message: Message }
  | { type: 'agent:status'; agentId: string; status: AgentStatus }
  | { type: 'agent:cost'; agentId: string; cost: number }
  | { type: 'agents:sync'; agents: AgentSummary[] };

// Webview → Extension
type ToExtension =
  | { type: 'agent:create'; config: AgentConfig }
  | { type: 'agent:stop'; agentId: string }
  | { type: 'agent:prompt'; agentId: string; prompt: string }
  | { type: 'agent:approve'; agentId: string; toolId: string; approved: boolean };
```

---

## UI Layout Concept

```
┌────────────────────────────────────────────────────────────────────┐
│  THE CONTROL ROOM                              [+ New Agent] [⚙️]  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │ Agent: Refactor  │  │ Agent: Tests     │  │ Agent: Docs      │ │
│  │ ● RUNNING        │  │ ○ IDLE           │  │ ✓ COMPLETED      │ │
│  │                  │  │                  │  │                  │ │
│  │ Working on:      │  │ Last task:       │  │ Generated:       │ │
│  │ auth/login.ts    │  │ unit tests for   │  │ README.md        │ │
│  │                  │  │ user service     │  │ API.md           │ │
│  │ $0.12 | 2m 34s   │  │ $0.08 | --       │  │ $0.05 | 1m 12s   │ │
│  │                  │  │                  │  │                  │ │
│  │ [Stop] [Expand]  │  │ [Run] [Expand]   │  │ [View] [Rerun]   │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  SELECTED: Agent Refactor                                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  [Streaming output from selected agent...]                         │
│                                                                    │
│  > Analyzing auth/login.ts...                                      │
│  > Found 3 issues:                                                 │
│    - Hardcoded timeout value                                       │
│    - Missing error handling in catch block                         │
│    - Unused import                                                 │
│  > Applying fix 1/3...                                             │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Tool: Edit auth/login.ts                     [Approve] [Deny]│  │
│  │ - const TIMEOUT = 5000;                                      │  │
│  │ + const TIMEOUT = config.AUTH_TIMEOUT ?? 5000;               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  [Enter prompt for selected agent...]                      [Send]  │
└────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User clicks [+ New Agent]
        │
        ▼
Webview sends: { type: 'agent:create', config: {...} }
        │
        ▼
Extension spawns: claude -p "prompt" --output-format stream-json
        │
        ▼
CLI streams JSON to stdout
        │
        ▼
StreamParser converts to Message objects
        │
        ▼
Extension sends: { type: 'agent:output', agentId, message }
        │
        ▼
Webview updates AgentCard + OutputPanel
```

---

## Session Management

Claude CLI generates a `session_id` on first message. Store it for:

```typescript
// Resume interrupted session
claude --resume <session_id> -p "continue"

// Fork a session (branch from checkpoint)
claude --resume <session_id> -p "try different approach"
```

Session files stored in: `~/.claude/projects/<project-slug>/<session-id>.jsonl`

---

## Permission Handling

When CLI needs approval for a tool, it pauses and waits for stdin. Our flow:

1. CLI emits `tool_use` message with tool name, args
2. Extension shows approval UI in webview
3. User clicks Approve/Deny
4. Extension writes `y\n` or `n\n` to process stdin
5. CLI continues or aborts tool

For "always allow" patterns, track approved commands and auto-respond.

---

## Rate Limit Awareness

With Max 20x, you have plenty of headroom, but still track:

```typescript
interface UsageStats {
  totalCost: number;
  agentCosts: Map<string, number>;
  tokensIn: number;
  tokensOut: number;
}
```

Display in UI header so you can see burn rate across all agents.
