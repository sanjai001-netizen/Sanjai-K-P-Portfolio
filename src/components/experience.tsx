import type { CSSProperties } from "react";
import { experience, formatMonth, toIsoMonth } from "@/data/portfolio";
import type { ExperienceEntry, YearMonth } from "@/types/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./experience.module.css";

/* Chronology axis: whole years, so ongoing roles run to the edge with an arrow. */
const AXIS_START = 2023;
const AXIS_END = 2026;
const AXIS_MONTHS = (AXIS_END - AXIS_START + 1) * 12;
const axisYears = Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i);

const monthIndex = (d: YearMonth) => (d.year - AXIS_START) * 12 + (d.month - 1);
const endIndex = (entry: ExperienceEntry) =>
  entry.end ? monthIndex(entry.end) + 1 : Number.POSITIVE_INFINITY;

function overlapsFor(entry: ExperienceEntry) {
  const start = monthIndex(entry.start);
  const end = endIndex(entry);
  return experience
    .filter((other) => other.id !== entry.id)
    .filter((other) => monthIndex(other.start) < end && start < endIndex(other))
    .map((other) => other.organization);
}

function barStyle(entry: ExperienceEntry): CSSProperties {
  const start = monthIndex(entry.start);
  const end = Math.min(endIndex(entry), AXIS_MONTHS);
  return {
    "--bar-start": `${(start / AXIS_MONTHS) * 100}%`,
    "--bar-width": `${((end - start) / AXIS_MONTHS) * 100}%`,
  } as CSSProperties;
}

export function Experience() {
  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-title" tabIndex={-1}>
      <SectionReveal className={styles.inner}>
        <div className="wrap">
          <SectionHeading id="experience-title" index="02" label="Experience" drift={-6} tone="dark">
            Experience
          </SectionHeading>

          {/* Supplementary chart; every date is also stated in the entries below. */}
          <figure className={styles.chrono} aria-hidden="true">
            <div className={styles.axis}>
              {axisYears.map((year) => (
                <span key={year} className="mono">
                  {year}
                </span>
              ))}
            </div>
            <div className={styles.tracks}>
              {experience.map((entry) => (
                <div key={entry.id} className={styles.track}>
                  <span className={`mono ${styles.trackLabel}`}>{entry.organization}</span>
                  <span
                    className={styles.bar}
                    data-ongoing={entry.end ? undefined : ""}
                    data-emphasis={entry.emphasis}
                    style={barStyle(entry)}
                    data-line
                  />
                </div>
              ))}
            </div>
            <figcaption className="mono">
              Fig. 02 — Roles {AXIS_START} → now. Parallel bars are concurrent roles.
            </figcaption>
          </figure>

          <div className={styles.timeline}>
            <span className={styles.spine} data-line-y aria-hidden="true" />
            <ol>
            {experience.map((entry, i) => {
              const overlaps = overlapsFor(entry);
              return (
                <li key={entry.id} className={styles.entry} data-emphasis={entry.emphasis}>
                  <div className={styles.when}>
                    <div className={styles.whenSticky}>
                      <p className="mono">E—{String(experience.length - i).padStart(2, "0")}</p>
                      <p className={styles.dates}>
                        <time dateTime={toIsoMonth(entry.start)}>{formatMonth(entry.start, "short")}</time>
                        <span aria-hidden="true"> — </span>
                        <span className="visually-hidden"> to </span>
                        {entry.end ? (
                          <time dateTime={toIsoMonth(entry.end)}>{formatMonth(entry.end, "short")}</time>
                        ) : (
                          <span>Present</span>
                        )}
                      </p>
                      <p className={`mono ${styles.status}`} data-ongoing={entry.end ? undefined : ""}>
                        {entry.end ? "Concluded" : "● Ongoing"}
                      </p>
                    </div>
                  </div>

                  <article className={styles.body} data-reveal aria-labelledby={`exp-${entry.id}`}>
                    <h3 id={`exp-${entry.id}`} className={styles.role}>
                      {entry.role}
                    </h3>
                    <p className={styles.org}>{entry.organization}</p>
                    {(entry.location || entry.workplace) && (
                      <p className={`mono ${styles.where}`}>
                        {[entry.location, entry.workplace].filter(Boolean).join(" · ")}
                      </p>
                    )}

                    {entry.responsibilities.length > 0 && (
                      <ul className={styles.duties}>
                        {entry.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {entry.metrics.length > 0 && (
                      <dl className={styles.metrics}>
                        {entry.metrics.map((metric) => (
                          <div key={metric.id} className={styles.metric}>
                            <dt className="mono">{metric.label}</dt>
                            <dd>{metric.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {entry.technologies.length > 0 && (
                      <div className={styles.techBlock}>
                        <p className="mono">{entry.technologiesLabel ?? "Technologies"}</p>
                        <ul className={styles.tags} data-tags>
                          {entry.technologies.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {overlaps.length > 0 && (
                      <p className={`mono ${styles.overlap}`}>
                        Concurrent with — {overlaps.join(", ")}
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
