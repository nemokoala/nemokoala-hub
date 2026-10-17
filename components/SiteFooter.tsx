export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>박재연 · Frontend Developer</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a
            href="mailto:fdxguy2@gmail.com"
            className="transition hover:text-fg"
          >
            fdxguy2@gmail.com
          </a>
          <a
            href="https://github.com/nemokoala"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-fg"
          >
            GitHub @nemokoala
          </a>
        </div>
      </div>
    </footer>
  );
}
