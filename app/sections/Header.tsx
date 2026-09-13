'use client';

import React, { useEffect, useState } from 'react';
import FullScreenMenu from '../components/FullScreenMenu';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
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

        // Story section background crossfades to black from progress ~0.40 until footer emergence (~0.76)
        if (progress >= 0.40 && progress < 0.76 && rect.bottom > 60) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }

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
          {/* Floating Brand Logo with smooth black/white transition */}
          <div className="absolute top-[1vw] left-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pl-[clamp(1rem,2vw,2.25rem)] flex items-center">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative flex items-center select-none pointer-events-auto cursor-pointer h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(10.5rem,14vw,13.5rem)]"
            >
              <img
                src="/logo/logo-black.svg"
                alt="SINGULARITY"
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain transition-opacity duration-300 ${
                  isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
              <img
                src="/logo/logo-white.svg"
                alt="SINGULARITY"
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain transition-opacity duration-300 drop-shadow-[0_0.15rem_0.65rem_rgba(0,0,0,0.8)] ${
                  isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </div>

          {/* Floating Explore Action Button (Exact match to Hero Explore Button) */}
          <div className="absolute top-[1vw] right-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pr-[clamp(1rem,2vw,2.25rem)] flex items-center">
            <button
              type="button"
              onClick={handleMenuClick}
              aria-label="Explore Menu"
              className="pointer-events-auto group flex h-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-between gap-[clamp(0.5rem,0.8vw,0.875rem)] rounded-full border-2 border-white bg-white pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span className="font-serif italic text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.03em] text-[#111111] group-hover:text-black transition-colors select-none">
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
