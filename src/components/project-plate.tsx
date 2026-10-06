import { Fragment } from "react";
import type { Project, ProjectPlate as Plate } from "@/types/portfolio";
import styles from "./project-plate.module.css";

/**
 * Typographic composition standing in for project imagery. Purely decorative:
 * it restates features already listed in text and never imitates a screenshot.
 */
export function ProjectPlate({ plate, number, tone }: { plate: Plate; number: string; tone: Project["tone"] }) {
  return (
    <div className={styles.plate} data-plate data-kind={plate.kind} data-tone={tone} aria-hidden="true">
      <div className={`mono ${styles.header}`}>
        <span>PLATE {number}</span>
        <span>{plate.kind.toUpperCase()}</span>
      </div>
      <div className={styles.body}>{renderPlate(plate)}</div>
    </div>
  );
}

function renderPlate(plate: Plate) {
  switch (plate.kind) {
    case "modules":
      return (
        <ul className={styles.modules}>
          {plate.items.map((item, i) => (
            <li key={item}>
              <span className="mono">M{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <div className={styles.flow}>
          <span className={styles.flowCaption}>{plate.caption}</span>
          <ol>
            {plate.steps.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <li className={styles.flowArrow}>↓</li>}
                <li className={styles.flowStep}>{step}</li>
              </Fragment>
            ))}
          </ol>
        </div>
      );
    case "pages":
      return (
        <div className={styles.pages}>
          <ol>
            {Array.from({ length: plate.count }, (_, i) => (
              <li key={i} className="mono">
                P{String(i + 1).padStart(2, "0")}
              </li>
            ))}
          </ol>
          <span className={styles.pagesCaption}>{plate.caption}</span>
        </div>
      );
    case "figures":
      return (
        <dl className={styles.figures}>
          {plate.items.map((item) => (
            <div key={item.id}>
              <dt>{item.value}</dt>
              <dd className="mono">{item.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "layers":
      return (
        <div className={styles.layers}>
          {plate.layers.map((layer, i) => (
            <span key={layer} className={`mono ${styles.layer}`} style={{ zIndex: plate.layers.length - i }}>
              z:{(plate.layers.length - i) * 10} — {layer}
            </span>
          ))}
        </div>
      );
  }
}
