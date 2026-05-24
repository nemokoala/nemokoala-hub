"use client";

import type { ViewMode } from "@/lib/viewMode";

type Props = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  disabled?: boolean;
};

const options: { value: ViewMode; label: string; hint: string }[] = [
  {
    value: "user",
    label: "서비스 소개",
    hint: "누구나 이해하기 쉬운 설명 · ?view=user",
  },
  {
    value: "developer",
    label: "개발자",
    hint: "기술 스택·저장소 · ?view=developer",
  },
];

export function ViewModeToggle({ mode, onChange, disabled }: Props) {
  return (
    <div
      className="inline-flex rounded-full border border-white/60 bg-white/50 p-1 shadow-lg shadow-violet-500/10 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-black/40"
      role="group"
      aria-label="보기 모드"
    >
      {options.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={[
              "hover:cursor-pointer relative rounded-full px-4 py-2 text-sm font-semibold transition whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              active && opt.value === "user"
                ? "bg-linear-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/30"
                : "",
              active && opt.value === "developer"
                ? "bg-linear-to-r from-violet-600 to-indigo-700 text-white shadow-md shadow-violet-500/35 dark:from-violet-500 dark:to-indigo-600"
                : "",
              !active
                ? "text-zinc-600 hover:bg-white/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
                : "",
              disabled ? "cursor-wait opacity-60" : "",
            ].join(" ")}
            title={opt.hint}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
