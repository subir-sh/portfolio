export function CaseHero({ title, lead, image, imageAlt, facts, links }) {
  return (
    <header className="case-hero">
      <div className="case-container">
        <a className="case-back" href="#/">← 프로젝트 목록</a>
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <h1>{title}</h1>
            <p>{lead}</p>
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
          <div className="case-hero-visual">
            <img src={image} alt={imageAlt} />
          </div>
        </div>
      </div>
    </header>
  );
}

export function CaseSection({ title, intro, children, className = "" }) {
  return (
    <section className={`case-section ${className}`.trim()}>
      <div className="case-container">
        <div className="case-section-heading">
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CaseFooter({ children }) {
  return (
    <footer className="case-footer">
      <div className="case-container">
        <p>{children}</p>
        <a href="#/">다른 프로젝트 보기 →</a>
      </div>
    </footer>
  );
}
