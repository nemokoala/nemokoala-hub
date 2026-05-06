import { Suspense } from "react";
import { HomeView } from "@/components/HomeView";

function HomeFallback() {
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center gap-4 px-6">
      <div className="h-10 w-10 animate-pulse rounded-full bg-linear-to-br from-violet-400 to-sky-400 opacity-80" />
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        불러오는 중…
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeView />
    </Suspense>
  );
}
