import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { AutomotiveContentPipeline } from './content_automation/pipeline';
import { HumanApprovalDashboardController } from './content_automation/mod07_human_approval_dashboard';
import { ProductionHistoryManager } from './content_automation/production_history';
import { WordPressPublisherBridge } from './content_automation/mod05_wordpress_bridge';
import { DiscoveredItem, SiteContext, SourceTier } from './content_automation/types';
import { resolveOfficialPublisherIdentity } from './content_automation/mod02_source_verification';
import { loadPersistentEnv, getPersistentDataDir } from './content_automation/storage_paths';

// Load persistent environment variables from user AppData directory
loadPersistentEnv();

async function startServer() {
  const app = express();
  const PORT = 3000;
  const dataDir = getPersistentDataDir();
  console.log(`[KYRON OS] Persistent User Data Directory: ${dataDir}`);

  app.use(express.json());

  // Instantiate singleton controllers connected to persistent disk storage
  const pipeline = new AutomotiveContentPipeline();
  const dashboardController = new HumanApprovalDashboardController();
  const wpBridge = new WordPressPublisherBridge();
  const historyDriveGlobal = new ProductionHistoryManager('DRIVEGLOBALNEWS_IN');
  const historyGadiWaadi = new ProductionHistoryManager('GADIWAADI_IN');

  // 1. HEALTH CHECK
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. GRACEFUL SHUTDOWN ENDPOINT (For Windows Desktop Stop Utility)
  let serverInstance: any = null;

  app.post('/api/server/shutdown', (req, res) => {
    // Audit check: Restrict shutdown triggers to local loopback (localhost / 127.0.0.1 / ::1)
    const remoteIp = req.socket.remoteAddress || req.ip || '';
    const isLocalhost =
      remoteIp === '127.0.0.1' ||
      remoteIp === '::1' ||
      remoteIp === '::ffff:127.0.0.1' ||
      remoteIp.includes('127.0.0.1');

    if (!isLocalhost && process.env.NODE_ENV === 'production' && !process.env.ALLOW_REMOTE_SHUTDOWN) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN: Server shutdown can only be triggered locally by desktop utilities.',
      });
    }

    res.json({ success: true, message: 'KYRON OS server shutting down gracefully' });
    setTimeout(() => {
      if (serverInstance) {
        serverInstance.close(() => {
          console.log('KYRON OS server stopped cleanly.');
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    }, 400);
  });

  // 3. SYSTEM STATUS & CONFIGURATION AUDIT
  app.get('/api/status', (_req, res) => {
    const queue = dashboardController.listReviews();
    const driveRecords = historyDriveGlobal.getRecords();
    const gadiRecords = historyGadiWaadi.getRecords();

    const isWpConfigured = Boolean(
      process.env.WORDPRESS_URL &&
      process.env.WORDPRESS_USERNAME &&
      process.env.WORDPRESS_APP_PASSWORD
    );

    res.json({
      system: 'KYRON OS Enterprise Content Automation',
      version: '1.0.0-PROD',
      executionMode: 'PRODUCTION_VALIDATION',
      wordpress: {
        isConfigured: isWpConfigured,
        urlProvided: Boolean(process.env.WORDPRESS_URL),
        usernameProvided: Boolean(process.env.WORDPRESS_USERNAME),
        passwordProvided: Boolean(process.env.WORDPRESS_APP_PASSWORD),
        status: isWpConfigured ? 'CREDENTIALS_CONFIGURED' : 'WORDPRESS_NOT_CONFIGURED',
        draftOnlyEnforced: true,
      },
      queueCount: {
        total: queue.length,
        pending: queue.filter((q) => q.decision === 'PENDING').length,
        approved: queue.filter((q) => q.decision === 'APPROVED').length,
        rejected: queue.filter((q) => q.decision === 'REJECTED').length,
      },
      productionHistoryCount: {
        driveGlobalNews: driveRecords.length,
        gadiWaadi: gadiRecords.length,
        total: driveRecords.length + gadiRecords.length,
      },
    });
  });

  // 3. PERSISTENT HUMAN APPROVAL QUEUE
  app.get('/api/queue', (_req, res) => {
    const reviews = dashboardController.listReviews();
    res.json({
      success: true,
      count: reviews.length,
      items: reviews,
    });
  });

  // 4. PERSISTENT PRODUCTION HISTORY
  app.get('/api/history', (_req, res) => {
    const driveRecords = historyDriveGlobal.getRecords();
    const gadiRecords = historyGadiWaadi.getRecords();
    res.json({
      success: true,
      driveGlobalNews: driveRecords,
      gadiWaadi: gadiRecords,
      total: driveRecords.length + gadiRecords.length,
    });
  });

  // 5. WORDPRESS SAFE CONNECTION DIAGNOSTIC PROBE (READ-ONLY)
  app.get('/api/wordpress/diagnostics', async (_req, res) => {
    try {
      const diagResult = await wpBridge.testConnectionAndPermissions();
      res.json({
        success: true,
        diagnostics: diagResult,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || 'WordPress diagnostic probe error',
      });
    }
  });

  // 6. TRIGGER REAL 14-STAGE PIPELINE RUN
  app.post('/api/pipeline/run', async (req, res) => {
    try {
      const {
        url = 'https://usa.nissannews.com/en-US/releases/2026-nissan-leaf-press-kit',
        headline = '2026 Nissan LEAF Press Kit',
        summary,
        topicCategory = 'US_AUTOMOTIVE',
        siteContext = 'DRIVEGLOBALNEWS_IN',
      } = req.body || {};

      const publisherIdentity = resolveOfficialPublisherIdentity(url);
      const candidate: Omit<DiscoveredItem, 'id' | 'normalizedFingerprint'> = {
        title: headline,
        url: url,
        source: {
          id: publisherIdentity.id || `src-${Date.now()}`,
          name: publisherIdentity.name || 'Official OEM Source',
          url: url,
          tier: SourceTier.TIER_1_OFFICIAL,
          reliabilityScore: publisherIdentity.reliabilityScore || 1.0,
        },
        publishedAt: new Date().toISOString(),
        summary: summary || headline,
        rawContent: summary || headline,
        fullContent: summary || headline,
        topicCategory: topicCategory as any,
        siteContext: siteContext as SiteContext,
      };

      const selectedSite = (siteContext === 'GADIWAADI_IN' ? 'GADIWAADI_IN' : 'DRIVEGLOBALNEWS_IN') as SiteContext;
      const historyManager = pipeline.getProductionHistoryManager(selectedSite, true);
      const memoryManager = pipeline.getEditorialMemoryManager(selectedSite);

      // Executes the REAL 14-Stage AutomotiveContentPipeline strictly in PRODUCTION_VALIDATION mode
      const result = await pipeline.executeCompleteEndToEndWorkflowAsync(candidate, {
        mode: 'PRODUCTION_VALIDATION',
        isProductionRun: true,
        historyManager,
        memoryManager,
      });

      res.json({
        success: true,
        result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || 'Pipeline execution failed',
      });
    }
  });

  // 7. TRIGGER FULL PRODUCTION DISCOVERY & CYCLE
  app.post('/api/pipeline/cycle', async (req, res) => {
    try {
      const { siteContext = 'DRIVEGLOBALNEWS_IN' } = req.body || {};
      const selectedSite = (siteContext === 'GADIWAADI_IN' ? 'GADIWAADI_IN' : 'DRIVEGLOBALNEWS_IN') as SiteContext;
      const discoveryEngine = pipeline.getDiscoveryEngine();
      const discoveredItems = await discoveryEngine.discoverProductionNews(selectedSite);

      const results = [];
      const historyManager = pipeline.getProductionHistoryManager(selectedSite, true);
      const memoryManager = pipeline.getEditorialMemoryManager(selectedSite);

      for (const item of discoveredItems.slice(0, 5)) {
        const itemResult = await pipeline.executeCompleteEndToEndWorkflowAsync(item, {
          mode: 'PRODUCTION_VALIDATION',
          isProductionRun: true,
          historyManager,
          memoryManager,
        });
        results.push(itemResult);
      }

      res.json({
        success: true,
        processedCount: results.length,
        results,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || 'Production cycle execution failed',
      });
    }
  });

  // VITE MIDDLEWARE (Development) or STATIC ASSETS (Production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  serverInstance = app.listen(PORT, '0.0.0.0', () => {
    console.log(`KYRON OS server running on http://0.0.0.0:${PORT}`);
  });

  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Closing KYRON OS gracefully...');
    if (serverInstance) {
      serverInstance.close(() => process.exit(0));
    } else {
      process.exit(0);
    }
  });

  process.on('SIGTERM', () => {
    console.log('\nReceived SIGTERM. Closing KYRON OS gracefully...');
    if (serverInstance) {
      serverInstance.close(() => process.exit(0));
    } else {
      process.exit(0);
    }
  });
}

startServer();
