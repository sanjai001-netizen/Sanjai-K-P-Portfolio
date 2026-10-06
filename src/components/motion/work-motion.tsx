"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, MEDIA, ScrollTrigger, useGSAP, type MediaConditions } from "@/lib/gsap";

/**
 * Archive behaviour for Selected Work:
 *  - [data-work-current] shows the number of the project in view (DOM write, no React state)
 *  - [data-project-title] eases from a slightly smaller scale
 *  - [data-plate] reveals with a clip-path on desktop, a fade on smaller screens
 *  - [data-project-num] follows the pointer by a few pixels on fine pointers
 */
export function WorkMotion({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const projects = gsap.utils.toArray<HTMLElement>("[data-project]", root);
      const counter = root.querySelector<HTMLElement>("[data-work-current]");

      // Active-number tracking is informational, so it runs regardless of motion preference.
      projects.forEach((project) => {
        ScrollTrigger.create({
          trigger: project,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive && counter) counter.textContent = project.dataset.project ?? "";
            project.toggleAttribute("data-active", self.isActive);
          },
        });
      });

      const mm = gsap.matchMedia();
      mm.add(
        { ...MEDIA, finePointer: "(hover: hover) and (pointer: fine)" },
        (context) => {
          const { motion, desktop, finePointer } = context.conditions as MediaConditions & {
            finePointer?: boolean;
          };
          if (!motion) return;

          projects.forEach((project) => {
            const title = project.querySelector("[data-project-title]");
            const plate = project.querySelector("[data-plate]");

            if (title) {
              gsap.fromTo(
                title,
                { scale: desktop ? 0.94 : 0.97, transformOrigin: "0% 100%" },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: { trigger: project, start: "top 90%", end: "top 35%", scrub: true },
                },
              );
            }

            if (plate) {
              gsap.fromTo(
                plate,
                desktop ? { clipPath: "inset(0% 0% 100% 0%)" } : { autoAlpha: 0, y: 16 },
                {
                  ...(desktop ? { clipPath: "inset(0% 0% 0% 0%)" } : { autoAlpha: 1, y: 0 }),
                  duration: 1,
                  ease: EASE.inOut,
                  clearProps: "clipPath",
                  scrollTrigger: { trigger: plate, start: "top 85%", once: true },
                },
              );
            }
          });

          if (!finePointer) return;

          const cleanups = projects.map((project) => {
            const num = project.querySelector("[data-project-num]");
            if (!num) return () => {};
            const toX = gsap.quickTo(num, "x", { duration: 0.6, ease: EASE.out });
            const toY = gsap.quickTo(num, "y", { duration: 0.6, ease: EASE.out });
            const onMove = (event: PointerEvent) => {
              const rect = project.getBoundingClientRect();
              toX(((event.clientX - rect.left) / rect.width - 0.5) * 14);
              toY(((event.clientY - rect.top) / rect.height - 0.5) * 14);
            };
            const onLeave = () => {
              toX(0);
              toY(0);
            };
            project.addEventListener("pointermove", onMove);
            project.addEventListener("pointerleave", onLeave);
            return () => {
              project.removeEventListener("pointermove", onMove);
              project.removeEventListener("pointerleave", onLeave);
            };
          });

          return () => cleanups.forEach((fn) => fn());
        },
        root,
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
