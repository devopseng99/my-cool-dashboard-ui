const API_BASE = '/api/backend';

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getHealth() {
  return fetchApi<{ app: string; version: string }>('/health');
}

export async function getTenants() {
  const data = await fetchApi<any[]>('/tenants');
  if (data) return data;
  const { tenants } = await import('./mock-data');
  return tenants;
}

export async function getTenant(id: string) {
  const data = await fetchApi<any>(`/tenants/${id}`);
  if (data) return data;
  const { tenants } = await import('./mock-data');
  return tenants.find(t => t.id === id) || null;
}

export async function getSystemHealth() {
  const data = await fetchApi<any>('/system/health');
  if (data) return data;
  const { systemHealth } = await import('./mock-data');
  return systemHealth;
}

export async function getAuditLog() {
  const data = await fetchApi<any[]>('/audit');
  if (data) return data;
  const { auditLog } = await import('./mock-data');
  return auditLog;
}

export async function getAssets() {
  const data = await fetchApi<any[]>('/assets');
  if (data) return data;
  const { assets } = await import('./mock-data');
  return assets;
}

export async function sendChatMessage(message: string): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
    });
    if (!res.ok) throw new Error('AI request failed');
    const data = await res.json();
    return data.result?.response || data.response || 'No response received.';
  } catch {
    return 'AI service is currently unavailable. Please try again later.';
  }
}
