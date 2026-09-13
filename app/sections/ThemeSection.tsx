'use client';

import React from 'react';
import AccordionGallery, { AccordionGalleryItem } from '../components/AccordionGallery';

const THEME_ITEMS: AccordionGalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    tag: 'Track 1',
    label: 'AI-Enabled Hardware',
    description:
      'The home for every hardware-based project — wearables, robotics, IoT devices, embedded systems, drones, and smart devices — that integrates artificial intelligence to make hardware smarter, more autonomous, or more responsive.',
    alt: 'AI-Enabled Hardware',
  },
  {
    image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=80',
    tag: 'Track 2',
    label: 'Health & Emergency Services',
    description:
      'Solutions that improve healthcare delivery, patient outcomes, and emergency response systems — spanning software, apps, and connected devices aimed at hospitals, first responders, rural clinics, and everyday citizens.',
    alt: 'Health & Emergency Services',
  },
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
    tag: 'Track 3',
    label: 'FinTech',
    description:
      'Projects that make financial services more accessible, secure, and efficient — including payments, lending, personal finance, fraud detection, and blockchain-based solutions.',
    alt: 'FinTech',
  },
  {
    image: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=900&q=80',
    tag: 'Track 4',
    label: 'Environmental',
    description:
      'Projects tackling climate, sustainability, and environmental-monitoring challenges — spanning waste management, clean energy, water conservation, and pollution tracking.',
    alt: 'Environmental',
  },
];

export default function ThemeSection() {
  return (
    <section
      id="theme"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-white overflow-hidden border-t border-[#111111]/8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[88vw] lg:max-w-[82rem]">

        {/* Heading */}
        <div className="text-center mb-[2.5rem] md:mb-[3.5rem]">
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#111111] font-normal leading-[1.1]">
            Hackathon Themes
          </h2>
        </div>

        {/* Accordion Gallery */}
        <AccordionGallery
          items={THEME_ITEMS}
          defaultIndex={0}
          accentColor="#7B35F8"
          overlayColor="#06000F"
          textColor="#ffffff"
          gap={8}
          radius={18}
          expandRatio={0.52}
          orientation="horizontal"
          duration={0.55}
          ease="power3.out"
          parallax={0.4}
          tilt={5}
          stagger={0.07}
          trigger="hover"
          showLabels={true}
          grayscale={true}
          className="w-full"
        />
      </div>
    </section>
  );
}
