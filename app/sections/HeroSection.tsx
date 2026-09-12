'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] p-2 sm:p-3 md:p-4 lg:p-5 bg-white select-none">
      {/* Main Full-Screen Canvas with Seamless White Border Perimeter */}
      <div className="relative w-full h-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-white border-[6px] sm:border-[8px] md:border-[10px] border-white">
        
        {/* Central Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
        >
          <source src="/videos/hero-bg-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Atmospheric subtle vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

          {/* ========================================================================= */}
          {/* TOP-LEFT: Brand Icon & Navigation Pills (Wireframe style - No Text)      */}
          {/* ========================================================================= */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center gap-6 sm:gap-8">
            {/* Geometric Loop / Knot Logo Icon */}
            <div className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:scale-105 cursor-pointer shadow-lg">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white stroke-current stroke-[2.2] transition-transform duration-300 group-hover:rotate-45"
              >
                <path
                  d="M16 6C11 6 7 10 7 16C7 22 11 26 16 26C21 26 25 22 25 16C25 10 21 6 16 6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                />
                <circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="21" cy="11" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="11" cy="21" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="21" cy="21" r="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Navigation Skeleton Pill Bars */}
            <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
              {/* Active item with underline bar */}
              <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="h-2.5 w-14 rounded-full bg-white shadow-sm transition-all group-hover:w-16" />
                <div className="h-[2px] w-full rounded-full bg-white/90" />
              </div>

              {/* Other navigation skeleton pills */}
              <div className="group flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-2.5 w-16 rounded-full bg-white/60 transition-all group-hover:bg-white" />
                <div className="h-[2px] w-0 rounded-full bg-transparent group-hover:w-full group-hover:bg-white/50 transition-all" />
              </div>
              <div className="group flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-2.5 w-14 rounded-full bg-white/60 transition-all group-hover:bg-white" />
                <div className="h-[2px] w-0 rounded-full bg-transparent group-hover:w-full group-hover:bg-white/50 transition-all" />
              </div>
              <div className="group flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-2.5 w-16 rounded-full bg-white/60 transition-all group-hover:bg-white" />
                <div className="h-[2px] w-0 rounded-full bg-transparent group-hover:w-full group-hover:bg-white/50 transition-all" />
              </div>
            </nav>
          </div>

          {/* ========================================================================= */}
          {/* TOP-RIGHT NOTCH: Inverted White Panel with Social & Action Buttons         */}
          {/* ========================================================================= */}
          <div className="absolute top-0 right-0 z-30 flex items-start">
            {/* Top-Left Inverted Fillet Curve for Top-Right Notch */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 text-white shrink-0 -mr-[0.5px]">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white fill-current"
              >
                <path d="M40 0H0C22.09 0 40 17.91 40 40V0Z" />
              </svg>
            </div>

            {/* White Cutout Capsule */}
            <div className="relative bg-white pt-2 sm:pt-3 pb-3 sm:pb-4 pl-3 sm:pl-5 pr-4 sm:pr-6 rounded-bl-[28px] sm:rounded-bl-[36px] shadow-md flex items-center gap-2 sm:gap-3">
              {/* Social Icon 1: Instagram */}
              <button
                type="button"
                aria-label="Social Link 1"
                className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#111111] transition-all duration-200 hover:border-black/35 hover:bg-black/5 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </button>

              {/* Social Icon 2: X (Twitter) */}
              <button
                type="button"
                aria-label="Social Link 2"
                className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#111111] transition-all duration-200 hover:border-black/35 hover:bg-black/5 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* Social Icon 3: Community / Facebook */}
              <button
                type="button"
                aria-label="Social Link 3"
                className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#111111] transition-all duration-200 hover:border-black/35 hover:bg-black/5 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
              </button>

              {/* Pill Action Button */}
              <button
                type="button"
                aria-label="Explore Action"
                className="group flex h-9 sm:h-10 items-center justify-between gap-3 rounded-full border border-black/15 bg-white pl-4 sm:pl-5 pr-1.5 sm:pr-2 text-[#111111] transition-all duration-200 hover:border-black/40 hover:bg-black/5 cursor-pointer"
              >
                {/* Skeleton pill placeholder for text */}
                <div className="h-2.5 w-16 sm:w-20 rounded-full bg-[#111111]/80 group-hover:bg-[#111111] transition-colors" />
                
                {/* Circle with arrow */}
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Bottom-Right Inverted Fillet Curve for Top-Right Notch */}
            <div className="absolute -bottom-8 sm:-bottom-10 right-0 w-8 h-8 sm:w-10 sm:h-10 text-white pointer-events-none -mt-[0.5px]">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white fill-current"
              >
                <path d="M40 0V40C40 17.91 22.09 0 0 0H40Z" />
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT EDGE: Vertical Slider Indicator Track                               */}
          {/* ========================================================================= */}
          <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
            {/* Index marker top: 01 */}
            <span className="font-mono text-[11px] sm:text-xs font-bold text-white/90 tracking-wider">
              01
            </span>

            {/* Vertical Progress Rail */}
            <div className="relative h-28 sm:h-36 w-[3px] rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[40%] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </div>

            {/* Index marker bottom: 04 */}
            <span className="font-mono text-[11px] sm:text-xs font-medium text-white/40 tracking-wider">
              04
            </span>
          </div>


          {/* ========================================================================= */}
          {/* BOTTOM-LEFT NOTCH: Inverted White Panel with 3 Stats Columns (Wireframe)   */}
          {/* ========================================================================= */}
          <div className="absolute bottom-0 left-0 z-30 flex items-end">
            {/* White Cutout Capsule for Stats */}
            <div className="relative bg-white pt-4 sm:pt-5 pb-3 sm:pb-4 pl-6 sm:pl-8 pr-6 sm:pr-9 rounded-tr-[28px] sm:rounded-tr-[36px] shadow-md flex items-center gap-6 sm:gap-10">
              {/* Stat Column 1 (Wireframe pills - No Text) */}
              <div className="flex flex-col gap-2">
                <div className="h-4 sm:h-5 w-16 sm:w-20 rounded-full bg-[#111111]/85 shadow-sm" />
                <div className="h-2 sm:h-2.5 w-10 sm:w-12 rounded-full bg-[#111111]/30" />
              </div>

              {/* Stat Column 2 */}
              <div className="flex flex-col gap-2">
                <div className="h-4 sm:h-5 w-16 sm:w-20 rounded-full bg-[#111111]/85 shadow-sm" />
                <div className="h-2 sm:h-2.5 w-14 sm:w-16 rounded-full bg-[#111111]/30" />
              </div>

              {/* Stat Column 3 */}
              <div className="flex flex-col gap-2">
                <div className="h-4 sm:h-5 w-16 sm:w-20 rounded-full bg-[#111111]/85 shadow-sm" />
                <div className="h-2 sm:h-2.5 w-14 sm:w-18 rounded-full bg-[#111111]/30" />
              </div>
            </div>

            {/* Bottom-Right Inverted Fillet Curve for Bottom-Left Notch */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 text-white shrink-0 -ml-[0.5px]">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white fill-current"
              >
                <path d="M0 40H40C17.91 40 0 22.09 0 0V40Z" />
              </svg>
            </div>

            {/* Top-Left Inverted Fillet Curve for Bottom-Left Notch */}
            <div className="absolute -top-8 sm:-top-10 left-0 w-8 h-8 sm:w-10 sm:h-10 text-white pointer-events-none -mb-[0.5px]">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white fill-current"
              >
                <path d="M0 40V0C0 22.09 17.91 40 40 40H0Z" />
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM-RIGHT: Floating Translucent Glass Card (Wireframe Layout)           */}
          {/* ========================================================================= */}
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-8 md:right-8 z-20 w-64 sm:w-72 md:w-80 rounded-2xl sm:rounded-3xl bg-[#121316]/65 backdrop-blur-xl border border-white/15 p-4 sm:p-5 md:p-6 shadow-[0_16px_36px_rgba(0,0,0,0.5)] space-y-3 sm:space-y-4 transition-all duration-300 hover:border-white/30 hover:bg-[#121316]/75">
            {/* Card Header Skeleton Bar */}
            <div className="h-3.5 sm:h-4 w-36 sm:w-44 rounded-full bg-white/80" />

            {/* Card Description Skeleton Lines */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="h-2 sm:h-2.5 w-full rounded-full bg-white/35" />
              <div className="h-2 sm:h-2.5 w-[92%] rounded-full bg-white/30" />
              <div className="h-2 sm:h-2.5 w-[75%] rounded-full bg-white/25" />
            </div>

            {/* Card Outline Action Pill */}
            <div className="pt-1">
              <div className="flex h-9 sm:h-10 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 transition-all duration-200 hover:border-white/50 hover:bg-white/15 cursor-pointer">
                <div className="h-2.5 w-24 rounded-full bg-white/70" />
              </div>
            </div>
          </div>

        </div>
    </section>
  );
}
