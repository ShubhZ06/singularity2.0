import {
  Header,
  HeroSection,
  AboutSection,
  PastEditionSection,
  ThemeSection,
  TimelineSection,
  SponsorsSection,
  FaqSection,
  StorySection,
  Footer,
} from './sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <Header />
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-3 sm:px-8 lg:px-10">
        <HeroSection />
        <AboutSection />
        <PastEditionSection />
        <ThemeSection />
      </div>

      {/* 5. Timeline Section */}
      <div id="timeline-section" className="w-full bg-white">
        <TimelineSection />
      </div>

      {/* 6. Sponsors Section (immediately following Timeline) */}
      <div id="sponsors-section" className="w-full bg-white">
        <SponsorsSection />
      </div>

      {/* 7. FAQ Section */}
      <div id="faq-section" className="w-full bg-white">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
          <FaqSection />
        </div>
      </div>

      {/* 8. Full-width Cinematic Scroll Story & Singularity Reveal Section */}
      <div id="story-section" className="w-full bg-white">
        <StorySection />
      </div>

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
