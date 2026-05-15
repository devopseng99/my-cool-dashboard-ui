import { useState, useEffect } from 'react';

export default function SettingsPanel() {
  const [dark, setDark] = useState(false);
  const [apiUrl, setApiUrl] = useState('http://cool-dashboard.cool-dashboard.svc.cluster.local:80');
  const [aiModel, setAiModel] = useState('@cf/meta/llama-3.1-8b-instruct');

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
          </div>
          <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors ${dark ? 'bg-brand-600' : 'bg-gray-300'}`}>
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${dark ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Backend API URL</label>
            <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" readOnly />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">AI Model</label>
            <input type="text" value={aiModel} onChange={e => setAiModel(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm" readOnly />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500 dark:text-gray-400">Version</dt><dd className="text-gray-900 dark:text-white">1.0.0</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500 dark:text-gray-400">Framework</dt><dd className="text-gray-900 dark:text-white">Astro 5.x</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500 dark:text-gray-400">AI Gateway</dt><dd className="text-gray-900 dark:text-white">g-cf-gw-01</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500 dark:text-gray-400">R2 Bucket</dt><dd className="text-gray-900 dark:text-white">cool-dashboard-assets</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500 dark:text-gray-400">Namespace</dt><dd className="text-gray-900 dark:text-white">cool-dashboard-ui</dd></div>
        </dl>
      </div>
    </div>
  );
}
