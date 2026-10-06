import { skillCategories } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./technical-stack.module.css";

export function TechnicalStack() {
  return (
    <section id="stack" className={styles.stack} aria-labelledby="stack-title" tabIndex={-1}>
      <SectionReveal className={styles.inner}>
        <div className="wrap">
          <SectionHeading id="stack-title" index="04" label="Stack" drift={-5}>
            Tools I build with
          </SectionHeading>

          <div className={styles.spec} data-reveal-group>
            {skillCategories.map((category, i) => (
              <div key={category.id} className={styles.cell}>
                <div className={`mono ${styles.cellHead}`}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}.{category.code}
                  </span>
                  <span aria-hidden="true">n={String(category.items.length).padStart(2, "0")}</span>
                </div>
                <h3 id={`stack-${category.id}`} className={styles.cellTitle}>
                  {category.label}
                </h3>
                <ul className={styles.items}>
                  {category.items.map((item) => (
                    <li key={item}>
                      <span className={styles.itemText} data-text={item}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <span className={`mono ${styles.tag}`} aria-hidden="true">
                  [SPEC:{category.code}]
                </span>
              </div>
            ))}
          </div>

          <p className={`mono ${styles.footnote}`} data-reveal>
            Plain list — no ratings, no percentages.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
