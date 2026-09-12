import AccordionGallery from './components/AccordionGallery';
import HeroSection from './components/HeroSection';
import ScrollStorySection from './components/ScrollStorySection';
import TimelineSection from './components/TimelineSection';

const galleryItems = [
  { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', label: 'Build', alt: 'Build' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Create', alt: 'Create' },
  { image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', label: 'Launch', alt: 'Launch' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', label: 'Impact', alt: 'Impact' },
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', label: 'Scale', alt: 'Scale' },
];

const exploreLinks = [
  'Registration',
  'Guide',
  'visit last year',
  'Security',
  'Contact',
];

const connectLinks = ['Discord', 'Instagram', 'Twitter', 'LinkedIn', 'WhatsApp'];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#111111]">
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <header className="mb-5 flex items-start justify-between">
          <div className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#111111]">
            SINGULARITY
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center"
          >
            <span className="relative block h-5 w-7">
              <span className="absolute left-0 right-0 top-0 h-px bg-[#111111]" />
              <span className="absolute left-0 right-0 top-2 h-px bg-[#111111]" />
              <span className="absolute left-0 right-0 top-4 h-px bg-[#111111]" />
            </span>
          </button>
        </header>

        <HeroSection />

        <div className="mb-8 md:mb-10">
          <div className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#111111]/55">
            Frequently Asked Questions
          </div>

          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#111111"
            overlayColor="#0d0d0d"
            textColor="#ffffff"
            duration={0.7}
            height={420}
            gap={12}
            radius={18}
            parallax={0.5}
            grayscale
            showLabels
          />
        </div>
      </div>

      <div id="timeline-section" className="w-full">
        <TimelineSection />
      </div>

      {/* Full-width Cinematic Scroll Story & Singularity Reveal Section */}
      <div id="story-section" className="w-full">
        <ScrollStorySection />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <footer className="border-t border-[#111111]/15 pt-8">
          <div className="grid items-start gap-8 md:grid-cols-[1fr_1.2fr_0.9fr]">
            <section>
              <p className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
                Explore
              </p>
              <ul className="space-y-2 text-[1.8rem] leading-[1.15] sm:text-[2.15rem] lg:text-[2.6rem]">
                {exploreLinks.map((link) => (
                  <li key={link} className="font-serif italic tracking-[-0.05em] text-[#111111]">
                    {link}
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex items-center justify-center">
              <div className="blob-art" aria-hidden="true">
                <span className="blob blob-one" />
                <span className="blob blob-two" />
                <span className="blob blob-three" />
              </div>
            </div>

            <section className="justify-self-end">
              <p className="mb-6 text-right text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#111111]/55">
                Connect
              </p>
              <ul className="space-y-2 text-right text-[1.8rem] leading-[1.15] sm:text-[2.15rem] lg:text-[2.6rem]">
                {connectLinks.map((link) => (
                  <li key={link} className="font-serif italic tracking-[-0.05em] text-[#111111]">
                    {link}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-t border-[#111111]/15 pt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#111111]/55">
            <span>Where innovation meets shakti</span>
            <span className="text-right">Copyright 2026 FIEM ACM Student Chapter</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
