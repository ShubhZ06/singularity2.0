'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { FaqItem } from '@/components/ui/accordion-05';

const Accordion05 = dynamic(
  () => import('@/components/ui/accordion-05').then((m) => m.Accordion05),
  { ssr: false }
);

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '01',
    title: 'Who can participate?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '02',
    title: 'How do I register?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '03',
    title: 'What is the team size?',
    content:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.',
  },
  {
    id: '04',
    title: 'Are there any prizes?',
    content:
      'Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.',
  },
  {
    id: '05',
    title: 'What resources will be provided?',
    content:
      'Aenean fermentum risus id tortor. Integer ullamcorper leo ut est. Fusce pretium, dolor placerat tincidunt condimentum, mi augue porttitor arcu, non malesuada justo felis at est. Proin vulputate, augue consectetur.',
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-white overflow-hidden border-t border-[#13171B]/8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">

        {/* Section Header */}
        <div className="text-center max-w-[42rem] mx-auto mb-[3rem] md:mb-[4.5rem]">
          <div className="text-[clamp(0.625rem,0.8vw,0.72rem)] font-semibold uppercase tracking-[0.32em] text-[#13171B]/55 mb-3">
            Questions &amp; Insights
          </div>
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#13171B] font-normal leading-[1.1]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <Accordion05
          items={FAQ_ITEMS}
          defaultOpen="01"
          className="max-w-[62rem] mx-auto"
        />
      </div>
    </section>
  );
}
