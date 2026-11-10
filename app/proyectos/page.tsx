import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Filmografía & Proyectos Cinematográficos | YFILMING',
  description: 'Catálogo de proyectos cinematográficos y cortometrajes de ficción dirigidos y producidos por Yoel Martínez Pérez: Phil Weasley, Frontera, Amor Procesado y Parpadear.',
  openGraph: {
    title: 'Filmografía & Proyectos Cinematográficos | YFILMING',
    description: 'Westerns, drama y thrillers psicológicos con fuerte identidad estética y rigor técnico.',
    url: 'https://yfilming.com/proyectos',
    images: ['/phil-weasley/portada.jpg'],
  },
}

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-20 selection:bg-white selection:text-black">
      
      {/* 1. HERO DE LA PÁGINA DE PROYECTOS */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 border-b border-zinc-900">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-yellow-500">Filmografía Oficial</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
            Proyectos en Pantalla Grande.
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl font-normal leading-relaxed pt-2">
            Catálogo completo de obras cinematográficas: westerns, thrillers psicológicos y ficciones desarrolladas con cámaras de cine, flujo de color Log y vocación de autor.
          </p>
        </div>

        {/* Cintas de métricas técnicas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-900/80 text-xs">
          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl">
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Géneros Clave</span>
            <span className="text-white font-bold text-sm sm:text-base mt-1 block">Western & Thriller</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl">
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Localización Principal</span>
            <span className="text-white font-bold text-sm sm:text-base mt-1 block">Tabernas (Almería)</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl">
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Selección Oficial</span>
            <span className="text-yellow-400 font-bold text-sm sm:text-base mt-1 block">FICAL 2026</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl">
            <span className="text-zinc-500 block uppercase font-mono text-[10px]">Flujo de Posproducción</span>
            <span className="text-white font-bold text-sm sm:text-base mt-1 block">DaVinci Resolve / Log</span>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO PRINCIPAL DE PROYECTOS */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        
        {/* PROYECTO 1: PHIL WEASLEY (WESTERN) */}
        <article className="group relative bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-500 transition-all duration-500 p-8 sm:p-14">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/phil-weasley/portada.jpg" 
              alt="Phil Weasley Western en Almería" 
              fill 
              className="object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-400 px-3.5 py-1 rounded-full border border-yellow-500/30">
                Western · Tabernas
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-zinc-800">
                Posproducción & Etalonaje
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform">
              Phil Weasley
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
              Rodado en los míticos desiertos de Tabernas (Almería). Una inmersión áspera y contemplativa en la frontera, donde la escala del paisaje impone el ritmo dramático y el silencio sustituye al diálogo superfluo.
            </p>

            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <p><strong className="text-white">Dirección:</strong> Barto Muñoz & Yoel Martínez (Cámara & Producción)</p>
              <p><strong className="text-white">Equipo Técnico:</strong> AP-7 Estudios / New Drama / YFILMING</p>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            <div className="flex items-center gap-6 text-zinc-400">
              <span>📍 Tabernas (Almería)</span>
              <span>🎬 Formato 2.39:1 Anamórfico</span>
              <span className="hidden sm:inline">🎞️ 30+ Fotogramas de Rodaje</span>
            </div>
            
            <Link 
              href="/proyectos/phil-weasley" 
              className="bg-white hover:bg-zinc-200 text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <span>Explorar Dossier y Fotogramas</span>
              <span>→</span>
            </Link>
          </div>
        </article>

        {/* PROYECTO 2: FRONTERA (WESTERN MINIMALISTA) */}
        <article className="group relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 overflow-hidden hover:border-zinc-600 transition-all duration-300">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
            style={{ backgroundImage: 'url("/frontera/portada.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/20" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3.5 py-1 rounded-full">
                Selección FICAL 2026
              </span>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">
                Preproducción Avanzada
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Frontera
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Un relato íntimo sobre dos personas detenidas ante un límite invisible en el paisaje árido. Desglose técnico de producción, casting protagonista (Juan G. Verdú y Veronica Gregory) y cronograma de rodaje cerrado en 1 jornada intensiva.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
              <p><strong className="text-white">Rol:</strong> Dirección de Producción & Ayudante de Dirección</p>
              <p><strong className="text-white">Dirección & Fotografía:</strong> Fernando Fernández</p>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6 text-zinc-400 font-mono">
              <span>⏱️ 4 Minutos</span>
              <span>📍 Almería</span>
              <span>🎬 1 Jornada de rodaje</span>
            </div>

            <Link 
              href="/proyectos/frontera" 
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2"
            >
              <span>Ver Ficha Técnica, Casting & Plan</span>
              <span>→</span>
            </Link>
          </div>
        </article>

        {/* GRID DE DOS COLUMNAS: AMOR PROCESADO & PARPADEAR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AMOR PROCESADO */}
          <article className="group relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[460px] overflow-hidden hover:border-zinc-600 transition-all">
            <div className="absolute inset-0 z-0">
              <Image
                src="/amor-procesado/portada.jpg"
                alt="Amor Procesado - Thriller Psicológico"
                fill
                className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  Drama & Thriller
                </span>
                <span className="text-xs font-mono text-zinc-500">En Desarrollo</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Amor Procesado</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Inmersión psicológica sobre el aislamiento y la percepción distorsionada. Encuadres cerrados, cámara en mano e iluminación expresiva entre espacios claustrofóbicos e interiores naturales.
              </p>
              <div className="pt-2 text-xs text-zinc-400">
                <span><strong className="text-white">Rol:</strong> Dirección & Guion Original</span>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-mono">Murcia / Exteriores</span>
              <Link 
                href="/rodajes/amor-procesado" 
                className="text-white font-semibold hover:text-yellow-400 transition-colors flex items-center gap-1.5"
              >
                <span>Acceder a Workspace</span>
                <span>→</span>
              </Link>
            </div>
          </article>

          {/* PARPADEAR & FOTOTAXIA */}
          <article className="group relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[460px] overflow-hidden hover:border-zinc-600 transition-all">
            <div className="absolute inset-0 bg-red-950">
              <Image
                src="/parpadear/potada.jpg"
                alt="Parpadear - Dirección de fotografía"
                fill
                className="object-cover translate-y-8 opacity-75"
              />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-red-950 via-red-950/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-red-950/70 via-red-950/30 to-black/95" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Ficción / Dirección de Fotografía
                </span>
                <span className="text-xs font-mono text-emerald-400">Finalizado</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Parpadear</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Proyecto centrado en la disciplina visual de la dirección de fotografía: composición geométrica del encuadre, texturas cromáticas en sombras y contrastes lumínicos noche/día.
              </p>
              <div className="pt-2 text-xs text-zinc-400">
                <span><strong className="text-white">Coproducción:</strong> AP7 Estudios, New Drama y YFILMING</span>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-zinc-300">
              <span>Copias maestras en archivo</span>
              <Link href="/sobre-mi" className="text-white font-semibold hover:underline">
                Ver perfil técnico de autor →
              </Link>
            </div>
          </article>

        </div>

        {/* PROYECTO 5: MIEL */}
        <article className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/20">
                Ficción Dramática
              </span>
              <span className="text-xs font-mono text-zinc-500">2026 · Postproducción</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Miel</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Rodaje en localizaciones del Levante peninsular. Operación de cámara, asistencia de dirección y sincronización de pistas sonoras directas con máster en DaVinci Resolve.
            </p>
          </div>

          <Link
            href="/rodajes/miel"
            className="shrink-0 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-6 py-2.5 rounded-full text-xs font-semibold transition flex items-center gap-2"
          >
            <span>Workspace de Miel</span>
            <span>→</span>
          </Link>
        </article>

      </section>

      {/* 3. LLAMADA A LA ACCIÓN: COPRODUCCIONES Y DIRECCIÓN */}
      <section className="bg-zinc-950 py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 block">
            DESARROLLO & PRODUCCIÓN CINEMATOGRÁFICA
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            ¿Tienes una historia que necesita dar el salto a la pantalla?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Abierto a proyectos de ficción, dirección de fotografía, coproducción y dirección de producción en Almería, Murcia o cualquier localización exterior.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/sobre-mi"
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-xl"
            >
              Conocer al Director & Productor
            </Link>
            <a
              href="mailto:yfilmingprod@gmail.com"
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition"
            >
              Contactar Directamente
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-zinc-900 bg-black text-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING Logo"
            width={28}
            height={28}
            className="opacity-50"
          />
          <p className="text-xs text-zinc-600">
            © YFILMING · Catálogo Oficial de Filmografía. <br />
            Historias que desafían la gravedad.
          </p>
        </div>
      </footer>

    </div>
  )
}
