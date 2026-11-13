import { learning, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./about.module.css";

const capabilities = [
  { id: "responsive", label: "Responsive applications" },
  { id: "backend", label: "Backend systems" },
  { id: "ui", label: "UI development" },
  { id: "performance", label: "Performance optimization" },
  { id: "deploy", label: "Deployment" },
  { id: "browsers", label: "Cross-browser support" },
];

export function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title" tabIndex={-1}>
      <SectionReveal className={styles.inner}>
        <div className={styles.ghost} aria-hidden="true">
          <span data-parallax="18">WEB</span>
        </div>

        <div className="wrap">
          <SectionHeading id="about-title" index="01" label="About" drift={-5}>
            I build things for the web.
          </SectionHeading>

          <div className="grid">
            <aside className={styles.rail} aria-label="Profile summary">
              <dl className={`mono ${styles.railList}`} data-reveal-group>
                <div>
                  <dt>File</dt>
                  <dd>about.txt</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{profile.role}</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>Core</dt>
                  <dd>{profile.stackLine.join(" / ")}</dd>
                </div>
              </dl>
            </aside>

            <div className={styles.content}>
              <p className={styles.lead} data-reveal data-keywords>
                I&apos;m a full stack developer working with <em data-keyword>Python</em>,{" "}
                <em data-keyword>Django</em>, <em data-keyword>React</em> and{" "}
                <em data-keyword>JavaScript</em> — building responsive web applications and the{" "}
                <em data-keyword>REST APIs</em> that power them.
              </p>

              <div className={styles.columns} data-reveal-group>
                <p>
                  My work spans backend systems in Django, UI development in React, performance
                  optimization, deployment and cross-browser support. Freelancing since 2024 has
                  meant owning client projects end to end — data models, APIs, interfaces, launch
                  and monitoring.
                </p>
                <p>
                  I built production frontend interfaces at Beegains Technology Solutions
                  (May–October 2026), alongside freelance work. Recent work includes my own
                  customisable business management platform, an e-commerce storefront, an
                  institutional website and business sites — several with measured gains in
                  speed and stability.
                </p>
              </div>

              <ol className={styles.capabilities} aria-label="What I work on" data-reveal-group>
                {capabilities.map((item, i) => (
                  <li key={item.id}>
                    <span className="mono" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ol>

              <div className={styles.learning} data-reveal>
                <p className="mono">Currently learning — in progress</p>
                <p className={styles.path}>
                  <span>{learning.path.join(" + ")}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                  <span className="visually-hidden"> leading towards </span>
                  <strong>{learning.direction}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
