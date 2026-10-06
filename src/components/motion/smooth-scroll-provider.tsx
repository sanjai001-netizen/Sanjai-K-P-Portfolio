"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollApi {
  /** Scroll to an in-page hash, update history and move focus to the target. */
  scrollToHash: (hash: string) => void;
  /** Freeze page scrolling (e.g. while an overlay is open). */
  setLocked: (locked: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  return ctx;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Owns the one Lenis instance for the page.
 * - GSAP's ticker is the only animation-frame driver (autoRaf is off).
 * - Lenis is skipped entirely under prefers-reduced-motion, and created or
 *   destroyed if that preference changes mid-session.
 * - In-page anchor clicks are delegated here so every "#hash" link shares the
 *   same behaviour: smooth with Lenis, native jump otherwise. Sections use
 *   scroll-margin-top, which both Lenis and the browser honour.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);

    // GSAP ticker time is in seconds; Lenis expects milliseconds.
    const tick = (time: number) => lenisRef.current?.raf(time * 1000);

    const start = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        autoRaf: false,
        anchors: false,
        allowNestedScroll: true,
        syncTouch: false,
        lerp: 0.12,
      });
      lenis.on("scroll", ScrollTrigger.update);
      lenisRef.current = lenis;
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (lockedRef.current) lenis.stop();
    };

    const stop = () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const sync = () => {
      if (media.matches) stop();
      else start();
      ScrollTrigger.refresh();
    };

    if (!media.matches) start();
    media.addEventListener("change", sync);

    // Fonts change line lengths and therefore trigger positions — refresh once.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const focusTarget = () => target.focus({ preventScroll: true });
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(target, { force: true, duration: 1.1, onComplete: focusTarget });
    } else {
      target.scrollIntoView({ block: "start" });
      focusTarget();
    }

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    lockedRef.current = locked;
    document.documentElement.toggleAttribute("data-scroll-locked", locked);
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  // Delegate same-page hash links.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href") ?? "";
      if (hash.length < 2 || !document.getElementById(hash.slice(1))) return;

      event.preventDefault();
      // Wait a frame so overlays that close on the same click can release scroll first.
      requestAnimationFrame(() => scrollToHash(hash));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollToHash]);

  const api = useMemo(() => ({ scrollToHash, setLocked }), [scrollToHash, setLocked]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
