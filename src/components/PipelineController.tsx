import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { PipelineRunResponse } from '../types';

interface Props {
  onPipelineCompleted?: () => void;
}

export default function PipelineController({ onPipelineCompleted }: Props) {
  const [targetUrl, setTargetUrl] = useState<string>('https://usa.nissannews.com/en-US/releases/2026-nissan-leaf-press-kit');
  const [headline, setHeadline] = useState<string>('2026 Nissan LEAF Press Kit');
  const [siteContext, setSiteContext] = useState<'DRIVEGLOBALNEWS_IN' | 'GADIWAADI_IN'>('DRIVEGLOBALNEWS_IN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<PipelineRunResponse['result'] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExecutePipeline = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          headline: headline,
          siteContext: siteContext,
        }),
      });
      const data: PipelineRunResponse = await res.json();
      if (data.success && data.result) {
        setRunResult(data.result);
        if (onPipelineCompleted) onPipelineCompleted();
      } else {
        setErrorMessage('Execution failed on server');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error running pipeline');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">14-Stage Unified Automotive Pipeline Execution</h2>
              <p className="text-xs text-slate-400 font-mono">Live End-to-End Orchestrator (Production-Validation Mode)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
              MODE: PRODUCTION_VALIDATION
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Target OEM Press Kit / Source URL</label>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Topic / Story Title</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="Headline..."
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Site Context</label>
            <select
              value={siteContext}
              onChange={(e) => setSiteContext(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="DRIVEGLOBALNEWS_IN">DriveGlobalNews.in</option>
              <option value="GADIWAADI_IN">GadiWaadi.in</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Passes through ProductionEligibilityGate &amp; WordPress Draft-Only Guard</span>
          </div>

          <button
            onClick={handleExecutePipeline}
            disabled={isLoading || !targetUrl}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Executing 14 Stages...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Production Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {runResult && (
        <div className="space-y-6">
          <div className={`p-5 rounded-xl border flex items-center justify-between flex-wrap gap-4 ${
            runResult.success 
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-3">
              {runResult.success ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400" />
              )}
              <div>
                <h3 className="font-bold text-sm text-white">
                  Pipeline Execution: {runResult.success ? 'PASSED / READY FOR HUMAN REVIEW' : 'REJECTED / BLOCKED'}
                </h3>
                <p className="text-xs opacity-80 font-mono">
                  Terminal Stage: {runResult.stage} {runResult.rejectionReason ? `— ${runResult.rejectionReason}` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
