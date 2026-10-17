"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui";
import type { ProjectImage } from "@/data/projects";

type Props = {
  images: ProjectImage[];
  /** 스크린리더용 캐러셀 이름 (예: "ImageGen 스크린샷") */
  label: string;
};

const controlClass =
  "inline-flex size-9 items-center justify-center rounded-lg border border-line text-fg transition hover:cursor-pointer hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent";

/** 한 장씩 좌우로 넘기는 스크린샷 갤러리. 모바일은 스와이프, 데스크톱은 버튼·방향키 */
export function ScreenshotCarousel({ images, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // 부드러운 스크롤 도중에는 index 가 아직 이전 값이라, 버튼으로 향하는 목표를 따로 기억한다
  const targetRef = useRef<number | null>(null);
  const last = images.length - 1;

  if (images.length === 0) return null;

  if (images.length === 1) {
    const [image] = images;
    return (
      <figure>
        <div className="overflow-hidden rounded-xl border border-line">
          <ProjectScreenshot src={image.src} alt={image.alt} variant="detail" />
        </div>
        <figcaption className="mt-3 text-sm text-muted">{image.alt}</figcaption>
      </figure>
    );
  }

  // 슬라이드가 트랙 너비와 같아서 scrollLeft / 너비 로 현재 위치를 구할 수 있다
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.min(
      last,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
    );
    setIndex(next);
    if (
      targetRef.current === next &&
      Math.abs(track.scrollLeft - next * track.clientWidth) < 2
    ) {
      targetRef.current = null;
    }
  }

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(last, Math.max(0, next));
    if (target === index && targetRef.current === null) return;
    targetRef.current = target;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function step(delta: number) {
    goTo((targetRef.current ?? index) + delta);
  }

  // 직접 스와이프·휠로 움직이기 시작하면 버튼 목표는 버린다
  function cancelTarget() {
    targetRef.current = null;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onTouchStart={cancelTarget}
        onWheel={cancelTarget}
        tabIndex={0}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            className="w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${images.length}: ${image.alt}`}
          >
            <ProjectScreenshot
              src={image.src}
              alt={image.alt}
              variant="detail"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="min-w-0 text-sm text-muted" aria-live="polite">
          <span className="mr-3 font-mono text-subtle">
            {index + 1} / {images.length}
          </span>
          {images[index].alt}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={index === 0}
            className={controlClass}
            aria-label="이전 스크린샷"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={index === last}
            className={controlClass}
            aria-label="다음 스크린샷"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
