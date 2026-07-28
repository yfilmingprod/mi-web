'use client'

import Link from 'next/link'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn, isLoaded } = useUser()

  return (
    <header className="w-full bg-black/70 backdrop-blur-xl border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Marca YFILMING */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-widest text-white group-hover:text-gray-300 transition-colors uppercase">
            YFILMING
          </span>
        </Link>

        {/* Menú Estilo Apple */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <Link href="#proyectos" className="hover:text-white transition-colors">
            Proyectos
          </Link>
          <Link href="#sobre-mi" className="hover:text-white transition-colors">
            Sobre mí
          </Link>
          <Link href="/rodajes" className="text-white hover:text-zinc-300 transition-colors flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Rodajes
          </Link>
        </nav>

        {/* Login / Perfil */}
        <div>
          {!isLoaded ? (
            <div className="w-7 h-7 rounded-full bg-zinc-800 animate-pulse" />
          ) : !isSignedIn ? (
            <SignInButton mode="modal">
              <button className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold py-1.5 px-4 rounded-full transition-all">
                Iniciar sesión
              </button>
            </SignInButton>
          ) : (
            <UserButton showName />
          )}
        </div>
      </div>
    </header>
  )
}