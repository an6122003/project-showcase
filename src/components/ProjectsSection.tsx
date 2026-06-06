import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Container, Tag, Modal } from './ui';
import { PixelComputer, PixelHammer, PixelCheck, PixelGlobe, PixelCamera } from './PixelIcons';
import { FileText, ChevronLeft, ChevronRight, Download, ExternalLink, Loader, BarChart, ShoppingCart, Bot, MonitorSmartphone, ShieldCheck, Gavel, Sparkles } from 'lucide-react';
import { fetchPdf } from '../utils/fetchPdf';
import { PortfolioFocus, portfolioFocusOptions } from './portfolioFocus';

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

// ─── Module-level PDF data store ─────────────────────────────────
//
// Two-tier cache to guarantee:
// 1. Each PDF URL is fetched at most once (pdfFetchPromises deduplicates in-flight)
// 2. Each consumer gets a FRESH ArrayBuffer copy (pdfDataStore holds master bytes)
// 3. pdf.js can never neuter/corrupt the cached data
//
// The master copy in pdfDataStore is a Uint8Array that is NEVER given out directly.
// Consumers call getPdfData() which returns a new ArrayBuffer via .slice().

const pdfDataStore = new Map<string, Uint8Array>();
const pdfFetchPromises = new Map<string, Promise<void>>();

async function fetchAndCachePdf(url: string): Promise<void> {
  if (pdfDataStore.has(url)) return;

  if (!pdfFetchPromises.has(url)) {
    const p = fetchPdf(url)
      .then(buf => {
        // Store master copy — never exposed directly
        pdfDataStore.set(url, new Uint8Array(buf));
        pdfFetchPromises.delete(url);
      })
      .catch(err => {
        pdfFetchPromises.delete(url);
        throw err;
      });
    pdfFetchPromises.set(url, p);
  }

  return pdfFetchPromises.get(url);
}

// Module-level stable fileObj cache.
// react-pdf's <Document> re-fetches whenever `file` prop changes by REFERENCE.
// React StrictMode remounts components, resetting useRef guards, causing effects
// to run twice. If each run creates a new {data: ...} object, react-pdf sees
// two different references → infinite reload loop.
// This cache ensures the SAME {data} object is returned for the same URL FOREVER.
const pdfFileObjCache = new Map<string, { data: ArrayBuffer }>();

/** Returns a STABLE fileObj for react-pdf. Same URL → same object reference always. */
function getStableFileObj(url: string): { data: ArrayBuffer } | null {
  if (pdfFileObjCache.has(url)) return pdfFileObjCache.get(url)!;
  const stored = pdfDataStore.get(url);
  if (!stored) return null;
  const obj = { data: stored.slice().buffer };
  pdfFileObjCache.set(url, obj);
  return obj;
}

/** Returns a fresh ArrayBuffer copy (for blobs or one-off use, NOT for react-pdf). */
function getFreshPdfData(url: string): ArrayBuffer | null {
  const stored = pdfDataStore.get(url);
  if (!stored) return null;
  return stored.slice().buffer;
}

function makeBlobUrl(buf: ArrayBuffer): string {
  return URL.createObjectURL(new Blob([buf], { type: 'application/pdf' }));
}

// ─── PdfRenderer ─────────────────────────────────────────────────
//
// Pure display component. Receives the PDF URL + width.
// Creates and holds its OWN stable fileObj from the cache on mount.
// Never re-creates fileObj → react-pdf never re-loads the document.
//
// The `key` prop from the parent changes on document switch, causing
// a clean remount with fresh state.

