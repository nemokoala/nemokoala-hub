"use client";

import type { ComponentType, ReactNode } from "react";

export type SegmentedToggleOption<T extends string> = {
  value: T;
  label: ReactNode;
  title?: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: "warm" | "violet";
};

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedToggleOption<T>[];
  ariaLabel: string;
  disabled?: boolean;
};

const ACTIVE_TONE = {
  warm: "bg-linear-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-orange-500/30",
  violet:
    "bg-linear-to-r from-violet-600 to-indigo-700 text-white shadow-md shadow-violet-500/35 dark:from-violet-500 dark:to-indigo-600",
} as const;

export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  disabled,
}: Props<T>) {
  return (
    <div
      className="inline-flex rounded-full border border-white/60 bg-white/50 p-1 shadow-lg shadow-violet-500/10 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-black/40"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        const Icon = opt.icon;

        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={[
              "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              active && opt.tone ? ACTIVE_TONE[opt.tone] : "",
              !active
                ? "text-zinc-600 hover:bg-white/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
                : "",
              disabled ? "cursor-wait opacity-60" : "hover:cursor-pointer",
            ].join(" ")}
            aria-pressed={active}
            title={opt.title}
          >
            {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
