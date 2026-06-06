"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  VIEW_MODE_QUERY_KEY,
  VIEW_MODE_STORAGE_KEY,
  isViewMode,
  type ViewMode,
} from "@/lib/viewMode";

const defaultMode: ViewMode = "user";
const emptySubscribe = () => () => {};

function readStoredMode(): ViewMode {
  try {
    const raw = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return isViewMode(raw) ? raw : defaultMode;
  } catch {
    return defaultMode;
  }
}

function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function useStoredViewMode() {
  return useSyncExternalStore(emptySubscribe, readStoredMode, () => defaultMode);
}

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
  const mounted = useMounted();
  const storedMode = useStoredViewMode();

  const fromUrl = searchParams.get(VIEW_MODE_QUERY_KEY);
  const mode = isViewMode(fromUrl) ? fromUrl : storedMode;

  useEffect(() => {
    if (isViewMode(fromUrl)) {
      try {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, fromUrl);
      } catch {
        /* ignore */
      }
    }
  }, [fromUrl]);

  useEffect(() => {
    if (!mounted || isViewMode(fromUrl)) return;

    const stored = readStoredMode();
    if (stored !== defaultMode) {
      const qs = queryStringWithView(searchParams, stored);
      router.replace(`${pathname}${qs}`, { scroll: false });
    }
  }, [mounted, fromUrl, pathname, router, searchParams]);

  const setMode = useCallback(
    (next: ViewMode) => {
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

  return { mode, setMode, ready: mounted };
}
