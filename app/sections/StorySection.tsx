'use client';

import React, { useEffect, useRef } from 'react';
import { WordsStagger } from '@/components/ui/words-stagger';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

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
  const quoteRef = useRef<HTMLDivElement>(null);
  const thisIsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const bgWhiteRef = useRef<HTMLDivElement>(null);

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
    let targetProgress = 0;

    const render = (pOverride?: number) => {
      const p = pOverride !== undefined ? pOverride : targetProgress;
      time += 0.012;

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
        } else if (p < 0.65) {
          // STAYS perfectly anchored on top of the video till the white smudge comes!
          titleRef.current.style.opacity = '1';
          titleRef.current.style.filter = 'blur(0px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p < 0.78) {
          // A soft cloudy fog dissolve
          const t = (p - 0.65) / 0.13;
          const op = Math.max(0, 1 - t);
          const blur = t * 24;
          const scale = 1 + t * 0.08;
          titleRef.current.style.opacity = String(op);
          titleRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          titleRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)})`;
        } else {
          titleRef.current.style.opacity = '0';
          titleRef.current.style.filter = 'blur(24px)';
        }
      }

      // Step 3: Final Story Girl Video (Clean, Natural Colors, No Overlays)
      if (videoWrapperRef.current) {
        if (p < 0.44) {
          videoWrapperRef.current.style.opacity = '0';
          videoWrapperRef.current.style.filter = 'none';
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else if (p < 0.52) {
          const t = (p - 0.44) / 0.08;
          videoWrapperRef.current.style.opacity = String(Math.min(1, t));
          videoWrapperRef.current.style.filter = 'none';
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else if (p < 0.65) {
          videoWrapperRef.current.style.opacity = '1';
          videoWrapperRef.current.style.filter = 'none';
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          // Soft Cloudy Fog Dissolve: Video progressively blurs and blooms into luminous mist
          const tFog = Math.min(1, (p - 0.65) / 0.25);
          const videoBlur = tFog * 24;
          const videoBright = 1 + tFog * 0.45;
          const videoOpacity = Math.max(0, 1 - tFog * 0.95);
          videoWrapperRef.current.style.opacity = String(videoOpacity);
          videoWrapperRef.current.style.filter = `blur(${videoBlur.toFixed(1)}px) brightness(${videoBright.toFixed(2)})`;
          if (p >= 0.94 && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      }

      // Step 4: A Soft Cloudy Fog Dissolve & Direct Footer Emergence
      if (p >= 0.65) {
        // A. Soft Dreamy Cloud Mist Ambience
        if (deepWhiteWaveRef.current) {
          const tWave = Math.min(1, (p - 0.65) / 0.28);
          const easeWave = tWave * tWave * (3 - 2 * tWave);
          const yPercent = (1 - easeWave) * 105;
          deepWhiteWaveRef.current.style.transform = `translate3d(0, ${yPercent.toFixed(2)}%, 0)`;
          deepWhiteWaveRef.current.style.opacity = String(Math.min(1, easeWave * 1.5));
        }

        // B. Billowing Soft Cloudy Fog Canvas Blobs
        let whiteCanvasAlpha = 1;
        if (p < 0.70) {
          whiteCanvasAlpha = (p - 0.65) / 0.05;
        } else if (p > 0.96) {
          whiteCanvasAlpha = Math.max(0, 1 - (p - 0.96) / 0.04);
        }
        whiteCanvas.style.opacity = String(Math.min(1, Math.max(0, whiteCanvasAlpha)));
        whiteCtx.clearRect(0, 0, width, height);

        const progressGrowth = (p - 0.65) / 0.26;
        const expansion = 0.55 + progressGrowth * 3.2;
        const whiteMultiplier = Math.min(1, 0.70 + progressGrowth * 0.85);
        const minDim = Math.min(width, height);

        whiteBlobAnchors.forEach((blob) => {
          const driftX = Math.cos(time * blob.speed + blob.phase) * (minDim * 0.04);
          const driftY = Math.sin(time * blob.speed * 0.8 + blob.phase) * (minDim * 0.04);
          const cx = blob.rx * width + driftX;
          const cy = blob.ry * height + driftY;
          const r = blob.baseR * minDim * expansion;

          if (r <= 0) return;

          const grad = whiteCtx.createRadialGradient(cx, cy, r * 0.02, cx, cy, r);
          const a = Math.min(1.0, blob.maxAlpha * whiteMultiplier);

          grad.addColorStop(0.0, `rgba(255, 255, 255, ${a})`);
          grad.addColorStop(0.25, `rgba(255, 255, 255, ${(a * 0.92).toFixed(2)})`);
          grad.addColorStop(0.55, `rgba(255, 255, 255, ${(a * 0.58).toFixed(2)})`);
          grad.addColorStop(0.80, `rgba(255, 255, 255, ${(a * 0.22).toFixed(2)})`);
          grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

          whiteCtx.fillStyle = grad;
          whiteCtx.beginPath();
          whiteCtx.arc(cx, cy, r, 0, Math.PI * 2);
          whiteCtx.fill();
        });

        // C. Direct Footer Cloudy Fog Dissolve (crystallizes out of the soft fog into focus)
        if (whiteCoverRef.current) {
          if (p < 0.68) {
            whiteCoverRef.current.style.opacity = '0';
            whiteCoverRef.current.style.filter = 'blur(20px)';
            whiteCoverRef.current.style.transform = 'scale(0.98)';
            whiteCoverRef.current.style.pointerEvents = 'none';
          } else {
            const tCover = Math.min(1, (p - 0.68) / 0.24);
            const easeCover = tCover * tCover * (3 - 2 * tCover);
            const footerBlur = (1 - easeCover) * 20;
            const footerScale = 0.98 + easeCover * 0.02;
            whiteCoverRef.current.style.opacity = String(easeCover);
            whiteCoverRef.current.style.filter = `blur(${footerBlur.toFixed(1)}px)`;
            whiteCoverRef.current.style.transform = `scale(${footerScale.toFixed(3)})`;
            whiteCoverRef.current.style.pointerEvents = easeCover > 0.7 ? 'auto' : 'none';
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
          whiteCoverRef.current.style.filter = 'blur(20px)';
          whiteCoverRef.current.style.transform = 'scale(0.98)';
          whiteCoverRef.current.style.pointerEvents = 'none';
        }
      }

      if (isRunning) {
        animId = requestAnimationFrame(() => render());
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(() => render());
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
          if (self.progress >= 1) {
            targetProgress = 1;
            render(1);
            if (whiteCoverRef.current) {
              whiteCoverRef.current.style.opacity = '1';
              whiteCoverRef.current.style.filter = 'blur(0px)';
              whiteCoverRef.current.style.transform = 'scale(1)';
              whiteCoverRef.current.style.pointerEvents = 'auto';
            }
          } else if (self.progress <= 0) {
            targetProgress = 0;
            render(0);
            if (whiteCoverRef.current) {
              whiteCoverRef.current.style.opacity = '0';
              whiteCoverRef.current.style.filter = 'blur(20px)';
              whiteCoverRef.current.style.transform = 'scale(0.98)';
              whiteCoverRef.current.style.pointerEvents = 'none';
            }
          }
        }
      },
      onUpdate: (self) => {
        targetProgress = self.progress;
        render(self.progress);
      },
    });

    targetProgress = progressTrigger.progress;
    render(targetProgress);

    const refreshTimer1 = setTimeout(() => ScrollTrigger.refresh(), 300);
    const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      stopLoop();
      progressTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="story" ref={containerRef} className="relative w-full h-[280vh] bg-white">
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
            </div>
          </div>
        </div>

        {/* Step 4A: Soft Dreamy Cloud Mist Ambience (covers video with feathered fog bloom) */}
        <div
          ref={deepWhiteWaveRef}
          className="absolute inset-0 bg-white pointer-events-none z-[60] [transform:translateZ(0)]"
          style={{
            transform: 'translate3d(0, 105%, 0)',
            boxShadow: '0 -100px 180px 90px #ffffff, 0 -40px 90px 30px #ffffff',
            filter: 'blur(20px)',
          }}
          aria-hidden="true"
        />

        {/* Step 4B: White Cloudy Fog Canvas (z-[65] bills organic clouds to blanket the video in deep white) */}
        <canvas
          ref={whiteCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[65] blur-[55px] sm:blur-[70px] opacity-0 transition-opacity duration-300 [transform:translateZ(0)]"
        />

        {/* Step 4C: Direct Footer Cloudy Fog Dissolve (z-[70]) */}
        <div
          ref={whiteCoverRef}
          className="absolute inset-0 bg-white pointer-events-none z-[70] opacity-0 [transform:translateZ(0)] overflow-y-auto will-change-[opacity,filter,transform]"
          style={{ opacity: 0 }}
        >
          <Footer />
        </div>

      </div>
    </section>
  );
}
