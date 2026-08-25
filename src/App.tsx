import React, { useEffect, useState } from 'react';
import {
  Layers,
  Lock,
  Database,
  Activity,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import PipelineController from './components/PipelineController';
import HumanApprovalQueueView from './components/HumanApprovalQueueView';
import ProductionHistoryView from './components/ProductionHistoryView';
import WordPressDiagnosticsView from './components/WordPressDiagnosticsView';
import ArchitectMatrixView from './components/ArchitectMatrixView';
import { SystemStatusResponse } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'pipeline' | 'queue' | 'history' | 'diagnostics' | 'architect'
  >('pipeline');
  const [systemStatus, setSystemStatus] = useState<SystemStatusResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchStatus = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (data.success) {
        setSystemStatus(data);
      }
    } catch {
      // Graceful error fallback
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg shadow-lg shadow-cyan-500/10">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base tracking-wide text-white">KYRON OS</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase font-semibold">
                14-STAGE UNIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Automotive Content Automation &amp; Intelligence Runtime</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>14-Stage Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer relative ${
              activeTab === 'queue'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Approval Queue</span>
            {systemStatus && systemStatus.queueCount.pending > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Production History</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>WordPress Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab('architect')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'architect'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Architect Matrix</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {systemStatus && (
            <div className="hidden lg:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300">{systemStatus.executionMode}</span>
            </div>
          )}
          <button
            onClick={fetchStatus}
            title="Refresh System Status"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'pipeline' && <PipelineController onPipelineCompleted={fetchStatus} />}
        {activeTab === 'queue' && <HumanApprovalQueueView />}
        {activeTab === 'history' && <ProductionHistoryView />}
        {activeTab === 'diagnostics' && <WordPressDiagnosticsView />}
        {activeTab === 'architect' && <ArchitectMatrixView />}
      </main>
    </div>
  );
}
