"use client";

import { useRef } from "react";
import { gsap, MEDIA, ScrollTrigger, useGSAP, type MediaConditions } from "@/lib/gsap";
import styles from "./data-grid.module.css";

const COLS = 16;
const ROWS = 9;
// Fixed pseudo-random cell positions so server and client markup match.
const ACTIVE_CELLS = [3, 18, 27, 40, 52, 61, 75, 86, 97, 109, 118, 131, 140];

/**
 * Decorative coordinate grid for the "Next" section. Hidden from assistive
 * technology; the looping animation exists only while the section is on
 * screen and never under reduced motion.
 */
export function DataGrid() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        MEDIA,
        (context) => {
          const { motion } = context.conditions as MediaConditions;
          if (!motion) return;

          const loop = gsap.timeline({ repeat: -1, paused: true });
          loop.fromTo(
            root.querySelector(`.${styles.scan}`),
            { yPercent: -100 },
            { yPercent: ROWS * 100, duration: 7, ease: "none" },
            0,
          );
          loop.to(
            gsap.utils.toArray(`.${styles.on}`, root),
            {
              opacity: 0.15,
              duration: 0.5,
              ease: "steps(2)",
              yoyo: true,
              repeat: 1,
              stagger: { each: 0.45, from: "random" },
            },
            0,
          );

          ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          });
        },
        root,
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={styles.grid} aria-hidden="true">
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <span key={i} className={ACTIVE_CELLS.includes(i) ? styles.on : undefined} />
      ))}
      <span className={styles.scan} />
    </div>
  );
}
