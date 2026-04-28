import React, { useState, useEffect } from 'react';
import { PixelComputer, TikTokIcon } from './PixelIcons';
import { Container } from './ui';
import { Linkedin, Github, Youtube, Facebook } from 'lucide-react';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 border-b-2 border-brand-border bg-white transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <PixelComputer className="w-8 h-8" />
              <span>an.portfolio</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-subtext">
              <a href="#about" className="hover:text-black hover:underline underline-offset-4 decoration-2">About</a>
              <a href="#experience" className="hover:text-black hover:underline underline-offset-4 decoration-2">Experience</a>
              <a href="#projects" className="hover:text-black hover:underline underline-offset-4 decoration-2">Projects</a>
              <a href="#principles" className="hover:text-black hover:underline underline-offset-4 decoration-2">Principles</a>
              <a href="#social" className="hover:text-black hover:underline underline-offset-4 decoration-2">Social</a>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
              <a href="https://www.linkedin.com/in/an-nguyen-quoc/" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/an6122003" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
                <Github size={18} />
              </a>
              <a href="https://www.youtube.com/@anndaynee" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
                <Youtube size={18} />
              </a>
              <a href="https://www.facebook.com/anmamxanhbaby/" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
                <Facebook size={18} />
              </a>
              <a href="https://www.tiktok.com/@anndaynee" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-brand-border rounded hover:border-black transition-colors text-brand-subtext hover:text-black">
                <TikTokIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </Container>
      </div>
      {/* Spacer to prevent layout shift */}
      <div className="h-[74px] w-full bg-transparent pointer-events-none"></div>
    </>
  );
}
