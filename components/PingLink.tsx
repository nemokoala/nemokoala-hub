"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { firePing, type PingInfo } from "@/lib/ping";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** 클릭 시 디스코드로 보낼 정보 (native <a>의 ping 속성과 충돌 피해 명명) */
  pingInfo: PingInfo;
};

/**
 * 일반 외부 링크(<a>)와 동일하게 동작하되, 클릭 시 firePing으로 방문 알림을 보낸다.
 * 기존 <a>의 className·href·target 등은 그대로 전달한다.
 */
export function PingLink({ pingInfo, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        firePing(pingInfo);
        onClick?.(e);
      }}
    />
  );
}
