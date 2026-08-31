export type ProjectAccent = "violet" | "sky" | "emerald" | "rose" | "amber";

export type ProjectCategory = "web" | "extension" | "desktop";

export type ProjectImage = {
  /** public 경로. 파일 추가 전까지 플레이스홀더로 표시 */
  src: string;
  alt: string;
};

export type ProjectChallenge = {
  /** 겪은 문제 */
  problem: string;
  /** 해결 방법 */
  solution: string;
};

export type ProjectArchitectureGroup = {
  /** 그룹 제목 (예: Network & Security) */
  title: string;
  items: string[];
};

export type ProjectRoadmapItem = {
  /** 앞으로 해볼 것 (무엇을) */
  title: string;
  /** 왜 / 현재 한계 */
  reason: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  accent: ProjectAccent;
  category: ProjectCategory;
  /** true면 목록·네비·사이트맵에서 숨김. 데이터와 상세 페이지(직접 링크)는 유지 */
  hidden?: boolean;
  /** 스크린샷 목록. 카드는 첫 번째, 상세는 전체 표시 */
  images: ProjectImage[];
  /** 일반 방문자용 한 줄 요약 */
  userSummary: string;
  /** 일반 방문자용 “이렇게 쓰면 돼요” 불릿 */
  userBullets: string[];
  /** 개발자·포트폴리오용 상세 설명 */
  developerDescription: string;
  developerHighlights: string[];
  /** 개발자 모드 전용: 시스템 구성 요약 불릿 (그룹을 쓰지 않는 단순 케이스) */
  architecture?: string[];
  /** 개발자 모드 전용: 아키텍처 도입 설명 (그룹·다이어그램과 함께 사용) */
  architectureIntro?: string;
  /** 개발자 모드 전용: 카테고리별 아키텍처 상세 */
  architectureGroups?: ProjectArchitectureGroup[];
  /** 개발자 모드 전용: 아키텍처 다이어그램 이미지 (옵션, 도입 설명 하단에 표시) */
  architectureImage?: ProjectImage;
  /** 개발자 모드 전용: 문제점 및 해결 방법 (없으면 섹션 숨김) */
  challenges?: ProjectChallenge[];
  /** 개발자 모드 전용: 아직 개발하지 않았지만 계획 중인 항목 (없으면 섹션 숨김) */
  roadmap?: ProjectRoadmapItem[];
  repoUrl: string;
  liveUrl: string;
  /** liveUrl 버튼 문구. 없으면 category 기준 기본값(다운로드·설치·열기)을 쓴다 */
  liveLabel?: string;
  stack: string[];
};

