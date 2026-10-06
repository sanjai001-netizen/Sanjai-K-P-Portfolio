"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { navItems, profile } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider";
import styles from "./navigation.module.css";

const MENU_ID = "site-menu";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(true);
  const { setLocked } = useSmoothScroll();

  // Active section: IntersectionObserver fires only on threshold changes, not every frame.
  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(ids.includes(id) ? id : null);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    restoreFocus.current = returnFocus;
    setOpen(false);
  }, []);

  // Lock page scroll and wire Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    setLocked(true);
    const toggle = toggleRef.current;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 56em)");
    const onBreakpoint = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
      setLocked(false);
      if (restoreFocus.current) toggle?.focus();
      restoreFocus.current = true;
    };
  }, [open, close, setLocked]);

  // Keep Tab cycling between the toggle and the menu links while open.
  const onMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open || event.key !== "Tab") return;
    const focusables = [
      toggleRef.current,
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a") ?? []),
    ].filter(Boolean) as HTMLElement[];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className={styles.header} data-site-header data-open={open || undefined} onKeyDown={onMenuKeyDown}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          {profile.name.toUpperCase()}
          <span className="visually-hidden"> — back to top</span>
        </a>

        {profile.availableForOpportunities && (
          <p className={`mono ${styles.status}`}>
            <span aria-hidden="true">●</span> Available for opportunities
          </p>
        )}

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.link}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => (open ? close(true) : setOpen(true))}
        >
          <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
          <span className="visually-hidden"> navigation</span>
          <span className={styles.toggleIcon} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={menuRef}
        id={MENU_ID}
        className={styles.menu}
        hidden={!open}
        data-lenis-prevent
      >
        <nav aria-label="Mobile">
          <ol className={styles.menuList}>
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.menuLink}
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={() => close(false)}
                >
                  <span className={`mono ${styles.menuIndex}`} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={`mono ${styles.menuFoot}`}>
          <a href={`mailto:${profile.email}`} className="u-link">
            {profile.email}
          </a>
          <span>{profile.location}</span>
        </div>
      </div>
    </header>
  );
}
