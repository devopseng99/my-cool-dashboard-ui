import { useState, useEffect } from 'react';
import type { Tenant } from '../../lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TenantDetail() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const tenantId = typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '';

  useEffect(() => {
    import('../../lib/mock-data').then(m => {
      const found = m.tenants.find(t => t.id === tenantId);
      setTenant(found || null);
    });
  }, [tenantId]);

  if (!tenant) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500 dark:text-gray-400">Loading tenant...</p>
    </div>
  );

  const usageData = [
    { name: 'API Calls', value: tenant.usage.apiCalls, max: tenant.plan === 'enterprise' ? 5000000 : tenant.plan === 'pro' ? 1000000 : 100000 },
    { name: 'Storage (MB)', value: tenant.usage.storageMB, max: tenant.plan === 'enterprise' ? 500000 : tenant.plan === 'pro' ? 50000 : 5000 },
    { name: 'AI Tokens', value: tenant.usage.aiTokens, max: tenant.plan === 'enterprise' ? 5000000 : tenant.plan === 'pro' ? 1000000 : 50000 },
  ];

  const statusColor = tenant.status === 'active' ? 'text-green-600' : tenant.status === 'suspended' ? 'text-red-600' : 'text-yellow-600';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <a href="/tenants" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </a>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tenant.name}</h2>
        <span className={`text-sm font-medium ${statusColor}`}>{tenant.status}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Tenant Info</h3>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-gray-400">ID</dt><dd className="font-mono text-gray-900 dark:text-white">{tenant.id}</dd></div>
            <div><dt className="text-gray-400">Email</dt><dd className="text-gray-900 dark:text-white">{tenant.email}</dd></div>
            <div><dt className="text-gray-400">Plan</dt><dd className="text-gray-900 dark:text-white capitalize">{tenant.plan}</dd></div>
            <div><dt className="text-gray-400">Created</dt><dd className="text-gray-900 dark:text-white">{tenant.createdAt}</dd></div>
          </dl>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Billing</h3>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-gray-400">MRR</dt><dd className="text-2xl font-bold text-gray-900 dark:text-white">${tenant.billing.mrr}</dd></div>
            <div><dt className="text-gray-400">Last Payment</dt><dd className="text-gray-900 dark:text-white">{tenant.billing.lastPayment || 'N/A'}</dd></div>
            <div><dt className="text-gray-400">Next Billing</dt><dd className="text-gray-900 dark:text-white">{tenant.billing.nextBilling || 'N/A'}</dd></div>
          </dl>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Actions</h3>
          <div className="space-y-3">
            {tenant.status === 'active' ? (
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">Suspend Tenant</button>
            ) : tenant.status === 'suspended' ? (
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">Reactivate Tenant</button>
            ) : (
              <button className="w-full px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm">Activate Tenant</button>
            )}
            <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">Edit Details</button>
            <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">View Audit Log</button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Usage Metrics</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v: number) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : `${v}`} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} formatter={(v: number) => [v.toLocaleString(), 'Used']} />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
