'use client';

import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if sticky header is currently hovering over the dark portion of Story section
      const storyEl = document.getElementById('story');
      if (storyEl) {
        const rect = storyEl.getBoundingClientRect();
        const totalScrollable = storyEl.offsetHeight - window.innerHeight;
        const progress = totalScrollable > 0 ? -rect.top / totalScrollable : 0;
        // Story section background crossfades to black from progress ~0.36 to the end
        if (progress >= 0.36 && rect.bottom > 60) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent pointer-events-none">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10 pointer-events-none">
        {/* Floating Brand Logo with smooth black/white transition */}
        <div className="relative h-6 sm:h-7 md:h-8 w-40 sm:w-48 flex items-center select-none pointer-events-auto cursor-pointer">
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain transition-opacity duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${
              isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        </div>

        {/* Floating Navigation Menu Button */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className={`pointer-events-auto group flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-black/5'
          }`}
        >
          <span className="relative block h-4 w-6">
            <span className="absolute left-0 right-0 top-0 h-[1.5px] bg-current transition-transform group-hover:-translate-y-0.5" />
            <span className="absolute left-0 right-0 top-[7px] h-[1.5px] bg-current transition-opacity" />
            <span className="absolute left-0 right-0 top-[14px] h-[1.5px] bg-current transition-transform group-hover:translate-y-0.5" />
          </span>
        </button>
      </div>
    </header>
  );
}
