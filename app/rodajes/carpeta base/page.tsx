import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

// ====================================================================
// 📝 CONFIGURACIÓN DEL PROYECTO
// Modifica únicamente este bloque para cada nuevo rodaje
// ====================================================================
const PROYECTO = {
  titulo: "NOMBRE DEL PROYECTO",
  rol: "Tu Rol (ej. Director / Productor)",
  estado: "Preproducción", // Preproducción | Rodaje | Posproducción | Finalizado
  genero: "Género / Tipo de Proyecto",
  localizacion: "Localización principal",
  fechas: "Fechas estimadas de rodaje",
  
  // Enlaces a tus documentos (puedes usar enlaces de Google Drive, Notion, Dropbox o PDFs)
  documentos: {
    guion: "#",             // ej: "https://drive.google.com/file/d/..."
    guionTecnico: "#",      // ej: "https://notion.so/..."
    storyboard: "#",        // ej: "https://mi-drive.com/storyboard"
    planRodaje: "#",        // ej: "https://docs.google.com/spreadsheets/d/..."
    ordenesTrabajo: "#",    // ej: "https://drive.google.com/folderview..."
    inventarioMaterial: "#" // ej: "https://excel.com/..."
  },

  // Nota de prensa o aviso importante interno para el equipo
  notaProduccion: "Atención equipo: Revisar la orden de trabajo antes del inicio de jornada."
}

export default async function ProyectoWorkspacePage() {
  const user = await currentUser()

  // 1. Verificación de inicio de sesión
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
            <button className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-slate-200 transition">
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
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            {PROYECTO.estado}
          </span>
        </div>

        {/* HERO Y FICHAS RÁPIDAS DEL PROYECTO */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Workspace Privado de Producción
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
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-amber-200 text-sm flex items-start gap-3">
            <span className="text-lg">📢</span>
            <div>
              <span className="font-semibold text-amber-400">Aviso de Producción: </span>
              {PROYECTO.notaProduccion}
            </div>
          </div>
        )}

        {/* GRID DE RECURSOS TÉCNICOS */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-200">
            Documentación & Recursos Técnicos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. GUION LITERARIO */}
            <a 
              href={PROYECTO.documentos.guion} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">📝</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Guion Literario</h3>
                <p className="text-xs text-slate-400">Última versión del guion para ensayos y rodaje.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Abrir documento</span>
                <span>→</span>
              </div>
            </a>

            {/* 2. GUION TÉCNICO */}
            <a 
              href={PROYECTO.documentos.guionTecnico} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">🎬</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Guion Técnico</h3>
                <p className="text-xs text-slate-400">Desglose de planos, encuadres, óptica y movimientos de cámara.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Abrir documento</span>
                <span>→</span>
              </div>
            </a>

            {/* 3. STORYBOARD */}
            <a 
              href={PROYECTO.documentos.storyboard} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">🎨</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Storyboard</h3>
                <p className="text-xs text-slate-400">Esquemas visuales y planteamiento gráfico de secuencias.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Ver galería</span>
                <span>→</span>
              </div>
            </a>

            {/* 4. PLAN DE RODAJE */}
            <a 
              href={PROYECTO.documentos.planRodaje} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">📅</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Plan de Rodaje</h3>
                <p className="text-xs text-slate-400">Calendario, jornadas, secuencias por día y horas previstas.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Consultar plan</span>
                <span>→</span>
              </div>
            </a>

            {/* 5. ÓRDENES DE TRABAJO */}
            <a 
              href={PROYECTO.documentos.ordenesTrabajo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">📋</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Órdenes de Trabajo</h3>
                <p className="text-xs text-slate-400">Convocatorias diarias para el equipo de rodaje y actores.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Ver convocatorias</span>
                <span>→</span>
              </div>
            </a>

            {/* 6. INVENTARIO DE MATERIAL */}
            <a 
              href={PROYECTO.documentos.inventarioMaterial} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between h-48 hover:bg-slate-900"
            >
              <div className="space-y-2">
                <div className="text-2xl">📦</div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition">Inventario de Material</h3>
                <p className="text-xs text-slate-400">Listado de cámara, iluminación, sonido y accesorios asignados.</p>
              </div>
              <div className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition flex items-center justify-between">
                <span>Abrir checklist</span>
                <span>→</span>
              </div>
            </a>

          </div>
        </div>

      </div>
    </div>
  )
}