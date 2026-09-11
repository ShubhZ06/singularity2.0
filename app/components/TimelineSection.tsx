'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TimelineSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    number: '1',
    date: '17 August',
    title: 'Registration Opens',
    description:
      "The gates of HackSpire'26 open. Register, gather your team, and begin preparing for a journey shaped by tradition and innovation.",
    side: 'left',
    topPercent: 4.35,
  },
  {
    number: '2',
    date: '03-15 September',
    title: 'PPT Submission Window',
    description:
      'PPT submission on the registration portal is mandatory. Teams must submit during this window - keep slides concise and true to your idea.',
    side: 'right',
    topPercent: 17.39,
  },
  {
    number: '3',
    date: '07 September',
    title: 'Registration Deadline',
    description:
      "Final call to secure your place among the builders of HackSpire'26. Last chance to join before the path ahead closes.",
    side: 'left',
    topPercent: 30.43,
  },
  {
    number: '4',
    date: '15 September',
    title: 'First Rolling Approval',
    description:
      'The review panel begins evaluating submissions. Approved teams receive next-step guidance and access to what comes next.',
    side: 'right',
    topPercent: 43.48,
  },
  {
    number: '5',
    date: '20 September',
    title: 'Second Rolling Approval',
    description:
      'Further approvals roll out. If your submission was pending earlier, watch for status updates and instructions.',
    side: 'left',
    topPercent: 56.52,
  },
  {
    number: '6',
    date: '24 September',
    title: 'Last Rolling Approval',
    description:
      'Final approvals before the hackathon begins. Confirm team details and ensure every submission is complete.',
    side: 'right',
    topPercent: 69.57,
  },
  {
    number: '7',
    date: '02 October',
    title: 'Hack Begins',
    description:
      'Twenty-six hours of building begin. Ideas take form, collaboration deepens, and Shakti drives every line of code.',
    side: 'left',
    topPercent: 82.61,
  },
  {
    number: '8',
    date: '03 October',
    title: 'Celebration & Close',
    description:
      "Final presentations bring the journey to its peak. Winners are celebrated, bonds are forged, and HackSpire'26 finds its close.",
    side: 'right',
    topPercent: 95.65,
  },
];

