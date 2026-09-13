'use client';

import React, { useEffect } from 'react';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  // Lock body scroll when menu is open & listen for ESC key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleNavigate = (targetId: string) => {
    onClose();
    // Allow fade-out animation to begin, then smooth scroll to target
    setTimeout(() => {
      const element =
        document.getElementById(targetId) ||
        document.getElementById(targetId.replace('-section', '')) ||
        document.getElementById(`${targetId}-section`);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 220);
  };

  const navLinks = [
    { number: '01', label: 'About', targetId: 'about-section' },
    { number: '02', label: 'Timeline', targetId: 'timeline-section' },
    { number: '03', label: 'Themes', targetId: 'theme-section' },
    { number: '04', label: 'Past Editions', targetId: 'past-editions' },
    { number: '05', label: 'Sponsors', targetId: 'sponsors-section' },
    { number: '06', label: 'FAQ', targetId: 'faq-section' },
    { number: '07', label: 'Story & Finale', targetId: 'story-section' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-[100] h-[100dvh] w-full bg-white text-[#111111] transition-all duration-300 ease-out flex flex-col justify-between overflow-y-auto ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible scale-100'
          : 'opacity-0 pointer-events-none invisible scale-[0.99]'
      }`}
    >
      {/* ===================================================================== */}
      {/* TOP BAR: Brand Logo + Close Button Aligned with Hero Explore Button   */}
      {/* ===================================================================== */}
      <div className="relative w-full h-[clamp(3.8rem,5vw,5.125rem)] pt-[1vw] px-[1vw] shrink-0 select-none">
        {/* Top-Left Logo (Identical coordinates & size to Hero Section Logo) */}
        <div className="absolute top-[1vw] left-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pl-[clamp(1rem,2vw,2.25rem)] flex items-center">
          <div
            onClick={() => handleNavigate('hero')}
            className="relative flex items-center select-none cursor-pointer h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(10.5rem,14vw,13.5rem)]"
          >
            <img
              src="/logo/logo-black.svg"
              alt="SINGULARITY"
              className="h-full w-auto object-contain transition-opacity hover:opacity-85"
            />
          </div>
        </div>

        {/* Top-Right Close Button (EXACT MATCH to Hero Section Explore Button) */}
        <div className="absolute top-[1vw] right-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pr-[clamp(1rem,2vw,2.25rem)] flex items-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Menu"
            className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-between gap-[clamp(0.5rem,0.8vw,0.875rem)] rounded-full border-2 border-white bg-white pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <span className="font-serif italic text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.03em] text-[#111111] group-hover:text-black transition-colors select-none">
              Close
            </span>

            <div className="flex h-[clamp(1.75rem,2vw,2.125rem)] w-[clamp(1.75rem,2vw,2.125rem)] items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:rotate-90">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[clamp(0.75rem,1vw,0.95rem)] h-[clamp(0.75rem,1vw,0.95rem)]"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAIN BODY: Pure Editorial Navigation Links (Left-Aligned Across All Screen Sizes) */}
      {/* ===================================================================== */}
      <main className="my-auto w-full max-w-[clamp(28rem,55vw,50rem)] px-[clamp(1.5rem,5vw,6rem)] py-[clamp(2rem,5vh,4rem)] flex-1 flex flex-col justify-center items-start text-left">
        <nav className="flex flex-col w-full space-y-1 sm:space-y-2" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.targetId)}
              className="group flex w-full items-baseline justify-between border-b border-[#111111]/8 py-[clamp(0.65rem,1.8vh,1.35rem)] text-left transition-all duration-200 hover:pl-3 cursor-pointer"
            >
              <div className="flex items-baseline gap-[clamp(0.85rem,2vw,2.5rem)]">
                <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] text-[#111111]/35 font-medium transition-colors group-hover:text-[#111111]">
                  {item.number}
                </span>
                <span className="font-serif italic text-[clamp(2rem,4.5vw,3.6rem)] font-medium tracking-[-0.03em] text-[#111111] transition-transform duration-300 group-hover:translate-x-2">
                  {item.label}
                </span>
              </div>
              <span className="font-serif italic text-[clamp(1.2rem,2.2vw,2rem)] text-[#111111]/0 transition-all duration-300 -translate-x-3 group-hover:translate-x-0 group-hover:text-[#111111]">
                →
              </span>
            </button>
          ))}
        </nav>
      </main>

      {/* ===================================================================== */}
      {/* BOTTOM BAR: Minimal Footer Metadata                                   */}
      {/* ===================================================================== */}
      <footer className="w-full bg-white py-4 shrink-0">
        <div className="mx-auto flex w-full items-center justify-between px-[clamp(1rem,2vw,2.25rem)] text-xs text-[#111111]/40 font-mono">
          <span>SINGULARITY 2.0 • 2026</span>
          <span>© ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}
