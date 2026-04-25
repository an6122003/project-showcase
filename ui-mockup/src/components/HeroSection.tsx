import React, { useState } from 'react';
import { PixelAvatar } from './PixelIcons';
import { Button, Container, Modal, Tag } from './ui';
import { Github, Linkedin, Mail, ArrowRight, Download, FileText } from 'lucide-react';

export function HeroSection() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section className="py-24 bg-white" id="about">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <PixelAvatar className="w-full h-full" />
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
                <a href="#" className="hover:text-black transition-colors"><Linkedin size={24} /></a>
                <a href="#" className="hover:text-black transition-colors"><Github size={24} /></a>
                <a href="#" className="hover:text-black transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Modal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} title="Resume">
        <div className="font-sans leading-relaxed max-w-3xl mx-auto flex flex-col gap-10">
          
          {/* Resume Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-black pb-8 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">An .</h1>
              <p className="text-gray-600 font-semibold text-lg">Data-driven Software Engineer & PM</p>
            </div>
            <button className="flex items-center gap-2 border-2 border-black px-6 py-3 hover:bg-black hover:text-white font-bold text-sm shadow-[4px_4px_0_0_#000] active:scale-95 active:shadow-none transition-all rounded w-full sm:w-auto justify-center">
              <Download size={18} strokeWidth={3} /> Download PDF
            </button>
          </div>
          
          {/* Experience Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold uppercase tracking-wider text-black border-l-4 border-black pl-4">Experience</h3>
            
            <div className="pl-4 ml-[2px] flex flex-col gap-8">
              
              <div className="relative border-l-2 border-dashed border-gray-300 pl-6 pb-2">
                <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1.5 border-2 border-white" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                  <h4 className="text-xl font-bold text-black">Product Manager / Engineer</h4>
                  <span className="font-mono text-sm font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded border-2 border-purple-200">2022 - Present</span>
                </div>
                <p className="text-brand-subtext font-bold mb-3 uppercase text-sm tracking-wider">RetroLab</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 font-medium">
                  <li>Directed the 0-to-1 lifecycle of an AI media platform for the Vietnamese market.</li>
                  <li>Reduced editorial production time by 90% via automated multi-LLM pipelines.</li>
                  <li>Integrated a zero-cost headless CMS using Notion and Next.js.</li>
                </ul>
              </div>
              
              <div className="relative border-l-2 border-dashed border-gray-300 pl-6 pb-2">
                <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1.5 border-2 border-white" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                  <h4 className="text-xl font-bold text-black">Core Product Owner</h4>
                  <span className="font-mono text-sm font-bold bg-green-100 text-green-800 px-3 py-1 rounded border-2 border-green-200">2020 - 2022</span>
                </div>
                <p className="text-brand-subtext font-bold mb-3 uppercase text-sm tracking-wider">E-Commerce Platform</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 font-medium">
                  <li>Acted as the core Product Owner to define the MVP for a live-bidding and earn-turns mechanic.</li>
                  <li>Negotiated feature scope against engineering constraints and mapped user journeys.</li>
                </ul>
              </div>

               <div className="relative border-l-2 border-dashed border-gray-300 pl-6">
                <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1.5 border-2 border-white" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                  <h4 className="text-xl font-bold text-black">Software Engineer</h4>
                  <span className="font-mono text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded border-2 border-blue-200">2018 - 2020</span>
                </div>
                <p className="text-brand-subtext font-bold mb-3 uppercase text-sm tracking-wider">ZaloPay</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 font-medium">
                  <li>Led the redesign of the core transaction flow, improving user conversion by 15%.</li>
                  <li>Migrated state handling to a specialized edge-caching layer for sub-100ms load times globally.</li>
                </ul>
              </div>

            </div>
          </div>
          
        </div>
      </Modal>
    </section>
  );
}
