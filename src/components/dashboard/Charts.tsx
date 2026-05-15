import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Charts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    import('../../lib/mock-data').then(m => {
      setData({
        latency: m.latencyHistory,
        requests: m.requestHistory,
        revenue: m.revenueHistory,
        tenantGrowth: m.tenantGrowth,
        apiCalls: m.apiCallsByTenant,
      });
    });
  }, []);

  if (!data) return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse"><div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" /></div>;

  const chartCard = (title: string, children: React.ReactNode) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {chartCard('API Latency (24h)',
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data.latency}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {chartCard('Request Throughput (24h)',
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data.requests}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {chartCard('Monthly Revenue',
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.revenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
      {chartCard('API Calls by Tenant',
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.apiCalls} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={(v: number) => `${(v/1000000).toFixed(1)}M`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#6b7280" width={100} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }} formatter={(v: number) => [v.toLocaleString(), 'API Calls']} />
            <Bar dataKey="calls" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
