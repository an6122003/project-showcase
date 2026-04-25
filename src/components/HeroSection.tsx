import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PixelAvatar } from './PixelIcons';
import { Button, Container, Modal } from './ui';
import { Github, Linkedin, Mail, ArrowRight, Download, ExternalLink, FileText, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { fetchPdf } from '../utils/fetchPdf';

// Reuse the same worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

const cvUrl = '/projects/cv/CV_PM_1Page.pdf';

export function HeroSection() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(900);

  // Stable file object — created once, never recreated (prevents react-pdf loop)
  const fileObjRef = useRef<{ data: ArrayBuffer } | null>(null);
  const [cvReady, setCvReady] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [cvError, setCvError] = useState(false);

  // Blob URL for download/open actions
  const blobUrlRef = useRef<string>('');

  // Track rendered page height to prevent frame collapse during page switch
  const [cvPageHeight, setCvPageHeight] = useState(0);
  const cvPageWrapperRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Measure width: once on open + on window resize (no ResizeObserver — prevents loop)
  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      const w = Math.min(Math.floor(containerRef.current.clientWidth) - 32, 1100);
      setContainerWidth(w);
    }
  }, []);

  useEffect(() => {
    if (!isCvOpen) return;
    const timer = setTimeout(measureWidth, 100);
    window.addEventListener('resize', measureWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureWidth);
    };
  }, [isCvOpen, measureWidth]);

  // Fetch CV PDF when modal opens — once ever
  useEffect(() => {
    if (!isCvOpen || fileObjRef.current) {
      if (fileObjRef.current) setCvReady(true);
      return;
    }

    let cancelled = false;
    setCvLoading(true);
    setCvError(false);

    fetchPdf(cvUrl)
      .then(buf => {
        if (cancelled) return;
        // Create ONCE — same object reference forever
        fileObjRef.current = { data: buf };
        blobUrlRef.current = URL.createObjectURL(new Blob([buf], { type: 'application/pdf' }));
        setCvReady(true);
        setCvLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setCvError(true);
          setCvLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [isCvOpen]);

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.preventDefault();
    if (blobUrlRef.current) window.open(blobUrlRef.current, '_blank');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (blobUrlRef.current) {
      const a = document.createElement('a');
      a.href = blobUrlRef.current;
      a.download = 'CV_PM_1Page.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="py-24 bg-white" id="about">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="An Nguyen Quoc" className="w-full h-full object-cover rounded-[2rem] border-4 border-black shadow-[6px_6px_0_0_#000] rotate-3 hover:rotate-0 transition-transform duration-300" />
          </div>
          
          <div className="flex flex-col items-start max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Hey, I'm An!</h1>
            <p className="text-lg md:text-xl font-medium text-brand-text mb-4">
              Data-driven Software Engineer bridging technical complexity with seamless user experiences.
            </p>
            <p className="text-base text-brand-subtext mb-8 leading-relaxed">
              Currently transitioning into Product Management. I help businesses and teams translate complex requirements into scalable, intuitive products.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Button className="flex items-center gap-2" onClick={() => setIsCvOpen(true)}>
                View My CV / Resume
                <ArrowRight size={16} strokeWidth={3} />
              </Button>
              
              <div className="flex items-center gap-4 text-brand-subtext">
                <a href="https://www.linkedin.com/in/an-nguyen-quoc/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Linkedin size={24} /></a>
                <a href="https://github.com/an6122003" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Github size={24} /></a>
                <a href="mailto:an6122003@gmail.com" className="hover:text-black transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CV Modal */}
      <Modal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} title="Resume">
        <div ref={containerRef} className="flex flex-col gap-4">
          <div className="w-full border-4 border-black rounded-xl overflow-auto shadow-[4px_4px_0_0_#000] bg-white max-h-[70vh] min-h-[300px]">
            {cvLoading && (
              <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
                <Loader className="w-8 h-8 animate-spin text-black" />
                <span className="text-brand-subtext font-mono text-sm font-bold">Loading CV…</span>
              </div>
            )}
            {cvError && (
              <div className="flex flex-col items-center justify-center h-[40vh] gap-4 text-center p-8">
                <FileText className="w-12 h-12 text-gray-300" />
                <p className="text-brand-subtext font-medium">Could not load CV.</p>
              </div>
            )}
            {cvReady && fileObjRef.current && (
              <div ref={cvPageWrapperRef} style={{ minHeight: cvPageHeight > 0 ? cvPageHeight : undefined }}>
                <Document
                  file={fileObjRef.current}
                  onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                  onLoadError={() => setCvError(true)}
                  error={
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <p className="text-brand-subtext font-medium">Failed to render CV.</p>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={containerWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onRenderSuccess={() => {
                      if (cvPageWrapperRef.current) {
                        setCvPageHeight(cvPageWrapperRef.current.scrollHeight);
                      }
                    }}
                    loading={
                      <div className="flex items-center justify-center" style={{ minHeight: cvPageHeight > 0 ? cvPageHeight : 200 }}>
                        <Loader className="w-6 h-6 animate-spin text-gray-400" />
                      </div>
                    }
                  />
                </Document>
              </div>
            )}
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
              <span className="font-mono text-sm font-bold">Page {pageNumber} / {numPages}</span>
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

          {/* Blob-based actions — prevents IDM interception */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleOpenInNewTab}
              disabled={!cvReady}
              className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
            >
              <ExternalLink size={18} strokeWidth={3} />
              {cvReady ? 'Open in New Tab' : 'Preparing…'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!cvReady}
              className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-black text-white hover:bg-gray-800 transition-all shadow-[4px_4px_0_0_#EAEAEA] hover:shadow-[2px_2px_0_0_#EAEAEA] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
            >
              <Download size={18} strokeWidth={3} />
              {cvReady ? 'Download PDF' : 'Preparing…'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
