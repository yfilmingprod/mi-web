import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default async function RodajesPage() {
  // 1. Obtenemos el usuario actual desde Clerk
  const user = await currentUser()

  // 2. SI NO HA INICIADO SESIÓN: Mostramos pantalla elegante de acceso en lugar de dar error
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white font-sans antialiased flex flex-col items-center justify-center p-6 text-center">
        
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-6">
          <Image 
            src="/logo-yfilming.png"
            alt="YFILMING Logo"
            width={70}
            height={70}
            className="mx-auto opacity-80"
          />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 block">
            ÁREA PRIVADA DE PRODUCCIÓN
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Acceso Restringido
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Esta sección contiene órdenes de rodaje, planes de producción y guiones privados. Inicia sesión para verificar los proyectos asignados a tu perfil.
          </p>

          <div className="pt-4 flex flex-col gap-3">
            {/* Botón de Clerk para abrir el login emergente */}
            <SignInButton mode="modal">
              <button className="w-full bg-white text-black font-semibold py-3.5 px-8 rounded-full hover:bg-zinc-200 transition text-sm shadow-xl">
                Iniciar Sesión / Registrarse
              </button>
            </SignInButton>

            <Link 
              href="/" 
              className="text-xs text-zinc-500 hover:text-zinc-300 py-2 transition"
            >
              ← Volver a la portada pública
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 3. SI SÍ ESTÁ LOGUEADO: Sacamos su email principal
  const emailUsuario = user.emailAddresses[0].emailAddress

  // 4. BASE DE DATOS DE ACCESOS
  const todosLosRodajes = [
    {
      id: 'phil-weasley',
      titulo: 'Phil Weasley',
      rol: 'Director & Cámara',
      estado: 'Posproducción',
      accesos: ['yoelmartinezperez@gmail.com', 'info.ap7estudios@gmail.com'], 
      enlace: '/rodajes/phil-weasley'
    },
    {
      id: 'fototaxia',
      titulo: 'Fototaxia & Parpadear',
      rol: 'Cámara & Producción',
      estado: 'Finalizado',
      accesos: ['yoelmartinezperez@gmail.com', 'info.ap7estudios@gmail.com'],
      enlace: '#'
    },
    {
      id: 'frontera',
      titulo: 'Frontera',
      rol: 'Dir. Producción',
      estado: 'Preproducción',
      accesos: ['yoelmartinezperez@gmail.com', 'email-de-barto@gmail.com'],
      enlace: '#'
    }
  ]

  // 5. Filtramos los rodajes donde coincida el email del usuario conectado
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
              Tu cuenta ({emailUsuario}) no tiene acceso a ningún proyecto actualmente. Contacta con dirección de producción si crees que es un error.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}