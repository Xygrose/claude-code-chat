# UI Design Guidelines - The Control Room

Open `ui-mockup.html` in a browser to see the visual reference.

---

## Design Philosophy

**Command Center, not Chat App.**

This isn't another AI chat interface. It's mission control for parallel coding agents. The UI should feel like you're operating a fleet, not having a conversation.

---

## Color Palette

### Base (Dark Theme)
```
Background:     #18181b (zinc-900)
Surface:        #27272a (zinc-800)
Surface Dark:   #09090b (zinc-950)
Border:         #3f3f46 (zinc-700)
Border Hover:   #52525b (zinc-600)
```

### Text
```
Primary:        #f4f4f5 (zinc-100)
Secondary:      #a1a1aa (zinc-400)
Muted:          #71717a (zinc-500)
```

### Accent (Orange - Primary Brand)
```
Primary:        #ea580c (orange-600)
Hover:          #f97316 (orange-500)
Selected BG:    rgba(249, 115, 22, 0.2) (orange-500/20)
```

### Status Colors
```
Running:        #22c55e (green-500) + pulse animation
Idle:           #6b7280 (gray-500)
Completed:      #3b82f6 (blue-500)
Error:          #ef4444 (red-500)
Warning/Tool:   #eab308 (yellow-500)
```

### Code/Tool Colors
```
Tool calls:     #22d3ee (cyan-400)
Diff removed:   #f87171 (red-400)
Diff added:     #4ade80 (green-400)
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Title | Stats | + New Agent | Settings      │
├─────────────────────────────────────────────────────────────┤
│         │                                                   │
│  AGENT  │              MAIN CONTENT                         │
│  LIST   │                                                   │
│  (25%)  │  - Selected agent header                          │
│         │  - Output panel (scrollable)                      │
│         │  - Tool approval cards                            │
│         │  - Input area                                     │
│         │                                                   │
│  (75%)  │                                                   │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Status legend (optional)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Specs

### Agent Card
```
- Padding: 12px
- Border radius: 8px (rounded-lg)
- Border: 1px solid zinc-700
- Selected: orange-500/20 bg + orange-500 border

Contents:
  - Name (font-medium, text-sm)
  - Status dot (8px, right aligned)
  - Task description (text-xs, zinc-400, truncated)
  - Cost + Time (text-xs, zinc-500, space-between)
```

### Status Dot
```
- Size: 8px (w-2 h-2)
- Border radius: full (circle)
- Running: animate-pulse (2s infinite)
```

### Output Panel
```
- Background: zinc-950
- Padding: 16px
- Border radius: 8px
- Font: monospace
- Text size: 14px (text-sm)
- Max height: 240px (scrollable)
- Line spacing: 4px

Line colors by type:
  - system: zinc-500
  - assistant: zinc-100
  - tool: cyan-400 with "› " prefix in zinc-500
  - error: red-400
```

### Tool Approval Card
```
- Background: zinc-800
- Border: 1px solid yellow-500/50
- Padding: 12px
- Border radius: 8px

Header:
  - Icon: ⚡
  - Tool name: yellow-500, font-medium
  - Buttons: Approve (green-600), Deny (zinc-700)

Code preview:
  - Background: zinc-900
  - Padding: 8px
  - Font: monospace, text-xs
  - Overflow: auto
```

### Input Area
```
- Background: zinc-800
- Border: 1px solid zinc-700
- Border radius: 8px
- Padding: 12px 16px
- Focus border: orange-500

Send button:
  - Background: orange-600
  - Hover: orange-500
  - Padding: 12px 16px
  - Border radius: 8px
```

### Buttons
```
Primary (+ New Agent, Send):
  - bg-orange-600 hover:bg-orange-500
  - text-sm font-medium

Secondary (Checkpoint):
  - bg-zinc-800 hover:bg-zinc-700
  - text-sm

Danger (Stop):
  - bg-red-600/20 hover:bg-red-600/30
  - text-red-400

Approve:
  - bg-green-600 hover:bg-green-500
  - text-xs
```

---

## Animation

### Status Pulse (Running)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
animation: pulse 2s infinite;
```

---

## Typography

```
Font family: system-ui, sans-serif (default)
Monospace: ui-monospace, monospace (output, code)

Sizes:
  - Header title: text-lg (18px)
  - Agent name: text-sm font-medium (14px)
  - Body text: text-sm (14px)
  - Meta text: text-xs (12px)
```
