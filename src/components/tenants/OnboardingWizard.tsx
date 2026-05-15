import { useState } from 'react';

type Step = 'info' | 'plan' | 'config' | 'review';

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>('info');
  const [form, setForm] = useState({ name: '', email: '', plan: 'starter', domain: '', enableAI: true, storageQuota: 5000 });

  const steps: { key: Step; label: string }[] = [
    { key: 'info', label: 'Tenant Info' },
    { key: 'plan', label: 'Select Plan' },
    { key: 'config', label: 'Configuration' },
    { key: 'review', label: 'Review' },
  ];

  const currentIdx = steps.findIndex(s => s.key === step);
  const next = () => currentIdx < steps.length - 1 && setStep(steps[currentIdx + 1].key);
  const prev = () => currentIdx > 0 && setStep(steps[currentIdx - 1].key);

  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= currentIdx ? 'bg-brand-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{i + 1}</div>
            <span className={`ml-2 text-sm hidden sm:inline ${i <= currentIdx ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{s.label}</span>
            {i < steps.length - 1 && <div className={`w-12 h-0.5 mx-3 ${i < currentIdx ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
        {step === 'info' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tenant Information</h3>
            <div><label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Organization Name</label><input type="text" className={inputClass} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Acme Corp" /></div>
            <div><label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Admin Email</label><input type="email" className={inputClass} value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="admin@example.com" /></div>
            <div><label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Domain</label><input type="text" className={inputClass} value={form.domain} onChange={e => setForm({...form, domain: e.target.value})} placeholder="example.com" /></div>
          </div>
        )}

        {step === 'plan' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'starter', name: 'Starter', price: '$29/mo', features: ['100K API calls', '5GB storage', '50K AI tokens'] },
                { key: 'pro', name: 'Pro', price: '$149/mo', features: ['1M API calls', '50GB storage', '1M AI tokens'] },
                { key: 'enterprise', name: 'Enterprise', price: '$499/mo', features: ['5M API calls', '500GB storage', '5M AI tokens'] },
              ].map(p => (
                <button key={p.key} onClick={() => setForm({...form, plan: p.key})} className={`p-4 rounded-xl border-2 text-left transition-colors ${form.plan === p.key ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                  <div className="font-semibold text-gray-900 dark:text-white">{p.name}</div>
                  <div className="text-brand-600 font-bold mt-1">{p.price}</div>
                  <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    {p.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'config' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration</h3>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={form.enableAI} onChange={e => setForm({...form, enableAI: e.target.checked})} className="w-4 h-4 text-brand-600 rounded" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Enable AI chat features</span>
            </label>
            <div><label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Storage Quota (MB)</label><input type="number" className={inputClass} value={form.storageQuota} onChange={e => setForm({...form, storageQuota: parseInt(e.target.value) || 0})} /></div>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review & Create</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-gray-900 dark:text-white font-medium">{form.name || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="text-gray-900 dark:text-white">{form.email || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Plan</dt><dd className="text-gray-900 dark:text-white capitalize">{form.plan}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Domain</dt><dd className="text-gray-900 dark:text-white">{form.domain || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">AI Features</dt><dd className="text-gray-900 dark:text-white">{form.enableAI ? 'Enabled' : 'Disabled'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Storage Quota</dt><dd className="text-gray-900 dark:text-white">{form.storageQuota} MB</dd></div>
            </dl>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={prev} disabled={currentIdx === 0} className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
        {step === 'review' ? (
          <button onClick={() => { alert('Tenant created! (Demo)'); window.location.href = '/tenants'; }} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Create Tenant</button>
        ) : (
          <button onClick={next} className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">Next</button>
        )}
      </div>
    </div>
  );
}
