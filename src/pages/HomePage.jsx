import githubIcon from "../../assets/icons/github.svg";
import emailIcon from "../../assets/icons/email.svg";
import {
  profile,
  projects,
  otherProjects,
  experiences,
  education,
  skills,
  navigation,
} from "../data/home";
import {
  Card,
  FloatingNavigation,
  Period,
  SectionTitle,
} from "../components/ui";
import ProjectLinkIcon from "../components/ProjectLinkIcon";

export default function HomePage() {
  return (
    <>
      <header className="profile-header" id="top">
        <div className="container">
          <div className="profile">
            <h1>
              {profile.name} <span>{profile.englishName}</span>
            </h1>
            <p className="profile-role">
              Product Engineer{" "}
              <span className="profile-company">
                @{" "}
                <a href="https://ai.passdream.app/" target="_blank" rel="noreferrer">
                  irurilabs
                </a>
              </span>
            </p>
            <p className="subtitle profile-education">
              SNU{" "}
              <a href="https://cse.snu.ac.kr" target="_blank" rel="noreferrer">
                CSE
              </a>{" "}
              &amp;{" "}
              <a href="https://linguist.snu.ac.kr" target="_blank" rel="noreferrer">
                Linguistics
              </a>
            </p>
            <p className="subtitle">{profile.intro}</p>
            <div className="profile-links">
              <a
                href="https://github.com/subir-sh"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubIcon} alt="" />
                GitHub <span>↗</span>
              </a>
              <a href="mailto:lsh09130@gmail.com">
                <img src={emailIcon} alt="" />
                Gmail <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <section className="section" id="projects">
          <SectionTitle>주요 프로젝트</SectionTitle>
          <div className="project-grid">
            {projects.map((project) => (
              <a
                className="project-card"
                href={`#/projects/${project.slug}`}
                key={project.slug}
              >
                <div className="project-card-heading">
                  <h3>{project.name}</h3>
                  <p>{project.subtitle}</p>
                  <span className="arrow">↗</span>
                </div>
                <p className="meta">{project.stack}</p>
                <p className="project-type">{project.type}</p>
                <p className="project-description">{project.description}</p>
              </a>
            ))}
          </div>
          <div className="other-projects">
            <h3>기타 프로젝트</h3>
            <div className="other-project-grid">
              {otherProjects.map((project) => (
                <article className="other-project card" key={project.name}>
                  <strong className="other-project-name">{project.name}</strong>
                  <span className="other-project-stack">{project.stack}</span>
                  <p className="other-project-description">{project.description}</p>
                  <div className="other-project-links">
                    {project.links.map(([label, url]) => (
                      <a href={url} key={url} target="_blank" rel="noreferrer">
                        <ProjectLinkIcon url={url} />
                        {label} ↗
                      </a>
                    ))}
                  </div>
                  <p className="other-project-contribution">
                    {project.contribution}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section" id="experience">
          <SectionTitle>경험</SectionTitle>
          <div className="experience-list">
            {experiences.map((item) => (
              <Card className="experience-card" key={item.company}>
                <Period value={item.period} />
                <div>
                  <p className="company">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer">
                        {item.company} ↗
                      </a>
                    ) : (
                      item.company
                    )}
                  </p>
                  <h3>{item.role}</h3>
                  <p className="meta">{item.stack}</p>
                  <p>{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section className="section two-column" id="education">
          <div>
            <SectionTitle>학력</SectionTitle>
          </div>
          <div className="education-list">
            {education.map((item) => (
              <Card key={item.school}>
                <p className="period">{item.period}</p>
                <h3>{item.school}</h3>
                <p className="meta">
                  {Array.isArray(item.detail)
                    ? item.detail.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))
                    : item.detail}
                </p>
                {item.grade && <strong>{item.grade}</strong>}
              </Card>
            ))}
          </div>
        </section>
        <section className="section" id="skills">
          <SectionTitle>기술</SectionTitle>
          <div className="skill-grid">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <h3>{category}</h3>
                <div className="skill-tags">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer id="contact">
        <div className="container">
          <a className="footer-email" href="mailto:lsh09130@gmail.com">
            lsh09130@gmail.com ↗
          </a>
          <div className="footer-languages">
            <p>
              한국어 <b>Native</b>
            </p>
            <p>
              영어 <b>Advanced, TOEIC 990</b>
            </p>
            <p>
              일본어 <b>Advanced, JLPT N1 / JPT 910</b>
            </p>
            <p>
              스페인어 <b>Intermediate, DELE B1</b>
            </p>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SEUNGHYEON LEE</span>
          </div>
        </div>
      </footer>
      <FloatingNavigation items={navigation} />
    </>
  );
}
