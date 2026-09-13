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
      <div className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-white">
        <div className="mx-auto w-full max-w-[92vw] md:max-w-[82vw] lg:max-w-[66rem]">
          {/* Narrative Paragraph */}
          <p className="text-[clamp(0.95rem,2.4vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.22rem)] lg:text-[clamp(1.22rem,1.35vw,1.3rem)] text-[#222222] font-light leading-[1.8] md:leading-[1.85] tracking-[-0.01em] mb-[3rem] md:mb-[4.5rem] lg:mb-[5.5rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* Metrics / Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem] md:gap-[2.5rem] lg:gap-[3.5rem] text-center">
            <div>
              <div className="text-[clamp(2.5rem,6vw,3.25rem)] md:text-[clamp(3.25rem,4.5vw,4.25rem)] lg:text-[clamp(4.25rem,4vw,5rem)] text-[#13171B] font-normal tracking-tight mb-[0.5rem] leading-none">
                25H
              </div>
              <div className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Non-stop coding
              </div>
            </div>

            <div>
              <div className="text-[clamp(2.5rem,6vw,3.25rem)] md:text-[clamp(3.25rem,4.5vw,4.25rem)] lg:text-[clamp(4.25rem,4vw,5rem)] text-[#13171B] font-normal tracking-tight mb-[0.5rem] leading-none">
                4.1K+
              </div>
              <div className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Global registrations
              </div>
            </div>

            <div>
              <div className="text-[clamp(2.5rem,6vw,3.25rem)] md:text-[clamp(3.25rem,4.5vw,4.25rem)] lg:text-[clamp(4.25rem,4vw,5rem)] text-[#13171B] font-normal tracking-tight mb-[0.5rem] leading-none">
                ₹140k+
              </div>
              <div className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Prize pool
              </div>
            </div>

            <div>
              <div className="text-[clamp(2.5rem,6vw,3.25rem)] md:text-[clamp(3.25rem,4.5vw,4.25rem)] lg:text-[clamp(4.25rem,4vw,5rem)] text-[#13171B] font-normal tracking-tight mb-[0.5rem] leading-none">
                55
              </div>
              <div className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#777777]">
                Top finalists
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
