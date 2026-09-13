'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_PATH_D =
  'M9.001 4C9.001 4 -15.155 65.5 50.5 133.5C116.155 201.5 229.557 204.076 294.5 296.5C352.121 378.5 348.348 441.21 440.5 512C550.5 596.5 710.501 479.853 862.001 535C955 568.5 1010 720 1040 820C1080 955 1120 1100 1184.5 1180C1240 1250 1280 1380 1220 1500C1150 1640 980 1680 880 1780C780 1880 720 1980 780 2100C850 2240 980 2320 1100 2420C1180 2490 1240 2580 1184.5 2680';

// Activation progress thresholds for the 8 milestones along the path
const STAGE_THRESHOLDS = [0.01, 0.20, 0.34, 0.42, 0.58, 0.72, 0.82, 0.94];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const desktopDotRef = useRef<SVGGElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const mobileDotRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stage-card');
      const cachedCards = cards.map((card, idx) => ({
        card,
        threshold: STAGE_THRESHOLDS[idx] ?? 1,
        numEl: card.querySelector<HTMLElement>('.stage-number'),
        titleEl: card.querySelector<HTMLElement>('.stage-title'),
        lineEl: card.querySelector<HTMLElement>('.stage-line'),
        dotMarker: card.querySelector<HTMLElement>('.stage-marker-dot'),
      }));

      [
        { path: desktopPathRef.current, dot: desktopDotRef.current },
        { path: mobilePathRef.current, dot: mobileDotRef.current },
      ].forEach(({ path, dot }) => {
        if (!path) return;
        const totalLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        let cachedCorr = 1;
        const updateAspectCorrection = () => {
          const svgEl = path.ownerSVGElement;
          if (!svgEl) return;
          const rect = svgEl.getBoundingClientRect();
          const vb = svgEl.viewBox?.baseVal;
          const vbW = vb?.width || 1320;
          const vbH = vb?.height || 2800;
          if (rect.width > 0 && rect.height > 0) {
            cachedCorr = (rect.height / vbH) / (rect.width / vbW);
          }
        };
        updateAspectCorrection();

        if (dot) {
          const startPt = path.getPointAtLength(0);
          dot.setAttribute('transform', `translate(${startPt.x}, ${startPt.y}) scale(${cachedCorr}, 1)`);
          dot.style.opacity = '0';
        }

        // Properly synchronized ScrollTrigger
        ScrollTrigger.create({
          trigger: railRef.current ?? container,
          start: 'top 20%',
          end: 'bottom 75%',
          scrub: 0.35,
          onRefresh: updateAspectCorrection,
          onUpdate: (self) => {
            const p = self.progress;
            const drawnLength = p * totalLength;
            gsap.set(path, { strokeDashoffset: totalLength - drawnLength });

            if (dot) {
              const point = path.getPointAtLength(drawnLength);
              dot.setAttribute('transform', `translate(${point.x}, ${point.y}) scale(${cachedCorr}, 1)`);
              dot.style.opacity = p > 0.002 ? '1' : '0';
            }

            // Dynamic stage illumination without DOM query overhead
            cachedCards.forEach(({ card, threshold, numEl, titleEl, lineEl, dotMarker }) => {
              const isPassed = p >= threshold;

              if (isPassed && card.dataset.active !== 'true') {
                card.dataset.active = 'true';
                if (numEl) {
                  gsap.to(numEl, {
                    color: '#0A0A0A',
                    scale: 1.05,
                    duration: 0.45,
                    ease: 'back.out(2)',
                    overwrite: 'auto',
                  });
                }
                if (titleEl) {
                  gsap.to(titleEl, {
                    color: '#6D28D9',
                    textShadow: '0 0 18px rgba(123, 53, 248, 0.45)',
                    duration: 0.35,
                    overwrite: 'auto',
                  });
                }
                if (lineEl) {
                  gsap.to(lineEl, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
                if (dotMarker) {
                  gsap.to(dotMarker, {
                    backgroundColor: '#7B35F8',
                    borderColor: '#7B35F8',
                    boxShadow: '0 0 16px #7B35F8',
                    scale: 1.3,
                    duration: 0.35,
                    overwrite: 'auto',
                  });
                }
              } else if (!isPassed && card.dataset.active === 'true') {
                card.dataset.active = 'false';
                if (numEl) {
                  gsap.to(numEl, {
                    color: '#ADADAD',
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
                if (titleEl) {
                  gsap.to(titleEl, {
                    color: '#7B35F8',
                    textShadow: 'none',
                    duration: 0.3,
                    overwrite: 'auto',
                  });
                }
                if (lineEl) {
                  gsap.to(lineEl, {
                    scaleX: 0.75,
                    opacity: 0.7,
                    duration: 0.4,
                    overwrite: 'auto',
                  });
                }
                if (dotMarker) {
                  gsap.to(dotMarker, {
                    backgroundColor: '#FFFFFF',
                    borderColor: '#7B35F8',
                    boxShadow: '0 0 10px #CDB3FC',
                    scale: 1,
                    duration: 0.3,
                    overwrite: 'auto',
                  });
                }
              }
            });
          },
        });
      });

      // Staggered scroll entrance reveal for each milestone stage
      cards.forEach((card) => {
        const num = card.querySelector<HTMLElement>('.stage-number');
        const content = card.querySelectorAll<HTMLElement>('.stage-title, .stage-line, p');

        gsap.set(card, { opacity: 0, y: 32 });
        if (num) gsap.set(num, { opacity: 0, scale: 0.85 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
            });
            if (num) {
              gsap.to(num, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.8)',
              });
            }
            gsap.fromTo(
              content,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.1 }
            );
          },
        });
      });
    }, container);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative z-10 flex w-full flex-col items-center overflow-x-clip bg-white px-[4vw] pt-[10vh] pb-[4rem] md:px-[5vw] md:pt-[12vh] md:pb-[5rem] lg:px-[6vw] lg:pt-[14vh] lg:pb-[6rem] border-t border-[#111111]/8"
    >
      {/* Header */}
      <div className="flex w-full max-w-[88rem] flex-col items-center gap-[1.5rem] md:gap-[2rem]">
        <h2 className="text-center font-seasonmix text-[clamp(2.4rem,6vw,4rem)] font-normal text-black" aria-label="Timeline">
          Timeline
        </h2>
        <div className="relative flex w-full max-w-[62rem] justify-center px-[1rem] md:px-0">
          <p className="text-center font-sans text-[clamp(0.95rem,2.2vw,1.1rem)] leading-[1.8] text-black/75 md:text-[clamp(1.15rem,1.6vw,1.35rem)] md:leading-[1.9]">
            From registration to victory — walk the path of innovation through our celebration of code, culture, and creation.
          </p>
        </div>
      </div>

      {/* Rail Container */}
      <div
        ref={railRef}
        className="relative mt-[4vh] w-full max-w-[85rem] lg:-mt-[4vh] lg:h-[155vw] xl:-mt-[6vh] xl:h-[145vw] 2xl:-mt-[8vh] 2xl:h-[135vw]"
      >
        {/* Desktop Animated Winding Path */}
        <div className="pointer-events-none absolute top-[8%] left-[0%] right-[24%] xl:right-[26%] 2xl:right-[28%] hidden h-[90%] lg:block" aria-hidden="true">
          <svg viewBox="-40 -40 1320 2800" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="timelinePaint" x1="200" y1="0" x2="1000" y2="2600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CDB3FC" />
                <stop offset="0.45" stopColor="#7B35F8" />
                <stop offset="1" stopColor="#CDB3FC" />
              </linearGradient>
            </defs>
            {/* Guide track */}
            <path
              d={DESKTOP_PATH_D}
              stroke="#EAEAEA"
              strokeWidth={6.5}
              strokeLinecap="round"
              strokeDasharray="14 16"
              fill="none"
            />
            {/* Active drawing stroke */}
            <path
              ref={desktopPathRef}
              d={DESKTOP_PATH_D}
              stroke="url(#timelinePaint)"
              strokeWidth={6.5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Traveling indicator dot */}
            <g ref={desktopDotRef} style={{ opacity: 0 }}>
              <circle
                r="10"
                fill="white"
                stroke="#7B35F8"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 12px #CDB3FC)' }}
              />
              <circle r="3.5" fill="#7B35F8" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* Mobile Straight Vertical Path */}
        <div className="pointer-events-none absolute top-2 bottom-2 left-[1.15rem] w-[1.5rem] lg:hidden" aria-hidden="true">
          <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <path d="M12 0 L12 1000" stroke="#EAEAEA" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 8" fill="none" />
            <path ref={mobilePathRef} d="M12 0 L12 1000" stroke="#7B35F8" strokeWidth={3} strokeLinecap="round" fill="none" />
            <g ref={mobileDotRef} style={{ opacity: 0 }}>
              <circle
                r="6"
                fill="white"
                stroke="#7B35F8"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 8px #CDB3FC)' }}
              />
            </g>
          </svg>
        </div>

        {/* Milestone Cards 1-8 */}
        <div className="relative z-20 mt-[2.5rem] flex w-full flex-col items-center gap-[2.5rem] md:gap-[3rem] lg:mt-0 lg:block lg:h-full lg:gap-0">
          {/* Milestone 1 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[5%] lg:left-[4%] xl:left-[8%] 2xl:left-[6%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">1</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Registration Opens</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">17 August</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">The gates of HackSpire&apos;26 open. Register, gather your team, and begin preparing for a journey shaped by tradition and innovation.</p>
              </div>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[17%] lg:left-auto lg:right-[4%] xl:right-[6%] 2xl:right-[8%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">2</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">PPT Submission Window</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">03-15 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">PPT submission on the registration portal is mandatory. Teams must submit during this window - keep slides concise and true to your idea.</p>
              </div>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[30%] lg:left-[3%] xl:left-[6%] 2xl:left-[5%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">3</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Registration Deadline</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">07 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">Final call to secure your place among the builders of HackSpire&apos;26. Last chance to join before the path ahead closes.</p>
              </div>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[26rem] lg:pl-0 xl:max-w-[29rem] 2xl:max-w-[32rem] lg:top-[44%] lg:left-auto lg:right-[-2vw] xl:right-[-3.5vw] 2xl:right-[-5vw] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">4</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">First Rolling Approval</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">15 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">The review panel begins evaluating submissions. Approved teams receive next-step guidance and access to what comes next.</p>
              </div>
            </div>
          </div>

          {/* Milestone 5 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[57%] lg:left-[6%] xl:left-[10%] 2xl:left-[8%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">5</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Second Rolling Approval</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">20 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">Further approvals roll out. If your submission was pending earlier, watch for status updates and instructions.</p>
              </div>
            </div>
          </div>

          {/* Milestone 6 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[26rem] lg:pl-0 xl:max-w-[29rem] 2xl:max-w-[32rem] lg:top-[70%] lg:left-auto lg:right-[-1vw] xl:right-[-2vw] 2xl:right-[-3.5vw] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">6</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Last Rolling Approval</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">24 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">Final approvals before the hackathon begins. Confirm team details and ensure every submission is complete.</p>
              </div>
            </div>
          </div>

          {/* Milestone 7 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[82%] lg:left-[4%] xl:left-[7%] 2xl:left-[6%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">7</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Hack Begins</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">02 October</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">Building begins. Ideas take form, collaboration deepens, and innovation drives every line of code.</p>
              </div>
            </div>
          </div>

          {/* Milestone 8 */}
          <div className="stage-card group relative z-20 flex w-full max-w-[20rem] items-start pl-[2.8rem] md:max-w-[26rem] md:pl-[3.2rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[93%] lg:left-auto lg:right-[6%] xl:right-[10%] 2xl:right-[8%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-white transition-all duration-300" style={{ borderColor: '#7B35F8', boxShadow: '0 0 10px #CDB3FC' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#ADADAD] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">8</h3>
            </div>
            <div className="flex flex-col px-2 pt-1 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-sans font-medium leading-tight text-[#7B35F8] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Celebration &amp; Close</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-black/85">03 October</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-black/75">Final presentations bring the journey to its peak. Winners are celebrated, bonds are forged, and HackSpire&apos;26 finds its close.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
