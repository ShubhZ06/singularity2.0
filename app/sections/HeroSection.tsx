'use client';

import React from 'react';

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  { value: '26', label: 'Hours', sublabel: 'Non-stop In-Person Hack' },
  { value: '4,100+', label: 'Builders', sublabel: 'HackSpire Community' },
  { value: '2-3 OCT', label: 'Dates', sublabel: 'Durga Puja Season 2026' },
  { value: 'FREE', label: 'Entry', sublabel: 'Food, Swag & Mentorship' },
];

export default function HeroSection() {
  const scrollToTimeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string, opts?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo('#timeline-section', { offset: -20, duration: 1.2 });
    } else {
      const element = document.getElementById('timeline-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative mb-14 w-full rounded-3xl overflow-hidden bg-white border border-[#111111]/8 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.04)] py-12 px-6 md:px-12 lg:px-16">
      {/* Background Decorative Mesh & Dots */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,17,17,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden [transform:translateZ(0)]">
        <div className="absolute -top-[10%] left-[15%] h-[380px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(169,232,255,0.5)_0%,rgba(120,180,255,0.2)_50%,transparent_75%)] blur-[40px] animate-float-one will-change-transform [transform:translateZ(0)]" />
        <div className="absolute top-[20%] right-[10%] h-[420px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,180,220,0.45)_0%,rgba(215,140,255,0.18)_50%,transparent_75%)] blur-[45px] animate-float-two will-change-transform [transform:translateZ(0)]" />
        <div className="absolute -bottom-[5%] left-[35%] h-[350px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(150,255,230,0.4)_0%,rgba(100,210,240,0.15)_50%,transparent_75%)] blur-[40px] animate-float-three will-change-transform [transform:translateZ(0)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Top Pills / Badges */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#111111]/15 bg-white/90 px-4 py-1.5 backdrop-blur-md text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#111111] shadow-sm">
            <span className="relative inline-flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse-dot" />
            </span>
            <span>Registration Open</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#111111]/10 bg-white/80 px-4 py-1.5 backdrop-blur-md text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#111111]/70">
            <span>FIEM ACM STUDENT CHAPTER</span>
          </div>
        </div>

        {/* Main Title Section */}
        <div className="mb-6 space-y-2">
          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic tracking-tight text-[#111111]/80 font-normal">
            Where Innovation Meets Shakti
          </p>

          <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold uppercase tracking-[-0.04em] leading-[0.9] text-[#111111]">
            SINGULARITY <span className="font-sans text-3xl sm:text-5xl md:text-6xl align-top text-[#111111]/40">&apos;26</span>
          </h1>
        </div>

        {/* Description Paragraph */}
        <p className="mx-auto mb-10 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[#111111]/75 font-normal">
          Kolkata’s premier 26-hour offline student hackathon. Bringing together passionate minds to turn bold ideas into impactful reality during West Bengal’s celebrated festive season.
        </p>

        {/* Call To Action Buttons */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Devfolio Registration Button */}
          <a
            href="https://hackspire26.devfolio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#111111] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition-all duration-300 hover:bg-[#222222] hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Devfolio Logo SVG */}
            <svg width="20" height="20" viewBox="0 0 60.3 66.2" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
              <path d="M60.3 36.4C60.3 52 48.6 64.7 33.8 66c0 0-19.1.5-25.4-.1-2.4-.3-4.4-1.8-5.3-4 .9.4 1.8.7 2.8.8 2.1.2 5.6.3 10.5.3 7.2 0 15.1-.2 15.1-.2h.1c7.9-.7 15.2-4.3 20.4-10.2 4.5-5 7.4-11.3 8.2-17.9.1.5.1 1.1.1 1.7z" />
              <path d="M58 30c0 15.6-11.7 28.3-26.6 29.5 0 0-19.1.5-25.4-.1-3.4-.3-5.9-3.5-6-7.1l.1-45C.2 3.7 2.8.5 6.2.2c6.3-.5 25.4.1 25.4.1C46.4 1.6 58 14.4 58 30z" />
            </svg>
            <span>Register via Devfolio</span>
          </a>

          {/* Discord Community Button */}
          <a
            href="https://discord.gg/KVjtT7Ursg"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#111111]/20 bg-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#111111] shadow-md transition-all duration-300 hover:border-[#111111]/40 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Discord Logo SVG */}
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
            <span>Join Discord</span>
          </a>

          {/* Scroll anchor button */}
          <button
            type="button"
            onClick={scrollToTimeline}
            className="inline-flex items-center gap-2 px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#111111] transition-colors cursor-pointer"
          >
            <span>Explore Schedule</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center transition-all duration-300 bg-white/85 backdrop-blur-md border border-[#111111]/8 hover:-translate-y-1 hover:bg-white hover:border-[#111111]/20 hover:shadow-lg"
            >
              <div className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#111111]/80">
                {stat.label}
              </div>
              <div className="mt-0.5 text-[0.68rem] font-medium text-[#111111]/55">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
