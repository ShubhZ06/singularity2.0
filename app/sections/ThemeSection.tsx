'use client';

import React from 'react';

export default function ThemeSection() {
  const tracks = [
    { title: 'AI & Intelligent Systems', icon: '✦', desc: 'Agentic workflows, large language models, generative design, and cognitive automation.' },
    { title: 'Web3 & Decentralized Trust', icon: '◈', desc: 'Smart contracts, zero-knowledge proofs, decentralized identity, and token economics.' },
    { title: 'Fintech & Open Commerce', icon: '❖', desc: 'Next-gen payment architectures, automated hedging, and frictionless banking protocols.' },
    { title: 'Open Innovation', icon: '✵', desc: 'Unbounded problem-solving tackling public good, healthcare, sustainability, and education.' },
  ];

  return (
    <section id="theme" className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">
        <div className="text-center max-w-[42rem] mx-auto mb-[3rem] md:mb-[4rem]">
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#111111] font-normal leading-[1.1] mb-4">
            Hackathon Themes
          </h2>
          <p className="text-[clamp(0.9rem,2.2vw,1.05rem)] md:text-[clamp(1rem,1.5vw,1.125rem)] text-[#111111]/65 leading-relaxed font-normal">
            Four specialized tracks curated to challenge conventional paradigms and unlock visionary technology solutions. Detailed problem statements will be revealed soon.
          </p>
        </div>

        {/* Tracks Grid: Mobile (1 col), Tablet (2 cols), Desktop (4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.25rem] md:gap-[1.5rem] lg:gap-[1.75rem]">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group relative rounded-[clamp(1rem,1.6vw,1.5rem)] border border-[#111111]/10 bg-white p-[clamp(1.2rem,1.8vw,1.75rem)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#7B35F8]/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[1.4rem] text-[#7B35F8] group-hover:scale-125 transition-transform duration-300">
                    {track.icon}
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#111111]/40 border border-[#111111]/10 px-2.5 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="font-sans text-[clamp(1.05rem,1.4vw,1.25rem)] font-semibold text-[#111111] mb-2 leading-snug">
                  {track.title}
                </h3>
                <p className="text-[clamp(0.8rem,0.95vw,0.875rem)] text-[#111111]/65 leading-relaxed">
                  {track.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#111111]/8 flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#111111]/50 group-hover:text-[#7B35F8] transition-colors">
                <span>Track Details</span>
                <span>TBA →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
