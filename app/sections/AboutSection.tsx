'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-[10vh] px-[4vw] md:py-[12vh] md:px-[5vw] lg:py-[14vh] lg:px-[6vw] overflow-hidden bg-white">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[82vw] lg:max-w-[64rem] flex flex-col items-center text-center">
        {/* Title: Singularity */}
        <h2 className="font-seasonmix text-[clamp(2.4rem,6.5vw,3.2rem)] md:text-[clamp(3.2rem,5.5vw,4.5rem)] lg:text-[clamp(4.5rem,5.2vw,5.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#111111] mb-[1.5rem] md:mb-[2rem]">
          Singularity
        </h2>

        {/* Paragraph Container */}
        <div className="relative mx-auto w-full max-w-[90vw] md:max-w-[78vw] lg:max-w-[54rem]">
          <p className="text-[clamp(0.95rem,2.6vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.25rem)] lg:text-[clamp(1.22rem,1.35vw,1.35rem)] text-[#333333] font-normal leading-[1.75] md:leading-[1.82] lg:leading-[1.9] tracking-[-0.01em]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
}
