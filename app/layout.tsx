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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#eab308',
          colorBackground: '#09090b',
          colorInput: '#18181b',
          colorInputForeground: '#ffffff',
          colorForeground: '#ffffff',
          colorMutedForeground: '#a1a1aa',
          colorNeutral: '#27272a',
          borderRadius: '0.75rem',
        },
        elements: {
          card: 'bg-zinc-950 border border-zinc-800 shadow-2xl',
          headerTitle: 'text-white font-bold',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800',
          formButtonPrimary: 'bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-md',
          footerActionLink: 'text-yellow-400 hover:text-yellow-300',
        },
      }}
    >
      <html lang="es" className="scroll-smooth">
        <body className="bg-black text-white antialiased min-h-screen">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}