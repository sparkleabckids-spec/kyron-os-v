import React, { useEffect, useState } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { DiagnosticsResponse, SystemStatusResponse } from '../types';

export default function WordPressDiagnosticsView() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticsResponse | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDiagnostics = async () => {
    setIsLoading(true);
    try {
      const [diagRes, statusRes] = await Promise.all([
        fetch('/api/wordpress/diagnostics'),
        fetch('/api/status'),
      ]);
      const diagData = await diagRes.json();
      const statusData = await statusRes.json();

      if (diagData.success) {
        setDiagnostics(diagData.diagnostics);
      }
      setSystemStatus(statusData);
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">WordPress Bridge &amp; Diagnostics</h2>
          </div>
        </div>

        <button
          onClick={fetchDiagnostics}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Probe</span>
        </button>
      </div>
    </div>
  );
}
