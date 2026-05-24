"use client";

import type { ViewMode } from "@/lib/viewMode";

type Props = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  disabled?: boolean;
};

const viewModeOptions: {
  value: ViewMode;
  label: string;
  title: string;
}[] = [
  {
    value: "user",
    label: "서비스 소개",
    title: "누구나 이해하기 쉬운 설명 · ?view=user",
  },
  {
    value: "developer",
    label: "개발자",
    title: "기술 스택·저장소 · ?view=developer",
  },
];

export function ViewModeToggle({ mode, onChange, disabled }: Props) {
  return (
    <div
      className="inline-flex rounded-full border border-zinc-200/70 bg-white/35 p-0.5 text-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label="보기 모드"
    >
      {viewModeOptions.map((option) => {
        const active = mode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={[
              "rounded-full px-3.5 py-1.5 font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              active
                ? "bg-white/80 text-zinc-900 shadow-sm dark:bg-zinc-800/80 dark:text-zinc-100"
                : "text-zinc-500 hover:bg-white/50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100",
              disabled ? "cursor-wait opacity-60" : "hover:cursor-pointer",
            ].join(" ")}
            aria-pressed={active}
            title={option.title}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
