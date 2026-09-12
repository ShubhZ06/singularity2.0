'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { WordsStagger } from '@/components/ui/words-stagger';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  quote?: string;
  wordmark?: string;
}

const DEFAULT_QUOTE =
  "This is not just a hackathon—it’s a place where normal rules don't apply and limits disappear. A space where builders, dreamers, and problem-solvers come together to celebrate the art of creation, share ideas, and turn code into lasting, real-world impact for a cause that matters.";

export default function StorySection({
  quote = DEFAULT_QUOTE,
  wordmark = 'SINGULARITY',
}: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whiteCanvasRef = useRef<HTMLCanvasElement>(null);
  const deepWhiteWaveRef = useRef<HTMLDivElement>(null);
  const whiteCoverRef = useRef<HTMLDivElement>(null);
  const footerSingularityRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const thisIsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const bgWhiteRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const quoteWords = useMemo(() => {
    return quote.split(' ');
  }, [quote]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const whiteCanvas = whiteCanvasRef.current;
    if (!container || !canvas || !whiteCanvas) return;

    const ctx = canvas.getContext('2d');
    const whiteCtx = whiteCanvas.getContext('2d');
    if (!ctx || !whiteCtx) return;

    let animId: number;
    let isRunning = false;
    let width = (canvas.width = whiteCanvas.width = window.innerWidth);
    let height = (canvas.height = whiteCanvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = whiteCanvas.width = window.innerWidth;
      height = canvas.height = whiteCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let targetProgress = 0;
    let smoothProgress = 0;

    // Organic blob anchors for black fluid ink bloom (Phase 1C: "This is..." -> "SINGULARITY")
    const blobAnchors = [
      { rx: 0.50, ry: 0.48, baseR: 0.30, phase: 0.0, speed: 0.25, maxAlpha: 0.96 },
      { rx: 0.32, ry: 0.44, baseR: 0.26, phase: 1.2, speed: 0.20, maxAlpha: 0.90 },
      { rx: 0.68, ry: 0.52, baseR: 0.28, phase: 2.5, speed: 0.18, maxAlpha: 0.92 },
      { rx: 0.45, ry: 0.28, baseR: 0.22, phase: 3.8, speed: 0.22, maxAlpha: 0.80 },
      { rx: 0.55, ry: 0.70, baseR: 0.25, phase: 4.9, speed: 0.19, maxAlpha: 0.85 },
      { rx: 0.20, ry: 0.55, baseR: 0.22, phase: 1.8, speed: 0.21, maxAlpha: 0.78 },
      { rx: 0.80, ry: 0.40, baseR: 0.22, phase: 3.2, speed: 0.17, maxAlpha: 0.82 },
    ];

    // Deep white cloudy smudge anchors billowing across the screen as per scroll (matching HackSpire reference)
    const whiteBlobAnchors = [
      // Bottom surge anchors
      { rx: 0.50, ry: 0.82, baseR: 0.44, phase: 0.0, speed: 0.24, maxAlpha: 1.0 },
      { rx: 0.22, ry: 0.84, baseR: 0.40, phase: 1.3, speed: 0.20, maxAlpha: 1.0 },
      { rx: 0.78, ry: 0.84, baseR: 0.40, phase: 2.6, speed: 0.22, maxAlpha: 1.0 },
      // Mid screen billowing anchors
      { rx: 0.48, ry: 0.52, baseR: 0.42, phase: 3.7, speed: 0.18, maxAlpha: 1.0 },
      { rx: 0.22, ry: 0.46, baseR: 0.38, phase: 4.8, speed: 0.21, maxAlpha: 0.98 },
      { rx: 0.78, ry: 0.46, baseR: 0.38, phase: 1.9, speed: 0.17, maxAlpha: 0.98 },
      // Upper anchors ensuring full smooth blanketing
      { rx: 0.36, ry: 0.28, baseR: 0.36, phase: 5.2, speed: 0.19, maxAlpha: 0.96 },
      { rx: 0.64, ry: 0.28, baseR: 0.36, phase: 0.8, speed: 0.22, maxAlpha: 0.96 },
      { rx: 0.50, ry: 0.18, baseR: 0.38, phase: 3.1, speed: 0.25, maxAlpha: 0.98 },
      // Lateral flank anchors
      { rx: 0.08, ry: 0.62, baseR: 0.34, phase: 2.2, speed: 0.16, maxAlpha: 0.95 },
      { rx: 0.92, ry: 0.62, baseR: 0.34, phase: 4.4, speed: 0.18, maxAlpha: 0.95 },
    ];

    let time = 0;

    const render = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.12;
      const p = smoothProgress;
      time += 0.008;

      // 1. Background crossfade (White -> Black)
      if (bgBlackRef.current && bgWhiteRef.current) {
        if (p < 0.34) {
          bgBlackRef.current.style.opacity = '0';
          bgWhiteRef.current.style.opacity = '1';
        } else if (p < 0.46) {
          const t = (p - 0.34) / 0.12;
          const ease = t * t * (3 - 2 * t);
          bgBlackRef.current.style.opacity = String(Math.min(1, Math.max(0, ease)));
          bgWhiteRef.current.style.opacity = String(Math.min(1, Math.max(0, 1 - ease)));
        } else {
          bgBlackRef.current.style.opacity = '1';
          bgWhiteRef.current.style.opacity = '0';
        }
      }

      // Audio / Visualizer status indicator color & opacity
      if (statusRef.current) {
        statusRef.current.style.color = p < 0.38 || p > 0.88 ? '#0A0A0A' : '#FFFFFF';
        if (p > 0.92) {
          const fade = Math.max(0, 1 - (p - 0.92) / 0.06);
          statusRef.current.style.opacity = String(fade);
        } else {
          statusRef.current.style.opacity = '1';
        }
      }

      // Step 1A: Proclamation Quote Text
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

      // Step 1B: "This is..."
      if (thisIsRef.current) {
        if (p < 0.16 || p > 0.34) {
          thisIsRef.current.style.opacity = '0';
          thisIsRef.current.style.filter = 'blur(20px)';
        } else if (p >= 0.16 && p < 0.23) {
          const t = (p - 0.16) / 0.07;
          const op = Math.min(1, t);
          const blur = (1 - t) * 16;
          const scale = 1.35 - t * 0.35;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        } else if (p >= 0.23 && p < 0.28) {
          thisIsRef.current.style.opacity = '1';
          thisIsRef.current.style.filter = 'blur(0px)';
          thisIsRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p >= 0.28 && p <= 0.34) {
          const t = (p - 0.28) / 0.06;
          const op = Math.max(0, 1 - t);
          const blur = t * 18;
          const scale = 1.0 + t * 0.12;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        }
      }

      // Step 1C: Black Fluid Ink Bloom
      if (p >= 0.28 && p <= 0.48) {
        let canvasAlpha = 1;
        if (p < 0.32) {
          canvasAlpha = (p - 0.28) / 0.04;
        } else if (p > 0.44) {
          canvasAlpha = Math.max(0, 1 - (p - 0.44) / 0.04);
        }
        canvas.style.opacity = String(Math.min(1, Math.max(0, canvasAlpha)));
        ctx.clearRect(0, 0, width, height);

        const progressGrowth = (p - 0.28) / 0.16;
        const expansion = 0.40 + progressGrowth * 2.2;
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

      // Step 2: "SINGULARITY" White Logo Rises Up as Per Scroll out of Black Smudge
      // Then STAYS centered on top of the video throughout the video showcase!
      if (titleRef.current) {
        if (p < 0.28) {
          titleRef.current.style.opacity = '0';
          titleRef.current.style.filter = 'blur(22px)';
          titleRef.current.style.transform = `translate3d(-50%, calc(-50% + ${(height * 0.35).toFixed(1)}px), 0) scale(0.88)`;
        } else if (p < 0.46) {
          // Rises up from below as per scroll with the black smudge!
          const t = (p - 0.28) / 0.18;
          const ease = t * t * (3 - 2 * t);
          const yOffset = (1 - ease) * (height * 0.35);
          const op = Math.min(1, ease * 1.35);
          const blur = (1 - ease) * 22;
          const scale = 0.88 + ease * 0.12;
          titleRef.current.style.opacity = String(op);
          titleRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          titleRef.current.style.transform = `translate3d(-50%, calc(-50% + ${yOffset.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`;
        } else if (p < 0.74) {
          // STAYS perfectly anchored on top of the video till the white smudge comes!
          titleRef.current.style.opacity = '1';
          titleRef.current.style.filter = 'blur(0px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p < 0.84) {
          // Dissolves into the billowing white smudge clouds as black logo comes up
          const t = (p - 0.74) / 0.10;
          const op = Math.max(0, 1 - t);
          const blur = t * 14;
          titleRef.current.style.opacity = String(op);
          titleRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else {
          titleRef.current.style.opacity = '0';
          titleRef.current.style.filter = 'blur(16px)';
        }
      }

      // Step 3: Final Story Girl Video (Clean, Natural Colors, No Overlays)
      if (videoWrapperRef.current) {
        if (p < 0.44) {
          videoWrapperRef.current.style.opacity = '0';
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else if (p < 0.52) {
          const t = (p - 0.44) / 0.08;
          videoWrapperRef.current.style.opacity = String(Math.min(1, t));
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          videoWrapperRef.current.style.opacity = '1';
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
          if (p >= 0.96 && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }

      // Step 4: White Smudge Bloom & Rising Black Singularity 2.0 (as per scroll)
      // Exactly matching HackSpire reference (media_1789234007689.png)
      if (p >= 0.68) {
        // A. Rising Deep White Wave Layer (starts below screen, ascends with feathered shadow)
        if (deepWhiteWaveRef.current) {
          const tWave = Math.min(1, (p - 0.68) / 0.24);
          const easeWave = tWave * tWave * (3 - 2 * tWave);
          const yPercent = (1 - easeWave) * 105;
          deepWhiteWaveRef.current.style.transform = `translate3d(0, ${yPercent.toFixed(2)}%, 0)`;
          deepWhiteWaveRef.current.style.opacity = String(Math.min(1, easeWave * 1.4));
        }

        // B. Billowing White Cloudy Canvas Smudge Blobs
        let whiteCanvasAlpha = 1;
        if (p < 0.72) {
          whiteCanvasAlpha = (p - 0.68) / 0.04;
        } else if (p > 0.94) {
          whiteCanvasAlpha = Math.max(0, 1 - (p - 0.94) / 0.04);
        }
        whiteCanvas.style.opacity = String(Math.min(1, Math.max(0, whiteCanvasAlpha)));
        whiteCtx.clearRect(0, 0, width, height);

        const progressGrowth = (p - 0.68) / 0.22;
        const expansion = 0.45 + progressGrowth * 2.8;
        const whiteMultiplier = Math.min(1, 0.60 + progressGrowth * 0.90);
        const minDim = Math.min(width, height);

        whiteBlobAnchors.forEach((blob) => {
          const driftX = Math.cos(time * blob.speed + blob.phase) * (minDim * 0.035);
          const driftY = Math.sin(time * blob.speed * 0.8 + blob.phase) * (minDim * 0.035);
          const cx = blob.rx * width + driftX;
          const cy = blob.ry * height + driftY;
          const r = blob.baseR * minDim * expansion;

          if (r <= 0) return;

          const grad = whiteCtx.createRadialGradient(cx, cy, r * 0.04, cx, cy, r);
          const a = Math.min(1.0, blob.maxAlpha * whiteMultiplier);

          grad.addColorStop(0.0, `rgba(255, 255, 255, ${a})`);
          grad.addColorStop(0.35, `rgba(255, 255, 255, ${a * 0.95})`);
          grad.addColorStop(0.65, `rgba(255, 255, 255, ${a * 0.65})`);
          grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

          whiteCtx.fillStyle = grad;
          whiteCtx.beginPath();
          whiteCtx.arc(cx, cy, r, 0, Math.PI * 2);
          whiteCtx.fill();
        });

        // C. Solid Deep White Cover (guarantees 100% pure solid white as p approaches footer)
        if (whiteCoverRef.current) {
          if (p < 0.88) {
            whiteCoverRef.current.style.opacity = '0';
          } else {
            const tCover = (p - 0.88) / 0.08;
            whiteCoverRef.current.style.opacity = String(Math.min(1, tCover));
          }
        }

        // D. Down (Black) Singularity 2.0 Logo Rises Up as Per Scroll over Deep White
        if (footerSingularityRef.current) {
          if (p < 0.70) {
            footerSingularityRef.current.style.opacity = '0';
            footerSingularityRef.current.style.filter = 'blur(20px)';
            footerSingularityRef.current.style.transform = `translate3d(0, ${(height * 0.65).toFixed(1)}px, 0) scale(0.88)`;
          } else if (p < 0.93) {
            const tLogo = (p - 0.70) / 0.23;
            const easeLogo = tLogo * tLogo * (3 - 2 * tLogo);
            const yOffset = (1 - easeLogo) * (height * 0.65);
            const opLogo = Math.min(1, easeLogo * 1.4);
            const blurLogo = (1 - easeLogo) * 20;
            const scaleLogo = 0.88 + easeLogo * 0.12;
            footerSingularityRef.current.style.opacity = String(opLogo);
            footerSingularityRef.current.style.filter = `blur(${blurLogo.toFixed(1)}px)`;
            footerSingularityRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scaleLogo.toFixed(3)})`;
          } else {
            footerSingularityRef.current.style.opacity = '1';
            footerSingularityRef.current.style.filter = 'blur(0px)';
            footerSingularityRef.current.style.transform = 'translate3d(0, 0px, 0) scale(1)';
          }
        }
      } else {
        whiteCanvas.style.opacity = '0';
        whiteCtx.clearRect(0, 0, width, height);
        if (deepWhiteWaveRef.current) {
          deepWhiteWaveRef.current.style.transform = 'translate3d(0, 105%, 0)';
          deepWhiteWaveRef.current.style.opacity = '0';
        }
        if (whiteCoverRef.current) {
          whiteCoverRef.current.style.opacity = '0';
        }
        if (footerSingularityRef.current) {
          footerSingularityRef.current.style.opacity = '0';
          footerSingularityRef.current.style.filter = 'blur(20px)';
          footerSingularityRef.current.style.transform = `translate3d(0, ${(height * 0.65).toFixed(1)}px, 0) scale(0.88)`;
        }
      }

      if (isRunning) {
        animId = requestAnimationFrame(render);
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const progressTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onToggle: (self) => {
        if (self.isActive) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      onUpdate: (self) => {
        targetProgress = self.progress;
        if (!isRunning) {
          startLoop();
        }
      },
    });

    targetProgress = progressTrigger.progress;
    smoothProgress = targetProgress;
    render();

    return () => {
      stopLoop();
      progressTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="story" ref={containerRef} className="relative w-full h-[580vh] bg-white">
      <div className="sticky top-0 h-screen h-svh w-full overflow-hidden bg-black [transform:translateZ(0)]">
        {/* Layer 1: Hardware-Accelerated Crossfading Backgrounds */}
        <div
          ref={bgWhiteRef}
          className="absolute inset-0 bg-white z-[1] pointer-events-none transition-opacity duration-300 [transform:translateZ(0)]"
          aria-hidden="true"
        />
        <div
          ref={bgBlackRef}
          className="absolute inset-0 bg-black z-[2] pointer-events-none opacity-0 transition-opacity duration-300 [transform:translateZ(0)]"
          aria-hidden="true"
        />

        {/* Layer 2: Final Story Girl Video (Clean, Original Theme) */}
        <div
          ref={videoWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-[6] opacity-0 transition-opacity duration-400 [transform:translateZ(0)] pointer-events-none"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            src="/videos/story-girl.mp4"
            muted
            playsInline
            preload="auto"
            loop
            className="absolute inset-0 w-full h-full object-cover object-center [transform:translateZ(0)]"
          />
          {/* Subtle edge falloff into background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_50%,transparent_50%,rgba(0,0,0,0.35)_80%,#000000_98%)] pointer-events-none" />
        </div>

        {/* Main Content Stage */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 isolate pointer-events-none">
          {/* Fluid canvas for Phase 1C organic black ink bloom */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] blur-[55px] opacity-0 transition-opacity duration-300 [transform:translateZ(0)]"
          />

          {/* Step 1A: Centered Proclamation Quote with WordsStagger text reveal */}
          <div
            ref={quoteRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-[25] pointer-events-none opacity-1 [transform-origin:center] will-change-transform"
          >
            <WordsStagger
              className="font-sans font-light text-xl sm:text-3xl md:text-4xl leading-snug tracking-tight text-[#0A0A0A] justify-center sm:justify-start"
              inView={true}
              once={false}
              stagger={0.035}
              speed={0.45}
            >
              {quote}
            </WordsStagger>
          </div>

          {/* Step 1B: "This is..." */}
          <div
            ref={thisIsRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] pointer-events-none text-center whitespace-nowrap opacity-0 [transform-origin:center] will-change-transform"
          >
            <h2 className="font-sans font-light text-4xl sm:text-6xl md:text-8xl leading-none tracking-tight text-[#0A0A0A]">
              This is...
            </h2>
          </div>

          {/* Step 2: Giant Center "SINGULARITY" White Logo */}
          {/* Rises up as per scroll with black smudge, then stays on top of video */}
          <div
            ref={titleRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-5xl z-40 pointer-events-none flex flex-col items-center justify-center opacity-0 [transform-origin:center] will-change-transform"
          >
            <div className="relative w-full flex justify-center items-center">
              <img
                src="/logo/logo-white.svg"
                alt={wordmark}
                className="w-full max-h-[28vh] sm:max-h-[35vh] md:max-h-[42vh] object-contain select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              />
              {/* Elegant 4-point star sparkle ornament */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-3 sm:-top-6 right-[6%] sm:right-[10%] w-6 h-6 sm:w-10 sm:h-10 text-white pointer-events-none z-[42] drop-shadow-[0_0_16px_rgba(255,255,255,0.9)] animate-star-twinkle"
                aria-hidden="true"
              >
                <path d="M12 0 C12 7.5 16.5 12 24 12 C16.5 12 12 16.5 12 24 C12 16.5 7.5 12 0 12 C7.5 12 12 7.5 12 0 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Step 4A: Rising Deep White Wave Layer (covers the video from bottom to top with feathered smoke shadow) */}
        <div
          ref={deepWhiteWaveRef}
          className="absolute inset-0 bg-white pointer-events-none z-[60] [transform:translateZ(0)]"
          style={{
            transform: 'translate3d(0, 105%, 0)',
            boxShadow: '0 -100px 160px 80px #ffffff, 0 -40px 80px 30px #ffffff',
          }}
          aria-hidden="true"
        />

        {/* Step 4B: White Cloudy Smudge Bloom Canvas (z-[65] bills organic clouds to blanket the video in deep white) */}
        <canvas
          ref={whiteCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[65] blur-[45px] sm:blur-[52px] opacity-0 transition-opacity duration-300 [transform:translateZ(0)]"
        />

        {/* Step 4C: Solid Pure White Cover Overlay (z-[70] guarantees 100% pure white coverage) */}
        <div
          ref={whiteCoverRef}
          className="absolute inset-0 bg-white pointer-events-none z-[70] opacity-0 [transform:translateZ(0)]"
          aria-hidden="true"
        />

        {/* Step 4D: Down (Black) Singularity 2.0 Logo Rises Up as Per Scroll over Deep White (z-[75]) */}
        <div
          ref={footerSingularityRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none z-[75] px-4 sm:px-8 will-change-transform"
          style={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center">
            <div className="relative w-full flex justify-center items-center">
              <img
                src="/logo/logo-black.svg"
                alt="SINGULARITY 2.0"
                className="w-full max-h-[160px] sm:max-h-[190px] md:max-h-[220px] object-contain select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
              />
              {/* Sparkle star ornament matching footer */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute -top-2 sm:-top-3 right-[18%] sm:right-[21%] md:right-[23%] w-7 h-7 sm:w-10 sm:h-10 text-[#111111] pointer-events-none animate-star-twinkle opacity-90"
                aria-hidden="true"
              >
                <path d="M12 0 C12 7.5 16.5 12 24 12 C16.5 12 12 16.5 12 24 C12 16.5 7.5 12 0 12 C7.5 12 12 7.5 12 0 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom-Right Audio / Visualizer Equalizer */}
        <div
          ref={statusRef}
          className="absolute bottom-6 right-8 z-50 flex items-end gap-[3px] h-4 pointer-events-none transition-all duration-300 [transform:translateZ(0)]"
          aria-hidden="true"
        >
          <span className="w-[2px] h-[60%] bg-current rounded-sm animate-equalize [animation-delay:0.1s]" />
          <span className="w-[2px] h-[90%] bg-current rounded-sm animate-equalize [animation-delay:0.4s]" />
          <span className="w-[2px] h-[40%] bg-current rounded-sm animate-equalize [animation-delay:0.2s]" />
          <span className="w-[2px] h-[100%] bg-current rounded-sm animate-equalize [animation-delay:0.6s]" />
          <span className="w-[2px] h-[75%] bg-current rounded-sm animate-equalize [animation-delay:0.3s]" />
          <span className="w-[2px] h-[50%] bg-current rounded-sm animate-equalize [animation-delay:0.5s]" />
          <span className="w-[2px] h-[85%] bg-current rounded-sm animate-equalize [animation-delay:0.15s]" />
        </div>
      </div>
    </section>
  );
}
