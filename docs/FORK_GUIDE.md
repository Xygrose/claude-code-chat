# Fork Guide: Setting Up from claude-code-chat

## Step 1: Fork the Repository

```bash
# Clone claude-code-chat
cd "C:\Users\minty\Desktop\The Control Room"
git clone https://github.com/andrepimenta/claude-code-chat.git .

# Remove their git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial fork from claude-code-chat"
```

## Step 2: Update Package Identity

Edit `package.json`:

```json
{
  "name": "the-control-room",
  "displayName": "The Control Room",
  "description": "Multi-agent command center for Claude Code",
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/the-control-room"
  }
}
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Understand the Existing Structure

Key files from claude-code-chat to understand:

```
src/
├── extension.ts          # Entry point, activation
├── ClaudeCodeProvider.ts # Main provider class - THIS IS KEY
├── webview/              # React UI components
│   └── ...
└── utils/                # Helpers
```

The `ClaudeCodeProvider` class handles:
- Spawning the claude CLI
- Parsing streaming output
- Sending messages to webview
- Handling tool approvals

## Step 5: Run in Development

1. Open folder in VS Code
2. Press F5 to launch Extension Development Host
3. The extension should appear in the new VS Code window

## Step 6: Key Files to Modify

### For UI overhaul:
- `src/webview/` - All React components live here
- Focus on layout, not functionality first

### For multi-agent support:
- `src/ClaudeCodeProvider.ts` - Needs to become "one of many"
- Create new `src/orchestrator/AgentPool.ts` to manage multiple providers

## What to Keep vs Replace

### Keep (proven, working):
- CLI spawning logic
- Stream JSON parsing
- Tool execution display logic
- File reference (@) handling
- Checkpoint system

### Replace/Redesign:
- Main UI layout (chat → command center)
- Single-agent assumption → multi-agent
- Branding/theming

### Add New:
- Agent orchestrator
- Multi-panel UI
- Agent status tracking
- Cross-agent task management
