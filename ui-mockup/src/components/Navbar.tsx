import React from 'react';
import { PixelComputer } from './PixelIcons';
import { Button, Container } from './ui';

export function Navbar() {
  return (
    <div className="border-b-2 border-brand-border bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <PixelComputer className="w-8 h-8" />
            <span>newblocs.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-subtext">
            <a href="#projects" className="hover:text-black hover:underline underline-offset-4 decoration-2">Projects</a>
            <a href="#about" className="hover:text-black hover:underline underline-offset-4 decoration-2">About</a>
            <a href="#blogs" className="hover:text-black hover:underline underline-offset-4 decoration-2">Blogs</a>
          </div>

          <div>
            <button className="px-4 py-2 border-2 border-brand-border rounded hover:border-black font-semibold text-sm transition-colors">
              Book a call
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
