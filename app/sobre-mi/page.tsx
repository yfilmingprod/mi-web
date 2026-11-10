import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sobre Yoel Martínez Pérez | Director & Productor | YFILMING',
  description: 'Biografía, trayectoria y visión cinematográfica de Yoel Martínez Pérez. Comunicador audiovisual, director y productor con experiencia en el desierto de Tabernas y proyectos de ficción.',
  openGraph: {
    title: 'Sobre Yoel Martínez Pérez | YFILMING',
    description: 'Comunicador audiovisual, director y productor cinematográfico. Historias que desafían la gravedad.',
    url: 'https://yfilming.com/sobre-mi',
    images: ['/logo-yfilming.png'],
  },
}

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-20 selection:bg-white selection:text-black">
      
      {/* 1. HERO PROFILE */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 border-b border-zinc-900">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-yellow-500">Sobre mí</span>
          </div>

          <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-yellow-500 block">
            COMUNICACIÓN AUDIOVISUAL · DIRECCIÓN & PRODUCCIÓN
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
            Yoel Martínez Pérez
          </h1>

          <p className="text-zinc-300 text-xl sm:text-2xl font-light leading-relaxed max-w-3xl">
            Comunicador audiovisual, director y productor cinematográfico. Construyendo proyectos cinematográficos con precisión técnica, mirada de autor y flujos de trabajo optimizados.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="https://www.imdb.com/es-es/name/nm17141076/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all shadow-lg shadow-yellow-500/20"
            >
              <span>Ver ficha en IMDb</span>
              <span className="text-sm font-black">↗</span>
            </a>

            <a
              href="mailto:yfilmingprod@gmail.com"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all"
            >
              <span>Contactar por Email</span>
              <span>✉️</span>
            </a>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white px-4 py-3 text-xs uppercase tracking-wider font-semibold transition"
            >
              <span>Ver Filmografía</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MANIFIESTO Y VISIÓN DE CINE */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-zinc-900">
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            VISIÓN & ENFOQUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            El cine se gana en la preparación y en la verdad del encuadre.
          </h2>
        </div>

        <div className="md:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
          <p>
            Mi trabajo se sitúa en la intersección entre la <strong>visión artística de autor</strong> y el <strong>rigor logístico</strong> que exige un rodaje profesional. Desde el desierto de Tabernas en Almería hasta localizaciones naturales en Murcia, entiendo el espacio como un personaje más capaz de dictar el compás emocional de la historia.
          </p>
          <p>
            Creo en la economía de planos frente al artificio, en la luz natural aprovechada al límite de las posibilidades ópticas y en la contención dramática: los conflictos humanos más memorables ocurren en lo que los personajes callan, no en lo que declaran.
          </p>
          <p className="text-zinc-400 text-base">
            Como productor y director, cuido cada fase del proceso: desglose exhaustivo de guion, citaciones por bloques de luz, monitorización técnica con perfiles Log y etalonaje en DaVinci Resolve para garantizar que la copia maestra mantenga la coherencia cromática proyectada.
          </p>
        </div>
      </section>

      {/* 3. ESPECIALIDADES Y COMPETENCIAS TÉCNICAS */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-900 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
            COMPETENCIAS DEL DEPARTAMENTO
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Especialización Profesional.
          </h2>
          <p className="text-zinc-400 text-base">
            Capacidades técnicas y artísticas listas para ser integradas en producciones de cualquier escala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-3xl block">🎬</span>
            <h3 className="text-xl font-bold text-white">Dirección & Guion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Desarrollo narrativo, análisis de guion técnico, marcación de encuadres cinematográficos y dirección de actores orientada al realismo y la contención dramática.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-3xl block">📋</span>
            <h3 className="text-xl font-bold text-white">Dirección de Producción</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Desglose de escenas, elaboración de planes de rodaje, presupuestos oficiales, coordinación logística de equipos, permisos de localización y citaciones diarias.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-3xl block">🎥</span>
            <h3 className="text-xl font-bold text-white">Cámara & Iluminación</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Operador de cámara, óptica cinematográfica fija, control de exposición en perfiles Log y esquemas de iluminación natural para sol directo y noche.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <span className="text-3xl block">🎞️</span>
            <h3 className="text-xl font-bold text-white">Flujos & Posproducción</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Edición de montaje, sincronización de audio de campo y etalonaje en DaVinci Resolve con gestión de color para entregas finales en DCP y ProRes.
            </p>
          </div>

        </div>
      </section>

      {/* 4. PROYECTOS DESTACADOS & RECORRIDO */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-900 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">FILMOGRAFÍA SELECCIONADA</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Proyectos en los que he trabajado</h2>
          </div>
          <Link href="/proyectos" className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link 
            href="/proyectos/phil-weasley"
            className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-3xl p-6 space-y-4 transition-all"
          >
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span className="font-mono uppercase text-yellow-500 text-[10px]">Western</span>
              <span>Tabernas</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              Phil Weasley
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Rodado en Almería. Operador de cámara y asistencia de producción en entorno desértico hostil.
            </p>
            <span className="text-xs font-semibold text-white inline-block pt-2">Ver dossier fotográfico →</span>
          </Link>

          <Link 
            href="/proyectos/frontera"
            className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-3xl p-6 space-y-4 transition-all"
          >
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span className="font-mono uppercase text-yellow-500 text-[10px]">FICAL 2026</span>
              <span>Almería</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              Frontera
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dirección de Producción y Ayudante de Dirección en un western minimalista con Juan G. Verdú.
            </p>
            <span className="text-xs font-semibold text-white inline-block pt-2">Ver ficha técnica →</span>
          </Link>

          <Link 
            href="/proyectos"
            className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-3xl p-6 space-y-4 transition-all"
          >
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span className="font-mono uppercase text-blue-400 text-[10px]">Thriller</span>
              <span>Murcia</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              Amor Procesado
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dirección y guion original para una pieza de tensión psicológica e introspección.
            </p>
            <span className="text-xs font-semibold text-white inline-block pt-2">Ver proyectos →</span>
          </Link>

        </div>
      </section>

      {/* 5. DATOS DE CONTACTO & CONTRATACIÓN */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">CONTACTO PROFESIONAL</span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Hablemos de tu siguiente rodaje.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Disponible para dirección de proyectos, dirección de producción, operador de cámara o consultoría de flujos de trabajo.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-xl mx-auto space-y-6 text-left">
          <div className="space-y-4 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-900 gap-1">
              <span className="text-xs uppercase font-mono text-zinc-500">Correo Electrónico:</span>
              <a href="mailto:yfilmingprod@gmail.com" className="text-white font-mono hover:text-yellow-400 transition">
                yfilmingprod@gmail.com
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-900 gap-1">
              <span className="text-xs uppercase font-mono text-zinc-500">Teléfono:</span>
              <a href="tel:+34606448780" className="text-white font-mono hover:text-yellow-400 transition">
                +34 606 44 87 80
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-900 gap-1">
              <span className="text-xs uppercase font-mono text-zinc-500">Base de Operaciones:</span>
              <span className="text-white">Murcia / Almería · Cobertura Nacional</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs uppercase font-mono text-zinc-500">Registro Profesional:</span>
              <a
                href="https://www.imdb.com/es-es/name/nm17141076/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline font-semibold"
              >
                Perfil Verificado IMDb ↗
              </a>
            </div>
          </div>

          <a
            href="mailto:yfilmingprod@gmail.com?subject=Propuesta%20de%20Proyecto%20Audiovisual%20-%20YFILMING"
            className="w-full bg-white hover:bg-zinc-200 text-black font-extrabold py-3.5 px-6 rounded-2xl text-center block text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Enviar Propuesta de Proyecto
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-zinc-900 bg-zinc-950 text-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING Logo"
            width={28}
            height={28}
            className="opacity-50"
          />
          <p className="text-xs text-zinc-600">
            © YFILMING · Yoel Martínez Pérez. Todos los derechos reservados. <br />
            Historias que desafían la gravedad.
          </p>
        </div>
      </footer>

    </div>
  )
}
