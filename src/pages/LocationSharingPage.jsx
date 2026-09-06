import { CaseHero, CaseResult, CaseSection } from "../components/CaseStudy";
import { useTranslation } from "react-i18next";
import localizePage from "../locales/localizePage";
import { areUComingEn, areUComingJa } from "../locales/areucoming";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

export default function LocationSharingPage() {
  const { i18n } = useTranslation();

  return localizePage((
    <div className="case-page case-areucoming">
      <CaseHero
        title="오고있니"
        lead="만나러 가는 동안 위치를 공유하고, 만난 뒤 이동을 기록으로 남기는 서비스"
        image={imageUrl("areucoming-image-1.png")}
        imageAlt="실시간 위치 공유와 만남 회고를 보여주는 오고있니 서비스 화면"
        facts={[
          "와플스튜디오 해커톤 “와커톤”",
          "주제 “오프라인에서 완성되는 경험”",
          "실시간 위치 세션 백엔드",
          "10개 팀 중 3위",
        ]}
        links={[
          { label: "Backend GitHub", href: "https://github.com/mjy926/wackathon-server", primary: true },
          { label: "Frontend GitHub", href: "https://github.com/h-seo-n/wackathon-front" },
        ]}
      />

      <main>
        <CaseSection
          title="서비스 흐름"
          intro="위치를 계속 추적하는 서비스가 아니라 만나러 가는 동안만 연결되고, 만난 뒤에는 이동이 기록으로 남는 경험을 만들었습니다."
        >
          <div className="areucoming-service-visuals">
            <img src={imageUrl("areucoming-journey.png")} alt="연인 연결과 위치 공유 시작으로 이어지는 오고있니 화면" />
            <img src={imageUrl("areucoming-image-1.png")} alt="실시간 이동 지도와 만남 이후 기록 화면" />
          </div>
          <div className="case-flow areucoming-service-flow">
            <article><strong>만남 요청</strong><p>연결된 상대에게 요청을 보내 둘만의 세션을 엽니다.</p></article>
            <article><strong>실시간 이동</strong><p>현재 위치와 지나온 경로, 사진과 메모를 함께 봅니다.</p></article>
            <article><strong>이동 기록</strong><p>만남을 확정하면 위치 공유가 끝나고 함께 이동한 경로가 남습니다.</p></article>
          </div>
        </CaseSection>

        <CaseSection
          title="담당 범위"
          intro="세션의 시작과 종료, 위치의 저장과 전파, 새로고침 복구와 참여자 권한이 하나의 흐름으로 동작하도록 구현했습니다."
        >
          <div className="case-role-grid">
            <article>
              <h3>만남 세션</h3>
              <ul>
                <li>요청, 수락, 만남 완료까지의 상태와 API 설계</li>
                <li>중복 요청 방지와 진행 중 세션 복원 구현</li>
              </ul>
            </article>
            <article>
              <h3>실시간 위치와 기록</h3>
              <ul>
                <li>세션별 WebSocket 연결과 위치 이벤트 저장 및 전파</li>
                <li>이동 경로, 메모와 사진 기록 구현</li>
              </ul>
            </article>
            <article>
              <h3>권한과 운영 환경</h3>
              <ul>
                <li>인증된 참여자만 연결되는 이벤트 권한 구성</li>
                <li>FCM 알림, S3 이미지 저장과 Docker 배포</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="끊기지 않는 만남 세션"
          intro={"모바일에서는 요청을 다시 누르거나 이동 중 페이지를 새로 열 수 있습니다.\n이때 새 만남이 중복 생성되거나 이미 지나온 경로가 사라지지 않도록 세션 상태와 저장 방식을 함께 설계했습니다."}
          className="is-accent"
        >
          <div className="areucoming-state-model" role="img" aria-label="요청 대기, 위치 공유 중, 만남 완료로 이어지는 세션 상태와 각 상태에서 허용되는 사용자 행동">
            <article>
              <strong>요청 대기</strong>
              <p>상대가 수락하기 전부터 요청자의 위치를 기록합니다.</p>
            </article>
            <i aria-hidden="true"><span>수락</span><b>→</b></i>
            <article className="is-active">
              <strong>위치 공유 중</strong>
              <p>두 사람의 위치와 메모를 저장하고 실시간으로 전파합니다.</p>
            </article>
            <i aria-hidden="true"><span>만남</span><b>→</b></i>
            <article className="is-done">
              <strong>만남 완료</strong>
              <p>실시간 연결을 닫고 저장된 경로만 회고에 남깁니다.</p>
            </article>
          </div>
          <div className="case-split">
            <article className="case-panel">
              <h3>수락 전 위치 기록</h3>
              <p>요청 대기 상태부터 요청자를 연결하고 위치를 저장해, 상대의 수락을 기다리며 이동한 경로도 놓치지 않았습니다.</p>
            </article>
            <article className="case-panel">
              <h3>중복 요청 처리</h3>
              <p>진행 중인 세션이 있으면 새 레코드 대신 기존 세션을 반환해 재요청과 새로고침 모두 같은 만남으로 이어지게 했습니다.</p>
            </article>
          </div>
          <div className="areucoming-continuity">
            <div>
              <h3>새로고침 이후 경로 복원</h3>
              <p>저장된 경로는 HTTP로 복원하고, 새 위치는 WebSocket으로 이어 받아 과거와 현재를 한 지도에 연결했습니다.</p>
            </div>
            <div className="areucoming-transport" role="img" aria-label="HTTP로 과거 경로를 복원하고 WebSocket으로 새로운 위치를 이어 받는 데이터 흐름">
              <div className="areucoming-transport-source">
                <strong>저장된 경로</strong>
                <p>좌표와 메모</p>
              </div>
              <div className="areucoming-transport-arrow"><b>HTTP로 복원</b><i>→</i></div>
              <div className="areucoming-map-state">
                <svg viewBox="0 0 260 140" aria-hidden="true">
                  <path d="M25 108 C58 92 60 42 102 52 S151 116 190 82 S215 36 239 28" />
                  <circle cx="25" cy="108" r="7" />
                  <circle cx="239" cy="28" r="11" />
                </svg>
                <strong>하나의 경로로 결합</strong>
              </div>
              <div className="areucoming-transport-arrow is-live"><b>WebSocket으로 수신</b><i>←</i></div>
              <div className="areucoming-transport-source is-live">
                <strong>새 위치</strong>
                <p><b>3초</b>마다 저장하고 전파</p>
              </div>
            </div>
          </div>
        </CaseSection>

        <CaseSection
          title="이벤트 주체 검증"
          intro="클라이언트가 보낸 사용자 값을 그대로 저장하면 다른 참여자의 위치나 메모를 가장할 수 있습니다."
        >
          <div className="areucoming-auth-gate">
            <div className="areucoming-auth-request">
              <strong>클라이언트 요청</strong>
              <p>토큰, 세션 ID와 좌표 전송</p>
            </div>
            <i className="areucoming-auth-arrow" aria-hidden="true">→</i>
            <div className="areucoming-auth-checks">
              <strong>사용자와 참여 관계 검증</strong>
              <p>JWT와 참여 관계로 이벤트의 주체를 검증합니다.</p>
            </div>
            <i className="areucoming-auth-arrow" aria-hidden="true">→</i>
            <div className="areucoming-auth-result">
              <strong>검증된 이벤트 저장</strong>
              <p>같은 세션의 상대에게 실시간으로 전달합니다.</p>
            </div>
          </div>
        </CaseSection>

      </main>

      <CaseResult result="10개 팀 중 3위">
        {"온라인 요청과 위치 공유가 실제 만남에서 끝나고 이동 경로는 회고로 남는 PWA를 완성했습니다.\n세션 상태, 인증과 새로고침 복구를 하나의 사용자 흐름으로 구현했습니다."}
      </CaseResult>
    </div>
  ), i18n.resolvedLanguage, { en: areUComingEn, ja: areUComingJa });
}
