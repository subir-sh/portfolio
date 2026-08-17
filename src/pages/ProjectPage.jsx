import ProjectLinkIcon from "../components/ProjectLinkIcon";

export default function ProjectPage({ project }) {
  return (
    <>
      <header className="detail-header">
        <div className="container">
          <a className="back-link" href="#/">
            ← 메인으로 돌아가기
          </a>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
      </header>
      <main className="container detail-main">
        <section className="detail-meta card">
          {project.meta.map(([label, value]) => (
            <p key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </p>
          ))}
          {project.links && (
            <p>
              <strong>링크</strong>
              <span className="detail-links">
                {project.links.map(([label, url]) => (
                  <a href={url} key={url} target="_blank" rel="noreferrer">
                    <ProjectLinkIcon url={url} />
                    {label} ↗
                  </a>
                ))}
              </span>
            </p>
          )}
        </section>
        {project.sections.map(([title, content]) => (
          <section className="detail-section" key={title}>
            <h2>{title}</h2>
            <div className="card">
              {title === "담당 내용" ? (
                <ul>
                  {content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                content.map((item) => <p key={item}>{item}</p>)
              )}
            </div>
          </section>
        ))}
        {project.images && (
          <section className="detail-section">
            <h2>미리보기</h2>
            <div className="detail-images">
              {project.images.map((image) => (
                <img
                  src={image}
                  alt={`${project.title} 미리보기`}
                  key={image}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
