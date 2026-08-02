'use client'

import { useState, useEffect } from 'react'
import { useUser, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Inicialización de Supabase en cliente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Tu email para darte acceso de Administrador / Edición
const ADMIN_EMAIL = "yoelmartinezperez@gmail.com"

interface Recurso {
  id?: string
  dia_numero: number
  titulo: string
  subtitulo: string
  descripcion: string
  tipo: string
  url_drive: string
}

export default function TallerVeranoPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [cargando, setCargando] = useState(true)

  // Formulario nuevo recurso
  const [form, setForm] = useState<Recurso>({
    dia_numero: 1,
    titulo: '',
    subtitulo: '',
    descripcion: '',
    tipo: 'pdf',
    url_drive: ''
  })

  // Cargar recursos desde Supabase
  const cargarRecursos = async () => {
    setCargando(true)
    const { data, error } = await supabase
      .from('taller_recursos')
      .select('*')
      .eq('proyecto_slug', 'taller-verano')
      .order('dia_numero', { ascending: true })

    if (!error && data) {
      setRecursos(data)
    }
    setCargando(false)
  }

  useEffect(() => {
    cargarRecursos()
  }, [])

  // Guardar recurso en Supabase desde la web
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('taller_recursos').insert([
      {
        ...form,
        proyecto_slug: 'taller-verano'
      }
    ])

    if (!error) {
      setModalAbierto(false)
      setForm({
        dia_numero: 1,
        titulo: '',
        subtitulo: '',
        descripcion: '',
        tipo: 'pdf',
        url_drive: ''
      })
      cargarRecursos()
    } else {
      alert('Error al guardar el recurso')
    }
  }

  // Convertir URL de Drive a URL para Embed
  const getEmbedUrl = (url: string, tipo: string) => {
    if (!url) return '#'
    if (tipo === 'presentacion') {
      return url.replace('/edit', '/embed').replace('/view', '/embed')
    }
    if (tipo === 'pdf' || tipo === 'video') {
      return url.replace('/view', '/preview')
    }
    return url
  }

  if (!isLoaded) return <div className="min-h-screen bg-black text-white p-12">Cargando...</div>

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-bold">Acceso Restringido</h1>
          <p className="text-slate-400 text-sm">Inicia sesión para acceder al Taller de Verano.</p>
          <SignInButton mode="modal">
            <button className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-slate-200 transition">
              Iniciar Sesión
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  const esAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* NAVEGACIÓN */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/rodajes" className="text-xs text-slate-400 hover:text-white uppercase tracking-widest">
            ← Volver a Rodajes
          </Link>
          {esAdmin && (
            <button 
              onClick={() => setModalAbierto(true)}
              className="bg-amber-500 text-black font-semibold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition"
            >
              + Añadir Contenido / Drive
            </button>
          )}
        </div>

        {/* TITULO */}
        <div>
          <h1 className="text-4xl md:text-6xl font-black">Taller de Verano</h1>
          <p className="text-slate-400 text-sm mt-2">Documentos, Presentaciones, Vídeos e Imágenes del Taller</p>
        </div>

        {/* LISTADO DE RECURSOS POR DÍA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recursos.map((rec) => (
            <div key={rec.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
                  Día {rec.dia_numero} • {rec.tipo.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{rec.titulo}</h3>
                <p className="text-xs text-slate-400 mt-1">{rec.subtitulo}</p>
              </div>
              
              {rec.descripcion && (
                <p className="text-xs text-slate-300 leading-relaxed">{rec.descripcion}</p>
              )}

              {/* VISOR / EMBED DIRECTO */}
              {rec.tipo === 'pdf' || rec.tipo === 'presentacion' || rec.tipo === 'video' ? (
                <div className="w-full h-64 bg-black rounded-xl overflow-hidden border border-slate-800">
                  <iframe 
                    src={getEmbedUrl(rec.url_drive, rec.tipo)} 
                    className="w-full h-full"
                    allow="autoplay"
                  />
                </div>
              ) : (
                <a 
                  href={rec.url_drive} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-amber-400 hover:underline"
                >
                  Abrir enlace en Google Drive →
                </a>
              )}
            </div>
          ))}
        </div>

        {recursos.length === 0 && !cargando && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No hay contenidos añadidos todavía. Pulsa "+ Añadir Contenido" para agregar el primero.
          </div>
        )}

        {/* MODAL PARA AÑADIR CONTENIDO */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4">
              <h2 className="text-xl font-bold">Añadir Recurso / Archivo de Drive</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Día del Taller</label>
                  <select 
                    value={form.dia_numero}
                    onChange={(e) => setForm({...form, dia_numero: Number(e.target.value)})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value={1}>Día 1</option>
                    <option value={2}>Día 2</option>
                    <option value={3}>Día 3</option>
                    <option value={4}>Día 4</option>
                    <option value={5}>Día 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Tipo de Archivo</label>
                  <select 
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value="pdf">Documento PDF / Guion</option>
                    <option value="presentacion">Presentación (Google Slides)</option>
                    <option value="video">Vídeo de Drive / Vimeo / YouTube</option>
                    <option value="imagen">Imagen / Galería</option>
                    <option value="enlace">Enlace Externo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Título</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Presentación Iluminación Plató"
                    value={form.titulo}
                    onChange={(e) => setForm({...form, titulo: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Subtítulo / Concepto</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Diapositivas de la sesión teórica"
                    value={form.subtitulo}
                    onChange={(e) => setForm({...form, subtitulo: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Enlace de Google Drive / Compartir</label>
                  <input 
                    type="url" 
                    required 
                    placeholder="https://drive.google.com/file/d/..."
                    value={form.url_drive}
                    onChange={(e) => setForm({...form, url_drive: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Descripción corta (opcional)</label>
                  <textarea 
                    rows={2}
                    value={form.descripcion}
                    onChange={(e) => setForm({...form, descripcion: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setModalAbierto(false)}
                    className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs hover:bg-slate-700"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="w-full bg-amber-500 text-black font-semibold py-2 rounded-xl text-xs hover:bg-amber-400"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}