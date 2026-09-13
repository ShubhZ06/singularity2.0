'use client';

import React, { useState, useEffect } from 'react';
import FullScreenMenu from '../components/FullScreenMenu';

interface HeroSectionProps {
  onOpenMenu?: () => void;
}

export default function HeroSection({ onOpenMenu }: HeroSectionProps) {
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
    <section className="relative w-full h-[100dvh] min-h-[540px] pt-[1vw] px-[1vw] pb-[1vw] bg-white select-none overflow-hidden">
      {/* Main Full-Screen Canvas with Smooth Rounded Corners */}
      <div className="relative w-full h-full rounded-[clamp(1.2rem,2.8vw,2.75rem)] overflow-hidden bg-white">
        {/* Central Background Video - Desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hidden md:block"
        >
          <source src="/videos/hero-bg-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Central Background Video - Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out block md:hidden"
        >
          <source src="/videos/hero-bg-mobile.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Atmospheric subtle vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* ========================================================================= */}
        {/* SEAMLESS PURE WHITE PERIMETER FRAME & CORNER FILLETS                     */}
        {/* ========================================================================= */}
        {/* Top Border */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[clamp(8px,0.85vw,14px)] bg-white z-20" />
        {/* Bottom Border */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[clamp(8px,0.85vw,14px)] bg-white z-20" />
        {/* Left Border */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[clamp(8px,0.85vw,14px)] bg-white z-20" />
        {/* Right Border */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-[clamp(8px,0.85vw,14px)] bg-white z-20" />

        {/* Top-Left Video Corner Fillet (Rounds the video inside the frame) */}
        <div className="pointer-events-none absolute top-[clamp(8px,0.85vw,14px)] left-[clamp(8px,0.85vw,14px)] w-[clamp(24px,2.4vw,44px)] h-[clamp(24px,2.4vw,44px)] z-20">
          <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 0 H44 C19.699 0 0 19.699 0 44 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom-Right Video Corner Fillet (Rounds the video inside the frame) */}
        <div className="pointer-events-none absolute bottom-[clamp(8px,0.85vw,14px)] right-[clamp(8px,0.85vw,14px)] w-[clamp(24px,2.4vw,44px)] h-[clamp(24px,2.4vw,44px)] z-20">
          <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M44 44 H0 C24.301 44 44 24.301 44 0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* TOP-LEFT: Brand Logo                                                      */}
        {/* ========================================================================= */}
        <div className="absolute top-0 left-0 z-30 h-[clamp(3.8rem,5vw,5.125rem)] pl-[clamp(1rem,2vw,2.25rem)] flex items-center">
          <div className="relative h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(10.5rem,14vw,13.5rem)] flex items-center select-none cursor-pointer">
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
          <div className="relative w-[clamp(3.2rem,5vw,6rem)] h-[clamp(3.8rem,5vw,5.125rem)] shrink-0 -mr-[0.5px] pointer-events-none">
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
          <div className="relative bg-white h-[clamp(3.8rem,5vw,5.125rem)] pl-1.5 sm:pl-2.5 pr-[clamp(1rem,2vw,2.25rem)] flex items-center">
            {/* Buttons Group */}
            <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
              {/* Social Icons (Desktop & Tablet only to prevent mobile header collision) */}
              <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
                {/* Social Icon 1: Instagram */}
                <button
                  type="button"
                  aria-label="Social Link 1"
                  className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] transition-transform group-hover:scale-110"
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
                  className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] transition-transform group-hover:scale-110"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                {/* Social Icon 3: Community */}
                <button
                  type="button"
                  aria-label="Social Link 3"
                  className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-center rounded-full border-2 border-white bg-white text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[clamp(1rem,1.2vw,1.25rem)] h-[clamp(1rem,1.2vw,1.25rem)] transition-transform group-hover:scale-110"
                  >
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                  </svg>
                </button>
              </div>

              {/* Explore Action Button with Menu Toggle */}
              <button
                type="button"
                onClick={() => (onOpenMenu ? onOpenMenu() : setIsMenuOpen((prev) => !prev))}
                aria-label="Explore Menu"
                className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] items-center justify-between gap-[clamp(0.5rem,0.8vw,0.875rem)] rounded-full border-2 border-white bg-white pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 cursor-pointer"
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
        </div>

        {/* Inner Concave Fillet below Top-Right Notch */}
        <div className="pointer-events-none absolute top-[clamp(3.8rem,5vw,5.125rem)] right-[clamp(8px,0.85vw,14px)] w-[clamp(20px,2vw,36px)] h-[clamp(20px,2vw,36px)] z-20">
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M36 0 V36 C36 16.118 19.882 0 0 0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* FULL SCREEN NAVIGATION MENU (White BG, Black Font)                       */}
        {/* ========================================================================= */}
        {!onOpenMenu && (
          <FullScreenMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        )}

        {/* ========================================================================= */}
        {/* BOTTOM-LEFT NOTCH: Hackathon Countdown Timer (Dec 19, 2026)               */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 left-0 z-30 flex items-end">
          {/* Solid White Cutout Content Area for Stats */}
          <div className="relative bg-white h-[clamp(5.4rem,7.2vw,6.875rem)] pl-[clamp(1rem,2vw,2.25rem)] pr-2 sm:pr-3 md:pr-4 flex items-center">
            {/* Outlined Pill Container around countdown timer */}
            <div className="inline-flex items-center gap-[clamp(0.8rem,1.8vw,2.5rem)] rounded-full border border-black bg-white px-[clamp(0.95rem,1.8vw,2.25rem)] py-[clamp(0.5rem,0.8vw,0.75rem)] shadow-sm">
              {/* Days Column */}
              <div className="flex flex-col items-center gap-0.5 min-w-[clamp(2.1rem,3.2vw,3.5rem)]">
                <span className="font-serif italic text-[clamp(1.45rem,2.2vw,2rem)] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[clamp(0.58rem,0.68vw,0.6875rem)] uppercase tracking-wider text-[#111111]/70 font-bold">
                  Days
                </span>
              </div>

              <span className="font-serif italic text-[clamp(1.1rem,1.6vw,1.45rem)] font-normal text-[#111111]/40 -mt-1">:</span>

              {/* Hours Column */}
              <div className="flex flex-col items-center gap-0.5 min-w-[clamp(2.1rem,3.2vw,3.5rem)]">
                <span className="font-serif italic text-[clamp(1.45rem,2.2vw,2rem)] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[clamp(0.58rem,0.68vw,0.6875rem)] uppercase tracking-wider text-[#111111]/70 font-bold">
                  Hours
                </span>
              </div>

              <span className="font-serif italic text-[clamp(1.1rem,1.6vw,1.45rem)] font-normal text-[#111111]/40 -mt-1">:</span>

              {/* Minutes Column */}
              <div className="flex flex-col items-center gap-0.5 min-w-[clamp(2.1rem,3.2vw,3.5rem)]">
                <span className="font-serif italic text-[clamp(1.45rem,2.2vw,2rem)] font-medium tracking-tight text-[#111111] tabular-nums leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[clamp(0.58rem,0.68vw,0.6875rem)] uppercase tracking-wider text-[#111111]/70 font-bold">
                  Min
                </span>
              </div>
            </div>
          </div>

          {/* Trapezoidal Diagonal S-Curve Slope (Right of Bottom-Left Notch) */}
          <div className="relative w-[clamp(3.5rem,6vw,8rem)] h-[clamp(5.4rem,7.2vw,6.875rem)] shrink-0 -ml-[0.5px] pointer-events-none">
            <svg
              viewBox="0 0 110 110"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Smooth S-curve transition from 110px stats bar down to 14px bottom border */}
              <path d="M0 110 H110 V96 C55 96 55 0 0 0 Z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Inner Concave Fillet above Bottom-Left Notch where stats bar meets left border */}
        <div className="pointer-events-none absolute bottom-[clamp(5.4rem,7.2vw,6.875rem)] left-[clamp(8px,0.85vw,14px)] w-[clamp(20px,2vw,36px)] h-[clamp(20px,2vw,36px)] z-20">
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 36 V0 C0 19.882 16.118 36 36 36 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-RIGHT: Floating Translucent Glass Card                              */}
        {/* ========================================================================= */}
        <div className="absolute bottom-[clamp(6.2rem,10vh,3rem)] sm:bottom-[clamp(1.5rem,2.2vw,2.25rem)] right-[clamp(0.8rem,2vw,2.25rem)] z-20 w-[clamp(14rem,24vw,24rem)] max-w-[calc(100vw-3rem)] rounded-[clamp(1rem,1.8vw,1.5rem)] bg-[#121316]/70 backdrop-blur-xl border border-white/15 p-[clamp(0.85rem,1.4vw,1.5rem)] shadow-[0_16px_36px_rgba(0,0,0,0.5)] space-y-[clamp(0.5rem,0.8vw,0.875rem)] transition-all duration-300 hover:border-white/30 hover:bg-[#121316]/80">
          {/* Card Description */}
          <p className="text-[clamp(0.72rem,0.85vw,0.8125rem)] text-white/80 leading-relaxed font-sans">
            Register today to join a community of builders, experiment freely, and turn wild ideas into real impact.
          </p>

          {/* Card Action: Register Button */}
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('timeline-section') || document.getElementById('story-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex h-[clamp(2.2rem,2.8vw,2.75rem)] w-full items-center justify-center rounded-full bg-white text-[#111111] font-serif italic font-semibold text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.02em] shadow-md transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


