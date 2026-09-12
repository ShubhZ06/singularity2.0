'use client';

import React from 'react';

export default function PastEditionSection() {
  return (
    <section id="past-editions" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-t border-[#111111]/8">
      {/* Decorative background grid pattern */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7B35F8]/25 bg-[#7B35F8]/5 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7B35F8] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7B35F8] animate-pulse" />
              <span>Coming Soon</span>
            </div>
            <h2 className="font-seasonmix text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal leading-[1.1]">
              Past Editions
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#111111]/60 leading-relaxed font-normal">
            Relive the legacy of innovation. We are compiling highlights, winning projects, photo galleries, and memorable milestones from our previous editions.
          </p>
        </div>

        {/* Coming Soon Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              year: 'HackSpire 2025',
              tag: 'Previous Edition',
              metrics: '4,100+ Registrations • 254 Finalists',
              desc: 'Relive the energy where developers and designers converged for 24 hours of non-stop building.',
            },
            {
              year: 'Hall of Fame',
              tag: 'Winners & Projects',
              metrics: 'Top 10 Groundbreaking Prototypes',
              desc: 'Explore the winning solutions that turned bold ideas into real-world applications.',
            },
            {
              year: 'Gallery & Media',
              tag: 'Event Archives',
              metrics: 'Moments Captured',
              desc: 'High-energy captures, keynote presentations, and mentor interactions from the floor.',
            },
          ].map((card, idx) => (
            <div
              key={card.year}
              className="group relative rounded-2xl border border-[#111111]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#7B35F8]/30"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#7B35F8]">
                  {card.tag}
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#111111]/40 border border-[#111111]/10 px-2.5 py-0.5 rounded-full">
                  Preview {idx + 1}
                </span>
              </div>
              <h3 className="font-seasonmix text-2xl sm:text-3xl text-[#111111] mb-2">
                {card.year}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]/50 mb-4">
                {card.metrics}
              </p>
              <p className="text-sm text-[#111111]/70 leading-relaxed">
                {card.desc}
              </p>
              <div className="mt-8 pt-4 border-t border-[#111111]/8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]/60 group-hover:text-[#7B35F8] transition-colors">
                <span>Archive Reveal</span>
                <span>Coming Soon →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
