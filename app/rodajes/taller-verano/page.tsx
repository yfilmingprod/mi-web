import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

// ====================================================================
// 📝 CONFIGURACIÓN DEL PROYECTO: TALLER DE VERANO
// Puedes editar los enlaces ("#") y descripciones de cada día aquí
// ====================================================================
const PROYECTO = {
  titulo: "Taller de Verano",
  rol: "Dirección / Formación & Producción",
  estado: "En Rodaje", // Preproducción | En Rodaje | Posproducción | Finalizado
  localizacion: "Localización / Plató",
  fechas: "Semana de Intensivo",
  
  // Aviso o nota diaria para el equipo
  notaProduccion: "Atención equipo y alumnos: Revisar la orden de trabajo antes del inicio de cada jornada.",

  // TARJETAS DE LOS 5 DÍAS
  dias: [
    {
      numero: "01",
      titulo: "Día 1",
      subtitulo: "Iniciación & Lectura de Guion",
      descripcion: "Bienvenida, desglose de secuencias, prueba de cámara y primeras tomas de contacto.",
      enlace: "#", // Poner enlace a la Orden de Trabajo / Drive del Día 1
      icono: "🎬"
    },
    {
      numero: "02",
      titulo: "Día 2",
      subtitulo: "Rodaje de Interiores & Iluminación",
      descripcion: "Esquemas de luz en plató, planificación de encuadres y trabajo de dirección de actores.",
      enlace: "#", // Poner enlace a la Orden de Trabajo / Drive del Día 2
      icono: "💡"
    },
    {
      numero: "03",
      titulo: "Día 3",
      subtitulo: "Exteriores & Cámara en Mano",
      descripcion: "Secuencias en localización natural, flujo técnico de sonido directo y dinámicas de cámara.",
      enlace: "#", // Poner enlace a la Orden de Trabajo / Drive del Día 3
      icono: "🎥"
    },
    {
      numero: "04",
      titulo: "Día 4",
      subtitulo: "Secuencias Complejas & Acción",
      descripcion: "Bloque temático de mayor exigencia técnica, movimientos de cámara y continuidad dramática.",
      enlace: "#", // Poner enlace a la Orden de Trabajo / Drive del Día 4
      icono: "🔥"
    },
    {
      numero: "05",
      titulo: "Día 5",
      subtitulo: "Pickups, Cierre & Visualización",
      descripcion: "Planos de recurso (B-roll), revisión de material rodado y clausura del taller.",
      enlace: "#", // Poner enlace a la Orden de Trabajo / Drive del Día 5
      icono: "🏆"
    }
  ]
}

export default async function TallerDeVeranoWorkspacePage() {
  const user = await currentUser()

  // 1. Verificación de seguridad con Clerk
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-bold tracking-tight">Acceso Restringido</h1>
          <p className="text-slate-400 text-sm">
            Debes iniciar sesión para acceder al Workspace de producción de <span className="text-white font-medium">{PROYECTO.titulo}</span>.
          </p>
          <SignInButton mode="modal">
            <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-slate-200 transition cursor-pointer">
              Iniciar Sesión
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link 
            href="/rodajes" 
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition flex items-center gap-2"
          >
            ← Volver al Panel de Rodajes
          </Link>
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
            {PROYECTO.estado}
          </span>
        </div>

        {/* CABECERA DEL PROYECTO */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Workspace de Producción por Jornadas
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">{PROYECTO.titulo}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-1">
            <span>🎬 {PROYECTO.rol}</span>
            <span>•</span>
            <span>📍 {PROYECTO.localizacion}</span>
            <span>•</span>
            <span>📅 {PROYECTO.fechas}</span>
          </div>
        </div>

        {/* AVISO DE PRODUCCIÓN */}
        {PROYECTO.notaProduccion && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm flex items-start gap-3">
            <span className="text-lg">📢</span>
            <div>
              <span className="font-semibold text-white">Aviso de Producción: </span>
              {PROYECTO.notaProduccion}
            </div>
          </div>
        )}

        {/* SECCIÓN DE LAS 5 TARJETAS DÍA A DÍA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-200">
              Planificación por Jornadas (5 Días)
            </h2>
            <span className="text-xs text-slate-500 font-mono">5 tarjetas de rodaje</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROYECTO.dias.map((dia) => (
              <a
                key={dia.numero}
                href={dia.enlace}
                target={dia.enlace !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group bg-slate-900/70 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-64 hover:bg-slate-900 relative overflow-hidden"
              >
                {/* Número de día decorativo de fondo */}
                <span className="absolute -top-3 -right-2 text-7xl font-black text-slate-800/40 group-hover:text-slate-700/30 transition select-none">
                  {dia.numero}
                </span>

                <div className="space-y-3 z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dia.icono}</span>
                    <span className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                      Jornada {dia.numero}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                      {dia.titulo}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {dia.subtitulo}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {dia.descripcion}
                  </p>
                </div>

                <div className="text-xs text-slate-400 font-mono group-hover:text-white transition flex items-center justify-between border-t border-slate-800/80 pt-4 z-10">
                  <span>Acceder a documentación</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}