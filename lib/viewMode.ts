export type ViewMode = "user" | "developer";

export const VIEW_MODE_STORAGE_KEY = "nemokoala_view_mode";

/** URL 쿼리: `?view=user` | `?view=developer` */
export const VIEW_MODE_QUERY_KEY = "view";

export function isViewMode(value: string | null): value is ViewMode {
  return value === "user" || value === "developer";
}

/** 서버에서 `searchParams.view` 값을 ViewMode로 변환 (없으면 기본값 user). */
export function resolveViewMode(
  value: string | string[] | undefined,
): ViewMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw != null && isViewMode(raw) ? raw : "user";
}
