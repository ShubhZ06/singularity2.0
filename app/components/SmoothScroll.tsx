'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The inline script in layout.tsx already ran synchronously and set:
    //   history.scrollRestoration = 'manual'
    //   document.documentElement.style.opacity = '0'      ← hides ALL scroll jumps
    //   document.documentElement.style.overflow = 'hidden' ← prevents user scroll
    //   window.scrollTo(0, 0)
    //
    // overflow:hidden only prevents user-initiated scroll events (wheel/touch/keyboard).
    // It does NOT hide programmatic window.scrollTo() calls — those still visually move
    // the page. opacity:0 is the only reliable way to hide ALL scroll position changes.

    window.scrollTo(0, 0);

    // Signal to scroll-driven components (e.g. ScrollExpand) to snap positions
    // instantly during the lock period instead of smoothly animating.
    // Prevents the "back-animation" from being visible when the page unlocks.
    (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = true;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    lenis.scrollTo(0, { immediate: true });

    // Stop Lenis so ScrollTrigger.refresh() measurement scrolls don't
    // bleed into Lenis's scroll state
    const rafId = requestAnimationFrame(() => {
      lenis.resize();
      lenis.stop();
      ScrollTrigger.refresh();
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    });

    // Re-sync Lenis size whenever ScrollTrigger refreshes (lazy content loading)
    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    // Unlock at 1150ms — after ALL scroll restoration sources have settled:
    //   StorySection refresh timer 1: 300ms
    //   StorySection refresh timer 2: 1000ms
    //   We unlock at 1150ms, after all of the above.
    //
    // The page is invisible (opacity:0) during this entire window, so the user
    // never sees any scroll position fights. We then fade in cleanly at scroll=0.
    const unlockTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });

      // Release the snap lock BEFORE revealing, so components are at correct
      // positions when opacity is restored
      (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = false;

      document.documentElement.style.overflow = '';

      // Fade in over 150ms — short enough to feel instant, long enough to be smooth
      document.documentElement.style.transition = 'opacity 0.15s ease';
      document.documentElement.style.opacity = '1';

      // Clean up the transition property after the fade completes
      setTimeout(() => {
        document.documentElement.style.transition = '';
        document.documentElement.style.opacity = '';
      }, 200);
    }, 1150);

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(unlockTimer);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      // Always restore visibility/scroll on unmount
      document.documentElement.style.opacity = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.transition = '';
      (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = false;
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
