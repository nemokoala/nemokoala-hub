"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

const themeOptions = [
  {
    value: "light" as const,
    icon: SunIcon,
    title: "라이트 모드",
    activeClass:
      "bg-amber-400 text-white shadow-md shadow-amber-500/25 dark:bg-amber-500",
  },
  {
    value: "dark" as const,
    icon: MoonIcon,
    title: "다크 모드",
    activeClass:
      "bg-violet-600 text-white shadow-md shadow-violet-500/25 dark:bg-violet-500",
  },
];

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      className="inline-flex gap-1.5 rounded-full border border-zinc-200/70 bg-white/35 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label="테마"
    >
      {themeOptions.map((option) => {
        const active = theme === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            disabled={!mounted}
            onClick={() => setTheme(option.value)}
            className={[
              "inline-flex size-9 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              active
                ? option.activeClass
                : "text-zinc-500 hover:bg-white/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100",
              !mounted ? "cursor-wait opacity-60" : "hover:cursor-pointer",
            ].join(" ")}
            aria-pressed={active}
            aria-label={option.title}
            title={option.title}
          >
            <Icon className="size-4.5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
