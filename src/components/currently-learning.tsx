import { Fragment } from "react";
import { learning } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { DataGrid } from "@/components/motion/data-grid";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./currently-learning.module.css";

export function CurrentlyLearning() {
  return (
    <section id="next" className={styles.learning} aria-labelledby="next-title" tabIndex={-1}>
      <DataGrid />
      <SectionReveal className={styles.inner}>
        <div className="wrap">
          <SectionHeading id="next-title" index="05" label="Next" drift={-4} tone="dark">
            Next <span aria-hidden="true">→</span>
          </SectionHeading>

          <p className={styles.statement} data-reveal-group>
            {learning.statement.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && (
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                )}
                <span className={styles.word}>
                  {word}
                  {i < learning.statement.length - 1 && <span className="visually-hidden">, then </span>}
                </span>
              </Fragment>
            ))}
          </p>

          <div className={styles.panel}>
            <p className={`mono ${styles.status}`} data-reveal>
              <span aria-hidden="true">■ </span>Status: learning in progress
            </p>

            <div className={styles.cols}>
              <div data-reveal>
                <h3 className="mono">Currently building fundamentals in</h3>
                <ul className={styles.libs} data-tags>
                  {learning.fundamentals.map((lib) => (
                    <li key={lib}>{lib}</li>
                  ))}
                </ul>
              </div>
              <div data-reveal>
                <h3 className="mono">Direction</h3>
                <p className={styles.direction}>{learning.direction}</p>
              </div>
            </div>

            <p className={styles.disclaimer} data-reveal>
              This is ongoing study, built on top of my Python and Django work — not professional
              machine-learning experience or shipped AI products, yet.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
