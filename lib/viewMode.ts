export type ViewMode = "user" | "developer";

export const VIEW_MODE_STORAGE_KEY = "nemokoala_view_mode";

/** URL 쿼리: `?view=user` | `?view=developer` */
export const VIEW_MODE_QUERY_KEY = "view";

export function isViewMode(value: string | null): value is ViewMode {
  return value === "user" || value === "developer";
}
