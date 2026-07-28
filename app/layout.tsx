import { ClerkProvider } from '@clerk/nextjs'
import Header from './Header'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" className="scroll-smooth">
        <body className="bg-slate-900 text-slate-100 antialiased min-h-screen pt-16">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}