import type { Metadata } from 'next'
import './globals.css'
import { env } from 'process'

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
      {env.NODE_ENV === 'test' ? (
        <div>Work in Progress</div>
      ) : (
        <body>{children}</body>
      )}
    </html>
  )
}
