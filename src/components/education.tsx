import { certifications, education, formatMonth, toIsoMonth } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./education.module.css";

export function Education() {
  return (
    <section id="education" className={styles.education} aria-labelledby="education-title" tabIndex={-1}>
      <SectionReveal className={styles.inner}>
        <div className="wrap">
          <SectionHeading id="education-title" index="06" label="Education" drift={-3}>
            Education &amp; certifications
          </SectionHeading>

          <div className={styles.archive}>
            <div className={styles.column}>
              <h3 className={`mono ${styles.colTitle}`}>
                <span aria-hidden="true">A.</span> Education
              </h3>
              <ol data-reveal-group>
                {education.map((entry, i) => (
                  <li key={entry.id} className={styles.record}>
                    <p className={`mono ${styles.recId}`} aria-hidden="true">
                      REC.{String(i + 1).padStart(2, "0")}
                    </p>
                    <h4 className={styles.credential}>{entry.credential}</h4>
                    <dl className={styles.fields}>
                      <div>
                        <dt className="mono">Institution</dt>
                        <dd>{entry.institution}</dd>
                      </div>
                      <div>
                        <dt className="mono">Location</dt>
                        <dd>{entry.location}</dd>
                      </div>
                      <div>
                        <dt className="mono">Completed</dt>
                        <dd>
                          <time dateTime={toIsoMonth(entry.completed)}>{formatMonth(entry.completed)}</time>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.column}>
              <h3 className={`mono ${styles.colTitle}`}>
                <span aria-hidden="true">B.</span> Certifications
              </h3>
              <ol data-reveal-group>
                {certifications.map((cert, i) => (
                  <li key={cert.id} className={styles.record}>
                    <p className={`mono ${styles.recId}`} aria-hidden="true">
                      CERT.{String(i + 1).padStart(2, "0")}
                    </p>
                    <h4 className={styles.credential}>{cert.title}</h4>
                    <dl className={styles.fields}>
                      <div>
                        <dt className="mono">Issued by</dt>
                        <dd>{cert.provider}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
