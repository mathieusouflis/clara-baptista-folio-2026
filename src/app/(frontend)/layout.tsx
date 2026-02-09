import React from 'react'
import './styles.css'
import { MainLayout } from '@/components/layout/main'
import { allFonts } from '@/lib/fonts'

export const metadata = {
  title: 'Clara Baptista portfolio',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const fontVariables = allFonts.map((font) => font.variable).join(' ')

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
