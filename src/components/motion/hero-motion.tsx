"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, MEDIA, ScrollTrigger, useGSAP, type MediaConditions } from "@/lib/gsap";

/**
 * Hero entrance. The HTML is fully readable without JS; with JS and motion
 * allowed, a pre-paint CSS rule hides [data-hero-hide] until this timeline
 * takes over (and a CSS failsafe reveals it if scripts never arrive).
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        MEDIA,
        (context) => {
          const { motion, desktop } = context.conditions as MediaConditions;
          if (!motion) return;
          const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);

          const tl = gsap.timeline({ defaults: { ease: EASE.out } });
          tl.fromTo(
            q("[data-hero-grid] > *"),
            { scaleY: 0, transformOrigin: "50% 0%" },
            { scaleY: 1, duration: 0.7, stagger: 0.025, ease: EASE.inOut },
            0,
          )
            .fromTo(
              q("[data-hero-meta]"),
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
              0.15,
            )
            .fromTo(
              q("[data-hero-role]"),
              { yPercent: 110 },
              { yPercent: 0, duration: 0.7 },
              0.2,
            )
            .fromTo(
              q("[data-hero-name]"),
              { yPercent: 108 },
              { yPercent: 0, duration: 0.9, stagger: 0.1, ease: EASE.expo },
              0.25,
            )
            .fromTo(
              q("[data-hero-tag]"),
              { autoAlpha: 0, x: -12 },
              { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.05 },
              0.6,
            );

          // Subtle pulse on the scroll cue, paused whenever the hero is offscreen.
          const cue = q("[data-hero-cue]");
          const pulse = gsap.to(cue, {
            y: 6,
            duration: 0.9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          });
          tl.call(() => pulse.play());
          ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive && tl.progress() === 1) pulse.play();
              else pulse.pause();
            },
          });

          // Gentle depth: the name and the grid separate as the hero leaves.
          if (desktop) {
            gsap.to(q("[data-hero-depth]"), {
              yPercent: -12,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
            });
          }
        },
        root,
      );

      // Hand control from the pre-paint CSS rule to GSAP (or to plain CSS under reduced motion).
      document.documentElement.classList.add("motion-ready");
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
