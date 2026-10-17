"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /**
   * card: 카드 썸네일(16:9), detail: 상세 갤러리(16:9), diagram: 다이어그램(원본 비율),
   * cover: 부모 크기를 가득 채우고 위쪽 기준으로 자름(커버 프레임 안)
   */
  variant?: "card" | "detail" | "diagram" | "cover";
  /** next/image sizes 를 직접 지정할 때 */
  sizes?: string;
  /** 첫 화면에 보이는 대표 이미지는 지연 로딩하지 않는다 */
  eager?: boolean;
};

/** 실제 렌더 너비에 맞춰 srcset 선택 — 작게 잡으면 고배율·세로 모니터에서 흐려짐 */
const CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, 28rem";
const DETAIL_IMAGE_SIZES = "(max-width: 1024px) 100vw, 60rem";

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function ScreenshotPlaceholder({ alt, className = "" }: Props) {
  return (
    <div
      className={[
        "flex aspect-video w-full flex-col items-center justify-center gap-2 bg-surface px-4 text-center",
        className,
      ].join(" ")}
      role="img"
      aria-label={alt}
    >
      <ImageIcon className="text-subtle" />
      <span className="text-sm text-muted">{alt}</span>
    </div>
  );
}

export function ProjectScreenshot({
  src,
  alt,
  className = "",
  variant = "detail",
  sizes,
  eager = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <ScreenshotPlaceholder src={src} alt={alt} className={className} />;
  }

  if (variant === "cover") {
    return (
      <div className={["relative h-full w-full", className].join(" ")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? DETAIL_IMAGE_SIZES}
          quality={90}
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  if (variant === "diagram") {
    return (
      <div className={["w-full bg-surface", className].join(" ")}>
        {/* width/height 0 + sizes로 원본 비율 유지(세로로 긴 다이어그램 대응) */}
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={DETAIL_IMAGE_SIZES}
          quality={95}
          className="h-auto w-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "relative aspect-video w-full bg-surface",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={
          sizes ?? (variant === "card" ? CARD_IMAGE_SIZES : DETAIL_IMAGE_SIZES)
        }
        quality={90}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
