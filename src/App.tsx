/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContentSection } from './components/ContentSection';
import { Footer } from './components/Footer';
import { AboutSection } from './components/AboutSection';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-brand-bg text-brand-text">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContentSection />
      <Footer />
    </div>
  );
}

