# cool-dashboard-ui — Astro-based SaaS dashboard with CF services

## App Overview
Build a modern, production-ready Astro-based dashboard UI that serves as a 
multi-tenant SaaS provider management console. This is the FRONTEND — it 
consumes the existing cool-dashboard Go API backend at 
http://cool-dashboard.cool-dashboard.svc.cluster.local:80 for core data.

## Tech Stack
- **Framework:** Astro 5.x with React islands for interactive components
- **Styling:** Tailwind CSS with dark mode (system preference + toggle)
- **Charts:** Chart.js or Recharts for real-time analytics
- **Build:** Static site generation (SSG) + server-side rendering for dynamic routes

## Core Features

### 1. Tenant Management (SaaS Provider View)
- Tenant list with search, filter, sort
- Tenant detail: usage metrics, billing status, plan tier
- Tenant onboarding wizard (create tenant → provision resources → activate)
- Tenant suspension/reactivation controls

### 2. Admin Dashboard
- System health overview: API latency, error rates, uptime
- Resource utilization: storage (R2), AI usage (Workers AI), database queries
- Active sessions, concurrent users, request throughput
- Audit log viewer with filters (user, action, timestamp, tenant)

### 3. Chat UI (AI-Powered)
- Chat interface using Cloudflare Workers AI via AI Gateway
- Per-tenant chat context (tenant data injected into system prompt)
- Message history stored in R2 (JSON per conversation)
- Streaming responses with typing indicator
- Model: @cf/meta/llama-3.1-8b-instruct via AI Gateway g-cf-gw-01

### 4. Analytics & Reporting
- Real-time charts: tenant growth, revenue, API calls per tenant
- Exportable reports (CSV download)
- Time range selector (24h, 7d, 30d, custom)
- Per-tenant drill-down analytics

### 5. Asset Management (R2)
- File browser for tenant uploads stored in R2
- Upload/download/delete with presigned URLs
- Storage quota per tenant with usage visualization
- R2 bucket: cool-dashboard-assets

## Cloudflare Integration

### Workers AI + AI Gateway
- Endpoint: https://gateway.ai.cloudflare.com/v1/9709bd1f498109e65ff5d1898fec15ee/g-cf-gw-01
- Model: @cf/meta/llama-3.1-8b-instruct
- Auth: Bearer token from CF_AI_TOKEN env var
- Gateway has authentication:false — Bearer passes through

### R2 Storage
- Bucket: cool-dashboard-assets (create via wrangler or API)
- Access: S3-compatible API via CF account credentials
- Use for: chat history, tenant uploads, report exports

## API Integration
- Backend: http://cool-dashboard.cool-dashboard.svc.cluster.local:80
- Health: GET /health returns {"app":"cool-dashboard","version":"1.0.0"}
- Proxy API calls through Astro server endpoints (/api/*) to avoid CORS
- For demo data: generate mock tenant/analytics data if backend endpoints don't exist yet

## Deploy Requirements
- Container: multi-stage Dockerfile (node build → nginx serve)
- Port: 80 (nginx)
- Namespace: cool-dashboard-ui
- imagePullPolicy: Never
- nodeSelector: kubernetes.io/hostname: mgplcb05
- dnsConfig: options [{name: ndots, value: "2"}]
- Replicas: 1
- CF tunnel route: cool-dashboard-ui.istayintek.com

## Pages
/                    → Admin dashboard (system overview + charts)
/tenants             → Tenant list
/tenants/:id         → Tenant detail + usage
/tenants/new         → Onboarding wizard
/chat                → AI chat interface
/chat/:conversationId → Chat thread
/analytics           → Analytics & reporting
/assets              → R2 file browser
/audit               → Audit log viewer
/settings            → System settings + dark mode toggle