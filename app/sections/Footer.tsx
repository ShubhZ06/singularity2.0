'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const FooterMap = dynamic(() => import('@/components/FooterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-[#13171B]/10 bg-[#F5F5F7] animate-pulse flex items-center justify-center">
      <span className="text-xs uppercase tracking-widest text-[#13171B]/40 font-mono">
        Loading Map...
      </span>
    </div>
  ),
});

const exploreLinks = [
  'Register Now',
  'visit last year',
  'Security',
];

const connectLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/singularityhack.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/singularity-hack/' },
  { label: 'WhatsApp', href: '#' },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-white min-h-[100dvh] flex flex-col justify-between pt-[1.5rem] md:pt-[2.5rem] pb-[clamp(2rem,4vw,4rem)] px-[4vw] md:px-[5vw] lg:px-[6vw]"
    >
      <div className="mx-auto w-full max-w-[92vw] lg:max-w-[80rem] flex flex-col justify-between flex-1 h-full">
        {/* Top Centered Giant Black Wordmark */}
        <div className="relative w-full flex items-center justify-center pt-2 pb-[1rem] md:pb-[1.5rem]">
          <div className="relative w-full flex justify-center items-center">
            <img
              src="/logo/logo-black.svg"
              alt="SINGULARITY"
              className="w-full h-[clamp(4.5rem,12vw,12rem)] object-contain select-none"
            />
          </div>
        </div>

        {/* Crisp Horizontal Divider */}
        <div className="w-full border-t border-[#13171B]/10" />

        {/* 3-Column Navigation & Graphic Art Grid: Mobile (2 col links, then Map below), Tablet/Desktop (3 cols) */}
        <div className="grid items-start pt-[1.5rem] md:pt-[2rem] grid-cols-2 md:grid-cols-[1fr_1.3fr_1fr] gap-x-[1.5rem] gap-y-[2rem] md:gap-[2.5vw]">
          {/* Left: Explore Links */}
          <section className="order-1 md:order-1">
            <p className="mb-3 md:mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#13171B]/55">
              EXPLORE
            </p>
            <ul className="space-y-1 md:space-y-1.5 text-[clamp(1.15rem,2.8vw,1.45rem)] md:text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.2]">
              {exploreLinks.map((link) => (
                <li
                  key={link}
                  className="font-serif italic tracking-[-0.05em] text-[#13171B] hover:text-[#0030CF] transition-colors cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </section>

          {/* Right: Connect Links (Aligned to the rightmost edge on mobile and desktop) */}
          <section className="order-2 md:order-3 text-right justify-self-end">
            <p className="mb-3 md:mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#13171B]/55 text-right">
              CONNECT
            </p>
            <ul className="space-y-1 md:space-y-1.5 text-[clamp(1.15rem,2.8vw,1.45rem)] md:text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.2] text-right">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-serif italic tracking-[-0.05em] text-[#13171B] hover:text-[#0030CF] transition-colors cursor-pointer text-right inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Center on desktop, Bottom full-width on mobile: Interactive Map */}
          <div className="order-3 md:order-2 col-span-2 md:col-span-1 w-full">
            <FooterMap />
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-[2rem] md:mt-[3rem] pt-4 flex items-center justify-center text-[clamp(0.625rem,0.75vw,0.72rem)] uppercase tracking-[0.28em] text-[#13171B]/55">
          <span>&copy; 2026 Singularity</span>
        </div>
      </div>
    </footer>
  );
}
