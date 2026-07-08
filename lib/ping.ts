"use client";

/** 클릭 알림에 담을 정보 */
export type PingInfo = {
  /** 어떤 프로젝트 */
  project: string;
  /** 어떤 버튼 (예: "사이트 열기", "GitHub") */
  action: string;
};

/**
 * 버튼 클릭을 서버(/api/ping)로 알린다. 실제 사람의 상호작용 신호이므로 봇 대부분이
 * 걸러진다. 세션당 (프로젝트+버튼) 조합별 1회만 전송해 연타 스팸을 막고,
 * 페이지 이동에 끊기지 않도록 sendBeacon(폴백: keepalive fetch)을 사용한다.
 */
export function firePing(info: PingInfo): void {
  if (typeof window === "undefined") return;

  const dedupeKey = `ping:${info.project}:${info.action}`;
  try {
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");
  } catch {
    /* sessionStorage 불가 환경이면 중복 방지 없이 진행 */
  }

  const payload = JSON.stringify({
    ...info,
    // 최초 유입 출처(현재 문서를 연 referrer). 내부/직접 방문이면 빈 값
    ref: document.referrer,
    path: window.location.pathname,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/ping",
        new Blob([payload], { type: "application/json" }),
      );
      return;
    }
  } catch {
    /* sendBeacon 실패 시 fetch 폴백 */
  }

  try {
    void fetch("/api/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    /* 알림 실패가 클릭 UX를 막지 않도록 조용히 무시 */
  }
}
