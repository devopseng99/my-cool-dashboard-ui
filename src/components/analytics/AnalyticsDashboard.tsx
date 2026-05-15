import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Tenant } from '../../lib/mock-data';

type TimeRange = '24h' | '7d' | '30d';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    import('../../lib/mock-data').then(m => {
      setTenants(m.tenants);
      setData({ revenue: m.revenueHistory, growth: m.tenantGrowth, apiCalls: m.apiCallsByTenant });
    });
  }, []);

  const planDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    tenants.forEach(t => { counts[t.plan] = (counts[t.plan] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tenants]);

  const COLORS = ['#6b7280', '#3b82f6', '#8b5cf6', '#f59e0b'];

  const totalRevenue = tenants.reduce((sum, t) => sum + t.billing.mrr, 0);
  const totalApiCalls = tenants.reduce((sum, t) => sum + t.usage.apiCalls, 0);
  const activeTenants = tenants.filter(t => t.status === 'active').length;

  const exportCSV = () => {
    const headers = 'Name,Plan,Status,API Calls,Storage MB,MRR\n';
    const rows = tenants.map(t => `${t.name},${t.plan},${t.status},${t.usage.apiCalls},${t.usage.storageMB},${t.billing.mrr}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `analytics-${timeRange}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) return <div className="animate-pulse space-y-6"><div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as TimeRange[]).map(range => (
            <button key={range} onClick={() => setTimeRange(range)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${timeRange === range ? 'bg-brand-600 text-white' : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>{range}</button>
          ))}
        </div>
        <button onClick={exportCSV} className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">Export CSV</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total MRR</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total API Calls</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{(totalApiCalls / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Tenants</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{activeTenants}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Tenant Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={planDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {planDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Tenants by API Calls</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.apiCalls} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v: number) => `${(v/1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#6b7280" width={110} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} formatter={(v: number) => [v.toLocaleString(), 'Calls']} />
              <Bar dataKey="calls" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
