/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStackSection } from './components/TechStackSection';
import { AboutSection } from './components/AboutSection';
import { AwardsSection } from './components/AwardsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialSection } from './components/TestimonialSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContentSection } from './components/ContentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PresentationSlide } from './components/PresentationSlide';
import { PortfolioFocus } from './components/portfolioFocus';

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isSlideView, setIsSlideView] = useState(window.location.hash === '#slide');
  const [activeFocus, setActiveFocus] = useState<PortfolioFocus>('product');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleHashChange = () => {
      setIsSlideView(window.location.hash === '#slide');
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isSlideView) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        {/* Scale container to fit most screens but keep 16:9 ratio of the 1280x720 slide */}
        <div style={{ transform: 'scale(min(1, max(0.5, calc(min(100vw/1280, 100vh/720)))))', transformOrigin: 'center center' }}>
          <PresentationSlide />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-brand-bg text-brand-text relative">
      <Navbar />
      <HeroSection onShowProductWork={() => setActiveFocus('product')} />
      <TechStackSection />
      <AboutSection activeFocus={activeFocus} onFocusChange={setActiveFocus} />
      <ProjectsSection activeFocus={activeFocus} onFocusChange={setActiveFocus} />
      <AwardsSection />
      <TestimonialSection />
      <ArticlesSection />
      <ContentSection />
      <ContactSection />
      <Footer />

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-white text-brand-subtext border-2 border-brand-border rounded shadow-[4px_4px_0_0_#EAEAEA] hover:text-black hover:border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#EAEAEA] transition-all z-50 ${showTopBtn ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
}
