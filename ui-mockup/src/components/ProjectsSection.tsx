import React, { useState } from 'react';
import { Container, Tag } from './ui';
import { PixelComputer, PixelHammer, PixelCheck, PixelGlobe } from './PixelIcons';
import { Presentation, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const CaseStudySlideshow = ({ slides, title, role, description, tags, linkText, icon: Icon }: any) => {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(c => (c > 0 ? c - 1 : slides.length - 1));
  }
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(c => (c < slides.length - 1 ? c + 1 : 0));
  }

  return (
    <div className="w-full bg-white border-2 border-brand-border rounded-xl p-8 md:p-12 transition-all hover:border-black hover:shadow-[8px_8px_0_0_#000]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-bg border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000]">
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
          </div>
          <p className="text-sm font-bold text-brand-subtext mb-4 uppercase tracking-wider">{role}</p>
          <p className="text-brand-text text-lg leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-6 shrink-0">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: any, idx: number) => (
              <Tag key={idx} color={tag.color as any}>{tag.label}</Tag>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm font-bold border-2 border-black px-6 py-3 rounded transition-all bg-white hover:bg-gray-100 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95">
            <FileText className="w-5 h-5" />
            {linkText}
          </button>
        </div>
      </div>

      {/* The Slideshow Pane */}
      <div className="w-full bg-[#fdfaf5] border-4 border-black relative group flex flex-col items-center justify-center px-12 md:px-24 py-16 text-center rounded-xl shadow-[-8px_8px_0_0_#000] min-h-[400px] overflow-hidden">
        <div className="font-mono text-sm uppercase font-bold text-gray-600 absolute top-4 left-4 bg-white px-3 py-1.5 border-2 border-black rounded shadow-[2px_2px_0_0_#000] z-10 block">
          Slide {current + 1} / {slides.length}
        </div>

        <div className="z-10 bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-xl border-2 border-transparent group-hover:border-black transition-all max-w-4xl shadow-sm group-hover:shadow-[4px_4px_0_0_#000]">
          <h4 className="font-bold text-2xl md:text-4xl mb-6 text-black">{slides[current].title}</h4>
          <p className="text-lg md:text-2xl text-gray-800 leading-relaxed font-medium">{slides[current].content}</p>
        </div>

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white border-4 border-black rounded-full shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-[calc(-50%+4px)] active:translate-x-[4px] hover:bg-black hover:text-white transition-all z-20 focus:outline-none">
          <ChevronLeft className="w-8 h-8" strokeWidth={3} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white border-4 border-black rounded-full shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-[calc(-50%+4px)] active:translate-x-[-4px] hover:bg-black hover:text-white transition-all z-20 focus:outline-none">
          <ChevronRight className="w-8 h-8" strokeWidth={3} />
        </button>

        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 z-20">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)} 
              className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all focus:outline-none ${i === current ? 'bg-black scale-150' : 'bg-white hover:bg-gray-300'}`} 
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Decorative background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 20px)' }} />
      </div>
    </div>
  );
};

const projects = [
  {
    id: 3,
    title: "ZaloPay Case Study",
    role: "Problem Solver",
    description: "Led the redesign of the core transaction flow, improving user conversion by 15%. Collaborated with cross-functional teams to streamline the checkout process and implemented real-time fraud detection.",
    icon: PixelGlobe,
    tags: [{ label: "FinTech", color: "pink" }, { label: "UX Research", color: "purple" }],
    linkText: "View Case Study",
    embedType: "Workflow Diagram",
    isSlideshow: true,
    slides: [
      { title: "1. The Problem", content: "Conversion drop-offs during the final checkout stage reached 22% due to complex verification steps." },
      { title: "2. Our Approach", content: "Simplified 5 authentication steps into 3, introducing context-aware one-tap biometric authentications." },
      { title: "3. The Architecture", content: "Migrated state handling to a specialized edge-caching layer for sub-100ms load times globally." },
      { title: "4. The Impact", content: "Achieved a 15% lift in successful transactions and significantly reduced fraud detection latency." }
    ]
  },
  {
    id: 1,
    title: "RetroLab \u2013 AI Tech News",
    role: "Product Manager / Engineer",
    description: "Directed the 0-to-1 lifecycle of an AI media platform for the Vietnamese market. Reduced editorial production time by 90% via automated pipelines.",
    icon: PixelComputer,
    tags: [{ label: "Web Dev", color: "pink" }, { label: "AI", color: "purple" }],
    linkText: "Visit retrolab",
    embedType: "CMS Architecture"
  },
  {
    id: 2,
    title: "E-Commerce Live Auction",
    role: "Core Product Owner",
    description: "Acted as the Product Owner to define the MVP for a live-bidding and earn-turns mechanic. Negotiated feature scope against constraints.",
    icon: PixelHammer,
    tags: [{ label: "Strategy", color: "green" }, { label: "E-com", color: "gray" }],
    linkText: "View PRD",
    embedType: "Slide Deck / Mockups"
  },
  {
    id: 4,
    title: "RBAC System Design",
    role: "System Designer",
    description: "Defined the permission logic, scoped user roles, and managed the technical implementation of access controls for enterprise back-office applications.",
    icon: PixelCheck,
    tags: [{ label: "System Design", color: "green" }, { label: "Security", color: "gray" }],
    linkText: "Documentation",
    embedType: "Security Matrix"
  }
];

export function ProjectsSection() {
  const featuredCaseStudy = projects.find(p => p.isSlideshow);
  const standardProjects = projects.filter(p => !p.isSlideshow);

  return (
    <section className="py-24 bg-brand-bg border-y-2 border-brand-border" id="projects">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Work & Case Studies</h2>
          <p className="text-brand-subtext max-w-2xl text-lg">A deep dive into my work bridging technical complexity with seamless user experiences.</p>
        </div>

        {/* Featured Case Study Pane */}
        {featuredCaseStudy && featuredCaseStudy.slides && (
          <div className="mb-16">
            <CaseStudySlideshow 
              slides={featuredCaseStudy.slides} 
              title={featuredCaseStudy.title}
              role={featuredCaseStudy.role}
              description={featuredCaseStudy.description}
              tags={featuredCaseStudy.tags}
              linkText={featuredCaseStudy.linkText}
              icon={featuredCaseStudy.icon}
            />
          </div>
        )}

        <div className="mb-6 mt-20">
          <h3 className="text-2xl font-bold mb-2">Other Projects</h3>
        </div>

        {/* Standard Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standardProjects.map(project => (
            <div key={project.id} className="bg-white border-2 border-brand-border rounded-xl p-8 flex flex-col items-start transition-all hover:border-black hover:shadow-[8px_8px_0_0_#000]">
              
              <div className="w-full bg-[#f4f4f4] rounded-lg h-48 mb-6 flex flex-col items-center justify-center border-2 border-transparent relative overflow-hidden group">
                <project.icon className="w-16 h-16 text-black opacity-80 z-10" />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pt-24 font-mono text-xs text-brand-subtext z-20">
                    <Presentation className="w-4 h-4 mb-2" />
                    [ {project.embedType} ]
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm font-semibold text-brand-subtext mb-4 uppercase tracking-wider">{project.role}</p>
              <p className="text-sm text-brand-text mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, idx) => (
                  <Tag key={idx} color={tag.color as any}>{tag.label}</Tag>
                ))}
              </div>
              
              <button className="flex items-center gap-2 text-sm font-bold border-2 border-transparent hover:border-black px-4 py-2 rounded transition-all mt-auto self-start bg-gray-100 hover:bg-white active:scale-95">
                <FileText className="w-4 h-4" />
                {project.linkText}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
