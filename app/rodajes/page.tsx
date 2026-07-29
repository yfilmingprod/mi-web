import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function RodajesPage() {
  // 1. Obtenemos el usuario actual desde Clerk
  const user = await currentUser()

  // Si no hay usuario logueado, lo mandamos a iniciar sesión
  if (!user) {
    redirect('/sign-in')
  }

  // Sacamos su email principal
  const emailUsuario = user.emailAddresses[0].emailAddress

  // 2. NUESTRA BASE DE DATOS DE ACCESOS (Aquí asignas los permisos)
  const todosLosRodajes = [
    {
      id: 'phil-weasley',
      titulo: 'Phil Weasley',
      rol: 'Director & Cámara',
      estado: 'Posproducción',
      // Cambia estos emails por los reales. Tú debes estar en todos para verlos.
      accesos: ['yoelmartinezperez@gmail.com', 'info.ap7estudios@gmail.com'], 
      enlace: '/proyectos/phil-weasley'
    },
    {
      id: 'fototaxia',
      titulo: 'Fototaxia & Parpadear',
      rol: 'Cámara & Producción',
      estado: 'Finalizado',
      // Ejemplo: Aquí solo tienen acceso tú y Juan Castro
      accesos: ['yoelmartinezperez@gmail.com', 'info.ap7estudios@gmail.com'],
      enlace: '#'
    },
    {
      id: 'frontera',
      titulo: 'Frontera',
      rol: 'Dir. Producción',
      estado: 'Preproducción',
      // Ejemplo: Aquí solo tienen acceso tú y Barto
      accesos: ['yoelmartinezperez@gmail.com', 'email-de-barto@gmail.com'],
      enlace: '#'
    }
  ]

  // 3. LÓGICA MAGICA: Filtramos solo los rodajes donde el email del usuario coincida
  const rodajesPermitidos = todosLosRodajes.filter(rodaje => 
    rodaje.accesos.includes(emailUsuario)
  )

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased pt-28 px-6">
      
      {/* Botón Volver */}
      <div className="max-w-5xl mx-auto mb-12">
        <Link 
          href="/" 
          className="text-zinc-500 hover:text-white text-sm font-semibold tracking-wider uppercase transition flex items-center gap-2"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Cabecera del Panel Privado */}
        <header className="border-b border-zinc-900 pb-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 mb-2 block">
            ÁREA PRIVADA DE PRODUCCIÓN
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Hola, {user.firstName || 'Equipo'}.
          </h1>
          <p className="text-zinc-400 text-lg">
            Estás conectado con <strong className="text-zinc-200">{emailUsuario}</strong>. 
            Aquí tienes acceso a los rodajes asignados a tu perfil.
          </p>
        </header>

        {/* Grid de Proyectos Permitidos */}
        {rodajesPermitidos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rodajesPermitidos.map((rodaje) => (
              <Link 
                key={rodaje.id}
                href={rodaje.enlace}
                className="group bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-500 transition-all block"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest bg-zinc-900 text-zinc-400 px-3 py-1 rounded-full border border-zinc-800">
                    {rodaje.estado}
                  </span>
                  <span className="text-xl">🎬</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                  {rodaje.titulo}
                </h2>
                <p className="text-zinc-500 text-sm mb-8">Rol asignado: {rodaje.rol}</p>
                
                <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-400">
                  <span>Acceso autorizado</span>
                  <span className="text-white font-semibold group-hover:underline">Entrar al workspace →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Mensaje si el usuario no tiene proyectos asignados */
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-12 text-center">
            <span className="text-4xl block mb-4">🔒</span>
            <h3 className="text-xl font-bold text-white mb-2">Sin rodajes asignados</h3>
            <p className="text-zinc-500 text-sm">
              Tu cuenta no tiene acceso a ningún proyecto actualmente. Contacta con dirección de producción si crees que es un error.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}