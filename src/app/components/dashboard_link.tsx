import Link from "next/link";

interface iDashboardLinkProps {
  name: string;
  children?: React.ReactNode;
  href: string;
  currentUrl: string;
}

export function DashboardLink(data: iDashboardLinkProps) {
  const isActive = data.currentUrl === data.href;
  const isActiveClass = isActive ? "bg-slate-200" : "bg-white";
  return (
    <Link
      href={data.href}
      className={`text-black flex-1 ${isActiveClass} flex h-full w-full items-center justify-center text-black`}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        {data.children}
        {data.name}
      </div>
    </Link>
  );
}
