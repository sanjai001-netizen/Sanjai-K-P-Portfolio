"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, MEDIA, useGSAP, type MediaConditions } from "@/lib/gsap";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Declarative scroll motion for server-rendered markup. Content is visible in
 * the HTML; animation states are applied only after hydration and only when
 * the visitor has not asked for reduced motion.
 *
 *   data-reveal          fade + rise when entering the viewport
 *   data-reveal-group    staggers its direct children
 *   data-line            horizontal rule drawn with scaleX
 *   data-line-y          vertical rule drawn with scaleY, scrubbed over its parent
 *   data-drift="-6"      heading drifts horizontally (xPercent) while scrolling
 *   data-parallax="12"   decorative layer moves vertically (yPercent) while scrolling
 *   data-tags            children enter one after another
 *   data-keywords        emphasises its [data-keyword] descendants in sequence
 */
export function SectionReveal({ children, className }: SectionRevealProps) {
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
          const travel = desktop ? 36 : 16;
          const q = <T extends Element = HTMLElement>(selector: string) =>
            gsap.utils.toArray<T>(selector, root);

          q("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              y: travel,
              autoAlpha: 0,
              duration: 0.8,
              ease: EASE.out,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          });

          q("[data-reveal-group]").forEach((group) => {
            gsap.from(group.children, {
              y: travel * 0.75,
              autoAlpha: 0,
              duration: 0.7,
              ease: EASE.out,
              stagger: 0.07,
              scrollTrigger: { trigger: group, start: "top 86%", once: true },
            });
          });

          q("[data-tags]").forEach((group) => {
            gsap.from(group.children, {
              x: -10,
              autoAlpha: 0,
              duration: 0.45,
              ease: EASE.out,
              stagger: 0.04,
              scrollTrigger: { trigger: group, start: "top 92%", once: true },
            });
          });

          q("[data-keywords]").forEach((block) => {
            gsap.from(gsap.utils.toArray("[data-keyword]", block), {
              yPercent: 40,
              opacity: 0.15,
              duration: 0.6,
              ease: EASE.out,
              stagger: 0.12,
              scrollTrigger: { trigger: block, start: "top 75%", once: true },
            });
          });

          q("[data-line]").forEach((line) => {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "0% 50%",
              duration: 1,
              ease: EASE.inOut,
              scrollTrigger: { trigger: line, start: "top 92%", once: true },
            });
          });

          q("[data-line-y]").forEach((line) => {
            gsap.fromTo(
              line,
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "50% 0%",
                ease: "none",
                scrollTrigger: {
                  trigger: line.parentElement ?? line,
                  start: "top 70%",
                  end: "bottom 70%",
                  scrub: true,
                },
              },
            );
          });

          q("[data-drift]").forEach((el) => {
            const amount = Number(el.dataset.drift) || -6;
            gsap.fromTo(
              el,
              { xPercent: desktop ? amount * -0.5 : amount * -0.25 },
              {
                xPercent: desktop ? amount : amount * 0.5,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          if (desktop) {
            q("[data-parallax]").forEach((el) => {
              const amount = Number(el.dataset.parallax) || 10;
              gsap.fromTo(
                el,
                { yPercent: -amount },
                {
                  yPercent: amount,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
          }
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
