# CLAUDE.md - The Control Room

## Quick Reference

**The Control Room** - Multi-agent command center VS Code extension wrapping Claude Code CLI.

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run compile` | Build TypeScript to `/out` |
| `F5` | Launch extension in debug mode |
| `Ctrl+Shift+C` | Open The Control Room (when running) |

---

## Critical Rules

1. **CLI Only** - Never call Anthropic API. All Claude interactions go through `claude` CLI which uses Max subscription auth from `claude login`.

2. **No React** - UI is vanilla JavaScript. All DOM manipulation happens in `script.ts`.

3. **Use CSS Variables** - Always use existing `--cr-*` variables from `ui-styles.ts` for colors and spacing.

4. **Message Protocol** - Extension and webview communicate via `postMessage()`. Use existing message types.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  VS Code Extension (extension.ts)                           │
│  ├── ClaudeChatProvider class (~3800 lines)                 │
│  │   ├── _agents: Map<string, Agent>  (max 10 agents)       │
│  │   ├── _sendMessageToClaude()       → spawns CLI          │
│  │   ├── _processJsonStreamData()     ← parses stdout       │
│  │   └── _handleControlRequest()      ↔ permission flow     │
│  └── Webview (ui.ts + ui-styles.ts + script.ts)             │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│  Claude Code CLI                                            │
│  spawn('claude', [                                          │
│    '--output-format', 'stream-json',                        │
│    '--input-format', 'stream-json',                         │
│    '--permission-prompt-tool', 'stdio',                     │
│  ])                                                         │
│  ├── stdout: newline-delimited JSON (responses)             │
│  └── stdin: JSON messages (prompts, permission responses)   │
└─────────────────────────────────────────────────────────────┘
```

---

## File Map

| File | Purpose |
|------|---------|
| `src/extension.ts` | **CORE** - ClaudeChatProvider class, agent management, CLI spawning, stream parsing, permissions |
| `src/ui.ts` | HTML template generation for webview |
| `src/ui-styles.ts` | Complete CSS design system (~3400 lines of styles) |
| `src/script.ts` | Client-side JavaScript for webview interactions |
| `package.json` | Extension manifest, commands, settings, keybindings |

### Supporting Files
| File | Purpose |
|------|---------|
| `docs/ARCHITECTURE.md` | Design principles and data flow |
| `docs/UI_DESIGN_GUIDELINES.md` | Color palette and component specs |

---

## Core Data Structures

### Agent
```typescript
interface Agent {
  id: string;
  name: string;
  process: ChildProcess | undefined;
  sessionId: string | undefined;
  status: 'idle' | 'running' | 'completed' | 'error';
  conversation: Array<MessageData>;
  cost: number;
  tokensInput: number;
  tokensOutput: number;
  pendingPermissionRequests: Map<string, PermissionRequest>;
  isWslProcess: boolean;
  wslDistro: string;
}
```

### CLI Arguments
```typescript
const args = [
  '--output-format', 'stream-json',
  '--input-format', 'stream-json',
  '--include-partial-messages',
  '--verbose',
  '--permission-prompt-tool', 'stdio',
];
// Optional flags:
// --resume {sessionId}           Resume previous session
// --model {modelName}            Specific model
// --dangerously-skip-permissions YOLO mode
// --permission-mode plan         Plan mode (no execution)
// --mcp-config {path}            MCP servers config
```

---

## Message Types

### Extension → Webview
| Type | Purpose |
|------|---------|
| `output` | Assistant text response |
| `userInput` | Echo of user message |
| `thinking` | Claude's thinking process |
| `toolUse` | Tool being executed (with file path, input) |
| `toolResult` | Tool result/output (with before/after for diffs) |
| `permissionRequest` | Needs user approval |
| `agentListChanged` | Agent list updated |
| `setProcessing` | Processing state toggle |
| `updateTokens` | Real-time token counts |
| `sessionInfo` | Session ID and available tools |

### Webview → Extension
| Type | Purpose |
|------|---------|
| `sendMessage` | User sends prompt (with planMode, thinkingMode flags) |
| `permissionResponse` | User approves/denies tool |
| `selectAgent` | Switch to agent |
| `closeAgent` | Terminate agent |
| `createNewAgent` | Spawn new agent |
| `stopAgent` | Stop current agent's process |

---

## Permission Flow

```
1. CLI outputs:    { type: 'control_request', request: { subtype: 'can_use_tool', ... } }
2. Extension:      _handleControlRequest() checks _isToolPreApproved()
3. If not pre-approved:
   - Store in agent.pendingPermissionRequests
   - Post 'permissionRequest' to webview
4. Webview:        Shows approval card, user clicks Allow/Deny
5. Extension:      _handlePermissionResponse() → _sendPermissionResponse()
6. CLI receives:   { type: 'control_response', behavior: 'allow'|'deny' }
```

