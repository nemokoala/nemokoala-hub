"use client";

import { SegmentedToggle } from "@/components/SegmentedToggle";
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
  tone: "warm" | "violet";
}[] = [
  {
    value: "user",
    label: "서비스 소개",
    title: "누구나 이해하기 쉬운 설명 · ?view=user",
    tone: "warm",
  },
  {
    value: "developer",
    label: "개발자",
    title: "기술 스택·저장소 · ?view=developer",
    tone: "violet",
  },
];

export function ViewModeToggle({ mode, onChange, disabled }: Props) {
  return (
    <SegmentedToggle
      value={mode}
      onChange={onChange}
      options={viewModeOptions}
      ariaLabel="보기 모드"
      disabled={disabled}
    />
  );
}
