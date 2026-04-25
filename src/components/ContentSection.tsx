import React, { useEffect, useRef } from 'react';
import { Container } from './ui';
import { Play, Youtube, ExternalLink } from 'lucide-react';

/**
 * Real LinkedIn embed via iframe.
 */
const LinkedInEmbed = () => (
  <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-1">
    <iframe
      src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7280402427013382144"
      width="100%"
      height="400"
      frameBorder="0"
      allowFullScreen
      title="LinkedIn Post"
    />
  </div>
);

/**
 * Real Facebook embed via the Facebook Plugins iframe.
 */
const FacebookEmbed = () => {
  const encodedHref = encodeURIComponent('https://www.facebook.com/photo?fbid=3339865516197652&set=a.364455427072024');
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-1">
      <iframe
        src={`https://www.facebook.com/plugins/post.php?href=${encodedHref}&show_text=true&width=350`}
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Post"
      />
    </div>
  );
};

/**
 * Real TikTok embed via the TikTok embed script.
 */
const TikTokEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = `
      <blockquote
        class="tiktok-embed"
        cite="https://www.tiktok.com/@anndaynee/video/7624782196674399495"
        data-video-id="7624782196674399495"
        style="max-width:100%;min-width:280px;"
      >
        <section></section>
      </blockquote>
    `;

    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] overflow-hidden h-[400px] flex flex-col transition-transform hover:-translate-y-1 p-0">
      <div ref={containerRef} className="flex-1 overflow-auto flex items-start justify-center" />
    </div>
  );
};

/**
 * YouTube channel card — links to @anndaynee channel.
 */
const YouTubeEmbed = () => (
  <a
    href="https://www.youtube.com/@anndaynee"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] overflow-hidden h-[400px] flex flex-col transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] group no-underline"
  >
    <div className="bg-gradient-to-br from-red-600 to-red-700 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Play className="w-48 h-48 text-white" fill="currentColor" />
      </div>
      <div className="z-10 flex flex-col items-center gap-3">
        <div className="bg-white rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform">
          <Youtube className="w-8 h-8 text-red-600" />
        </div>
        <div className="text-white font-bold text-lg tracking-tight">@anndaynee</div>
      </div>
    </div>
    <div className="px-4 py-3 flex items-center justify-between border-t-2 border-black bg-[#fdfaf5]">
      <div>
        <div className="font-bold text-sm text-black">YouTube Channel</div>
        <div className="text-xs text-gray-500 font-medium">Tech deep dives & reviews</div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
    </div>
  </a>
);


export function ContentSection() {
  return (
    <section className="py-24 bg-white" id="social">
      <Container>
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Feed & Social</h2>
          <p className="text-brand-subtext max-w-2xl text-lg">Real posts from my active discussions across platforms.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <LinkedInEmbed />
          <FacebookEmbed />
          <TikTokEmbed />
          <YouTubeEmbed />
        </div>
      </Container>
    </section>
  );
}
