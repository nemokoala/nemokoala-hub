"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectAccent } from "@/data/projects";

type Props = {
  src: string;
  alt: string;
  accent: ProjectAccent;
  className?: string;
  /** card: 카드 썸네일(고정 16:9), detail: 상세 갤러리(원본 비율) */
  variant?: "card" | "detail";
};

const accentGradient: Record<ProjectAccent, string> = {
  violet: "from-violet-400/35 via-fuchsia-300/25 to-violet-100/10 dark:from-violet-600/30 dark:via-fuchsia-500/20 dark:to-violet-950/40",
  sky: "from-sky-400/35 via-blue-300/25 to-sky-100/10 dark:from-sky-600/30 dark:via-blue-500/20 dark:to-sky-950/40",
  emerald:
    "from-emerald-400/35 via-teal-300/25 to-emerald-100/10 dark:from-emerald-600/30 dark:via-teal-500/20 dark:to-emerald-950/40",
  rose: "from-rose-400/35 via-orange-300/25 to-rose-100/10 dark:from-rose-600/30 dark:via-orange-500/20 dark:to-rose-950/40",
};

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
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

function ScreenshotPlaceholder({
  src,
  alt,
  accent,
  className = "",
  variant = "detail",
}: Props) {
  return (
    <div
      className={[
        "relative flex w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-900/80",
        variant === "card" ? "aspect-video" : "aspect-video min-h-48",
        className,
      ].join(" ")}
      role="img"
      aria-label={alt}
    >
      <div
        className={[
          "absolute inset-0 bg-linear-to-br",
          accentGradient[accent],
        ].join(" ")}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="text-zinc-400 dark:text-zinc-500" />
        <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
          {alt}
        </span>
        <span className="max-w-full truncate font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          {src}
        </span>
      </div>
    </div>
  );
}

export function ProjectScreenshot({
  src,
  alt,
  accent,
  className = "",
  variant = "detail",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <ScreenshotPlaceholder
        src={src}
        alt={alt}
        accent={accent}
        className={className}
        variant={variant}
      />
    );
  }

  if (variant === "card") {
    return (
      <div
        className={[
          "relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/80",
          className,
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 50vw"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/80",
        className,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="h-auto w-full"
        style={{ width: "100%", height: "auto" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
