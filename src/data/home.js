export const profile = {
  name: '이승현', englishName: 'Seunghyeon Lee', role: '풀스택 / 데이터 / 인터랙티브 시스템',
  intro: '데이터와 상태를 설계해, 사용자가 다음 행동을 예측할 수 있는 일관된 흐름을 구현합니다.',
}

export const projects = [
  { name: '행샤', subtitle: '교내 행사 캘린더', stack: 'Spring Boot / MySQL / Docker / React', type: '동아리 팀 프로젝트', description: '여러 기관의 비정형 행사 데이터를 정규화하고, 크롤링부터 저장·검색·운영까지 이어지는 서비스 데이터 흐름을 구축했습니다.', slug: 'campus-event-calendar' },
  { name: '연이음', subtitle: '단어 연결 퍼즐 게임', stack: 'Unity / C# / Graph', type: '넥슨 게임잼 “재밌넥” 팀 프로젝트 / 14팀 중 3위', description: '단어 관계를 의미 그래프로 모델링하고, 실제 드로우 환경에서 경로가 성립하도록 노드, 엣지 데이터와 판정 로직을 설계했습니다.', slug: 'word-connection-game' },
  { name: '오고있니', subtitle: '실시간 위치 공유 서비스', stack: 'Spring Boot / React / WebSocket', type: '동아리 해커톤 “와커톤” 팀 프로젝트 / 10팀 중 3위', description: '위치 공유 요청부터 종료까지의 세션 생명주기와 실시간 이벤트 흐름, 위치 기록 및 히스토리 조회 API를 구현했습니다.', slug: 'location-sharing-service' },
  { name: 'Chronos', subtitle: '턴제 3D 퍼즐 게임', stack: 'Unity / C#', type: '수업 팀 프로젝트', description: '턴 루프와 상태 로그를 중심으로 시간 되돌리기, 분신 재생, 퍼즐 오브젝트가 일관되게 동작하는 핵심 시스템을 구현했습니다.', slug: 'turn-based-puzzle-game' },
]

export const experiences = [
  { period: '26. 06. — 현재', company: '이루리랩스', role: '프로덕트 엔지니어', stack: 'Next.js / NestJS / React Native', description: '교육 AI SaaS에서 과제 배포부터 학생 제출, 문서 처리, AI 채점, 결과 피드백까지 이어지는 학습 워크플로우를 프론트/백/앱 전반에서 개발하고 있습니다.', link: 'https://ai.passdream.app/' },
  { period: '26. 01. — 26. 04.', company: '서울대학교 HCS Lab', role: '학부 연구 인턴', stack: 'HCI / XR / AI Applications', description: 'XR Agent 시스템 연구에서 HMD 카메라 입력의 2D-3D 정렬, 객체 기반 world-space 오버레이 구현과 AI 생성 결과 품질 평가를 담당했습니다.', link: 'https://hcs.snu.ac.kr' },
  { period: '25. 08. — 현재', company: '서울대학교 와플스튜디오', role: '풀스택 개발', stack: 'React / Spring Boot / CI/CD', description: '웹 개발 동아리에서 백엔드와 프론트엔드를 담당하여, API 설계, 인증, 상태 관리, 데이터베이스와 배포를 포함하여 서비스를 개발하고 있습니다.', link: 'https://wafflestudio.com' },
  { period: '22. 01. — 23. 10.', company: '공군 공중기동정찰사령부', role: '정보상황병', stack: '상황 감시 / 보고 지원', description: '24시간 교대 근무 환경에서 상황 감시 및 보고를 지원하는 정보상황 업무를 수행했습니다.' },
]

export const education = [
  { period: '20. 3. — 27. 2. (예정)', school: '서울대학교', detail: ['자유전공학부', '주전공: 컴퓨터공학, 언어학'], grade: 'GPA 4.02 / 4.3' },
  { period: '25. 4. — 25. 8.', school: '와세다대학', detail: ['1학기 교환학생, 총 8개 수업 일본어로 수강', '(컴퓨터공학 관련 5개 포함)'], grade: 'GPA 3.7 / 4.0' },
  { period: '17. 3. — 20. 2.', school: '대전외국어고등학교', detail: '스페인어과' },
]

export const skills = { '서버 / 데이터': ['Spring Boot', 'NestJS', 'Java', 'Kotlin', 'Python', 'MySQL', 'Redis'], 클라이언트: ['React', 'Next.js', 'React Native', 'JavaScript', 'TypeScript', 'HTML/CSS'], 인터랙티브: ['Unity', 'C#', 'OpenXR', 'XR Interaction Toolkit'], '도구 / 인프라': ['Docker', 'Nginx', 'GitHub Actions', 'AWS EC2', 'OCI', 'Linux'] }
export const navigation = [['projects', '프로젝트'], ['experience', '경험'], ['education', '학력'], ['skills', '기술'], ['contact', '연락처']]
