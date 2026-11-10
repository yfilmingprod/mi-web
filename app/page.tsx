import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'YFILMING | Cinematography & Production por Yoel Martínez',
  description: 'Estudio cinematográfico y productora audiovisual fundada por Yoel Martínez Pérez. Dirección, dirección de producción y narrativa visual de ficción, thrillers y westerns.',
  openGraph: {
    title: 'YFILMING | Cinematography & Production',
    description: 'Historias que desafían la gravedad. Dirección y producción audiovisual de ficción.',
    url: 'https://yfilming.com',
    siteName: 'YFILMING',
    images: ['/logo-yfilming.png'],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      
      {/* 1. HERO PRINCIPAL DE PORTADA CON LOGO INTEGRADO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Glow cinematográfico de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Logo sutil sobre el título */}
        <Image 
          src="/logo-yfilming.png"
          alt="YFILMING UFO"
          width={80}
          height={80}
          className="mb-8 opacity-70 hover:opacity-100 transition-opacity"
          priority
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

        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-10 font-normal leading-relaxed">
          Dirección, producción y narrativa visual. Proyectos cinematográficos construidos con rigor técnico y mirada de autor, desde Murcia al resto del universo.
        </p>

        {/* Botones de acción directos a las páginas independientes */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/proyectos"
            className="w-full sm:w-auto bg-white text-black font-bold px-8 py-3.5 rounded-full hover:bg-zinc-200 transition-all text-xs uppercase tracking-wider shadow-xl"
          >
            Explorar Filmografía
          </Link>
          <Link
            href="/sobre-mi"
            className="w-full sm:w-auto border border-zinc-800 hover:border-zinc-600 bg-zinc-950 text-zinc-300 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider"
          >
            Sobre Yoel Martínez
          </Link>
          <Link
            href="/rodajes"
            className="w-full sm:w-auto border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-semibold px-6 py-3.5 rounded-full transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Workspace</span>
            <span>🎬</span>
          </Link>
        </div>

        {/* Cinta de sellos de calidad y métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-zinc-900/80 max-w-4xl w-full text-center text-xs">
          <div>
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Localización Icónica</span>
            <span className="text-white font-bold mt-1 block">Desierto de Tabernas</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Selección Oficial</span>
            <span className="text-yellow-400 font-bold mt-1 block">FICAL 2026</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Formato de Imagen</span>
            <span className="text-white font-bold mt-1 block">2.39:1 Panavision</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Flujo de Color</span>
            <span className="text-white font-bold mt-1 block">DaVinci Resolve Log</span>
          </div>
        </div>
      </section>

      {/* 2. SPOTLIGHT DESTACADO DE FILMOGRAFÍA */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2 block">
              OBRAS DESTACADAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Cine en Pantalla Grande.
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition flex items-center gap-1.5"
          >
            <span>Ver filmografía completa (5 producciones)</span>
            <span>→</span>
          </Link>
        </div>

        {/* Tarjeta Destacada 1: Phil Weasley */}
        <Link 
          href="/proyectos/phil-weasley"
          className="group relative bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-500 transition-all duration-500 min-h-[500px] flex flex-col justify-between p-8 sm:p-14 block"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="/phil-weasley/portada.jpg" 
              alt="Phil Weasley Western en Almería" 
              fill 
              className="object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          <div className="max-w-2xl z-10 relative space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/30">
                Western · Tabernas
              </span>
              <span className="text-xs font-semibold text-zinc-400">Posproducción</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight group-hover:translate-x-1 transition-transform">
              Phil Weasley
            </h3>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              Rodado en los desiertos de Almería. Una mirada árida y frontal a la supervivencia con cámara de cine y óptica fija sobre el paisaje de Tabernas.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-zinc-400 z-10 relative">
            <span>Localización: Tabernas (Almería) · Cámara & Color Grading</span>
            <span className="text-white group-hover:underline">Explorar dossier con 30 fotogramas →</span>
          </div>
        </Link>

        {/* Grid de 2 columnas secundario */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Frontera */}
          <Link 
            href="/proyectos/frontera" 
            className="group relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[380px] overflow-hidden hover:border-zinc-600 transition-all duration-300"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
              style={{ backgroundImage: 'url("/frontera/portada.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Selección FICAL 2026</span>
                <span className="text-xs font-semibold text-zinc-500">Preproducción</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Frontera</h3>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
                Western minimalista con Juan G. Verdú y Veronica Gregory. Gestión integral del departamento de producción y asistencia de dirección.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-xs text-zinc-400">
              <span>Dir. Producción & Ayte. Dir.</span>
              <span className="text-white font-semibold group-hover:translate-x-1 transition-transform">Ver ficha completa →</span>
            </div>
          </Link>

          {/* Banner a la página de proyectos */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[380px]">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                CATÁLOGO COMPLETO
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Explora toda la filmografía.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Descubre el resto de títulos de ficción y thriller como <em>Amor Procesado</em>, <em>Parpadear</em> y <em>Miel</em>, con notas de dirección y especificaciones técnicas.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-900">
              <Link
                href="/proyectos"
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 px-6 rounded-full text-center block text-xs uppercase tracking-wider transition-all"
              >
                Abrir Catálogo de Proyectos →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TEASER SOBRE MÍ */}
      <section className="bg-zinc-950 py-24 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-zinc-500 block">
            COMUNICACIÓN AUDIOVISUAL · DIRECCIÓN & PRODUCCIÓN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Yoel Martínez Pérez
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Comunicador audiovisual, director y productor. Especializado en la optimización de flujos técnicos de trabajo, dirección de producción y narrativa cinematográfica realista.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/sobre-mi"
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-xl"
            >
              Conocer Biografía y Visión Técnica →
            </Link>
            <a
              href="https://www.imdb.com/es-es/name/nm17141076/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400 font-semibold px-6 py-3.5 rounded-full text-xs tracking-wider uppercase transition-all"
            >
              <span>Ver ficha en IMDb</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-zinc-900 bg-black text-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING UFO Footer"
            width={30}
            height={30}
            className="opacity-50"
          />
          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
            <Link href="/" className="hover:text-white transition">Inicio</Link>
            <Link href="/proyectos" className="hover:text-white transition">Proyectos</Link>
            <Link href="/sobre-mi" className="hover:text-white transition">Sobre mí</Link>
            <Link href="/rodajes" className="hover:text-white transition">Workspace de Rodajes</Link>
          </div>
          <p className="text-xs text-zinc-600 pt-2">
            © YFILMING · Todos los derechos reservados. <br />
            Historias que desafían la gravedad.
          </p>
        </div>
      </footer>
    </div>
  )
}
