import { useState, useEffect } from 'react';
import type { SystemHealth } from '../../lib/mock-data';

function StatCard({ label, value, unit, trend, color }: { label: string; value: string | number; unit?: string; trend?: string; color: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>
        {value}<span className="text-lg font-normal text-gray-400 ml-1">{unit}</span>
      </p>
      {trend && <p className="text-xs text-green-500 mt-2">{trend}</p>}
    </div>
  );
}

export default function StatsCards() {
  const [health, setHealth] = useState<SystemHealth | null>(null);

  useEffect(() => {
    import('../../lib/mock-data').then(m => setHealth(m.systemHealth));
  }, []);

  if (!health) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse"><div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="API Latency" value={health.apiLatency} unit="ms" trend="↓ 12% from last week" color="text-blue-600 dark:text-blue-400" />
      <StatCard label="Error Rate" value={health.errorRate.toFixed(2)} unit="%" trend="↓ 0.05% from last week" color="text-red-600 dark:text-red-400" />
      <StatCard label="Uptime" value={health.uptime.toFixed(2)} unit="%" color="text-green-600 dark:text-green-400" />
      <StatCard label="Throughput" value={health.requestThroughput.toLocaleString()} unit="req/s" trend="↑ 8% from last week" color="text-purple-600 dark:text-purple-400" />
    </div>
  );
}
