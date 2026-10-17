export default function ServiceDetailLoading() {
  return (
    <main className="mx-auto flex h-dvh w-full max-w-5xl flex-1 flex-col px-5 pt-10 sm:px-8 sm:pt-14">
      <div className="h-4 w-24 animate-pulse rounded bg-surface" />
      <div className="mt-12 space-y-4">
        <div className="h-4 w-20 animate-pulse rounded bg-surface" />
        <div className="h-10 w-64 animate-pulse rounded-lg bg-surface" />
        <div className="h-5 w-full max-w-md animate-pulse rounded bg-surface" />
      </div>
      <div className="mt-14 aspect-video w-full animate-pulse rounded-2xl bg-surface" />
    </main>
  );
}
