'use client';

import React from 'react';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">
        {/* Section Header */}
        <div className="text-center max-w-[42rem] mx-auto mb-[3rem] md:mb-[4rem]">
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#111111] font-normal leading-[1.1] mb-4">
            Our Sponsors
          </h2>
          <p className="text-[clamp(0.9rem,2.2vw,1.05rem)] md:text-[clamp(1rem,1.5vw,1.125rem)] text-[#111111]/65 leading-relaxed font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Call for Sponsorship / Interested Section */}
        <div className="text-center rounded-[clamp(1.2rem,2vw,1.75rem)] bg-[#7B35F8]/5 border border-[#7B35F8]/20 p-[clamp(2rem,4vw,3.5rem)] shadow-sm">
          <h3 className="font-seasonmix text-[clamp(1.6rem,3.5vw,2.5rem)] text-[#111111] mb-3 leading-[1.2]">
            Interested in Sponsoring Singularity &apos;26?
          </h3>
          <p className="max-w-[38rem] mx-auto text-[clamp(0.88rem,1.3vw,1.05rem)] text-[#111111]/70 mb-7 leading-relaxed">
            Gain direct brand exposure to 4,000+ enthusiastic engineering students, scout top developer talent, and mentor next-generation creators.
          </p>
          <a
            href="mailto:contact@fiem.acm.org"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-8 py-3.5 text-[clamp(0.72rem,0.85vw,0.8rem)] font-bold uppercase tracking-[0.18em] shadow-lg hover:bg-[#222222] transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <span>Request Sponsorship Deck</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