---

## Key Functions

### extension.ts (ClaudeChatProvider)

| Function | Purpose |
|----------|---------|
| `_createNewAgent()` | Create new agent, enforce max 10 limit |
| `_switchToAgent(id)` | Switch context, replay conversation |
| `_closeAgent(id)` | Kill process, cleanup, switch to next agent |
| `_sendMessageToClaude(msg, plan?, thinking?)` | Core: spawn CLI, send prompt |
| `_processJsonStreamData(data)` | Parse CLI JSON, route by message type |
| `_handleControlRequest(req, proc)` | Handle permission requests from CLI |
| `_sendPermissionResponse(id, ok, req, always)` | Write response to CLI stdin |
| `_postMessage(msg)` | Send message to webview |
| `_sendAndSaveMessage(msg)` | Send + persist to conversation |

### script.ts (Webview)

| Function | Purpose |
|----------|---------|
| `sendMessage()` | Post user message to extension |
| `addMessage(content, type)` | Create DOM element for message |
| `addToolUseMessage(data)` | Render tool execution with file info |
| `addToolResultMessage(data)` | Render tool result with diff |
| `addPermissionRequestMessage(data)` | Render approval card |
| `respondToPermission(id, ok, always)` | Send user's decision |
| `updateAgentList()` | Refresh agent panel sidebar |

---

## Design System

### Colors (CSS Variables in ui-styles.ts)
```css
/* Background */
--cr-bg-base: #1e1e1e;
--cr-bg-surface: #252526;
--cr-bg-elevated: #2d2d2d;

/* Accent (Burnt Amber) */
--cr-accent: #D97706;
--cr-accent-hover: #F59E0B;
--cr-accent-glow: rgba(217, 119, 6, 0.4);

/* Status */
--cr-status-running: #22c55e;   /* green */
--cr-status-idle: #6b7280;       /* gray */
--cr-status-completed: #3b82f6;  /* blue */
--cr-status-error: #ef4444;      /* red */

/* Message Types */
--cr-msg-user: #3b82f6;          /* blue */
--cr-msg-claude: #22c55e;        /* green */
--cr-msg-tool: #8b5cf6;          /* purple */
--cr-msg-thinking: #a855f7;      /* purple */
```

### Typography
```css
--cr-font-display: 'Space Grotesk', system-ui;  /* headings */
--cr-font-sans: 'Inter', system-ui;              /* body */
--cr-font-mono: 'JetBrains Mono', monospace;     /* code */
```

---

## Common Tasks

| I want to... | Edit these files |
|--------------|------------------|
| Add new message type | `extension.ts`: add to `_processJsonStreamData()`, `script.ts`: add case in message handler |
| Add UI button | `ui.ts`: add HTML, `ui-styles.ts`: add CSS, `script.ts`: add handler |
| Change CLI arguments | `extension.ts`: modify args array in `_sendMessageToClaude()` |
| Add VS Code setting | `package.json`: add to `contributes.configuration` |
| Change colors/styling | `ui-styles.ts`: modify CSS variables at top |
| Add agent action | `extension.ts`: add method to ClaudeChatProvider, `script.ts`: add UI handler |
| Add keyboard shortcut | `package.json`: add to `contributes.keybindings` |
| Persist new data | `extension.ts`: use `_context.globalState` or `_context.workspaceState` |

---

## VS Code Settings

Defined in `package.json` under `contributes.configuration`:

| Setting | Type | Purpose |
|---------|------|---------|
| `claudeCodeChat.wsl.enabled` | boolean | Enable WSL integration |
| `claudeCodeChat.wsl.distro` | string | WSL distribution name |
| `claudeCodeChat.thinking.intensity` | enum | think, think-hard, think-harder, ultrathink |
| `claudeCodeChat.permissions.yoloMode` | boolean | Skip all permission prompts |

---

## Debugging Tips

1. **Extension not loading** - Check `out/` folder exists (`npm run compile`)
2. **CLI not found** - Ensure `claude` is in PATH and `claude login` completed
3. **Webview blank** - Check browser console in webview devtools (Help → Toggle Developer Tools)
4. **Permission stuck** - Check `agent.pendingPermissionRequests` map in debugger
5. **WSL issues** - Verify paths in settings match actual WSL installation

---

## Don't Do

- Call Anthropic API directly - always use CLI
- Store API keys anywhere
- Use React/Vue/framework code - vanilla JS only
- Hardcode colors - use CSS variables
- Ignore session IDs - needed for resume/checkpoint
- Create new message types without handling in both extension and webview
