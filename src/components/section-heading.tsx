import type { ReactNode } from "react";
import styles from "./section-heading.module.css";

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  /** Horizontal drift amount (xPercent) applied while scrolling. */
  drift?: number;
  aside?: ReactNode;
  tone?: "light" | "dark";
}

/** "01 / ABOUT" label + oversized h2, shared by every major section. */
export function SectionHeading({ id, index, label, children, drift = -4, aside, tone = "light" }: SectionHeadingProps) {
  return (
    <header className={styles.head} data-tone={tone}>
      <div className={styles.labelRow}>
        <p className={`mono ${styles.label}`} data-reveal>
          <span className={styles.index}>{index}</span>
          <span aria-hidden="true"> / </span>
          <span className="visually-hidden">: </span>
          {label}
        </p>
        <span className={styles.rule} data-line aria-hidden="true" />
        {aside}
      </div>
      <h2 id={id} className={styles.title}>
        <span className={styles.drift} data-drift={drift}>
          {children}
        </span>
      </h2>
    </header>
  );
}
