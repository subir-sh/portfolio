import { useEffect, useRef } from "react";

function CaseCopy({ children, className = "" }) {
  if (typeof children !== "string" && typeof children !== "number") {
    return <p className={className}>{children}</p>;
  }

  const lines = String(children).split("\n");
  return (
    <p className={className}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export function CaseHero({ title, lead, image, imageAlt, facts, links }) {
  return (
    <header className="case-hero">
      <img className="case-hero-media" src={image} alt={imageAlt} />
      <div className="case-hero-shade" aria-hidden="true" />
      <div className="case-container">
        <a className="case-back" href="#/">← 프로젝트 목록</a>
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <h1>{title}</h1>
            <CaseCopy>{lead}</CaseCopy>
            <ul className="case-facts">
              {facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <div className="case-links">
              {links.map(({ label, href, primary = false }) => (
                <a
                  className={primary ? "is-primary" : ""}
                  href={href}
                  key={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function CaseSection({ title, intro, children, className = "" }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.06 });
    section.classList.add("will-reveal");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className={`case-section ${className}`.trim()}>
      <div className="case-container">
        <div className="case-section-heading">
          <h2>{title}</h2>
          {intro && <CaseCopy>{intro}</CaseCopy>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CaseResult({ result, children }) {
  return (
    <section className="case-result">
      <div className="case-container">
        <div className="case-result-copy">
          <h2>결과</h2>
          <p><strong>{result}</strong></p>
        </div>
        <div className="case-result-foot">
          {children && <CaseCopy>{children}</CaseCopy>}
          <a href="#/">다른 프로젝트 보기 →</a>
        </div>
      </div>
    </section>
  );
}
