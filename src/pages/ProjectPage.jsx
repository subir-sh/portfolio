import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProjectLinkIcon from "../components/ProjectLinkIcon";
import localizePage from "../locales/localizePage";
import { wordLinkEn, wordLinkJa } from "../locales/wordlink";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

function DefaultProjectPage({ project }) {
  return (
    <>
      <header className="detail-header">
        <div className="container">
          <a className="back-link" href="#/">← 메인으로 돌아가기</a>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
      </header>
      <main className="container detail-main">
        <section className="detail-meta card">
          {project.meta.map(([label, value]) => <p key={label}><strong>{label}</strong><span>{value}</span></p>)}
          {project.links && <p><strong>링크</strong><span className="detail-links">{project.links.map(([label, url]) => <a href={url} key={url} target="_blank" rel="noreferrer"><ProjectLinkIcon url={url} />{label} ↗</a>)}</span></p>}
        </section>
        {project.sections.map(([title, content]) => <section className="detail-section" key={title}><h2>{title}</h2><div className="card">{title === "담당 내용" ? <ul>{content.map((item) => <li key={item}>{item}</li>)}</ul> : content.map((item) => <p key={item}>{item}</p>)}</div></section>)}
        {project.images && <section className="detail-section"><h2>미리보기</h2><div className="detail-images">{project.images.map((image) => <img src={image} alt={`${project.title} 미리보기`} key={image} />)}</div></section>}
      </main>
    </>
  );
}

function CaseDescription({ children, className = "" }) {
  return <p className={`yeon-description ${className}`.trim()}>{children}</p>;
}

