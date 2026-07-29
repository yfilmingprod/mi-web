import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './Header'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'YFILMING | Cinematography & Production',
  description: 'Historias que desafían la gravedad.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'YFILMING',
  },
  icons: {
    icon: '/logo-yfilming.png',
    apple: '/logo-yfilming.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" className="scroll-smooth">
        <body className="bg-black text-white antialiased min-h-screen">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}