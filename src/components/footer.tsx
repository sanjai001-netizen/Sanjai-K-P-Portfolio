import { profile } from "@/data/portfolio";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <p className={styles.name}>{profile.name.toUpperCase()}</p>
        <p className={styles.role}>{profile.role}</p>
      </div>
      <div className={`wrap mono ${styles.bottom}`}>
        <p>© 2026 {profile.name.toUpperCase()}</p>
        <p>Built with code / curiosity / coffee</p>
        <a href="#top" className="u-link">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
