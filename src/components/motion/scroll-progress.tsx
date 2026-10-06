"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./scroll-progress.module.css";

/** Thin reading-progress bar. Driven by transform only; never touches React state. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;
    const setScale = gsap.quickSetter(bar, "scaleX");
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScale(self.progress),
      onRefresh: (self) => setScale(self.progress),
    });
  });

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
