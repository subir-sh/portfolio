import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CaseHero, CaseResult, CaseSection } from "../components/CaseStudy";
import localizePage from "../locales/localizePage";
import { chronosEn, chronosJa } from "../locales/chronos";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

const links = {
  play: "https://2024fall-swpp.github.io/team-project-for-2024-fall-swpp-team-12/",
  github: "https://github.com/2024FALL-SWPP/team-project-for-2024-fall-swpp-team-12",
  playlist: "https://www.youtube.com/playlist?list=PLyip1lR-pqZOz7Fb8o9VwufTkeqWq2EMe",
};

const directionMap = {
  up: { arrow: "↑", name: "위", dx: 0, dy: -1 },
  down: { arrow: "↓", name: "아래", dx: 0, dy: 1 },
  left: { arrow: "←", name: "왼쪽", dx: -1, dy: 0 },
  right: { arrow: "→", name: "오른쪽", dx: 1, dy: 0 },
};
const initialRecordedInputs = ["up", "right", "right"];
const exampleNewInputs = ["right", "down", "right"];
const rewindStart = { x: 1, y: 2 };

function moveOnGrid(position, direction) {
  const input = directionMap[direction];
  return {
    x: Math.max(0, Math.min(4, position.x + input.dx)),
    y: Math.max(0, Math.min(3, position.y + input.dy)),
  };
}

function buildTrail(inputs) {
  return inputs.reduce((trail, direction) => [...trail, moveOnGrid(trail.at(-1), direction)], [rewindStart]);
}

function InputSequence({ inputs, activeCount = inputs.length, emptyText }) {
  if (!inputs.length) return <span className="chronos-input-empty">{emptyText}</span>;
  return (
    <span className="chronos-input-list">
      {inputs.map((direction, index) => (
        <span className={`chronos-input-token${index >= activeCount ? " is-pending" : ""}`} key={`${direction}-${index}`}>
          {directionMap[direction].arrow}
        </span>
      ))}
    </span>
  );
}

function ExampleSequence({ label, inputs, tone }) {
  return (
    <span className={`chronos-example-sequence is-${tone}`}>
      <strong>{label}</strong>
      <span>
        {inputs.map((direction, index) => (
          <i key={`${direction}-${index}`}>{directionMap[direction].arrow}</i>
        ))}
      </span>
    </span>
  );
}

function ExampleBoard({ step }) {
  const { i18n } = useTranslation();
  const recordedTrail = buildTrail(initialRecordedInputs);
  const playerTrail = buildTrail(exampleNewInputs);
  const origin = { x: 84 + rewindStart.x * 72 + 36, y: 50 + rewindStart.y * 72 + 36 };
  const point = ({ x, y }, offset = 0) => ({ x: 84 + x * 72 + 36 + offset, y: 50 + y * 72 + 36 });
  const points = (trail) => trail.map((position) => {
    const current = point(position);
    return `${current.x},${current.y}`;
  }).join(" ");
  const recordedEnd = point(recordedTrail.at(-1));
  const playerEnd = point(playerTrail.at(-1));

  return localizePage((
    <svg viewBox="0 0 528 388" aria-hidden="true">
      <rect className="chronos-board-bg" x="0" y="0" width="528" height="388" rx="20" />
      <g className="chronos-board-grid">
        {Array.from({ length: 5 }).map((_, x) => Array.from({ length: 4 }).map((__, y) => (
          <rect x={84 + x * 72} y={50 + y * 72} width="72" height="72" key={`${x}-${y}`} />
        )))}
      </g>
      <rect className="chronos-rewind-cell" x={84 + rewindStart.x * 72} y={50 + rewindStart.y * 72} width="72" height="72" />

      {step === "record" && (
        <>
          <polyline className="chronos-board-trail is-recorded" points={points(recordedTrail)} />
          <g className="chronos-board-piece is-recorded" transform={`translate(${recordedEnd.x} ${recordedEnd.y})`}>
            <circle r="20" /><text y="6">나</text>
          </g>
        </>
      )}
      {step === "return" && (
        <>
          <path className="chronos-example-return" d={`M ${recordedEnd.x} ${recordedEnd.y} C ${recordedEnd.x + 50} ${recordedEnd.y + 95}, ${origin.x + 110} ${origin.y + 80}, ${origin.x + 20} ${origin.y + 16}`} />
          <g className="chronos-board-piece is-player" transform={`translate(${origin.x - 11} ${origin.y})`}>
            <circle r="20" /><text y="6">나</text>
          </g>
          <g className="chronos-board-piece is-clone" transform={`translate(${origin.x + 11} ${origin.y})`}>
            <circle r="20" /><text y="6">분</text>
          </g>
        </>
      )}
      {step === "split" && (
        <>
          <polyline className="chronos-board-trail is-player" points={points(playerTrail)} />
          <polyline className="chronos-board-trail is-clone" points={points(recordedTrail)} />
          <g className="chronos-board-piece is-player" transform={`translate(${playerEnd.x} ${playerEnd.y})`}>
            <circle r="20" /><text y="6">나</text>
          </g>
          <g className="chronos-board-piece is-clone" transform={`translate(${recordedEnd.x} ${recordedEnd.y})`}>
            <circle r="20" /><text y="6">분</text>
          </g>
        </>
      )}
    </svg>
  ), i18n.resolvedLanguage, { en: chronosEn, ja: chronosJa });
}

