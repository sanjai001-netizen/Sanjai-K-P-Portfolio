import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { ProjectPlate } from "@/components/project-plate";
import { SectionReveal } from "@/components/motion/section-reveal";
import { WorkMotion } from "@/components/motion/work-motion";
import styles from "./selected-work.module.css";

const total = String(projects.length).padStart(2, "0");

export function SelectedWork() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title" tabIndex={-1}>
      <WorkMotion>
        <SectionReveal className={styles.inner}>
          <div className="wrap">
            <SectionHeading id="work-title" index="03" label="Work" drift={-7}>
              Selected work
            </SectionHeading>
          </div>

          <div className={styles.indexBar} aria-hidden="true">
            <div className={`wrap mono ${styles.indexInner}`}>
              <span>Archive</span>
              <span>
                Now viewing <b data-work-current>01</b> / {total}
              </span>
              <span className={styles.indexHint}>Scroll ↓</span>
            </div>
          </div>

          <ol className={styles.list}>
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectEntry project={project} />
              </li>
            ))}
          </ol>
        </SectionReveal>
      </WorkMotion>
    </section>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  const titleId = `project-${project.id}`;
  const lists = [project.scope, project.contribution, project.features].filter(
    (list): list is NonNullable<typeof list> => Boolean(list && list.items.length > 0),
  );

  return (
    <article
      className={styles.project}
      data-project={project.number}
      data-tone={project.tone}
      data-size={project.size}
      aria-labelledby={titleId}
    >
      <div className={`wrap ${styles.projectGrid}`}>
        <div className={styles.numCol}>
          <span className={styles.num} data-project-num aria-hidden="true">
            {project.number}
          </span>
        </div>

        <div className={styles.main}>
          <div className={`mono ${styles.metaRow}`}>
            <span className={styles.metaIndex}>
              Project {project.number}
              <span aria-hidden="true">/{total}</span>
            </span>
            <span>{project.type}</span>
          </div>
          <span className={styles.rule} data-line aria-hidden="true" />

          <h3 id={titleId} className={styles.title} data-project-title>
            {project.title}
          </h3>
          {project.fullName && <p className={styles.fullName}>{project.fullName}</p>}

          <div className={styles.columns}>
            <div className={styles.details}>
              {project.highlight && (
                <p className={styles.highlight} data-reveal>
                  {project.highlight}
                </p>
              )}

              <p className={styles.description} data-reveal>
                {project.description}
              </p>

              {lists.map((list) => (
                <div key={list.label} className={styles.listBlock} data-reveal>
                  <h4 className="mono">{list.label}</h4>
                  <ul className={styles.featureList}>
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {project.outcomes.length > 0 && (
                <div className={styles.listBlock} data-reveal>
                  <h4 className="mono">Outcomes</h4>
                  <dl className={styles.outcomes}>
                    {project.outcomes.map((metric) => (
                      <div key={metric.id}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {project.notes.map((note) => (
                <p key={note} className={`mono ${styles.note}`} data-reveal>
                  <span aria-hidden="true">※ </span>
                  {note}
                </p>
              ))}

              {project.stack.items.length > 0 && (
                <div className={styles.listBlock}>
                  <h4 className="mono">{project.stack.label}</h4>
                  <ul className={styles.tags} data-tags>
                    {project.stack.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.link && (
                <a
                  className={styles.visit}
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {project.link.label}
                  <span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              )}
            </div>

            <div className={styles.plateCol}>
              <ProjectPlate plate={project.plate} number={project.number} tone={project.tone} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