/** 각 저장소 README 기준으로 정리한 목록 */
export const projects: Project[] = [
  {
    id: "imagen",
    title: "ImageGen",
    tagline: "AI 이미지 생성·공유",
    accent: "violet",
    category: "web",
    images: [
      { src: "/projects/imagen/main.webp", alt: "메인 피드" },
      { src: "/projects/imagen/generate.webp", alt: "이미지 생성" },
      { src: "/projects/imagen/gallery.webp", alt: "갤러리" },
      { src: "/projects/imagen/detail.webp", alt: "이미지 상세" },
      { src: "/projects/imagen/profile.webp", alt: "프로필" },
      { src: "/projects/imagen/comment.webp", alt: "작성 댓글" },
      { src: "/projects/imagen/notification.png", alt: "알림" },
      { src: "/projects/imagen/admin1.webp", alt: "관리자 - 이미지 관리" },
      { src: "/projects/imagen/admin2.webp", alt: "관리자 - 크레딧 비용 설정" },
    ],
    userSummary:
      "말로 설명만 해도 그림을 만들고, 만든 그림을 다른 사람과 나누고 반응할 수 있는 서비스예요.",
    userBullets: [
      "원하는 분위기·소재를 말하면 이미지 생성",
      "만든 작품을 올리고 좋아요·댓글로 소통",
      "내 프로필에서 활동을 한눈에 보기",
    ],
    developerDescription:
      "Next.js와 여러 이미지 모델을 사용한 AI 이미지 생성 웹 애플리케이션입니다. API·로컬 모델로 이미지를 만들고 공유하며, 좋아요·댓글·프로필까지 지원합니다.",
    developerHighlights: [
      "DALL·E 3, Google Imagen, Nano Banana 등 API 모델",
      "Stable Diffusion XL, Z Image Turbo 등 로컬 모델",
      "생성 이미지 공유, 좋아요·댓글",
      "프로필 조회·수정",
    ],
    architectureIntro:
      "클라우드 비용 절감과 고성능 AI 모델 서빙을 위해 Home Lab(온프레미스) 환경을 직접 구축했습니다. RTX 5090 데스크톱을 AI 추론 워크스테이션으로, 미니 PC(WSL2)를 웹 서버로 분리해 운영합니다.",
    architectureImage: {
      src: "/projects/imagen/architecture.png",
      alt: "ImageGen 인프라 아키텍처 (Home Lab)",
    },
    architectureGroups: [
      {
        title: "Application",
        items: [
          "Next.js App Router 기반 SSR로 피드·갤러리·상세 페이지 렌더링",
          "Prisma ORM으로 MySQL 연동, 사용자·이미지·좋아요·댓글·알림 스키마 관리",
          "공통 요청/응답 타입과 '크레딧 → 파일 저장 → DB' 파이프라인을 공유하고, 모델 호출은 모델별로 분기",
          "로컬 생성 시 Ollama로 한글 프롬프트를 영어로 번역, Z-Image는 ComfyUI 워크플로우를 런타임에 동적 구성",
          "서버 상태는 TanStack Query, 전역 UI 상태는 Zustand로 관리",
        ],
      },
      {
        title: "Why Self-Hosted",
        items: [
          "비용 효율성: GPU가 필요한 이미지 생성 모델을 AWS g5 등 클라우드로 구동할 때의 비용을 로컬 RTX 5090 데스크톱으로 절감",
          "데이터 주권: 생성된 이미지와 프롬프트 데이터를 로컬 MySQL에 직접 저장·관리",
        ],
      },
      {
        title: "Network & Security",
        items: [
          "WSL2 미러링 모드로 윈도우 호스트–WSL 간 네트워크 장벽을 제거, 복잡한 포트포워딩 없이 localhost 통신 환경 최적화",
          "Nginx 리버스 프록시로 SSL(HTTPS) 적용 및 내부 포트(3000·3306 등) 외부 노출 차단",
          "공유기에서 80·443 포트만 개방해 외부 공격 표면 최소화",
        ],
      },
      {
        title: "CI/CD Pipeline",
        items: [
          "GitHub Actions Self-hosted Runner가 Job을 폴링(pull)하는 방식이라, 외부에서 로컬 서버로의 직접 SSH 접속 없이 배포 보안 강화",
          "Push → Build → PM2 Reload 과정을 자동화해 무중단 배포 구현",
        ],
      },
    ],
    challenges: [
      {
        problem:
          "모델마다 응답 형식(URL·base64·inlineData·ComfyUI 폴링)과 지연이 제각각이라 후처리가 복잡",
        solution:
          "응답을 공통 GenerateImageResponse로 정규화하고 '크레딧 → 파일 저장 → DB' 파이프라인을 공통화, 모델 호출만 모델별로 분기",
      },
      {
        problem:
          "로컬 GPU 서버(ComfyUI·SDXL)에 동시 요청이 몰리면 VRAM 부족·처리 속도 저하 등 병목 발생",
        solution:
          "인메모리 작업 큐로 로컬 모델 요청을 순차 처리(기본 동시성 1)하고 대기 순번을 실시간 안내, 대기열이 가득 차면 429로 백프레셔. GPU가 실질 병목이라 수평 확장의 이득이 없다고 판단해 단일 인스턴스를 전제로 의도적으로 단순화했고, 멀티 GPU·다중 인스턴스가 필요해지면 Redis 등 분산 큐로 전환할 수 있는 한계를 명시적으로 인지하고 내린 결정",
      },
      {
        problem:
          "DALL·E·Imagen·Nano Banana 등 유료 API 모델은 무분별하게 호출되면 그대로 비용으로 이어짐",
        solution:
          "서버 전역 요청 카운터로 유료 API 모델 호출 횟수를 제한(로컬 모델은 제외). 정식 계정 인증을 붙이기 전, 런칭 초기의 비용 보호용 임시 가드로 도입",
      },
      {
        problem:
          "프롬프트 번역·카테고리 추천에 쓰는 로컬 LLM(Ollama Gemma 3 4B)은 AI 데스크톱이 켜져 있을 때만 동작하는데, 데스크톱을 24시간 켜두지 않아 꺼진 동안에는 기능이 멈춤",
        solution:
          "LLM 호출을 provider 계층(llmService)으로 추상화하고, 어드민 페이지에서 Ollama ↔ Gemini 2.5 Flash Lite provider·모델·기능별(번역/분류) on·off를 런타임에 전환하도록 구성. 데스크톱을 끄는 동안에는 코드 수정·재배포 없이 어드민에서 Gemini로 전환해 운영",
      },
    ],
    repoUrl: "https://github.com/nemokoala/imagen",
    liveUrl: "https://image-gen.store",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "MySQL",
      "Prisma",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    id: "tossme",
    title: "TossMe",
    tagline: "토스로 바로 송금",
    accent: "sky",
    category: "web",
    hidden: true,
    images: [
      { src: "/projects/tossme/form.png", alt: "송금 정보 입력" },
      { src: "/projects/tossme/qr.png", alt: "QR·링크 공유" },
    ],
    userSummary:
      "받을 사람의 은행과 계좌만 적으면, 토스 앱에서 바로 송금 화면이 열리는 링크나 QR을 만들어 드려요.",
    userBullets: [
      "은행 고르고 계좌번호 입력",
      "금액은 넣어도 되고 비워도 됨",
      "QR이나 링크로 상대에게 보내기",
      "링크 복사·QR 저장 한 번에",
    ],
    developerDescription:
      "토스 앱으로 바로 송금할 수 있는 딥링크 생성기입니다. 은행·계좌·금액을 입력하면 토스 앱에서 열 수 있는 링크와 QR 코드를 만들고, 링크 복사·QR 저장을 지원합니다.",
    developerHighlights: [
      "주요 은행 선택 및 커스텀 은행명",
      "금액 선택 입력, 딥링크·QR 자동 생성",
      "입력 정보 로컬 저장(선택)",
    ],
    architectureIntro:
      "API·DB·서버 상태 없이 브라우저에서 완결되는 클라이언트 전용 구조입니다. 입력값을 받아 supertoss:// 딥링크를 실시간으로 조합하고 QR·링크로 전달합니다.",
    architecture: [
      "입력값을 실시간 추적해 supertoss:// 송금 딥링크를 조합",
      "딥링크를 qrcode.react로 QR 렌더링, canvas를 PNG로 저장",
      "'입력 정보 저장' 선택 시 localStorage에 동기화·복원",
      "Next.js 16 App Router 기반, Vercel 배포",
    ],
    challenges: [
      {
        problem:
          "'입력 정보 저장'으로 localStorage 값을 복원하면, 빈 기본값으로 그려진 SSR 결과와 클라이언트 복원 결과가 달라 하이드레이션 불일치·깜빡임이 발생",
        solution:
          "마운트 완료 여부를 isHydrated 플래그로 추적하고, 폼 영역을 opacity 트랜지션으로 가려 클라이언트 상태가 확정된 뒤에만 표시",
      },
      {
        problem:
          "iOS Safari 등 일부 환경에서는 navigator.clipboard를 쓸 수 없어 링크 복사가 실패",
        solution:
          "Clipboard API → 숨김 textarea + execCommand('copy') → prompt() 순의 3단계 폴백으로 어떤 환경에서도 복사 경로를 보장",
      },
      {
        problem:
          "qrcode.react는 canvas로만 렌더링돼 사용자가 QR을 이미지 파일로 바로 저장할 수 없음",
        solution:
          "ref로 canvas 요소를 참조해 toDataURL('image/png')로 변환한 뒤, 동적으로 생성한 <a download> 클릭으로 PNG 다운로드를 구현",
      },
    ],
    repoUrl: "https://github.com/nemokoala/TossMe",
    liveUrl: "https://tossme.nemokoala.com",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "qrcode.react",
    ],
  },
  {
    id: "nemodrop",
    title: "NemoDrop",
    tagline: "가입 없이 파일·메모 공유",
    accent: "emerald",
    category: "web",
    images: [
      { src: "/projects/nemodrop/home.png", alt: "메인 화면" },
      { src: "/projects/nemodrop/upload.png", alt: "파일 업로드" },
      { src: "/projects/nemodrop/share.png", alt: "공유 코드·QR" },
      { src: "/projects/nemodrop/download.png", alt: "다운로드" },
    ],
    userSummary:
      "회원가입 없이 파일이나 긴 메모를 올리면, 짧은 코드와 링크로 받는 사람이 바로 받을 수 있어요.",
    userBullets: [
      "여러 파일을 한 번에 올리기",
      "긴 텍스트만 따로 공유하기",
      "만료 시간을 정해 자동으로 정리",
      "코드·링크·QR로 친구에게 전달",
    ],
    developerDescription:
      "로그인 없이 파일이나 텍스트를 빠르게 공유하는 임시 공유 서비스로, 6자리 코드·링크·QR로 받는 사람이 내려받거나 복사할 수 있습니다.",
    developerHighlights: [
      "다중 파일 합산 최대 5GB 업로드",
      "짧은 메모부터 큰 텍스트까지 공유",
      "만료 시간·업로드 이력(브라우저)",
      "한국어·영어 UI, ZIP 다운로드",
    ],
    architectureIntro:
      "로그인 없이 대용량 파일과 텍스트를 빠르게 공유하는 데 초점을 맞춰, 데이터를 메모리에 적재하지 않는 스트리밍 파이프라인과 만료 기반 자동 정리를 중심으로 설계했습니다.",
    architectureGroups: [
      {
        title: "Application",
        items: [
          "Next.js 16 App Router 기반, /[locale] 경로와 next-intl 미들웨어로 한국어·영어 다국어 라우팅",
          "업로드·텍스트·단일/전체 다운로드·세션 조회를 Route Handler(API Route)로 구현, 서버 상태는 TanStack Query로 관리",
          "Prisma 7 + better-sqlite3 어댑터로 SQLite 연동, Session·File 스키마를 Cascade 삭제로 묶어 관리",
        ],
      },
      {
        title: "Streaming I/O",
        items: [
          "업로드는 Busboy로 multipart를 스트리밍 파싱하고, 요청 본문(Web ReadableStream)을 Node 스트림으로 브릿지해 파일을 메모리에 모으지 않고 디스크에 직접 기록",
          "파일은 UPLOAD_DIR 아래 세션 코드 폴더에 UUID 이름으로 저장하고, 원본명·크기(BigInt)·MIME 타입은 DB에 분리 보관",
          "단일 파일은 ReadStream으로, 다중 파일은 archiver ZIP을 PassThrough에 파이프해 스트리밍 응답 — 양쪽 모두 전체를 메모리에 적재하지 않고 전송",
        ],
      },
      {
        title: "Lifecycle & Cleanup",
        items: [
          "6자리 숫자 공유 코드를 생성하되 만료되지 않은 세션만 대상으로 유니크 검사(최대 10회 재시도)해 활성 코드 충돌만 회피",
          "세션마다 만료 시각(expiresAt)을 두고 다운로드 시 만료를 검사해 410으로 차단",
          "instrumentation register()에서 node-cron으로 매시간 만료된 세션의 파일 디렉터리와 DB 레코드를 함께 정리",
        ],
      },
      {
        title: "Deploy & Ops",
        items: [
          "Windows 미니 PC의 WSL에서 Next.js 프로덕션 서버(3001)를 실행하고 Nginx 리버스 프록시로 외부 요청을 받아 SSL 처리",
          "업로드 한도(5GB)에 맞춰 Nginx client_max_body_size와 Next.js proxyClientMaxBodySize를 6GB로 상향",
          "프로덕션 업로드·다운로드 이벤트는 Discord Webhook으로 로깅, 용량 한도·저장 경로 등은 환경 변수로 분리",
        ],
      },
    ],
    challenges: [
      {
        problem:
          "다중 파일 합산 최대 5GB 업로드를 한 요청으로 받으면 전체를 메모리에 버퍼링할 수 없고, 프레임워크·프록시의 본문 크기 제한에도 걸림",
        solution:
          "Busboy로 multipart를 스트리밍 파싱하고 요청 본문을 Node 스트림으로 브릿지해 각 파일을 createWriteStream으로 디스크에 직접 기록(메모리 비적재). content-length 사전 검사와 누적 바이트 실시간 검사로 한도 초과 시 즉시 413으로 차단하고, Next.js proxyClientMaxBodySize와 Nginx client_max_body_size를 6GB로 맞춰 프록시 한도까지 상향",
      },
      {
        problem:
          "여러 파일을 한 번에 받으려면 하나의 ZIP으로 묶어야 하는데, 최대 5GB나 되는 ZIP을 서버 메모리에 통째로 만들면 메모리가 부족해 서버가 멈출 수 있음",
        solution:
          "ZIP을 메모리에 완성하지 않고 스트리밍으로 처리. archiver로 압축한 결과를 곧바로 응답 스트림으로 흘려보내고(PassThrough → Readable.toWeb), 각 파일도 통째로 읽지 않고 ReadStream으로 하나씩 이어 붙여, 5GB급도 메모리에 올리지 않고 다운로드를 제공",
      },
      {
        problem:
          "로그인이 없어 공유 항목이 무한정 쌓여 디스크·DB가 비대해지고, 만료된 파일이 계속 접근 가능하면 안 됨",
        solution:
          "세션마다 만료 시각을 두고 다운로드 시 만료를 검사해 410으로 차단하며, instrumentation의 node-cron으로 매시간 만료 세션의 파일 디렉터리와 DB 레코드를 함께 삭제해 자동 정리",
      },
      {
        problem:
          "기억하기 쉬운 6자리 코드는 충돌 가능성이 있고, 과거에 만료된 코드가 새 업로드를 막아서는 안 됨",
        solution:
          "코드 유니크 검사를 '만료되지 않은 세션'으로 한정(최대 10회 재시도)해 활성 코드 충돌만 회피하고, 만료된 코드는 자연스럽게 재사용 가능하도록 처리",
      },
    ],
    repoUrl: "https://github.com/nemokoala/quickdrop",
    liveUrl: "https://nemodrop.nemokoala.com",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "SQLite",
      "Prisma 7",
      "TanStack Query",
      "next-intl",
    ],
  },
  {
    id: "JukeRoom",
    title: "JukeRoom",
    tagline: "같이 듣는 음악",
    accent: "rose",
    category: "web",
    images: [
      {
        src: "/projects/jukeroom/host-playing.webp",
        alt: "호스트 페이지 — 재생 중",
      },
      {
        src: "/projects/jukeroom/host-waiting.webp",
        alt: "호스트 페이지 — 방 코드·QR 공유",
      },
      {
        src: "/projects/jukeroom/guest-now-playing.webp",
        alt: "게스트 페이지 — 지금 재생 중과 대기열",
      },
      { src: "/projects/jukeroom/add-song.webp", alt: "곡 추가 검색" },
    ],
    userSummary:
      "같은 자리에 모인 사람들이 함께 음악을 맞춰 들을 수 있게 도와주는 서비스예요.",
    userBullets: [
      "4자리 코드나 QR로 로그인 없이 바로 참여",
      "원하는 노래를 검색하거나 링크로 대기열에 추가",
      "호스트 화면에서 다 같이 음악 감상",
    ],
    developerDescription:
      "로그인 없이 4자리 코드로 입장해 같은 공간의 사람들이 하나의 플레이리스트를 함께 만드는 실시간 음악 서비스입니다. 호스트 화면이 실제 YouTube 영상을 재생하고, 게스트는 곡을 검색·추가하며 Supabase Realtime으로 재생 상태를 함께 봅니다.",
    developerHighlights: [
      "4자리 코드·QR로 로그인 없이 방 생성·입장",
      "호스트 단일 재생 + 게스트 곡 추가·대기열, Supabase Realtime 동기화",
      "Invidious 우선·YouTube Data API 폴백 검색, URL(oEmbed) 추가 지원",
      "한국어·영어 지원, Vercel Cron으로 오래된 방 자동 정리",
    ],
    architectureIntro:
      "별도 로그인 없이 같은 공간의 사람들이 4자리 코드로 모여 하나의 플레이리스트를 함께 만드는 실시간 서비스입니다. 호스트 화면이 실제 음악을 재생하는 단일 재생 주체(single source of truth)가 되고, 게스트는 곡을 추가하며 재생 상태를 실시간으로 함께 봅니다.",
    architectureGroups: [
      {
        title: "Application",
        items: [
          "Next.js 16 App Router 기반, 호스트(재생 화면)와 게스트(대기열·곡 추가) 페이지를 분리",
          "react-youtube(YouTube IFrame Player API)로 호스트 화면에서 실제 영상·오디오 재생",
          "서버 상태는 TanStack Query로 관리하고, Supabase Realtime 이벤트 수신 시 쿼리를 무효화해 최신 대기열을 반영",
          "next-intl로 한국어·영어 다국어 라우팅([locale] 세그먼트) 구성",
        ],
      },
      {
        title: "Realtime Sync",
        items: [
          "방·대기열·재생 위치(play_index)를 Supabase(Postgres)에 저장하고 postgres_changes로 구독",
          "호스트가 곡을 넘기면 rooms.play_index를 갱신 → 게스트는 Realtime UPDATE를 받아 동일한 '현재 곡'을 표시",
          "playlist 테이블 변경(곡 추가)도 별도 채널로 구독해 모든 참여자 화면에 즉시 반영",
          "연결이 끊겨도 수동 재연결 버튼으로 쿼리 재요청 + 채널 재구독(subscriptionKey)해 복구",
        ],
      },
      {
        title: "Auth & Data",
        items: [
          "로그인 없이 4자리 방 코드로 입장. RLS에서 anon 역할의 read/insert/update만 허용해 마찰 없는 참여 보장",
          "rooms·playlist 테이블을 Supabase Realtime publication에 등록",
          "ON DELETE CASCADE로 방 삭제 시 연결된 대기열도 자동 정리",
        ],
      },
      {
        title: "Search & Ops",
        items: [
          "곡 검색은 API Key가 필요 없는 Invidious 퍼블릭 인스턴스를 우선 사용하고, 실패 시 공식 YouTube Data API로 폴백",
          "URL 직접 추가는 무료 oEmbed로 제목·썸네일 조회",
          "Vercel Cron이 매일 2일 이상 지난 방을 service-role 어드민 클라이언트로 정리",
          "Vercel 배포, qrcode.react로 방 URL을 QR로 공유",
        ],
      },
    ],
    challenges: [

      {
        problem:
          "모바일 절전·네트워크 변경 등으로 Realtime WebSocket 구독이 조용히 끊기면 대기열·재생 상태가 더 이상 갱신되지 않음",
        solution:
          "수동 재연결 버튼에서 쿼리를 invalidate해 최신 데이터를 다시 받고, subscriptionKey를 증가시켜 채널을 cleanup 후 재구독하도록 구성",
      },
      {
        problem:
          "공식 YouTube Data API 검색은 호출당 할당량(quota) 소모가 커서 무료로 운영하기 부담스러움",
        solution:
          "API Key가 필요 없는 Invidious 퍼블릭 인스턴스를 우선 사용하고, 모든 인스턴스가 실패할 때만 공식 API로 폴백. URL 추가는 무료 oEmbed로 처리해 호출 비용을 최소화",
      },
    ],
    repoUrl: "https://github.com/nemokoala/social-jukebox",
    liveUrl: "https://juke-room.vercel.app",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "TanStack Query",
      "next-intl",
      "react-youtube",
    ],
  },
  {
    id: "terminal-shortcut-buttons",
    title: "Terminal Shortcut Buttons",
    tagline: "커서·VS Code 터미널 버튼",
    accent: "amber",
    category: "extension",
    hidden: true,
    images: [
      {
        src: "/projects/terminal-shortcut-buttons/deck.png",
        alt: "Command Deck 패널",
      },
      { src: "/projects/terminal-shortcut-buttons/mini.png", alt: "미니 모드" },
      {
        src: "/projects/terminal-shortcut-buttons/statusbar.png",
        alt: "상태 바 버튼",
      },
      {
        src: "/projects/terminal-shortcut-buttons/editor.png",
        alt: "인라인 명령 편집 폼",
      },
    ],
    userSummary:
      "Cursor나 VS Code에서 자주 쓰는 터미널 명령을 버튼 한 번으로 실행할 수 있게 해주는 확장프로그램이에요.",
    userBullets: [
      "npm run dev, git status 같은 명령을 버튼에 등록",
      "Command Deck 패널에서 카드로 관리하고, 폼으로 바로 추가·수정·삭제",
      "하단 상태 바에 버튼 표시 (명령별로 표시 여부 선택 가능)",
      "카드 크기 Full·Mini·Micro 3단계로 조절",
      "프로젝트별·전역 설정 분리 지원",
    ],
    developerDescription:
      "Cursor·VS Code용 확장프로그램으로, settings.json에 정의한 명령을 Command Deck 웹뷰 패널과 상태 바 버튼으로 실행합니다. 웹뷰 인라인 폼으로 명령을 편집하면 해당 스코프의 settings.json에 바로 반영됩니다. Open VSX에 배포되어 있습니다.",
    developerHighlights: [
      "VS Code Webview API 기반 Command Deck 패널",
      "패널 폼에서 명령을 추가·수정·삭제하면 설정 파일(settings.json)에 자동 저장 (프로젝트별·전역 구분)",
      "명령별 상태 바 표시 토글, 카드 크기 3단계(full/mini/micro)",
      "Open VSX 배포: nemokoala.terminal-shortcut-buttons v0.0.10",
    ],
    architectureIntro:
      "웹뷰(iframe 샌드박스)는 vscode 모듈을 import할 수 없어, 함수 호출이 아니라 직렬화된 메시지만 경계를 넘습니다. 아래 다이어그램이 Command Deck의 메시지 흐름을 보여줍니다.",
    architectureImage: {
      src: "/projects/terminal-shortcut-buttons/architecture.png",
      alt: "Command Deck 메시지 흐름",
    },
    architecture: [
      "웹뷰는 postMessage로 요청만 전달, Extension Host가 vscode API로 실제 작업 수행",
      "응답은 postMessage 대신 webview.html 재생성으로 패널 전체 갱신",
      "설정은 워크스페이스·전역 스코프를 통합해 읽고, 수정은 해당 스코프에 반영",
    ],
    challenges: [
      {
        problem:
          "워크스페이스 설정과 전역 설정이 따로 있어 버튼 목록이 충돌·중복될 수 있음",
        solution:
          "두 범위의 settings.json을 병합해 읽고 우선순위·정렬 규칙으로 통합",
      },
    ],
    repoUrl: "https://github.com/nemokoala/terminal-shortcut-buttons",
    liveUrl:
      "https://open-vsx.org/extension/nemokoala/terminal-shortcut-buttons",
    stack: ["VS Code Extension API", "TypeScript", "Webview API", "HTML/CSS"],
  },
  {
    id: "clipboard",
    title: "ClipBoard",
    tagline: "클립보드 히스토리 매니저",
    accent: "sky",
    category: "desktop",
    images: [
      { src: "/projects/clipboard/overlay.png", alt: "오버레이 메인 창" },
      { src: "/projects/clipboard/settings.png", alt: "설정 창" },
      { src: "/projects/clipboard/light-dark.png", alt: "라이트·다크 테마" },
    ],
    userSummary:
      "복사한 텍스트·링크·이미지를 자동으로 기록해 두고, 단축키 한 번으로 언제든 다시 꺼내 붙여넣을 수 있는 데스크탑 앱이에요.",
    userBullets: [
      "복사한 내용이 자동으로 쌓여 지난 항목도 다시 사용",
      "Ctrl/Cmd + Shift + V 로 어디서든 목록 열기",
      "자주 쓰는 항목은 고정, 숫자키로 즉시 복사",
      "라이트·다크 테마, macOS·Windows 모두 지원",
    ],
    developerDescription:
      "Electron + React + better-sqlite3 로 만든 클립보드 히스토리 데스크탑 앱입니다. 메인 프로세스가 클립보드 변경을 감지해 로컬 SQLite에 영구 저장하고, 전역 단축키로 토글하는 frameless 오버레이 창에서 지난 항목을 검색·고정·재복사합니다. macOS·Windows를 지원합니다.",
    developerHighlights: [
      "better-sqlite3 로컬 DB에 영구 저장(재시작해도 유지), 보관 기간·개수 자동 정리",
      "전역 단축키 오버레이 창, 포커스 아웃 시 자동 숨김, 숫자키 빠른 복사",
      "고정(즐겨찾기), 라이트·다크·시스템 테마, 트레이 + 로그인 시 자동 실행",
    ],
    architectureIntro:
      "메인 프로세스 · preload · 렌더러 세 계층으로 분리하고, 렌더러는 오직 preload가 contextBridge로 노출한 window.clipboardAPI를 통해서만 메인과 통신합니다. 네이티브 모듈(better-sqlite3·koffi)과 클립보드 접근은 메인 프로세스에만 두어 렌더러를 격리했습니다.",
    architectureImage: {
      src: "/projects/clipboard/architecture.png",
      alt: "ClipBoard 3계층 아키텍처 구성도",
    },
    architectureGroups: [
      {
        title: "Main Process",
        items: [
          "clipboard.ts가 500ms 주기(유휴가 이어지면 1초)의 폴링 루프로 변경분만 저장하고, 이미지 채널을 먼저 확인해 text·link·image로 분류",
          "폴링 tick마다 clipboard-counter.ts가 koffi(FFI)로 OS의 클립보드 변경 카운터를 먼저 확인해, 값이 그대로면 클립보드를 읽지 않고 종료. 카운터를 쓸 수 없는 환경에서는 매 tick 클립보드 내용을 직접 비교",
          "better-sqlite3로 userData/clipboard.db에 영구 저장, created_at 인덱스와 pinned·thumbnail 컬럼 마이그레이션 관리",
          "globalShortcut으로 오버레이 창을 토글하고 electron-store에 단축키·테마·보관 정책을 저장, 트레이 메뉴와 로그인 시 자동 실행 제공",
        ],
      },
      {
        title: "Renderer & IPC",
        items: [
          "React 18 + TailwindCSS로 오버레이 UI 구성, 설정 창은 별도 HTML 없이 #settings 해시로 같은 번들을 분기 렌더링",
          "렌더러 → 메인은 window.clipboardAPI.xxx() → ipcRenderer.invoke → ipcMain.handle, 메인 → 렌더러는 webContents.send를 preload 구독(onNewItem·onCleared·onToast·onThemeChanged)으로 수신",
          "보관 기간(일)·최대 개수 초과 시 오래된 항목부터 자동 정리하되 고정 항목은 제외",
        ],
      },
    ],
    challenges: [
      {
        problem:
          "이미지를 한 번 복사해 두면 아무 조작을 하지 않아도 CPU 점유율이 계속 높게 유지됨. 클립보드가 바뀌었는지 판단하려고 매 tick 이미지를 PNG로 재인코딩해 비교했는데, 1440x1080 기준 한 번에 약 200ms라 500ms 주기의 절반 가까이를 변화가 없는 동안에도 태우고 있었음",
        solution:
          "우선 비교 기준을 PNG 대신 원시 비트맵의 sha1 해시로 바꿔 tick당 200ms → 4ms로 줄이고, 최종적으로는 koffi(FFI)로 OS의 클립보드 변경 카운터(Windows GetClipboardSequenceNumber, macOS NSPasteboard.changeCount)를 직접 읽어 카운터가 그대로면 클립보드를 아예 읽지 않도록 변경(호출당 0.55µs). FFI 로드에 실패해도 해시 비교로 폴백해 동작은 동일",
      },
      {
        problem:
          "이미지가 쌓인 뒤로 이미지 탭 전환이 초 단위로 느려짐. 목록 조회가 수 MB짜리 base64 원본을 그대로 렌더러로 보내, 80px 미리보기를 그리려고 원본 전체를 디코딩하고 있었음",
        solution:
          "캡처 시점에 축소본을 만들어 thumbnail 컬럼에 저장하고 목록은 COALESCE(thumbnail, content)로 썸네일만 전송. 렌더러에 원본이 없어지므로 재복사는 id로 요청해 메인이 DB에서 읽도록 조정",
      },
      {
        problem:
          "설정에서 전역 단축키를 새로 녹화할 때, 사용자가 누른 조합이 globalShortcut에 걸려 오버레이 창만 뜨고 정작 입력이 렌더러까지 도달하지 못함",
        solution:
          "녹화 중에는 settings:setRecording으로 전역 단축키를 잠시 해제해, 입력한 키 조합이 오버레이를 띄우지 않고 렌더러 입력으로 그대로 도달하도록 처리",
      },
    ],
    roadmap: [
      {
        title: "변경 카운터 폴링 → OS 푸시 이벤트 구독",
        reason:
          "카운터 도입으로 유휴 CPU 비용은 거의 사라졌지만, 여전히 500ms~1초 주기로 깨어나 카운터를 확인하는 폴링 구조라 최대 1초의 반영 지연이 남음. Windows의 AddClipboardFormatListener처럼 OS가 변경을 알려주는 푸시 방식으로 바꾸면 지연을 없앨 수 있지만, 숨김 윈도우와 네이티브 메시지 루프가 필요해 복잡도가 올라가는 트레이드오프가 있음",
      },
    ],
    repoUrl: "https://github.com/nemokoala/clipboard-manager",
    liveUrl: "https://github.com/nemokoala/clipboard-manager/releases",
    stack: [
      "Electron 30",
      "React 18",
      "TypeScript",
      "Tailwind CSS 3",
      "better-sqlite3",
      "electron-store",
      "koffi (FFI)",
      "Vite 5",
      "electron-builder",
    ],
  },
  {
    id: "electron-migration",
    // 면접 기간 한정으로 회사명(Joint)을 노출한다. 면접이 끝나면
    // "Electron 이식 검증" 으로 되돌릴 것.
    title: "Joint — Electron 이식 검증",
    tagline: "Next.js + PWA 를 데스크탑으로",
    accent: "emerald",
    category: "desktop",
    hidden: true,
    images: [
      { src: "/projects/electron-migration/chat.png", alt: "채팅 메인 화면" },
      {
        src: "/projects/electron-migration/notification.png",
        alt: "네이티브 알림",
      },
    ],
    userSummary:
      "이미 만든 웹 서비스를 데스크탑 앱으로 옮길 때, 창을 내려둬도 알림이 제대로 오는지를 미리 확인해 본 실험용 앱이에요.",
    userBullets: [
      "창을 최소화해도 새 메시지 알림 도착",
      "알림을 누르면 창이 뜨면서 해당 대화로 이동",
      "트레이에 상주하다가 완전 종료하면 알림도 중단",
    ],
    developerDescription:
      "운영 중인 Next.js 웹 서비스를 Electron 데스크탑 앱으로 이식할 수 있는지, 상주형 알림 흐름(WebSocket 상시 연결 → 네이티브 알림 → 클릭 라우팅)을 중심으로 검증한 프로토타입입니다. 프레임워크·웹 로딩·알림 경로를 왜 그렇게 선택했는지는 결정 기록 문서에 정리했습니다.",
    developerHighlights: [
      "backgroundThrottling: false 로 창을 최소화해도 WebSocket 연결과 타이머가 죽지 않게 유지",
      "close 를 종료가 아닌 트레이 숨김으로 처리하고, app.isQuitting 플래그로 완전 종료와 구분",
      "contextBridge 로만 렌더러 ↔ 메인을 잇고, 렌더러에서 require 직접 사용은 차단",
      "포커스·현재 방·idle 상태를 서버에 보고해 이미 보고 있는 방의 알림은 생략",
    ],
    architectureIntro:
      "서버 · 렌더러 · Electron 쉘 세 조각으로 나누고, 알림을 띄우는 판단은 렌더러가, 실제로 띄우는 일은 메인 프로세스가 맡습니다. 같은 웹 코드가 브라우저에서도 돌아야 하므로 알림 경로를 isElectron 으로 분기했습니다.",
    architectureGroups: [
      {
        title: "Server (Node + ws)",
        items: [
          "userId 당 WebSocket 1연결로 모든 방 이벤트를 한 소켓에 실어 보냄",
          "방·메시지 브로드캐스트와 presence(online/away/idle) 추적, 시연용 봇이 임의 방에 메시지 주입",
        ],
      },
      {
        title: "Renderer (Next.js)",
        items: [
          "WebSocket 수신과 채팅 UI 렌더링, focus·active-room·idle 을 서버에 보고",
          "isElectron 분기로 알림 경로를 나눔 — Electron 이면 preload 브리지, 브라우저면 Notification API(실서비스에서는 FCM 자리)",
        ],
      },
      {
        title: "Electron Shell",
        items: [
          "BrowserWindow 에 backgroundThrottling: false 를 줘 백그라운드에서도 연결 유지",
          "트레이 상주 + 네이티브 Notification, 알림 클릭 시 창 복원과 방 이동까지 IPC 로 연결",
          "Windows 는 setAppUserModelId 가 없으면 알림 표시가 깨져 필수로 설정",
        ],
      },
    ],
    repoUrl: "https://github.com/nemokoala/electron-migration-prototype",
    // 원본은 프로토타입 저장소에 두고 GitHub Pages 로 서빙한다(사본을 두지 않는다)
    liveUrl:
      "https://nemokoala.github.io/electron-migration-prototype/electron-migration.html",
    liveLabel: "결정 기록",
    stack: ["Electron", "Next.js", "TypeScript", "WebSocket (ws)", "Node.js"],
  },
];

/** 숨김 처리되지 않은 프로젝트만. 목록·네비·사이트맵 노출에 사용 */
export const visibleProjects = projects.filter((project) => !project.hidden);

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

/** 카드·OG 이미지로 쓸 대표 스크린샷. 아직 스크린샷이 없는 프로젝트는 undefined. */
export function projectCoverImage(project: Project): ProjectImage | undefined {
  return project.images[0];
}

export function projectBody(project: Project) {
  return {
    lead: project.developerDescription,
    bullets: project.developerHighlights,
  };
}
