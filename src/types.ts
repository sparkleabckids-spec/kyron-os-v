export interface SystemStatusResponse {
  success: boolean;
  executionMode: string;
  queueCount: {
    pending: number;
    approved?: number;
    rejected?: number;
  };
}

export interface PipelineStage {
  id: number;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  details?: string;
}

export interface ApprovalQueueItem {
  id: string;
  title: string;
  stage: string;
  createdAt: string;
  payload?: any;
}

export interface ProductionHistoryItem {
  id: string;
  timestamp: string;
  status: string;
  details: string;
}

export interface WordPressDiagnostics {
  connected: boolean;
  endpoint: string;
  latencyMs?: number;
  statusText?: string;
}
