import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default async function WorkspacePhilWeasleyPage() {
  const user = await currentUser()

  // Control de seguridad: Si no hay usuario logueado, bloqueamos acceso
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <Image src="/logo-yfilming.png" alt="YFILMING" width={60} height={60} className="mx-auto opacity-80" />
          <h1 className="text-3xl font-black">Acceso Restringido</h1>
          <p className="text-zinc-400 text-sm">Debes iniciar sesión para acceder al workspace de Phil Weasley.</p>
          <SignInButton mode="modal">
            <button className="bg-white text-black font-semibold py-3 px-8 rounded-full text-sm">
              Iniciar Sesión
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  // Lista de módulos de trabajo del proyecto
  const herramientas = [
    {
      titulo: 'Guion Literario',
      descripcion: 'Última versión corregida del guion en formato estándar.',
      icono: '📜',
      estado: 'Versión 2.4',
      enlace: '#', // Aquí pondrás el link a PDF, Drive o Notion
    },
    {
      titulo: 'Guion Técnico',
      descripcion: 'Desglose de planos, angulaciones, focales y movimientos de cámara.',
      icono: '🎥',
      estado: 'Completado',
      enlace: '#',
    },
    {
      titulo: 'Storyboard',
      descripcion: 'Secuencia visual de planos, esquemas de iluminación y bocetos.',
      icono: '🎨',
      estado: 'Revisado',
      enlace: '#',
    },
    {
      titulo: 'Plan de Rodaje',
      descripcion: 'Cronograma por jornadas, citaciones y bloques de localización.',
      icono: '📅',
      estado: 'Actualizado',
      enlace: '#',
    },
    {
      titulo: 'Órdenes de Trabajo',
      descripcion: 'Citaciones diarias, partes de equipo, catering y contactos de emergencia.',
      icono: '📋',
      estado: 'Jornada Activa',
      enlace: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-24 pb-16 px-6">
      
      {/* Botón de retorno al panel general de rodajes */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link 
          href="/rodajes" 
          className="text-zinc-500 hover:text-white text-xs font-semibold tracking-wider uppercase transition inline-flex items-center gap-2"
        >
          ← Volver al Panel de Rodajes
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Cabecera del Proyecto Privado */}
        <header className="border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full">
                WORKSPACE PRIVADO
              </span>
              <span className="text-xs text-zinc-500 font-mono">ID: PW-2026</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Phil Weasley
            </h1>
            <p className="text-zinc-400 text-base mt-2">
              Centro de mando técnico y documentos de producción.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs space-y-1 min-w-[220px]">
            <span className="text-zinc-500 block uppercase font-bold">Dirección de Producción</span>
            <p className="text-white font-semibold">AP-7 Estudios / YFILMING</p>
            <span className="text-zinc-500 block uppercase font-bold pt-2">Localización Principal</span>
            <p className="text-white font-semibold">Desierto de Tabernas (Almería)</p>
          </div>
        </header>

        {/* Módulos de Trabajo (Guion, Storyboard, etc.) */}
        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            DOCUMENTACIÓN & DEPARTAMENTOS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {herramientas.map((item, index) => (
              <div 
                key={index}
                className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-500 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl">{item.icono}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-full border border-zinc-800">
                      {item.estado}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                    {item.descripcion}
                  </p>
                </div>

                <a
                  href={item.enlace}
                  className="pt-4 border-t border-zinc-900/80 text-xs font-semibold text-white group-hover:text-yellow-400 flex items-center justify-between transition-colors"
                >
                  <span>Abrir documento</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}