import { useEffect } from "react";
import ProjectLinkIcon from "../components/ProjectLinkIcon";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;
const LIVE = "https://github.com/user-attachments/assets/37858db9-a96b-4c59-b7d1-2ada65026ee6";
const INFRA = "https://github.com/user-attachments/assets/ebdc5c6f-f619-4917-a396-33387b2ca396";

const journey = [["01", "요청", "한 사람이 위치 공유를 시작합니다."], ["02", "이동", "서로의 위치와 지나온 경로를 봅니다."], ["03", "만남", "실제로 만난 순간 세션을 완료합니다."], ["04", "회고", "이동 경로와 기록을 다시 확인합니다."]];
const scope = [["01", "세션 생명주기", "생성 · 수락 · 종료 · 만남 확정, 중복 세션 방지, 상태 전이"], ["02", "실시간 이벤트", "WebSocket room, 위치 · 메모 broadcast, SessionPoint 영속화"], ["03", "연결 권한", "JWT 검증, 세션 상태 확인, 커플 참여자 검증을 handshake에 결합"]];

function Desc({ children }) { return <p className="auc-description">{children}</p>; }
function Head({ kicker, children, description }) { return <div className="auc-section-head auc-reveal"><span className="auc-kicker">{kicker}</span><h2>{children}</h2>{description}</div>; }

