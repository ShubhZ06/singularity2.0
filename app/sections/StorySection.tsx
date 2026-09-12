'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lightning from '@/app/components/Lightning';
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
  const quoteRef = useRef<HTMLDivElement>(null);
  const thisIsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const bgWhiteRef = useRef<HTMLDivElement>(null);

  const [lightningActive, setLightningActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isRunning = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let targetProgress = 0;
    let smoothProgress = 0;

    const blobAnchors = [
      { rx: 0.50, ry: 0.48, baseR: 0.28, phase: 0.0, speed: 0.25, maxAlpha: 0.95 },
      { rx: 0.32, ry: 0.42, baseR: 0.24, phase: 1.2, speed: 0.20, maxAlpha: 0.85 },
      { rx: 0.68, ry: 0.52, baseR: 0.26, phase: 2.5, speed: 0.18, maxAlpha: 0.90 },
      { rx: 0.45, ry: 0.26, baseR: 0.20, phase: 3.8, speed: 0.22, maxAlpha: 0.75 },
      { rx: 0.55, ry: 0.72, baseR: 0.22, phase: 4.9, speed: 0.19, maxAlpha: 0.80 },
    ];

    let time = 0;

    const render = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.14;
      const p = smoothProgress;
      time += 0.008;

      const shouldLightningBeActive = p >= 0.60 && p <= 0.88;
      setLightningActive((prev) => (prev !== shouldLightningBeActive ? shouldLightningBeActive : prev));

      // 1. Background crossfade
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


      // Step 1A: Quote Text
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
          const scale = 1.4 - t * 0.4;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        } else if (p >= 0.23 && p < 0.29) {
          thisIsRef.current.style.opacity = '1';
          thisIsRef.current.style.filter = 'blur(0px)';
          thisIsRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        } else if (p >= 0.29 && p <= 0.34) {
          const t = (p - 0.29) / 0.05;
          const op = Math.max(0, 1 - t);
          const blur = t * 16;
          const scale = 1.0 + t * 0.12;
          thisIsRef.current.style.opacity = String(op);
          thisIsRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          thisIsRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(2)})`;
        }
      }

      // Step 1C: Fluid Ink Bloom
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

      // Step 2: "SINGULARITY" Title Reveals
      if (titleRef.current) {
        if (p < 0.48) {
          titleRef.current.style.opacity = '0';
          titleRef.current.style.filter = 'blur(22px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1.06)';
        } else if (p < 0.58) {
          const t = (p - 0.48) / 0.10;
          const op = Math.min(1, t * 1.15);
          const blur = (1 - t) * 20;
          const scale = 1.06 - t * 0.06;
          titleRef.current.style.opacity = String(op);
          titleRef.current.style.filter = `blur(${blur.toFixed(1)}px)`;
          titleRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)})`;
        } else {
          titleRef.current.style.opacity = '1';
          titleRef.current.style.filter = 'blur(0px)';
          titleRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
        }
      }

      // Step 3: Lightning Surges
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

      // Step 4: Devi Maa Eye Opening
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

    // Use ScrollTrigger to calculate progress with zero getBoundingClientRect overhead
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
        <div ref={bgWhiteRef} className="absolute inset-0 bg-white z-[1] pointer-events-none transition-opacity duration-300 [transform:translateZ(0)]" aria-hidden="true" />
        <div ref={bgBlackRef} className="absolute inset-0 bg-black z-[2] pointer-events-none opacity-0 transition-opacity duration-300 [transform:translateZ(0)]" aria-hidden="true" />

        {/* Layer 2: Devi Maa Eye Opening Video (Grand Finale - Step 4) */}
        <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full overflow-hidden z-[6] pointer-events-none opacity-0 transition-opacity duration-400 [transform:translateZ(0)]" aria-hidden="true">
          <video
            ref={videoRef}
            src="/cover-eye-opening.mp4"
            muted
            playsInline
            loop
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] [transform:translateZ(0)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_36%,transparent_35%,rgba(0,0,0,0.45)_75%,#000000_98%)] pointer-events-none" />
        </div>

        {/* Layer 3: Divine Purple Aurora Glow at bottom */}
        <div ref={auroraRef} className="absolute inset-0 pointer-events-none z-[8] bg-[radial-gradient(ellipse_110%_75%_at_50%_100%,rgba(123,53,248,0.8)_0%,rgba(76,29,149,0.45)_45%,rgba(0,0,0,0)_75%)] opacity-0 mix-blend-screen transition-opacity duration-400 [transform:translateZ(0)]" aria-hidden="true" />



        {/* Main Content Stage */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 isolate pointer-events-none">
          {/* Fluid canvas for Phase 1C organic ink bloom */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[5] blur-[55px] opacity-0 transition-opacity duration-300 [transform:translateZ(0)]" />

          {/* Step 1A: Centered Proclamation Quote with WordsStagger text reveal */}
          <div ref={quoteRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-[25] pointer-events-none opacity-1 [transform-origin:center] will-change-transform">
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
          <div ref={thisIsRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] pointer-events-none text-center whitespace-nowrap opacity-0 [transform-origin:center] will-change-transform">
            <h2 className="font-sans font-light text-4xl sm:text-6xl md:text-8xl leading-none tracking-tight text-[#0A0A0A]">This is...</h2>
          </div>

          {/* Step 3: Electric Purple Lightning Surge */}
          <div ref={lightningRef} className="absolute inset-0 w-full h-full pointer-events-none z-[15] opacity-0 transition-opacity duration-350 [transform:translateZ(0)]" aria-hidden="true">
            <Lightning
              hue={270}
              xOffset={0}
              speed={1}
              intensity={1.3}
              size={1}
              horizontal={true}
              active={lightningActive}
            />
          </div>

          {/* Step 2: Giant Center "SINGULARITY" White Logo */}
          <div ref={titleRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-5xl z-40 pointer-events-none flex flex-col items-center justify-center opacity-0 [transform-origin:center] will-change-transform">
            <div className="relative w-full flex justify-center items-center">
              <img
                src="/logo/logo-white.svg"
                alt={wordmark}
                className="w-full max-h-[28vh] sm:max-h-[35vh] md:max-h-[42vh] object-contain select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
