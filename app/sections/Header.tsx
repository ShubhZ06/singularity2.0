'use client';

import React, { useEffect, useState } from 'react';
import FullScreenMenu from '../components/FullScreenMenu';

interface HeaderProps {
  onMenuClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating header once user scrolls past the top hero bar
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if page has scrolled near the absolute bottom of the document
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;

      // Check if floating header is currently hovering over the dark portion of Story section or Footer
      const storyEl = document.getElementById('story');
      if (storyEl) {
        const rect = storyEl.getBoundingClientRect();
        const totalScrollable = storyEl.offsetHeight - window.innerHeight;
        const progress = totalScrollable > 0 ? -rect.top / totalScrollable : 0;

        // Hide floating header once the Footer emerges in the story finale (p >= 0.76) or at page bottom
        if (progress >= 0.76 || isAtPageBottom) {
          setIsFooter(true);
        } else {
          setIsFooter(false);
        }
      } else {
        if (isAtPageBottom) {
          setIsFooter(true);
        } else {
          setIsFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = onMenuClick || (() => setInternalMenuOpen(true));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full bg-transparent pointer-events-none transition-all duration-300 ${
          isScrolled && !isFooter ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="relative w-full h-[clamp(3.8rem,5vw,5.125rem)] pt-[1vw] px-[1vw] pointer-events-none select-none">
          {/* Floating Action Buttons & Social Links */}
          <div className="absolute top-[clamp(0.65rem,1.5vw,1.25rem)] right-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pr-[clamp(1rem,2vw,2.25rem)] flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
            {/* Social Icons (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/singularityhack.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[clamp(0.85rem,1.1vw,1.1rem)] h-[clamp(0.85rem,1.1vw,1.1rem)]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/singularity-hack/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[clamp(0.85rem,1.1vw,1.1rem)] h-[clamp(0.85rem,1.1vw,1.1rem)]"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.32a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              onClick={handleMenuClick}
              aria-label="Explore Menu"
              className="pointer-events-auto group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(6.75rem,8.8vw,8.75rem)] items-center justify-between rounded-full border-2 border-white bg-white pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              <span className="font-seasonmix text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.03em] text-[#111111] group-hover:text-black transition-colors select-none">
                Explore
              </span>

              <div className="flex h-[clamp(1.75rem,2vw,2.125rem)] w-[clamp(1.75rem,2vw,2.125rem)] items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:rotate-45">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[clamp(0.75rem,1vw,0.95rem)] h-[clamp(0.75rem,1vw,0.95rem)]"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {!onMenuClick && (
        <FullScreenMenu
          isOpen={internalMenuOpen}
          onClose={() => setInternalMenuOpen(false)}
        />
      )}
    </>
  );
}
