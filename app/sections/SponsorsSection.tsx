'use client';

import React from 'react';

export default function SponsorsSection() {
  const tiers = [
    { title: 'Title & Flagship Partners', slots: 2, desc: 'Lead keynote, exclusive track ownership, and primary stage presence.' },
    { title: 'Gold & Technology Partners', slots: 4, desc: 'Track sponsorship, API bounties, dedicated mentor tables, and recruitment.' },
    { title: 'Community & Platform Partners', slots: 6, desc: 'Tooling credits, swag distribution, developer community outreach, and prizes.' },
  ];

  return (
    <section id="sponsors" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B35F8]/25 bg-[#7B35F8]/5 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7B35F8] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B35F8] animate-pulse" />
            <span>Partnerships &amp; Sponsors</span>
          </div>
          <h2 className="font-seasonmix text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal leading-[1.1] mb-4">
            Our Sponsors
          </h2>
          <p className="text-base text-[#111111]/65 leading-relaxed font-normal">
            Backed by forward-thinking industry leaders and open-source pioneers empowering Kolkata&apos;s finest student builders. Official sponsor reveal coming soon.
          </p>
        </div>

        {/* Sponsor Tier Placeholders */}
        <div className="space-y-8">
          {tiers.map((tier) => (
            <div key={tier.title} className="rounded-2xl border border-[#111111]/10 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#111111]/8 gap-2">
                <div>
                  <h3 className="font-sans text-lg font-semibold text-[#111111]">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-[#111111]/55 mt-0.5">
                    {tier.desc}
                  </p>
                </div>
                <span className="self-start sm:self-auto text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#7B35F8] bg-[#7B35F8]/8 px-3 py-1 rounded-full">
                  Announcing Soon
                </span>
              </div>

              {/* Grid of placeholder slots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
                {[...Array(tier.slots)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-20 items-center justify-center rounded-xl border border-dashed border-[#111111]/15 bg-black/[0.015] p-3 text-center transition-colors hover:border-[#7B35F8]/40 hover:bg-[#7B35F8]/5"
                  >
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#111111]/35">
                      Partner Slot
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call for Sponsorship */}
        <div className="mt-12 text-center rounded-2xl bg-[#7B35F8]/5 border border-[#7B35F8]/20 p-8 sm:p-10">
          <h3 className="font-seasonmix text-2xl sm:text-3xl text-[#111111] mb-2">
            Interested in Sponsoring Singularity &apos;26?
          </h3>
          <p className="max-w-xl mx-auto text-sm text-[#111111]/70 mb-6 leading-relaxed">
            Gain direct brand exposure to 4,000+ enthusiastic engineering students, scout top developer talent, and mentor next-generation creators.
          </p>
          <a
            href="mailto:contact@fiem.acm.org"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] shadow-lg hover:bg-[#222222] transition-transform active:scale-[0.98]"
          >
            <span>Request Sponsorship Deck</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
