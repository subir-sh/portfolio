import { CaseFooter, CaseHero, CaseSection } from "../components/CaseStudy";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

const sources = [
  ["하루 행사", "행사일 6월 18일", "하나의 캘린더 일정으로 저장"],
  ["모집형 프로그램", "신청 6월 1일에서 10일, 활동 6월 15일에서 30일", "신청 기간과 행사 기간을 분리"],
  ["다회차 프로그램", "1회차 6월 20일, 2회차 6월 27일", "공고 하나에서 회차별 일정을 생성"],
];

export default function HangshaPage() {
  return (
    <div className="case-page case-hangsha">
      <CaseHero
        title="행샤"
        lead="여러 기관에 흩어진 행사 정보를 수집하고 정규화해, 매일 갱신되는 교내 캘린더로 연결했습니다."
        image={imageUrl("hangsha-image-1.png")}
        imageAlt="월별 교내 행사를 탐색하는 행샤 캘린더 화면"
        facts={["5인 팀", "백엔드와 크롤러 담당", "실제 서비스 운영"]}
        links={[
          { label: "서비스 보기", href: "https://hangsha.wafflestudio.com/main", primary: true },
          { label: "Backend GitHub", href: "https://github.com/wafflestudio/hangsha-server" },
        ]}
      />

      <main>
        <CaseSection
          title="행사 데이터가 실제 탐색 화면까지 이어지게 만들었습니다"
          intro="팀이 만든 월간 캘린더, 검색, 필터가 지속적으로 사용할 수 있는 데이터를 공급했습니다. 외부 공고를 한 번 가져오는 데서 끝내지 않고 자동 갱신과 운영자 교정까지 연결했습니다."
          className="is-surface"
        >
          <div className="case-proof">
            <div className="case-proof-image">
              <img src={imageUrl("hangsha-image-2.png")} alt="검색과 필터로 교내 행사를 탐색하는 행샤 화면" />
            </div>
            <ul className="case-proof-list">
              <li><strong>매일 자동 갱신</strong><span>외부 공고의 신규 등록과 변경 사항을 캘린더 데이터에 반영했습니다.</span></li>
              <li><strong>서로 다른 공고를 통합</strong><span>기관과 형식이 달라도 같은 검색과 필터에서 조회할 수 있게 정규화했습니다.</span></li>
              <li><strong>운영 중 예외 수정</strong><span>자동 수집이 틀린 값을 운영자가 고치고 다음 동기화에서도 보존할 수 있게 했습니다.</span></li>
            </ul>
          </div>
        </CaseSection>

        <CaseSection
          title="수집부터 운영까지 백엔드 흐름을 맡았습니다"
          intro="화면에 필요한 데이터를 정의하고, 외부 공고 수집, 의미 해석, 서비스 규칙 적용, 조회 API, 관리자 수정까지 하나의 운영 흐름으로 구현했습니다."
          className="is-dark"
        >
          <div className="case-role-grid">
            <article>
              <h3>행사 수집</h3>
              <ul>
                <li>목록과 상세 페이지 크롤러 구현</li>
                <li>이미지 수집과 자동 동기화</li>
                <li>수집 실패를 구분해 재실행 가능한 구조로 정리</li>
              </ul>
            </article>
            <article>
              <h3>데이터 정규화</h3>
              <ul>
                <li>주최기관, 분류, 기간, 회차 구조화</li>
                <li>모집 상태와 노출 날짜 계산</li>
                <li>검색과 필터에 필요한 조회 형태 설계</li>
              </ul>
            </article>
            <article>
              <h3>운영 기능</h3>
              <ul>
                <li>행사 조회 API와 관리자 수정 API 구현</li>
                <li>운영자 수정 필드 잠금과 보존</li>
                <li>포스터 기반 직접 등록 초안 생성</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="행사마다 날짜의 의미가 달랐습니다"
          intro="원본 공고에 날짜가 있어도 모집 기간인지 실제 행사 기간인지, 하나의 기간인지 여러 회차인지에 따라 캘린더에 보여줄 형태가 달라집니다. 같은 문자열을 저장하는 대신 서비스에서 필요한 일정으로 해석했습니다."
        >
          <div className="case-table">
            {sources.map(([type, raw, result]) => (
              <div className="case-table-row" key={type}>
                <strong>{type}</strong>
                <span>{raw}</span>
                <span>{result}</span>
              </div>
            ))}
          </div>
          <div className="case-flow">
            <article><strong>외부 공고 수집</strong><p>기관마다 다른 형식의 목록, 상세 내용, 이미지를 가져옵니다.</p></article>
            <article><strong>의미가 필요한 값 추출</strong><p>주최기관, 분류, 기간, 회차처럼 표현이 일정하지 않은 값은 AI parser로 구조화합니다.</p></article>
            <article><strong>서비스 규칙 적용</strong><p>모집 상태와 노출 날짜처럼 결정 가능한 값은 백엔드 규칙으로 계산합니다.</p></article>
            <article><strong>캘린더 데이터 제공</strong><p>정규화한 데이터를 같은 조회 API와 검색 조건으로 제공합니다.</p></article>
          </div>
        </CaseSection>

        <CaseSection
          title="수집 대상에 따라 실행 비용을 나눴습니다"
          intro="모든 페이지를 브라우저로 여는 방식은 느리고 불안정했습니다. 정적 응답으로 충분한 목록과 JavaScript 대기열을 통과해야 하는 상세 페이지를 구분했습니다."
          className="is-accent"
        >
          <div className="case-split">
            <article className="case-panel">
              <h3>목록은 OkHttp로 수집</h3>
              <p>정적 응답에서 필요한 링크와 기본 정보를 빠르게 읽었습니다. 브라우저 실행 비용을 목록 전체에 지불하지 않았습니다.</p>
            </article>
            <article className="case-panel">
              <h3>상세는 Playwright로 확인</h3>
              <p>NetFunnel 대기열을 통과한 뒤 실제로 필요한 행사 필드가 채워졌는지를 완료 조건으로 삼았습니다. 화면 전체가 로드됐다는 신호만 믿지 않았습니다.</p>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="자동화가 운영자의 판단을 덮어쓰지 않게 했습니다"
          intro="크롤러와 AI가 대부분의 입력을 만들더라도 예외는 남습니다. 운영자가 고친 값을 잠가 다음 자동 동기화에서 보존하고, 직접 등록은 AI가 만든 초안을 사람이 확인한 뒤 저장하도록 구성했습니다."
          className="is-surface"
        >
          <div className="case-flow">
            <article><strong>자동 동기화</strong><p>원본 공고의 신규 등록과 변경 사항을 가져옵니다.</p></article>
            <article><strong>운영자 교정</strong><p>잘못 추출된 필드를 사람이 확인하고 수정합니다.</p></article>
            <article><strong>수정 필드 잠금</strong><p>사람이 결정한 값과 자동 생성 값을 구분해 저장합니다.</p></article>
            <article><strong>다음 갱신에서도 보존</strong><p>잠긴 필드는 크롤러가 다시 실행되어도 덮어쓰지 않습니다.</p></article>
          </div>
          <div className="case-note">
            <strong>검증된 역량</strong>
            <p>비정형 외부 데이터를 제품에서 사용할 수 있는 형태로 바꾸고, 자동화 이후의 예외와 운영까지 포함한 백엔드 흐름을 구현했습니다.</p>
          </div>
        </CaseSection>
      </main>

      <CaseFooter>
        행샤는 일회성 크롤러가 아니라, 외부 데이터가 실제 서비스 화면과 운영 과정까지 이어지는 시스템을 만든 프로젝트입니다.
      </CaseFooter>
    </div>
  );
}
