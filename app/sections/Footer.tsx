'use client';

import React from 'react';

const exploreLinks = [
  'Registration',
  'Guide',
  'visit last year',
  'Security',
  'Contact',
];

const connectLinks = ['Discord', 'Instagram', 'Twitter', 'LinkedIn', 'WhatsApp'];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-white border-t border-[#111111]/10 min-h-screen flex flex-col justify-between pt-8 sm:pt-10 md:pt-12 pb-[72px] px-6 sm:px-12 xl:px-[122px]"
    >
      <div className="mx-auto w-full max-w-[1292px] flex flex-col justify-between flex-1 h-full min-h-[643px]">
        {/* Top Centered Giant Black Wordmark */}
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

          {/* Center: Ethereal Dual Butterfly Graphic Art */}
          <div className="relative flex items-center justify-center py-4 select-none pointer-events-none">
            {/* Soft Luminous Nebula Cloud */}
            <div className="blob-art relative flex items-center justify-center !w-[280px] !h-[170px]" aria-hidden="true">
              <span className="blob blob-one !w-[55%] !h-[45%]" />
              <span className="blob blob-two !w-[58%] !h-[48%]" />
              <span className="blob blob-three !w-[50%] !h-[40%]" />
            </div>

            {/* Cyan/Blue Upper Butterfly */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="absolute top-[16%] left-[26%] w-8 h-8 sm:w-10 sm:h-10 text-[#56A8FF] opacity-85 -rotate-12 drop-shadow-[0_4px_12px_rgba(86,168,255,0.4)]"
              aria-hidden="true"
            >
              <path d="M15 15 C11 7 4 4 3 9 C2 14 9 17 14 16 Z" fill="currentColor" opacity="0.85" />
              <path d="M17 15 C21 7 28 4 29 9 C30 14 23 17 18 16 Z" fill="currentColor" opacity="0.85" />
              <path d="M14.5 16.5 C10 19 6 25 9 27 C12 29 14 22 15.5 18 Z" fill="currentColor" opacity="0.75" />
              <path d="M17.5 16.5 C22 19 26 25 23 27 C20 29 18 22 16.5 18 Z" fill="currentColor" opacity="0.75" />
            </svg>

            {/* Magenta/Purple Lower Butterfly */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="absolute bottom-[18%] right-[24%] w-9 h-9 sm:w-11 sm:h-11 text-[#D479FF] opacity-90 rotate-15 drop-shadow-[0_4px_14px_rgba(212,121,255,0.45)]"
              aria-hidden="true"
            >
              <path d="M15 15 C11 7 4 4 3 9 C2 14 9 17 14 16 Z" fill="currentColor" opacity="0.9" />
              <path d="M17 15 C21 7 28 4 29 9 C30 14 23 17 18 16 Z" fill="currentColor" opacity="0.9" />
              <path d="M14.5 16.5 C10 19 6 25 9 27 C12 29 14 22 15.5 18 Z" fill="currentColor" opacity="0.8" />
              <path d="M17.5 16.5 C22 19 26 25 23 27 C20 29 18 22 16.5 18 Z" fill="currentColor" opacity="0.8" />
            </svg>
          </div>

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
          <div className="flex items-center gap-4">
            <span>&copy; 2026 FIEM ACM Student Chapter</span>
            <div className="flex items-end gap-[2px] h-3 text-[#111111]/60" aria-hidden="true">
              <span className="w-[1.5px] h-[50%] bg-current rounded-sm" />
              <span className="w-[1.5px] h-[85%] bg-current rounded-sm" />
              <span className="w-[1.5px] h-[40%] bg-current rounded-sm" />
              <span className="w-[1.5px] h-[100%] bg-current rounded-sm" />
              <span className="w-[1.5px] h-[70%] bg-current rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
