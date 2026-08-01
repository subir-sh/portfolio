import { createRoot } from 'react-dom/client'
import '../assets/css/style.css'

const projects = [
  ['행샤: 교내 행사 캘린더', 'Spring Boot / MySQL / Docker / React', '동아리 팀 프로젝트', '서울대 비교과 행사 데이터 크롤링/정규화, 검색/상세 조회 API 및 사용자 설정 기반 정렬/필터링 로직 구현', 'campus-event-calendar', true],
  ['오고있니: 실시간 위치 공유 서비스', 'Spring Boot / React / WebSocket / MySQL', '해커톤 팀 프로젝트 / 3위', '위치 공유 요청, 수락, 진행, 종료의 세션 모델, 위치 기록/히스토리 조회 백엔드 API 구현', 'location-sharing-service', true],
  ['XR 에이전트 시스템 연구', 'Unity / OpenXR / Gemini', '학부 연구 인턴', 'XR 에이전트 시스템 연구: 2D-3D 정렬, 객체 기반 오버레이 구현, 생성 결과 평가 담당', 'xr-research-intern', true],
  ['Chronos: 턴제 3D 퍼즐 게임', 'Unity / Scrum / GitHub / Slack', '팀 프로젝트', '턴 관리, 상태 로그, 시간 되돌리기, 분신 재생, 오브젝트 상호작용 등 핵심 게임플레이 시스템 기획 및 구현', 'turn-based-puzzle-game', true],
  ['폐병원 탈출: VR 호러 게임', 'Unity / XR Interaction Toolkit / Meta Quest 2', '팀 프로젝트', 'VR 환경에 맞춰 UI, 시각 효과, 카메라 전환, 컷신 흐름 등 기획 및 구현', 'vr-horror-game', false],
  ['ThinkFlow: 메모 & 태스크 관리 앱', 'React / Express / Prisma / Docker / PostgreSQL', '개인 프로젝트', '메모, 태스크, 회고를 하나의 흐름으로 연결하는 풀스택 앱 설계 및 구현', 'memo-task-management', false],
]

const skills = {
  백엔드: ['Spring Boot', 'Java', 'Kotlin', 'REST API', 'WebSocket', 'SQL'],
  프론트엔드: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  인터랙티브: ['Unity', 'C#', 'XR Interaction Toolkit', 'OpenXR'],
  도구: ['Git', 'Docker', 'GitHub Actions', 'WSL'],
}

function Card({ children, className = '' }) {
  return <article className={`card ${className}`.trim()}>{children}</article>
}

function App() {
  return <>
    <header className="site-header"><div className="container">
      <div className="header-top-row"><div className="lang-switch" aria-label="언어 전환">
        <a href="./en/index.html">EN</a><a href="./jp/index.html">JP</a><a href="./index.html" className="is-active" aria-current="page">KR</a>
      </div></div>
      <h1>이승현 (Seunghyeon Lee)</h1>
      <p className="meta">풀스택 / 인터랙티브 시스템 / HCI</p>
      <p className="subtitle">웹 서비스, 게임, XR 프로젝트를 진행하며<br />복잡한 데이터, 상태, 흐름을 정리하고 사용자의 입력이 화면의 반응으로 이어지는 시스템을 구현해왔습니다.</p>
      <nav className="nav" aria-label="주요 섹션"><a href="#projects">프로젝트</a><a href="#experience">경험</a><a href="#education">학력</a><a href="#skills">기술 / 언어</a></nav>
    </div></header>
    <main className="container">
      <section id="projects" className="section"><h2>프로젝트</h2><div className="project-grid">
        {projects.map(([title, stack, type, description, slug, featured]) => <Card key={slug} className={`project-card${featured ? ' featured' : ''}`}><h3><a href={`./ko/projects/${slug}.html`}>{title}</a></h3><p className="meta">{stack}</p><p><em>{type}</em><br />{description}</p></Card>)}
      </div></section>
      <section id="experience" className="section"><h2>경험</h2><div className="card-list">
        <Card><h3>공군 공중기동정찰사령부</h3><p className="meta">정보상황병 / 2022 - 2023</p><p>교대 근무로 상황 감시 및 보고를 지원하는 정보상황 업무 수행</p></Card>
        <Card><h3>서울대학교 <a href="https://wafflestudio.com" target="_blank" rel="noreferrer">와플스튜디오</a> (웹 개발 동아리)</h3><p className="meta">프론트엔드 / 백엔드 / 팀 프로젝트 / CI/CD / 2025 - 현재</p><p>React 프론트엔드와 Spring Boot 백엔드 세미나 트랙 수료 후, 팀 프로젝트로 실제 서비스 개발<br />API 설계, 인증, 상태 관리, 배포까지 웹 서비스 개발 전반 경험</p></Card>
        <Card><h3>서울대학교 <a href="https://hcs.snu.ac.kr" target="_blank" rel="noreferrer">HCS Lab</a> 학부 연구 인턴</h3><p className="meta">HCI / XR / AI 응용 / 2025년 겨울</p><p>XR 에이전트 시스템 연구 참여: 2D-3D 정렬, 객체 기반 오버레이 구현, 응답 및 시각 생성 품질 평가 담당</p></Card>
      </div></section>
      <section id="education" className="section"><h2>학력</h2><div className="card-list">
        <Card><h3>와세다대학</h3><p className="meta">교환학생 / 2025년 봄</p><p>컴퓨터공학 관련 5개를 포함한 8개 수업 일본어로 수강</p><p>평점: 3.7/4.0 (14학점)</p></Card>
        <Card><h3>서울대학교</h3><p className="meta">자유전공학부 / 2020 - 현재 (졸업 예정: 2027년 2월)</p><p>주전공: 컴퓨터공학, 언어학</p><p>평점: 4.02/4.3 (2025년 2학기 기준)</p></Card>
        <Card><h3>대전외국어고등학교</h3><p className="meta">스페인어과 / 2017 - 2019</p></Card>
      </div></section>
      <section id="skills" className="section"><h2>기술</h2><div className="skill-grid">{Object.entries(skills).map(([category, items]) => <Card key={category}><h3>{category}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></Card>)}</div></section>
      <section id="languages" className="section"><h2>언어</h2><div className="card-list"><Card><ul><li>한국어: 모국어</li><li>영어: 상급 (TOEIC 990)</li><li>일본어: 상급 (JLPT N1 170/180)</li><li>스페인어: 중급 (DELE B1)</li></ul></Card></div></section>
    </main>
    <footer id="contact" className="site-footer"><div className="container"><h2>연락처</h2><p>이메일: <a href="mailto:lsh09130@gmail.com">lsh09130@gmail.com</a></p><p>GitHub: <a href="https://github.com/subir-sh" target="_blank" rel="noreferrer">subir-sh</a></p></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
