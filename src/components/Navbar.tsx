import React from 'react';
import { PixelComputer } from './PixelIcons';
import { Container } from './ui';
import { Linkedin, Github } from 'lucide-react';

export function Navbar() {
  return (
    <div className="border-b-2 border-brand-border bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <PixelComputer className="w-8 h-8" />
            <span>an.portfolio</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-subtext">
            <a href="#about" className="hover:text-black hover:underline underline-offset-4 decoration-2">About</a>
            <a href="#projects" className="hover:text-black hover:underline underline-offset-4 decoration-2">Projects</a>
            <a href="#social" className="hover:text-black hover:underline underline-offset-4 decoration-2">Social</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/an-nguyen-quoc/" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/an6122003" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
              <Github size={18} />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
