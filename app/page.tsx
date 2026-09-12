import dynamic from 'next/dynamic';
import { HeroSection, AboutSection } from './sections';

// Lazy load off-screen sections to drastically reduce initial JS payload and maximize Core Web Vitals
const PastEditionSection = dynamic(() => import('./sections/PastEditionSection'), {
  loading: () => <div className="min-h-[600px] w-full bg-white animate-pulse" />,
});

const ThemeSection = dynamic(() => import('./sections/ThemeSection'), {
  loading: () => <div className="min-h-[400px] w-full bg-white animate-pulse" />,
});

const TimelineSection = dynamic(() => import('./sections/TimelineSection'), {
  loading: () => <div className="min-h-[600px] w-full bg-white animate-pulse" />,
});

const SponsorsSection = dynamic(() => import('./sections/SponsorsSection'), {
  loading: () => <div className="min-h-[400px] w-full bg-white animate-pulse" />,
});

const FaqSection = dynamic(() => import('./sections/FaqSection'), {
  loading: () => <div className="min-h-[400px] w-full bg-white animate-pulse" />,
});

const StorySection = dynamic(() => import('./sections/StorySection'), {
  loading: () => <div className="min-h-[700px] w-full bg-white animate-pulse" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* 1. Critical Above-the-fold Hero Section */}
      <HeroSection />

      {/* 2. Immediate Next Section */}
      <div className="mx-auto max-w-[1600px] px-5 pt-6 sm:px-8 lg:px-10">
        <AboutSection />
      </div>

      {/* 3. Lazy-loaded ScrollExpand Past Edition Section */}
      <PastEditionSection />

      {/* 4. Lazy-loaded Themes Grid */}
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-6 sm:px-8 lg:px-10">
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
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
          <FaqSection />
        </div>
      </div>

      {/* 8. Lazy-loaded Cinematic Story Section with Integrated Footer Finale */}
      <div id="story-section" className="w-full bg-white">
        <StorySection />
      </div>
    </main>
  );
}
