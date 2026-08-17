import { useEffect } from "react";
import ProjectLinkIcon from "../components/ProjectLinkIcon";

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

function WordConnectionPage() {
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

  return <div className="yeon-case">
    <header className="yeon-hero">
      <img className="yeon-hero-media" src="/assets/images/yeonieum-long-path.png" alt="물고기에서 위험까지 단어를 이어가는 연이음 플레이 화면" />
      <div className="yeon-hero-shade" aria-hidden="true" />
      <div className="yeon-hero-inner container">
        <a className="yeon-back" href="#/">← 프로젝트 목록</a>
        <div className="yeon-hero-copy">
          <h1>연이음</h1>
          <p>두 단어 사이를 연관 단어 카드로 잇는 퍼즐</p>
          <div className="yeon-hero-path" aria-label="연결 예시: 물고기, 물, 요리, 불, 위험"><span>물고기</span><span>물</span><span>요리</span><span>불</span><span>위험</span></div>
          <div className="yeon-hero-meta"><span>NEXON 재밌넥</span><span>4인 팀</span><span>2박 3일</span><strong>14개 팀 중 3위(우수상)</strong></div>
        </div>
      </div>
    </header>

    <main>
      <section className="yeon-section yeon-rules">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>게임 방법</h2>
            <p>서로 관련 없어 보이는 시작과 끝 단어 사이를 카드로 이어 제출하는 단어 연결 퍼즐입니다. 더 긴 경로로 점수를 쌓고, 제한된 생명 안에서 다음 스테이지에 도전합니다.</p>
          </div>
          <div className="yeon-feature-grid yeon-feature-grid--two yeon-reveal">
            <article><h3>카드로 맥락 만들기</h3><p>카드 배치, 경로 완성, 제출</p></article>
            <article><h3>생명과 점수</h3><p>무리한 연결, 생명 소모, 긴 경로 보상</p></article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-scope">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>담당 범위</h2>
            <p>하나의 관계 그래프를 만들고, 이를 게임 규칙과 피드백에 공통으로 연결했습니다.</p>
          </div>
          <div className="yeon-feature-grid yeon-reveal">
            <article><h3>연결 규칙</h3><p>단어 풀, 관계 검수, 카드 판정, BFS</p></article>
            <article><h3>게임 진행</h3><p>손패, 스테이지, 점수, 생명, 랭킹</p></article>
            <article><h3>피드백</h3><p>힌트, 나레이터 반응, 최초 실행 튜토리얼</p></article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-problem">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>그래프 검증</h2>
            <p>초기 그래프는 <strong>100개 노드와 236–257개 엣지</strong>, 평균 최단거리 <strong>3.39</strong>으로 연결돼 보였습니다. 하지만 전체 그래프의 경로와 실제 드로우에서 만들 수 있는 경로는 달랐습니다.</p>
          </div>
          <div className="yeon-probability yeon-reveal">
            <div className="yeon-probability-steps" aria-label="100개 노드 중 시작과 끝 2개를 제외한 98개 카드 후보에서 10장을 뽑아 거리 6 경로의 중간 카드 5장을 모두 얻는 조건">
              <div><strong>98장</strong><span>시작과 끝을 뺀 카드 후보</span></div>
              <b>→</b>
              <div><strong>10장</strong><span>한 번에 보는 손패</span></div>
              <b>→</b>
              <div><strong>5장</strong><span>거리 6의 중간 카드</span></div>
            </div>
            <div className="yeon-probability-result"><strong>0.0004%</strong><span>필요한 5장이 함께 잡힐 확률</span></div>
          </div>
          <p className="yeon-redesign-note yeon-reveal">그래프에는 경로가 있어도, 플레이어가 뽑은 카드로 만든 부분 그래프에는 경로가 없었습니다. 그래서 평균 최단거리만이 아니라 실제 드로우에서 경로가 생기는지를 함께 검증했습니다.</p>
        </div>
      </section>

      <section className="yeon-section yeon-criteria">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>선정 기준</h2>
            <p>카드가 경로를 만들고, 연결이 바로 납득되는지를 함께 확인했습니다.</p>
          </div>

          <div className="yeon-row-list yeon-reveal">
            <article>
              <strong>NODE</strong>
              <div>
                <h3>경로를 이어 주는 단어</h3>
                <p>200개에서 시작해 30–50개로 좁혔습니다. 고립된 구체어는 빼고, 과일, 요리, 성장처럼 여러 경로를 잇는 중간 단어를 넣었습니다.</p>
              </div>
            </article>

            <article>
              <strong>EDGE</strong>
              <div>
                <h3>설명 없이 납득되는 관계</h3>
                <p>토끼와 당근, 열쇠와 문처럼 즉시 떠올릴 수 있는 관계만 남겼습니다. 맥락이 더 필요한 관계는 제거했습니다.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-redesign">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>그래프 보정</h2>
            <p>연결 수가 아니라 실제 손패에서 만들어지는 경로와 그 관계의 납득감을 기준으로 보정했습니다.</p>
          </div>
          <div className="yeon-graph-compare yeon-reveal">
            <article>
              <div className="yeon-graph-label"><h3>초기 그래프</h3><p><strong>100개</strong> 단어, <strong>236–257개</strong> 관계</p></div>
              <svg className="yeon-graph" viewBox="0 0 480 260" role="img" aria-label="연결이 적고 고립된 단어가 많은 초기 그래프"><g className="graph-edges"><line x1="55" y1="50" x2="170" y2="88"/><line x1="170" y1="88" x2="270" y2="48"/><line x1="105" y1="190" x2="215" y2="150"/><line x1="215" y1="150" x2="330" y2="200"/><line x1="365" y1="85" x2="425" y2="130"/></g><g className="graph-nodes"><circle cx="55" cy="50" r="11"/><circle cx="170" cy="88" r="11"/><circle cx="270" cy="48" r="11"/><circle cx="420" cy="42" r="11" className="is-isolated"/><circle cx="105" cy="190" r="11"/><circle cx="215" cy="150" r="11"/><circle cx="330" cy="200" r="11"/><circle cx="365" cy="85" r="11"/><circle cx="425" cy="130" r="11"/><circle cx="55" cy="135" r="11" className="is-isolated"/><circle cx="255" cy="225" r="11" className="is-isolated"/><circle cx="440" cy="220" r="11" className="is-isolated"/></g></svg>
            </article>
            <div className="yeon-graph-arrow" aria-hidden="true">→</div>
            <article>
              <div className="yeon-graph-label"><h3>플레이 기준 재설계</h3><p><strong>30–50개</strong> 단어, 최소 차수 <strong>8–9</strong>, 평균 차수 <strong>14</strong></p></div>
              <svg className="yeon-graph" viewBox="0 0 480 260" role="img" aria-label="허브 단어를 중심으로 촘촘히 연결된 개선 그래프"><g className="graph-edges"><line x1="240" y1="130" x2="65" y2="50"/><line x1="240" y1="130" x2="165" y2="45"/><line x1="240" y1="130" x2="335" y2="45"/><line x1="240" y1="130" x2="420" y2="85"/><line x1="240" y1="130" x2="70" y2="185"/><line x1="240" y1="130" x2="165" y2="220"/><line x1="240" y1="130" x2="325" y2="215"/><line x1="240" y1="130" x2="420" y2="190"/><line x1="65" y1="50" x2="165" y2="45"/><line x1="165" y1="45" x2="335" y2="45"/><line x1="335" y1="45" x2="420" y2="85"/><line x1="70" y1="185" x2="165" y2="220"/><line x1="165" y1="220" x2="325" y2="215"/><line x1="325" y1="215" x2="420" y2="190"/><line x1="65" y1="50" x2="70" y2="185"/><line x1="420" y1="85" x2="420" y2="190"/></g><g className="graph-nodes"><circle cx="240" cy="130" r="17" className="is-hub"/><circle cx="65" cy="50" r="11"/><circle cx="165" cy="45" r="11"/><circle cx="335" cy="45" r="11"/><circle cx="420" cy="85" r="11"/><circle cx="70" cy="185" r="11"/><circle cx="165" cy="220" r="11"/><circle cx="325" cy="215" r="11"/><circle cx="420" cy="190" r="11"/></g></svg>
            </article>
          </div>
          <p className="yeon-redesign-note yeon-reveal">저차수 단어와 고립된 주제군을 먼저 제거했습니다. 물, 돈, 여행, 정보 같은 허브는 경로를 늘리되 억지 관계가 생기지 않도록 반복 검수했습니다.</p>
        </div>
      </section>

      <section className="yeon-section yeon-system">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>데이터 구축</h2>
            <p>자동 생성은 후보를 넓히는 데만 쓰고, 게임에 들어갈 연결은 사람이 직접 확정했습니다.</p>
          </div>
          <div className="yeon-feature-grid yeon-reveal">
            <article><h3>후보 생성</h3><p>LLM, 관계 유형, 후보 확장</p></article>
            <article><h3>관계 확정</h3><p>사람 검수, 삭제, CSV 고정</p></article>
            <article><h3>게임 적용</h3><p>Unity 그래프, BFS, 판정, 힌트, 난이도</p></article>
          </div>
          <div className="yeon-ai-evidence yeon-reveal">
            <div><strong>1.5%</strong><span>유사도 0.7 이상 후보</span></div>
            <div><strong>5.5%</strong><span>유사도 0.6 이상 후보</span></div>
            <p>자동 유사도만으로는 부족했습니다. 플레이 중에는 고정 그래프와 BFS만 사용해, 같은 입력에 같은 판정이 즉시 나오게 했습니다.</p>
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
              <p>반복 플레이 가능한 빌드를 현장에 제출했습니다. 이후에는 실패 이유와 의외의 조합 보상을 더 분명히 설계할 과제가 남았습니다.</p>
            </div>
            <a href="#/">다른 프로젝트 보기 →</a>
          </div>
        </div>
      </section>
    </main>
  </div>;
}

export default function ProjectPage({ project }) {
  return project.caseStudy ? <WordConnectionPage /> : <DefaultProjectPage project={project} />;
}
