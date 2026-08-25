import React, { useEffect, useState } from 'react';
import {
  Lock,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  Layers,
  Image as ImageIcon,
  Share2,
  ExternalLink
} from 'lucide-react';
import { ReviewQueueItem } from '../types';

export default function HumanApprovalQueueView() {
  const [queueItems, setQueueItems] = useState<ReviewQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ReviewQueueItem | null>(null);

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/queue');
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setQueueItems(data.items);
        if (data.items.length > 0 && !selectedItem) {
          setSelectedItem(data.items[0]);
        }
      }
    } catch {
      // Graceful error fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Persistent Human Approval Queue</h2>
            <p className="text-xs text-slate-400 font-mono">
              Disk Storage: <code className="text-cyan-300">content_automation/human_review_queue.json</code> (Fail-Closed Locked)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono rounded">
            {queueItems.length} Stories in Queue
          </span>
          <button
            onClick={fetchQueue}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Disk Queue</span>
          </button>
        </div>
      </div>

      {queueItems.length === 0 && !isLoading ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <Layers className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No Stories Currently Pending in Disk Queue</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Execute a 14-stage production pipeline run to generate and register a verified editorial package.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Queue Stories</h3>
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {queueItems.map((item) => (
                <div
                  key={item.reviewId}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2 text-left ${
                    selectedItem?.reviewId === item.reviewId
                      ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="text-cyan-400 font-bold truncate">{item.reviewId}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {item.decision}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2">{item.package.headline}</h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>{item.package.sources?.[0]?.name || 'Tier-1 Source'}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedItem && (
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                  <span className="text-cyan-400 font-bold">{selectedItem.reviewId}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      STATUS: {selectedItem.decision}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Auto-Publish Guard Locked
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedItem.package.headline}</h3>
                <p className="text-xs text-slate-400 italic">{selectedItem.package.dekIntro}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">VERIFIED PRIMARY SOURCE</span>
                  <a
                    href={selectedItem.package.sources?.[0]?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:underline flex items-center gap-1 truncate mt-0.5"
                  >
                    <span>{selectedItem.package.sources?.[0]?.name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">WORDPRESS BRIDGE DRAFT</span>
                  <span className="text-slate-200 mt-0.5 block">
                    Mode: <code className="text-cyan-400">{selectedItem.package.wordpressDraftStatus}</code> (Post ID: {selectedItem.package.wordpressDraftPostId ?? 'None'})
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
