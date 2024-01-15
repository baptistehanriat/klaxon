import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klaxon - Carpooling with colleagues made easy',
  description: 'Easily connect with colleagues to carpool to work together!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === 'production' ? (
        <div>Work in progress</div>
      ) : (
        <body>{children}</body>
      )}
    </html>
  )
}
