import React from 'react'
import './styles.css'
import { MainLayout } from '@/components/layout/main'
import { allFonts } from '@/lib/fonts'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Combine all font variables for the HTML element
  const fontVariables = allFonts.map(font => font.variable).join(' ')

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
