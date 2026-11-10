'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn, isLoaded, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/sobre-mi', label: 'Sobre mí' },
    { href: '/rodajes', label: 'Rodajes', highlight: true },
  ]

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full bg-black/80 backdrop-blur-xl border-b border-zinc-800/80 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Marca YFILMING con Logo */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group"
        >
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING Logo"
            width={28}
            height={28}
            className="group-hover:scale-105 transition-transform"
            priority
          />
          <span className="text-base sm:text-lg font-black tracking-widest text-white group-hover:text-zinc-300 transition-colors uppercase">
            YFILMING
          </span>
        </Link>

        {/* Menú Desktop Estilo Apple */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all flex items-center gap-1.5 py-1 px-2 rounded-lg ${
                  active
                    ? 'text-white font-semibold bg-zinc-900/60'
                    : 'text-zinc-400 hover:text-white'
                } ${link.highlight && !active ? 'text-zinc-200' : ''}`}
              >
                {link.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Acciones derecha: Auth + Hamburguesa Móvil */}
        <div className="flex items-center gap-3">
          {/* Auth Widget */}
          <div className="flex items-center">
            {!isLoaded ? (
              <div className="w-7 h-7 rounded-full bg-zinc-800 animate-pulse" />
            ) : !isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold py-1.5 px-3.5 rounded-full transition-all cursor-pointer shadow-sm">
                  Iniciar sesión
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden lg:inline text-[11px] text-zinc-400 font-mono">
                  {user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0]}
                </span>
                <UserButton />
              </div>
            )}
          </div>

          {/* Botón Hamburguesa Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-1.5 rounded-lg focus:outline-none transition-colors"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-zinc-800 px-6 py-6 flex flex-col gap-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-zinc-900/60 ${
              pathname === '/' ? 'text-white font-bold' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/proyectos"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-zinc-900/60 ${
              pathname.startsWith('/proyectos') ? 'text-white font-bold' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Proyectos & Filmografía
          </Link>
          <Link
            href="/sobre-mi"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-zinc-900/60 ${
              pathname.startsWith('/sobre-mi') ? 'text-white font-bold' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Sobre Yoel Martínez
          </Link>
          <Link
            href="/rodajes"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 font-semibold py-3 px-4 rounded-xl flex items-center justify-between transition-colors mt-2"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Workspace de Rodajes
            </span>
            <span>→</span>
          </Link>
        </div>
      )}
    </header>
  )
}

