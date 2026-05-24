export default function ServiceDetailLoading() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:px-8">
      <div className="h-4 w-40 animate-pulse rounded-full bg-violet-200/80 dark:bg-violet-900/50" />
      <div className="space-y-4">
        <div className="h-14 w-64 animate-pulse rounded-2xl bg-white/70 dark:bg-zinc-900/70" />
        <div className="h-6 w-full max-w-2xl animate-pulse rounded-full bg-white/60 dark:bg-zinc-900/60" />
        <div className="h-6 w-full max-w-xl animate-pulse rounded-full bg-white/60 dark:bg-zinc-900/60" />
      </div>
    </main>
  );
}
