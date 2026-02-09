'use client'
import { useEffect, useState } from 'react'
import { NavLayout } from '../nav/nav'
import { MobileNotSupported } from '@/features/mobile-not-supported'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [screenWidth, setScreenWidth] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth)
      const handleResize = () => setScreenWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (screenWidth === null) {
    return null
  }

  return (
    <main className="bg-[#0000ff] flex flex-col min-h-screen">
      {screenWidth > 425 ? <NavLayout>{children}</NavLayout> : <MobileNotSupported />}
    </main>
  )
}
