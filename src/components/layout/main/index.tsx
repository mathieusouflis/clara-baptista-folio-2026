"use client"
import { useEffect, useState } from "react";
import { NavLayout } from "../nav/nav";
import { MobileNotSupported } from "@/features/mobile-not-supported";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="bg-[#0000ff] flex flex-col min-h-screen">
      {screenWidth > 425 ?
      <NavLayout>
      {children}
      </NavLayout>
      : <MobileNotSupported />}
    </main>
  );
}
