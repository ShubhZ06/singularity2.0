'use client';

import React from 'react';

export default function ThemeSection() {
  const tracks = [
    { title: 'AI & Intelligent Systems', icon: '✦', desc: 'Agentic workflows, large language models, generative design, and cognitive automation.' },
    { title: 'Web3 & Decentralized Trust', icon: '◈', desc: 'Smart contracts, zero-knowledge proofs, decentralized identity, and token economics.' },
    { title: 'Fintech & Open Commerce', icon: '❖', desc: 'Next-gen payment architectures, automated hedging, and frictionless banking protocols.' },
    { title: 'Open Innovation & Shakti', icon: '✵', desc: 'Unbounded problem-solving tackling public good, healthcare, sustainability, and education.' },
  ];

  return (
    <section id="theme" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B35F8]/25 bg-[#7B35F8]/5 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7B35F8] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B35F8] animate-pulse" />
            <span>Tracks Coming Soon</span>
          </div>
          <h2 className="font-seasonmix text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal leading-[1.1] mb-4">
            Hackathon Themes
          </h2>
          <p className="text-base text-[#111111]/65 leading-relaxed font-normal">
            Four specialized tracks curated to challenge conventional paradigms and unlock visionary technology solutions. Detailed problem statements will be revealed soon.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group relative rounded-2xl border border-[#111111]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#7B35F8]/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl text-[#7B35F8] group-hover:scale-125 transition-transform duration-300">
                    {track.icon}
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#111111]/40 border border-[#111111]/10 px-2.5 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#111111] mb-2 leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs text-[#111111]/65 leading-relaxed">
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