function WordConnectionPage() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const targets = document.querySelectorAll(".yeon-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return localizePage(<div className="yeon-case">
    <header className="yeon-hero">
      <img className="yeon-hero-media" src={imageUrl("yeonieum-long-path.png")} alt="물고기에서 위험까지 단어를 이어가는 연이음 플레이 화면" />
      <div className="yeon-hero-shade" aria-hidden="true" />
      <div className="yeon-hero-inner container">
        <a className="yeon-back" href="#/">← 프로젝트 목록</a>
        <div className="yeon-hero-copy">
          <h1>연이음</h1>
          <p>손패로 단어 사이의 '맥락'을 탐색하는 퍼즐 게임</p>
          <div className="yeon-hero-path" aria-label="연결 예시: 물고기, 물, 요리, 불, 위험"><span>(시작) 물고기</span><span>물</span><span>요리</span><span>불</span><span>(끝) 위험</span></div>
          <div className="yeon-hero-meta"><span>넥슨 게임잼 "재밌넥"</span><span>주제 "맥락"</span><span>4인 팀, 2박 3일</span><strong>14개 팀 중 3위(우수상)</strong></div>
          <div className="yeon-hero-links">
            <a href="https://subir-sh.github.io/WordLink-WebGL/" target="_blank" rel="noreferrer">플레이 ↗</a>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section className="yeon-section yeon-rules">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>게임 방법</h2>
            <CaseDescription>시작과 끝 단어 사이에 손패를 놓아 하나의 연결 체인을 완성하는 퍼즐입니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-feature-grid--two yeon-reveal">
            <article><h3>생명과 점수</h3><CaseDescription>무리한 연결 시 생명 소모, 긴 경로 보상</CaseDescription></article>
            <article><h3>단어 풀 확장</h3><CaseDescription>스테이지마다 단어 풀을 10개씩 확장<br />30개에서 시작해 최대 80개</CaseDescription></article>
          </div>
          <div className="yeon-game-example yeon-reveal">
            <figure>
              <img src={imageUrl("yeonieum-draw.png")} alt="시작 단어 물고기와 끝 단어 위험 사이를 이을 카드는 남기고 나머지를 다시 뽑는 화면" />
              <figcaption>
                <h3>필요한 카드를 남기고 다시 뽑습니다</h3>
                <CaseDescription>시작어와 끝말을 확인한 뒤, 연결에 쓸 카드는 남기고 불필요한 카드는 교체합니다.</CaseDescription>
              </figcaption>
            </figure>
            <div className="yeon-game-example-arrow" aria-hidden="true">→</div>
            <figure>
              <img src={imageUrl("yeonieum-success.png")} alt="물고기, 물, 위험을 차례로 연결해 퍼즐을 완성한 화면" />
              <figcaption>
                <h3>물고기 → 물 → 위험</h3>
                <CaseDescription>‘물고기는 물에 산다’, ‘물은 위험할 수 있다’처럼 인접한 두 관계가 모두 성립하면 체인이 완성됩니다.</CaseDescription>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-scope">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>담당 범위</h2>
            <CaseDescription>게임이 성립하는 단어 풀부터 관계 데이터, 판정과 피드백까지 연결했습니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-reveal">
            <article><h3>단어 풀 설계</h3><CaseDescription>이모지 표현 가능성, 주제군, 브리지/허브 개념</CaseDescription></article>
            <article><h3>단어 간 관계 데이터</h3><CaseDescription>CSV 구축, 그래프 구성, 판정 로직 연동</CaseDescription></article>
            <article><h3>게임 적용</h3><CaseDescription>연결 판정, 나레이터, 튜토리얼, 난이도 조정</CaseDescription></article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-criteria">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>맥락을 관계로 모델링</h2>
            <CaseDescription>게임잼 주제인 '맥락'을 단어 사이의 관계 그래프로 표현했습니다.</CaseDescription>
          </div>

          <div className="yeon-row-list yeon-reveal">
            <article>
              <strong>NODE</strong>
              <div>
                <h3>이모지로 표현되는 개념</h3>
                <CaseDescription>에셋 제작 시간을 줄이기 위해, 이모지로 자연스럽게 표현되는 개념을 노드로 삼았습니다.</CaseDescription>
                <CaseDescription>200개 후보에서 고립된 구체어를 제외하고, 여러 경로를 잇는 단어를 중심으로 최종 풀을 구성했습니다.</CaseDescription>
                <div className="yeon-node-example" aria-label="노드 예시: 과일, 요리, 성장">
                  <span><b aria-hidden="true">🍎</b>과일</span>
                  <span><b aria-hidden="true">🍳</b>요리</span>
                  <span><b aria-hidden="true">🌱</b>성장</span>
                </div>
              </div>
            </article>

            <article>
              <strong>EDGE</strong>
              <div>
                <h3>설명 없이 납득되는 관계</h3>
                <CaseDescription>두 단어만 보고 즉시 떠올릴 수 있는 관계만 남기고, 별도의 맥락이 필요한 관계는 제거했습니다.</CaseDescription>
                <CaseDescription>같은 종류, 사용과 역할, 장소, 재료와 생산물, 문화 연상으로 관계 유형을 정했습니다.<br />단순 공존이나 특수 상황이 필요한 연결은 제외했습니다.</CaseDescription>
                <div className="yeon-edge-example" aria-label="관계 예시: 토끼와 당근, 열쇠와 문">
                  <div><span>🐇 토끼</span><b aria-hidden="true">—</b><span>🥕 당근</span></div>
                  <div><span>🔑 열쇠</span><b aria-hidden="true">—</b><span>🚪 문</span></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-problem">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>관계 그래프 구축과 보정</h2>
            <CaseDescription>자동으로 만든 관계만으로는 퍼즐이 안정적으로 성립하지 않았습니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-feature-grid--two yeon-reveal">
            <article><h3>후보 탐색</h3><CaseDescription>Word2Vec은 ‘사자–호랑이’ 같은 유사 단어에는 강했지만, 사용과 역할 관계는 놓쳤습니다. 이 빈틈만 LLM 후보로 확장했습니다.</CaseDescription></article>
            <article><h3>관계 확정</h3><CaseDescription>사람이 후보를 검수해 고정 그래프를 만들고 BFS 판정에 사용했습니다.</CaseDescription></article>
          </div>
          <div className="yeon-draw-check yeon-reveal">
            <article>
              <strong>전체 그래프</strong>
              <CaseDescription>단어가 연결돼 있어도 필요한 중간 카드가 손에 없으면 경로를 만들 수 없었습니다.</CaseDescription>
            </article>
            <b aria-hidden="true">≠</b>
            <article className="is-playable">
              <strong>실제 손패</strong>
              <CaseDescription>각 스테이지에서 무작위로 뽑은 손패만으로 경로가 성립하는지 검증하고, 그 결과를 기준으로 노드와 관계를 다시 조정했습니다.</CaseDescription>
            </article>
          </div>
          <div className="yeon-graph-compare yeon-reveal">
            <article>
              <div className="yeon-graph-label">
                <h3>이전</h3>
                <CaseDescription><strong>100개</strong> 단어, <strong>236–257개</strong> 관계<br />평균 차수 4.7~5.1</CaseDescription>
              </div>
              <div className="yeon-graph-visual">
                <svg className="yeon-graph" viewBox="0 0 480 260" role="img" aria-label="연결이 적고 고립된 단어가 많은 초기 그래프"><g className="graph-edges"><line x1="55" y1="50" x2="170" y2="88"/><line x1="170" y1="88" x2="270" y2="48"/><line x1="105" y1="190" x2="215" y2="150"/><line x1="215" y1="150" x2="330" y2="200"/><line x1="365" y1="85" x2="425" y2="130"/></g><g className="graph-nodes"><circle cx="55" cy="50" r="11"/><circle cx="170" cy="88" r="11"/><circle cx="270" cy="48" r="11"/><circle cx="420" cy="42" r="11" className="is-isolated"/><circle cx="105" cy="190" r="11"/><circle cx="215" cy="150" r="11"/><circle cx="330" cy="200" r="11"/><circle cx="365" cy="85" r="11"/><circle cx="425" cy="130" r="11"/><circle cx="55" cy="135" r="11" className="is-isolated"/><circle cx="255" cy="225" r="11" className="is-isolated"/><circle cx="440" cy="220" r="11" className="is-isolated"/></g></svg>
              </div>
            </article>
            <div className="yeon-graph-arrow" aria-hidden="true">→</div>
            <figure className="yeon-graph-capture">
              <img src={imageUrl("yeonieum-final-graph.png")} alt="이모지 단어 노드와 관계 간선으로 구성한 연이음의 실제 최종 그래프" />
              <figcaption>
                <h3>이후</h3>
                <CaseDescription>최종 <strong>80개</strong> 단어, <strong>620개</strong> 관계<br />최소 차수 9, 평균 차수 15.50</CaseDescription>
              </figcaption>
            </figure>
          </div>
          <CaseDescription className="yeon-reveal">연결이 적은 ‘온도계’, ‘소포’와 고립된 주제군인 ‘병원–의사–약’은 제거했습니다. 여러 경로를 잇는 ‘물’, ‘위험’, ‘정보’는 억지 관계가 생기지 않도록 반복 검수했습니다.</CaseDescription>
        </div>
      </section>

      <section className="yeon-section yeon-play">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>플레이어 피드백</h2>
            <CaseDescription>판정 결과를 이해 가능한 반응과 안내로 바꿔, 다음 선택으로 이어지게 했습니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-feature-grid--two yeon-reveal">
            <article>
              <h3>예외 관계 처리</h3>
              <CaseDescription>‘사랑–불’, ‘씨앗–돈’처럼 한 단계 이상의 해석이 필요한 관계는 실패로 판정하되, 나레이터의 특수 대사로 해석 가능성을 인정했습니다.</CaseDescription>
            </article>
            <article>
              <h3>게임 진행 튜토리얼</h3>
              <CaseDescription>조작과 점수 규칙은 최초 1회 안내하고, 설정에서 다시 볼 수 있게 했습니다.</CaseDescription>
            </article>
          </div>
        </div>
      </section>

      <section className="yeon-result">
        <div className="container">
          <div className="yeon-result-copy yeon-reveal">
            <h2>결과</h2>
            <p><strong>14개 팀 중 3위(우수상)</strong></p>
          </div>
          <div className="yeon-result-foot yeon-reveal">
            <div>
              <CaseDescription>반복 플레이 가능한 빌드를 현장에 제출하였고, 종료 후에는 넥슨 사내에 공유되어 좋은 반응을 얻었습니다.<br />차후에는 예외 조합에 대한 보상이나 실패 근거를 보강해, 고정 규칙과 창의적 해석의 간극을 줄이려고 합니다.</CaseDescription>
            </div>
            <a href="#/">다른 프로젝트 보기 →</a>
          </div>
        </div>
      </section>
    </main>
  </div>, i18n.resolvedLanguage, { en: wordLinkEn, ja: wordLinkJa });
}

export default function ProjectPage({ project }) {
  return project.caseStudy ? <WordConnectionPage /> : <DefaultProjectPage project={project} />;
}