function ChronosExample() {
  const { i18n } = useTranslation();
  return localizePage((
    <div className="chronos-example" role="img" aria-label="먼저 위, 오른쪽, 오른쪽으로 움직인 뒤 시간을 되돌리면 분신은 그 움직임을 반복하고 플레이어는 새로운 경로로 이동하는 예시">
      <article>
        <span>1</span>
        <h3>먼저 움직이기</h3>
        <ExampleBoard step="record" />
        <p><ExampleSequence label="나" inputs={initialRecordedInputs} tone="recorded" /></p>
      </article>
      <article>
        <span>2</span>
        <h3>시간 되돌리기</h3>
        <ExampleBoard step="return" />
        <p>나와 분신이 같은 칸으로</p>
      </article>
      <article>
        <span>3</span>
        <h3>같이 움직이기</h3>
        <ExampleBoard step="split" />
        <p>
          <ExampleSequence label="나" inputs={exampleNewInputs} tone="player" />
          <ExampleSequence label="분신" inputs={initialRecordedInputs} tone="clone" />
        </p>
      </article>
    </div>
  ), i18n.resolvedLanguage, { en: chronosEn, ja: chronosJa });
}

function ChronosRewind() {
  const { i18n } = useTranslation();
  const [phase, setPhase] = useState("ready");
  const [newInputs, setNewInputs] = useState([]);
  const recordedTrail = buildTrail(initialRecordedInputs);
  const playerTrail = buildTrail(phase === "ready" ? initialRecordedInputs : newInputs);
  const cloneInputs = initialRecordedInputs.slice(0, newInputs.length);
  const cloneTrail = buildTrail(cloneInputs);
  const playerPosition = playerTrail.at(-1);
  const clonePosition = cloneTrail.at(-1);
  const samePosition = phase === "replay" && playerPosition.x === clonePosition.x && playerPosition.y === clonePosition.y;
  const canInput = phase === "replay" && newInputs.length < initialRecordedInputs.length;

  const point = ({ x, y }, offset = 0) => ({ x: 84 + x * 72 + 36 + offset, y: 50 + y * 72 + 36 });
  const points = (trail) => trail.map((position) => {
    const current = point(position);
    return `${current.x},${current.y}`;
  }).join(" ");

  const addInput = (direction) => {
    if (!canInput) return;
    setNewInputs((inputs) => [...inputs, direction]);
  };

  const undoInput = () => setNewInputs((inputs) => inputs.slice(0, -1));

  const resetExample = () => {
    setPhase("ready");
    setNewInputs([]);
  };

  const handleKeyDown = (event) => {
    const direction = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }[event.key];
    if (!direction) return;
    event.preventDefault();
    addInput(direction);
  };

  return localizePage((
    <div className="chronos-rewind">
      <div className="chronos-sim-toolbar">
        <div>
          <strong>{phase === "ready" ? "과거의 움직임이 기록되어 있습니다" : "현재의 나에게 새 방향을 주세요"}</strong>
          <p>{phase === "ready" ? "나는 이미 ↑ → → 순서로 움직였습니다." : "화살표를 누르면 나와 분신이 한 턴씩 함께 움직입니다."}</p>
        </div>
        <div className="chronos-sim-actions">
          {phase === "replay" && newInputs.length > 0 && <button type="button" onClick={undoInput}>한 턴 취소</button>}
          {phase === "replay" && <button type="button" onClick={resetExample}>처음부터</button>}
          {phase === "ready" && (
            <button type="button" className="is-primary" onClick={() => { setPhase("replay"); setNewInputs([]); }}>
              되돌리기 실행
            </button>
          )}
        </div>
      </div>

      <div className="chronos-sim-body" tabIndex="0" onKeyDown={handleKeyDown} aria-label="방향키로 조작할 수 있는 시간 되돌리기 시뮬레이터">
        <div className="chronos-board">
          <svg viewBox="0 0 528 388" role="img" aria-labelledby="chronos-board-title chronos-board-desc">
            <title id="chronos-board-title">방향 입력에 따라 이동하는 플레이어와 분신</title>
            <desc id="chronos-board-desc">되돌리기 전에는 플레이어 입력을 기록하고, 되돌린 뒤에는 같은 시작점에서 플레이어의 새 입력과 분신의 기존 입력이 동시에 실행됩니다.</desc>
            <rect className="chronos-board-bg" x="0" y="0" width="528" height="388" rx="20" />
            <g className="chronos-board-grid">
              {Array.from({ length: 5 }).map((_, x) => Array.from({ length: 4 }).map((__, y) => (
                <rect x={84 + x * 72} y={50 + y * 72} width="72" height="72" key={`${x}-${y}`} />
              )))}
            </g>
            <rect className="chronos-rewind-cell" x={84 + rewindStart.x * 72} y={50 + rewindStart.y * 72} width="72" height="72" />

            {phase === "ready" ? (
              <polyline className="chronos-board-trail is-recorded" points={points(recordedTrail)} />
            ) : (
              <>
                <polyline className="chronos-board-trail is-player" points={points(playerTrail)} />
                <polyline className="chronos-board-trail is-clone" points={points(cloneTrail)} />
              </>
            )}

            {phase === "ready" ? (
              <g className="chronos-board-piece is-recorded" transform={`translate(${point(playerPosition).x} ${point(playerPosition).y})`}>
                <circle r="20" /><text y="6">나</text>
              </g>
            ) : (
              <>
                <g className="chronos-board-piece is-player" transform={`translate(${point(playerPosition, samePosition ? -11 : 0).x} ${point(playerPosition).y})`}>
                  <circle r="20" /><text y="6">나</text>
                </g>
                <g className="chronos-board-piece is-clone" transform={`translate(${point(clonePosition, samePosition ? 11 : 0).x} ${point(clonePosition).y})`}>
                  <circle r="20" /><text y="6">분</text>
                </g>
              </>
            )}
          </svg>
        </div>

        <div className="chronos-sim-controls">
          <div className="chronos-input-timeline">
            {phase === "ready" && <div><strong>과거의 나</strong><InputSequence inputs={initialRecordedInputs} emptyText="" /></div>}
            {phase === "replay" && (
              <>
                <div className="is-player"><strong>현재의 나</strong><InputSequence inputs={newInputs} emptyText="새 방향을 입력하세요" /></div>
                <div className="is-clone"><strong>분신</strong><InputSequence inputs={initialRecordedInputs} activeCount={newInputs.length} emptyText="" /></div>
              </>
            )}
          </div>

          {phase === "replay" && (
            <div className="chronos-direction-pad" aria-label="상하좌우 입력">
              <button type="button" className="is-up" onClick={() => addInput("up")} disabled={!canInput} aria-label="위로 한 턴">↑</button>
              <button type="button" className="is-left" onClick={() => addInput("left")} disabled={!canInput} aria-label="왼쪽으로 한 턴">←</button>
              <span>1턴</span>
              <button type="button" className="is-right" onClick={() => addInput("right")} disabled={!canInput} aria-label="오른쪽으로 한 턴">→</button>
              <button type="button" className="is-down" onClick={() => addInput("down")} disabled={!canInput} aria-label="아래로 한 턴">↓</button>
            </div>
          )}

          <p className="chronos-sim-status" aria-live="polite">
            {phase === "ready" && <><strong>화살표 하나가 한 턴입니다.</strong> 되돌리면 이 세 턴이 분신의 행동이 됩니다.</>}
            {phase === "replay" && newInputs.length === 0 && <><strong>월드 상태를 되돌리기 지점으로 복원했습니다.</strong> 플레이어와 분신이 같은 칸에서 시작합니다.</>}
            {phase === "replay" && newInputs.length > 0 && newInputs.length < initialRecordedInputs.length && <><strong>{newInputs.length}턴을 함께 실행했습니다.</strong> 분신은 다음 기록을 기다리고 있습니다.</>}
            {phase === "replay" && newInputs.length === initialRecordedInputs.length && <><strong>두 경로가 완성됐습니다.</strong> 분신은 과거 입력을, 나는 새 입력을 실행했습니다.</>}
          </p>
        </div>
      </div>
    </div>
  ), i18n.resolvedLanguage, { en: chronosEn, ja: chronosJa });
}

