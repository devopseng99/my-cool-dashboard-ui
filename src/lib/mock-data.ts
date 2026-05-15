export interface Tenant {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  usage: { apiCalls: number; storageMB: number; aiTokens: number; bandwidthMB: number };
  billing: { mrr: number; lastPayment: string; nextBilling: string };
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  tenant: string;
  details: string;
  severity: 'info' | 'warn' | 'error';
}

export interface SystemHealth {
  apiLatency: number;
  errorRate: number;
  uptime: number;
  activeSessions: number;
  concurrentUsers: number;
  requestThroughput: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsedGB: number;
  storageTotalGB: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  tenantId?: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  tenantId: string;
  uploadedAt: string;
  uploadedBy: string;
}

export const tenants: Tenant[] = [
  { id: 't-001', name: 'Acme Corp', email: 'admin@acme.com', plan: 'enterprise', status: 'active', createdAt: '2024-11-15', usage: { apiCalls: 1240000, storageMB: 45200, aiTokens: 890000, bandwidthMB: 120400 }, billing: { mrr: 499, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-002', name: 'Globex Inc', email: 'ops@globex.io', plan: 'pro', status: 'active', createdAt: '2024-12-03', usage: { apiCalls: 560000, storageMB: 12300, aiTokens: 340000, bandwidthMB: 45600 }, billing: { mrr: 149, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-003', name: 'Initech LLC', email: 'hello@initech.co', plan: 'starter', status: 'active', createdAt: '2025-01-10', usage: { apiCalls: 89000, storageMB: 2100, aiTokens: 45000, bandwidthMB: 8900 }, billing: { mrr: 29, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-004', name: 'Umbrella Co', email: 'tech@umbrella.org', plan: 'enterprise', status: 'suspended', createdAt: '2024-10-22', usage: { apiCalls: 0, storageMB: 78400, aiTokens: 0, bandwidthMB: 0 }, billing: { mrr: 499, lastPayment: '2025-03-01', nextBilling: '2025-06-01' } },
  { id: 't-005', name: 'Stark Industries', email: 'jarvis@stark.dev', plan: 'enterprise', status: 'active', createdAt: '2024-09-05', usage: { apiCalls: 3400000, storageMB: 156000, aiTokens: 2100000, bandwidthMB: 340000 }, billing: { mrr: 499, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-006', name: 'Wayne Enterprises', email: 'ops@wayne.com', plan: 'pro', status: 'active', createdAt: '2025-02-14', usage: { apiCalls: 230000, storageMB: 8700, aiTokens: 120000, bandwidthMB: 23400 }, billing: { mrr: 149, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-007', name: 'Cyberdyne Systems', email: 'dev@cyberdyne.ai', plan: 'pro', status: 'active', createdAt: '2025-01-28', usage: { apiCalls: 670000, storageMB: 23400, aiTokens: 780000, bandwidthMB: 56000 }, billing: { mrr: 149, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-008', name: 'Pied Piper', email: 'richard@piedpiper.com', plan: 'starter', status: 'active', createdAt: '2025-03-01', usage: { apiCalls: 45000, storageMB: 890, aiTokens: 12000, bandwidthMB: 3400 }, billing: { mrr: 29, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-009', name: 'Hooli', email: 'admin@hooli.xyz', plan: 'free', status: 'active', createdAt: '2025-04-10', usage: { apiCalls: 5600, storageMB: 120, aiTokens: 1200, bandwidthMB: 450 }, billing: { mrr: 0, lastPayment: '', nextBilling: '' } },
  { id: 't-010', name: 'Soylent Corp', email: 'ops@soylent.co', plan: 'starter', status: 'pending', createdAt: '2025-05-10', usage: { apiCalls: 0, storageMB: 0, aiTokens: 0, bandwidthMB: 0 }, billing: { mrr: 29, lastPayment: '', nextBilling: '2025-06-10' } },
  { id: 't-011', name: 'Aperture Science', email: 'cave@aperture.com', plan: 'pro', status: 'active', createdAt: '2024-08-20', usage: { apiCalls: 890000, storageMB: 34500, aiTokens: 560000, bandwidthMB: 78000 }, billing: { mrr: 149, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
  { id: 't-012', name: 'Massive Dynamic', email: 'nina@massive.io', plan: 'enterprise', status: 'active', createdAt: '2024-07-15', usage: { apiCalls: 4500000, storageMB: 234000, aiTokens: 3200000, bandwidthMB: 567000 }, billing: { mrr: 499, lastPayment: '2025-05-01', nextBilling: '2025-06-01' } },
];

export const systemHealth: SystemHealth = {
  apiLatency: 45, errorRate: 0.12, uptime: 99.97, activeSessions: 342,
  concurrentUsers: 128, requestThroughput: 1240, cpuUsage: 34,
  memoryUsage: 62, storageUsedGB: 245, storageTotalGB: 500,
};

function generateTimeSeries(points: number, baseValue: number, variance: number): { time: string; value: number }[] {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - i) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: Math.max(0, baseValue + (Math.random() - 0.5) * variance * 2),
  }));
}

export const latencyHistory = generateTimeSeries(24, 45, 20);
export const errorRateHistory = generateTimeSeries(24, 0.12, 0.1);
export const requestHistory = generateTimeSeries(24, 1240, 400);

export const revenueHistory = [
  { month: 'Dec', value: 8400 }, { month: 'Jan', value: 9200 },
  { month: 'Feb', value: 10100 }, { month: 'Mar', value: 11300 },
  { month: 'Apr', value: 12800 }, { month: 'May', value: 14200 },
];

export const tenantGrowth = [
  { month: 'Dec', value: 6 }, { month: 'Jan', value: 8 },
  { month: 'Feb', value: 9 }, { month: 'Mar', value: 10 },
  { month: 'Apr', value: 11 }, { month: 'May', value: 12 },
];

export const apiCallsByTenant = tenants
  .filter(t => t.status === 'active')
  .sort((a, b) => b.usage.apiCalls - a.usage.apiCalls)
  .slice(0, 6)
  .map(t => ({ name: t.name, calls: t.usage.apiCalls }));

export const auditLog: AuditEntry[] = [
  { id: 'a-001', timestamp: '2025-05-15T14:32:00Z', user: 'admin@system', action: 'tenant.create', tenant: 'Soylent Corp', details: 'New tenant onboarded with starter plan', severity: 'info' },
  { id: 'a-002', timestamp: '2025-05-15T13:15:00Z', user: 'admin@system', action: 'tenant.suspend', tenant: 'Umbrella Co', details: 'Suspended due to payment failure', severity: 'warn' },
  { id: 'a-003', timestamp: '2025-05-15T12:45:00Z', user: 'jarvis@stark.dev', action: 'api.key.rotate', tenant: 'Stark Industries', details: 'API key rotated', severity: 'info' },
  { id: 'a-004', timestamp: '2025-05-15T11:20:00Z', user: 'admin@system', action: 'system.deploy', tenant: 'system', details: 'Deployed v1.2.3 to production', severity: 'info' },
  { id: 'a-005', timestamp: '2025-05-15T10:05:00Z', user: 'ops@globex.io', action: 'storage.quota.exceeded', tenant: 'Globex Inc', details: 'R2 storage quota 90% utilized', severity: 'warn' },
  { id: 'a-006', timestamp: '2025-05-15T09:30:00Z', user: 'admin@system', action: 'auth.failed', tenant: 'system', details: 'Multiple failed login attempts from 192.168.1.45', severity: 'error' },
  { id: 'a-007', timestamp: '2025-05-14T22:10:00Z', user: 'cave@aperture.com', action: 'plan.upgrade', tenant: 'Aperture Science', details: 'Upgraded from starter to pro', severity: 'info' },
  { id: 'a-008', timestamp: '2025-05-14T18:45:00Z', user: 'admin@system', action: 'backup.complete', tenant: 'system', details: 'Daily backup completed successfully', severity: 'info' },
  { id: 'a-009', timestamp: '2025-05-14T16:20:00Z', user: 'richard@piedpiper.com', action: 'asset.upload', tenant: 'Pied Piper', details: 'Uploaded dataset.csv (2.3MB)', severity: 'info' },
  { id: 'a-010', timestamp: '2025-05-14T14:55:00Z', user: 'dev@cyberdyne.ai', action: 'ai.rate.limit', tenant: 'Cyberdyne Systems', details: 'AI token rate limit hit, throttled', severity: 'warn' },
  { id: 'a-011', timestamp: '2025-05-14T12:30:00Z', user: 'admin@system', action: 'cert.expiry', tenant: 'system', details: 'TLS certificate expires in 30 days', severity: 'warn' },
  { id: 'a-012', timestamp: '2025-05-14T10:00:00Z', user: 'nina@massive.io', action: 'webhook.configure', tenant: 'Massive Dynamic', details: 'Configured webhook endpoint for event notifications', severity: 'info' },
];

export const conversations: Conversation[] = [
  {
    id: 'c-001', title: 'Tenant onboarding help', tenantId: 't-003', createdAt: '2025-05-15T10:00:00Z',
    messages: [
      { id: 'm-001', role: 'user', content: 'How do I set up SSO for my tenant?', timestamp: '2025-05-15T10:00:00Z' },
      { id: 'm-002', role: 'assistant', content: 'To set up SSO for your tenant, navigate to Settings > Authentication > SSO Configuration. You\'ll need your Identity Provider\'s metadata URL and a SAML certificate. Here are the steps:\n\n1. Click "Add SSO Provider"\n2. Enter your IdP metadata URL\n3. Upload the SAML certificate\n4. Map user attributes\n5. Test the connection\n\nWould you like me to walk you through any of these steps?', timestamp: '2025-05-15T10:00:30Z' },
    ],
  },
  {
    id: 'c-002', title: 'API rate limiting query', tenantId: 't-007', createdAt: '2025-05-14T15:00:00Z',
    messages: [
      { id: 'm-003', role: 'user', content: 'We keep hitting rate limits on the AI endpoint. What are our current limits?', timestamp: '2025-05-14T15:00:00Z' },
      { id: 'm-004', role: 'assistant', content: 'Your current plan (Pro) includes 1M AI tokens per month. You\'ve used 780K tokens so far this billing cycle. Here are your options:\n\n- **Upgrade to Enterprise**: 5M tokens/month\n- **Add token pack**: 500K additional tokens for $49\n- **Optimize usage**: I can analyze your API calls to identify optimization opportunities\n\nWould you like me to help with any of these options?', timestamp: '2025-05-14T15:00:45Z' },
    ],
  },
  {
    id: 'c-003', title: 'Storage migration', createdAt: '2025-05-13T09:00:00Z',
    messages: [
      { id: 'm-005', role: 'user', content: 'I need to migrate data between R2 buckets', timestamp: '2025-05-13T09:00:00Z' },
      { id: 'm-006', role: 'assistant', content: 'I can help you with R2 bucket migration. You have several options:\n\n1. **Bulk copy via API**: Use the S3-compatible API to copy objects between buckets\n2. **Export & Import**: Download a manifest, then re-upload to the target bucket\n3. **Wrangler CLI**: Use `wrangler r2 object copy` for individual files\n\nFor large migrations (>10GB), I recommend option 1 with parallel workers. What\'s the approximate size of data you need to migrate?', timestamp: '2025-05-13T09:01:00Z' },
    ],
  },
];

export const assets: Asset[] = [
  { id: 'f-001', name: 'logo.png', path: '/acme/branding/logo.png', size: 245000, type: 'image/png', tenantId: 't-001', uploadedAt: '2025-04-20T10:00:00Z', uploadedBy: 'admin@acme.com' },
  { id: 'f-002', name: 'dataset.csv', path: '/piedpiper/data/dataset.csv', size: 2400000, type: 'text/csv', tenantId: 't-008', uploadedAt: '2025-05-14T16:20:00Z', uploadedBy: 'richard@piedpiper.com' },
  { id: 'f-003', name: 'report-q1.pdf', path: '/stark/reports/report-q1.pdf', size: 1800000, type: 'application/pdf', tenantId: 't-005', uploadedAt: '2025-04-01T08:00:00Z', uploadedBy: 'jarvis@stark.dev' },
  { id: 'f-004', name: 'config.json', path: '/globex/config/config.json', size: 4500, type: 'application/json', tenantId: 't-002', uploadedAt: '2025-03-15T14:30:00Z', uploadedBy: 'ops@globex.io' },
  { id: 'f-005', name: 'model-weights.bin', path: '/cyberdyne/ml/model-weights.bin', size: 156000000, type: 'application/octet-stream', tenantId: 't-007', uploadedAt: '2025-05-10T09:00:00Z', uploadedBy: 'dev@cyberdyne.ai' },
  { id: 'f-006', name: 'backup-2025-05.sql', path: '/system/backups/backup-2025-05.sql', size: 89000000, type: 'application/sql', tenantId: 't-012', uploadedAt: '2025-05-14T22:00:00Z', uploadedBy: 'admin@system' },
  { id: 'f-007', name: 'user-guide.md', path: '/aperture/docs/user-guide.md', size: 34000, type: 'text/markdown', tenantId: 't-011', uploadedAt: '2025-05-12T11:00:00Z', uploadedBy: 'cave@aperture.com' },
  { id: 'f-008', name: 'avatar.jpg', path: '/wayne/media/avatar.jpg', size: 89000, type: 'image/jpeg', tenantId: 't-006', uploadedAt: '2025-04-28T16:00:00Z', uploadedBy: 'ops@wayne.com' },
];
