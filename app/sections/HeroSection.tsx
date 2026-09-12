'use client';

import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer to December 19, 2026
  useEffect(() => {
    const targetDate = new Date('2026-12-19T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] pt-[1vw] px-[1vw] pb-[1vw] bg-white select-none">
      {/* Main Full-Screen Canvas with Smooth Rounded Corners */}
      <div className="relative w-full h-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-white">
        {/* Central Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
        >
          <source src="/videos/hero-bg-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Atmospheric subtle vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* ========================================================================= */}
        {/* SEAMLESS PURE WHITE PERIMETER FRAME & CORNER FILLETS                     */}
        {/* ========================================================================= */}
        {/* Top Border */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[10px] sm:h-[12px] md:h-[14px] bg-white z-20" />
        {/* Bottom Border */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[10px] sm:h-[12px] md:h-[14px] bg-white z-20" />
        {/* Left Border */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[10px] sm:w-[12px] md:w-[14px] bg-white z-20" />
        {/* Right Border */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-[10px] sm:w-[12px] md:w-[14px] bg-white z-20" />

        {/* Top-Left Video Corner Fillet (Rounds the video inside the frame) */}
        <div className="pointer-events-none absolute top-[10px] sm:top-[12px] md:top-[14px] left-[10px] sm:left-[12px] md:left-[14px] w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 z-20">
          <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 0 H44 C19.699 0 0 19.699 0 44 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom-Right Video Corner Fillet (Rounds the video inside the frame) */}
        <div className="pointer-events-none absolute bottom-[10px] sm:bottom-[12px] md:bottom-[14px] right-[10px] sm:right-[12px] md:right-[14px] w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 z-20">
          <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M44 44 H0 C24.301 44 44 24.301 44 0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* TOP-LEFT: Brand Logo                                                      */}
        {/* ========================================================================= */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center">
          <div className="relative h-7 sm:h-8 md:h-9 w-36 sm:w-44 md:w-52 flex items-center select-none cursor-pointer">
            <img
              src="/logo/logo-white.svg"
              alt="SINGULARITY"
              className="h-full w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] transition-opacity hover:opacity-90"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOP-RIGHT NOTCH: Seamless White Cutout with Popped-Out Action Buttons     */}
        {/* ========================================================================= */}
        <div className="absolute top-0 right-0 z-30 flex items-start">
          {/* Trapezoidal Diagonal S-Curve Slope (Left of Top-Right Notch) */}
          <div className="relative w-16 sm:w-20 md:w-24 h-[66px] sm:h-[75px] md:h-[82px] shrink-0 -mr-[0.5px] pointer-events-none">
            <svg
              viewBox="0 0 96 82"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Smooth S-curve transition from 14px top border down to 82px button bar */}
              <path d="M0 0 H96 V82 C48 82 48 14 0 14 Z" fill="#ffffff" />
            </svg>
          </div>

          {/* Solid White Cutout Content Area */}
          <div className="relative bg-white h-[66px] sm:h-[75px] md:h-[82px] pl-1.5 sm:pl-2.5 pr-6 sm:pr-8 md:pr-9 flex items-center">
            {/* Buttons Group */}
            <div className="flex items-center gap-3 sm:gap-4 -translate-y-0.5 sm:-translate-y-1 transition-transform">
              {/* Social Icon 1: Instagram */}
              <button
                type="button"
                aria-label="Social Link 1"
                className="group flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
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
                className="group flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* Social Icon 3: Community / Facebook */}
              <button
                type="button"
                aria-label="Social Link 3"
                className="group flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
              </button>

              {/* Explore Action Button with Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Explore Menu"
                className="group flex h-10 sm:h-11 md:h-12 items-center justify-between gap-2.5 sm:gap-3.5 rounded-full border-2 border-white bg-white pl-4 sm:pl-5 md:pl-5.5 pr-1.5 sm:pr-2 text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-serif italic text-sm sm:text-base tracking-[-0.03em] text-[#111111] group-hover:text-black transition-colors select-none">
                  Explore
                </span>
                
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-8.5 md:w-8.5 items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:rotate-45">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Inner Concave Fillet below Top-Right Notch */}
        <div className="pointer-events-none absolute top-[66px] sm:top-[75px] md:top-[82px] right-[10px] sm:right-[12px] md:right-[14px] w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 z-20">
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M36 0 V36 C36 16.118 19.882 0 0 0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* EXPLORE NAVIGATION MENU MODAL / DRAWER                                    */}
        {/* ========================================================================= */}
        {isMenuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-all animate-in fade-in duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="w-full max-w-xs sm:max-w-sm rounded-3xl bg-[#121316]/95 border border-white/20 p-6 shadow-2xl backdrop-blur-xl text-white mt-12 sm:mt-16 mr-2 sm:mr-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-serif italic text-base sm:text-lg tracking-[-0.03em] text-white/70">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <nav className="py-4 space-y-1.5">
                {[
                  { name: 'About', href: '#about-section' },
                  { name: 'Timeline', href: '#timeline-section' },
                  { name: 'Themes', href: '#theme-section' },
                  { name: 'Sponsors', href: '#sponsors-section' },
                  { name: 'FAQ', href: '#faq-section' },
                  { name: 'Story', href: '#story-section' },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl font-serif italic text-lg sm:text-xl tracking-[-0.04em] text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    const el = document.getElementById('timeline-section') || document.getElementById('story-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-full bg-white text-[#111111] font-serif italic font-semibold text-base sm:text-lg tracking-[-0.02em] hover:bg-white/90 transition-transform active:scale-95 cursor-pointer shadow-lg"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BOTTOM-LEFT NOTCH: Hackathon Countdown Timer (Dec 19, 2026)               */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 left-0 z-30 flex items-end">
          {/* Solid White Cutout Content Area for Stats */}
          <div className="relative bg-white h-[88px] sm:h-[99px] md:h-[110px] pl-6 sm:pl-8 md:pl-9 pr-3 sm:pr-4 flex items-center">
            {/* Outlined Pill Container around countdown timer */}
            <div className="inline-flex items-center gap-6 sm:gap-8 md:gap-10 rounded-full border border-black bg-white px-6 sm:px-8 md:px-9 py-2.5 sm:py-3 shadow-sm">
              {/* Days Column */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 min-w-[48px] sm:min-w-[56px]">
                <span className="font-serif italic text-2xl sm:text-3xl md:text-[2rem] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-[#111111]/60 font-bold">
                  Days
                </span>
              </div>

              <span className="font-serif italic text-lg sm:text-xl font-normal text-[#111111]/30 -mt-3.5">:</span>

              {/* Hours Column */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 min-w-[48px] sm:min-w-[56px]">
                <span className="font-serif italic text-2xl sm:text-3xl md:text-[2rem] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-[#111111]/60 font-bold">
                  Hours
                </span>
              </div>

              <span className="font-serif italic text-lg sm:text-xl font-normal text-[#111111]/30 -mt-3.5">:</span>

              {/* Minutes Column */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 min-w-[48px] sm:min-w-[56px]">
                <span className="font-serif italic text-2xl sm:text-3xl md:text-[2rem] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-[#111111]/60 font-bold">
                  Minutes
                </span>
              </div>
            </div>
          </div>

          {/* Trapezoidal Diagonal S-Curve Slope (Right of Bottom-Left Notch) */}
          <div className="relative w-18 sm:w-24 md:w-32 h-[88px] sm:h-[99px] md:h-[110px] shrink-0 -ml-[0.5px] pointer-events-none">
            <svg
              viewBox="0 0 110 110"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Smooth S-curve transition from 110px stats bar down to 14px bottom border (110 - 14 = 96) */}
              <path d="M0 110 H110 V96 C55 96 55 0 0 0 Z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Inner Concave Fillet above Bottom-Left Notch where stats bar meets left border */}
        <div className="pointer-events-none absolute bottom-[88px] sm:bottom-[99px] md:bottom-[110px] left-[10px] sm:left-[12px] md:left-[14px] w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 z-20">
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 36 V0 C0 19.882 16.118 36 36 36 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-RIGHT: Floating Translucent Glass Card                              */}
        {/* ========================================================================= */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-9 md:right-9 z-20 w-72 sm:w-84 md:w-[380px] rounded-2xl sm:rounded-3xl bg-[#121316]/70 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-[0_16px_36px_rgba(0,0,0,0.5)] space-y-3 sm:space-y-3.5 transition-all duration-300 hover:border-white/30 hover:bg-[#121316]/80">
          {/* Card Description */}
          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed font-sans">
            Register today to join a community of builders, experiment freely, and turn wild ideas into real impact.
          </p>

          {/* Card Action: Register Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('timeline-section') || document.getElementById('story-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex h-10 sm:h-11 w-full items-center justify-center rounded-full bg-white text-[#111111] font-serif italic font-semibold text-sm sm:text-base tracking-[-0.02em] shadow-md transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


