import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'

export default async function RodajesPage() {
  const user = await currentUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold">Acceso Restringido</h1>
        <SignInButton mode="modal">
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-bold">Iniciar Sesión</button>
        </SignInButton>
      </div>
    )
  }

  const emailUsuario = user.emailAddresses[0].emailAddress

  // 1. Realizamos la consulta capturando el error explícito
  const { data: todosLosRodajes, error: errorSupabase } = await supabase
    .from('rodajes')
    .select('*')

  // 2. Comprobamos las variables en tiempo de ejecución del servidor
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? "CONFIGURADA ✅" : "FALTA ❌"
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "CONFIGURADA ✅" : "FALTA ❌"

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono text-sm pt-28 max-w-4xl mx-auto space-y-6">
      <div className="border border-yellow-500/30 bg-yellow-500/10 p-4 rounded-xl">
        <h1 className="text-xl font-bold text-yellow-500 mb-2">⚡ RENDER DE DIAGNÓSTICO DIRECTO</h1>
        <p><strong>Usuario conectado:</strong> {emailUsuario}</p>
        <p><strong>Variable URL:</strong> {envUrl}</p>
        <p><strong>Variable ANON KEY:</strong> {envKey}</p>
      </div>

      <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl space-y-2">
        <h2 className="text-lg font-bold text-white">Respuesta de Supabase:</h2>
        <p><strong>Error de Supabase:</strong> {errorSupabase ? JSON.stringify(errorSupabase, null, 2) : "Ninguno (null)"}</p>
        <p><strong>Cantidad de filas devueltas:</strong> {todosLosRodajes ? todosLosRodajes.length : "null"}</p>
      </div>

      <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-2">Datos RAW de la tabla "rodajes":</h2>
        <pre className="text-green-400 bg-black p-4 rounded border border-zinc-900 overflow-x-auto">
          {JSON.stringify(todosLosRodajes, null, 2)}
        </pre>
      </div>

      <Link href="/" className="inline-block text-zinc-500 hover:text-white mt-4">← Volver al inicio</Link>
    </div>
  )
}