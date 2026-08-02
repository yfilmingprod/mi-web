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

// Tu email para darte acceso de Administrador / Edición
const ADMIN_EMAIL = "yoelmartinezperez@gmail.com"

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
  const [cargando, setCargando] = useState(true)

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
    setCargando(true)
    const { data, error } = await supabase
      .from('taller_recursos')
      .select('*')
      .eq('proyecto_slug', 'taller-verano')
      .order('created_at', { ascending: true })

    if (!error && data) {
      setRecursos(data)
    }
    setCargando(false)
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

  // Convertir URL compartida de Drive a URL incrustable
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

  const esAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL

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
                                className="text-xs text-red-400/70 hover:text-red-400 transition"
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