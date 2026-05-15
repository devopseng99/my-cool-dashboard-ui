import { useState, useEffect } from 'react';
import type { Asset } from '../../lib/mock-data';

function formatSize(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

const typeIcons: Record<string, string> = {
  'image/': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'text/': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'application/pdf': 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  'default': 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
};

function getIcon(type: string): string {
  for (const [prefix, icon] of Object.entries(typeIcons)) {
    if (type.startsWith(prefix)) return icon;
  }
  return typeIcons.default;
}

export default function FileBrowser() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [search, setSearch] = useState('');
  const [filterTenant, setFilterTenant] = useState('all');

  useEffect(() => {
    import('../../lib/mock-data').then(m => setAssets(m.assets));
  }, []);

  const filtered = assets
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.path.toLowerCase().includes(search.toLowerCase()))
    .filter(a => filterTenant === 'all' || a.tenantId === filterTenant);

  const totalSize = filtered.reduce((sum, a) => sum + a.size, 0);
  const tenantIds = [...new Set(assets.map(a => a.tenantId))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 flex-1">
          <input type="text" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500" />
          <select value={filterTenant} onChange={e => setFilterTenant(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <option value="all">All Tenants</option>
            {tenantIds.map(id => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} files &middot; {formatSize(totalSize)} total</div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Path</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Uploaded</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {filtered.map(asset => (
              <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIcon(asset.type)} /></svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">{asset.path}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{formatSize(asset.size)}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(asset.uploadedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-brand-600 hover:text-brand-700 text-sm">Download</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 dark:text-gray-400">No files found.</div>}
      </div>
    </div>
  );
}
