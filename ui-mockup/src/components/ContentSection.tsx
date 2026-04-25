import React from 'react';
import { Container, Tag } from './ui';
import { Play, Youtube, Code, PenTool, Linkedin, Facebook, Heart, MessageCircle, Share2, Bookmark, Music, Users } from 'lucide-react';

const LinkedInEmbed = () => (
  <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-5 font-sans text-sm h-full flex flex-col transition-transform hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-blue-100 border-2 border-blue-600 rounded-md flex items-center justify-center shrink-0">
        <Linkedin className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <div className="font-bold leading-tight text-base">An .</div>
        <div className="text-xs text-gray-500 font-medium">Software Engineer & PM \u2022 1d</div>
      </div>
    </div>
    <p className="mb-4 text-sm leading-relaxed text-gray-800">
      Just published a deep dive on how we scaled our automated video production pipeline. By leveraging headless architectures, we slashed rendering times by 60%. Read more below! \ud83d\ude80 #engineering #videoproduction
    </p>
    <div className="w-full bg-blue-50 h-32 border-2 border-blue-200 rounded mb-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
      <Code className="text-blue-400 w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
      <span className="font-mono text-xs text-blue-600 font-bold">view_architecture.md</span>
    </div>
    <div className="mt-auto pt-3 border-t-2 border-gray-100 flex justify-between text-gray-500 font-semibold px-2">
      <button className="flex items-center gap-1.5 hover:text-black transition-colors"><Heart className="w-4 h-4" /> <span className="hidden sm:inline">Like</span></button>
      <button className="flex items-center gap-1.5 hover:text-black transition-colors"><MessageCircle className="w-4 h-4" /> <span className="hidden sm:inline">Comment</span></button>
      <button className="flex items-center gap-1.5 hover:text-black transition-colors"><Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share</span></button>
    </div>
  </div>
);

const FacebookEmbed = () => (
  <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-5 font-sans text-sm h-full flex flex-col transition-transform hover:-translate-y-1">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-blue-600 border-2 border-black rounded-full flex items-center justify-center shrink-0">
        <Users className="w-6 h-6 text-white" fill="currentColor" />
      </div>
      <div>
        <div className="font-bold leading-tight text-base">Tech Innovators Group</div>
        <div className="text-xs text-gray-500 font-medium font-bold text-blue-600">An shared a post \u2022 \ud83c\udf0e</div>
      </div>
    </div>
    <p className="mb-4 text-sm leading-relaxed text-gray-800">
      Are you over-saturating your photos? Here is the truth behind modern mobile computational photography. Join the discussion! \ud83d\udcf8 \u2728
    </p>
    <div className="w-full bg-gray-100 h-32 border-2 border-gray-200 rounded mb-4 flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-100 cursor-pointer group">
      <div className="bg-white p-3 rounded-full border-2 border-black shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform">
        <Play className="w-6 h-6 text-black pl-0.5" fill="currentColor" />
      </div>
    </div>
    <div className="mt-auto pt-3 border-t-2 border-gray-100 flex gap-6 text-gray-500 font-semibold px-2">
       <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"><Heart className="w-4 h-4" /> Like</button>
      <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"><MessageCircle className="w-4 h-4" /> Comment</button>
    </div>
  </div>
);

const TikTokEmbed = () => (
  <div className="bg-[#111] text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-0 font-sans text-sm h-full flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 min-h-[320px]">
    {/* Video mock background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black z-0" />
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay" />
    
    <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group">
       <Play className="w-16 h-16 text-white/50 group-hover:text-white/80 transition-colors group-hover:scale-110" fill="currentColor" />
    </div>
    
    <div className="z-20 w-full h-full flex flex-col justify-end p-4 pb-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
       <div className="flex justify-between items-end">
          <div className="max-w-[75%]">
             <div className="font-bold text-base mb-1 hover:underline cursor-pointer">@an_codes</div>
             <p className="text-sm mb-3 text-gray-200 line-clamp-2">How to build a zero-cost headless CMS using Notion \ud83d\udcbb #techtok #coding #product</p>
             <div className="flex items-center gap-2 text-xs bg-black/60 px-2 py-1.5 rounded-full inline-flex font-medium">
                <Music className="w-3 h-3" /> <span className="marquee">original sound - An</span>
             </div>
          </div>
          <div className="flex flex-col gap-5 items-center mb-2">
             <div className="flex flex-col items-center group cursor-pointer"><div className="bg-gray-800/80 p-2.5 rounded-full mb-1 group-hover:bg-gray-700 transition-colors"><Heart className="w-6 h-6 text-white" /></div><span className="text-[11px] font-bold">12K</span></div>
             <div className="flex flex-col items-center group cursor-pointer"><div className="bg-gray-800/80 p-2.5 rounded-full mb-1 group-hover:bg-gray-700 transition-colors"><MessageCircle className="w-6 h-6 text-white" /></div><span className="text-[11px] font-bold">342</span></div>
             <div className="flex flex-col items-center group cursor-pointer"><div className="bg-gray-800/80 p-2.5 rounded-full mb-1 group-hover:bg-gray-700 transition-colors"><Bookmark className="w-6 h-6 text-white" /></div><span className="text-[11px] font-bold">1.1K</span></div>
          </div>
       </div>
    </div>
    {/* Fake progress bar */}
    <div className="absolute bottom-0 left-0 h-1 bg-gray-600/50 w-full z-20">
       <div className="h-full bg-white w-[45%]" />
    </div>
  </div>
);


