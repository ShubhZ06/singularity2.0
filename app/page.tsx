'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Header, HeroSection, AboutSection } from './sections';
import FullScreenMenu from './components/FullScreenMenu';

// Lazy load off-screen sections to drastically reduce initial JS payload and maximize Core Web Vitals
const PastEditionSection = dynamic(() => import('./sections/PastEditionSection'), {
  loading: () => <div className="min-h-[50vh] w-full bg-white animate-pulse" />,
});

const ThemeSection = dynamic(() => import('./sections/ThemeSection'), {
  loading: () => <div className="min-h-[35vh] w-full bg-white animate-pulse" />,
});

const TimelineSection = dynamic(() => import('./sections/TimelineSection'), {
  loading: () => <div className="min-h-[50vh] w-full bg-white animate-pulse" />,
});

const SponsorsSection = dynamic(() => import('./sections/SponsorsSection'), {
  loading: () => <div className="min-h-[35vh] w-full bg-white animate-pulse" />,
});

const FaqSection = dynamic(() => import('./sections/FaqSection'), {
  loading: () => <div className="min-h-[35vh] w-full bg-white animate-pulse" />,
});

const StorySection = dynamic(() => import('./sections/StorySection'), {
  loading: () => <div className="min-h-[60vh] w-full bg-white animate-pulse" />,
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#111111] overflow-x-clip">
      {/* Floating Sticky Header with logo and full-screen menu trigger */}
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      {/* 1. Critical Above-the-fold Hero Section */}
      <div id="hero">
        <HeroSection onOpenMenu={() => setIsMenuOpen(true)} />
      </div>

      {/* 2. Immediate Next Section */}
      <div id="about-section" className="mx-auto w-full max-w-[94vw] px-[3vw] pt-[2vw] sm:px-[4vw] lg:px-[5vw]">
        <AboutSection />
      </div>

      {/* 3. Lazy-loaded ScrollExpand Past Edition Section */}
      <PastEditionSection />

      {/* 4. Lazy-loaded Themes Grid */}
      <div id="theme-section" className="mx-auto w-full max-w-[94vw] px-[3vw] pb-[2vw] pt-[1.5vw] sm:px-[4vw] lg:px-[5vw]">
        <ThemeSection />
      </div>

      {/* 5. Lazy-loaded Timeline Section */}
      <div id="timeline-section" className="w-full bg-white">
        <TimelineSection />
      </div>

      {/* 6. Lazy-loaded Sponsors Section */}
      <div id="sponsors-section" className="w-full bg-white">
        <SponsorsSection />
      </div>

      {/* 7. Lazy-loaded FAQ Section with Accordion Gallery */}
      <div id="faq-section" className="w-full bg-white">
        <div className="mx-auto w-full max-w-[94vw] px-[3vw] sm:px-[4vw] lg:px-[5vw]">
          <FaqSection />
        </div>
      </div>

      {/* 8. Lazy-loaded Cinematic Story Section with Integrated Footer Finale */}
      <div id="story-section" className="w-full bg-white">
        <StorySection />
      </div>

      {/* Full-Screen Menu Modal (White BG, Black Typography) */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </main>
  );
}
