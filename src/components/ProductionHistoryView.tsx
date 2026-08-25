import React, { useEffect, useState } from 'react';
import { Database, RefreshCw } from 'lucide-react';
import { ProductionHistoryItem } from '../types';

export default function ProductionHistoryView() {
  const [driveRecords, setDriveRecords] = useState<ProductionHistoryItem[]>([]);
  const [gadiRecords, setGadiRecords] = useState<ProductionHistoryItem[]>([]);
  const [activeSite, setActiveSite] = useState<'DRIVEGLOBALNEWS_IN' | 'GADIWAADI_IN'>('DRIVEGLOBALNEWS_IN');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success) {
        setDriveRecords(data.driveGlobalNews || []);
        setGadiRecords(data.gadiWaadi || []);
      }
    } catch {
      // Graceful error fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const currentRecords = activeSite === 'DRIVEGLOBALNEWS_IN' ? driveRecords : gadiRecords;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Production History &amp; Anti-Duplicate Memory</h2>
            <p className="text-xs text-slate-400 font-mono">
              Persistent Disk Storage: <code className="text-cyan-300">content_automation/production_history_*.json</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveSite('DRIVEGLOBALNEWS_IN')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                activeSite === 'DRIVEGLOBALNEWS_IN'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DriveGlobalNews ({driveRecords.length})
            </button>
            <button
              onClick={() => setActiveSite('GADIWAADI_IN')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                activeSite === 'GADIWAADI_IN'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              GadiWaadi ({gadiRecords.length})
            </button>
          </div>

          <button
            onClick={fetchHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Reload</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          Recorded Production Stories ({currentRecords.length} Items)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentRecords.map((record) => (
            <div
              key={record.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs shadow-lg hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                <span className="text-cyan-400 font-bold">{record.id}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {record.developmentTag || 'PRODUCED'}
                </span>
              </div>

              <h4 className="font-bold text-white text-sm line-clamp-2">{record.title}</h4>

              <div className="space-y-1.5 text-slate-400 font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Entity:</span>
                  <span className="text-slate-200 font-semibold">{record.topicEntity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Produced:</span>
                  <span className="text-slate-300">{new Date(record.producedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Source:</span>
                  <a
                    href={record.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline truncate max-w-[200px]"
                  >
                    {record.sourceUrl}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```[cite: 4]

4. Upar right corner se **`Commit changes...`** -> **`Commit changes`** par click karein.

Commit hote hi batayein, aakhiri component add karenge.
