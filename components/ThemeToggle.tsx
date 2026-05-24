"use client";

import { SegmentedToggle } from "@/components/SegmentedToggle";
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
    label: "라이트",
    icon: SunIcon,
    tone: "warm" as const,
    title: "라이트 모드",
  },
  {
    value: "dark" as const,
    label: "다크",
    icon: MoonIcon,
    tone: "violet" as const,
    title: "다크 모드",
  },
];

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <SegmentedToggle
      value={theme}
      onChange={setTheme}
      options={themeOptions}
      ariaLabel="테마"
      disabled={!mounted}
    />
  );
}
