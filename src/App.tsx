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

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen font-sans bg-brand-bg text-brand-text relative">
      <Navbar />
      <HeroSection />
      <TechStackSection />
      <AboutSection />
      <AwardsSection />
      <ProjectsSection />
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

