'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import { useUser, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Inicialización de cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 👥 Lista de correos con acceso de Administrador / Edición
const ADMIN_EMAILS = [
  "yoelmartinezperez@gmail.com",
  "info.ap7estudios@gmail.com" // 👈 Añade aquí todos los correos de administradores que quieras
]

// Configuración visual estática de las 5 jornadas
const JORNADAS = [
  { numero: 1, titulo: "Día 1", subtitulo: "Iniciación & Lectura de Guion", icono: "🎬" },
  { numero: 2, titulo: "Día 2", subtitulo: "Rodaje de Interiores & Iluminación", icono: "💡" },
  { numero: 3, titulo: "Día 3", subtitulo: "Exteriores & Cámara en Mano", icono: "🎥" },
  { numero: 4, titulo: "Día 4", subtitulo: "Secuencias Complejas & Acción", icono: "🔥" },
  { numero: 5, titulo: "Día 5", subtitulo: "Pickups, Cierre & Visualización", icono: "🏆" },
]

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

  // Formulario para nuevo recurso
  const [form, setForm] = useState<Recurso>({
    dia_numero: 1,
    titulo: '',
    subtitulo: '',
    descripcion: '',
    tipo: 'pdf',
    url_drive: ''
  })

  // Cargar todos los recursos de Supabase
  const cargarRecursos = async () => {
    const { data, error } = await supabase
      .from('taller_recursos')
      .select('*')
      .eq('proyecto_slug', 'taller-verano')
      .order('created_at', { ascending: true })

    if (!error && data) {
      setRecursos(data)
    }
  }

  useEffect(() => {
    cargarRecursos()
  }, [])

  // Abrir modal indicando a qué día vamos a añadir contenido
  const abrirModalParaDia = (diaNum: number) => {
    setForm({
      dia_numero: diaNum,
      titulo: '',
      subtitulo: '',
      descripcion: '',
      tipo: 'pdf',
      url_drive: ''
    })
    setModalAbierto(true)
  }

  // Guardar recurso en Supabase
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('taller_recursos').insert([
      {
        ...form,
        proyecto_slug: 'taller-verano'
      }
    ])

    if (!error) {
      setModalAbierto(false)
      cargarRecursos()
    } else {
      alert('Error al guardar el recurso en Supabase.')
    }
  }

  // Eliminar un recurso
  const handleEliminar = async (id?: string) => {
    if (!id) return
    if (confirm('¿Estás seguro de que quieres eliminar este contenido?')) {
      const { error } = await supabase.from('taller_recursos').delete().eq('id', id)
      if (!error) {
        cargarRecursos()
      } else {
        alert('Error al eliminar el recurso.')
      }
    }
  }

  // Convertir URL compartida de Drive o Slides a una URL limpia incrustable (embed)
  const getEmbedUrl = (url: string, tipo: string) => {
    if (!url) return '#'

    // 1. Si es una presentación de Google Slides
    if (tipo === 'presentacion' || url.includes('/presentation/d/')) {
      const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/)
      if (match && match[1]) {
        return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`
      }
    }

    // 2. Si es un archivo de Google Drive (PDF, Vídeo, etc.)
    if (url.includes('/file/d/')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`
      }
    }

    // fallback si no coincide con los patrones anteriores
    if (tipo === 'presentacion') {
      return url.replace('/edit', '/embed').replace('/view', '/embed')
    }
    if (tipo === 'pdf' || tipo === 'video') {
      return url.replace('/view', '/preview')
    }

    return url
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-sm">
        Cargando Workspace...
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-bold">Acceso Restringido</h1>
          <p className="text-slate-400 text-sm">Inicia sesión para acceder al Workspace del Taller de Verano.</p>
          <SignInButton mode="modal">
            <button className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-slate-200 transition cursor-pointer">
              Iniciar Sesión
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  // Comprobar si el correo del usuario logueado está en la lista de administradores
  const emailUsuario = user?.primaryEmailAddress?.emailAddress
  const esAdmin = emailUsuario ? ADMIN_EMAILS.includes(emailUsuario) : false

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/rodajes" className="text-xs text-slate-400 hover:text-white uppercase tracking-widest transition">
            ← Volver a Rodajes
          </Link>
          <span className="text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full">
            Workspace Interactivo
          </span>
        </div>

        {/* CABECERA */}
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Formación & Producción
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Taller de Verano</h1>
          <p className="text-slate-400 text-sm">
            Estructura diaria por jornadas. Sube presentaciones, guiones, vídeos e imágenes para cada día.
          </p>
        </div>

        {/* SECCIÓN DE LAS 5 JORNADAS */}
        <div className="space-y-12">
          {JORNADAS.map((jornada) => {
            const recursosDia = recursos.filter(r => r.dia_numero === jornada.numero)

            return (
              <div 
                key={jornada.numero} 
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden"
              >
                {/* Número gigante decorativo */}
                <span className="absolute -top-4 -right-2 text-8xl font-black text-slate-800/30 select-none pointer-events-none">
                  0{jornada.numero}
                </span>

                {/* CABECERA DE LA TARJETA DEL DÍA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 z-10 relative">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{jornada.icono}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{jornada.titulo}</h2>
                      <p className="text-xs text-slate-400">{jornada.subtitulo}</p>
                    </div>
                  </div>

                  {esAdmin && (
                    <button
                      onClick={() => abrirModalParaDia(jornada.numero)}
                      className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-xl transition self-start md:self-auto cursor-pointer"
                    >
                      + Añadir a {jornada.titulo}
                    </button>
                  )}
                </div>

                {/* LISTADO DE RECURSOS DEL DÍA */}
                {recursosDia.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative">
                    {recursosDia.map((rec) => (
                      <div key={rec.id} className="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase bg-slate-800 text-amber-400 border border-slate-700 px-2 py-0.5 rounded">
                              {rec.tipo}
                            </span>
                            {esAdmin && (
                              <button 
                                onClick={() => handleEliminar(rec.id)}
                                className="text-xs text-red-400/70 hover:text-red-400 transition cursor-pointer"
                                title="Eliminar este contenido"
                              >
                                ✕ Borrar
                              </button>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white">{rec.titulo}</h3>
                          {rec.subtitulo && (
                            <p className="text-xs text-slate-400 font-medium">{rec.subtitulo}</p>
                          )}
                          {rec.descripcion && (
                            <p className="text-xs text-slate-500 leading-relaxed">{rec.descripcion}</p>
                          )}
                        </div>

                        {/* VISOR DIRECTO / EMBED */}
                        <div className="pt-2">
                          {rec.tipo === 'pdf' || rec.tipo === 'presentacion' || rec.tipo === 'video' ? (
                            <div className="w-full h-56 bg-black rounded-xl overflow-hidden border border-slate-800">
                              <iframe 
                                src={getEmbedUrl(rec.url_drive, rec.tipo)} 
                                className="w-full h-full border-0"
                                allow="autoplay"
                              />
                            </div>
                          ) : (
                            <a 
                              href={rec.url_drive} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs text-amber-400 hover:underline font-mono"
                            >
                              🔗 Abrir archivo en Google Drive →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-slate-800/80 rounded-2xl text-slate-500 text-xs z-10 relative">
                    No hay contenidos cargados para el {jornada.titulo}.
                    {esAdmin && (
                      <span className="block mt-1 text-slate-400">
                        Pulsa en el botón superior para agregar documentos o enlaces de Drive.
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* MODAL PARA AÑADIR CONTENIDO */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">
                  Añadir contenido a <span className="text-amber-400">Día {form.dia_numero}</span>
                </h3>
                <button 
                  onClick={() => setModalAbierto(false)} 
                  className="text-slate-400 hover:text-white text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">Día del Taller</label>
                  <select 
                    value={form.dia_numero}
                    onChange={(e) => setForm({...form, dia_numero: Number(e.target.value)})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="pdf">Documento PDF / Guion</option>
                    <option value="presentacion">Presentación (Google Slides)</option>
                    <option value="video">Vídeo (Drive / Vimeo / YouTube)</option>
                    <option value="imagen">Imagen / Galería</option>
                    <option value="enlace">Enlace Externo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Título del Contenido</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Guion Técnico o Presentación de Iluminación"
                    value={form.titulo}
                    onChange={(e) => setForm({...form, titulo: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Subtítulo / Concepto (opcional)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Bloque práctico de la tarde"
                    value={form.subtitulo}
                    onChange={(e) => setForm({...form, subtitulo: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Enlace de Google Drive / Archivo</label>
                  <input 
                    type="url" 
                    required 
                    placeholder="https://drive.google.com/file/d/..."
                    value={form.url_drive}
                    onChange={(e) => setForm({...form, url_drive: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-xs mb-1">Notas / Descripción (opcional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Detalles breves para los alumnos..."
                    value={form.descripcion}
                    onChange={(e) => setForm({...form, descripcion: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setModalAbierto(false)}
                    className="w-full bg-slate-800 text-slate-300 py-2.5 rounded-xl text-xs hover:bg-slate-700 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="w-full bg-amber-500 text-black font-semibold py-2.5 rounded-xl text-xs hover:bg-amber-400 transition cursor-pointer"
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