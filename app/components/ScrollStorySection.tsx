'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ScrollStorySection.module.css';
import Lightning from './Lightning';

interface ScrollStorySectionProps {
  quote?: string;
  wordmark?: string;
  onMenuClick?: () => void;
}

const DEFAULT_QUOTE =
  'This is not just a hackathon. It is an invocation of Shakti, where the devotion of Durga Puja merges with the rhythm of code, discovering peace within technology.';

export default function ScrollStorySection({
  quote = DEFAULT_QUOTE,
  wordmark = 'SINGULARITY',
  onMenuClick,
}: ScrollStorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const thisIsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const bgWhiteRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Split quote into words for typography
  const quoteWords = React.useMemo(() => {
    return quote.split(' ');
  }, [quote]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let targetProgress = 0;
    let smoothProgress = 0;

    // Organic blob anchors for ink bloom
    const blobAnchors = [
      { rx: 0.50, ry: 0.48, baseR: 0.28, phase: 0.0, speed: 0.25, maxAlpha: 0.95 },
      { rx: 0.32, ry: 0.42, baseR: 0.24, phase: 1.2, speed: 0.20, maxAlpha: 0.85 },
      { rx: 0.68, ry: 0.52, baseR: 0.26, phase: 2.5, speed: 0.18, maxAlpha: 0.90 },
      { rx: 0.45, ry: 0.26, baseR: 0.20, phase: 3.8, speed: 0.22, maxAlpha: 0.75 },
      { rx: 0.55, ry: 0.72, baseR: 0.22, phase: 4.9, speed: 0.19, maxAlpha: 0.80 },
    ];

    let time = 0;

    // Real-time calculation of scroll progress relative to this pinned container
    const calcProgress = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / totalScrollable));
    };

    const updateScroll = () => {
      targetProgress = calcProgress();
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    targetProgress = calcProgress();
    smoothProgress = targetProgress;

    // Main animation loop
    const render = () => {
      // Re-read progress on every frame for immediate response to Lenis & native scrolling
      targetProgress = calcProgress();

      // Silky smooth lerp interpolation
      smoothProgress += (targetProgress - smoothProgress) * 0.12;
      const p = smoothProgress;
      time += 0.008;

      // =========================================================================
      // 1. BACKGROUND CROSSFADE (Pure White -> Pitch Black)
      // Screen stays 100% white through Quote & "This is..."
      // Transitions to black between 0.36 and 0.48
      // Solid pitch black from 0.48 onwards!
      // =========================================================================
      if (bgBlackRef.current && bgWhiteRef.current) {
        if (p < 0.36) {
          bgBlackRef.current.style.opacity = '0';
          bgWhiteRef.current.style.opacity = '1';
        } else if (p < 0.48) {
          const t = (p - 0.36) / 0.12;
          const ease = t * t * (3 - 2 * t);
          bgBlackRef.current.style.opacity = String(Math.min(1, Math.max(0, ease)));
          bgWhiteRef.current.style.opacity = String(Math.min(1, Math.max(0, 1 - ease)));
        } else {
          bgBlackRef.current.style.opacity = '1';
          bgWhiteRef.current.style.opacity = '0';
        }
      }

      // =========================================================================
      // HEADER & STATUS COLOR INTERPOLATION
      // Dark text on white canvas, crisp white text on black canvas
      // =========================================================================
      if (headerRef.current) {
        if (p < 0.40) {
          headerRef.current.style.color = '#0A0A0A';
        } else if (p < 0.48) {
          const t = (p - 0.40) / 0.08;
          const c = Math.round(10 + (255 - 10) * t);
          headerRef.current.style.color = `rgb(${c}, ${c}, ${c})`;
        } else {
          headerRef.current.style.color = '#FFFFFF';
        }
      }
      if (statusRef.current) {
        statusRef.current.style.color = p < 0.44 ? '#0A0A0A' : '#FFFFFF';
      }

      // =========================================================================
      // STEP 1A: QUOTE TEXT (0.00 - 0.16) - Pure White Canvas
      // =========================================================================
      if (quoteRef.current) {
        if (p < 0.08) {
          quoteRef.current.style.opacity = '1';
          quoteRef.current.style.filter = 'blur(0px)';
          quoteRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p < 0.16) {
          const t = (p - 0.08) / 0.08;
          const op = Math.max(0, 1 - t);
          const blur = t * 16;
          quoteRef.current.style.opacity = String(op);
          quoteRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          quoteRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${(1 - t * 0.03).toFixed(3)})`;
        } else {
          quoteRef.current.style.opacity = '0';
          quoteRef.current.style.filter = 'blur(16px)';
        }
      }

      // =========================================================================
      // STEP 1B: "This is..." (0.16 - 0.34) - Pure White Canvas
      // =========================================================================
      if (thisIsRef.current) {
        if (p < 0.16 || p > 0.34) {
          thisIsRef.current.style.opacity = '0';
          thisIsRef.current.style.filter = 'blur(20px)';
        } else if (p >= 0.16 && p < 0.23) {
          // Enters from soft blur, scaling down to 1.0
          const t = (p - 0.16) / 0.07;
          const op = Math.min(1, t);
          const blur = (1 - t) * 16;
          const scale = 1.4 - t * 0.4;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        } else if (p >= 0.23 && p < 0.29) {
          // Locked in center, crystal sharp on pure white
          thisIsRef.current.style.opacity = '1';
          thisIsRef.current.style.filter = 'blur(0px)';
          thisIsRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p >= 0.29 && p <= 0.34) {
          // Dissolves forward
          const t = (p - 0.29) / 0.05;
          const op = Math.max(0, 1 - t);
          const blur = t * 16;
          const scale = 1.0 + t * 0.12;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        }
      }

      // =========================================================================
      // STEP 1C: FLUID INK BLOOM TO BLACK (0.32 - 0.48)
      // =========================================================================
      if (p >= 0.32 && p <= 0.48) {
        let canvasAlpha = 1;
        if (p < 0.35) {
          canvasAlpha = (p - 0.32) / 0.03;
        } else if (p > 0.45) {
          canvasAlpha = Math.max(0, 1 - (p - 0.45) / 0.03);
        }
        canvas.style.opacity = String(Math.min(1, Math.max(0, canvasAlpha)));
        ctx.clearRect(0, 0, width, height);

        const progressGrowth = (p - 0.32) / 0.14;
        const expansion = 0.40 + progressGrowth * 2.1;
        const darknessMultiplier = Math.min(1, 0.45 + progressGrowth * 0.75);
        const minDim = Math.min(width, height);

        blobAnchors.forEach((blob) => {
          const driftX = Math.cos(time * blob.speed + blob.phase) * (minDim * 0.025);
          const driftY = Math.sin(time * blob.speed * 0.8 + blob.phase) * (minDim * 0.025);

          const cx = blob.rx * width + driftX;
          const cy = blob.ry * height + driftY;
          const r = blob.baseR * minDim * expansion;

          if (r <= 0) return;

          const grad = ctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
          const a = Math.min(0.96, blob.maxAlpha * darknessMultiplier);

          grad.addColorStop(0.0, `rgba(12, 12, 12, ${a})`);
          grad.addColorStop(0.35, `rgba(22, 22, 22, ${a * 0.85})`);
          grad.addColorStop(0.65, `rgba(45, 45, 45, ${a * 0.45})`);
          grad.addColorStop(1.0, 'rgba(80, 80, 80, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        canvas.style.opacity = '0';
        ctx.clearRect(0, 0, width, height);
      }

      // =========================================================================
      // STEP 2: "SINGULARITY" TITLE REVEALS ON BLACK (0.48 - 1.00)
      // Wordmark appears first on the black screen
      // =========================================================================
      if (titleRef.current) {
        if (p < 0.48) {
          titleRef.current.style.opacity = '0';
          titleRef.current.style.filter = 'blur(22px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1.06)';
        } else if (p < 0.58) {
          // Reveals into crisp focus on the black background
          const t = (p - 0.48) / 0.10;
          const op = Math.min(1, t * 1.15);
          const blur = (1 - t) * 20;
          const scale = 1.06 - t * 0.06;
          titleRef.current.style.opacity = String(op);
          titleRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          titleRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)})`;
        } else {
          // Stays fully sharp throughout lightning and devi maa reveals
          titleRef.current.style.opacity = '1';
          titleRef.current.style.filter = 'blur(0px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        }
      }

      // =========================================================================
      // STEP 3: LIGHTNING SURGES BEHIND "SINGULARITY" (0.65 - 1.00)
      // Electric purple lightning strikes behind the wordmark
      // =========================================================================
      if (lightningRef.current) {
        if (p < 0.65) {
          lightningRef.current.style.opacity = '0';
        } else if (p < 0.74) {
          const t = (p - 0.65) / 0.09;
          lightningRef.current.style.opacity = String(Math.min(1, Math.max(0, t)));
        } else {
          lightningRef.current.style.opacity = '1';
        }
      }

      // =========================================================================
      // STEP 4: DEVI MAA EYE OPENING ANIMATION & AURORA AT LAST (0.80 - 1.00)
      // Devi Maa reveals behind lightning and singularity as the grand finale
      // =========================================================================
      if (videoWrapperRef.current) {
        if (p < 0.80) {
          videoWrapperRef.current.style.opacity = '0';
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else if (p < 0.89) {
          const t = (p - 0.80) / 0.09;
          videoWrapperRef.current.style.opacity = String(Math.min(1, t));
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          videoWrapperRef.current.style.opacity = '1';
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        }
      }

      if (auroraRef.current) {
        if (p < 0.80) {
          auroraRef.current.style.opacity = '0';
        } else if (p < 0.89) {
          const t = (p - 0.80) / 0.09;
          auroraRef.current.style.opacity = String(Math.min(0.95, t * 0.95));
        } else {
          auroraRef.current.style.opacity = '0.95';
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.stickyViewport}>
        {/* Layer 1: Hardware-Accelerated Crossfading Backgrounds */}
        <div ref={bgWhiteRef} className={styles.bgLayerWhite} aria-hidden="true" />
        <div ref={bgBlackRef} className={styles.bgLayerBlack} aria-hidden="true" />

        {/* Layer 2: Devi Maa Eye Opening Video (Grand Finale - Step 4) */}
        <div ref={videoWrapperRef} className={styles.videoWrapper} aria-hidden="true">
          <video
            ref={videoRef}
            src="/cover-eye-opening.mp4"
            muted
            playsInline
            loop
            preload="auto"
            className={styles.durgaVideo}
          />
          <div className={styles.videoScrim} />
        </div>

        {/* Layer 3: Divine Purple Aurora Glow at bottom */}
        <div ref={auroraRef} className={styles.auroraGlow} aria-hidden="true" />

        {/* Global Floating Header with dynamic color interpolation */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.brand}>{wordmark}</div>
          <button
            type="button"
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.hamburger}>
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </span>
          </button>
        </header>

        {/* Main Content Stage */}
        <div className={styles.contentStage}>
          {/* Fluid canvas for Phase 1C organic ink bloom */}
          <canvas ref={canvasRef} className={styles.fluidCanvas} />

          {/* Step 1A: Centered Proclamation Quote */}
          <div ref={quoteRef} className={styles.quoteWrapper}>
            <p className={styles.quoteText}>
              {quoteWords.map((word, i) => (
                <span key={i} className={styles.word}>
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          {/* Step 1B: "This is..." */}
          <div ref={thisIsRef} className={styles.thisIsWrapper}>
            <h2 className={styles.thisIsText}>This is...</h2>
          </div>

          {/* Step 3: Electric Purple Lightning Surge (strictly behind wordmark) */}
          <div ref={lightningRef} className={styles.lightningWrapper} aria-hidden="true">
            <Lightning
              hue={270}
              xOffset={0}
              speed={1}
              intensity={1.3}
              size={1}
              horizontal={true}
            />
          </div>

          {/* Step 2: Giant "SINGULARITY" Wordmark (strictly in front of lightning) */}
          <div ref={titleRef} className={styles.titleWrapper}>
            <div className={styles.titleInner}>
              <h1 className={styles.giantTitle}>{wordmark}</h1>
              {/* Elegant 4-point star sparkle ornament */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.starOrnament}
                aria-hidden="true"
              >
                <path d="M12 0 C12 7.5 16.5 12 24 12 C16.5 12 12 16.5 12 24 C12 16.5 7.5 12 0 12 C7.5 12 12 7.5 12 0 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom-Right Audio / Visualizer Equalizer */}
        <div ref={statusRef} className={styles.footerStatus} aria-hidden="true">
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
          <span className={styles.visualizerBar} />
        </div>
      </div>
    </section>
  );
}
