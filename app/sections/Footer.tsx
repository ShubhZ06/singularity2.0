'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const FooterMap = dynamic(() => import('@/components/FooterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#F5F5F7] animate-pulse flex items-center justify-center">
      <span className="text-xs uppercase tracking-widest text-[#111111]/40 font-mono">
        Loading Map...
      </span>
    </div>
  ),
});

const exploreLinks = [
  'Registration',
  'Guide',
  'visit last year',
  'Security',
  'Contact',
];

const connectLinks = ['Discord', 'Instagram', 'Twitter', 'LinkedIn', 'WhatsApp'];

interface FooterProps {
  showWordmark?: boolean;
}

export default function Footer({ showWordmark = true }: FooterProps) {
  return (
    <footer
      id="footer"
      className={`w-full bg-white ${showWordmark ? 'border-t border-[#111111]/10 pt-8 sm:pt-10 md:pt-12' : 'pt-4 sm:pt-6'} min-h-screen flex flex-col justify-between pb-[72px] px-6 sm:px-12 xl:px-[122px]`}
    >
      <div className="mx-auto w-full max-w-[1292px] flex flex-col justify-between flex-1 h-full min-h-[643px]">
        {/* Top Centered Giant Black Wordmark */}
        {showWordmark && (
          <div className="relative w-full flex items-center justify-center pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6">
            <div className="relative w-full flex justify-center items-center">
              <img
                src="/logo/logo-black.svg"
                alt="SINGULARITY"
                className="w-full max-h-[160px] sm:max-h-[190px] md:max-h-[220px] object-contain select-none"
              />
              {/* Sparkle star ornament matching reference position */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-2 sm:-top-3 right-[18%] sm:right-[21%] md:right-[23%] w-7 h-7 sm:w-10 sm:h-10 text-[#111111] pointer-events-none animate-star-twinkle opacity-90"
                aria-hidden="true"
              >
                <path d="M12 0 C12 7.5 16.5 12 24 12 C16.5 12 12 16.5 12 24 C12 16.5 7.5 12 0 12 C7.5 12 12 7.5 12 0 Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Crisp Horizontal Divider matching 1292px width in reference */}
        <div className="w-full border-t border-[#111111]/10" />

        {/* 3-Column Navigation & Graphic Art Grid */}
        <div className="grid items-start pt-6 sm:pt-8 md:grid-cols-[1fr_1.3fr_1fr] gap-6">
          {/* Left: Explore Links */}
          <section>
            <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
              EXPLORE
            </p>
            <ul className="space-y-1 sm:space-y-1.5 text-[1.4rem] leading-[1.2] sm:text-[1.65rem] md:text-[1.85rem]">
              {exploreLinks.map((link) => (
                <li
                  key={link}
                  className="font-serif italic tracking-[-0.05em] text-[#111111] hover:text-[#7B35F8] transition-colors cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </section>

          {/* Center: Interactive Map */}
          <FooterMap />

          {/* Right: Connect Links */}
          <section className="justify-self-end text-right">
            <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
              CONNECT
            </p>
            <ul className="space-y-1 sm:space-y-1.5 text-[1.4rem] leading-[1.2] sm:text-[1.65rem] md:text-[1.85rem]">
              {connectLinks.map((link) => (
                <li
                  key={link}
                  className="font-serif italic tracking-[-0.05em] text-[#111111] hover:text-[#7B35F8] transition-colors cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-[#111111]/55">
          <span>WHERE INNOVATION MEETS SHAKTI</span>
          <div>
            <span>&copy; 2025 Singularity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
