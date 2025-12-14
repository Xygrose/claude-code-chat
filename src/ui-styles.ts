/**
 * The Control Room - UI Styles
 * Multi-Agent Command Center for Claude Code
 *
 * Design Philosophy:
 * - VS Code native dark theme compatibility
 * - Clean, high-contrast text
 * - Subtle amber accents
 * - Smooth animations
 *
 * Color Reference (VS Code aligned):
 * - Base: #1e1e1e (VS Code editor bg)
 * - Surface: #252526 (VS Code sidebar)
 * - Accent: #D97706 (burnt amber)
 * - Text: #e4e4e7, #d4d4d8, #a1a1aa
 */

const styles = `
<style>
    /* ========================================
       CSS Variables - Control Room Theme
       ======================================== */
    :root {
        /* ====== VS CODE ALIGNED DARK PALETTE ====== */
        /* Base colors - matching VS Code dark theme */
        --cr-bg-base: #1e1e1e;
        /* VS Code editor background */
        --cr-bg-surface: #252526;
        /* VS Code sidebar */
        --cr-bg-surface-dark: #1a1a1a;
        /* Slightly darker for code blocks */
        --cr-bg-elevated: #2d2d2d;
        /* Elevated elements */
        --cr-bg-glass: rgba(37, 37, 38, 0.85);
        /* Glassmorphism base */
        --cr-bg-hover: rgba(255, 255, 255, 0.08);

        /* Text colors - high contrast for readability */
        --cr-text-primary: #e4e4e7;
        /* zinc-200 - bright, readable */
        --cr-text-secondary: #d4d4d8;
        /* zinc-300 - good contrast */
        --cr-text-muted: #a1a1aa;
        /* zinc-400 - subtle but visible */

        /* ====== BURNT AMBER ACCENT ====== */
        --cr-accent: #D97706;
        /* amber-600 - primary */
        --cr-accent-hover: #F59E0B;
        /* amber-500 - hover */
        --cr-accent-glow: rgba(217, 119, 6, 0.4);
        --cr-accent-muted: rgba(217, 119, 6, 0.15);
        --cr-accent-subtle: rgba(217, 119, 6, 0.08);

        /* Secondary accent - Cyan for tools */
        --cr-secondary: #06B6D4;
        /* cyan-500 */
        --cr-secondary-glow: rgba(6, 182, 212, 0.3);

        /* Gradients */
        --cr-gradient-accent: linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%);
        --cr-gradient-header: linear-gradient(180deg, rgba(217, 119, 6, 0.08) 0%, transparent 100%);
        --cr-gradient-border: linear-gradient(135deg, rgba(217, 119, 6, 0.5) 0%, rgba(217, 119, 6, 0.1) 100%);

        /* Status colors */
        --cr-status-running: #22c55e;
        /* green-500 */
        --cr-status-idle: #6b7280;
        /* gray-500 */
        --cr-status-completed: #3b82f6;
        /* blue-500 */
        --cr-status-error: #ef4444;
        /* red-500 */
        --cr-status-warning: #eab308;
        /* yellow-500 */

        /* Code/Tool colors */
        --cr-tool-cyan: #22d3ee;
        /* cyan-400 */
        --cr-diff-removed: #f87171;
        /* red-400 */
        --cr-diff-added: #4ade80;
        /* green-400 */

        /* Message colors */
        --cr-msg-user: #3b82f6;
        /* blue-500 */
        --cr-msg-claude: #22c55e;
        /* green-500 */
        --cr-msg-tool: #8b5cf6;
        /* violet-500 */
        --cr-msg-error: #ef4444;
        /* red-500 */
        --cr-msg-thinking: #a855f7;
        /* purple-500 */

        /* Border colors - more visible */
        --cr-border: #3c3c3c;
        /* Visible border */
        --cr-border-hover: #4a4a4a;
        /* Hover border */
        --cr-border-focus: #D97706;
        /* Focus - amber */
        --cr-border-glass: rgba(255, 255, 255, 0.1);

        /* Sizing */
        --cr-sidebar-width: 280px;
        --cr-header-height: 56px;
        --cr-input-height: 120px;
        --cr-radius-sm: 6px;
        --cr-radius-md: 10px;
        --cr-radius-lg: 14px;

        /* ====== PREMIUM TYPOGRAPHY ====== */
        --cr-font-display: 'Space Grotesk', system-ui, sans-serif;
        --cr-font-sans: 'Inter', system-ui, sans-serif;
        --cr-font-mono: 'JetBrains Mono', ui-monospace, monospace;

        /* Font sizes */
        --cr-text-xs: 11px;
        --cr-text-sm: 13px;
        --cr-text-base: 14px;
        --cr-text-lg: 16px;
        --cr-text-xl: 20px;

        /* Letter spacing */
        --cr-tracking-tight: -0.02em;
        --cr-tracking-wide: 0.05em;
        --cr-tracking-wider: 0.1em;

        /* ====== SHADOWS & GLOWS ====== */
        --cr-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
        --cr-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
        --cr-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
        --cr-shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
        --cr-glow-accent: 0 0 20px rgba(217, 119, 6, 0.3);
        --cr-glow-accent-strong: 0 0 40px rgba(217, 119, 6, 0.5);

        /* ====== ANIMATION TIMING ====== */
        --cr-ease-out: cubic-bezier(0.4, 0, 0.2, 1);
        --cr-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
        --cr-duration-fast: 0.15s;
        --cr-duration-normal: 0.25s;
        --cr-duration-slow: 0.4s;
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
        font-size: var(--cr-text-base);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* ========================================
       Header - Command Bar
       ======================================== */
    .cr-header {
        height: var(--cr-header-height);
        padding: 0 20px;
        border-bottom: 1px solid var(--cr-border);
        background: linear-gradient(180deg,
                rgba(26, 26, 31, 0.95) 0%,
                rgba(26, 26, 31, 0.85) 100%);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        position: relative;
        z-index: 10;
        box-shadow: var(--cr-shadow-md);
    }

    /* Subtle amber glow line at bottom of header */
    .cr-header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 15%;
        right: 15%;
        height: 1px;
        background: linear-gradient(90deg,
                transparent 0%,
                rgba(217, 119, 6, 0.5) 50%,
                transparent 100%);
    }

    /* Minimal header mode */
    .cr-header.minimal {
        height: 52px;
        padding: 0 24px;
        background: rgba(15, 15, 18, 0.95);
        border-bottom: 1px solid var(--cr-border-glass);
    }

    .cr-header.minimal::after {
        display: none;
    }

    .cr-header.minimal .cr-logo {
        width: 32px;
        height: 32px;
        font-size: 12px;
    }

    .cr-header.minimal .cr-title {
        font-size: var(--cr-text-lg);
        display: none;
    }

    .cr-header-left {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .cr-logo {
        width: 38px;
        height: 38px;
        border-radius: var(--cr-radius-md);
        background: var(--cr-gradient-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-sm);
        font-weight: 700;
        color: white;
        box-shadow: var(--cr-glow-accent);
        transition: all var(--cr-duration-normal) var(--cr-ease-out);
    }

    .cr-logo:hover {
        transform: scale(1.05);
        box-shadow: var(--cr-glow-accent-strong);
    }

    .cr-title {
        margin: 0;
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-xl);
        font-weight: 700;
        letter-spacing: var(--cr-tracking-tight);
        text-transform: uppercase;
        background: var(--cr-gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .cr-stats {
        display: flex;
        gap: 16px;
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-xs);
    }

    .cr-stats .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: var(--cr-radius-sm);
        border: 1px solid var(--cr-border-glass);
    }

    .cr-stats .stat-label {
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: var(--cr-tracking-wider);
        color: var(--cr-text-muted);
    }

    .cr-stats .stat-value {
        font-size: var(--cr-text-sm);
        font-weight: 600;
        color: var(--cr-accent);
    }

    .cr-header-right {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    /* ========================================
       Tab Navigation
       ======================================== */
    .cr-tabs {
        display: flex;
        gap: 2px;
        background: rgba(255, 255, 255, 0.03);
        padding: 3px;
        border-radius: 8px;
        border: 1px solid var(--cr-border-glass);
    }

    .cr-tab {
        padding: 6px 14px;
        border-radius: 6px;
        font-family: var(--cr-font-sans);
        font-size: 13px;
        font-weight: 500;
        color: var(--cr-text-muted);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--cr-duration-fast) var(--cr-ease-out);
    }

    .cr-tab:hover {
        color: var(--cr-text-secondary);
    }

    .cr-tab.active {
        color: var(--cr-text-primary);
        background: var(--cr-bg-surface);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .cr-tab.panel-toggle {
        position: relative;
        padding-right: 24px;
    }

    .cr-tab.panel-toggle::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        width: 5px;
        height: 5px;
        border-right: 1.5px solid currentColor;
        border-bottom: 1.5px solid currentColor;
        transform: translateY(-50%) rotate(-45deg);
        transition: transform 0.2s ease;
    }

    .cr-tab.panel-toggle.open::after {
        transform: translateY(-50%) rotate(45deg);
    }

    /* ========================================
       Main Layout - Split View
       ======================================== */
    .cr-main {
        flex: 1;
        display: flex;
        overflow: hidden;
        transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body.sidebar-open .cr-main {
        margin-right: 320px;
    }

    /* Hide sidebar in chat mode */
    .cr-main.chat-mode .cr-sidebar {
        display: none;
    }

    .cr-main.chat-mode .cr-content {
        max-width: 900px;
        margin: 0 auto;
        width: 100%;
    }

    .cr-main.chat-mode .cr-agent-header {
        display: none;
    }

    /* ========================================
       View Containers
       ======================================== */
    .cr-view {
        display: none;
        flex: 1;
        overflow: hidden;
    }

    .cr-view.active {
        display: flex;
        flex-direction: column;
    }

    /* Chat View - Clean, centered */
    .cr-chat-view {
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
    }

    .cr-chat-view .messages {
        background: transparent;
        padding: 24px 0;
    }

    .cr-chat-view .message {
        max-width: 100%;
        margin-bottom: 6px;
    }

    .cr-chat-view .input-container {
        background: transparent;
        border-top: none;
        padding: 16px 0 24px 0;
    }

    /* Agents View - Full width grid */
    .cr-agents-view {
        padding: 24px;
    }

    .cr-agents-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .cr-agents-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .cr-agents-title {
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-xl);
        font-weight: 600;
        color: var(--cr-text-primary);
    }

    /* ========================================
       Agent Sidebar (Legacy - Hidden by default)
       ======================================== */
    .cr-sidebar {
        width: var(--cr-sidebar-width);
        background: rgba(26, 26, 31, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-right: 1px solid var(--cr-border-glass);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        position: relative;
    }

    .cr-sidebar-header {
        padding: 14px 16px;
        padding-left: 48px;
        border-bottom: 1px solid var(--cr-border);
        position: relative;
    }

    .cr-sidebar-header::before {
        content: '01';
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-family: var(--cr-font-display);
        font-size: 10px;
        font-weight: 600;
        color: var(--cr-accent);
        opacity: 0.6;
        letter-spacing: 1px;
    }

    .cr-sidebar-label {
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-xs);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: var(--cr-tracking-wider);
        color: var(--cr-accent);
    }

    .cr-agent-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }

    /* ========================================
       Agent Card - Premium glassmorphism
       ======================================== */
    .agent-card {
        padding: 14px 16px;
        border-radius: var(--cr-radius-lg);
        margin-bottom: 10px;
        cursor: pointer;
        border: 1px solid var(--cr-border-glass);
        background: rgba(26, 26, 31, 0.5);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: all var(--cr-duration-normal) var(--cr-ease-out);
        position: relative;
        overflow: hidden;
    }

    .agent-card::before {
        content: attr(data-index);
        position: absolute;
        top: 8px;
        right: 10px;
        font-family: var(--cr-font-display);
        font-size: 10px;
        font-weight: 600;
        color: var(--cr-text-muted);
        opacity: 0.4;
        letter-spacing: 1px;
    }

    .agent-card:hover {
        background: rgba(26, 26, 31, 0.7);
        border-color: rgba(217, 119, 6, 0.3);
        transform: translateX(4px);
        box-shadow: -4px 0 0 0 var(--cr-accent);
    }

    .agent-card.selected {
        background: rgba(217, 119, 6, 0.1);
        border-color: var(--cr-accent);
        box-shadow:
            0 0 0 1px var(--cr-accent),
            inset 0 0 30px rgba(217, 119, 6, 0.05),
            var(--cr-glow-accent);
    }

    .agent-card.selected::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--cr-gradient-accent);
        animation: borderPulse 2s ease-in-out infinite;
    }

    @keyframes borderPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }

    .agent-card.grid-card {
        padding: 20px;
        min-height: 120px;
        display: flex;
        flex-direction: column;
    }

    .agent-card.grid-card .agent-name {
        font-size: var(--cr-text-base);
        margin-bottom: 8px;
    }

    .agent-card.grid-card .agent-task {
        flex: 1;
        margin-bottom: 12px;
    }

    .agent-card.grid-card .agent-meta {
        margin-top: auto;
        padding-top: 8px;
        border-top: 1px solid var(--cr-border-glass);
    }

    .agent-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .agent-name {
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-sm);
        font-weight: 600;
        letter-spacing: var(--cr-tracking-tight);
        color: var(--cr-text-primary);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Enhanced Status Dot with glow */
    .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
        position: relative;
    }

    .status-dot::before {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .status-dot.running {
        background-color: var(--cr-status-running);
        box-shadow: 0 0 8px var(--cr-status-running);
        animation: statusGlow 2s ease-in-out infinite;
    }

    .status-dot.running::before {
        border: 1px solid var(--cr-status-running);
        opacity: 0.5;
        animation: ringPulse 2s ease-in-out infinite;
    }

    @keyframes statusGlow {
        0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px var(--cr-status-running);
        }
        50% {
            opacity: 0.7;
            box-shadow: 0 0 16px var(--cr-status-running);
        }
    }

    @keyframes ringPulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.8);
            opacity: 0;
        }
    }

    .status-dot.idle {
        background-color: var(--cr-status-idle);
        box-shadow: 0 0 4px rgba(107, 114, 128, 0.3);
    }

    .status-dot.completed {
        background-color: var(--cr-status-completed);
        box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
    }

    .status-dot.error {
        background-color: var(--cr-status-error);
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
        animation: errorPulse 1s ease-in-out infinite;
    }

    @keyframes errorPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
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
        font-family: var(--cr-font-mono);
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
        position: relative;
        z-index: 1;
    }

    /* Agent Content Header */
    .cr-agent-header {
        padding: 14px 20px;
        padding-left: 52px;
        border-bottom: 1px solid var(--cr-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(180deg,
                rgba(26, 26, 31, 0.6) 0%,
                transparent 100%);
        position: relative;
    }

    .cr-agent-header::before {
        content: '02';
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-family: var(--cr-font-display);
        font-size: 10px;
        font-weight: 600;
        color: var(--cr-accent);
        opacity: 0.6;
        letter-spacing: 1px;
    }

    .cr-agent-info {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .cr-agent-name {
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-lg);
        font-weight: 600;
        color: var(--cr-text-primary);
        letter-spacing: var(--cr-tracking-tight);
    }

    .cr-agent-task-label {
        font-size: var(--cr-text-sm);
        color: var(--cr-text-muted);
    }

    .cr-agent-controls {
        display: flex;
        gap: 10px;
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
        padding: 20px;
        overflow-y: auto;
        background: var(--cr-bg-base);
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-base);
        line-height: 1.6;
        color: var(--cr-text-primary);
    }

    /* Custom scrollbar for messages */
    .messages::-webkit-scrollbar {
        width: 6px;
    }

    .messages::-webkit-scrollbar-track {
        background: transparent;
    }

    .messages::-webkit-scrollbar-thumb {
        background: rgba(217, 119, 6, 0.3);
        border-radius: 3px;
    }

    .messages::-webkit-scrollbar-thumb:hover {
        background: rgba(217, 119, 6, 0.5);
    }

    /* ========================================
       Empty State
       ======================================== */
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 400px;
        color: var(--cr-text-muted);
        text-align: center;
        padding: 60px 40px;
    }

    .empty-state-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 24px;
        opacity: 0.15;
        stroke-width: 1;
    }

    .empty-state-title {
        font-family: var(--cr-font-display);
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--cr-text-primary);
        letter-spacing: -0.02em;
    }

    .empty-state-text {
        font-size: var(--cr-text-sm);
        max-width: 340px;
        line-height: 1.6;
        color: var(--cr-text-muted);
    }

    /* ========================================
       Messages - Clean, compact styling
       ======================================== */
    .message {
        margin-bottom: 6px;
        padding: 10px 14px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        border: none;
        background: transparent;
    }

    .message:hover {
        background: rgba(255, 255, 255, 0.02);
    }

    .message::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        border-radius: 3px;
    }

    .message.user::before {
        background: #3B82F6;
    }

    .message.claude::before {
        background: #22C55E;
    }

    .message.error::before {
        background: #EF4444;
    }

    .message.tool::before {
        background: #8B5CF6;
    }

    .message.tool-result::before {
        background: #14B8A6;
    }

    .message.thinking::before {
        background: #A855F7;
        opacity: 0.5;
    }

    .message.system {
        background-color: transparent;
        border: none;
        color: var(--cr-text-muted);
        font-style: italic;
        padding: 8px 12px;
        font-size: var(--cr-text-sm);
    }

    .message.system::before {
        display: none;
    }

    .message-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
    }

    .message-icon {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
    }

    .message-icon.user {
        background: var(--cr-msg-user);
    }

    .message-icon.claude {
        background: var(--cr-msg-claude);
    }

    .message-icon.error {
        background: var(--cr-msg-error);
    }

    .message-label {
        font-weight: 500;
        font-size: 12px;
        color: var(--cr-text-secondary);
    }

    .copy-btn {
        background: transparent;
        border: none;
        color: var(--cr-text-muted);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        opacity: 0;
        transition: all 0.15s ease;
        margin-left: auto;
    }

    .message:hover .copy-btn {
        opacity: 0.5;
    }

    .copy-btn:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.05);
    }

    .message-content {
        line-height: 1.5;
        color: var(--cr-text-primary);
    }

    /* ========================================
       Streaming Message Styles
       ======================================== */
    .streaming-cursor {
        display: inline-block;
        width: 8px;
        height: 16px;
        background-color: var(--cr-accent);
        margin-left: 2px;
        vertical-align: text-bottom;
        animation: cursor-blink 0.7s infinite;
    }

    @keyframes cursor-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .message.streaming {
        border-left: 2px solid var(--cr-accent);
        padding-left: 10px;
    }

    .message.streaming .message-content {
        min-height: 20px;
    }

    /* ========================================
       Tool Messages
       ======================================== */
    .tool-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
        padding-bottom: 6px;
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
        padding: 0 20px;
    }

    .permission-request,
    .tool-approval-card {
        margin: 16px 0;
        background: rgba(26, 26, 31, 0.8);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: var(--cr-radius-lg);
        padding: 16px;
        animation: slideUp 0.3s var(--cr-ease-out);
        position: relative;
        overflow: hidden;
        border: 1px solid transparent;
    }

    .permission-request::before,
    .tool-approval-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg,
                rgba(234, 179, 8, 0.6) 0%,
                rgba(234, 179, 8, 0.2) 50%,
                rgba(234, 179, 8, 0.4) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: borderGlow 2s ease-in-out infinite;
    }

    @keyframes borderGlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .permission-header,
    .tool-approval-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .permission-header .tool-name,
    .tool-approval-header .tool-name {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--cr-status-warning);
        font-family: var(--cr-font-display);
        font-size: var(--cr-text-sm);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: var(--cr-tracking-wide);
    }

    .permission-content,
    .tool-approval-content {
        font-size: var(--cr-text-xs);
        line-height: 1.5;
        color: var(--cr-text-secondary);
    }

    .permission-tool,
    .tool-approval-preview {
        font-family: var(--cr-font-mono);
        background: rgba(0, 0, 0, 0.4);
        border-radius: var(--cr-radius-sm);
        padding: 12px;
        margin: 12px 0;
        font-size: var(--cr-text-xs);
        overflow-x: auto;
        border: 1px solid var(--cr-border-glass);
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
        padding: 16px 20px;
        background: linear-gradient(180deg,
                transparent 0%,
                rgba(26, 26, 31, 0.5) 100%);
        border-top: 1px solid rgba(217, 119, 6, 0.1);
    }

    /* Streamlined input mode */
    .input-container.streamlined {
        background: transparent;
        border-top: none;
        padding: 16px 24px 24px 24px;
        max-width: 900px;
        margin: 0 auto;
        width: 100%;
        position: relative;
    }

    .input-container.streamlined .input-modes {
        display: none;
    }

    .input-container.streamlined .textarea-wrapper {
        background: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .input-container.streamlined .textarea-wrapper:focus-within {
        border-color: var(--cr-accent);
        box-shadow:
            0 2px 12px rgba(0, 0, 0, 0.2),
            0 0 0 2px rgba(217, 119, 6, 0.15);
    }

    .input-container.streamlined .input-field {
        padding: 16px 18px;
        min-height: 56px;
    }

    .input-container.streamlined .input-controls {
        padding: 8px 12px 10px;
        background: rgba(0, 0, 0, 0.1);
    }

    .input-modes {
        display: flex;
        gap: 20px;
        margin-bottom: 10px;
        font-size: var(--cr-text-xs);
    }

    .mode-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--cr-text-secondary);
        cursor: pointer;
        transition: color var(--cr-duration-fast) ease;
        font-family: var(--cr-font-sans);
    }

    .mode-toggle:hover {
        color: var(--cr-text-primary);
    }

    .mode-switch {
        position: relative;
        width: 32px;
        height: 16px;
        background-color: var(--cr-border);
        border-radius: 8px;
        cursor: pointer;
        transition: all var(--cr-duration-normal) var(--cr-ease-out);
    }

    .mode-switch.active {
        background: var(--cr-gradient-accent);
        box-shadow: 0 0 10px rgba(217, 119, 6, 0.3);
    }

    .mode-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
        transition: transform var(--cr-duration-normal) var(--cr-ease-bounce);
        box-shadow: var(--cr-shadow-sm);
    }

    .mode-switch.active::after {
        transform: translateX(16px);
    }

    .textarea-container {
        display: flex;
        gap: 12px;
        align-items: flex-end;
    }

    .textarea-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--cr-bg-surface);
        border: 1px solid var(--cr-border);
        border-radius: var(--cr-radius-lg);
        overflow: hidden;
        transition: all var(--cr-duration-normal) var(--cr-ease-out);
    }

    .textarea-wrapper:focus-within {
        border-color: var(--cr-accent);
        box-shadow:
            0 0 0 3px rgba(217, 119, 6, 0.1),
            var(--cr-glow-accent);
    }

    .input-field {
        width: 100%;
        background-color: transparent;
        color: var(--cr-text-primary);
        border: none;
        padding: 14px 18px;
        outline: none;
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-base);
        min-height: 52px;
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
        padding: 8px 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.03);
    }

    .left-controls,
    .right-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* ========================================
       Claude Code Mode Toggle
       ======================================== */
    .mode-toggle-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .mode-toggle-container {
        display: inline-flex;
        align-items: center;
        background: #0a0a0c;
        border-radius: 8px;
        padding: 3px;
        gap: 2px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    .mode-toggle-option {
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: none;
        background: transparent;
        color: var(--cr-text-muted);
        font-family: var(--cr-font-sans);
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .mode-toggle-option:hover:not(.active) {
        color: var(--cr-text-secondary);
        background: rgba(255, 255, 255, 0.04);
    }

    .mode-toggle-option.active {
        background: rgba(255, 255, 255, 0.1);
        color: var(--cr-text-primary);
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .mode-toggle-option svg {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        opacity: 0.7;
    }

    .mode-toggle-option.active svg {
        opacity: 1;
    }

    .mode-toggle-option[data-mode="plan"] svg { color: #60a5fa; }
    .mode-toggle-option[data-mode="auto"] svg { color: #4ade80; }
    .mode-toggle-option[data-mode="ask"] svg { color: #f59e0b; }

    .mode-toggle-option.active[data-mode="plan"] { background: rgba(96, 165, 250, 0.15); }
    .mode-toggle-option.active[data-mode="auto"] { background: rgba(74, 222, 128, 0.15); }
    .mode-toggle-option.active[data-mode="ask"] { background: rgba(245, 158, 11, 0.15); }

    .mode-toggle-separator {
        width: 1px;
        height: 16px;
        background: rgba(255, 255, 255, 0.08);
    }

    .model-selector,
    .tools-btn {
        background: transparent;
        color: var(--cr-text-muted);
        border: none;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
    }

    .model-selector:hover,
    .tools-btn:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--cr-text-secondary);
    }

    .slash-btn,
    .at-btn,
    .image-btn {
        background: transparent;
        color: var(--cr-text-muted);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
    }

    .slash-btn:hover,
    .at-btn:hover,
    .image-btn:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--cr-text-secondary);
    }

    /* ========================================
       Inline Slash Command Menu
       ======================================== */
    .slash-command-menu {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        margin-bottom: 8px;
        background: rgba(26, 26, 31, 0.95);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid var(--cr-border-glass);
        border-radius: var(--cr-radius-md);
        box-shadow: var(--cr-shadow-lg);
        max-height: 300px;
        overflow-y: auto;
        display: none;
        z-index: 100;
        padding: 6px;
    }

    .slash-command-menu.visible {
        display: block;
        animation: slideUpFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .slash-menu-header {
        padding: 8px 10px 4px;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--cr-text-muted);
        font-weight: 600;
        margin-top: 4px;
    }

    .slash-menu-header:first-child {
        margin-top: 0;
    }

    .slash-menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        transition: all 0.1s ease;
        color: var(--cr-text-secondary);
        margin-bottom: 2px;
    }

    .slash-menu-item:hover,
    .slash-menu-item.active {
        background: var(--cr-accent);
        color: white;
    }

    .slash-menu-item:hover .slash-menu-desc,
    .slash-menu-item.active .slash-menu-desc {
        color: rgba(255, 255, 255, 0.8);
    }

    .slash-menu-item:hover .slash-menu-icon,
    .slash-menu-item.active .slash-menu-icon {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }

    .slash-menu-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        color: var(--cr-text-muted);
        font-size: 12px;
        transition: all 0.2s ease;
    }

    .slash-menu-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .slash-menu-title {
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .slash-menu-desc {
        font-size: 11px;
        color: var(--cr-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: 0.8;
    }

    /* ========================================
       Buttons - Premium Styling
       ======================================== */
    .btn {
        background-color: var(--cr-bg-surface);
        color: var(--cr-text-primary);
        border: none;
        padding: 8px 14px;
        border-radius: var(--cr-radius-sm);
        cursor: pointer;
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-sm);
        font-weight: 500;
        transition: all var(--cr-duration-normal) var(--cr-ease-out);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        position: relative;
        overflow: hidden;
    }

    .btn:hover {
        background-color: var(--cr-border);
        transform: translateY(-1px);
    }

    .btn:active {
        transform: translateY(0);
    }

    .btn.icon {
        padding: 8px;
        background: transparent;
        color: var(--cr-text-muted);
        border-radius: 8px;
    }

    .btn.icon:hover {
        background-color: rgba(255, 255, 255, 0.06);
        color: var(--cr-text-secondary);
        transform: none;
    }

    .btn.icon:active {
        background-color: rgba(255, 255, 255, 0.1);
        transform: none;
    }

    .btn.small {
        padding: 5px 10px;
        font-size: var(--cr-text-xs);
    }

    /* Primary Button - Clean and subtle */
    .btn.primary {
        background: var(--cr-accent);
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: var(--cr-radius-md);
        cursor: pointer;
        font-family: var(--cr-font-sans);
        font-size: var(--cr-text-sm);
        font-weight: 500;
        transition: all var(--cr-duration-fast) var(--cr-ease-out);
    }

    .btn.primary:hover {
        background: var(--cr-accent-hover);
    }

    .btn.primary:active {
        transform: scale(0.98);
    }

    .btn.primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Send button - Compact and clean */
    .send-btn {
        background: var(--cr-accent);
        color: white;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--cr-duration-fast) var(--cr-ease-out);
        margin-left: 4px;
    }

    .send-btn:hover {
        background: var(--cr-accent-hover);
    }

    .send-btn:active {
        transform: scale(0.95);
    }

    .send-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    /* Secondary Button */
    .btn.secondary {
        background: rgba(255, 255, 255, 0.05);
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border-glass);
    }

    .btn.secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--cr-border-hover);
    }

    /* Danger Button */
    .btn.danger,
    .btn.stop {
        background: rgba(239, 68, 68, 0.15);
        color: #F87171;
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .btn.danger:hover,
    .btn.stop:hover {
        background: rgba(239, 68, 68, 0.25);
        border-color: rgba(239, 68, 68, 0.5);
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
    }

    /* Outlined Button */
    .btn.outlined {
        background: transparent;
        color: var(--cr-text-primary);
        border: 1px solid var(--cr-border);
    }

    .btn.outlined:hover {
        background: rgba(217, 119, 6, 0.1);
        border-color: var(--cr-accent);
        color: var(--cr-accent);
    }

    /* Screen reader only utility */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* Session Status Badge */
    .session-status {
        font-family: var(--cr-font-mono);
        font-size: 10px;
        color: var(--cr-text-secondary);
        padding: 4px 10px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--cr-border-glass);
        text-transform: uppercase;
        letter-spacing: var(--cr-tracking-wide);
    }

    .session-status.active {
        color: var(--cr-status-running);
        background: rgba(34, 197, 94, 0.1);
        border-color: rgba(34, 197, 94, 0.3);
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

    /* ========================================
       Code Blocks - Premium Terminal Style
       ======================================== */
    .message-content pre.code-block {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid var(--cr-border-glass);
        border-radius: var(--cr-radius-md);
        padding: 14px;
        margin: 10px 0;
        overflow-x: auto;
        font-family: var(--cr-font-mono);
        font-size: var(--cr-text-xs);
        line-height: 1.6;
    }

    .message-content code {
        background: rgba(217, 119, 6, 0.1);
        border: 1px solid rgba(217, 119, 6, 0.2);
        border-radius: 4px;
        padding: 2px 6px;
        font-family: var(--cr-font-mono);
        font-size: 0.9em;
        color: var(--cr-accent-hover);
    }

    .code-block-container {
        margin: 10px 0;
        border: 1px solid var(--cr-border-glass);
        border-radius: var(--cr-radius-md);
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3);
    }

    .code-block-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: rgba(26, 26, 31, 0.8);
        border-bottom: 1px solid var(--cr-border-glass);
        font-size: 10px;
    }

    .code-block-language {
        color: var(--cr-accent);
        font-family: var(--cr-font-mono);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: var(--cr-tracking-wider);
    }

    .code-copy-btn {
        background: none;
        border: none;
        color: var(--cr-text-secondary);
        cursor: pointer;
        padding: 6px;
        border-radius: var(--cr-radius-sm);
        opacity: 0.7;
        transition: all var(--cr-duration-fast) ease;
    }

    .code-copy-btn:hover {
        background: rgba(217, 119, 6, 0.1);
        color: var(--cr-accent);
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
       Glassmorphic Agent Panel (Pop-out)
       ======================================== */
    .agent-panel-overlay {
        display: none;
    }

    .agent-panel {
        position: fixed;
        top: 52px;
        right: 0;
        width: 0;
        height: calc(100vh - 52px);
        background: rgba(20, 20, 25, 0.85);
        backdrop-filter: blur(24px) saturate(180%);
        -webkit-backdrop-filter: blur(24px) saturate(180%);
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow:
            -8px 0 30px rgba(0, 0, 0, 0.3),
            inset 1px 0 0 rgba(255, 255, 255, 0.05);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .agent-panel.open {
        width: 320px;
    }

    .agent-panel-header {
        padding: 16px 16px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        background: linear-gradient(180deg,
                rgba(217, 119, 6, 0.08) 0%,
                transparent 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .agent-panel-title {
        font-family: var(--cr-font-display);
        font-size: 18px;
        font-weight: 600;
        color: var(--cr-text-primary);
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .agent-panel-title::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--cr-accent);
        box-shadow: 0 0 10px var(--cr-accent-glow);
    }

    .agent-panel-close {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--cr-text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .agent-panel-close:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--cr-accent);
        color: var(--cr-text-primary);
    }

    .agent-panel-content {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        height: 100%;
    }

    .agent-panel-content::-webkit-scrollbar {
        width: 4px;
    }

    .agent-panel-content::-webkit-scrollbar-track {
        background: transparent;
    }

    .agent-panel-content::-webkit-scrollbar-thumb {
        background: rgba(217, 119, 6, 0.2);
        border-radius: 3px;
    }

    .agent-panel-content::-webkit-scrollbar-thumb:hover {
        background: rgba(217, 119, 6, 0.4);
    }

    /* Agent cards in panel */
    .agent-panel .agent-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 8px;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
    }

    .agent-panel .agent-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 50%,
                transparent 100%);
    }

    .agent-panel .agent-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(217, 119, 6, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .agent-panel .agent-card.selected {
        background: rgba(217, 119, 6, 0.08);
        border-color: var(--cr-accent);
        box-shadow:
            0 0 0 1px var(--cr-accent),
            0 8px 24px rgba(217, 119, 6, 0.15),
            inset 0 0 40px rgba(217, 119, 6, 0.03);
    }

    .agent-panel .agent-card.selected::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--cr-gradient-accent);
        border-radius: 0 3px 3px 0;
    }

    /* Agent Status Badge */
    .agent-panel .agent-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 8px;
        border-radius: 20px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-top: 6px;
    }

    .agent-panel .agent-status-badge.idle {
        background: rgba(107, 114, 128, 0.15);
        color: #9ca3af;
    }

    .agent-panel .agent-status-badge.running {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        animation: statusPulseRunning 2s ease-in-out infinite;
    }

    .agent-panel .agent-status-badge.awaiting {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
        animation: statusPulseAwaiting 1.5s ease-in-out infinite;
    }

    @keyframes statusPulseRunning {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    @keyframes statusPulseAwaiting {
        0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
        }
        50% {
            opacity: 0.9;
            box-shadow: 0 0 8px 2px rgba(251, 191, 36, 0.2);
        }
    }

    .agent-panel .agent-status-badge svg {
        width: 10px;
        height: 10px;
    }

    /* Agent Preview Text */
    .agent-panel .agent-preview {
        font-size: 11px;
        color: var(--cr-text-muted);
        margin-top: 8px;
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        border-left: 2px solid var(--cr-border);
        line-height: 1.4;
        max-height: 54px;
        overflow: hidden;
        position: relative;
    }

    .agent-panel .agent-preview.running {
        border-left-color: #4ade80;
    }

    .agent-panel .agent-preview.awaiting {
        border-left-color: #fbbf24;
    }

    .agent-panel .agent-preview-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--cr-text-muted);
        margin-bottom: 4px;
        display: block;
    }

    .agent-panel .agent-preview-text {
        color: var(--cr-text-secondary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .agent-panel .agent-card .agent-meta {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Agent Close Button */
    .agent-close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 20px;
        height: 20px;
        padding: 0;
        border: none;
        background: rgba(255, 255, 255, 0.05);
        color: var(--cr-text-muted);
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        opacity: 0;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .agent-card:hover .agent-close-btn {
        opacity: 1;
    }

    .agent-close-btn:hover {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }

    /* Agent Status Indicator in Card */
    .agent-card .agent-status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 10px;
    }

    .agent-card .agent-status.idle {
        background-color: var(--cr-status-idle);
    }

    .agent-card .agent-status.running {
        background-color: var(--cr-status-running);
        box-shadow: 0 0 8px var(--cr-status-running);
        animation: statusGlow 2s ease-in-out infinite;
    }

    .agent-card .agent-status.completed {
        background-color: var(--cr-status-completed);
    }

    .agent-card .agent-status.error {
        background-color: var(--cr-status-error);
    }

    /* Agent Card Active State */
    .agent-card.active {
        background: rgba(217, 119, 6, 0.08);
        border-color: var(--cr-accent);
    }

    .agent-card.active::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--cr-gradient-accent);
    }

    /* Panel Footer */
    .agent-panel-footer {
        padding: 16px 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(0, 0, 0, 0.2);
    }

    .new-agent-btn {
        width: 100%;
        padding: 12px 20px;
        border-radius: 10px;
        background: linear-gradient(135deg,
                rgba(217, 119, 6, 0.15) 0%,
                rgba(217, 119, 6, 0.08) 100%);
        border: 1px solid rgba(217, 119, 6, 0.3);
        color: var(--cr-accent-hover);
        font-family: var(--cr-font-sans);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .new-agent-btn:hover {
        background: linear-gradient(135deg,
                rgba(217, 119, 6, 0.25) 0%,
                rgba(217, 119, 6, 0.15) 100%);
        border-color: var(--cr-accent);
        box-shadow: 0 0 20px rgba(217, 119, 6, 0.2);
        transform: translateY(-1px);
    }

    .new-agent-btn svg {
        width: 16px;
        height: 16px;
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
        appearance: none;
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

        .cr-chat-view {
            padding: 0 12px;
        }

        .cr-tabs {
            gap: 2px;
            padding: 3px;
        }

        .cr-tab {
            padding: 6px 12px;
            font-size: var(--cr-text-xs);
        }

        .agent-panel {
            width: 100%;
            right: -100%;
        }
    }
</style>
`;

export default styles;
