"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Shared media-query conditions for gsap.matchMedia(). */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 64em) and (prefers-reduced-motion: no-preference)",
  compact: "(max-width: 63.99em) and (prefers-reduced-motion: no-preference)",
} as const;

export type MediaConditions = { [K in keyof typeof MEDIA]?: boolean };

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export { gsap, ScrollTrigger, useGSAP };