export function ContentSection() {
  return (
    <section className="py-24 bg-white" id="blogs">
      <Container>
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Content & Production</h2>
          <p className="text-brand-subtext font-medium text-lg">Breaking down complex technical concepts for broader audiences through structured, engaging video scripts and media production.</p>
        </div>

        <div className="flex flex-col gap-12 mb-16">
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-brand-bg rounded-xl border-2 border-brand-border p-6 md:p-12 hover:border-black transition-colors">
            <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-1">
              <div className="flex gap-2 mb-4">
                <Tag color="purple">Tech Content</Tag>
                <Tag color="gray">Automation</Tag>
              </div>
              <h3 className="text-2xl font-bold mb-4">Video Production & Mobile Imaging</h3>
              <p className="text-brand-subtext leading-relaxed p-0 mb-6">
                Exploring video production automation, kinetic typography, and deep-dive reviews on mobile imaging systems. I focus on authentic color science and real-world photography vs. over-saturated AI enhancements.
              </p>
              <button className="flex items-center gap-2 font-semibold text-sm hover:underline underline-offset-4">
                <Youtube className="w-5 h-5 text-red-600" />
                Watch Latest Deep Dive
              </button>
            </div>
            <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg flex items-center justify-center border-2 border-black shadow-[4px_4px_0_0_#000] relative overflow-hidden group cursor-pointer order-1 md:order-2">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
              <Play className="w-12 h-12 text-white drop-shadow-md z-20 group-hover:scale-110 transition-transform" fill="currentColor" />
              <div className="absolute font-mono text-xs text-brand-subtext bottom-4 left-4 z-20 bg-white/90 px-2 py-1 border border-black rounded">
                [ Thumbnail Placeholder ]
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-brand-bg rounded-xl border-2 border-brand-border p-6 md:p-12 hover:border-black transition-colors">
             <div className="w-full md:w-1/2 min-h-[250px] bg-[#fdfaf5] rounded-lg p-6 border-2 border-black shadow-[4px_4px_0_0_#000] relative font-mono text-sm overflow-hidden flex flex-col group">
                <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2 mb-4 font-bold text-gray-500 uppercase text-xs">
                  <PenTool className="w-4 h-4" />
                  Script Snippet
                </div>
                <div className="text-brand-text opacity-80 font-medium">
                  <p className="mb-3"><span className="text-pink-600 font-bold">SCENE_01:</span> A close-up of a raw camera sensor reflecting neon light.</p>
                  <p className="mb-3"><span className="text-blue-600 font-bold">VOICEOVER:</span> "We're obsessed with sharpness. We let algorithms decide what reality looks like. But what if we turn it all off?"</p>
                  <p><span className="text-green-600 font-bold">ACTION:</span> Pull back rapidly to reveal a massive server rack processing image data.</p>
                </div>
                <div className="mt-auto self-end bg-black text-white px-3 py-1.5 text-xs font-bold rounded cursor-pointer hover:bg-gray-800 transition-colors">
                  View Full Gallery -&gt;
                </div>
             </div>
            <div className="w-full md:w-1/2 flex flex-col items-start pl-0 md:pl-8">
              <div className="flex gap-2 mb-4">
                <Tag color="green">Content Strategy</Tag>
                <Tag color="pink">Scripting</Tag>
              </div>
              <h3 className="text-2xl font-bold mb-4">Translating Complexity</h3>
              <p className="text-brand-subtext leading-relaxed p-0 mb-6">
                Breaking down complex technical concepts for broader audiences through structured, engaging video scripts and media production. I believe in writing that drives narrative forward without sacrificing technical accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Social Feed Block */}
        <div className="border-t-2 border-brand-border pt-16">
          <div className="mb-10 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-3">Live Feed & Social Examples</h3>
            <p className="text-brand-subtext">Snippets from my active ongoing discussions across platforms.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <LinkedInEmbed />
            <FacebookEmbed />
            <TikTokEmbed />
          </div>
        </div>

      </Container>
    </section>
  );
}
