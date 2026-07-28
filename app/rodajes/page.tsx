'use client'

import { useUser, SignInButton } from '@clerk/nextjs'

export default function RodajesPage() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-400">Cargando panel de rodajes...</p>
      </div>
    )
  }

  // SI NO TIENE SESIÓN INICIADA: Bloqueamos el acceso
  if (!isSignedIn) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 backdrop-blur-sm">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Área Privada de Rodajes</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Esta sección contiene planes de rodaje, guiones técnicos y desgloses de producción. Por favor, inicia sesión para acceder.
          </p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all">
              Iniciar sesión con Google o Apple
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  // SI SÍ TIENE SESIÓN INICIADA: Mostramos el panel de gestión
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Panel de Producción & Rodajes 🎬</h1>
          <p className="text-slate-400 text-sm mt-1">Gestión centralizada de proyectos e información técnica.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-all self-start md:self-auto">
          + Nuevo Proyecto
        </button>
      </div>

      {/* Módulos de Gestión */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6 hover:border-slate-600 transition-all">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="text-lg font-bold text-white mb-2">Guiones Técnicos</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            Secuenciación, planos, ópticas y notas de movimiento de cámara.
          </p>
          <span className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer">Ver archivos →</span>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6 hover:border-slate-600 transition-all">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="text-lg font-bold text-white mb-2">Planes de Rodaje</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            Convocatorias de equipo, citaciones de actores, horarios e itinerarios.
          </p>
          <span className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer">Ver convocatorias →</span>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6 hover:border-slate-600 transition-all">
          <div className="text-3xl mb-3">🎥</div>
          <h3 className="text-lg font-bold text-white mb-2">Equipamiento & Cámara</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            Listados de material, configuración de perfiles (Log/V-Log) y esquemas de iluminación.
          </p>
          <span className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer">Ver inventario →</span>
        </div>
      </div>
    </div>
  )
}