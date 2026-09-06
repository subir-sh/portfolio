import { useEffect, useRef, useState } from "react";

export function Card({ children, className = "" }) {
  return <article className={`card ${className}`}>{children}</article>;
}
export function SectionTitle({ children }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
    </div>
  );
}
export function Period({ value }) {
  const [start, end] = value.split(" — ");
  return (
    <p className="period">
      <span>{start} —</span>
      <span>{end}</span>
    </p>
  );
}
export function FloatingNavigation({ items }) {
  const [open, setOpen] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!navigationRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <aside
      ref={navigationRef}
      className="floating-navigation"
      aria-label="빠른 탐색"
    >
      {open && (
        <nav className="floating-menu" id="floating-section-menu">
          {items.map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
      <div className="floating-actions">
        <button
          type="button"
          className="section-toggle"
          aria-expanded={open}
          aria-controls="floating-section-menu"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {open ? "닫기" : "목차"}
        </button>
        <a className="floating-top" href="#top" onClick={() => setOpen(false)}>
          ↑
        </a>
      </div>
    </aside>
  );
}
