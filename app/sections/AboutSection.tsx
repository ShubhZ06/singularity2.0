'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden bg-white">
      {/* Background Ambience & Watermarks */}
      {/* Left soft watercolor mist */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#93c5fd]/20 via-[#c4b5fd]/15 to-transparent blur-3xl opacity-60"
      />

      {/* Right traditional mandala/alpona watermark */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] md:w-[480px] opacity-[0.12] select-none"
      >
        <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" className="w-full h-full text-black stroke-[1.2]">
          <circle cx="200" cy="200" r="180" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="140" />
          <circle cx="200" cy="200" r="100" />
          <circle cx="200" cy="200" r="60" />
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 200 200)`}>
              <path d="M200 60 C185 100 185 140 200 160 C215 140 215 100 200 60 Z" fill="currentColor" fillOpacity="0.08" />
              <circle cx="200" cy="45" r="5" fill="currentColor" />
              <path d="M200 20 L200 40" />
              <path d="M190 25 C195 20 205 20 210 25" />
            </g>
          ))}
          {[...Array(24)].map((_, i) => (
            <circle key={`dot-${i}`} cx={200 + 120 * Math.cos((i * Math.PI) / 12)} cy={200 + 120 * Math.sin((i * Math.PI) / 12)} r="2.5" fill="currentColor" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10 md:px-14 flex flex-col items-center text-center">
        {/* Top Decorative Traditional Flourish / Ornament */}
        <div className="mb-4 sm:mb-6 flex justify-center items-center opacity-85 hover:opacity-100 transition-opacity">
          <svg
            width="120"
            height="38"
            viewBox="0 0 160 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 sm:w-28 md:w-32 h-auto text-[#111111]"
            aria-hidden="true"
          >
            <path
              d="M80 6 C70 18 55 24 35 24 C20 24 10 18 10 12 C10 6 16 2 22 4 C28 6 30 14 24 18 C18 22 12 18 14 12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M80 6 C90 18 105 24 125 24 C140 24 150 18 150 12 C150 6 144 2 138 4 C132 6 130 14 136 18 C142 22 148 18 146 12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M80 2 C77 9 74 14 71 18 C75 19 85 19 89 18 C86 14 83 9 80 2 Z"
              fill="currentColor"
            />
            <circle cx="80" cy="27" r="3" fill="currentColor" />
            <path
              d="M62 28 C70 33 90 33 98 28"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="60" cy="28" r="2" fill="currentColor" />
            <circle cx="100" cy="28" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Title: Singularity */}
        <h2 className="font-seasonmix text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] tracking-[-0.01em] text-[#111111] mb-6 sm:mb-8">
          Singularity
        </h2>

        {/* Paragraph Container with Floating Butterfly Accent */}
        <div className="relative mx-auto max-w-3xl sm:max-w-4xl px-2 sm:px-6">
          <span 
            aria-hidden="true" 
            className="inline-block align-top -ml-2 mr-2.5 sm:-ml-4 sm:mr-3 -translate-y-1 transition-transform duration-300 hover:scale-125 hover:rotate-6 cursor-default select-none"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 inline-block drop-shadow-[0_2px_6px_rgba(244,114,182,0.35)]"
            >
              <path
                d="M15 15 C11 7 4 4 3 9 C2 14 9 17 14 16 Z"
                fill="url(#butterflyPinkGrad1)"
                stroke="#f472b6"
                strokeWidth="0.8"
              />
              <path
                d="M17 15 C21 7 28 4 29 9 C30 14 23 17 18 16 Z"
                fill="url(#butterflyPinkGrad2)"
                stroke="#f472b6"
                strokeWidth="0.8"
              />
              <path
                d="M14.5 16.5 C10 19 6 25 9 27 C12 29 14 22 15.5 18 Z"
                fill="url(#butterflyPinkGrad1)"
                stroke="#f472b6"
                strokeWidth="0.7"
                opacity="0.9"
              />
              <path
                d="M17.5 16.5 C22 19 26 25 23 27 C20 29 18 22 16.5 18 Z"
                fill="url(#butterflyPinkGrad2)"
                stroke="#f472b6"
                strokeWidth="0.7"
                opacity="0.9"
              />
              <path
                d="M16 11 C15.4 14 15.4 19 16 22"
                stroke="#be185d"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M15.5 11 C14.5 8.5 13 8 12 8.5"
                stroke="#be185d"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11 C17.5 8.5 19 8 20 8.5"
                stroke="#be185d"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="butterflyPinkGrad1" x1="3" y1="4" x2="15" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbcfe8" />
                  <stop offset="0.6" stopColor="#f472b6" />
                  <stop offset="1" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="butterflyPinkGrad2" x1="29" y1="4" x2="17" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbcfe8" />
                  <stop offset="0.6" stopColor="#f472b6" />
                  <stop offset="1" stopColor="#db2777" />
                </linearGradient>
              </defs>
            </svg>
          </span>

          <p className="inline text-[1.05rem] sm:text-[1.2rem] md:text-[1.28rem] text-[#333333] font-normal leading-[1.75] sm:leading-[1.82] tracking-[-0.01em]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* Bottom Floral / Petal Accent Motif */}
        <div className="mt-8 sm:mt-10 flex justify-center items-center select-none" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 opacity-75 hover:opacity-100 transition-transform duration-300 hover:scale-110"
          >
            <path
              d="M16 4 C14 10 10 16 10 20 C10 24 12.5 27 16 28 C19.5 27 22 24 22 20 C22 16 18 10 16 4 Z"
              fill="url(#petalGrad)"
              stroke="#f472b6"
              strokeWidth="0.8"
            />
            <path
              d="M16 11 L16 26"
              stroke="#db2777"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="petalGrad" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbcfe8" />
                <stop offset="0.7" stopColor="#f472b6" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