// Mathematically perfect serpentine S-curve connecting X=200 and X=800 inside 1000x2300 viewBox
const DESKTOP_PATH_D =
  'M 200 100 C 200 250, 800 250, 800 400 C 800 550, 200 550, 200 700 C 200 850, 800 850, 800 1000 C 800 1150, 200 1150, 200 1300 C 200 1450, 800 1450, 800 1600 C 800 1750, 200 1750, 200 1900 C 200 2050, 800 2050, 800 2200';

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const desktopDotRef = useRef<HTMLDivElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const mobileDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles['timeline-card']}`);

      [desktopPathRef.current, mobilePathRef.current].forEach((path, i) => {
        if (!path) return;
        const dot = i === 0 ? desktopDotRef.current : mobileDotRef.current;
        const totalLength = path.getTotalLength();
        const viewBox = path.ownerSVGElement?.viewBox.baseVal;
        const vbX = viewBox?.x ?? 0;
        const vbY = viewBox?.y ?? 0;
        const vbWidth = viewBox?.width || 1;
        const vbHeight = viewBox?.height || 1;

        gsap.set(path, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        // Pre-sample path points to convert vertical scroll progress into exact arc-length
        const SAMPLES = 250;
        const samples: { len: number; y: number }[] = [];
        for (let s = 0; s <= SAMPLES; s++) {
          const len = (s / SAMPLES) * totalLength;
          samples.push({ len, y: path.getPointAtLength(len).y });
        }
        const minY = samples[0].y;
        const maxY = samples[samples.length - 1].y;

        const lengthForProgress = (progress: number) => {
          const clamped = Math.max(0, Math.min(1, progress));
          const targetY = minY + clamped * (maxY - minY);
          for (let s = 1; s < samples.length; s++) {
            if (samples[s].y >= targetY) {
              const prev = samples[s - 1];
              const curr = samples[s];
              const span = curr.y - prev.y;
              const t = span !== 0 ? (targetY - prev.y) / span : 0;
              return prev.len + t * (curr.len - prev.len);
            }
          }
          return totalLength;
        };

        ScrollTrigger.create({
          trigger: railRef.current ?? container,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            const drawnLength = lengthForProgress(p);
            gsap.set(path, { strokeDashoffset: totalLength - drawnLength });

            if (dot) {
              const point = path.getPointAtLength(drawnLength);
              const leftPct = ((point.x - vbX) / vbWidth) * 100;
              const topPct = ((point.y - vbY) / vbHeight) * 100;
              gsap.set(dot, {
                left: `${leftPct}%`,
                top: `${topPct}%`,
                opacity: p > 0.005 ? 1 : 0,
              });
            }
          },
        });
      });

      cards.forEach((card) => {
        const marker = card.querySelector<HTMLElement>(`.${styles['timeline-marker']} span`);
        const number = card.querySelector<HTMLElement>(`.${styles['timeline-number']}`);
        const content = card.querySelectorAll<HTMLElement>(
          [
            styles['timeline-title'],
            styles['timeline-underline'],
            styles['timeline-date'],
            styles['timeline-copy'],
          ]
            .map((c) => `.${c}`)
            .join(', ')
        );

        gsap.set([number, ...Array.from(content)], { opacity: 0, y: 30 });
        if (marker) gsap.set(marker, { scale: 0.5, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to([number, ...Array.from(content)], {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
            });
            if (marker) {
              gsap.to(marker, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' });
            }
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
    <section id="timeline" className={styles['timeline-section']} ref={containerRef}>
      <div className={styles['timeline-header']}>
        <h2 className={styles['timeline-heading']}>Timeline</h2>
        <p className={styles['timeline-subheading']}>
          From registration to victory - walk the path of Shakti through our 26-hour celebration of code, culture, and
          creation.
        </p>
      </div>

      <div className={styles['timeline-rail']} ref={railRef}>
        {/* Desktop S-Curve Winding SVG Path */}
        <div className={styles['timeline-svg-desktop']} aria-hidden="true">
          <svg viewBox="0 0 1000 2300" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="timelinePaint" x1="200" y1="0" x2="800" y2="2300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CDB3FC" />
                <stop offset="0.5" stopColor="#7B35F8" />
                <stop offset="1" stopColor="#CDB3FC" />
              </linearGradient>
            </defs>
            {/* Background Dashed Guide Path */}
            <path
              d={DESKTOP_PATH_D}
              stroke="#E5E7EB"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="12 14"
              fill="none"
            />
            {/* Animated Scroll Progress Path */}
            <path
              ref={desktopPathRef}
              d={DESKTOP_PATH_D}
              stroke="url(#timelinePaint)"
              strokeWidth={5}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div
            ref={desktopDotRef}
            className={`${styles['timeline-path-dot']} ${styles['timeline-path-dot--desktop']}`}
            aria-hidden="true"
          >
            <span className={styles['timeline-path-dot-core']} />
          </div>
        </div>

        {/* Mobile Straight Vertical Path */}
        <div className={styles['timeline-svg-mobile']} aria-hidden="true">
          <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <path d="M12 0 L12 1000" stroke="#E5E7EB" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 8" fill="none" />
            <path
              ref={mobilePathRef}
              d="M12 0 L12 1000"
              stroke="#7B35F8"
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div
            ref={mobileDotRef}
            className={`${styles['timeline-path-dot']} ${styles['timeline-path-dot--mobile']}`}
            aria-hidden="true"
          />
        </div>

        {/* Cards Container */}
        <div className={styles['timeline-list']}>
          {milestones.map((item) => (
            <article
              key={item.number}
              className={`${styles['timeline-card']} ${styles[`timeline-card--${item.side}`]}`}
              style={{ '--card-top': `${item.topPercent}%` } as React.CSSProperties}
            >
              <span className={styles['timeline-marker']} aria-hidden="true">
                <span />
              </span>
              <div className={styles['timeline-number']}>{item.number}</div>
              <div className={styles['timeline-content']}>
                <h3 className={styles['timeline-title']}>{item.title}</h3>
                <div className={styles['timeline-underline']} aria-hidden="true" />
                <div className={styles['timeline-meta']}>
                  <p className={styles['timeline-date']}>{item.date}</p>
                  <p className={styles['timeline-copy']}>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

