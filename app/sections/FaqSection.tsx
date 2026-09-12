'use client';

import React, { useState } from 'react';
import AccordionGallery from '@/app/components/AccordionGallery';

const galleryItems = [
  { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', label: 'Build', alt: 'Build' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Create', alt: 'Create' },
  { image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', label: 'Launch', alt: 'Launch' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', label: 'Impact', alt: 'Impact' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Scale', alt: 'Scale' },
];

const faqs = [
  {
    q: "Who is eligible to participate in Singularity '26?",
    a: "Any undergraduate or postgraduate student currently enrolled in an accredited college or university is welcome. Bring your valid college ID card on event day.",
  },
  {
    q: 'Is there any registration fee?',
    a: 'No! Singularity is completely free of cost. Food, accommodation spaces, swag kits, and high-speed Wi-Fi are all provided during the 26-hour hackathon.',
  },
  {
    q: 'What is the team size requirement?',
    a: 'Teams can have between 2 to 4 members. You can register together or find teammates on our official Discord server beforehand.',
  },
  {
    q: 'Can participants participate online or remotely?',
    a: 'No. Singularity is strictly an in-person, offline 26-hour sprint hosted at the FIEM Campus in Sonarpur, Kolkata.',
  },
  {
    q: 'What should we bring with us?',
    a: 'Laptops, chargers, extension cords, government photo ID, student ID, and your builder spirit! Food and rest zones are fully arranged at the venue.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-t border-[#111111]/8">
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#111111]/55 mb-3">
            Questions &amp; Insights
          </div>
          <h2 className="font-seasonmix text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal leading-[1.1]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Visual Accordion Gallery Showcase */}
        <div className="mb-14">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#111111"
            overlayColor="#0d0d0d"
            textColor="#ffffff"
            duration={0.7}
            height={380}
            gap={12}
            radius={18}
            parallax={0.5}
            grayscale
            showLabels
          />
        </div>

        {/* Q&A Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-[#111111]/10 rounded-2xl border border-[#111111]/10 bg-white p-6 sm:p-8 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between text-left text-base sm:text-lg font-medium text-[#111111] hover:text-[#7B35F8] transition-colors cursor-pointer gap-4 py-2"
              >
                <span>{faq.q}</span>
                <span className="shrink-0 text-xl text-[#7B35F8] font-mono transition-transform duration-300">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="mt-2 text-sm sm:text-base text-[#111111]/70 leading-relaxed pr-8 animate-fadeIn">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
