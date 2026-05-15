import { useState, useEffect } from 'react';
import type { AuditEntry } from '../../lib/mock-data';

const severityStyles: Record<string, string> = {
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  warn: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AuditLog() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterAction, setFilterAction] = useState('');
  const [filterTenant, setFilterTenant] = useState('');

  useEffect(() => {
    import('../../lib/mock-data').then(m => setEntries(m.auditLog));
  }, []);

  const filtered = entries
    .filter(e => filterSeverity === 'all' || e.severity === filterSeverity)
    .filter(e => !filterAction || e.action.toLowerCase().includes(filterAction.toLowerCase()))
    .filter(e => !filterTenant || e.tenant.toLowerCase().includes(filterTenant.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <option value="all">All Severities</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
        </select>
        <input type="text" placeholder="Filter by action..." value={filterAction} onChange={e => setFilterAction(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500" />
        <input type="text" placeholder="Filter by tenant..." value={filterTenant} onChange={e => setFilterTenant(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filtered.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{new Date(entry.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyles[entry.severity]}`}>{entry.severity}</span></td>
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{entry.action}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{entry.user}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{entry.tenant}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{entry.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 dark:text-gray-400">No audit entries match your filters.</div>}
      </div>
    </div>
  );
}
