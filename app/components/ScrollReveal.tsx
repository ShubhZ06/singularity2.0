'use client';

import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollReveal.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className={styles.word} key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: 0, filter: 'blur(0px)' },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 85%',
            end: rotationEnd,
            scrub: true,
          },
        }
      );

      const wordElements = el.querySelectorAll<HTMLElement>(`.${styles.word}`);

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
          y: 28,
          willChange: 'opacity, filter, transform',
        },
        {
          ease: 'none',
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.14,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 95%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`${styles['scroll-reveal']} ${containerClassName}`}>
      <span className={`${styles['scroll-reveal-text']} ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollReveal;
