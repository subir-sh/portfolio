import { useState } from "react";

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
  return (
    <aside
      className="floating-navigation"
      aria-label="빠른 탐색"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <nav className="floating-menu">
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
          onClick={() => setOpen(!open)}
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
