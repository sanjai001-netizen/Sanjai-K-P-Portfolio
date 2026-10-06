import { contactLinks, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/motion/section-reveal";
import styles from "./contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title" tabIndex={-1}>
      <SectionReveal className={styles.inner}>
        <div className="wrap">
          <SectionHeading id="contact-title" index="07" label="Contact" drift={-6}>
            Let&rsquo;s build something.
          </SectionHeading>

          <div className={styles.layout}>
            <div className={styles.pitch}>
              <p className={styles.sub} data-reveal>
                Have a project, product, or problem worth solving?
              </p>
              <a className={styles.cta} href={`mailto:${profile.email}`} data-reveal>
                Start a conversation
                <span aria-hidden="true"> →</span>
                <span className="visually-hidden"> by email</span>
              </a>
            </div>

            <dl className={styles.details} data-reveal-group>
              {contactLinks.map((item) => (
                <div key={item.id} className={styles.row}>
                  <dt className="mono">{item.label}</dt>
                  <dd>
                    {item.href ? (
                      <a className="u-link" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
