import { CaseFooter, CaseHero, CaseSection } from "../components/CaseStudy";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;
const INFRA = "https://github.com/user-attachments/assets/ebdc5c6f-f619-4917-a396-33387b2ca396";

export default function LocationSharingPage() {
  return (
    <div className="case-page case-areucoming">
      <CaseHero
        title="오고있니"
        lead="두 사람이 만나러 가는 동안만 위치와 기록을 공유하고, 만난 뒤 이동 경로를 회고할 수 있는 모바일 PWA를 완성했습니다."
        image={imageUrl("areucoming-image-1.png")}
        imageAlt="실시간 위치 공유와 만남 회고를 보여주는 오고있니 서비스 화면"
        facts={["5인 팀", "백엔드 전반 담당", "10개 팀 중 3위"]}
        links={[
          { label: "Backend GitHub", href: "https://github.com/mjy926/wackathon-server", primary: true },
          { label: "Frontend GitHub", href: "https://github.com/h-seo-n/wackathon-front" },
        ]}
      />

      <main>
        <CaseSection
          title="온라인 기능이 실제 만남까지 이어지게 만들었습니다"
          intro="해커톤 주제는 오프라인에서 완성되는 경험이었습니다. 위치를 계속 추적하는 서비스가 아니라, 요청에서 이동, 실제 만남, 회고까지 명확한 시작과 끝을 가진 경험으로 구현했습니다."
          className="is-surface"
        >
          <div className="case-flow">
            <article><strong>위치 공유 요청</strong><p>한 사람이 세션을 만들고 상대에게 만남을 요청합니다.</p></article>
            <article><strong>실시간 이동</strong><p>서로의 현재 위치와 지나온 경로, 메모를 확인합니다.</p></article>
            <article><strong>실제 만남</strong><p>두 사람이 만난 순간 세션을 완료하고 실시간 연결을 닫습니다.</p></article>
            <article><strong>이동 기록 회고</strong><p>저장된 경로와 만남 기록을 다시 확인합니다.</p></article>
          </div>
          <div className="case-note">
            <strong>검증된 결과</strong>
            <p>요청부터 회고까지 동작하는 시나리오를 현장에서 시연했고, 10개 팀 중 3위로 동상을 수상했습니다.</p>
          </div>
        </CaseSection>

        <CaseSection
          title="실시간 위치 공유의 백엔드 전반을 맡았습니다"
          intro="REST API와 WebSocket을 따로 구현하는 데서 끝내지 않고, 세션 상태, 연결 권한, 위치 기록 저장, 실시간 전파가 같은 사용자 흐름을 따르도록 연결했습니다."
          className="is-dark"
        >
          <div className="case-role-grid">
            <article>
              <h3>세션 생명주기</h3>
              <ul>
                <li>세션 생성, 수락, 종료, 만남 확정 구현</li>
                <li>진행 중 세션의 중복 생성 방지</li>
                <li>상태에 따른 사용자 행동과 연결 정책 정의</li>
              </ul>
            </article>
            <article>
              <h3>실시간 이벤트</h3>
              <ul>
                <li>세션별 WebSocket room 구성</li>
                <li>위치와 메모 이벤트 전파</li>
                <li>좌표와 이동 기록을 데이터베이스에 저장</li>
              </ul>
            </article>
            <article>
              <h3>인증과 복구</h3>
              <ul>
                <li>JWT와 세션 참여자 검증</li>
                <li>새로고침 이후 경로 복원</li>
                <li>클라이언트 입력을 서버 값으로 재확정</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="위치 공유를 연결이 아니라 생명주기로 모델링했습니다"
          intro="소켓이 열려 있다는 사실만으로는 누가 위치를 보내도 되는지, 언제 기록을 남기고 언제 연결을 닫아야 하는지 결정할 수 없습니다. 세션 상태가 서비스 동작을 결정하도록 만들었습니다."
        >
          <div className="case-flow">
            <article><strong>요청 대기</strong><p>요청자는 먼저 이동을 시작하고 상대의 수락을 기다립니다.</p></article>
            <article><strong>공유 진행</strong><p>두 사용자가 같은 room에서 위치와 메모를 주고받습니다.</p></article>
            <article><strong>만남 완료</strong><p>실제 만남을 확정하고 더 이상 실시간 이벤트를 받지 않습니다.</p></article>
            <article><strong>기록 조회</strong><p>저장된 좌표와 메모를 회고 화면에서 다시 사용합니다.</p></article>
          </div>
          <div className="case-note">
            <strong>상태가 권한을 결정</strong>
            <p>요청 대기 중에는 요청자만 연결하고, 공유가 시작되면 두 사용자를 허용하며, 완료된 세션은 다시 연결할 수 없게 했습니다.</p>
          </div>
        </CaseSection>

        <CaseSection
          title="새로고침 뒤에도 지나온 경로가 이어져야 했습니다"
          intro="WebSocket은 연결된 이후의 이벤트를 전달하지만 이전 좌표는 복원하지 않습니다. 저장된 기록과 새로 들어오는 이벤트를 역할에 따라 분리했습니다."
          className="is-accent"
        >
          <div className="case-flow">
            <article><strong>저장된 기록 조회</strong><p>HTTP 요청으로 세션의 기존 좌표와 메모를 가져옵니다.</p></article>
            <article><strong>지도 상태 복원</strong><p>클라이언트가 새로고침 전까지의 이동 경로를 먼저 그립니다.</p></article>
            <article><strong>실시간 연결</strong><p>WebSocket으로 새 위치와 메모 이벤트를 이어 받습니다.</p></article>
            <article><strong>저장과 전파</strong><p>새 좌표를 저장하면서 같은 세션의 두 사용자에게 전파합니다.</p></article>
          </div>
          <div className="case-split">
            <article className="case-panel">
              <h3>위치는 3초마다 저장</h3>
              <p>좌표를 데이터베이스에 남기면서 같은 세션 room에 전파해 실시간 화면과 회고 기록이 같은 데이터를 사용하게 했습니다.</p>
            </article>
            <article className="case-panel">
              <h3>사진은 업로드와 이벤트를 분리</h3>
              <p>파일은 HTTP로 업로드하고 저장 경로를 실시간 이벤트에 포함해 WebSocket이 큰 바이너리 전송까지 맡지 않게 했습니다.</p>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="연결 시점에 사용자와 세션 권한을 확정했습니다"
          intro="클라이언트가 보낸 사용자 ID와 세션 ID를 그대로 신뢰하면 다른 사용자의 이벤트를 가장할 수 있습니다. handshake에서 인증 정보, 세션 상태, 참여 관계를 모두 확인했습니다."
          className="is-surface"
        >
          <div className="case-flow">
            <article><strong>JWT 검증</strong><p>토큰에서 실제 사용자 정보를 확인합니다.</p></article>
            <article><strong>세션 조회</strong><p>요청한 세션이 존재하고 연결 가능한 상태인지 확인합니다.</p></article>
            <article><strong>참여 관계 확인</strong><p>사용자가 해당 커플과 세션의 참여자인지 검증합니다.</p></article>
            <article><strong>room 연결</strong><p>검증된 사용자와 세션 값으로만 이벤트를 전송합니다.</p></article>
          </div>
          <div className="case-split">
            <article className="case-panel">
              <h3>중복 요청에는 기존 세션 반환</h3>
              <p>요청 대기나 공유 중인 세션이 있으면 새 레코드를 만들지 않고 기존 세션을 반환해 재요청에도 같은 결과가 나오게 했습니다.</p>
            </article>
            <article className="case-panel">
              <h3>이벤트 주체는 서버에서 고정</h3>
              <p>payload의 사용자와 세션 식별자를 handshake에서 검증한 값으로 덮어써 클라이언트가 다른 사용자를 가장할 수 없게 했습니다.</p>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="해커톤 현장에서 동작하는 전체 구성을 완성했습니다"
          intro="React PWA, Spring Boot API와 WebSocket 서버, FCM 알림, S3 이미지 저장소가 하나의 시나리오에서 동작하도록 팀과 연동했습니다."
        >
          <div className="case-wide-image">
            <img src={INFRA} alt="오고있니 프론트엔드, 백엔드, 알림, 저장소 구성도" />
          </div>
          <div className="case-note">
            <strong>검증된 역량</strong>
            <p>실시간 통신을 기능 하나로 다루지 않고, 상태 모델, 영속화, 인증, 새로고침 복구까지 포함한 제품 흐름으로 구현했습니다.</p>
          </div>
        </CaseSection>
      </main>

      <CaseFooter>
        오고있니는 실시간 이벤트와 저장된 기록을 연결해, 온라인 기능이 실제 만남까지 이어지는 제품 경험을 완성한 프로젝트입니다.
      </CaseFooter>
    </div>
  );
}
