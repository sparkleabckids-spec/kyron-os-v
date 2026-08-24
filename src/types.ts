export interface SystemStatusResponse {
  success: boolean;
  executionMode: string;
  queueCount: {
    pending: number;
    approved?: number;
    rejected?: number;
    total?: number;
  };
  productionHistoryCount: {
    total: number;
    driveGlobalNews: number;
    gadiWaadi: number;
  };
}

export interface PipelineStage {
  id: number;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  details?: string;
}

export interface ReviewQueueItem {
  reviewId: string;
  decision: string;
  package: {
    headline: string;
    dekIntro?: string;
    sources?: Array<{ name: string; url: string }>;
    wordpressDraftStatus?: string;
    wordpressDraftPostId?: string | number | null;
    featuredMedia?: {
      imageUrl: string;
      title: string;
      caption?: string;
    };
    socialPackages?: {
      xPackage?: {
        singlePostText: string;
      };
    };
  };
}

export interface ProductionHistoryItem {
  id: string;
  title: string;
  topicEntity: string;
  producedAt: string;
  sourceUrl: string;
  developmentTag?: string;
  materialFactsFingerprint?: string;
}

export interface DiagnosticsResponse {
  overallStatus: string;
  failureReason?: string;
  credentialsProvided: {
    urlProvided: boolean;
    usernameProvided: boolean;
    passwordProvided: boolean;
  };
  restApiReachable: boolean;
  authValid: boolean;
  hasPostCreatePermission: boolean;
}

export interface PipelineRunResponse {
  success: boolean;
  result?: {
    success: boolean;
    stage: string;
    rejectionReason?: string;
    candidateItem?: { id: string };
    verifiedFactObject?: {
      facts?: string[];
      canonicalEntityName?: string;
    };
    eligibilityResult?: {
      passed: boolean;
      score: number;
      action?: string;
    };
    wordPressResult?: {
      mode: string;
      postId?: string | number | null;
    };
    mediaAssets?: {
      featuredAsset?: {
        imageUrl: string;
        title: string;
        caption?: string;
      };
      inlineAssets?: any[];
    };
    articleDraft?: {
      headline: string;
      dekIntro: string;
      seoMetadata: {
        suggestedSlug: string;
      };
      sections: Array<{
        heading: string;
        content: string;
      }>;
    };
    socialBundle?: {
      xPackage: {
        singlePostText: string;
        charCount: number;
      };
      pinterestPackage: {
        suggestedBoardName: string;
        pinTitle: string;
        pinDescription: string;
      };
    };
  };
}