export default function LocationSharingPage() {
  useEffect(() => {
    const targets = document.querySelectorAll(".auc-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <div className="auc-case">
    <header className="auc-hero">
      <img className="auc-hero-media" src={imageUrl("areucoming-image-1.png")} alt="오고있니 서비스 화면" />
      <div className="auc-hero-shade" aria-hidden="true" />
      <div className="auc-hero-inner container">
        <a className="auc-back" href="#/">← 프로젝트 목록</a>
        <div className="auc-hero-copy">
          <span className="auc-eyebrow">WACKATHON 2026 · 오프라인에서 완성되는 경험</span>
          <h1>오고있니</h1>
          <p className="auc-tagline">만나기까지의 기다림도 설렘이 될 수 있게.</p>
          <Desc>서로 만나러 가는 동안만 위치와 기록을 공유하고, 실제 만남으로 세션을 완성하는 모바일 PWA를 만들었습니다.</Desc>
          <div className="auc-hero-meta"><span>와플스튜디오 와커톤</span><span>5인 팀</span><span>Backend</span><strong>10팀 중 3위(동상)</strong></div>
        </div>
      </div>
    </header>

    <main>
      <section className="auc-section auc-concept"><div className="container">
        <Head kicker="PRODUCT" description={<Desc>해커톤 주제는 <strong>‘오프라인에서 완성되는 경험’</strong>이었습니다. 위치 공유 자체보다 요청부터 이동, 실제 만남, 회고까지 하나의 경험으로 연결했습니다.</Desc>}>온라인은 만남을 대신하지 않고,<br />만남까지의 과정을 이어줍니다.</Head>
        <div className="auc-journey auc-reveal">{journey.map(([n,t,d], i) => <FragmentRow key={t} n={n} title={t} desc={d} arrow={i < journey.length - 1} />)}</div>
      </div></section>

      <section className="auc-section auc-state-section"><div className="container">
        <Head kicker="SESSION MODEL" description={<Desc>요청을 보낸 순간부터 실제 만남까지의 상태가 서비스 동작을 결정하도록 <strong>PENDING → ACTIVE → DONE</strong> 흐름을 두었습니다.</Desc>}>위치 공유를 ‘연결’이 아니라<br />생명주기를 가진 세션으로 모델링</Head>
        <div className="auc-state-flow auc-reveal">
          <article><span>PENDING</span><h3>위치 공유 요청</h3><p>요청자는 먼저 이동을 시작하고 상대의 수락을 기다립니다.</p></article><div className="auc-state-arrow">→</div>
          <article className="is-active"><span>ACTIVE</span><h3>실시간 위치 공유</h3><p>두 사용자가 같은 session room에서 위치와 메모를 주고받습니다.</p></article><div className="auc-state-arrow">→</div>
          <article><span>DONE</span><h3>세션 종료 · 회고</h3><p>소켓을 닫고 저장된 경로와 기록을 회고 데이터로 남깁니다.</p></article>
        </div>
      </div></section>

      <section className="auc-section auc-scope"><div className="container">
        <Head kicker="OWNERSHIP" description={<Desc>세션 모델과 REST API를 시작으로 WebSocket, 인증, 기록 저장까지 실시간 위치 공유의 백엔드 흐름을 연결했습니다.</Desc>}>담당 범위</Head>
        <div className="auc-feature-grid auc-reveal">{scope.map(([n,t,d]) => <article key={t}><strong>{n}</strong><h3>{t}</h3><Desc>{d}</Desc></article>)}</div>
      </div></section>

      <section className="auc-section auc-recovery"><div className="container">
        <Head kicker="REALTIME + PERSISTENCE" description={<Desc>WebSocket은 지금 이후의 이벤트를 전달하지만 이전 경로는 보존하지 않습니다. 그래서 <strong>HTTP로 저장된 히스토리를 복원하고 WebSocket으로 새 이벤트를 이어 붙이는</strong> 흐름으로 나눴습니다.</Desc>}>실시간 통신만으로는<br />새로고침 뒤의 경로를 복구할 수 없었습니다.</Head>
        <div className="auc-recovery-flow auc-reveal"><FlowItem tag="HTTP" title="GET history" text="기존 좌표와 기록 로드" /><b>→</b><FlowItem tag="CLIENT" title="지도 복원" text="새로고침 전 경로 렌더링" /><b>→</b><FlowItem tag="WEBSOCKET" title="실시간 연결" text="새 POINT · MEMO 수신" live /><b>→</b><FlowItem tag="SERVER" title="저장 + broadcast" text="기록과 session room 전파" /></div>
        <div className="auc-code-note auc-reveal"><div><strong>3초</strong><span>위치 기록 주기</span></div><Desc>위치를 SessionPoint로 저장하며 같은 세션에 브로드캐스트했습니다. 사진은 HTTP로 업로드한 뒤 저장 경로를 이벤트에 포함할 수 있도록 통신 방식을 분리했습니다.</Desc></div>
      </div></section>

      <section className="auc-section auc-auth"><div className="container">
        <Head kicker="HANDSHAKE AUTHORIZATION" description={<Desc>처음에는 ACTIVE만 연결을 허용해 요청자가 수락 전에 위치 공유를 시작할 수 없었습니다. 실제 사용자 흐름에 맞춰 상태별 연결 정책을 다시 정의했습니다.</Desc>}>소켓 연결 가능 여부도<br />세션 상태의 일부였습니다.</Head>
        <div className="auc-auth-layout auc-reveal">
          <div className="auc-auth-pipeline"><span>sessionId + JWT</span><b>→</b><span>JWT 검증</span><b>→</b><span>User</span><b>→</b><span>Session 상태</span><b>→</b><span>Couple 참여 여부</span><b>→</b><strong>room 연결</strong></div>
          <div className="auc-access-matrix"><div className="auc-matrix-head"><span>상태</span><span>요청자</span><span>상대</span></div><div><strong>PENDING</strong><span className="is-yes">허용</span><span className="is-no">대기</span></div><div><strong>ACTIVE</strong><span className="is-yes">허용</span><span className="is-yes">허용</span></div><div><strong>DONE</strong><span className="is-no">종료</span><span className="is-no">종료</span></div></div>
        </div>
      </div></section>

      <section className="auc-section auc-robustness"><div className="container">
        <Head kicker="EDGE CASES">프론트 연동에서 생긴 상태 꼬임까지 정리</Head>
        <div className="auc-feature-grid auc-feature-grid--two auc-reveal"><article><strong>중복 세션 생성</strong><h3>이미 진행 중이면 기존 세션 반환</h3><Desc>PENDING/ACTIVE가 있는데 생성 요청이 다시 들어오면 새 레코드 대신 기존 세션을 반환하도록 멱등성을 보강했습니다.</Desc></article><article><strong>클라이언트 신뢰 범위</strong><h3>사용자·세션 ID는 서버에서 확정</h3><Desc>payload의 sessionId와 userId를 handshake에서 검증한 서버 값으로 덮어써 이벤트 주체를 고정했습니다.</Desc></article></div>
      </div></section>

      <section className="auc-section auc-product-shot"><div className="container"><Head kicker="SHIPPED FLOW">이동 경로와 기록이<br />실제 만남으로 이어지는 화면</Head><figure className="auc-readme-shot auc-reveal"><img src={LIVE} alt="오고있니 실시간 위치와 경로 확인 및 회고 화면" /><figcaption>실시간 위치·경로 확인과 회고 화면 · 팀 README</figcaption></figure></div></section>
      <section className="auc-section auc-infra"><div className="container"><Head kicker="TEAM ARCHITECTURE" description={<Desc>React PWA, Spring Boot API/WebSocket 서버, FCM 알림과 S3 이미지 저장소를 연결해 해커톤 현장에서 동작하는 서비스를 완성했습니다.</Desc>}>서비스 전체 구성</Head><figure className="auc-infra-shot auc-reveal"><img src={INFRA} alt="오고있니 팀 인프라 아키텍처" /><figcaption>팀 전체 인프라 아키텍처 · backend repository README</figcaption></figure></div></section>

      <section className="auc-result"><div className="container"><div className="auc-result-copy auc-reveal"><span>RESULT</span><h2>10개 팀 중 3위 <em>동상</em></h2><Desc>위치 공유 요청부터 실시간 이동, 실제 만남, 회고까지 이어지는 시나리오를 완성했습니다. ‘오프라인에서 완성되는 경험’을 온라인 기능이 실제 만남을 향하도록 만드는 제품 흐름으로 구현했습니다.</Desc></div><div className="auc-result-links auc-reveal"><a href="https://github.com/mjy926/wackathon-server" target="_blank" rel="noreferrer"><ProjectLinkIcon url="https://github.com/mjy926/wackathon-server" />Backend ↗</a><a href="https://github.com/h-seo-n/wackathon-front" target="_blank" rel="noreferrer"><ProjectLinkIcon url="https://github.com/h-seo-n/wackathon-front" />Frontend ↗</a><a href="#/">다른 프로젝트 보기 →</a></div></div></section>
    </main>
  </div>;
}

function FragmentRow({ n, title, desc, arrow }) { return <><article><span>{n}</span><strong>{title}</strong><p>{desc}</p></article>{arrow && <b>→</b>}</>; }
function FlowItem({ tag, title, text, live = false }) { return <article className={live ? "is-live" : ""}><span>{tag}</span><strong>{title}</strong><p>{text}</p></article>; }
