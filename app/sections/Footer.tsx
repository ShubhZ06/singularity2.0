'use client';

import React from 'react';

const exploreLinks = [
  'Registration',
  'Guide',
  'visit last year',
  'Security',
  'Contact',
];

const connectLinks = ['Discord', 'Instagram', 'Twitter', 'LinkedIn', 'WhatsApp'];

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-white border-t border-[#111111]/15 py-12 sm:py-16">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_1.2fr_0.9fr]">
          {/* Explore Links */}
          <section>
            <p className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
              Explore
            </p>
            <ul className="space-y-2 text-[1.8rem] leading-[1.15] sm:text-[2.15rem] lg:text-[2.6rem]">
              {exploreLinks.map((link) => (
                <li key={link} className="font-serif italic tracking-[-0.05em] text-[#111111] hover:text-[#7B35F8] transition-colors cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </section>

          {/* Animated Blob Art Graphic */}
          <div className="flex items-center justify-center py-4">
            <div className="blob-art" aria-hidden="true">
              <span className="blob blob-one" />
              <span className="blob blob-two" />
              <span className="blob blob-three" />
            </div>
          </div>

          {/* Connect Links */}
          <section className="justify-self-end">
            <p className="mb-6 text-right text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
              Connect
            </p>
            <ul className="space-y-2 text-right text-[1.8rem] leading-[1.15] sm:text-[2.15rem] lg:text-[2.6rem]">
              {connectLinks.map((link) => (
                <li key={link} className="font-serif italic tracking-[-0.05em] text-[#111111] hover:text-[#7B35F8] transition-colors cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom Credits & Tagline */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#111111]/15 pt-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#111111]/55">
          <span>Where innovation meets shakti</span>
          <span className="text-center sm:text-right">Copyright 2026 FIEM ACM Student Chapter</span>
        </div>
      </div>
    </footer>
  );
}
