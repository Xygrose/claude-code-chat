import getScript from './script';
import styles from './ui-styles';


const getHtml = (isTelemetryEnabled: boolean) => `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>The Control Room</title>
	${styles}
</head>
<body>
	<!-- ========================================
	     HEADER - Minimal Command Bar with Tabs
	     ======================================== -->
	<div class="cr-header minimal">
		<div class="cr-header-left">
			<div class="cr-logo">CR</div>
			<!-- Tab Navigation -->
			<div class="cr-tabs">
				<button class="cr-tab active" id="tabChat" onclick="switchTab('chat')">Chat</button>
				<button class="cr-tab panel-toggle" id="tabAgents" onclick="toggleAgentPanel()">Control Panel</button>
			</div>
		</div>
		<div class="cr-header-right">
			<span class="cr-stats" id="globalStats" style="font-size: 11px; color: var(--cr-text-muted);">$0.00</span>
			<button class="btn icon" id="historyBtn" onclick="toggleConversationHistory()" title="History">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
			</button>
			<button class="btn icon" id="settingsBtn" onclick="toggleSettings()" title="Settings">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="3"/>
					<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
				</svg>
			</button>
		</div>
	</div>

	<!-- ========================================
	     MAIN LAYOUT - Tab-based Views
	     ======================================== -->
	<div class="cr-main">
		<!-- ========================================
		     CHAT VIEW - Clean, focused chat interface
		     ======================================== -->
		<div class="cr-view cr-chat-view active" id="chatView">
			<!-- Output Panel -->
			<div class="output-panel">
				<div class="chat-container" id="chatContainer">
					<div class="messages" id="messages">
						<!-- Empty state shown when no messages -->
						<div class="empty-state" id="emptyState">
							<svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M12 3v18m9-9H3"/>
							</svg>
							<div class="empty-state-title">What can I help you build?</div>
							<div class="empty-state-text">I can help you write code, debug issues, refactor projects, and explore your codebase.</div>
						</div>
					</div>

					<!-- WSL Alert for Windows users -->
					<div id="wslAlert" class="wsl-alert" style="display: none;">
						<div class="wsl-alert-content">
							<div class="wsl-alert-icon">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="2" y="3" width="20" height="14" rx="2"/>
									<path d="M8 21h8m-4-4v4"/>
								</svg>
							</div>
							<div class="wsl-alert-text">
								<strong>Windows detected</strong><br/>
								Enable WSL integration in settings if using WSL.
							</div>
							<div class="wsl-alert-actions">
								<button class="btn primary small" onclick="openWSLSettings()">Enable</button>
								<button class="btn secondary small" onclick="dismissWSLAlert()">Dismiss</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Tool Approval Area -->
			<div class="tool-approval-area" id="toolApprovalArea">
				<!-- Tool approval cards will be inserted here dynamically -->
			</div>

			<!-- Streamlined Input Area -->
			<div class="input-container streamlined" id="inputContainer" style="position: relative;">
				<div class="slash-command-menu" id="slashCommandMenu">
					<!-- Dynamically populated -->
				</div>
				<div class="textarea-container">
					<div class="textarea-wrapper">
						<textarea class="input-field" id="messageInput" placeholder="Message Claude... (@ for files, / for commands)" rows="1"></textarea>
						<div class="input-controls">
							<div class="left-controls">
								<button class="model-selector" id="modelSelector" onclick="showModelSelector()" title="Select model">
									<span id="selectedModel">Opus</span>
									<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
										<path d="M1 2.5l3 3 3-3"></path>
									</svg>
								</button>
								<button class="tools-btn" onclick="showMCPModal()" title="Configure MCP servers">
									MCP
									<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
										<path d="M1 2.5l3 3 3-3"></path>
									</svg>
								</button>
							</div>
							<div class="right-controls">
								<button class="slash-btn" onclick="triggerInlineSlashMenu()" title="Commands">/</button>
								<button class="at-btn" onclick="showFilePicker()" title="Files">@</button>
								<button class="image-btn" id="imageBtn" onclick="selectImage()" title="Images">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14">
										<g fill="currentColor">
											<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"></path>
											<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"></path>
										</g>
									</svg>
								</button>
								<button class="send-btn" id="sendBtn" onclick="sendMessage()">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
										<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<button class="btn danger small" id="stopBtn" onclick="stopRequest()" style="display: none; margin-left: 8px;">
						Stop
					</button>
				</div>
				<!-- Claude Code Mode Toggle -->
				<div class="mode-toggle-bar">
					<div class="mode-toggle-container">
						<button class="mode-toggle-option" data-mode="plan" onclick="setEditMode('plan')" title="Plan changes without making edits">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
								<polyline points="14 2 14 8 20 8"/>
								<line x1="16" y1="13" x2="8" y2="13"/>
								<line x1="16" y1="17" x2="8" y2="17"/>
								<polyline points="10 9 9 9 8 9"/>
							</svg>
							<span>Planning Mode</span>
						</button>
						<div class="mode-toggle-separator"></div>
						<button class="mode-toggle-option" data-mode="auto" onclick="setEditMode('auto')" title="Automatically apply edits">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
							</svg>
							<span>Edit Automatically</span>
						</button>
						<div class="mode-toggle-separator"></div>
						<button class="mode-toggle-option active" data-mode="ask" onclick="setEditMode('ask')" title="Ask before making edits">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								<path d="M9 12l2 2 4-4"/>
							</svg>
							<span>Ask Before Edits</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- ========================================
		     AGENTS VIEW - Hidden for compatibility
		     ======================================== -->
		<div class="cr-view cr-agents-view" id="agentsView" style="display: none !important;">
			<div class="cr-agents-header">
				<h2 class="cr-agents-title">Agents</h2>
				<button class="btn primary" id="newAgentBtn" onclick="newSession()">+ New Agent</button>
			</div>
			<div class="cr-agents-grid" id="agentList">
				<!-- Agent Card -->
				<div class="agent-card grid-card selected" id="agent-default" onclick="selectAgentAndSwitch('default')">
					<div class="agent-card-header">
						<span class="agent-name">Agent 1</span>
						<span class="status-dot idle" id="agent-default-status"></span>
					</div>
					<div class="agent-task" id="agent-default-task">Ready for input</div>
					<div class="agent-meta">
						<span class="agent-cost" id="agent-default-cost">$0.00</span>
						<span class="agent-time" id="agent-default-time">--</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Hidden elements for compatibility -->
		<div style="display: none;">
			<span id="selectedAgentStatus"></span>
			<span id="selectedAgentName"></span>
			<span id="selectedAgentTask"></span>
			<button id="checkpointBtn"></button>
			<div id="planModeSwitch"></div>
			<div id="thinkingModeSwitch"></div>
			<span id="thinkingModeLabel"></span>
			<div id="sessionStatus" class="session-status">No session</div>
		</div>
	</div>

	<!-- ========================================
	     GLASSMORPHIC AGENT PANEL (Pop-out)
	     ======================================== -->
	<div class="agent-panel-overlay" id="agentPanelOverlay" onclick="toggleAgentPanel()"></div>

	<div class="agent-panel" id="agentPanel">
		<div class="agent-panel-header">
			<span class="agent-panel-title">Control Panel</span>
			<button class="agent-panel-close" onclick="toggleAgentPanel()" title="Close panel">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</div>

		<div class="agent-panel-content" id="agentPanelList">
			<!-- Agent cards will be dynamically populated here -->
			<div class="agent-card selected" id="panel-agent-default" onclick="selectAgentFromPanel('default')">
				<div class="agent-card-header">
					<span class="agent-name">Agent 1</span>
					<span class="status-dot idle" id="panel-agent-default-dot"></span>
				</div>

				<!-- Status Badge -->
				<div class="agent-status-badge idle" id="panel-agent-default-status">
					<svg viewBox="0 0 24 24" fill="currentColor">
						<circle cx="12" cy="12" r="4"/>
					</svg>
					<span id="panel-agent-default-status-text">Idle</span>
				</div>

				<!-- Live Preview -->
				<div class="agent-preview" id="panel-agent-default-preview">
					<span class="agent-preview-label">Current Activity</span>
					<span class="agent-preview-text" id="panel-agent-default-preview-text">Ready for input</span>
				</div>

				<div class="agent-meta">
					<span class="agent-cost" id="panel-agent-default-cost">$0.00</span>
					<span class="agent-time" id="panel-agent-default-time">--</span>
				</div>
			</div>
		</div>

		<div class="agent-panel-footer">
			<button class="new-agent-btn" onclick="newSession()">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12h14"/>
				</svg>
				New Agent
			</button>
		</div>
	</div>

	<!-- Status indicator (hidden, used for JS state tracking) -->
	<div id="status" class="sr-only" style="display: none;">
		<span id="statusText">Ready</span>
	</div>

	<!-- YOLO Warning -->
	<div id="yoloWarning" class="yolo-warning" style="display: none;">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
		</svg>
		<span>Yolo Mode Active: Claude Code will auto-approve all tool requests.</span>
	</div>

	<!-- ========================================
	     MODALS
	     ======================================== -->

	<!-- Conversation History Panel -->
	<div id="conversationHistory" class="conversation-history" style="display: none;">
		<div class="conversation-header">
			<h3>Conversation History</h3>
			<button class="btn icon" onclick="toggleConversationHistory()">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</div>
		<div id="conversationList" class="conversation-list">
			<!-- Conversations will be loaded here -->
		</div>
	</div>

	<!-- File picker modal -->
	<div id="filePickerModal" class="modal file-picker-modal" style="display: none;">
		<div class="modal-content file-picker-content">
			<div class="modal-header file-picker-header">
				<span>Select File</span>
				<input type="text" id="fileSearchInput" placeholder="Search files..." class="file-search-input">
			</div>
			<div id="fileList" class="file-list">
				<!-- Files will be loaded here -->
			</div>
		</div>
	</div>

	<!-- MCP Servers modal -->
	<div id="mcpModal" class="modal tools-modal" style="display: none;">
		<div class="modal-content tools-modal-content">
			<div class="modal-header tools-modal-header">
				<span>MCP Servers</span>
				<button class="btn icon close-btn" onclick="hideMCPModal()">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="tools-list">
				<div class="mcp-servers-list" id="mcpServersList">
					<!-- MCP servers will be loaded here -->
				</div>
				<div class="mcp-add-server">
					<button class="btn secondary" onclick="showAddServerForm()" id="addServerBtn">+ Add MCP Server</button>
				</div>
				<div class="mcp-popular-servers" id="popularServers">
					<h4>Popular MCP Servers</h4>
					<div class="popular-servers-grid">
						<div class="popular-server-item" onclick="addPopularServer('context7', { type: 'http', url: 'https://context7.liam.sh/mcp' })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-1H6.5A2.5 2.5 0 0 0 4 18.5v1zM6.5 2H20v13H6.5a3.5 3.5 0 0 0-2.5 1.062V4.5A2.5 2.5 0 0 1 6.5 2z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Context7</div>
								<div class="popular-server-desc">Up-to-date Code Docs</div>
							</div>
						</div>
						<div class="popular-server-item" onclick="addPopularServer('sequential-thinking', { type: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-sequential-thinking'] })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Sequential Thinking</div>
								<div class="popular-server-desc">Step-by-step reasoning</div>
							</div>
						</div>
						<div class="popular-server-item" onclick="addPopularServer('memory', { type: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-memory'] })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 0 0-9-9zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Memory</div>
								<div class="popular-server-desc">Knowledge graph storage</div>
							</div>
						</div>
						<div class="popular-server-item" onclick="addPopularServer('puppeteer', { type: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-puppeteer'] })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Puppeteer</div>
								<div class="popular-server-desc">Browser automation</div>
							</div>
						</div>
						<div class="popular-server-item" onclick="addPopularServer('fetch', { type: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-fetch'] })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Fetch</div>
								<div class="popular-server-desc">HTTP requests & scraping</div>
							</div>
						</div>
						<div class="popular-server-item" onclick="addPopularServer('filesystem', { type: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem'] })">
							<div class="popular-server-icon">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
							</div>
							<div class="popular-server-info">
								<div class="popular-server-name">Filesystem</div>
								<div class="popular-server-desc">File operations</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mcp-add-form" id="addServerForm" style="display: none;">
					<div class="form-group">
						<label for="serverName">Server Name:</label>
						<input type="text" id="serverName" placeholder="my-server" required>
					</div>
					<div class="form-group">
						<label for="serverType">Server Type:</label>
						<select id="serverType" onchange="updateServerForm()">
							<option value="http">HTTP</option>
							<option value="sse">SSE</option>
							<option value="stdio">stdio</option>
						</select>
					</div>
					<div class="form-group" id="commandGroup" style="display: none;">
						<label for="serverCommand">Command:</label>
						<input type="text" id="serverCommand" placeholder="/path/to/server">
					</div>
					<div class="form-group" id="urlGroup">
						<label for="serverUrl">URL:</label>
						<input type="text" id="serverUrl" placeholder="https://example.com/mcp">
					</div>
					<div class="form-group" id="argsGroup" style="display: none;">
						<label for="serverArgs">Arguments (one per line):</label>
						<textarea id="serverArgs" placeholder="--api-key&#10;abc123" rows="3"></textarea>
					</div>
					<div class="form-group" id="envGroup" style="display: none;">
						<label for="serverEnv">Environment Variables (KEY=value, one per line):</label>
						<textarea id="serverEnv" placeholder="API_KEY=123&#10;CACHE_DIR=/tmp" rows="3"></textarea>
					</div>
					<div class="form-group" id="headersGroup">
						<label for="serverHeaders">Headers (KEY=value, one per line):</label>
						<textarea id="serverHeaders" placeholder="Authorization=Bearer token&#10;X-API-Key=key" rows="3"></textarea>
					</div>
					<div class="form-buttons">
						<button class="btn primary" onclick="saveMCPServer()">Add Server</button>
						<button class="btn secondary" onclick="hideAddServerForm()">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Settings modal -->
	<div id="settingsModal" class="modal tools-modal" style="display: none;">
		<div class="modal-content tools-modal-content">
			<div class="modal-header tools-modal-header">
				<span>Settings</span>
				<button class="btn icon close-btn" onclick="hideSettingsModal()">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="tools-list settings-list">
				<div class="settings-section">
					<h3>WSL Configuration</h3>
					<p class="settings-description">
						WSL integration allows you to run Claude Code from within Windows Subsystem for Linux.
						This is useful if you have Claude installed in WSL instead of Windows.
					</p>
					<div class="settings-group">
						<div class="tool-item">
							<input type="checkbox" id="wsl-enabled" onchange="updateSettings()">
							<label for="wsl-enabled">Enable WSL Integration</label>
						</div>

						<div id="wslOptions" class="wsl-options" style="display: none;">
							<div class="form-group">
								<label for="wsl-distro">WSL Distribution</label>
								<input type="text" id="wsl-distro" class="form-input" placeholder="Ubuntu" onchange="updateSettings()">
							</div>

							<div class="form-group">
								<label for="wsl-node-path">Node.js Path in WSL</label>
								<input type="text" id="wsl-node-path" class="form-input" placeholder="/usr/bin/node" onchange="updateSettings()">
								<p class="form-hint">
									Find your node installation path in WSL by running: <code>which node</code>
								</p>
							</div>

							<div class="form-group">
								<label for="wsl-claude-path">Claude Path in WSL</label>
								<input type="text" id="wsl-claude-path" class="form-input" placeholder="/usr/local/bin/claude" onchange="updateSettings()">
								<p class="form-hint">
									Find your claude installation path in WSL by running: <code>which claude</code>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="settings-section">
					<h3>Permissions</h3>
					<p class="settings-description">
						Manage commands and tools that are automatically allowed without asking for permission.
					</p>
					<div class="settings-group">
						<div id="permissionsList" class="permissions-list">
							<div class="permissions-loading">
								Loading permissions...
							</div>
						</div>
						<div class="permissions-add-section">
							<div id="addPermissionForm" class="permissions-add-form" style="display: none;">
								<div class="permissions-form-row">
									<select id="addPermissionTool" class="permissions-tool-select" onchange="toggleCommandInput()">
										<option value="">Select tool...</option>
										<option value="Bash">Bash</option>
										<option value="Read">Read</option>
										<option value="Edit">Edit</option>
										<option value="Write">Write</option>
										<option value="MultiEdit">MultiEdit</option>
										<option value="Glob">Glob</option>
										<option value="Grep">Grep</option>
										<option value="LS">LS</option>
										<option value="WebSearch">WebSearch</option>
										<option value="WebFetch">WebFetch</option>
									</select>
									<div class="permissions-command-wrapper">
										<input type="text" id="addPermissionCommand" class="permissions-command-input" placeholder="Command pattern (e.g., npm i *)" style="display: none;" />
									</div>
									<button id="addPermissionBtn" class="btn primary small permissions-add-btn" onclick="addPermission()">Add</button>
								</div>
								<div id="permissionsFormHint" class="permissions-form-hint">
									Select a tool to add always-allow permission.
								</div>
							</div>
							<button id="showAddPermissionBtn" class="btn secondary permissions-show-add-btn" onclick="showAddPermissionForm()">
								+ Add permission
							</button>
							<div class="yolo-mode-section">
								<input type="checkbox" id="yolo-mode" onchange="updateSettings(); updateYoloWarning();">
								<label for="yolo-mode">Enable Yolo Mode (Auto-allow all permissions)</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Model selector modal -->
	<div id="modelModal" class="modal tools-modal" style="display: none;">
		<div class="modal-content tools-modal-content model-modal-content">
			<div class="modal-header tools-modal-header">
				<span>Enforce Model</span>
				<button class="btn icon close-btn" onclick="hideModelModal()">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="model-explanatory-text">
				This overrides your default model setting for this conversation only.
			</div>
			<div class="tools-list model-list">
				<div class="tool-item model-item" onclick="selectModel('opus')">
					<input type="radio" name="model" id="model-opus" value="opus" checked>
					<label for="model-opus">
						<div class="model-title">Opus - Most capable model</div>
						<div class="model-description">
							Best for complex tasks and highest quality output
						</div>
					</label>
				</div>
				<div class="tool-item model-item" onclick="selectModel('sonnet')">
					<input type="radio" name="model" id="model-sonnet" value="sonnet">
					<label for="model-sonnet">
						<div class="model-title">Sonnet - Balanced model</div>
						<div class="model-description">
							Good balance of speed and capability
						</div>
					</label>
				</div>
				<div class="tool-item model-item" onclick="selectModel('default')">
					<input type="radio" name="model" id="model-default" value="default">
					<label for="model-default" class="default-model-layout">
						<div class="model-option-content">
							<div class="model-title">Default - User configured</div>
							<div class="model-description">
								Uses the model configured in your settings
							</div>
						</div>
						<button class="btn secondary small configure-button" onclick="event.stopPropagation(); openModelTerminal();">
							Configure
						</button>
					</label>
				</div>
			</div>
		</div>
	</div>

	<!-- Install Claude Code modal -->
	<div id="installModal" class="modal install-modal" style="display: none;">
		<div class="install-modal-backdrop" onclick="hideInstallModal()"></div>
		<div class="modal-content install-modal-content">
			<button class="btn icon close-btn install-close-btn" onclick="hideInstallModal()">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>

			<div class="install-body" id="installBody">
				<div class="install-main" id="installMain">
					<div class="install-icon-wrapper">
						<svg class="install-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M12 3V15M12 15L7 10M12 15L17 10" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="install-text">
						<h2 class="install-title">Install Claude Code</h2>
						<p class="install-desc">The CLI is required to use this extension</p>
					</div>

					<button class="btn primary install-btn" id="installMainBtn" onclick="startInstallation()">
						Install Now
					</button>

					<a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" class="install-link">
						View documentation
					</a>
				</div>

				<div class="install-progress" id="installProgress" style="display: none;">
					<div class="install-spinner"></div>
					<p class="install-progress-text">Installing Claude Code...</p>
					<p class="install-progress-hint">This may take a minute</p>
				</div>

				<div class="install-success" id="installSuccess" style="display: none;">
					<div class="install-success-icon">
						<svg class="install-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</div>
					<p class="install-success-text">Installation Complete</p>
					<p class="install-success-hint">Send a message to get started</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Thinking intensity modal -->
	<div id="thinkingIntensityModal" class="modal tools-modal" style="display: none;">
		<div class="modal-content tools-modal-content thinking-modal-content">
			<div class="modal-header tools-modal-header">
				<span>Thinking Mode Intensity</span>
				<button class="btn icon close-btn" onclick="hideThinkingIntensityModal()">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="thinking-modal-description">
				Configure the intensity of thinking mode. Higher levels provide more detailed reasoning but consume more tokens.
			</div>
			<div class="tools-list">
				<div class="thinking-slider-container">
					<input type="range" min="0" max="3" value="0" step="1" class="thinking-slider" id="thinkingIntensitySlider" oninput="updateThinkingIntensityDisplay(this.value)">
					<div class="slider-labels">
						<div class="slider-label active" id="thinking-label-0" onclick="setThinkingIntensityValue(0)">Think</div>
						<div class="slider-label" id="thinking-label-1" onclick="setThinkingIntensityValue(1)">Think Hard</div>
						<div class="slider-label" id="thinking-label-2" onclick="setThinkingIntensityValue(2)">Think Harder</div>
						<div class="slider-label" id="thinking-label-3" onclick="setThinkingIntensityValue(3)">Ultrathink</div>
					</div>
				</div>
				<div class="thinking-modal-actions">
					<button class="btn primary confirm-btn" onclick="confirmThinkingIntensity()">Confirm</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Slash commands modal -->
	<div id="slashCommandsModal" class="modal tools-modal" style="display: none;">
		<div class="modal-content tools-modal-content slash-modal-content">
			<div class="modal-header tools-modal-header">
				<span>Commands & Prompt Snippets</span>
				<button class="btn icon close-btn" onclick="hideSlashCommandsModal()">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="tools-modal-body">

			<!-- Search box -->
			<div class="slash-commands-search">
				<div class="search-input-wrapper">
					<span class="search-prefix">/</span>
					<input type="text" id="slashCommandsSearch" placeholder="Search commands and snippets..." oninput="filterSlashCommands()">
				</div>
			</div>

			<!-- Custom Commands Section -->
			<div class="slash-commands-section">
				<h3>Custom Commands</h3>
				<div class="slash-commands-info">
					<p>Custom slash commands for quick prompt access. Click to use directly in chat.</p>
				</div>
				<div class="slash-commands-list" id="promptSnippetsList">
					<!-- Add Custom Snippet Button -->
					<div class="slash-command-item add-snippet-item" onclick="showAddSnippetForm()">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">Add Custom Command</div>
							<div class="slash-command-description">Create your own slash command</div>
						</div>
					</div>

					<!-- Add Custom Command Form (initially hidden) -->
					<div class="add-snippet-form" id="addSnippetForm" style="display: none;">
						<div class="form-group">
							<label for="snippetName">Command name:</label>
							<div class="command-input-wrapper">
								<span class="command-prefix">/</span>
								<input type="text" id="snippetName" placeholder="e.g., fix-bug" maxlength="50">
							</div>
						</div>
						<div class="form-group">
							<label for="snippetPrompt">Prompt Text:</label>
							<textarea id="snippetPrompt" placeholder="e.g., Help me fix this bug in my code..." rows="3"></textarea>
						</div>
						<div class="form-buttons">
							<button class="btn primary" onclick="saveCustomSnippet()">Save Command</button>
							<button class="btn secondary" onclick="hideAddSnippetForm()">Cancel</button>
						</div>
					</div>

					<!-- Built-in Snippets -->
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('performance-analysis')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.94 2.55 2 6.81 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C6.08 17.99 4 15.21 4 12c0-4.08 3.05-7.44 7-7.93V2.05z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/performance-analysis</div>
							<div class="slash-command-description">Analyze this code for performance issues and suggest optimizations</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('security-review')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/security-review</div>
							<div class="slash-command-description">Review this code for security vulnerabilities</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('implementation-review')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/implementation-review</div>
							<div class="slash-command-description">Review the implementation in this code</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('code-explanation')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v-1H6.5A2.5 2.5 0 0 0 4 18.5v1zM6.5 2H20v13H6.5a3.5 3.5 0 0 0-2.5 1.062V4.5A2.5 2.5 0 0 1 6.5 2z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/code-explanation</div>
							<div class="slash-command-description">Explain how this code works in detail</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('bug-fix')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-2.81a5.985 5.985 0 0 0-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/bug-fix</div>
							<div class="slash-command-description">Help me fix this bug in my code</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('refactor')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/refactor</div>
							<div class="slash-command-description">Refactor this code to improve readability and maintainability</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('test-generation')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13h2v2H7v-2zm14-6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-2 0H5v14h14V7zm-4 6h-2v2h2v-2zm-4 0h-2v2h2v-2zm8-4H7v2h10V9zm-4 8h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/test-generation</div>
							<div class="slash-command-description">Generate comprehensive tests for this code</div>
						</div>
					</div>
					<div class="slash-command-item prompt-snippet-item" onclick="usePromptSnippet('documentation')">
						<div class="slash-command-icon">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
						</div>
						<div class="slash-command-content">
							<div class="slash-command-title">/documentation</div>
							<div class="slash-command-description">Generate documentation for this code</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Built-in Commands Section -->
			<div class="slash-commands-section">
				<h3>Built-in Commands</h3>
				<div class="slash-commands-info">
					<p>These commands require the Claude CLI and will open in VS Code terminal. Return here after completion.</p>
				</div>
				<div class="slash-commands-list" id="nativeCommandsList">
				<div class="slash-command-item" onclick="executeSlashCommand('add-dir')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/add-dir</div>
						<div class="slash-command-description">Add additional working directories</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('clear')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/clear</div>
						<div class="slash-command-description">Clear conversation history</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('compact')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/compact</div>
						<div class="slash-command-description">Compact conversation with optional focus instructions</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('config')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/config</div>
						<div class="slash-command-description">Open the Settings interface</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('cost')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/cost</div>
						<div class="slash-command-description">Show token usage statistics</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('doctor')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/doctor</div>
						<div class="slash-command-description">Checks the health of your Claude Code installation</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('help')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/help</div>
						<div class="slash-command-description">Get usage help</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('init')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/init</div>
						<div class="slash-command-description">Initialize project with CLAUDE.md guide</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('login')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/login</div>
						<div class="slash-command-description">Switch Anthropic accounts</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('logout')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/logout</div>
						<div class="slash-command-description">Sign out from your Anthropic account</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('model')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM8 15h8v2H8v-2z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/model</div>
						<div class="slash-command-description">Select or change the AI model</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('permissions')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/permissions</div>
						<div class="slash-command-description">View or update permissions</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('review')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/review</div>
						<div class="slash-command-description">Request code review</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('status')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/status</div>
						<div class="slash-command-description">Open the Settings interface (Status tab)</div>
					</div>
				</div>
				<div class="slash-command-item" onclick="executeSlashCommand('usage')">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">/usage</div>
						<div class="slash-command-description">Show plan usage limits and rate limit status</div>
					</div>
				</div>
				<div class="slash-command-item custom-command-item">
					<div class="slash-command-icon">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
					</div>
					<div class="slash-command-content">
						<div class="slash-command-title">Quick Command</div>
						<div class="slash-command-description">
							<div class="command-input-wrapper">
								<span class="command-prefix">/</span>
								<input type="text"
									   class="custom-command-input"
									   id="customCommandInput"
									   placeholder="enter-command"
									   onkeydown="handleCustomCommandKeydown(event)"
									   onclick="event.stopPropagation()">
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>

	${getScript(isTelemetryEnabled)}

	<!--
	Analytics FAQ:

	1. Is Umami GDPR compliant?
	Yes, Umami does not collect any personally identifiable information and anonymizes all data collected. Users cannot be identified and are never tracked across websites.

	2. Do I need to display a cookie notice to users?
	No, Umami does not use any cookies in the tracking code.
	-->
	${isTelemetryEnabled ? '<script defer src="https://cloud.umami.is/script.js" data-website-id="d050ac9b-2b6d-4c67-b4c6-766432f95644"></script>' : '<!-- Umami analytics disabled due to VS Code telemetry settings -->'}
</body>
</html>`;

export default getHtml;
