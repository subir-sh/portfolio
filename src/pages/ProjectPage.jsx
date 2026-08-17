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

function CaseDescription({ children, className = "" }) {
  return <p className={`yeon-description ${className}`.trim()}>{children}</p>;
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
          <p>'맥락'을 단어 간의 관계로 풀어낸 퍼즐</p>
          <div className="yeon-hero-path" aria-label="연결 예시: 물고기, 물, 요리, 불, 위험"><span>(시작) 물고기</span><span>물</span><span>요리</span><span>불</span><span>(끝) 위험</span></div>
          <div className="yeon-hero-meta"><span>넥슨 게임잼 "재밌넥"</span><span>4인 팀</span><span>2박 3일</span><strong>14개 팀 중 3위(우수상)</strong></div>
        </div>
      </div>
    </header>

    <main>
      <section className="yeon-section yeon-rules">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>게임 방법</h2>
            <CaseDescription>시작과 끝 단어 사이에 카드를 놓아, 인접한 단어 쌍의 관계가 이어지는 체인을 제출하는 퍼즐입니다.<br />더 긴 경로로 점수를 쌓고, 제한된 생명 안에서 더 높은 스테이지에 도전합니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-reveal">
            <article><h3>연결 체인</h3><CaseDescription>인접 단어 쌍의 관계, 경로 완성, 제출</CaseDescription></article>
            <article><h3>생명과 점수</h3><CaseDescription>무리한 연결 시 생명 소모, 긴 경로 보상</CaseDescription></article>
            <article><h3>단어 풀 확장</h3><CaseDescription>스테이지마다 단어 풀을 10개씩 확장<br />30개에서 시작해 최대 80개</CaseDescription></article>
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
            <article><h3>단어 간 관계 데이터</h3><CaseDescription>임베딩 검증, LLM 후보 생성, 사람 검수, CSV</CaseDescription></article>
            <article><h3>게임 적용</h3><CaseDescription>연결 판정, 나레이터, 튜토리얼, 난이도 조정</CaseDescription></article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-criteria">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>맥락을 관계로 모델링</h2>
            <CaseDescription>게임잼 주제인 '맥락'을 단어 사이의 관계 그래프로 표현했습니다.<br />단어 카드를 정점, 직접 연결 가능한 관계를 간선으로 고정하여, 연결 판정에 사용했습니다.</CaseDescription>
          </div>

          <div className="yeon-row-list yeon-reveal">
            <article>
              <strong>NODE</strong>
              <div>
                <h3>이모지로 표현되는 개념</h3>
                <CaseDescription>에셋 제작 시간을 줄이기 위해, 이모지로 자연스럽게 표현되는 개념을 노드로 삼았습니다.</CaseDescription>
                <CaseDescription>200개에서 시작해 30–50개로 좁혔습니다.<br />고립된 구체어는 빼고, 과일, 요리, 성장처럼 여러 경로를 잇는 중간 단어를 넣었습니다.</CaseDescription>
              </div>
            </article>

            <article>
              <strong>EDGE</strong>
              <div>
                <h3>설명 없이 납득되는 관계</h3>
                <CaseDescription>토끼와 당근, 열쇠와 문처럼 즉시 떠올릴 수 있는 관계만 남겼습니다.<br />맥락이 더 필요한 관계는 제거했습니다.</CaseDescription>
                <CaseDescription>같은 종류, 사용과 역할, 장소, 재료와 생산물, 문화 연상으로 관계 유형을 정했습니다.<br />단순 공존이나 특수 상황이 필요한 연결은 제외했습니다.</CaseDescription>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="yeon-section yeon-problem">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>그래프 검증</h2>
            <CaseDescription>초기 그래프는 <strong>100개 노드와 236–257개 엣지</strong>, 평균 최단거리 <strong>3.39</strong>으로 어느정도 연결성이 있어 보였습니다.<br />하지만 전체 그래프의 경로와 실제 드로우에서 만들 수 있는 경로는 달랐습니다.</CaseDescription>
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
          <CaseDescription className="yeon-reveal">그래프에는 경로가 있어도, 플레이어가 뽑은 카드로 만든 부분 그래프에는 경로가 없었습니다.<br />그래서 평균 최단거리만이 아니라 실제 드로우에서 경로가 생기는지를 함께 검증했습니다.</CaseDescription>
        </div>
      </section>

      <section className="yeon-section yeon-redesign">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>그래프 보정</h2>
            <CaseDescription>연결 수가 아니라 실제 손패에서 만들어지는 경로와 그 관계의 납득감을 기준으로 보정했습니다.</CaseDescription>
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
              <img src="/assets/images/yeonieum-final-graph.png" alt="이모지 단어 노드와 관계 간선으로 구성한 연이음의 실제 최종 그래프" />
              <figcaption>
                <h3>이후</h3>
                <CaseDescription>최종 <strong>80개</strong> 단어, <strong>620개</strong> 관계<br />최소 차수 9, 평균 차수 15.50</CaseDescription>
              </figcaption>
            </figure>
          </div>
          <CaseDescription className="yeon-reveal">저차수 단어(예: 온도계, 소포 등)와 고립된 주제군(예: 병원-의사-약)을 먼저 제거했습니다.<br />다른 단어와 연관성이 많은 허브(예: 물, 위험, 정보 등)는 경로를 늘리되 억지 관계가 생기지 않도록 반복 검수했습니다.</CaseDescription>
        </div>
      </section>

      <section className="yeon-section yeon-system">
        <div className="container">
          <div className="yeon-section-head yeon-reveal">
            <h2>데이터 구축</h2>
            <CaseDescription>임베딩으로 관계를 자동 생성하려 했지만, 게임에 필요한 연결을 만들지 못했습니다.<br />그래서 후보 생성과 최종 판정을 분리했습니다.</CaseDescription>
          </div>
          <div className="yeon-feature-grid yeon-reveal">
            <article><h3>임베딩 검증</h3><CaseDescription>Word2Vec, 코사인 유사도 상위 5개</CaseDescription></article>
            <article><h3>후보 확장</h3><CaseDescription>LLM, 관계 유형, 넓은 후보 생성</CaseDescription></article>
            <article><h3>관계 고정</h3><CaseDescription>사람 검수, 그래프, BFS</CaseDescription></article>
          </div>
          <div className="yeon-ai-evidence yeon-reveal">
            <div><strong>1.5%</strong><span>유사도 0.7 이상 후보</span></div>
            <div><strong>5.5%</strong><span>유사도 0.6 이상 후보</span></div>
            <CaseDescription>Word2Vec은 사자와 호랑이처럼 비슷한 종류는 찾았지만, <br />토끼와 당근처럼 게임에 필요한 사용과 역할 관계는 놓쳤습니다.<br />플레이 중에는 LLM이 생성하고 사람이 검수한 고정 그래프와 BFS만 사용해, <br />같은 입력에 같은 판정이 즉시 나오게 했습니다.</CaseDescription>
          </div>
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
              <h3>예외 관계 피드백</h3>
              <CaseDescription>사랑–불, 씨앗–돈처럼 한 단계 이상의 사고가 필요한 맥락은 실패로 판정<br />나레이터의 특수 대사를 통해 해석 가능성은 인정</CaseDescription>
            </article>
            <article>
              <h3>게임 진행 설명 튜토리얼</h3>
              <CaseDescription>조작법, 카드 배치, 버리기, 점수, 생명<br />최초 1회만 노출하고 설정에서 다시보기 제공</CaseDescription>
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
              <CaseDescription>반복 플레이 가능한 빌드를 현장에 제출하였고, 종료 후에는 넥슨 사내에 공유되어 좋은 반응을 얻었습니다.<br />차후에는 예외 조합에 대한 보상이나 실패 근거를 보강해, 고정 규칙과 창의적 해석의 간극을 줄일 수 있습니다.</CaseDescription>
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
