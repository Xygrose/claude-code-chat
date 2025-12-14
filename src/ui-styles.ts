/**
 * The Control Room - UI Styles
 * Multi-Agent Command Center for Claude Code
 *
 * Design Philosophy:
 * - Industrial/utilitarian command center aesthetic
 * - Dark theme with orange accents (mission control inspired)
 * - Clean, minimal UI with status indicators
 * - Agent-centric layout with sidebar navigation
 *
 * Color Reference (Zinc + Orange):
 * - Background: #18181b (zinc-900)
 * - Surface: #27272a (zinc-800)
 * - Surface Dark: #09090b (zinc-950)
 * - Border: #3f3f46 (zinc-700)
 * - Accent: #ea580c (orange-600), hover #f97316 (orange-500)
 * - Text: #f4f4f5 (zinc-100), #a1a1aa (zinc-400), #71717a (zinc-500)
 */

const styles = `
<style>
    /* ========================================
       CSS Variables - Control Room Theme
       ======================================== */
    :root {
        /* Base colors - zinc palette */
        --cr-bg-base: #18181b;          /* zinc-900 */
        --cr-bg-surface: #27272a;        /* zinc-800 */
        --cr-bg-surface-dark: #09090b;   /* zinc-950 */
        --cr-bg-elevated: #27272a;       /* zinc-800 */
        --cr-bg-hover: rgba(63, 63, 70, 0.5); /* zinc-700/50 */

        /* Text colors */
        --cr-text-primary: #f4f4f5;      /* zinc-100 */
        --cr-text-secondary: #a1a1aa;    /* zinc-400 */
        --cr-text-muted: #71717a;        /* zinc-500 */

        /* Accent colors - orange */
        --cr-accent: #ea580c;            /* orange-600 */
        --cr-accent-hover: #f97316;      /* orange-500 */
        --cr-accent-muted: rgba(249, 115, 22, 0.2); /* orange-500/20 */
        --cr-accent-subtle: rgba(249, 115, 22, 0.1); /* orange-500/10 */

        /* Status colors */
        --cr-status-running: #22c55e;    /* green-500 */
        --cr-status-idle: #6b7280;       /* gray-500 */
        --cr-status-completed: #3b82f6;  /* blue-500 */
        --cr-status-error: #ef4444;      /* red-500 */
        --cr-status-warning: #eab308;    /* yellow-500 */

        /* Code/Tool colors */
        --cr-tool-cyan: #22d3ee;         /* cyan-400 */
        --cr-diff-removed: #f87171;      /* red-400 */
        --cr-diff-added: #4ade80;        /* green-400 */

        /* Message colors */
        --cr-msg-user: #3b82f6;          /* blue-500 */
        --cr-msg-claude: #22c55e;        /* green-500 */
        --cr-msg-tool: #8b5cf6;          /* violet-500 */
        --cr-msg-error: #ef4444;         /* red-500 */
        --cr-msg-thinking: #a855f7;      /* purple-500 */

        /* Border colors */
        --cr-border: #3f3f46;            /* zinc-700 */
        --cr-border-hover: #52525b;      /* zinc-600 */
        --cr-border-focus: #ea580c;      /* orange-600 */

        /* Sizing */
        --cr-sidebar-width: 280px;
        --cr-header-height: 48px;
        --cr-input-height: 120px;
        --cr-radius-sm: 4px;
        --cr-radius-md: 6px;
        --cr-radius-lg: 8px;

        /* Typography */
        --cr-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        --cr-font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;

        /* Font sizes */
        --cr-text-xs: 12px;
        --cr-text-sm: 14px;
        --cr-text-lg: 18px;
    }

    /* ========================================
       Base Layout
       ======================================== */
    * {
        box-sizing: border-box;
    }

    body {
        font-family: var(--cr-font-sans);
        background-color: var(--cr-bg-base);
        color: var(--cr-text-primary);
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-size: var(--cr-text-sm);
        line-height: 1.5;
    }

    /* ========================================
       Header - Command Bar
       ======================================== */
    .cr-header {
        height: var(--cr-header-height);
        padding: 0 16px;
        border-bottom: 1px solid var(--cr-border);
        background-color: var(--cr-bg-surface);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    .cr-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .cr-logo {
        width: 32px;
        height: 32px;
        border-radius: var(--cr-radius-md);
        background: linear-gradient(135deg, var(--cr-accent-hover) 0%, var(--cr-accent) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--cr-text-sm);
        font-weight: 700;
        color: white;
    }

    .cr-title {
        margin: 0;
        font-size: var(--cr-text-lg);
        font-weight: 600;
        color: var(--cr-text-primary);
        letter-spacing: -0.3px;
    }

    .cr-stats {
        font-size: var(--cr-text-xs);
        color: var(--cr-text-muted);
    }

    .cr-header-right {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    /* ========================================
       Main Layout - Split View
       ======================================== */
    .cr-main {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    /* ========================================
       Agent Sidebar
       ======================================== */
    .cr-sidebar {
        width: var(--cr-sidebar-width);
        background-color: var(--cr-bg-surface);
        border-right: 1px solid var(--cr-border);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }

    .cr-sidebar-header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
    }

    .cr-sidebar-label {
        font-size: var(--cr-text-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--cr-text-muted);
    }

    .cr-agent-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
    }

    /* Agent Card */
    .agent-card {
        padding: 12px;
        border-radius: var(--cr-radius-lg);
        margin-bottom: 8px;
        cursor: pointer;
        border: 1px solid var(--cr-border);
        background-color: rgba(39, 39, 42, 0.5);
        transition: all 0.15s ease;
        position: relative;
    }

    .agent-card:hover {
        border-color: var(--cr-border-hover);
    }

    .agent-card.selected {
        background-color: var(--cr-accent-muted);
        border-color: var(--cr-accent-hover);
    }

    .agent-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .agent-name {
        font-size: var(--cr-text-sm);
        font-weight: 500;
        color: var(--cr-text-primary);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .status-dot.running {
        background-color: var(--cr-status-running);
        animation: statusPulse 2s ease-in-out infinite;
    }

    .status-dot.idle {
        background-color: var(--cr-status-idle);
    }

    .status-dot.completed {
        background-color: var(--cr-status-completed);
    }

    .status-dot.error {
        background-color: var(--cr-status-error);
    }

    @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .agent-task {
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;
    }

    .agent-meta {
        display: flex;
        justify-content: space-between;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-muted);
    }

    /* ========================================
       Content Area
       ======================================== */
    .cr-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--cr-bg-base);
    }

    /* Agent Content Header */
    .cr-agent-header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--cr-bg-base);
    }

    .cr-agent-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .cr-agent-name {
        font-size: var(--cr-text-sm);
        font-weight: 500;
        color: var(--cr-text-primary);
    }

    .cr-agent-task-label {
        font-size: var(--cr-text-sm);
        color: var(--cr-text-muted);
    }

    .cr-agent-controls {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    /* ========================================
       Output Panel (Messages/Chat Container)
       ======================================== */
    .output-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .chat-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background-color: var(--cr-bg-surface-dark);
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-sm);
        line-height: 1.6;
    }

    /* ========================================
       Messages - Enhanced styling
       ======================================== */
    .message {
        margin-bottom: 12px;
        padding: 12px;
        border-radius: var(--cr-radius-md);
        position: relative;
        overflow: hidden;
        border: 1px solid var(--cr-border);
        background-color: var(--cr-bg-surface);
    }

    .message::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
    }

    .message.user::before {
        background: linear-gradient(180deg, var(--cr-msg-user) 0%, #1d4ed8 100%);
    }

    .message.claude::before {
        background: linear-gradient(180deg, var(--cr-msg-claude) 0%, #16a34a 100%);
    }

    .message.error::before {
        background: linear-gradient(180deg, var(--cr-msg-error) 0%, #dc2626 100%);
    }

    .message.tool::before {
        background: linear-gradient(180deg, var(--cr-msg-tool) 0%, #7c3aed 100%);
    }

    .message.tool-result::before {
        background: linear-gradient(180deg, #14b8a6 0%, #0d9488 100%);
    }

    .message.thinking::before {
        background: linear-gradient(180deg, var(--cr-msg-thinking) 0%, #9333ea 100%);
    }

    .message.system {
        background-color: transparent;
        border: none;
        color: var(--cr-text-secondary);
        font-style: italic;
        padding: 8px 12px;
    }

    .message.system::before {
        display: none;
    }

    .message-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid var(--cr-border);
    }

    .message-icon {
        width: 20px;
        height: 20px;
        border-radius: var(--cr-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        margin-left: 4px;
    }

    .message-icon.user {
        background: linear-gradient(135deg, var(--cr-msg-user) 0%, #1d4ed8 100%);
    }

    .message-icon.claude {
        background: linear-gradient(135deg, var(--cr-msg-claude) 0%, #16a34a 100%);
    }

    .message-icon.error {
        background: linear-gradient(135deg, var(--cr-msg-error) 0%, #dc2626 100%);
    }

    .message-label {
        font-weight: 500;
        font-size: 11px;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .copy-btn {
        background: transparent;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        padding: 4px;
        border-radius: var(--cr-radius-sm);
        opacity: 0;
        transition: all 0.15s ease;
        margin-left: auto;
    }

    .message:hover .copy-btn {
        opacity: 0.6;
    }

    .copy-btn:hover {
        opacity: 1;
        background-color: var(--cr-bg-hover);
    }

    .message-content {
        padding-left: 8px;
        line-height: 1.6;
    }

    /* ========================================
       Tool Messages
       ======================================== */
    .tool-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--cr-border);
    }

    .tool-icon {
        width: 20px;
        height: 20px;
        border-radius: var(--cr-radius-sm);
        background: linear-gradient(135deg, var(--cr-msg-tool) 0%, #7c3aed 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        margin-left: 4px;
    }

    .tool-info {
        font-weight: 500;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-primary);
    }

    .tool-input {
        padding: 8px;
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-xs);
        line-height: 1.4;
    }

    .tool-input-label {
        color: var(--cr-text-secondary);
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
    }

    .tool-input-content {
        color: var(--cr-text-primary);
    }

    /* ========================================
       Tool Approval Card (Permission Request)
       ======================================== */
    .tool-approval-area {
        padding: 0 16px;
    }

    .permission-request,
    .tool-approval-card {
        margin: 12px 0;
        background-color: var(--cr-bg-surface);
        border: 1px solid rgba(234, 179, 8, 0.5);
        border-radius: var(--cr-radius-lg);
        padding: 12px;
        animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .permission-header,
    .tool-approval-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .permission-header .tool-name,
    .tool-approval-header .tool-name {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--cr-status-warning);
        font-size: var(--cr-text-sm);
        font-weight: 500;
    }

    .permission-content,
    .tool-approval-content {
        font-size: var(--cr-text-xs);
        line-height: 1.4;
        color: var(--cr-text-secondary);
    }

    .permission-tool,
    .tool-approval-preview {
        font-family: var(--cr-font-mono);
        background-color: var(--cr-bg-surface-dark);
        border-radius: var(--cr-radius-sm);
        padding: 8px;
        margin: 8px 0;
        font-size: var(--cr-text-xs);
        overflow-x: auto;
    }

    .permission-buttons,
    .tool-approval-buttons {
        display: flex;
        gap: 8px;
    }

    /* Approve Button */
    .btn.approve,
    .permission-buttons .btn.allow {
        background-color: #16a34a;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        font-size: var(--cr-text-xs);
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .btn.approve:hover,
    .permission-buttons .btn.allow:hover {
        background-color: #22c55e;
    }

    /* Deny Button */
    .btn.deny,
    .permission-buttons .btn.deny {
        background-color: var(--cr-border);
        color: var(--cr-text-primary);
        border: none;
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        font-size: var(--cr-text-xs);
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .btn.deny:hover,
    .permission-buttons .btn.deny:hover {
        background-color: var(--cr-border-hover);
    }

    .permission-buttons .btn.always-allow {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: 1px solid rgba(59, 130, 246, 0.3);
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        font-size: var(--cr-text-xs);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .permission-buttons .btn.always-allow:hover {
        background-color: rgba(59, 130, 246, 0.2);
    }

    .permission-decision {
        font-size: var(--cr-text-xs);
        font-weight: 600;
        padding: 8px 12px;
        text-align: center;
        border-radius: var(--cr-radius-sm);
        margin-top: 8px;
    }

    .permission-decision.allowed {
        background-color: rgba(34, 197, 94, 0.15);
        color: var(--cr-status-running);
        border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .permission-decision.denied {
        background-color: rgba(239, 68, 68, 0.15);
        color: var(--cr-status-error);
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .permission-decided {
        opacity: 0.7;
    }

    .permission-decided .permission-buttons {
        display: none;
    }

    /* ========================================
       Input Area
       ======================================== */
    .input-container {
        padding: 12px 16px;
        border-top: 1px solid var(--cr-border);
        background-color: var(--cr-bg-base);
    }

    .input-modes {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;
        font-size: 10px;
    }

    .mode-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--cr-text-secondary);
        cursor: pointer;
        transition: color 0.15s ease;
    }

    .mode-toggle:hover {
        color: var(--cr-text-primary);
    }

    .mode-switch {
        position: relative;
        width: 28px;
        height: 14px;
        background-color: var(--cr-border);
        border-radius: 7px;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .mode-switch.active {
        background-color: var(--cr-accent);
    }

    .mode-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.15s ease;
    }

    .mode-switch.active::after {
        transform: translateX(14px);
    }

    .textarea-container {
        display: flex;
        gap: 10px;
        align-items: flex-end;
    }

    .textarea-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-lg);
        overflow: hidden;
        transition: border-color 0.15s ease;
    }

    .textarea-wrapper:focus-within {
        border-color: var(--cr-accent);
    }

    .input-field {
        width: 100%;
        background-color: transparent;
        color: var(--cr-text-primary);
        border: none;
        padding: 12px 16px;
        outline: none;
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-sm);
        min-height: 48px;
        max-height: 200px;
        line-height: 1.4;
        resize: none;
    }

    .input-field::placeholder {
        color: var(--cr-text-muted);
    }

    .input-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 8px;
        border-top: 1px solid var(--cr-border);
        background-color: var(--cr-bg-surface);
    }

    .left-controls, .right-controls {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .model-selector, .tools-btn {
        background-color: var(--cr-bg-elevated);
        color: var(--cr-text-secondary);
        border: none;
        padding: 4px 8px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 11px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
    }

    .model-selector:hover, .tools-btn:hover {
        background-color: var(--cr-bg-hover);
        color: var(--cr-text-primary);
    }

    .slash-btn, .at-btn, .image-btn {
        background: transparent;
        color: var(--cr-text-secondary);
        border: none;
        padding: 4px 6px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 13px;
        transition: all 0.15s ease;
    }

    .slash-btn:hover, .at-btn:hover, .image-btn:hover {
        background-color: var(--cr-bg-hover);
        color: var(--cr-text-primary);
    }

    /* ========================================
       Buttons - General
       ======================================== */
    .btn {
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-primary);
        border: none;
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: var(--cr-text-sm);
        font-weight: 500;
        transition: all 0.15s ease;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .btn:hover {
        background-color: var(--cr-border);
    }

    .btn.icon {
        padding: 6px;
        background: transparent;
    }

    .btn.icon:hover {
        background-color: var(--cr-bg-hover);
    }

    .btn.small {
        padding: 4px 8px;
        font-size: var(--cr-text-xs);
    }

    /* Primary Button (Orange) */
    .btn.primary,
    .send-btn {
        background-color: var(--cr-accent);
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: var(--cr-radius-lg);
        cursor: pointer;
        font-size: var(--cr-text-sm);
        font-weight: 500;
        transition: background-color 0.15s ease;
    }

    .btn.primary:hover,
    .send-btn:hover {
        background-color: var(--cr-accent-hover);
    }

    .btn.primary:disabled,
    .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Secondary Button */
    .btn.secondary {
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-primary);
        border: none;
    }

    .btn.secondary:hover {
        background-color: var(--cr-border);
    }

    /* Danger Button */
    .btn.danger,
    .btn.stop {
        background-color: rgba(239, 68, 68, 0.2);
        color: var(--cr-diff-removed);
        border: none;
    }

    .btn.danger:hover,
    .btn.stop:hover {
        background-color: rgba(239, 68, 68, 0.3);
    }

    /* Outlined Button */
    .btn.outlined {
        background: transparent;
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border);
    }

    .btn.outlined:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-border-hover);
    }

    /* ========================================
       Footer / Status Bar
       ======================================== */
    .cr-footer {
        padding: 8px 16px;
        background-color: var(--cr-bg-surface);
        border-top: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        color: var(--cr-text-secondary);
    }

    .status-indicator {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }

    .status.ready .status-indicator {
        background-color: var(--cr-status-running);
        box-shadow: 0 0 6px var(--cr-status-running);
    }

    .status.processing .status-indicator {
        background-color: var(--cr-accent);
        box-shadow: 0 0 6px var(--cr-accent);
        animation: statusPulse 1.5s ease-in-out infinite;
    }

    .status.error .status-indicator {
        background-color: var(--cr-status-error);
        box-shadow: 0 0 6px var(--cr-status-error);
    }

    .status-legend {
        display: flex;
        align-items: center;
        gap: 24px;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-muted);
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    /* Session Status Badge */
    .session-status {
        font-size: 11px;
        color: var(--cr-text-secondary);
        padding: 2px 8px;
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-elevated);
    }

    .session-status.active {
        color: var(--cr-status-running);
        background-color: rgba(34, 197, 94, 0.1);
    }

    /* ========================================
       Code Blocks
       ======================================== */
    .message-content pre.code-block {
        background-color: var(--cr-bg-surface-dark);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        padding: 12px;
        margin: 8px 0;
        overflow-x: auto;
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-xs);
        line-height: 1.5;
    }

    .message-content code {
        background-color: var(--cr-bg-surface-dark);
        border: 1px solid var(--cr-border);
        border-radius: 3px;
        padding: 2px 5px;
        font-family: var(--cr-font-mono);
        font-size: 0.9em;
    }

    .code-block-container {
        margin: 8px 0;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        overflow: hidden;
    }

    .code-block-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 10px;
        background-color: var(--cr-bg-surface);
        border-bottom: 1px solid var(--cr-border);
        font-size: 10px;
    }

    .code-block-language {
        color: var(--cr-text-secondary);
        font-family: var(--cr-font-mono);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .code-copy-btn {
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        padding: 4px;
        border-radius: var(--cr-radius-sm);
        opacity: 0.7;
        transition: all 0.15s ease;
    }

    .code-copy-btn:hover {
        background-color: var(--cr-bg-hover);
        opacity: 1;
    }

    /* ========================================
       Diff Display
       ======================================== */
    .diff-container {
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        overflow: hidden;
    }

    .diff-header {
        background-color: var(--cr-bg-surface);
        padding: 6px 12px;
        font-size: 11px;
        font-weight: 600;
        border-bottom: 1px solid var(--cr-border);
    }

    .diff-line {
        padding: 2px 12px;
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-xs);
        line-height: 1.5;
    }

    .diff-line.removed {
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--cr-diff-removed);
    }

    .diff-line.added {
        background-color: rgba(34, 197, 94, 0.1);
        color: var(--cr-diff-added);
    }

    .diff-file-path {
        padding: 8px 12px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        font-size: var(--cr-text-xs);
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .diff-file-path:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-accent);
    }

    .diff-open-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: transparent;
        border: 1px solid var(--cr-border);
        color: var(--cr-text-secondary);
        padding: 4px 10px;
        border-radius: var(--cr-radius-sm);
        font-size: 11px;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .diff-open-btn:hover {
        background: var(--cr-bg-hover);
        border-color: var(--cr-accent);
        color: var(--cr-text-primary);
    }

    /* ========================================
       Modals
       ======================================== */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(2px);
    }

    .modal-content {
        background-color: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-lg);
        width: 500px;
        max-width: 90vw;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        animation: modalIn 0.2s ease;
    }

    @keyframes modalIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }

    .tools-modal-content {
        width: 700px;
    }

    .modal-header,
    .file-picker-header,
    .tools-modal-header {
        padding: 16px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
    }

    .close-btn {
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        padding: 4px;
        border-radius: var(--cr-radius-sm);
        transition: all 0.15s ease;
    }

    .close-btn:hover {
        background-color: var(--cr-bg-hover);
        color: var(--cr-text-primary);
    }

    .tools-list {
        padding: 16px;
        max-height: 400px;
        overflow-y: auto;
    }

    .file-list {
        max-height: 400px;
        overflow-y: auto;
        padding: 8px;
    }

    .file-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: var(--cr-radius-sm);
        font-size: 13px;
        gap: 8px;
        transition: background-color 0.15s ease;
    }

    .file-item:hover {
        background-color: var(--cr-bg-hover);
    }

    .file-item.selected {
        background-color: var(--cr-accent-muted);
    }

    .file-search-input {
        width: 100%;
        background-color: var(--cr-bg-surface-dark);
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border);
        padding: 8px 12px;
        border-radius: var(--cr-radius-sm);
        outline: none;
        font-size: 13px;
        transition: border-color 0.15s ease;
    }

    .file-search-input:focus {
        border-color: var(--cr-accent);
    }

    /* ========================================
       Conversation History
       ======================================== */
    .conversation-history {
        position: absolute;
        top: var(--cr-header-height);
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--cr-bg-base);
        z-index: 100;
    }

    .conversation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
    }

    .conversation-header h3 {
        margin: 0;
        font-size: var(--cr-text-sm);
        font-weight: 600;
    }

    .conversation-list {
        padding: 12px;
        overflow-y: auto;
        height: calc(100% - 50px);
    }

    .conversation-item {
        padding: 12px;
        margin: 4px 0;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .conversation-item:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-accent);
    }

    .conversation-title {
        font-weight: 500;
        margin-bottom: 4px;
        font-size: 13px;
    }

    .conversation-meta {
        font-size: 11px;
        color: var(--cr-text-secondary);
    }

    /* ========================================
       WSL Alert
       ======================================== */
    .wsl-alert {
        margin: 12px;
        background-color: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: var(--cr-radius-lg);
        animation: slideUp 0.2s ease;
    }

    .wsl-alert-content {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        gap: 12px;
    }

    .wsl-alert-icon {
        color: #3b82f6;
    }

    .wsl-alert-text {
        flex: 1;
        font-size: var(--cr-text-xs);
        line-height: 1.4;
    }

    .wsl-alert-actions {
        display: flex;
        gap: 8px;
    }

    /* ========================================
       YOLO Warning
       ======================================== */
    .yolo-warning {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        color: var(--cr-accent);
        text-align: center;
        font-weight: 500;
        background-color: var(--cr-accent-muted);
        border: 1px solid rgba(249, 115, 22, 0.3);
        padding: 6px 12px;
        margin: 4px 16px;
        border-radius: var(--cr-radius-sm);
    }

    /* ========================================
       Processing Indicator
       ======================================== */
    .processing-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
    }

    .processing-indicator .morph-dot {
        width: 8px;
        height: 8px;
        background: var(--cr-accent);
        border-radius: 50%;
        animation: morphPulse 1.5s ease-in-out infinite;
    }

    @keyframes morphPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.5; }
    }

    /* ========================================
       Loading State
       ======================================== */
    .tool-loading {
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .loading-spinner {
        display: flex;
        gap: 4px;
    }

    .loading-ball {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--cr-accent);
        animation: bounce 1.4s ease-in-out infinite both;
    }

    .loading-ball:nth-child(1) { animation-delay: -0.32s; }
    .loading-ball:nth-child(2) { animation-delay: -0.16s; }
    .loading-ball:nth-child(3) { animation-delay: 0s; }

    @keyframes bounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }

    .loading-text {
        font-size: 11px;
        color: var(--cr-text-secondary);
        font-style: italic;
    }

    /* ========================================
       Scrollbar Styling
       ======================================== */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--cr-border);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--cr-text-muted);
    }

    /* ========================================
       MCP Servers
       ======================================== */
    .mcp-servers-list {
        padding: 4px;
    }

    .mcp-server-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        margin-bottom: 12px;
        transition: all 0.15s ease;
    }

    .mcp-server-item:hover {
        border-color: var(--cr-accent);
    }

    .server-info {
        flex: 1;
    }

    .server-name {
        font-weight: 600;
        font-size: var(--cr-text-sm);
        margin-bottom: 4px;
    }

    .server-type {
        display: inline-block;
        background-color: var(--cr-bg-elevated);
        padding: 2px 8px;
        border-radius: var(--cr-radius-sm);
        font-size: 10px;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .server-config {
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
    }

    .mcp-add-server {
        text-align: center;
        margin: 16px 0;
    }

    .mcp-add-form {
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        padding: 16px;
        margin-top: 12px;
    }

    .form-group {
        margin-bottom: 12px;
    }

    .form-group label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        font-size: var(--cr-text-xs);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-base);
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--cr-accent);
    }

    .form-hint {
        font-size: 10px;
        color: var(--cr-text-muted);
        margin-top: 4px;
    }

    .form-hint code {
        background-color: var(--cr-bg-surface-dark);
        padding: 1px 4px;
        border-radius: 2px;
    }

    .form-buttons {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
    }

    .mcp-popular-servers {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--cr-border);
    }

    .mcp-popular-servers h4 {
        margin: 0 0 12px 0;
        font-size: var(--cr-text-xs);
        font-weight: 600;
        color: var(--cr-text-secondary);
    }

    .popular-servers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 8px;
    }

    .popular-server-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .popular-server-item:hover {
        border-color: var(--cr-accent);
        background-color: var(--cr-bg-hover);
    }

    .popular-server-icon {
        color: var(--cr-text-secondary);
    }

    .popular-server-name {
        font-weight: 500;
        font-size: var(--cr-text-xs);
    }

    .popular-server-desc {
        font-size: 10px;
        color: var(--cr-text-secondary);
    }

    /* ========================================
       Install Modal
       ======================================== */
    .install-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
    }

    .install-modal-content {
        position: relative;
        background: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-lg);
        width: 320px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .install-close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        border-radius: var(--cr-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .install-close-btn:hover {
        background: var(--cr-bg-hover);
    }

    .install-body {
        text-align: center;
    }

    .install-icon-wrapper {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        background: var(--cr-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        color: white;
    }

    .install-title {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
    }

    .install-desc {
        margin: 0 0 20px 0;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
    }

    .install-btn {
        width: 100%;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: 500;
        background: var(--cr-accent);
        color: white;
        border: none;
        border-radius: var(--cr-radius-md);
        cursor: pointer;
    }

    .install-btn:hover {
        background: var(--cr-accent-hover);
    }

    .install-link {
        display: block;
        margin-top: 12px;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
        text-decoration: none;
    }

    .install-link:hover {
        color: var(--cr-accent);
    }

    .install-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid var(--cr-border);
        border-top-color: var(--cr-accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .install-progress-text {
        margin: 0;
        font-size: var(--cr-text-sm);
        font-weight: 500;
    }

    .install-progress-hint {
        margin: 8px 0 0;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-muted);
    }

    .install-success-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
    }

    .install-check {
        width: 24px;
        height: 24px;
        stroke: var(--cr-status-running);
    }

    .install-success-text {
        margin: 0;
        font-size: var(--cr-text-sm);
        font-weight: 500;
        color: var(--cr-status-running);
    }

    .install-success-hint {
        margin: 8px 0 0;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-muted);
    }

    /* ========================================
       Settings
       ======================================== */
    .settings-section {
        margin-bottom: 24px;
    }

    .settings-section h3 {
        margin: 0 0 8px 0;
        font-size: var(--cr-text-sm);
        font-weight: 600;
    }

    .settings-description {
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
        margin: 0 0 12px 0;
    }

    .settings-group {
        padding: 12px;
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
    }

    .tool-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
    }

    .tool-item input[type="checkbox"] {
        accent-color: var(--cr-accent);
    }

    .wsl-options {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--cr-border);
    }

    .form-input {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-base);
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
    }

    .form-input:focus {
        outline: none;
        border-color: var(--cr-accent);
    }

    /* Permissions */
    .permissions-list {
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        margin-top: 8px;
    }

    .permission-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        border-bottom: 1px solid var(--cr-border);
        font-size: var(--cr-text-xs);
    }

    .permission-item:last-child {
        border-bottom: none;
    }

    .permissions-empty {
        padding: 16px;
        text-align: center;
        color: var(--cr-text-secondary);
        font-style: italic;
        font-size: var(--cr-text-xs);
    }

    .permissions-loading {
        padding: 16px;
        text-align: center;
        color: var(--cr-text-muted);
    }

    .permissions-add-section {
        margin-top: 12px;
    }

    .permissions-add-form {
        padding: 12px;
        background-color: var(--cr-bg-base);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        margin-bottom: 8px;
    }

    .permissions-form-row {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .permissions-tool-select {
        padding: 6px 8px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
    }

    .permissions-command-input {
        flex: 1;
        padding: 6px 8px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
    }

    .permissions-add-btn {
        padding: 6px 12px;
    }

    .permissions-form-hint {
        font-size: 10px;
        color: var(--cr-text-muted);
        margin-top: 8px;
    }

    .permissions-show-add-btn {
        width: 100%;
    }

    .yolo-mode-section {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--cr-border);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* ========================================
       Model Selector Modal
       ======================================== */
    .model-modal-content {
        width: 400px;
    }

    .model-explanatory-text {
        padding: 12px 16px;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
        border-bottom: 1px solid var(--cr-border);
    }

    .model-list {
        padding: 8px;
    }

    .model-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px;
        border-radius: var(--cr-radius-md);
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .model-item:hover {
        background-color: var(--cr-bg-hover);
    }

    .model-item input[type="radio"] {
        accent-color: var(--cr-accent);
        margin-top: 2px;
    }

    .model-title {
        font-weight: 500;
        font-size: var(--cr-text-sm);
        margin-bottom: 2px;
    }

    .model-description {
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
    }

    .default-model-layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .configure-button {
        padding: 4px 8px;
        font-size: 11px;
    }

    /* ========================================
       Thinking Intensity Modal
       ======================================== */
    .thinking-modal-content {
        width: 400px;
    }

    .thinking-modal-description {
        padding: 12px 16px;
        font-size: var(--cr-text-xs);
        color: var(--cr-text-secondary);
        border-bottom: 1px solid var(--cr-border);
    }

    .thinking-slider-container {
        padding: 16px 8px;
    }

    .thinking-slider {
        width: 100%;
        height: 4px;
        -webkit-appearance: none;
        background: var(--cr-border);
        border-radius: 2px;
        cursor: pointer;
    }

    .thinking-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background: var(--cr-accent);
        border-radius: 50%;
        cursor: pointer;
    }

    .slider-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 10px;
        color: var(--cr-text-secondary);
    }

    .slider-label {
        cursor: pointer;
        transition: color 0.15s ease;
    }

    .slider-label:hover,
    .slider-label.active {
        color: var(--cr-text-primary);
    }

    .thinking-modal-actions {
        padding: 12px 0;
        text-align: center;
    }

    .confirm-btn {
        padding: 8px 24px;
    }

    /* ========================================
       Slash Commands Modal
       ======================================== */
    .slash-modal-content {
        width: 600px;
        max-height: 70vh;
    }

    .tools-modal-body {
        overflow-y: auto;
        max-height: calc(70vh - 60px);
    }

    .slash-commands-search {
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
        position: sticky;
        top: 0;
        background-color: var(--cr-bg-surface);
        z-index: 10;
    }

    .search-input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        background-color: var(--cr-bg-surface-dark);
        transition: border-color 0.15s ease;
    }

    .search-input-wrapper:focus-within {
        border-color: var(--cr-accent);
    }

    .search-prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 32px;
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-secondary);
        font-size: 13px;
        font-weight: 600;
        border-radius: var(--cr-radius-md) 0 0 var(--cr-radius-md);
        border-right: 1px solid var(--cr-border);
    }

    .slash-commands-search input {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: transparent;
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
        outline: none;
    }

    .slash-commands-section {
        padding: 12px 16px;
    }

    .slash-commands-section h3 {
        margin: 0 0 8px 0;
        font-size: var(--cr-text-xs);
        font-weight: 600;
        color: var(--cr-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .slash-commands-info {
        font-size: 11px;
        color: var(--cr-text-secondary);
        margin-bottom: 12px;
    }

    .slash-commands-info p {
        margin: 0;
    }

    .slash-commands-list {
        display: grid;
        gap: 4px;
    }

    .slash-command-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        transition: all 0.15s ease;
        border: 1px solid transparent;
    }

    .slash-command-item:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-border);
    }

    .slash-command-icon {
        color: var(--cr-text-secondary);
        min-width: 20px;
        text-align: center;
    }

    .slash-command-content {
        flex: 1;
    }

    .slash-command-title {
        font-size: var(--cr-text-xs);
        font-weight: 500;
    }

    .slash-command-description {
        font-size: 10px;
        color: var(--cr-text-secondary);
    }

    .add-snippet-item {
        border: 1px dashed var(--cr-border);
    }

    .add-snippet-item:hover {
        border-style: solid;
        border-color: var(--cr-accent);
    }

    .add-snippet-form {
        padding: 12px;
        margin: 8px 0;
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
    }

    .command-input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-base);
    }

    .command-prefix {
        padding: 6px 8px;
        color: var(--cr-text-muted);
        border-right: 1px solid var(--cr-border);
    }

    .command-input-wrapper input {
        flex: 1;
        padding: 6px 8px;
        border: none;
        background: transparent;
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
        outline: none;
    }

    .custom-command-item {
        border: 1px solid var(--cr-border);
    }

    .custom-command-input {
        padding: 4px 8px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        background-color: var(--cr-bg-base);
        color: var(--cr-text-primary);
        font-size: var(--cr-text-xs);
        width: 150px;
    }

    .custom-command-input:focus {
        border-color: var(--cr-accent);
        outline: none;
    }

    /* ========================================
       Restore Button
       ======================================== */
    .restore-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .restore-btn {
        background-color: var(--cr-bg-elevated);
        color: var(--cr-text-secondary);
        border: 1px solid var(--cr-border);
        padding: 4px 10px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 11px;
        font-weight: 500;
        transition: all 0.15s ease;
    }

    .restore-btn:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-accent);
        color: var(--cr-text-primary);
    }

    .restore-date {
        font-size: 10px;
        color: var(--cr-text-muted);
    }

    /* ========================================
       Markdown in Messages
       ======================================== */
    .message h1, .message h2, .message h3, .message h4 {
        margin: 0.8em 0 0.4em 0;
        font-weight: 600;
        line-height: 1.3;
    }

    .message h1 { font-size: 1.4em; }
    .message h2 { font-size: 1.2em; }
    .message h3 { font-size: 1.1em; }

    .message strong {
        font-weight: 600;
    }

    .message ul, .message ol {
        margin: 0.5em 0;
        padding-left: 1.5em;
    }

    .message li {
        margin: 0.3em 0;
    }

    .message p {
        margin: 0.5em 0;
    }

    .message p:first-child { margin-top: 0; }
    .message p:last-child { margin-bottom: 0; }

    /* ========================================
       Expand Button
       ======================================== */
    .expand-btn {
        background: var(--cr-accent-muted);
        border: 1px solid rgba(249, 115, 22, 0.3);
        color: var(--cr-accent-hover);
        padding: 2px 8px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 10px;
        font-weight: 500;
        margin-left: 4px;
        transition: all 0.15s ease;
    }

    .expand-btn:hover {
        background: rgba(249, 115, 22, 0.2);
        border-color: var(--cr-accent);
    }

    .expanded-content {
        margin-top: 8px;
        padding: 12px;
        background: var(--cr-bg-surface-dark);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        position: relative;
    }

    .expanded-content::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--cr-accent);
        border-radius: var(--cr-radius-md) 0 0 var(--cr-radius-md);
    }

    .expanded-content pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    /* ========================================
       Responsive
       ======================================== */
    @media (max-width: 600px) {
        .cr-sidebar {
            display: none;
        }

        :root {
            --cr-sidebar-width: 0px;
        }
    }
</style>
`;

export default styles;
