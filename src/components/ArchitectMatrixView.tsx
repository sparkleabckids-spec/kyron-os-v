import React, { useState } from 'react';
import {
  ShieldCheck,
  BookOpen,
  Terminal,
  Compass,
  Boxes,
  FileText,
  Printer
} from 'lucide-react';

export default function ArchitectMatrixView() {
  const [activeSection, setActiveSection] = useState<string>('doc-header');
  const [viewMode, setViewMode] = useState<'document' | 'matrix'>('matrix');

  const matrixData = [
    { num: '1', name: 'Document Control & Metadata', status: 'Complete', score: '10/10', missing: 'None', risks: 'Low (Metadata clear)', suggestions: 'Automate build timestamp via CI pipeline metadata.', comments: 'Fully defined document headers, IDs, roles, and classification.', approval: 'VERIFIED & LOCKED' },
    { num: '2', name: 'Executive Summary', status: 'Complete', score: '9.5/10', missing: 'None', risks: 'High market competition if latency bounds fail.', suggestions: 'Cross-reference sub-16ms target with NVMe I/O benchmarks.', comments: 'Articulates commercial rationale and local-first AI-BOS vision well.', approval: 'VERIFIED & LOCKED' },
    { num: '3', name: 'Project Nomenclature & Identity Standards', status: 'Complete', score: '10/10', missing: 'None', risks: 'Brand confusion if trademark unregistered.', suggestions: 'Register "KYRON OS" trademark early in Class 09.', comments: 'Clear taxonomy for Commercial Name, Code Name, Short Code, Namespace, and Subtitle.', approval: 'VERIFIED & LOCKED' },
    { num: '4', name: 'Product Category & Industry Taxonomy', status: 'Complete', score: '9.5/10', missing: 'None', risks: 'Market education required for "AI-BOS" category.', suggestions: 'Include architectural diagram comparing OS vs Browser vs AI-BOS.', comments: 'Categorization (ENT-AIBOS-NX) is precise and strategic.', approval: 'VERIFIED & LOCKED' },
    { num: '5', name: 'Core Mission & Purpose Statement', status: 'Complete', score: '10/10', missing: 'None', risks: 'Over-scoping features in early phases.', suggestions: 'Maintain strict scope guardrails during Phase 1 & 2.', comments: 'Concise mission statement centered on zero-latency executive command.', approval: 'VERIFIED & LOCKED' },
    { num: '6', name: 'Enterprise Business Problem Matrix', status: 'Complete', score: '9.5/10', missing: 'Quantitative SaaS leak metrics', risks: 'Cloud API dependencies if fallbacks introduced.', suggestions: 'Define strict offline fallback behavior for zero-connectivity environments.', comments: 'Maps enterprise pain points directly to KYRON OS solutions.', approval: 'VERIFIED & LOCKED' },
    { num: '7', name: 'Target Users & Enterprise Archetypes', status: 'Complete', score: '9.0/10', missing: 'Role permission matrix', risks: 'UX complexity balancing CXO simplicity vs Architect depth.', suggestions: 'Introduce role-based UI density modes (Executive View vs Engineering View).', comments: 'User archetypes cover key enterprise personas well.', approval: 'VERIFIED & LOCKED' },
    { num: '8', name: 'Supported Platforms & Operating Baseline', status: 'Complete', score: '9.0/10', missing: 'Min/Max hardware memory limits', risks: 'Win32 API coupling or macOS HAL abstraction debt.', suggestions: 'Standardize HAL (Hardware Abstraction Layer) interfaces early for macOS.', comments: 'Primary x64 Windows baseline correctly prioritized.', approval: 'VERIFIED & LOCKED' },
    { num: '9', name: 'Development Philosophy & Guiding Principles', status: 'Complete', score: '10/10', missing: 'None', risks: 'Thread safety violations in async native addons.', suggestions: 'Add static thread safety linters to CI/CD pipeline.', comments: '6 core principles set a strong engineering baseline.', approval: 'VERIFIED & LOCKED' },
    { num: '10', name: 'Product Positioning & Differentiation', status: 'Complete', score: '9.5/10', missing: 'Competitor benchmark telemetry', risks: 'SaaS incumbents building offline wrapper modes.', suggestions: 'Emphasize sub-16.6ms render floor in technical whitepapers.', comments: 'Contrast matrix effectively highlights air-gapped sovereign advantage.', approval: 'VERIFIED & LOCKED' },
    { num: '11', name: 'Long-Term Trajectory & Phase Roadmap', status: 'Complete', score: '9.5/10', missing: 'Milestone calendar dates', risks: 'Phase 1 scope creep into Phase 2 IPC development.', suggestions: 'Lock Phase 1 before commencing Phase 2 storage schema design.', comments: 'Clean 3-phase trajectory from Kernel to IPC to Agent SDK.', approval: 'VERIFIED & LOCKED' },
    { num: '12', name: 'Naming & Namespace Architecture Standard', status: 'Complete', score: '10/10', missing: 'None', risks: 'Namespace collision with 3rd-party plugins.', suggestions: 'Reserve "kyron.ext.*" exclusively for verified extensions.', comments: 'Hierarchy (kyron.kernel.*, kyron.storage.*) is cleanly structured.', approval: 'VERIFIED & LOCKED' },
    { num: '13', name: 'Enterprise Versioning Strategy (SemVer)', status: 'Complete', score: '10/10', missing: 'None', risks: 'Inconsistent build metadata across dev envs.', suggestions: 'Automate build metadata string generation in CI build scripts.', comments: 'SemVer 2.0.0 mapping with phase markers is standard and robust.', approval: 'VERIFIED & LOCKED' },
    { num: '14', name: 'Enterprise Industry Standards & Quality Models', status: 'Complete', score: '9.5/10', missing: 'Detailed ISO 25010 metric specs', risks: 'IPC serialization overhead under heavy load.', suggestions: 'Enforce zero-copy shared memory IPC for payloads > 1MB.', comments: 'ISO/IEC 25010 & Zero-Trust IPC references set necessary gates.', approval: 'VERIFIED & LOCKED' },
    { num: '15', name: 'Identity Risk Assessment & Mitigation', status: 'Complete', score: '9.0/10', missing: 'Financial risk quantification', risks: 'Scope creep during initial kernel development.', suggestions: 'Establish formal Change Control Board (CCB) process for spec edits.', comments: 'Core risks (trademark, web app misconception, scope creep) addressed.', approval: 'VERIFIED & LOCKED' },
    { num: '16', name: 'Strategic Engineering Recommendations', status: 'Complete', score: '9.5/10', missing: 'None', risks: 'Premature code generation prior to Phase 2 approval.', suggestions: 'Enforce automated spec gate check blocking compiler if spec is DRAFT.', comments: 'Clear directive to lock identity before proceeding to Phase 2 IPC specs.', approval: 'VERIFIED & LOCKED' },
    { num: '17', name: 'Missing Requirements & Architectural Gaps', status: 'Complete', score: '10/10', missing: 'Hardware specs, Regulatory targets, DRM, Local AI Engine', risks: 'Unresolved hardware specs affect model allocation.', suggestions: 'Schedule Product Owner decision gate for items #1 to #4 before Phase 2.', comments: 'Exceptional discipline in identifying and disclaiming unresolved gaps.', approval: 'VERIFIED & LOCKED' },
    { num: '18', name: 'Architectural Improvement Suggestions', status: 'Complete', score: '9.5/10', missing: 'None', risks: 'Extra overhead for Protobuf registry setup.', suggestions: 'Adopt Protocol Buffers (v3) for cross-language IPC serialization.', comments: 'Protobuf registry and automated CI linter recommendations are solid.', approval: 'VERIFIED & LOCKED' },
    { num: '19', name: 'Document Governance & Revision History', status: 'Complete', score: '10/10', missing: 'None', risks: 'Untracked document edits.', suggestions: 'Enforce Git LFS or strict Markdown versioning in repository.', comments: 'Initial revision v1.0-DRAFT properly logged with timestamp.', approval: 'VERIFIED & LOCKED' },
    { num: '20', name: 'Software Architect Review Sign-Off', status: 'Complete', score: '9.5/10', missing: 'Formal signatures from PO & Architect', risks: 'Proceeding without PO sign-off breaches governance.', suggestions: 'Transition status from DRAFT to APPROVED upon formal PO sign-off.', comments: 'Review checklist prepared and ready for final formal sign-off.', approval: 'Passed Review (Awaiting PO)' },
  ];

  const sections = [
    { id: '1', name: '1. Document Control & Metadata', anchor: 'doc-header' },
    { id: '2', name: '2. Executive Summary', anchor: 'executive-summary' },
    { id: '3', name: '3. Project Nomenclature & Identity', anchor: 'nomenclature' },
    { id: '4', name: '4. Product Category & Positioning', anchor: 'product-category' },
    { id: '5', name: '5. Core Mission & Purpose', anchor: 'mission-purpose' },
    { id: '6', name: '6. Business Problem Matrix', anchor: 'business-problems' },
    { id: '7', name: '7. Enterprise User Archetypes', anchor: 'user-archetypes' },
    { id: '8', name: '8. Target Platform & Environment', anchor: 'target-platforms' },
    { id: '9', name: '9. Core Engineering Philosophy', anchor: 'engineering-philosophy' },
    { id: '10', name: '10. Competitive Differentiation', anchor: 'competitive-matrix' },
    { id: '11', name: '11. Strategic Trajectory & Vision', anchor: 'product-trajectory' },
    { id: '12', name: '12. Naming & Namespace Standards', anchor: 'naming-standards' },
    { id: '13', name: '13. Enterprise Versioning Strategy', anchor: 'versioning-strategy' },
    { id: '14', name: '14. Standards & Compliance', anchor: 'compliance-standards' },
    { id: '15', name: '15. Risk Assessment & Mitigation', anchor: 'risk-assessment' },
    { id: '16', name: '16. Strategic Recommendations', anchor: 'strategic-recommendations' },
    { id: '17', name: '17. Missing Information & Gaps', anchor: 'missing-requirements' },
    { id: '18', name: '18. Improvement Suggestions', anchor: 'improvement-suggestions' },
    { id: '19', name: '19. Document Governance & Revision', anchor: 'document-governance' },
    { id: '20', name: '20. Architect Review & Sign-Off', anchor: 'review-checklist' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">KYRON-P1-S1-001 Identity Specification</h2>
            <p className="text-xs text-slate-400 font-mono">Phase 1 / Section 1 Master Architectural Baseline</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Architect Review Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'document'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Document</span>
            </button>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Spec</span>
          </button>
        </div>
      </div>

      {viewMode === 'matrix' ? (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 rounded-xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Architect Review Matrix</h3>
                  <p className="text-xs text-slate-400 font-mono">Document Target: KYRON-P1-S1-001 (Project Identity Specification)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                  STATUS: DRAFT / PENDING PO APPROVAL
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
              Comprehensive Section-by-Section Quality Audit Matrix evaluated against enterprise architecture standards, quality models (ISO/IEC 25010), and scope governance rules.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3 w-12 text-center">Sec #</th>
                  <th className="py-3 px-4 min-w-[180px]">Section Name</th>
                  <th className="py-3 px-3 text-center">Completion</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-4 min-w-[150px]">Missing Info</th>
                  <th className="py-3 px-4 min-w-[150px]">Identified Risks</th>
                  <th className="py-3 px-4 min-w-[200px]">Improvement Suggestions</th>
                  <th className="py-3 px-4 min-w-[220px]">Architect Comments</th>
                  <th className="py-3 px-3 text-center min-w-[130px]">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                {matrixData.map((row) => (
                  <tr key={row.num} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-cyan-400 text-center bg-slate-900/30">{row.num}</td>
                    <td className="py-3 px-4 font-semibold text-slate-100">{row.name}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-cyan-300">{row.score}</td>
                    <td className="py-3 px-4 text-slate-400">{row.missing}</td>
                    <td className="py-3 px-4 text-amber-300/90">{row.risks}</td>
                    <td className="py-3 px-4 text-slate-300">{row.suggestions}</td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">{row.comments}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold border block text-center ${
                        row.approval.includes('Awaiting')
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {row.approval}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Index</span>
              <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.anchor)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                      activeSection === sec.anchor
                        ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400 pl-2'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate">{sec.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-10">
            <section id="doc-header" className="space-y-6 scroll-mt-28 border-b border-slate-800 pb-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                  <FileText className="w-3.5 h-3.5" />
                  <span>SPECIFICATION DOCUMENT</span>
                </div>
                <span className="text-xs font-mono text-slate-400">FORMAL ENTERPRISE RELEASE v1.0</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  KYRON-P1-S1-001: Project Identity Specification
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                  Phase 1 / Section 1 Master Architectural Document establishing the formal identity, commercial scope, strategic target, and operational domain of KYRON OS.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">DOCUMENT ID</span>
                  <span className="text-cyan-400 font-bold">KYRON-P1-S1-001</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">PRODUCT CODE</span>
                  <span className="text-cyan-400 font-bold">KYRON OS</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CURRENT PHASE</span>
                  <span className="text-cyan-400 font-bold">Phase 1 (Kernel &amp; Identity)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">REVIEW STATUS</span>
                  <span className="text-emerald-400 font-bold">VERIFIED &amp; LOCKED</span>
                </div>
              </div>
            </section>

            <section id="executive-summary" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base border-b border-slate-800/80 pb-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h2>2. Executive Summary</h2>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                This document establishes the definitive commercial, technological, and strategic identity for <strong className="text-white">KYRON OS</strong>.
              </p>
            </section>

            <section id="nomenclature" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base border-b border-slate-800/80 pb-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h2>3. Project Nomenclature &amp; Identity Standards</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold block">Commercial Name</span>
                  <code className="text-white bg-slate-900 px-2 py-0.5 rounded font-mono block">KYRON OS</code>
                </div>
              </div>
            </section>

            <section id="product-category" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base border-b border-slate-800/80 pb-2">
                <Boxes className="w-4 h-4 text-cyan-400" />
                <h2>4. Product Category &amp; Industry Taxonomy</h2>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex gap-4 font-mono text-[11px]">
                  <div>Category Code: <strong className="text-cyan-400">ENT-AIBOS-NX</strong></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
