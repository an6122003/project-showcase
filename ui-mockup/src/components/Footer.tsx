import React from 'react';
import { Container } from './ui';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PixelComputer } from './PixelIcons';

export function Footer() {
  return (
    <footer className="py-16 bg-white border-t-2 border-brand-border mt-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-2">
              <PixelComputer className="w-6 h-6" />
              <span>newblocs.</span>
            </div>
            <p className="text-brand-subtext font-medium">Let's connect and build something great.</p>
          </div>
          
          <div className="flex items-center gap-6 text-brand-text">
            <a href="#" className="flex items-center gap-2 hover:underline underline-offset-4 font-semibold text-sm">
              <Mail className="w-5 h-5" /> Email
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline underline-offset-4 font-semibold text-sm">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline underline-offset-4 font-semibold text-sm">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
        <div className="text-center md:text-left mt-8 md:mt-4 text-xs font-mono text-gray-400">
          \u00A9 {new Date().getFullYear()} An. Built with precision.
        </div>
      </Container>
    </footer>
  );
}
