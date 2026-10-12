"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

export function SiteHeader({
  name,
  email,
  cv,
  links,
}: {
  name: string;
  email: string;
  cv: string;
  links: readonly NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const statusLabel = useRef("");
  const booting = useRef(true);
  const [bar, setBar] = useState({ x: 0, width: 0, visible: false });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      const offset = 96;
      let current = document.getElementById("work") ? (links[0]?.href ?? "") : "";
      for (const link of links) {
        const hash = link.href.slice(link.href.indexOf("#") + 1);
        const section = document.getElementById(hash);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= offset) {
          current = link.href;
        }
      }
      setActive(current);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const percent = Math.round(amount * 100);
      if (fillRef.current && !booting.current) {
        fillRef.current.style.width = `${percent}%`;
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${String(percent).padStart(3, "0")}%`;
      }
      if (statusRef.current) {
        const label = links.find((link) => link.href === current)?.label;
        const nextStatus =
          percent >= 100 ? "READY" : percent < 2 ? "BOOT" : (label ?? "LOAD").toUpperCase();
        if (statusLabel.current && statusLabel.current !== nextStatus) {
          const node = statusRef.current;
          node.classList.remove("is-checkpoint");
          void node.offsetWidth;
          node.classList.add("is-checkpoint");
        }
        statusLabel.current = nextStatus;
        statusRef.current.textContent = nextStatus;
      }
      hudRef.current?.setAttribute("aria-valuenow", String(percent));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) booting.current = false;
    const bootTimer = window.setTimeout(() => {
      booting.current = false;
      const fill = fillRef.current;
      fill?.classList.remove("is-booting");
      fill?.classList.add("is-settling");
      update();
      window.setTimeout(() => fill?.classList.remove("is-settling"), 520);
    }, reduce ? 0 : 1280);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(bootTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [links]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const link = active
        ? list.querySelector<HTMLAnchorElement>(`a[href="${active}"]`)
        : null;
      const row = list.querySelector(".nav-list");
      const horizontal =
        row instanceof HTMLElement && getComputedStyle(row).flexDirection === "row";
      if (!link || !horizontal) {
        setBar((previous) =>
          previous.visible ? { x: 0, width: 0, visible: false } : previous,
        );
        return;
      }

      const listBox = list.getBoundingClientRect();
      const box = link.getBoundingClientRect();
      const next = {
        x: Math.round(box.left - listBox.left),
        width: Math.round(box.width),
        visible: box.width > 0,
      };
      setBar((previous) =>
        previous.x === next.x &&
        previous.width === next.width &&
        previous.visible === next.visible
          ? previous
          : next,
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={scrolled ? "site-header is-scrolled" : "site-header"}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          {name}
        </Link>
        <div className="header-actions">
          <ThemeToggle compact />
          <a className="email-action" href={`mailto:${email}`}>
            Email
          </a>
          <a className="cv-action" href={cv} target="_blank" rel="noreferrer">
            CV
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav
          id="site-nav"
          className={open ? "is-open" : undefined}
          aria-label="Primary"
        >
          <div ref={listRef} className="nav-track">
            <span
              className="nav-indicator"
              aria-hidden="true"
              style={{
                width: bar.width,
                transform: `translateX(${bar.x}px)`,
                opacity: bar.visible ? 1 : 0,
              }}
            />
            <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            </ul>
          </div>
        </nav>
      </div>
      <div
        ref={hudRef}
        className="load-hud"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-label="Reading progress"
      >
        <span className="load-kicker">Load</span>
        <span className="load-track">
          <span ref={fillRef} className="load-fill is-booting" />
        </span>
        <span ref={statusRef} className="load-status">
          Boot
        </span>
        <span ref={pctRef} className="load-pct">
          000%
        </span>
      </div>
    </header>
  );
}
