# TODO - The Control Room

## Phase 1: Setup ✅
- [x] Clone claude-code-chat
- [ ] Update package.json (name → "the-control-room", displayName → "The Control Room")
- [ ] npm install
- [ ] Verify it runs (F5)
- [ ] Study ClaudeCodeProvider.ts

## Phase 2: UI Redesign (Single Agent)
- [ ] Replace chat layout with command center layout (see docs/ui-mockup.html)
- [ ] Implement AgentCard component
- [ ] Add status indicators (running/idle/completed/error with colored dots)
- [ ] Redesign output panel (zinc-950 bg, monospace, colored by message type)
- [ ] Style tool approval cards (yellow border, approve/deny buttons)
- [ ] Update input area (zinc-800, orange focus border)
- [ ] Add header with stats (total cost, agent count)
- [ ] Apply color palette from UI_DESIGN_GUIDELINES.md

## Phase 3: Verify Existing Features
- [ ] Basic chat works
- [ ] File references (@) work
- [ ] Tool execution displays correctly
- [ ] Tool approvals work
- [ ] Checkpoints work
- [ ] Cost tracking works
- [ ] MCP servers work

## Phase 4: Multi-Agent Foundation
- [ ] Create AgentPool class (manages multiple agents)
- [ ] Refactor ClaudeCodeProvider → AgentProcess (single agent wrapper)
- [ ] Support spawning multiple CLI processes
- [ ] Independent session tracking per agent
- [ ] Parallel stream parsing

## Phase 5: Multi-Agent UI
- [ ] Agent sidebar showing all agents as cards
- [ ] Click card to select agent (shows in main panel)
- [ ] Per-agent controls (stop, checkpoint, resume)
- [ ] Per-agent prompt input
- [ ] Header shows total cost across all agents

## Phase 6: Polish
- [ ] Keyboard shortcuts
- [ ] Agent naming/renaming
- [ ] Error handling
- [ ] Loading states
- [ ] Settings panel

## Reference Files
- `docs/ui-mockup.html` - Open in browser to see target design
- `docs/UI_DESIGN_GUIDELINES.md` - Colors, spacing, component specs
