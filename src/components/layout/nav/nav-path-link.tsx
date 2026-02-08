"use client"

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavPathLink({ href, children }: { href: string, children: React.ReactNode }) {
  const path = usePathname()
  return (
    <Link href={href} className={cn("text-white hover:opacity-100 opacity-60 font-bold uppercase text-[16px] duration-300", (path !== "/" ? path === href : path.startsWith(href)) ? "opacity-100" : "")}>
      {children}
    </Link>
  );
}