function ChronosVideo() {
  const [playing, setPlaying] = useState(false);
  const { i18n } = useTranslation();

  return localizePage((
    <div className={`case-video${playing ? " is-playing" : ""}`}>
      {playing ? (
        <iframe
          src="https://www.youtube.com/embed/QmiCr-Hd9h8?autoplay=1&rel=0"
          title="시간을 되돌려 분신과 함께 퍼즐을 해결하는 Chronos 플레이"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="case-video-poster" onClick={() => setPlaying(true)} aria-label="Chronos 플레이 영상 재생">
          <img src={imageUrl("chronos-main-1.png")} alt="플레이어와 분신이 레이저 퍼즐을 함께 푸는 Chronos 영상 미리보기" />
          <span aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  ), i18n.resolvedLanguage, { en: chronosEn, ja: chronosJa });
}

export default function ChronosPage() {
  const { i18n } = useTranslation();
  return localizePage((
    <div className="case-page case-chronos">
      <CaseHero
        title="Chronos"
        lead="시간을 되돌려 과거의 나와 협력하는 턴제 3D 퍼즐"
        image={imageUrl("chronos-main-1.png")}
        imageAlt="플레이어와 분신이 레이저 퍼즐을 함께 푸는 Chronos 화면"
        facts={["\"소프트웨어 개발의 원리와 실습\" 수업 프로젝트", "5인 팀", "16개 레벨", "최종 평가 상위 20%"]}
        links={[
          { label: "게임 플레이", href: links.play, primary: true },
          { label: "GitHub", href: links.github },
          { label: "플레이 영상", href: links.playlist },
        ]}
      />

      <main>
        <CaseSection
          title="게임 방법"
          intro={"한 캐릭터만으로 동시에 다룰 수 없는 장치를 과거 행동을 반복하는 분신과 함께 해결하는 게임입니다.\n상하좌우로 이동하고 상자, 버튼과 레이저를 조작해 목표 지점까지 길을 만듭니다."}
        >
          <div className="case-proof">
            <div className="case-proof-image">
              <img src={imageUrl("chronos-main-2.png")} alt="턴별 이동 명령과 퍼즐 오브젝트가 보이는 Chronos 플레이 화면" />
            </div>
            <ul className="case-proof-list">
              <li><strong>길 만들기</strong><span>상자와 발판을 움직이고 레이저를 피해 다음 구간으로 이동합니다.</span></li>
              <li><strong>과거 행동 남기기</strong><span>필요한 순서대로 움직인 뒤 함께 행동할 과거 시점으로 돌아갑니다.</span></li>
              <li><strong>분신과 역할 나누기</strong><span>분신이 이전 경로를 반복하는 동안 플레이어는 다른 장치를 조작합니다.</span></li>
            </ul>
          </div>
          <ChronosVideo />
        </CaseSection>

        <CaseSection
          title="담당 범위"
          intro="핵심 게임 시스템부터 레벨이 끊김 없이 플레이되는 완성 단계까지 맡았습니다."
        >
          <div className="case-role-grid is-detailed">
            <article>
              <h3>턴과 되돌리기 구조</h3>
              <ul>
                <li>TurnManager 중심의 전역 턴 루프와 입력 순서 구현</li>
                <li>플레이어, 분신, 여러 오브젝트의 상태 로그와 복원 구현</li>
                <li>되돌리기로 사라진 입력을 분신 행동으로 분리해 재생</li>
              </ul>
            </article>
            <article>
              <h3>캐릭터와 퍼즐 오브젝트</h3>
              <ul>
                <li>캐릭터 이동, 회전, 충돌 판정과 밀리기 구현</li>
                <li>박스, 버튼, 레버, 이동 발판과 레이저 상호작용 구현</li>
                <li>이동 장애물까지 같은 턴과 되돌리기 규칙에 통합</li>
              </ul>
            </article>
            <article>
              <h3>진행과 복구 경험</h3>
              <ul>
                <li>Pause, Undo, Reset과 입력 가능 시점 제어</li>
                <li>레벨 자동 저장과 플레이어 및 오브젝트 상태 복원</li>
                <li>되돌리기 슬라이더, UI와 시각 효과 구현 및 리팩터링</li>
              </ul>
            </article>
            <article>
              <h3>레벨과 WebGL 완성</h3>
              <ul>
                <li>튜토리얼 3개와 퍼즐 레벨 3개 설계 및 구현</li>
                <li>Additive loading 기반 레벨 전환과 카메라 이동 구현</li>
                <li>전체 레벨 통합, 오류 수정과 WebGL 빌드 검증</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="시간 되돌리기"
          intro={"먼저 움직인 방향은 시간을 되돌린 뒤 분신의 행동이 됩니다.\n아래 예시를 보고, 필요하면 직접 화살표를 눌러 두 경로를 비교해 보세요."}
          className="is-dark"
        >
          <ChronosExample />
          <p className="chronos-example-key"><strong>핵심</strong> 분신은 과거의 입력을 반복하고, 플레이어는 같은 턴에 새로운 입력을 선택합니다.</p>
          <details className="chronos-sim-disclosure">
            <summary><strong>직접 움직여 보기</strong><span>예시가 헷갈린다면 화살표로 두 경로를 만들어 보세요.</span></summary>
            <ChronosRewind />
          </details>
        </CaseSection>

        <CaseSection
          title="완료된 턴만 기록"
          intro={"움직이는 중간 상태를 저장하면 화면과 판정이 어긋나고, 플레이어 위치만 되돌리면 분신과 퍼즐 오브젝트의 시간도 달라집니다.\n그래서 모든 이동과 상호작용이 끝난 시점에만 전체 월드 상태를 기록하고, 선택한 턴을 한 번에 복원했습니다."}
          className="is-accent"
        >
          <div className="case-flow">
            <article><strong>입력 확정</strong><p>플레이어가 고른 행동을 한 턴의 명령으로 정합니다.</p></article>
            <article><strong>상태 변경</strong><p>플레이어, 분신과 퍼즐 오브젝트를 정해진 순서로 움직입니다.</p></article>
            <article><strong>완료 확인</strong><p>모든 애니메이션과 상호작용이 끝날 때까지 기다립니다.</p></article>
            <article><strong>판정과 기록</strong><p>완성된 월드 상태만 다음 되돌리기 기록으로 남깁니다.</p></article>
          </div>
          <div className="case-table">
            <div className="case-table-row">
              <strong>플레이어</strong>
              <span>위치와 행동 상태</span>
              <span>선택한 턴의 상태로 돌아가 새 입력을 시작</span>
            </div>
            <div className="case-table-row">
              <strong>분신</strong>
              <span>시작 위치와 이전 입력</span>
              <span>되돌리기로 사라진 입력을 같은 순서로 재생</span>
            </div>
            <div className="case-table-row">
              <strong>퍼즐 오브젝트</strong>
              <span>위치, 낙하, 사라짐, 활성 상태</span>
              <span>플레이어와 같은 턴의 월드 상태로 함께 복원</span>
            </div>
          </div>
        </CaseSection>

      </main>

      <CaseResult result="수업 최종 평가 상위 20%">
        시간 되돌리기 아이디어를 16개 레벨의 WebGL 게임으로 완성하고, 브라우저에서 처음부터 엔딩까지 플레이할 수 있는 결과물로 제출했습니다.
      </CaseResult>
    </div>
  ), i18n.resolvedLanguage, { en: chronosEn, ja: chronosJa });
}
