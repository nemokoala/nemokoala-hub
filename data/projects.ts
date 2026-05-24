import type { ViewMode } from "@/lib/viewMode";

export type ProjectAccent = "violet" | "sky" | "emerald" | "rose";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  accent: ProjectAccent;
  /** 일반 방문자용 한 줄 요약 */
  userSummary: string;
  /** 일반 방문자용 “이렇게 쓰면 돼요” 불릿 */
  userBullets: string[];
  /** 개발자·포트폴리오용 상세 설명 */
  developerDescription: string;
  developerHighlights: string[];
  repoUrl: string;
  liveUrl: string;
  stack: string[];
};

/** 각 저장소 README 기준으로 정리한 목록 */
export const projects: Project[] = [
  {
    id: "imagen",
    title: "ImageGen",
    tagline: "AI 이미지 생성·공유",
    accent: "violet",
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
    userSummary:
      "받을 사람의 은행과 계좌만 적으면, 토스 앱에서 바로 송금 화면이 열리는 링크나 QR을 만들어 드려요.",
    userBullets: [
      "은행 고르고 계좌번호 입력",
      "금액은 넣어도 되고 비워도 됨",
      "QR이나 링크로 상대에게 보내기",
      "링크 복사·QR 저장 한 번에",
    ],
    developerDescription:
      "토스 앱으로 바로 송금할 수 있는 딥링크 생성기입니다. 은행·계좌·금액을 입력하면 토스 앱에서 열 수 있는 링크와 QR 코드를 만들고, 링크 복사·QR 저장·앱 열기를 지원합니다.",
    developerHighlights: [
      "주요 은행 선택 및 커스텀 은행명",
      "금액 선택 입력, 딥링크·QR 자동 생성",
      "입력 정보 로컬 저장(선택)",
      "Pretendard, 반응형 UI",
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
    id: "quickdrop",
    title: "QuickDrop",
    tagline: "가입 없이 파일·메모 공유",
    accent: "emerald",
    userSummary:
      "회원가입 없이 파일이나 긴 메모를 올리면, 짧은 코드와 링크로 받는 사람이 바로 받을 수 있어요. (서비스 표기명: NemoDrop)",
    userBullets: [
      "여러 파일을 한 번에 올리기",
      "긴 텍스트만 따로 공유하기",
      "만료 시간을 정해 자동으로 정리",
      "코드·링크·QR로 친구에게 전달",
    ],
    developerDescription:
      "README의 서비스명은 NemoDrop입니다. 로그인 없이 파일이나 텍스트를 빠르게 공유하는 임시 공유 서비스로, 6자리 코드·링크·QR로 받는 사람이 내려받거나 복사할 수 있습니다.",
    developerHighlights: [
      "다중 파일 합산 최대 5GB 업로드",
      "짧은 메모부터 큰 텍스트까지 공유",
      "만료 시간·업로드 이력(브라우저)",
      "한국어·영어 UI, ZIP 다운로드",
    ],
    repoUrl: "https://github.com/nemokoala/quickdrop",
    liveUrl: "https://quickdrop.nemokoala.com",
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
    id: "social-jukebox",
    title: "Social Jukebox",
    tagline: "같이 듣는 음악",
    accent: "rose",
    userSummary:
      "같은 자리에 모인 사람들이 함께 음악을 맞춰 들을 수 있게 도와주는 서비스예요.",
    userBullets: [
      "모임·작은 행사에서 함께 플레이리스트 느낌으로 이용",
      "웹으로 접속해 참여",
    ],
    developerDescription:
      "같은 공간에 있는 사람들과 함께 음악을 즐길 수 있는 서비스입니다.",
    developerHighlights: [
      "같은 공간에 있는 사람들과 함께 음악을 즐길 수 있는 서비스",
      "저장소에 Supabase 초기화용 SQL 등 구성 파일 포함",
    ],
    repoUrl: "https://github.com/nemokoala/social-jukebox",
    liveUrl: "https://juke-room.vercel.app",
    stack: ["Next.js", "TypeScript", "Supabase(SQL 스크립트 포함)"],
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function projectBodyForMode(project: Project, mode: ViewMode) {
  if (mode === "user") {
    return {
      lead: project.userSummary,
      bullets: project.userBullets,
    };
  }
  return {
    lead: project.developerDescription,
    bullets: project.developerHighlights,
  };
}
