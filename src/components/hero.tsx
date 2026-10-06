import { Fragment } from "react";
import { heroMeta, profile } from "@/data/portfolio";
import { HeroMotion } from "@/components/motion/hero-motion";
import styles from "./hero.module.css";

export function Hero() {
  const [first, second] = profile.nameLines;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" tabIndex={-1}>
      <HeroMotion className={styles.inner}>
        <div className={styles.grid} data-hero-grid aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className={`wrap ${styles.layout}`}>
          <dl className={styles.meta}>
            {heroMeta.map((item) => (
              <div key={item.id} className={styles.metaItem} data-hero-meta data-hero-hide>
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.titleBlock} data-hero-depth>
            <h1 id="hero-title" className={styles.name}>
              <span className={styles.clip}>
                <span className={styles.nameLine} data-hero-name data-hero-hide>
                  {first}
                </span>
              </span>{" "}
              <span className={`${styles.clip} ${styles.second}`}>
                <span className={styles.block} aria-hidden="true" />
                <span className={`${styles.nameLine} ${styles.accent}`} data-hero-name data-hero-hide>
                  {second}
                </span>
              </span>
            </h1>

            <div className={styles.roleBlock}>
              <p className={styles.clip}>
                <span className={styles.role} data-hero-role data-hero-hide>
                  {profile.role}
                </span>
              </p>
              <p className={`mono ${styles.stack}`}>
                {profile.stackLine.map((tech, i) => (
                  <Fragment key={tech}>
                    {i > 0 && (
                      <span className={styles.sep} aria-hidden="true">
                        {" / "}
                      </span>
                    )}
                    <span className={styles.tech} data-hero-tag data-hero-hide>
                      {tech}
                    </span>
                  </Fragment>
                ))}
              </p>
            </div>
          </div>

          <p className={styles.statement} data-hero-meta data-hero-hide>
            {profile.statement}
          </p>

          <div className={styles.foot}>
            <a href="#about" className={styles.cue}>
              <span>Scroll to explore</span>
              <span className={styles.cueArrow} data-hero-cue aria-hidden="true">
                ↓
              </span>
            </a>
            <p className={`mono ${styles.coords}`} data-hero-tag data-hero-hide>
              <span className="visually-hidden">Coordinates: </span>
              {profile.coordinates}
            </p>
            <p className={`mono ${styles.edition}`} aria-hidden="true" data-hero-tag data-hero-hide>
              IDX—00 / 2026
            </p>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
