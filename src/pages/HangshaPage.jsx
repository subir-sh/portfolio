import "./hangsha.css";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

const sourceTypes = [
  {
    type: "하루 행사",
    raw: "행사일 6. 18.",
    result: "하나의 캘린더 일정",
  },
  {
    type: "모집형 프로그램",
    raw: "신청 6. 1.–10. · 활동 6. 15.–30.",
    result: "신청 기간과 행사 기간 분리",
  },
  {
    type: "다회차 프로그램",
    raw: "1회차 6. 20. · 2회차 6. 27.",
    result: "공고 하나에서 회차별 일정 생성",
  },
];

function FlowArrow() {
  return <span className="hangsha-flow-arrow" aria-hidden="true">→</span>;
}

export default function HangshaPage() {
  return (
    <div className="hangsha-case">
      <header className="hangsha-hero">
        <div className="container hangsha-hero-inner">
          <a className="hangsha-back" href="#/">← 프로젝트 목록</a>
          <p className="hangsha-eyebrow">HANGSHA · CAMPUS EVENT CALENDAR</p>
          <h1>교내 행사 정보가 매일 갱신되는<br />캘린더 서비스를 만들었습니다.</h1>
          <p className="hangsha-lead">
            외부 행사 수집부터 기간·회차 정규화, 조회 API, 자동 동기화와 운영자 교정까지<br className="hangsha-desktop-break" />
            행사 데이터가 서비스되는 백엔드 흐름을 담당했습니다.
          </p>
          <div className="hangsha-meta" aria-label="프로젝트 정보">
            <span>Wafflestudio Rookies</span>
            <span>5인 팀</span>
            <strong>Backend · Data Scraping</strong>
          </div>
          <div className="hangsha-links">
            <a href="https://hangsha.wafflestudio.com/main" target="_blank" rel="noreferrer">서비스 보기 ↗</a>
            <a href="https://github.com/wafflestudio/hangsha-server" target="_blank" rel="noreferrer">Backend GitHub ↗</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hangsha-product">
          <div className="container">
            <div className="hangsha-section-head">
              <p className="hangsha-kicker">SHIPPED PRODUCT</p>
              <h2>흩어진 교내 행사를<br />한 캘린더에서 탐색하도록</h2>
              <p>
                팀에서는 월·주·일 캘린더, 검색과 필터, 관심사 기반 탐색을 구현했습니다.
                저는 그 화면에 필요한 행사 데이터가 지속적으로 들어오고 갱신되는 흐름을 맡았습니다.
              </p>
            </div>
            <figure className="hangsha-product-shot">
              <img src={imageUrl("hangsha-image-1.png")} alt="행샤의 교내 행사 캘린더 화면" />
              <figcaption>실제 서비스 화면</figcaption>
            </figure>

            <div className="hangsha-ownership" aria-label="담당 범위">
              <article>
                <span>01</span>
                <h3>수집</h3>
                <p>외부 행사 목록·상세·이미지를 읽어오는 크롤러와 자동 동기화</p>
              </article>
              <article>
                <span>02</span>
                <h3>정규화</h3>
                <p>AI parser와 서비스 규칙으로 기간·회차와 상태를 캘린더 데이터로 변환</p>
              </article>
              <article>
                <span>03</span>
                <h3>운영</h3>
                <p>조회 API와 관리자 교정 흐름을 연결해 자동 수집 이후까지 관리</p>
              </article>
            </div>
          </div>
        </section>

        <section className="hangsha-problem">
          <div className="container">
            <div className="hangsha-section-head hangsha-section-head-light">
              <p className="hangsha-kicker">CORE PROBLEM</p>
              <h2>행사마다 ‘날짜’가<br />뜻하는 것이 달랐습니다.</h2>
              <p>
                원본 공고에는 날짜가 적혀 있어도, 그것이 모집 기간인지 실제 행사 기간인지,
                하나의 기간인지 여러 회차인지에 따라 캘린더에 보여줘야 하는 형태가 달랐습니다.
                표현이 일정하지 않은 주최기관·분류·기간·회차는 AI parser로 구조화하고,
                모집 상태처럼 명확한 규칙으로 결정할 수 있는 값은 백엔드에서 계산했습니다.
              </p>
            </div>

            <div className="hangsha-event-types">
              {sourceTypes.map((item) => (
                <article key={item.type}>
                  <p className="hangsha-event-type">{item.type}</p>
                  <strong>{item.raw}</strong>
                  <span aria-hidden="true">↓</span>
                  <p>{item.result}</p>
                </article>
              ))}
            </div>

            <div className="hangsha-pipeline" aria-label="원본 공고에서 캘린더 데이터가 되는 흐름">
              <div>
                <small>SOURCE</small>
                <strong>외부 행사 공고</strong>
                <span>형식과 의미가 제각각</span>
              </div>
              <FlowArrow />
              <div>
                <small>INTERPRET</small>
                <strong>AI 의미 추출</strong>
                <span>주최기관 / 분류 / 기간·회차</span>
              </div>
              <FlowArrow />
              <div>
                <small>NORMALIZE</small>
                <strong>Backend 규칙 적용</strong>
                <span>상태와 노출 날짜 결정</span>
              </div>
              <FlowArrow />
              <div className="is-result">
                <small>PRODUCT</small>
                <strong>캘린더 이벤트</strong>
                <span>일관된 조회·탐색</span>
              </div>
            </div>
          </div>
        </section>

        <section className="hangsha-collection">
          <div className="container hangsha-split">
            <div className="hangsha-section-head">
              <p className="hangsha-kicker">COLLECTION</p>
              <h2>수집 방식도<br />한 가지가 아니었습니다.</h2>
              <p>
                목록은 HTTP 요청으로 빠르게 가져올 수 있었지만, 상세 페이지는 NetFunnel의
                JavaScript 대기열을 통과해야 실제 데이터가 채워졌습니다.
              </p>
            </div>
            <div className="hangsha-collection-card">
              <div>
                <span>목록</span>
                <strong>OkHttp</strong>
                <p>정적 응답을 가볍게 수집</p>
              </div>
              <div className="hangsha-vs">+</div>
              <div>
                <span>상세</span>
                <strong>Playwright</strong>
                <p>NetFunnel 통과 후 필요한 DOM 값까지 로드됐는지 확인</p>
              </div>
              <p className="hangsha-collection-note">
                브라우저 전체 로딩이 아니라 <strong>실제로 필요한 행사 필드가 채워졌는지</strong>를 완료 조건으로 삼았습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="hangsha-operation">
          <div className="container">
            <div className="hangsha-section-head">
              <p className="hangsha-kicker">OPERABLE SYSTEM</p>
              <h2>자동화 뒤에도,<br />사람이 마지막 결정을 하도록</h2>
              <p>
                운영자가 잘못된 값을 고치면 수정한 필드를 잠가 다음 자동 동기화에서도 보존했습니다.
                직접 등록에서는 행사 포스터를 AI로 읽어 입력 초안을 만들고, 사람이 확인·수정한 뒤 저장하도록 구성했습니다.
              </p>
            </div>

            <div className="hangsha-override-flow" aria-label="관리자 수정값 보존 흐름">
              <div>
                <span>AUTO</span>
                <strong>크롤러 동기화</strong>
                <p>원본 데이터 반영</p>
              </div>
              <FlowArrow />
              <div className="is-admin">
                <span>HUMAN</span>
                <strong>관리자 교정</strong>
                <p>잘못된 필드 수정·잠금</p>
              </div>
              <FlowArrow />
              <div>
                <span>NEXT SYNC</span>
                <strong>수정값 보존</strong>
                <p>잠긴 필드는 덮어쓰지 않음</p>
              </div>
            </div>

            <div className="hangsha-result">
              <div>
                <p className="hangsha-kicker">RESULT</p>
                <h2>일회성 크롤러가 아니라,<br />계속 운영할 수 있는 데이터 흐름으로.</h2>
              </div>
              <p>
                외부 공고를 읽는 것에서 끝내지 않고, 의미 해석이 필요한 정보는 AI로 구조화하고
                결정 가능한 상태는 서비스 규칙으로 계산했습니다. 운영자가 예외를 교정하고 그 값을 보존할 수 있는 흐름까지 연결해,
                데이터 소스가 달라져도 같은 캘린더 경험으로 제공할 수 있는 기반을 만들었습니다.
              </p>
            </div>

            <figure className="hangsha-secondary-shot">
              <img src={imageUrl("hangsha-image-2.png")} alt="행샤 서비스의 행사 탐색 화면" />
            </figure>
          </div>
        </section>
      </main>
    </div>
  );
}