const PdfRenderer = ({ pdfUrl, width }: { pdfUrl: string; width: number }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderError, setRenderError] = useState(false);

  // Track last rendered page height so the container never collapses during page switch.
  // When react-pdf tears down the old canvas and creates a new one, there's a brief
  // moment with zero content → without min-height the frame collapses → visual glitch.
  const [pageHeight, setPageHeight] = useState(0);
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  // Get the STABLE fileObj from the module-level cache.
  // Same URL always returns the same object reference → react-pdf never re-loads.
  const fileObjRef = useRef<{ data: ArrayBuffer } | null>(null);
  if (!fileObjRef.current) {
    fileObjRef.current = getStableFileObj(pdfUrl);
  }

  if (!fileObjRef.current) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <FileText className="w-12 h-12 text-gray-300" />
        <p className="text-brand-subtext font-medium">Could not load PDF.</p>
      </div>
    );
  }

  if (renderError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <FileText className="w-12 h-12 text-gray-300" />
        <p className="text-brand-subtext font-medium">Failed to render PDF.</p>
        <p className="text-xs text-gray-400">The file may be too large or corrupted.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Wrapper holds min-height of the last rendered page to prevent collapse */}
      <div ref={pageWrapperRef} style={{ minHeight: pageHeight > 0 ? pageHeight : undefined }}>
        <Document
          file={fileObjRef.current}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          onLoadError={() => setRenderError(true)}
          error={
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <FileText className="w-12 h-12 text-gray-300" />
              <p className="text-brand-subtext font-medium">Failed to render document.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onRenderSuccess={() => {
              // Capture the actual rendered height after the canvas is drawn
              if (pageWrapperRef.current) {
                setPageHeight(pageWrapperRef.current.scrollHeight);
              }
            }}
            loading={
              <div className="flex items-center justify-center" style={{ minHeight: pageHeight > 0 ? pageHeight : 200 }}>
                <Loader className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            }
            error={
              <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
                Failed to render this page.
              </div>
            }
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex items-center justify-center gap-4 bg-[#fdfaf5] border-2 border-black rounded-lg px-4 py-2.5">
          <button
            type="button"
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={3} />
          </button>
          <span className="font-mono text-sm font-bold">
            Page {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── PdfViewerModal ───────────────────────────────────────────────
//
// Owns all PDF fetching. Downloads each URL exactly once via the module cache.
// Width is measured once on open + on window resize — NO ResizeObserver
// (ResizeObserver caused a feedback loop: page render → canvas changes → resize fires
//  → width state update → re-render → repeat every 3-5 pages).
//
// key={displayUrl} on PdfRenderer forces a clean remount per document.

const PdfViewerModal = ({ isOpen, onClose, projectSlug, title }: {
  isOpen: boolean; onClose: () => void; projectSlug: string; title: string;
}) => {
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(900);

  const [displayUrl, setDisplayUrl] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // Blob URLs for download/open actions (revoked on close)
  const blobUrlsRef = useRef<Map<string, string>>(new Map());
  const [blobReady, setBlobReady] = useState(0); // counter to trigger re-render on blob creation

  // containerRef sits ON the PDF viewer box (the scrollable div).
  // clientWidth of a scrollable element already excludes its own scrollbar,
  // so no manual subtraction is needed — the canvas fills edge-to-edge.
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Measure width ──
  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      const w = Math.min(containerRef.current.clientWidth, 1100);
      setContainerWidth(w);
    }
  }, []);

  // ── Load manifest on open ──
  useEffect(() => {
    if (!isOpen || !projectSlug) return;
    setCurrentIdx(0);
    setDisplayUrl('');
    setFetchError(false);
    blobUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
    blobUrlsRef.current = new Map();
    setBlobReady(0);

    const base = import.meta.env.BASE_URL;
    fetch(`${base}projects/${projectSlug}/manifest.json`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.files?.length) {
          setPdfUrls(data.files.map((f: string) => `/projects/${projectSlug}/${f}`));
        } else {
          setPdfUrls([]);
        }
      })
      .catch(() => setPdfUrls([]));
  }, [isOpen, projectSlug]);

  // ── Cleanup on close ──
  useEffect(() => {
    if (!isOpen) {
      blobUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
      blobUrlsRef.current = new Map();
      setDisplayUrl('');
      setFetchError(false);
      setPdfUrls([]);
    }
  }, [isOpen]);

  // ── Width: measure once + on window resize (NO ResizeObserver) ──
  useEffect(() => {
    if (!isOpen) return;
    // Delay initial measurement so modal has rendered
    const timer = setTimeout(measureWidth, 100);
    window.addEventListener('resize', measureWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureWidth);
    };
  }, [isOpen, measureWidth]);

  // ── Fetch current PDF ──
  useEffect(() => {
    if (!isOpen || pdfUrls.length === 0) return;
    const url = pdfUrls[currentIdx];
    if (!url) return;

    // Already in cache — just display
    if (pdfDataStore.has(url)) {
      setDisplayUrl(url);
      setIsFetching(false);
      setFetchError(false);
      // Create blob if not already done
      if (!blobUrlsRef.current.has(url)) {
        const data = getFreshPdfData(url);
        if (data) {
          blobUrlsRef.current.set(url, makeBlobUrl(data));
          setBlobReady(n => n + 1);
        }
      }
      return;
    }

    setIsFetching(true);
    setFetchError(false);

    fetchAndCachePdf(url)
      .then(() => {
        // Create blob URL from a fresh copy (NOT the stable one for react-pdf)
        const data = getFreshPdfData(url);
        if (data) {
          blobUrlsRef.current.set(url, makeBlobUrl(data));
        }
        setDisplayUrl(url);
        setIsFetching(false);
        setBlobReady(n => n + 1);
      })
      .catch(() => {
        setIsFetching(false);
        setFetchError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pdfUrls, currentIdx]);

  const currentUrl = pdfUrls[currentIdx] ?? '';
  const isCurrentReady = pdfDataStore.has(currentUrl);
  const currentBlobUrl = blobUrlsRef.current.get(currentUrl);
  const showUrl = displayUrl && pdfDataStore.has(displayUrl) ? displayUrl : '';
  const currentFilename = (currentUrl.split('/').pop() || 'document.pdf').replace(/\.bin$/, '.pdf');

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentBlobUrl) window.open(currentBlobUrl, '_blank');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentBlobUrl) {
      const a = document.createElement('a');
      a.href = currentBlobUrl;
      a.download = currentFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        {pdfUrls.length > 0 ? (
          <div className="flex flex-col gap-4">

            {/* Document switcher */}
            {pdfUrls.length > 1 && (
              <div className="flex items-center justify-between bg-[#fdfaf5] border-2 border-black rounded-lg px-4 py-3">
                <button
                  type="button"
                  onClick={() => setCurrentIdx(c => Math.max(0, c - 1))}
                  disabled={currentIdx === 0 || isFetching}
                  className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                </button>
                <span className="font-mono text-sm font-bold flex items-center gap-2">
                  {isFetching && <Loader className="w-3.5 h-3.5 animate-spin" />}
                  Document {currentIdx + 1} / {pdfUrls.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentIdx(c => Math.min(pdfUrls.length - 1, c + 1))}
                  disabled={currentIdx === pdfUrls.length - 1 || isFetching}
                  className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            )}

            {/* PDF viewer area — ref is HERE so clientWidth already excludes scrollbar */}
            <div
              ref={containerRef}
              className="w-full border-4 border-black rounded-xl overflow-y-auto overflow-x-hidden shadow-[4px_4px_0_0_#000] bg-white max-h-[78vh] relative"
            >
              {fetchError && !showUrl ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <FileText className="w-12 h-12 text-gray-300" />
                  <p className="text-brand-subtext font-medium">Could not load PDF.</p>
                </div>
              ) : showUrl && containerWidth > 0 ? (
                <>
                  {/* key=showUrl forces a clean PdfRenderer remount per document */}
                  <PdfRenderer key={showUrl} pdfUrl={showUrl} width={containerWidth} />
                  {isFetching && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                      <Loader className="w-8 h-8 animate-spin text-black" />
                      <p className="font-mono text-sm font-bold">Loading document…</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-20">
                  <Loader className="w-8 h-8 animate-spin text-black" />
                  <p className="font-mono text-sm font-bold text-brand-subtext">Loading PDF…</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleOpenInNewTab}
                disabled={!currentBlobUrl}
                className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={3} />
                {currentBlobUrl ? 'Open in New Tab' : 'Preparing…'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!currentBlobUrl}
                className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-black text-white hover:bg-gray-800 transition-all shadow-[4px_4px_0_0_#EAEAEA] hover:shadow-[2px_2px_0_0_#EAEAEA] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
              >
                <Download className="w-4 h-4" strokeWidth={3} />
                {currentBlobUrl ? 'Download' : 'Preparing…'}
              </button>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-16 h-16 text-gray-300 mb-6" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-2">No documents yet</h3>
            <p className="text-brand-subtext max-w-md">Project files will be available here soon.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};


// ─── Project Data ────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  tags: { label: string; color: 'gray' | 'pink' | 'green' | 'purple' }[];
  projectSlug: string;
  coverImage?: string;
  externalUrl?: string;
  externalLabel?: string;
  hasPdf: boolean;
  pdfLabel?: string;
  noCoverPreview?: boolean;
  slides?: { title: string; content: string }[];
  badge?: string;
  isLive?: boolean;
  footerText?: string;
  customHoverClass?: string;
  focuses: PortfolioFocus[];
}

const projects: Project[] = [
  {
    id: 9,
    title: 'Antibot: Agentic Discord Community Manager',
    role: 'AI Product Builder · Discord Community Automation · Pre-launch',
    description: 'Building an agentic Discord community manager that talks first, remembers member context, and makes servers feel alive. The experience turns passive chat spaces into proactive communities through memory-driven prompts, contextual replies, and always-on engagement.',
    icon: Bot,
    tags: [{ label: 'Agentic AI', color: 'purple' }, { label: 'Community Product', color: 'green' }, { label: 'Discord Automation', color: 'pink' }, { label: 'Pre-launch', color: 'gray' }],
    projectSlug: 'antibot',
    coverImage: '/projects/antibot/cover.png',
    externalUrl: 'https://techieslab-app.github.io/antibot/',
    externalLabel: 'View Landing Page',
    hasPdf: false,
    badge: 'In Development',
    customHoverClass: 'hover:border-[#f08062] hover:shadow-[8px_8px_0_0_#f08062]',
    focuses: ['product', 'engineering'],
  },
  {
    id: 3,
    title: 'RetroLab: AI-Powered Tech News Platform',
    role: 'Founder & Technical Architect · Digital Media Platform',
    description: 'Built an AI-driven Vietnamese tech news platform from product vision to live deployment. A multi-agent editorial pipeline reaches 99% automation, publishes in two minutes, and scales to 50+ articles daily at $0.001 per article.',
    icon: Sparkles,
    tags: [{ label: 'AI Automation', color: 'purple' }, { label: 'FinOps & Unit Economics', color: 'green' }, { label: 'Next.js & LLMs', color: 'pink' }, { label: 'Product Architecture', color: 'gray' }],
    projectSlug: 'retrolab',
    coverImage: '/projects/retrolab/cover.png',
    externalUrl: 'https://portfolio.retrolab.com.vn/',
    externalLabel: 'View Portfolio Site',
    hasPdf: false,
    customHoverClass: 'hover:border-[#38bdf8] hover:shadow-[8px_8px_0_0_#38bdf8]',
    focuses: ['product', 'engineering'],
  },
  {
    id: 8,
    title: 'SPX Express: AI-Native Procurement-to-Pay Platform',
    role: 'Business Product Management (AI Solutions) · SPX Express Case Study',
    description: 'Designed an AI-native Procurement-to-Pay platform for SPX Express to replace fragmented manual workflows from request intake through payment. The solution normalizes vendor documents, supports human-in-the-loop approvals, and improves cost visibility across operational teams.',
    icon: Sparkles,
    tags: [{ label: 'AI Product Strategy', color: 'purple' }, { label: 'Procurement-to-Pay', color: 'green' }, { label: 'Workflow Automation', color: 'pink' }, { label: 'Product Mockups', color: 'gray' }],
    projectSlug: 'spx-case-study',
    coverImage: '/projects/spx-case-study/cover.png',
    hasPdf: true,
    pdfLabel: 'View Product Solution',
    badge: 'SPX Express Case Study',
    customHoverClass: 'hover:border-[#ee4d2d] hover:shadow-[8px_8px_0_0_#ee4d2d]',
    focuses: ['product', 'business'],
  },
  {
    id: 1,
    title: 'ZaloPay: Compliant PIN Expiration Management',
    role: 'Associate Product Owner · User Platform Case Study',
    description: 'Designed a compliant PIN-expiration journey without breaking critical payments. The solution preserves session state through an "Interrupt & Resume" flow, adds tiered notifications, and uses a canary rollout to target a 99% completion rate for interrupted transactions.',
    icon: ShieldCheck,
    tags: [{ label: 'Product Strategy', color: 'purple' }, { label: 'Fintech Compliance', color: 'green' }, { label: 'UX Optimization', color: 'pink' }, { label: 'Risk Management', color: 'gray' }],
    projectSlug: 'zalopay-case-study',
    coverImage: '/projects/zalopay-case-study/cover.png',
    hasPdf: true,
    pdfLabel: 'View Product Solution',
    badge: 'ZaloPay Case Study',
    customHoverClass: 'hover:border-[#0f9a8d] hover:shadow-[8px_8px_0_0_#0f9a8d]',
    focuses: ['product', 'business'],
  },
  {
    id: 2,
    title: 'Zalo: Multi-Device Ecosystem for Business',
    role: 'Product Management Case Study · Zalo Product Management Trainee 2023',
    description: 'Designed a roadmap for Zalo business users constrained by single-device access. The proposal enables secure multi-device usage, prevents message loss, and targets a 30% increase in premium conversions for SMEs.',
    icon: MonitorSmartphone,
    tags: [{ label: 'Product Strategy', color: 'purple' }, { label: 'Feature Design', color: 'green' }, { label: 'Business Growth', color: 'pink' }, { label: 'UX/UI Mockups', color: 'gray' }],
    projectSlug: 'zalo-pmt-2023',
    coverImage: '/projects/zalo-pmt-2023/cover.png',
    hasPdf: true,
    pdfLabel: 'View Product Roadmap',
    customHoverClass: 'hover:border-[#0068ff] hover:shadow-[8px_8px_0_0_#0068ff]',
    focuses: ['product', 'business'],
  },
  {
    id: 4,
    title: 'Auction Game Product Design',
    role: 'Product Owner & Lead UI/UX Designer',
    description: 'Defined an e-commerce auction feature with a gamified earn-turns mechanic. I mapped the end-to-end journey, scoped the MVP against engineering constraints, and designed real-time bidding and task-based rewards to improve retention.',
    icon: Gavel,
    tags: [{ label: 'Product Strategy', color: 'purple' }, { label: 'MVP Scoping', color: 'gray' }, { label: 'UI/UX Design', color: 'pink' }, { label: 'Gamification', color: 'green' }],
    projectSlug: 'auction-product-design',
    coverImage: '/projects/auction-product-design/cover.jpeg',
    externalUrl: 'https://an6122003.github.io/Blueprint-Viewer/',
    externalLabel: 'View Product Blueprint',
    hasPdf: false,
    badge: 'Lead Designer & PO',
    customHoverClass: 'hover:border-[#f97316] hover:shadow-[8px_8px_0_0_#f97316]',
    focuses: ['product', 'engineering'],
  },
  {
    id: 5,
    title: 'RBAC Pizza Hut Business & Data Analytics Case Study',
    role: 'Data Analyst & Strategist · Team ONEZ',
    description: 'Turned raw customer data into a recovery roadmap for Pizza Hut. Using Python and Power BI, our team found that 98.82% of the VIP segment were lapsed rare buyers and designed a multi-channel strategy to win them back.',
    icon: BarChart,
    tags: [{ label: 'Data Analytics', color: 'purple' }, { label: 'Product Strategy', color: 'green' }, { label: 'Python & Power BI', color: 'gray' }, { label: 'Customer Segmentation', color: 'pink' }],
    projectSlug: 'rbac-system-design',
    coverImage: '/projects/rbac-system-design/cover.png',
    hasPdf: true,
    pdfLabel: 'View Analytics Report',
    badge: 'Winner',
    footerText: 'Sponsored by Home Credit and Ipsos',
    customHoverClass: 'hover:border-[#7c3aed] hover:shadow-[8px_8px_0_0_#7c3aed]',
    focuses: ['business'],
  },
  {
    id: 7,
    title: 'Knorr: Bursting the Forgotten Flavor',
    role: 'Brand Marketing Case · Unilever Future Leader League 2023',
    description: 'Repositioned Knorr as a conversation starter for family meals in a stagnant category. The integrated social, retail, and Zalo strategy was designed to drive three million product trials and 245 billion VND in incremental sales.',
    icon: ShoppingCart,
    tags: [{ label: 'Brand Strategy', color: 'green' }, { label: 'O2O (Online-to-Offline)', color: 'purple' }, { label: 'Consumer Insights', color: 'pink' }, { label: 'Zalo Marketing', color: 'gray' }],
    projectSlug: 'ufll2023',
    coverImage: '/projects/ufll2023/cover.png',
    hasPdf: true,
    pdfLabel: 'View Campaign Breakdown',
    badge: 'Top 30 Team (out of 2,500+ competitors)',
    customHoverClass: 'hover:border-[#00a651] hover:shadow-[8px_8px_0_0_#00a651]',
    focuses: ['business'],
  },
  {
    id: 6,
    title: 'Smart Furniture: Classification & Recommender System',
    role: 'Machine Learning Engineer · RMIT University',
    description: 'Built a machine-learning pipeline that classifies 90,000 furniture images across six categories and 17 styles. The final product combines a tuned ResNet50 model with a KNN recommendation experience for real-time image-based discovery.',
    icon: Bot,
    tags: [{ label: 'Computer Vision', color: 'purple' }, { label: 'Deep Learning', color: 'green' }, { label: 'Python & TensorFlow', color: 'pink' }, { label: 'KNN Recommender', color: 'gray' }],
    projectSlug: 'machine-learning',
    coverImage: '/projects/machine-learning/cover.png',
    hasPdf: true,
    pdfLabel: 'View Report',
    badge: 'RMIT Engineering Project',
    customHoverClass: 'hover:border-[#6366f1] hover:shadow-[8px_8px_0_0_#6366f1]',
    focuses: ['engineering'],
  },
];

// ─── ProjectPane ─────────────────────────────────────────────────

const ProjectPane = ({ project, isReversed }: { project: Project; isReversed: boolean }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const hasSlides = project.slides && project.slides.length > 0;

  return (
    <>
      <div id={project.projectSlug} className={`w-full bg-white border-2 border-brand-border rounded-xl p-6 md:p-10 transition-all ${project.customHoverClass || 'hover:border-black hover:shadow-[8px_8px_0_0_#000]'}`}>
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 lg:items-center`}>

          {/* Visual */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {project.coverImage ? (
              <div className="w-full rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0_0_#000]">
                <img src={`${import.meta.env.BASE_URL}${project.coverImage.replace(/^\//, '')}`} alt={project.title} className="w-full h-auto object-cover" />
              </div>
            ) : hasSlides ? (
              <div className="w-full bg-[#fdfaf5] border-4 border-black relative group flex flex-col items-center justify-center px-8 md:px-16 py-12 text-center rounded-xl shadow-[-6px_6px_0_0_#000] min-h-[280px] overflow-hidden">
                <div className="font-mono text-xs uppercase font-bold text-gray-600 absolute top-3 left-3 bg-white px-2 py-1 border-2 border-black rounded shadow-[2px_2px_0_0_#000] z-10">
                  {slideIdx + 1} / {project.slides!.length}
                </div>
                <div className="z-10 bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-transparent group-hover:border-black transition-all max-w-lg shadow-sm group-hover:shadow-[4px_4px_0_0_#000]">
                  <h4 className="font-bold text-xl md:text-2xl mb-4 text-black">{project.slides![slideIdx].title}</h4>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">{project.slides![slideIdx].content}</p>
                </div>
                <button type="button" onClick={() => setSlideIdx(i => (i > 0 ? i - 1 : project.slides!.length - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all z-20 focus:outline-none">
                  <ChevronLeft className="w-5 h-5" strokeWidth={3} />
                </button>
                <button type="button" onClick={() => setSlideIdx(i => (i < project.slides!.length - 1 ? i + 1 : 0))} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all z-20 focus:outline-none">
                  <ChevronRight className="w-5 h-5" strokeWidth={3} />
                </button>
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 z-20">
                  {project.slides!.map((_, i) => (
                    <button type="button" key={i} onClick={() => setSlideIdx(i)} className={`w-2.5 h-2.5 rounded-full border-2 border-black transition-all focus:outline-none ${i === slideIdx ? 'bg-black scale-150' : 'bg-white hover:bg-gray-300'}`} aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }} />
              </div>
            ) : (
              <div className="w-full bg-[#f4f4f4] rounded-xl h-64 flex flex-col items-center justify-center border-2 border-brand-border">
                <project.icon className="w-20 h-20 text-black opacity-60" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2.5 bg-brand-bg border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000]">
                <project.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <p className="text-sm font-bold text-brand-subtext uppercase tracking-wider">{project.role}</p>
              {project.badge && (
                <span className="bg-black text-[#fdfaf5] border-2 border-black shadow-[2px_2px_0_0_#EAEAEA] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  ★ {project.badge}
                </span>
              )}
              {project.isLive && (
                <span className="flex items-center gap-2 bg-[#ecfdf5] text-[#047857] border-2 border-[#10b981] shadow-[2px_2px_0_0_#10b981] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
                  </span>
                  Live Systems: Active
                </span>
              )}
            </div>
            <p className="text-brand-text text-base leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <Tag key={idx} color={tag.color}>{tag.label}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.hasPdf && (
                <button
                  type="button"
                  onClick={() => setIsPdfOpen(true)}
                  className="flex items-center gap-2 text-sm font-bold border-2 border-black px-5 py-2.5 rounded transition-all bg-white hover:bg-gray-100 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  {project.pdfLabel || 'View Documents'}
                </button>
              )}
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold border-2 border-black px-5 py-2.5 rounded transition-all bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0_0_#EAEAEA] hover:shadow-[2px_2px_0_0_#EAEAEA] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  {project.externalLabel || 'Visit'}
                </a>
              )}
            </div>

            {project.footerText && (
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 border-t-2 border-gray-100 pt-4">
                {project.footerText}
              </p>
            )}
          </div>
        </div>
      </div>

      {project.hasPdf && (
        <PdfViewerModal
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          projectSlug={project.projectSlug}
          title={project.title}
        />
      )}
    </>
  );
};

// ─── ProjectsSection ─────────────────────────────────────────────

export function ProjectsSection({
  activeFocus,
  onFocusChange,
}: {
  activeFocus: PortfolioFocus;
  onFocusChange: (focus: PortfolioFocus) => void;
}) {
  const filteredProjects = projects.filter(project => project.focuses.includes(activeFocus));
  const selectedFocus = portfolioFocusOptions.find(option => option.id === activeFocus)!;

  return (
    <section className="py-24 bg-brand-bg border-y-2 border-brand-border" id="projects">
      <Container>
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-3">Curated for faster review</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Work & Case Studies</h2>
              <p className="text-brand-subtext max-w-2xl text-lg">
                {selectedFocus.description} Showing {filteredProjects.length} relevant {filteredProjects.length === 1 ? 'case study' : 'case studies'}.
              </p>
            </div>
            <a href="#experience" className="font-bold text-sm underline underline-offset-4 decoration-2 hover:text-purple-700">
              Back to experience filter ↑
            </a>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filter case studies by function">
            {portfolioFocusOptions.map(option => {
              const isActive = option.id === activeFocus;
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => onFocusChange(option.id)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 border-2 border-black rounded-lg text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-[3px_3px_0_0_#c7b7ff]'
                      : 'bg-white text-black hover:bg-purple-50 hover:shadow-[3px_3px_0_0_#000]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {filteredProjects.map((project, idx) => (
            <ProjectPane key={project.id} project={project} isReversed={idx % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
