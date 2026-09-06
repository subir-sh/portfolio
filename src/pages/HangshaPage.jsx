import { CaseHero, CaseResult, CaseSection } from "../components/CaseStudy";
import { useTranslation } from "react-i18next";
import localizePage from "../locales/localizePage";
import { hangshaEn, hangshaJa } from "../locales/hangsha";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

export default function HangshaPage() {
  const { i18n } = useTranslation();

  return localizePage((
    <div className="case-page case-hangsha">
      <CaseHero
        title="행샤"
        lead={"여러 교내 사이트의 공고를\n매일 갱신되는 하나의 행사 캘린더로"}
        image={imageUrl("hangsha-image-1.png")}
        imageAlt="월별 교내 행사를 탐색하는 행샤 캘린더 화면"
        facts={["와플스튜디오 5인 팀", "백엔드 데이터 파이프라인", "가입자 200명+", "행사 700개+"]}
        links={[
          { label: "서비스 보기", href: "https://hangsha.wafflestudio.com/main", primary: true },
          { label: "Backend GitHub", href: "https://github.com/wafflestudio/hangsha-server" },
        ]}
      />

      <main>
        <CaseSection
          title="서비스 흐름"
          intro={"여러 교내 사이트에 흩어진 행사를 하나의 캘린더에서 탐색하는 서비스입니다.\n사용자는 월간 일정을 비교하고, 검색과 필터로 원하는 행사를 찾은 뒤 상세 정보에서 신청 페이지로 이동합니다."}
        >
          <div className="case-proof">
            <div className="case-proof-image">
              <img src={imageUrl("hangsha-image-2.png")} alt="검색과 필터로 교내 행사를 탐색하는 행샤 화면" />
            </div>
            <ul className="case-proof-list">
              <li><strong>캘린더 탐색</strong><span>월간, 주간, 일간 화면에서 행사 일정을 비교합니다.</span></li>
              <li><strong>검색과 필터</strong><span>제목, 행사 유형, 모집 상태와 주최기관으로 대상을 좁힙니다.</span></li>
              <li><strong>상세 정보와 신청</strong><span>일정과 장소를 확인하고 원본 신청 페이지로 이동합니다.</span></li>
            </ul>
          </div>
        </CaseSection>

        <CaseSection
          title="담당 범위"
          intro="외부 공고의 수집부터 구조화, 조회와 운영 중 교정까지 백엔드 데이터 흐름을 맡았습니다."
        >
          <div className="case-role-grid is-detailed">
            <article>
              <h3>수집 배치와 이미지</h3>
              <ul>
                <li>목록과 상세 페이지 크롤러를 별도 배치와 Docker 이미지로 분리</li>
                <li>페이지 단위 동기화와 스트리밍 업로드로 메모리 사용량 제어</li>
                <li>목록과 상세 이미지 수집, 저장소 업로드와 자동 갱신 구현</li>
              </ul>
            </article>
            <article>
              <h3>행사 도메인과 조회 API</h3>
              <ul>
                <li>주최기관, 분류, 모집 기간, 행사 기간과 다회차 일정 모델링</li>
                <li>월간, 일간, 상세와 제목 검색 API 구현</li>
                <li>기간 행사 노출, 모집 상태와 정렬 규칙을 조회 방식마다 일치</li>
              </ul>
            </article>
            <article>
              <h3>규칙 기반 정규화와 예외 처리</h3>
              <ul>
                <li>기간, 회차와 모집 상태를 결정론적 규칙으로 우선 계산</li>
                <li>빈 행사 차단, 날짜 검증과 중복 행사 건너뛰기 구현</li>
                <li>규칙으로 해석하지 못한 예외만 AI parser로 보완</li>
              </ul>
            </article>
            <article>
              <h3>운영 자동화와 검수</h3>
              <ul>
                <li>신규 행사와 수집 누락을 Discord 검수 대기열로 자동 요약</li>
                <li>날짜 역전, 빈 본문과 비정상 링크 등 이상 징후 자동 표시</li>
                <li>Discord 행사 CRUD와 수정 필드 잠금으로 QA와 유지보수 지원</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="일정 정규화"
          intro={"원본 공고는 모집 기간, 행사 기간과 여러 회차를 서로 다른 형식으로 표현합니다.\n결정론적 규칙으로 먼저 판별하고, 규칙으로 해석하지 못한 예외만 AI fallback으로 보완했습니다."}
        >
          <div className="hangsha-normalizer" role="img" aria-label="형식이 다른 외부 공고를 해석하고 서비스 규칙을 적용해 하나의 캘린더 일정으로 만드는 과정">
            <div className="hangsha-source-stack">
              <strong>제각각인 원본 공고</strong>
              <span>신청: 6월 1일에서 10일</span>
              <span>활동: 6월 15일에서 30일</span>
              <span>1회차 6월 20일, 2회차 6월 27일</span>
            </div>
            <div className="hangsha-transform">
              <div className="hangsha-rule-path">
                <span>기본 경로</span>
                <b>규칙 기반 파싱</b>
                <i aria-hidden="true">↓ 검증</i>
                <strong>날짜와 회차 계산</strong>
              </div>
              <div className="hangsha-fallback-branch">
                <i aria-hidden="true">↳ 검증 실패 시에만</i>
                <b>AI fallback</b>
                <span>추출 후 규칙으로 재검증</span>
              </div>
            </div>
            <div className="hangsha-calendar-card">
              <strong>행샤 일정</strong>
              <div className="hangsha-calendar-days"><i>15</i><i>20</i><i>27</i><i>30</i></div>
              <span>신청 기간과 활동 기간 분리</span>
              <span>회차별 일정 생성</span>
              <span>같은 검색 조건으로 제공</span>
            </div>
          </div>
        </CaseSection>

        <CaseSection
          title="자동 수집을 운영 가능한 시스템으로"
          intro={"수집 성공만으로 데이터 품질을 보장할 수는 없습니다.\n새 행사와 누락 건을 Discord에서 검수하고 바로 교정한 뒤, 사람이 확정한 값은 다음 동기화에서도 보존했습니다."}
          className="is-accent"
        >
          <div className="hangsha-ops" role="img" aria-label="자동 수집 결과를 Discord 검수 대기열에서 확인하고 행사 데이터를 교정한 뒤 수정 필드를 다음 동기화에서도 보존하는 운영 흐름">
            <article className="hangsha-ops-source">
              <span>자동 수집</span>
              <strong>새 행사와 변경 값</strong>
              <p>배치가 공고를 구조화해 서비스 데이터로 동기화합니다.</p>
            </article>

            <div className="hangsha-ops-arrow" aria-hidden="true"><span>배치 종료</span><b>→</b></div>

            <article className="hangsha-discord-card">
              <header><span>#</span><strong>crawl-review</strong><i>Discord</i></header>
              <div className="hangsha-discord-summary">
                <strong>행사 크롤링 검수</strong>
                <div><span>신규 행사</span><span>확인 필요</span><span>수집 누락</span></div>
              </div>
              <ul>
                <li><b>확인</b><span>행사 시작일이 종료일보다 늦음</span></li>
                <li><b>확인</b><span>신청 기간의 한쪽 날짜가 비어 있음</span></li>
                <li><b>누락</b><span>지원하지 않는 원문 링크 형식</span></li>
              </ul>
            </article>

            <div className="hangsha-ops-arrow" aria-hidden="true"><span>바로 교정</span><b>→</b></div>

            <article className="hangsha-ops-actions">
              <span>Discord 명령</span>
              <strong>행사 CRUD</strong>
              <div><b>조회</b><b>생성</b><b>수정</b><b>삭제</b></div>
              <p>검수 메시지에서 바로 행사 데이터를 관리해 QA와 유지보수 동선을 줄입니다.</p>
            </article>
          </div>
          <div className="hangsha-preserve-loop">
            <span>사람이 수정한 필드만 잠금</span>
            <b aria-hidden="true">→</b>
            <strong>다음 자동 동기화에서도 교정 값 유지</strong>
          </div>
        </CaseSection>
      </main>

      <CaseResult result="가입자 200명+, 행사 700개+">
        132개 주최기관의 공고를 하나의 캘린더 데이터로 제공하고 있습니다. 실제 사용자를 확보했으며, 수집과 정규화부터 자동 갱신 이후의 예외 수정까지 운영 흐름으로 연결했습니다.
      </CaseResult>
    </div>
  ), i18n.resolvedLanguage, { en: hangshaEn, ja: hangshaJa });
}
