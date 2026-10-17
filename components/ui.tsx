/** 화면 전체에서 같은 모양을 쓰는 버튼·아이콘 모음 */

const buttonBase =
  "inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const buttonClass = {
  primary: `${buttonBase} bg-fg text-bg hover:opacity-85`,
  secondary: `${buttonBase} border border-line text-fg hover:bg-surface`,
};

type IconProps = { className?: string };

function Icon({
  className = "size-4",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Icon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Icon>
  );
}
