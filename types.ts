export type TabMode = 'pipeline' | 'queue' | 'history' | 'diagnostics' | 'matrix' | 'document';

export interface SystemStatusResponse {
  system: string;
  version: string;
  executionMode: string;
  wordpress: {
    isConfigured: boolean;
    urlProvided: boolean;
    usernameProvided: boolean;
    passwordProvided: boolean;
    status: string;
    draftOnlyEnforced: boolean;
  };
  queueCount: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  productionHistoryCount: {
    driveGlobalNews: number;
    gadiWaadi: number;
    total: number;
  };
}

export interface ReviewQueueItem {
  reviewId: string;
  decision: 'PENDING' | 'APPROVED' | 'REJECTED';
  lastEditedAt: string;
  isLockedForPublishing: boolean;
  package: {
    draftId: string;
    headline: string;
    dekIntro: string;
    articleBodyHtml: string;
    sources: Array<{ name: string; url: string; tier: string }>;
    verificationStatus: string;
    factualClaimsCount: number;
    featuredMedia?: {
      id: string;
      imageUrl: string;
      title: string;
      altText: string;
      caption: string;
    };
    inlineMedia?: Array<{
      id: string;
      imageUrl: string;
      title: string;
      altText: string;
      caption: string;
    }>;
    wordpressDraftPostId?: number;
    wordpressDraftStatus: string;
    publishStatus: string;
    socialPackages?: {
      xPackage?: {
        singlePostText: string;
        threadPosts: string[];
        hashtags: string[];
        charCount: number;
      };
      pinterestPackage?: {
        pinTitle: string;
        pinDescription: string;
        suggestedBoardName: string;
        imageUrl?: string;
      };
    };
  };
}

export interface ProductionHistoryItem {
  id: string;
  siteContext: string;
  title: string;
  sourceUrl: string;
  canonicalUrl?: string;
  publishedAt: string;
  producedAt: string;
  topicEntity: string;
  materialFactsFingerprint: string;
  sourceContentFingerprint: string;
  developmentTag?: string;
  summary?: string;
}

export interface DiagnosticsResponse {
  timestamp: string;
  configured: boolean;
  rawBaseUrl: string;
  normalizedEndpoint: string;
  credentialsProvided: {
    urlProvided: boolean;
    usernameProvided: boolean;
    passwordProvided: boolean;
  };
  restApiReachable: boolean;
  httpStatus?: number;
  authValid: boolean;
  hasPostCreatePermission: boolean;
  draftOnlyEnforced: boolean;
  testMode: string;
  overallStatus: 'CONNECTED_AND_VERIFIED' | 'AUTH_OR_PERMISSION_FAILED' | 'ENDPOINT_UNREACHABLE' | 'NOT_CONFIGURED';
  failureReason?: string;
}

export interface PipelineRunResponse {
  success: boolean;
  result: {
    success: boolean;
    stage: string;
    candidateItem?: {
      id: string;
      title: string;
      url: string;
      discoveredAt: string;
      siteContext: string;
    };
    verifiedFactObject?: {
      canonicalEntityName: string;
      facts: Array<{
        factId: string;
        factType: string;
        subject: string;
        predicate: string;
        objectValue: string;
        confidence: number;
      }>;
    };
    eligibilityResult?: {
      passed: boolean;
      score: number;
      action: 'PROCEED' | 'HOLD' | 'REJECT';
      reasons: string[];
      breakdown?: {
        factRichness: number;
        consumerSignificance: number;
        concreteMetrics: number;
        usRelevance: number;
      };
    };
    articleDraft?: {
      id: string;
      headline: string;
      dekIntro: string;
      articleBody: string;
      sections: Array<{ heading: string; content: string }>;
      qualityGateCheckPass: boolean;
      qualityGateCheckIssues?: string[];
      claimProvenance?: Array<{
        text: string;
        factId: string;
        sourceUrl: string;
        sourceType: string;
        entityId: string;
      }>;
      seoMetadata: {
        seoTitle: string;
        metaDescription: string;
        suggestedSlug: string;
        focusKeywords: string[];
      };
    };
    mediaAssets?: {
      featuredAsset: {
        id: string;
        imageUrl: string;
        title: string;
        caption: string;
        prompt: string;
      };
      inlineAssets: Array<{
        id: string;
        imageUrl: string;
        title: string;
        caption: string;
        prompt: string;
      }>;
    };
    wordPressResult?: {
      mode: string;
      postId?: number;
      status: string;
      message?: string;
    };
    socialBundle?: {
      xPackage: {
        singlePostText: string;
        threadPosts: string[];
        hashtags: string[];
        charCount: number;
      };
      pinterestPackage: {
        pinTitle: string;
        pinDescription: string;
        suggestedBoardName: string;
        imageUrl?: string;
      };
    };
    dashboardReviewState?: {
      reviewId: string;
      decision: string;
      isLockedForPublishing: boolean;
    };
    rejectionReason?: string;
  };
}
