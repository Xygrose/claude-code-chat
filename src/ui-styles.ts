/**
 * The Control Room - UI Styles
 * Multi-Agent Command Center for Claude Code
 * 
 * Design Philosophy:
 * - Dark theme with orange accents (inspired by mission control)
 * - Clean, minimal UI with status indicators
 * - Agent-centric layout with sidebar navigation
 */

const styles = `
<style>
    /* ========================================
       CSS Variables - Control Room Theme
       ======================================== */
    :root {
        /* Base colors - using VS Code variables with fallbacks */
        --cr-bg-base: var(--vscode-editor-background, #0a0a0a);
        --cr-bg-surface: var(--vscode-panel-background, #111111);
        --cr-bg-elevated: var(--vscode-input-background, #1a1a1a);
        --cr-bg-hover: var(--vscode-list-hoverBackground, #1f1f1f);
        
        /* Text colors */
        --cr-text-primary: var(--vscode-foreground, #e5e5e5);
        --cr-text-secondary: var(--vscode-descriptionForeground, #808080);
        --cr-text-muted: #4a4a4a;
        
        /* Accent colors */
        --cr-accent: #f97316;
        --cr-accent-hover: #fb923c;
        --cr-accent-muted: rgba(249, 115, 22, 0.15);
        
        /* Status colors */
        --cr-status-running: #22c55e;
        --cr-status-idle: #6b7280;
        --cr-status-completed: #3b82f6;
        --cr-status-error: #ef4444;
        
        /* Message colors */
        --cr-msg-user: #3b82f6;
        --cr-msg-claude: #22c55e;
        --cr-msg-tool: #8b5cf6;
        --cr-msg-error: #ef4444;
        --cr-msg-thinking: #a855f7;
        
        /* Border */
        --cr-border: var(--vscode-panel-border, #262626);
        --cr-border-focus: var(--vscode-focusBorder, #f97316);
        
        /* Sizing */
        --cr-sidebar-width: 280px;
        --cr-header-height: 48px;
        --cr-input-height: 120px;
        --cr-radius-sm: 4px;
        --cr-radius-md: 6px;
        --cr-radius-lg: 8px;
    }

    /* ========================================
       Base Layout
       ======================================== */
    * {
        box-sizing: border-box;
    }

    body {
        font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
        background-color: var(--cr-bg-base);
        color: var(--cr-text-primary);
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    /* ========================================
       Header - Command Bar
       ======================================== */
    .header {
        height: var(--cr-header-height);
        padding: 0 16px;
        border-bottom: 1px solid var(--cr-border);
        background-color: var(--cr-bg-surface);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .header h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--cr-text-primary);
        letter-spacing: -0.3px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .header h2 .logo-icon {
        color: var(--cr-accent);
        font-size: 16px;
    }

    .header-stats {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 11px;
        color: var(--cr-text-secondary);
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .stat-value {
        color: var(--cr-text-primary);
        font-weight: 500;
        font-family: var(--vscode-editor-font-family, monospace);
    }

    .header-right {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    /* ========================================
       Main Layout - Split View
       ======================================== */
    .main-container {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    /* ========================================
       Agent Sidebar
       ======================================== */
    .agent-sidebar {
        width: var(--cr-sidebar-width);
        background-color: var(--cr-bg-surface);
        border-right: 1px solid var(--cr-border);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }

    .sidebar-header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .sidebar-title {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--cr-text-secondary);
    }

    .new-agent-btn {
        background: var(--cr-accent);
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.15s ease;
    }

    .new-agent-btn:hover {
        background: var(--cr-accent-hover);
        transform: scale(1.05);
    }

    .agent-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
    }

    /* Agent Card */
    .agent-card {
        padding: 12px;
        border-radius: var(--cr-radius-md);
        margin-bottom: 6px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.15s ease;
        position: relative;
    }

    .agent-card:hover {
        background-color: var(--cr-bg-hover);
    }

    .agent-card.selected {
        background-color: var(--cr-accent-muted);
        border-color: var(--cr-accent);
    }

    .agent-card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
    }

    .agent-status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .agent-status-dot.running {
        background-color: var(--cr-status-running);
        box-shadow: 0 0 8px var(--cr-status-running);
        animation: pulse-glow 2s ease-in-out infinite;
    }

    .agent-status-dot.idle {
        background-color: var(--cr-status-idle);
    }

    .agent-status-dot.completed {
        background-color: var(--cr-status-completed);
    }

    .agent-status-dot.error {
        background-color: var(--cr-status-error);
    }

    @keyframes pulse-glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .agent-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--cr-text-primary);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .agent-preview {
        font-size: 11px;
        color: var(--cr-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 18px;
    }

    .agent-meta {
        display: flex;
        gap: 12px;
        padding-left: 18px;
        margin-top: 6px;
        font-size: 10px;
        color: var(--cr-text-muted);
    }

    /* Empty state */
    .agent-empty {
        padding: 24px 16px;
        text-align: center;
        color: var(--cr-text-secondary);
    }

    .agent-empty-icon {
        font-size: 32px;
        margin-bottom: 8px;
        opacity: 0.5;
    }

    .agent-empty-text {
        font-size: 12px;
        margin-bottom: 12px;
    }

    /* ========================================
       Content Area
       ======================================== */
    .content-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--cr-bg-base);
    }

    /* Agent Content Header */
    .content-header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--cr-bg-surface);
    }

    .content-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .agent-title {
        font-size: 14px;
        font-weight: 600;
    }

    .agent-badge {
        font-size: 10px;
        padding: 2px 8px;
        border-radius: 10px;
        background-color: var(--cr-accent-muted);
        color: var(--cr-accent);
        font-weight: 500;
    }

    .content-header-right {
        display: flex;
        gap: 8px;
    }

    /* ========================================
       Chat Container (Preserved from original)
       ======================================== */
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
        font-family: var(--vscode-editor-font-family);
        font-size: var(--vscode-editor-font-size, 13px);
        line-height: 1.5;
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
        font-size: 12px;
        color: var(--cr-text-primary);
    }

    .tool-input {
        padding: 8px;
        font-family: var(--vscode-editor-font-family);
        font-size: 12px;
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
       Permission Request - Orange Theme
       ======================================== */
    .permission-request {
        margin: 8px 0;
        background-color: rgba(249, 115, 22, 0.08);
        border: 1px solid rgba(249, 115, 22, 0.25);
        border-radius: var(--cr-radius-lg);
        padding: 16px;
        animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .permission-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        font-weight: 600;
        color: var(--cr-text-primary);
    }

    .permission-header .icon {
        font-size: 16px;
        color: var(--cr-accent);
    }

    .permission-content {
        font-size: 12px;
        line-height: 1.4;
        color: var(--cr-text-secondary);
    }

    .permission-tool {
        font-family: var(--vscode-editor-font-family);
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        padding: 8px 10px;
        margin: 8px 0;
        font-size: 11px;
    }

    .permission-buttons {
        margin-top: 12px;
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }

    .permission-buttons .btn {
        font-size: 11px;
        padding: 6px 14px;
        border-radius: var(--cr-radius-sm);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .permission-buttons .btn.allow {
        background-color: var(--cr-accent);
        color: white;
        border: none;
    }

    .permission-buttons .btn.allow:hover {
        background-color: var(--cr-accent-hover);
    }

    .permission-buttons .btn.deny {
        background-color: transparent;
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border);
    }

    .permission-buttons .btn.deny:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-text-secondary);
    }

    .permission-buttons .btn.always-allow {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .permission-buttons .btn.always-allow:hover {
        background-color: rgba(59, 130, 246, 0.2);
    }

    .permission-decision {
        font-size: 12px;
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
        background-color: var(--cr-bg-surface);
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

    .textarea-wrapper {
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
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
        padding: 12px;
        outline: none;
        font-family: var(--vscode-editor-font-family);
        font-size: 13px;
        min-height: 60px;
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

    .send-btn {
        background-color: var(--cr-accent);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 11px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
    }

    .send-btn:hover {
        background-color: var(--cr-accent-hover);
    }

    .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* ========================================
       Status Bar
       ======================================== */
    .status {
        padding: 6px 16px;
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-secondary);
        font-size: 11px;
        border-top: 1px solid var(--cr-border);
        display: flex;
        align-items: center;
        gap: 8px;
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
        animation: pulse 1.5s ease-in-out infinite;
    }

    .status.error .status-indicator {
        background-color: var(--cr-status-error);
        box-shadow: 0 0 6px var(--cr-status-error);
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }

    .status-text {
        flex: 1;
    }

    .status-text .usage-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: var(--cr-bg-elevated);
        padding: 2px 8px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.15s ease;
    }

    .status-text .usage-badge:hover {
        background: var(--cr-bg-hover);
    }

    .btn.stop {
        background: transparent;
        color: var(--cr-text-secondary);
        border: 1px solid var(--cr-border);
        padding: 2px 8px;
        border-radius: var(--cr-radius-sm);
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
    }

    .btn.stop:hover {
        background: rgba(239, 68, 68, 0.1);
        color: var(--cr-status-error);
        border-color: var(--cr-status-error);
    }

    /* ========================================
       Buttons - General
       ======================================== */
    .btn {
        background-color: var(--cr-accent);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .btn:hover {
        background-color: var(--cr-accent-hover);
    }

    .btn.outlined {
        background: transparent;
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border);
    }

    .btn.outlined:hover {
        background-color: var(--cr-bg-hover);
        border-color: var(--cr-text-secondary);
    }

    .btn.primary {
        background-color: var(--cr-accent);
        color: white;
    }

    .btn.primary:hover {
        background-color: var(--cr-accent-hover);
    }

    /* ========================================
       Code Blocks
       ======================================== */
    .message-content pre.code-block {
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        padding: 12px;
        margin: 8px 0;
        overflow-x: auto;
        font-family: var(--vscode-editor-font-family);
        font-size: 12px;
        line-height: 1.5;
    }

    .message-content code {
        background-color: var(--cr-bg-elevated);
        border: 1px solid var(--cr-border);
        border-radius: 3px;
        padding: 2px 5px;
        font-family: var(--vscode-editor-font-family);
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
        font-family: var(--vscode-editor-font-family);
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
        font-family: var(--vscode-editor-font-family);
        font-size: 12px;
        line-height: 1.5;
    }

    .diff-line.removed {
        background-color: rgba(239, 68, 68, 0.1);
        color: #fca5a5;
    }

    .diff-line.added {
        background-color: rgba(34, 197, 94, 0.1);
        color: #86efac;
    }

    .diff-file-path {
        padding: 8px 12px;
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-sm);
        font-size: 12px;
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
    .file-picker-modal,
    .tools-modal {
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

    .file-picker-content,
    .tools-modal-content {
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

    .file-picker-header,
    .tools-modal-header {
        padding: 16px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tools-close-btn {
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        border-radius: var(--cr-radius-sm);
        transition: all 0.15s ease;
    }

    .tools-close-btn:hover {
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
        background-color: var(--cr-bg-elevated);
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
        font-size: 14px;
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
        font-size: 20px;
    }

    .wsl-alert-text {
        flex: 1;
        font-size: 12px;
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
        font-size: 11px;
        color: var(--cr-accent);
        text-align: center;
        font-weight: 500;
        background-color: var(--cr-accent-muted);
        border: 1px solid rgba(249, 115, 22, 0.3);
        padding: 6px 12px;
        margin: 4px 12px;
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
       Responsive - Hide sidebar on small screens
       ======================================== */
    @media (max-width: 600px) {
        .agent-sidebar {
            display: none;
        }
        
        :root {
            --cr-sidebar-width: 0px;
        }
    }

    /* ========================================
       MCP Servers (from original)
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
        font-size: 14px;
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
        font-size: 12px;
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
        font-size: 12px;
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
        font-size: 12px;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--cr-accent);
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
        font-size: 12px;
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
        font-size: 20px;
    }

    .popular-server-name {
        font-weight: 500;
        font-size: 12px;
    }

    .popular-server-desc {
        font-size: 10px;
        color: var(--cr-text-secondary);
    }

    /* ========================================
       Install Modal
       ======================================== */
    .install-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

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
    }

    .install-title {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
    }

    .install-desc {
        margin: 0 0 20px 0;
        font-size: 12px;
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

    /* ========================================
       Permissions (from original, adapted)
       ======================================== */
    .permission-menu {
        position: relative;
        margin-left: auto;
    }

    .permission-menu-btn {
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        padding: 4px 8px;
        border-radius: var(--cr-radius-sm);
        font-size: 14px;
        line-height: 1;
        transition: all 0.15s ease;
    }

    .permission-menu-btn:hover {
        background-color: var(--cr-bg-hover);
        color: var(--cr-text-primary);
    }

    .permission-menu-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-md);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        min-width: 200px;
        padding: 4px 0;
        margin-top: 4px;
    }

    .permission-menu-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 10px 12px;
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        color: var(--cr-text-primary);
        transition: background-color 0.15s ease;
    }

    .permission-menu-item:hover {
        background-color: var(--cr-bg-hover);
    }

    .permissions-list {
        max-height: 250px;
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
    }

    .permission-item:last-child {
        border-bottom: none;
    }

    .permission-item:hover {
        background-color: var(--cr-bg-hover);
    }

    .permissions-empty {
        padding: 16px;
        text-align: center;
        color: var(--cr-text-secondary);
        font-style: italic;
        font-size: 12px;
    }

    /* ========================================
       Slash Commands Modal
       ======================================== */
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
        background-color: var(--cr-bg-elevated);
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
        font-size: 12px;
        outline: none;
    }

    .slash-commands-list {
        display: grid;
        gap: 4px;
        padding: 8px 16px;
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
        font-size: 14px;
        min-width: 20px;
        text-align: center;
    }

    .slash-command-title {
        font-size: 12px;
        font-weight: 500;
    }

    .slash-command-description {
        font-size: 10px;
        color: var(--cr-text-secondary);
    }

    /* ========================================
       Settings Group
       ======================================== */
    .settings-group {
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--cr-border);
    }

    .settings-group h3 {
        margin: 0 0 12px 0;
        font-size: 12px;
        font-weight: 600;
        color: var(--cr-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .thinking-slider-container {
        padding: 0 8px;
        margin: 12px 0;
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

    /* Restore container */
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

    /* Markdown styles in messages */
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

    /* Priority badges */
    .priority-badge {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .priority-badge.high {
        background: rgba(239, 68, 68, 0.15);
        color: var(--cr-status-error);
    }

    .priority-badge.medium {
        background: rgba(249, 115, 22, 0.15);
        color: var(--cr-accent);
    }

    .priority-badge.low {
        background: rgba(107, 114, 128, 0.15);
        color: var(--cr-status-idle);
    }

    /* Expand button */
    .expand-btn {
        background: var(--cr-accent-muted);
        border: 1px solid rgba(249, 115, 22, 0.3);
        color: var(--cr-accent);
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
        background: var(--cr-bg-elevated);
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

    /* Textarea container override */
    .textarea-container {
        display: flex;
        gap: 10px;
        align-items: flex-end;
    }
</style>
`;

export default styles;
