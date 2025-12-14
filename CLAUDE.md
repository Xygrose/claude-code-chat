# CLAUDE.md - The Control Room

## Project Overview

**The Control Room** - A multi-agent command center VS Code extension built on top of Claude Code CLI.

This is a fork of [claude-code-chat](https://github.com/andrepimenta/claude-code-chat) with a redesigned UI for managing multiple parallel Claude Code agents.

## Critical Rules

1. **DO NOT use API keys** - This extension uses Claude Code CLI which inherits Max subscription auth from `claude login`. All Claude interactions go through the CLI.

2. **Preserve existing functionality** - Before redesigning anything, ensure the original feature still works. We're upgrading the UI, not breaking the backend.

3. **Follow the design system** - See `docs/UI_DESIGN_GUIDELINES.md` and `docs/ui-mockup.html` for exact colors, spacing, and component specs.

## Architecture

```
VS Code Extension (TypeScript)
    ↓ spawns
Claude Code CLI: `claude -p "prompt" --output-format stream-json`
    ↓ stdout stream
Parse JSON messages → Render in React webview
```

## Key Files

| File | Purpose |
|------|---------|
| `src/extension.ts` | Entry point, command registration |
| `src/ClaudeCodeProvider.ts` | **CORE** - CLI spawning, stream parsing, tool handling |
| `src/webview/` | React UI components |
| `package.json` | Extension manifest, commands, config |

## CLI Integration Pattern

```typescript
import { spawn } from 'child_process';

const proc = spawn('claude', [
  '-p', prompt,
  '--output-format', 'stream-json',
  '--allowedTools', 'Read,Write,Edit,Bash',
], { cwd: workingDir });

proc.stdout.on('data', (chunk) => {
  // Parse newline-delimited JSON
  const lines = chunk.toString().split('\n').filter(Boolean);
  for (const line of lines) {
    const msg = JSON.parse(line);
    // Handle: system, assistant, tool_use, tool_result, result
  }
});
```

## UI Requirements

### Design Philosophy
**Command Center, not Chat App.** This is mission control for parallel agents.

### Color Palette
- Background: `#18181b` (zinc-900)
- Surface: `#27272a` (zinc-800)
- Accent: `#ea580c` (orange-600)
- Status: Green=running, Gray=idle, Blue=completed, Red=error

### Layout
```
┌─────────────────────────────────────────────────┐
│  HEADER: Logo | Title | Stats | + New Agent     │
├─────────────────────────────────────────────────┤
│ AGENTS │           MAIN CONTENT                 │
│ (25%)  │  - Selected agent header               │
│        │  - Output panel                        │
│        │  - Tool approvals                      │
│        │  - Input area                          │
└─────────────────────────────────────────────────┘
```

## Development Phases

### Phase 1: Single Agent UI Redesign
- Replace chat layout with command center layout
- Implement agent card component  
- Redesign output panel
- Style tool approval cards

### Phase 2: Multi-Agent Support
- Create AgentPool orchestrator
- Support multiple CLI processes
- Per-agent session tracking
- Multi-agent UI (sidebar with cards)

## Running the Extension

```bash
npm install
# Press F5 in VS Code → launches Extension Development Host
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run compile` | Build TypeScript |
| `F5` | Launch extension in debug mode |
| `Ctrl+R` | Reload extension host window |

## What NOT to Do

- Don't call Anthropic API directly - always use CLI
- Don't store API keys anywhere
- Don't break existing features before reimplementing them
- Don't ignore session IDs - needed for resume/checkpoint
