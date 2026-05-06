"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  VIEW_MODE_QUERY_KEY,
  VIEW_MODE_STORAGE_KEY,
  isViewMode,
  type ViewMode,
} from "@/lib/viewMode";

const defaultMode: ViewMode = "user";

function queryStringWithView(
  current: URLSearchParams,
  mode: ViewMode,
): string {
  const next = new URLSearchParams(current.toString());
  next.set(VIEW_MODE_QUERY_KEY, mode);
  const s = next.toString();
  return s ? `?${s}` : "";
}

export function useViewMode() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mode, setModeState] = useState<ViewMode>(defaultMode);
  const [ready, setReady] = useState(false);
  const appliedInitialWithoutUrl = useRef(false);

  useEffect(() => {
    const fromUrl = searchParams.get(VIEW_MODE_QUERY_KEY);
    if (isViewMode(fromUrl)) {
      setModeState(fromUrl);
      try {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, fromUrl);
      } catch {
        /* ignore */
      }
      setReady(true);
      return;
    }

    if (!appliedInitialWithoutUrl.current) {
      appliedInitialWithoutUrl.current = true;
      try {
        const raw = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
        if (isViewMode(raw)) {
          setModeState(raw);
        }
      } catch {
        /* ignore */
      }
    }
    setReady(true);
  }, [searchParams]);

  const setMode = useCallback(
    (next: ViewMode) => {
      setModeState(next);
      try {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      const qs = queryStringWithView(searchParams, next);
      router.replace(`${pathname}${qs}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { mode, setMode, ready };
}
