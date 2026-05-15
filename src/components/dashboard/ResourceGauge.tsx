import { useState, useEffect } from 'react';

function Gauge({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{value}{unit} / {max}{unit}</p>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-400 mt-1">{pct.toFixed(1)}% utilized</p>
    </div>
  );
}

export default function ResourceGauge() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    import('../../lib/mock-data').then(m => setHealth(m.systemHealth));
  }, []);

  if (!health) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse"><div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" /><div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Gauge label="CPU Usage" value={health.cpuUsage} max={100} unit="%" color="bg-blue-500" />
      <Gauge label="Memory Usage" value={health.memoryUsage} max={100} unit="%" color="bg-purple-500" />
      <Gauge label="Storage" value={health.storageUsedGB} max={health.storageTotalGB} unit="GB" color="bg-green-500" />
    </div>
  );
}
