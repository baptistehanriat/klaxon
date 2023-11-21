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
      <body>
        {process.env.NODE_ENV === 'production' ? (
          <section className="flex min-h-screen flex-col bg-gray-50">
            <main className="flex flex-1 justify-center items-center px-10 pt-32 pb-20 sm:pb-32 sm:pt-48 xl:px-36 flex-col">
              <div className="text-3xl font-bold tracking-tight delay-500 sm:text-7xl mb-10">
                Klaxon, l'app qui rapproche
                <br />
                vos collaborateurs
                <br />
                sur la route du bureau !
              </div>
            </main>
          </section>
        ) : (
          children
        )}
      </body>
    </html>
  )
}
