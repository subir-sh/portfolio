import { useEffect } from "react";
import {
  ArrowUpRight,
  Boxes,
  Clock3,
  Layers3,
  Play,
  RotateCcw,
  Save,
} from "lucide-react";
import githubIcon from "../../assets/icons/github.svg";

const imageUrl = (filename) =>
  `${import.meta.env.BASE_URL}assets/images/${filename}`;

const links = {
  play: "https://2024fall-swpp.github.io/team-project-for-2024-fall-swpp-team-12/",
  github:
    "https://github.com/2024FALL-SWPP/team-project-for-2024-fall-swpp-team-12",
  playlist:
    "https://www.youtube.com/playlist?list=PLyip1lR-pqZOz7Fb8o9VwufTkeqWq2EMe",
};

function ExternalLink({ href, icon: Icon, children, className = "" }) {
  return (
    <a
      className={`chronos-link ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {Icon && <Icon aria-hidden="true" />}
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function GithubIcon() {
  return <img src={githubIcon} alt="" />;
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="chronos-section-heading chronos-reveal">
      <p className="chronos-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="chronos-lead">{children}</p>}
    </div>
  );
}

export default function ChronosPage() {
  useEffect(() => {
    const targets = document.querySelectorAll(".chronos-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="chronos-case">
      <header className="chronos-hero">
        <img
          className="chronos-hero-image"
          src={imageUrl("chronos-main-1.png")}
          alt="플레이어와 과거 행동을 재생하는 분신이 함께 퍼즐을 푸는 Chronos 플레이 화면"
        />
        <div className="chronos-hero-overlay" aria-hidden="true" />
        <div className="chronos-hero-grid" aria-hidden="true" />

        <div className="chronos-container chronos-hero-inner">
          <a className="chronos-back" href="#/">
            ← 프로젝트 목록
          </a>

          <div className="chronos-hero-copy">
            <p className="chronos-kicker">
              SOFTWARE DEVELOPMENT PRINCIPLES AND PRACTICE · 5인 팀
            </p>
            <h1>Chronos</h1>
            <p className="chronos-hero-title">
              과거의 나와 동시에 푸는 턴제 3D 퍼즐
            </p>
            <p className="chronos-hero-description">
              시간을 되돌리면 이전 행동이 분신으로 재생됩니다. 여러 팀원이 만든
              기능을 하나의 턴과 시간축에 통합해, 16개 레벨을 플레이 가능한
              WebGL 게임으로 완성했습니다.
            </p>

            <div className="chronos-hero-actions">
              <ExternalLink href={links.play} icon={Play} className="is-primary">
                게임 플레이
              </ExternalLink>
              <ExternalLink href={links.github} icon={GithubIcon}>
                GitHub
              </ExternalLink>
              <ExternalLink href={links.playlist} icon={Play}>
                플레이 영상
              </ExternalLink>
            </div>
          </div>

          <div className="chronos-outcomes chronos-reveal">
            <div>
              <strong>16개</strong>
              <span>처음부터 끝까지 플레이 가능한 레벨</span>
            </div>
            <div>
              <strong>WebGL</strong>
              <span>브라우저에서 실행되는 공개 빌드</span>
            </div>
            <div>
              <strong>3개</strong>
              <span>직접 설계하고 구현한 퍼즐 레벨</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="chronos-section chronos-play-section">
          <div className="chronos-container">
            <SectionHeading
              eyebrow="SHIPPED EXPERIENCE"
              title="기억하고, 되돌리고, 협력한다"
            >
              플레이어가 남긴 행동을 과거의 분신이 그대로 재생합니다. 혼자서는
              동시에 누를 수 없는 버튼과 이동 경로를 현재의 나와 분신이 나눠
              해결하는 것이 핵심 플레이입니다.
            </SectionHeading>

            <div className="chronos-play-grid chronos-reveal">
              <div className="chronos-video-wrap">
                <iframe
                  src="https://www.youtube.com/embed/QmiCr-Hd9h8?rel=0"
                  title="직접 설계하고 구현한 Chronos L-003-2 플레이 영상"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <p>
                  직접 설계·구현한 L-003-2. 되감은 행동을 분신이 재생하는 동안
                  현재 플레이어가 다음 경로를 수행합니다.
                </p>
              </div>

              <ol className="chronos-game-loop">
                <li>
                  <span>01</span>
                  <div>
                    <strong>행동 기록</strong>
                    <p>이동과 오브젝트 상호작용을 턴 단위로 남깁니다.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>과거 선택</strong>
                    <p>명령 UI에서 돌아갈 턴을 미리 확인합니다.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>분신 생성</strong>
                    <p>삭제된 미래의 명령을 분신의 재생 경로로 바꿉니다.</p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>동시 해결</strong>
                    <p>현재의 나와 과거의 행동이 한 턴 안에서 협력합니다.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="chronos-section chronos-ownership-section">
          <div className="chronos-container">
            <SectionHeading
              eyebrow="MY OWNERSHIP"
              title="흩어진 기능을 같은 규칙으로 묶어, 한 게임으로 연결했습니다"
            >
              아래 범위는 코드와 PR 기록으로 확인되는 직접 기여입니다. 게임
              기획, 전체 레벨, 아트·애니메이션·사운드와 최종 빌드는 5인 팀의
              공동 결과입니다.
            </SectionHeading>

            <div className="chronos-ownership-grid chronos-reveal">
              <article>
                <Clock3 aria-hidden="true" />
                <p>01 · CORE LOOP</p>
                <h3>하나의 시간축</h3>
                <ul>
                  <li>플레이어·분신·퍼즐 오브젝트의 턴 진행 통합</li>
                  <li>다중 오브젝트 상태 복원과 분신 재생 연결</li>
                  <li>충돌과 이동이 끝난 뒤 로그를 남기는 완료 기준</li>
                </ul>
              </article>
              <article>
                <RotateCcw aria-hidden="true" />
                <p>02 · PLAYABILITY</p>
                <h3>실제로 쓸 수 있는 되감기</h3>
                <ul>
                  <li>턴별 명령을 보여주는 시간 되돌리기 UI</li>
                  <li>Undo·Reset·Pause와 자동 저장·불러오기</li>
                  <li>이동 장애물, 레이저와 캐릭터 밀림 처리</li>
                </ul>
              </article>
              <article>
                <Layers3 aria-hidden="true" />
                <p>03 · DELIVERY</p>
                <h3>레벨과 기능의 통합</h3>
                <ul>
                  <li>L-003-1·2·3 직접 설계 및 구현</li>
                  <li>레벨별 오브젝트 상태 저장과 복원</li>
                  <li>분리된 씬을 연결해 16개 레벨 진행 흐름 완성</li>
                </ul>
              </article>
            </div>
            <p className="chronos-ownership-note chronos-reveal">
              5인 팀 프로젝트 · 익명 동료평가 기여도 22% (팀 평균 20%)
            </p>
          </div>
        </section>

        <section className="chronos-section chronos-experience-section">
          <div className="chronos-container">
            <SectionHeading
              eyebrow="PRODUCT COMPLETENESS"
              title="복잡한 규칙을 플레이 가능한 경험으로"
            >
              시간 되돌리기 자체보다 중요한 것은 플레이어가 현재 상태를
              이해하고, 실수를 복구하고, 다음 레벨까지 계속 플레이할 수 있게
              만드는 일이었습니다.
            </SectionHeading>

            <div className="chronos-experience-grid chronos-reveal">
              <figure>
                <img
                  src={imageUrl("chronos-main-2.png")}
                  alt="현재 턴과 이전 이동 명령을 화면 위에 표시하는 Chronos 시간 되돌리기 UI"
                />
                <figcaption>
                  되돌릴 시점과 각 턴의 명령을 같은 화면에서 확인하도록 구성한
                  rewind UI
                </figcaption>
              </figure>
              <div className="chronos-feature-list">
                <article>
                  <RotateCcw aria-hidden="true" />
                  <div>
                    <h3>실수 복구</h3>
                    <p>
                      Undo와 Reset을 추가해 복잡한 퍼즐에서도 다시 시작하는
                      비용을 낮췄습니다.
                    </p>
                  </div>
                </article>
                <article>
                  <Save aria-hidden="true" />
                  <div>
                    <h3>진행 보존</h3>
                    <p>
                      레벨과 오브젝트 상태를 자동 저장·복원해 세션이 끊겨도
                      이어서 플레이할 수 있게 했습니다.
                    </p>
                  </div>
                </article>
                <article>
                  <Boxes aria-hidden="true" />
                  <div>
                    <h3>퍼즐 확장</h3>
                    <p>
                      이동 장애물과 레이저가 캐릭터·상자·버튼과 같은 턴 규칙
                      안에서 상호작용하도록 구현했습니다.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="chronos-section chronos-problem-section">
          <div className="chronos-container">
            <SectionHeading
              eyebrow="CORE CASE · CONSISTENT WORLD STATE"
              title="되감기를 캐릭터 기능이 아니라, 월드 전체의 상태 전환으로"
            >
              팀원이 만든 캐릭터와 퍼즐 오브젝트는 각각 동작했지만, 되감기
              이후에도 같은 결과를 내려면 모두가 정확히 같은 턴을 가리켜야
              했습니다. 이 통합이 Chronos를 데모가 아닌 완성된 게임으로 만드는
              핵심 문제였습니다.
            </SectionHeading>

            <div className="chronos-timeline chronos-reveal">
              <div className="chronos-timeline-ruler" aria-hidden="true">
                <span>T-3</span>
                <span>T-2</span>
                <span>T-1</span>
                <span>T</span>
              </div>
              <div className="chronos-timeline-row is-player">
                <strong>캐릭터</strong>
                <span>플레이어 위치·방향·명령</span>
                <span>분신 위치·재생할 명령</span>
              </div>
              <div className="chronos-timeline-row">
                <strong>오브젝트</strong>
                <span>상자·이동 장애물의 위치</span>
                <span>버튼·레버의 활성 상태</span>
              </div>
              <div className="chronos-timeline-row is-restore">
                <strong>되감기</strong>
                <span>모든 기록을 같은 턴으로 이동</span>
                <span>잘라낸 미래를 분신 명령으로 전달</span>
              </div>
            </div>

            <div className="chronos-decision chronos-reveal">
              <p>설계 판단</p>
              <strong>
                기능별 기록 구조는 유지하되, TurnManager가 같은 턴을 가리키게
                조정하고 복원 순서를 통제했습니다.
              </strong>
              <span>
                그 결과 새 퍼즐 오브젝트가 추가되어도 시간 되돌리기, Undo,
                저장·불러오기에서 같은 상태 기준을 사용할 수 있었습니다.
              </span>
            </div>

            <div className="chronos-turn-subheading chronos-reveal">
              <p className="chronos-eyebrow">THE TURN BOUNDARY</p>
              <h3>같은 시점의 상태만 남기려면, 언제 한 턴이 끝나는지도 같아야 했습니다</h3>
              <p>
                플레이어 입력 뒤에도 분신 이동, 상자 밀기, 버튼 변화와 장애물
                충돌이 연쇄적으로 이어집니다. 중간 상태를 기록하지 않도록 모든
                결과가 끝난 순간을 공통 턴 경계로 만들었습니다.
              </p>
            </div>

            <div className="chronos-turn-flow chronos-reveal">
              <article>
                <span>01</span>
                <strong>입력 승인</strong>
                <p>현재 격자와 충돌을 검사해 턴을 시작</p>
              </article>
              <i aria-hidden="true">→</i>
              <article>
                <span>02</span>
                <strong>동시 진행</strong>
                <p>플레이어·분신·오브젝트가 각 동작 수행</p>
              </article>
              <i aria-hidden="true">→</i>
              <article>
                <span>03</span>
                <strong>완료 대기</strong>
                <p>이동, 밀림, 상태 변화가 모두 끝났는지 확인</p>
              </article>
              <i aria-hidden="true">→</i>
              <article className="is-final">
                <span>04</span>
                <strong>상태 기록</strong>
                <p>같은 시점의 위치와 상태를 턴 로그에 저장</p>
              </article>
            </div>

            <div className="chronos-obstacle-case chronos-reveal">
              <div>
                <p className="chronos-eyebrow">EDGE CASE</p>
                <h3>이동 장애물이 캐릭터를 미는 순간</h3>
              </div>
              <p>
                장애물 이동 → 캐릭터가 밀릴 수 있는지 검사 → 캐릭터 위치 갱신 →
                버튼과 충돌 상태 재계산까지 끝난 뒤에만 스냅샷을 남겼습니다.
                애니메이션의 종료와 논리 상태의 완료를 같은 턴 경계에서 확인해
                되감기 후에도 충돌 결과가 재현되도록 했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="chronos-result">
          <div className="chronos-container">
            <div className="chronos-result-heading chronos-reveal">
              <p className="chronos-eyebrow">RESULT</p>
              <h2>아이디어를 설명하는 프로토타입이 아니라,<br />끝까지 플레이되는 게임으로</h2>
            </div>

            <div className="chronos-result-grid chronos-reveal">
              <article>
                <strong>16개</strong>
                <p>시간 되돌리기와 분신 기믹을 활용하는 완성 레벨</p>
              </article>
              <article>
                <strong>공개 빌드</strong>
                <p>설치 없이 브라우저에서 끝까지 플레이 가능한 WebGL 게임</p>
              </article>
              <article>
                <strong>3개 레벨</strong>
                <p>L-003-1·2·3의 기믹 조합과 동선을 직접 설계·구현</p>
              </article>
            </div>
            <p className="chronos-result-note chronos-reveal">
              수업 내 최종 프로젝트 평가 상위 20%
            </p>

            <div className="chronos-result-footer chronos-reveal">
              <p>
                캐릭터와 퍼즐 오브젝트가 서로 다른 시점을 가리키던 문제를 하나의
                턴·시간축으로 통합했습니다. 여기에 되감기 UI, 저장·복원, 레벨
                전환을 연결해 다른 사람이 처음부터 끝까지 플레이할 수 있는
                게임으로 완성했습니다.
              </p>
              <div>
                <ExternalLink href={links.play} icon={Play} className="is-primary">
                  게임 플레이
                </ExternalLink>
                <a className="chronos-other-projects" href="#/">
                  다른 프로젝트 보기 →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
