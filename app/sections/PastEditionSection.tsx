'use client';

import React from 'react';
import ScrollExpand from '../components/ScrollExpand';

export default function PastEditionSection() {
  return (
    <section id="past-editions" className="relative w-full bg-white">
      {/* 1. Expandable Image Component with "Our Glory" headline */}
      <ScrollExpand
        src="/images/temp.png"
        alt="Our Glory"
        title="Our Glory"
        useWindowScroll={true}
        startWidth={52}
        startHeight={62}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.25}
        scrollDistance={1.2}
        holdDistance={0.35}
        titleMinOpacity={0.25}
        overlayScrim={0}
        smoothing={0.08}
        className="w-full"
      />

      {/* 2. Content & Numbers After The Image Component */}
      <div className="relative w-full py-16 sm:py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
          {/* Narrative Paragraph */}
          <p className="text-base sm:text-lg md:text-[1.22rem] lg:text-[1.28rem] text-[#222222] font-light leading-[1.8] sm:leading-[1.85] tracking-[-0.01em] mb-16 sm:mb-24">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* Metrics / Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 text-center">
            <div>
              <div className="text-5xl sm:text-6xl md:text-[4rem] text-[#111111] font-normal tracking-tight mb-2 sm:mb-3 leading-none">
                25H
              </div>
              <div className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Non-stop coding
              </div>
            </div>

            <div>
              <div className="text-5xl sm:text-6xl md:text-[4rem] text-[#111111] font-normal tracking-tight mb-2 sm:mb-3 leading-none">
                4.1K+
              </div>
              <div className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Global registrations
              </div>
            </div>

            <div>
              <div className="text-5xl sm:text-6xl md:text-[4rem] text-[#111111] font-normal tracking-tight mb-2 sm:mb-3 leading-none">
                ₹140k+
              </div>
              <div className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Prize pool
              </div>
            </div>

            <div>
              <div className="text-5xl sm:text-6xl md:text-[4rem] text-[#111111] font-normal tracking-tight mb-2 sm:mb-3 leading-none">
                55
              </div>
              <div className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Top finalists
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
