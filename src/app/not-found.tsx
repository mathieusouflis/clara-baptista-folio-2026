import './(frontend)/styles.css'
import { NotFoundPage } from '@/components/layout/not-found'
import { allFonts } from '@/lib/fonts'

export default function NotFound() {
  const fontVariables = allFonts.map((font) => font.variable).join(' ')
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <NotFoundPage />
      </body>
    </html>
  )
}
