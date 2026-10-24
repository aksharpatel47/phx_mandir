export function TempleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 55h48M12 51h40M16 47V29h32v18M13 29h38L32 12 13 29ZM22 47V33h20v14M28 47V36h8v11M32 12V4l9 3-9 3M9 47V34h7M48 34h7v13M6 34l6-7 4 5M48 32l4-5 6 7M18 22h28M24 17h16" />
      <path d="M4 59h56M26 29v-5h12v5" />
    </svg>
  );
}
