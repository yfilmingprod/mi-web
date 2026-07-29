'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      
      {/* HEADER ADAPTATIVO CON MENÚ MÓVIL */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING Logo"
            width={36}
            height={36}
            className="hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            YFILMING
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="#proyectos" className="hover:text-white transition">Proyectos</Link>
          <Link href="#sobre-mi" className="hover:text-white transition">Sobre mí</Link>
          <Link href="/rodajes" className="hover:text-white transition flex items-center gap-2">
            Rodajes 🎬
          </Link>
        </nav>

        {/* Botón Menú Hamburguesa (Solo Móvil) */}
        <button 
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-zinc-300 hover:text-white p-2 rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuAbierto ? (
            <span className="text-2xl font-light">✕</span>
          ) : (
            <span className="text-2xl font-light">☰</span>
          )}
        </button>

        {/* Desplegable Móvil */}
        {menuAbierto && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col gap-5 md:hidden text-center text-lg font-medium">
            <Link 
              href="#proyectos" 
              onClick={() => setMenuAbierto(false)} 
              className="text-zinc-300 hover:text-white py-2"
            >
              Proyectos
            </Link>
            <Link 
              href="#sobre-mi" 
              onClick={() => setMenuAbierto(false)} 
              className="text-zinc-300 hover:text-white py-2"
            >
              Sobre mí
            </Link>
            <Link 
              href="/rodajes" 
              onClick={() => setMenuAbierto(false)} 
              className="bg-white text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2"
            >
              Acceso a Rodajes 🎬
            </Link>
          </div>
        )}
      </header>

      {/* 1. HERO PRINCIPAL DE PORTADA CON LOGO INtegrado */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Glow cinematográfico de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Logo sutil sobre el título */}
        <Image 
          src="/logo-yfilming.png"
          alt="YFILMING UFO"
          width={80} // Un poco más grande para el hero
          height={80}
          className="mb-8 opacity-70"
        />

        <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
          CINEMATOGRAPHY & PRODUCTION
        </span>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 max-w-5xl leading-[1.02]">
          Historias que <br />
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
            desafían la gravedad.
          </span>
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-12 font-normal leading-relaxed">
          Dirección, producción y narrativa visual. Proyectos cinematográficos construidos con precisión técnica y mirada de autor, desde Murcia al resto del universo.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#proyectos"
            className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-200 transition-all text-sm shadow-xl"
          >
            Explorar Filmografía
          </a>
          <Link
            href="/rodajes"
            className="w-full sm:w-auto border border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-300 font-semibold px-8 py-3.5 rounded-full transition-all text-sm flex items-center justify-center gap-2"
          >
            Acceso a Rodajes 🛸
          </Link>
        </div>
      </section>

      {/* 2. SECCIÓN DE PROYECTOS DESTACADOS - TARJETAS GIGANTES ESTILO APPLE */}
      <section id="proyectos" className="max-w-7xl mx-auto px-6 py-20 space-y-16 border-t border-zinc-900">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2 block">
            FILMOGRAFÍA SELECCIONADA
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Proyectos en Pantalla Grande.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Ficción, thriller y westerns con fuerte identidad estética y flujo de trabajo optimizado.
          </p>
        </div>

        {/* TARJETA GIGANTE 1: PHIL WEASLEY (WESTERN TABERNAS) */}
        <Link 
          href="/proyectos/phil-weasley"
          className="group relative bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-500 transition-all duration-500 min-h-[520px] flex flex-col justify-between p-8 sm:p-14 block"
        >
          {/* Foto de portada de fondo con degradado elegante */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/phil-weasley/portada.jpg" 
              alt="Phil Weasley Western" 
              fill 
              className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          <div className="max-w-2xl z-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                Western · Tabernas
              </span>
              <span className="text-xs font-semibold text-zinc-400">Posproducción</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
              Phil Weasley
            </h3>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              Rodado en los icónicos desiertos de Almería. Haz clic para explorar la visión de dirección, la historia y la experiencia visual con fotogramas del rodaje.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-zinc-400 z-10 relative">
            <div className="flex gap-6">
              <span><strong className="text-white">Localización:</strong> Tabernas (Almería)</span>
              <span className="hidden sm:inline"><strong className="text-white">Flujo Técnico:</strong> Cámara & Color Grading</span>
            </div>
            <span className="text-white group-hover:underline">Explorar proyecto completo →</span>
          </div>
        </Link>

        {/* TARJETA GIGANTE 2: AMOR PROCESADO (THRILLER) */}
        <div className="group relative bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-500 transition-all duration-500 min-h-[520px] flex flex-col justify-between p-8 sm:p-14">
          <div className="max-w-2xl z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                Drama & Thriller Psicológico
              </span>
              <span className="text-xs font-semibold text-zinc-500">En Desarrollo</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
              Amor Procesado
            </h3>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              Una inmersión psicológica donde el encuadre y la narrativa visual claustrofóbica exploran la percepción y los límites de la mente humana.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-zinc-400">
            <div className="flex gap-6">
              <span><strong className="text-white">Rol:</strong> Dirección & Guion</span>
              <span className="hidden sm:inline"><strong className="text-white">Estética:</strong> Cámara en mano / Iluminación Expresiva</span>
            </div>
            <span className="text-white group-hover:underline">En fase de preproducción →</span>
          </div>
        </div>

        {/* GRID SECUNDARIO DE DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Frontera */}
          <div className="group bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[400px] hover:border-zinc-600 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Western Minimalista</span>
                <span className="text-xs font-semibold text-zinc-600">2025</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">Frontera</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Western de ambientación cruda. Gestión integral del departamento de producción y asistencia de dirección en un entorno natural exigente.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-400">
              <span>Dir. Producción & Ayudante Dir.</span>
              <span className="text-white font-semibold group-hover:underline">Ver ficha →</span>
            </div>
          </div>

          {/* Parpadear / Fototaxia */}
          <div className="group bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[400px] hover:border-zinc-600 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">Ficción / Fotografía</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">Parpadear & Fototaxia</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Proyectos enfocados en la dirección de fotografía, composición del encuadre y dinámicas de iluminación natural y nocturna.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-400">
              <span>Cámara & Producción</span>
              <span className="text-white font-semibold group-hover:underline">Ver proyectos →</span>
            </div>
          </div>

        </div>

      </section>

      {/* 3. SECCIÓN SOBRE MÍ CON ENLACE DIRECTO A IMDB */}
      <section id="sobre-mi" className="bg-zinc-950 py-28 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-zinc-500 mb-4 block">
            COMUNICACIÓN AUDIOVISUAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Yoel Martínez Pérez
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-8 font-normal">
            Comunicador audiovisual, director y productor. Especializado en la optimización de flujos técnicos de trabajo, dirección de producción y narrativa cinematográfica realista.
          </p>

          <a
            href="https://www.imdb.com/es-es/name/nm17141076/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400 font-semibold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all"
          >
            <span>Ver perfil en IMDb</span>
            <span>↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER CON LOGO */}
      <footer className="py-16 border-t border-zinc-900 bg-zinc-950 text-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING UFO Footer"
            width={30}
            height={30}
            className="opacity-50"
          />
          <p className="text-xs text-zinc-600">
            © YFILMING. Todos los derechos reservados. <br />
            Historias que desafían la gravedad.
          </p>
        </div>
      </footer>
    </div>
  )
}