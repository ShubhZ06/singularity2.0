'use client';

import React from 'react';
import AccordionGallery from '@/app/components/AccordionGallery';

const galleryItems = [
  { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', label: 'Build', alt: 'Build' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Create', alt: 'Create' },
  { image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', label: 'Launch', alt: 'Launch' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', label: 'Impact', alt: 'Impact' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Scale', alt: 'Scale' },
];

export default function FaqSection() {
  return (
    <section id="faq" className="relative w-full py-[6vh] px-[4vw] md:py-[8vh] md:px-[5vw] lg:py-[10vh] lg:px-[6vw] bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">
        {/* Section Header */}
        <div className="text-center max-w-[42rem] mx-auto mb-[2.5rem] md:mb-[3.5rem]">
          <div className="text-[clamp(0.625rem,0.8vw,0.72rem)] font-semibold uppercase tracking-[0.32em] text-[#111111]/55 mb-3">
            Questions &amp; Insights
          </div>
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#111111] font-normal leading-[1.1]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Visual Photo Accordion Gallery Showcase */}
        <div className="w-full">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#111111"
            overlayColor="#0d0d0d"
            textColor="#ffffff"
            duration={0.7}
            gap={12}
            radius={18}
            parallax={0.5}
            grayscale
            showLabels
          />
        </div>
      </div>
    </section>
  );
}
