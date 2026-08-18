import { CaseFooter, CaseHero, CaseSection } from "../components/CaseStudy";

const imageUrl = (filename) => `${import.meta.env.BASE_URL}assets/images/${filename}`;

const links = {
  play: "https://2024fall-swpp.github.io/team-project-for-2024-fall-swpp-team-12/",
  github: "https://github.com/2024FALL-SWPP/team-project-for-2024-fall-swpp-team-12",
  playlist: "https://www.youtube.com/playlist?list=PLyip1lR-pqZOz7Fb8o9VwufTkeqWq2EMe",
};

export default function ChronosPage() {
  return (
    <div className="case-page case-chronos">
      <CaseHero
        title="Chronos"
        lead="시간을 되돌리면 이전 행동이 분신으로 재생되는 턴제 3D 퍼즐입니다. 여러 기능을 하나의 턴과 시간축에 통합해 16개 레벨을 완성했습니다."
        image={imageUrl("chronos-main-1.png")}
        imageAlt="플레이어와 분신이 레이저 퍼즐을 함께 푸는 Chronos 화면"
        facts={["5인 팀", "턴 시스템과 되감기 담당", "수업 평가 상위 20%"]}
        links={[
          { label: "게임 플레이", href: links.play, primary: true },
          { label: "GitHub", href: links.github },
          { label: "플레이 영상", href: links.playlist },
        ]}
      />

      <main>
        <CaseSection
          title="아이디어를 설명하는 데모가 아니라 끝까지 플레이되는 게임으로 완성했습니다"
          intro="시간을 되돌리고 과거의 나와 협력한다는 핵심 기믹을 16개 레벨, 브라우저 공개 빌드, 저장과 복구가 있는 완성된 플레이 경험으로 연결했습니다."
          className="is-surface"
        >
          <div className="case-proof">
            <div className="case-proof-image">
              <img src={imageUrl("chronos-main-2.png")} alt="턴별 이동 명령과 퍼즐 오브젝트가 보이는 Chronos 플레이 화면" />
            </div>
            <ul className="case-proof-list">
              <li><strong>16개 레벨</strong><span>처음부터 마지막 퍼즐까지 이어지는 전체 진행 흐름을 완성했습니다.</span></li>
              <li><strong>브라우저 공개 빌드</strong><span>설치 없이 다른 사람이 직접 플레이하고 검증할 수 있습니다.</span></li>
              <li><strong>3개 퍼즐 직접 설계</strong><span>시간 되돌리기와 분신 협력을 활용하는 레벨을 설계하고 구현했습니다.</span></li>
            </ul>
          </div>
        </CaseSection>

        <CaseSection
          title="턴과 시간축을 통합하는 핵심 시스템을 맡았습니다"
          intro="캐릭터와 퍼즐 오브젝트가 각각 동작하는 상태에서, 되감기와 분신 재생, 저장과 레벨 전환이 같은 규칙으로 동작하도록 통합했습니다. 익명 동료평가 기여도는 22%로 팀 평균 20%를 상회했습니다."
          className="is-dark"
        >
          <div className="case-role-grid">
            <article>
              <h3>턴 진행 통합</h3>
              <ul>
                <li>플레이어, 분신, 오브젝트의 턴 진행 연결</li>
                <li>이동과 충돌이 끝난 뒤 기록하는 완료 기준 구현</li>
                <li>다중 오브젝트의 상태 복원 순서 통제</li>
              </ul>
            </article>
            <article>
              <h3>되감기와 복구</h3>
              <ul>
                <li>턴별 명령을 확인하는 시간 되돌리기 UI</li>
                <li>Undo, Reset, Pause 구현</li>
                <li>레벨과 오브젝트 상태 자동 저장과 불러오기</li>
              </ul>
            </article>
            <article>
              <h3>레벨과 기능 통합</h3>
              <ul>
                <li>퍼즐 레벨 3개 직접 설계와 구현</li>
                <li>이동 장애물, 레이저, 캐릭터 밀림 처리</li>
                <li>분리된 씬을 연결해 16개 레벨 진행 완성</li>
              </ul>
            </article>
          </div>
        </CaseSection>

        <CaseSection
          title="과거 행동을 현재의 퍼즐 자원으로 바꿨습니다"
          intro="되감으면 삭제된 미래의 행동이 사라지는 대신 분신의 재생 경로가 됩니다. 현재의 나와 과거의 행동이 서로 다른 위치에서 같은 턴을 수행해 혼자서는 풀 수 없는 퍼즐을 해결합니다."
        >
          <div className="case-video">
            <iframe
              src="https://www.youtube.com/embed/QmiCr-Hd9h8?rel=0"
              title="시간을 되감아 분신과 함께 퍼즐을 해결하는 Chronos 플레이"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="case-flow">
            <article><strong>행동 기록</strong><p>이동과 오브젝트 상호작용을 턴 단위로 남깁니다.</p></article>
            <article><strong>과거 시점 선택</strong><p>명령 UI에서 돌아갈 턴과 삭제될 행동을 확인합니다.</p></article>
            <article><strong>분신 생성</strong><p>삭제된 미래의 명령을 분신이 수행할 재생 경로로 바꿉니다.</p></article>
            <article><strong>동시 해결</strong><p>현재의 나와 분신이 같은 턴 안에서 서로 다른 역할을 수행합니다.</p></article>
          </div>
        </CaseSection>

        <CaseSection
          title="되감기는 캐릭터가 아니라 월드 전체를 같은 시점으로 돌려야 했습니다"
          intro="캐릭터 위치만 복원하면 상자, 버튼, 레버, 이동 장애물은 미래 상태에 남습니다. 모든 기록이 정확히 같은 턴을 가리키도록 TurnManager가 복원 시점과 순서를 통제했습니다."
          className="is-accent"
        >
          <div className="case-table">
            <div className="case-table-row">
              <strong>캐릭터</strong>
              <span>플레이어 위치, 방향, 명령</span>
              <span>분신 위치와 재생할 명령을 선택한 턴으로 복원</span>
            </div>
            <div className="case-table-row">
              <strong>퍼즐 오브젝트</strong>
              <span>상자와 이동 장애물의 위치, 버튼과 레버의 상태</span>
              <span>각 오브젝트의 기록 구조는 유지하면서 같은 턴으로 이동</span>
            </div>
            <div className="case-table-row">
              <strong>되감기 결과</strong>
              <span>선택한 시점 이후의 미래 명령</span>
              <span>잘라낸 명령은 분신에 전달하고 월드는 선택한 시점에서 다시 시작</span>
            </div>
          </div>
          <div className="case-note">
            <strong>확장 가능한 통합</strong>
            <p>기능별 기록 구조를 하나로 다시 만들지 않고 공통 턴 기준만 통제했습니다. 새로운 퍼즐 오브젝트도 같은 턴 인터페이스를 따르면 되감기와 저장 기능에 참여할 수 있습니다.</p>
          </div>
        </CaseSection>

        <CaseSection
          title="모든 움직임이 끝난 순간을 한 턴의 경계로 정했습니다"
          intro="플레이어 입력 뒤에도 분신 이동, 상자 밀기, 버튼 변화, 장애물 충돌이 연쇄적으로 이어집니다. 중간 상태가 기록되지 않도록 모든 결과가 끝난 순간에만 로그를 남겼습니다."
          className="is-surface"
        >
          <div className="case-flow">
            <article><strong>입력 승인</strong><p>현재 격자와 충돌을 검사해 실행 가능한 입력인지 확인합니다.</p></article>
            <article><strong>동시 진행</strong><p>플레이어, 분신, 퍼즐 오브젝트가 각자의 동작을 수행합니다.</p></article>
            <article><strong>완료 대기</strong><p>이동, 밀림, 충돌, 상태 변화가 모두 끝났는지 확인합니다.</p></article>
            <article><strong>상태 기록</strong><p>같은 시점의 위치와 상태만 턴 로그에 저장합니다.</p></article>
          </div>
          <div className="case-note">
            <strong>이동 장애물이 캐릭터를 밀 때</strong>
            <p>장애물 이동, 캐릭터가 밀릴 수 있는지 검사, 캐릭터 위치 갱신, 버튼과 충돌 상태 재계산까지 끝난 뒤에만 스냅샷을 남겼습니다. 되감은 뒤에도 충돌 결과가 같은 순서로 재현됩니다.</p>
          </div>
        </CaseSection>

        <CaseSection
          title="복잡한 규칙을 계속 플레이할 수 있는 경험으로 바꿨습니다"
          intro="핵심 시스템만 동작하는 프로토타입에 머무르지 않도록 실수 복구, 진행 보존, 레벨 전환과 퍼즐 오브젝트를 함께 마무리했습니다."
        >
          <div className="case-split">
            <article className="case-panel"><h3>실수 복구</h3><p>Undo와 Reset으로 복잡한 퍼즐에서 처음부터 다시 시작하는 비용을 낮췄습니다.</p></article>
            <article className="case-panel"><h3>진행 보존</h3><p>현재 레벨과 퍼즐 오브젝트 상태를 자동 저장하고 다음 실행에서 복원했습니다.</p></article>
            <article className="case-panel"><h3>퍼즐 확장</h3><p>이동 장애물과 레이저가 캐릭터, 상자, 버튼과 같은 턴 규칙 안에서 상호작용하게 했습니다.</p></article>
            <article className="case-panel"><h3>전체 레벨 연결</h3><p>팀원이 만든 씬을 하나의 진행 흐름으로 연결해 첫 레벨부터 마지막 레벨까지 플레이할 수 있게 했습니다.</p></article>
          </div>
          <div className="case-note">
            <strong>검증된 역량</strong>
            <p>여러 사람이 만든 기능을 공통 상태와 실행 순서로 통합하고, 복잡한 시스템을 다른 사람이 끝까지 사용할 수 있는 제품으로 완성했습니다.</p>
          </div>
        </CaseSection>
      </main>

      <CaseFooter>
        Chronos는 시간 되돌리기 설계 자체보다, 여러 기능과 레벨을 하나의 규칙으로 통합해 끝까지 플레이되는 게임으로 만든 실행력을 보여주는 프로젝트입니다.
      </CaseFooter>
    </div>
  );
}
