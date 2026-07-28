'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function PhilWeasleyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      
      {/* Botón Volver Flotante */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="bg-black/60 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2"
        >
          ← Volver
        </Link>
      </div>

      {/* 1. HERO ESTILO APPLE - PORTADA IMPACTO A PANTALLA COMPLETA */}
      <section className="relative h-screen w-full flex items-end justify-start p-8 sm:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/phil-weasley/portada.jpg"
            alt="Phil Weasley Portada"
            fill
            className="object-cover object-center opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3.5 py-1 rounded-full backdrop-blur-md">
              Western · Tabernas
            </span>
            <span className="text-xs text-zinc-400 font-semibold tracking-wide">Desierto de Almería</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white leading-none">
            Phil Weasley
          </h1>

          <p className="text-zinc-300 text-xl sm:text-2xl max-w-2xl font-light leading-relaxed">
            Un retrato crudo sobre la frontera, la pérdida y la supervivencia grabado en el paisaje cinematográfico más exigente de Europa.
          </p>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN EDITORIAL & FICHA TÉCNICA */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-b border-zinc-900">
        <div className="md:col-span-8 space-y-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            VISIÓN Y CONCEPTO
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Reinventando la mística del desierto.
          </h2>
          <p className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed">
            <strong>Phil Weasley</strong> nace del deseo de explorar el género western desde una perspectiva más íntima y atmosférica. En lugar de centrarnos únicamente en el arquetipo clásico del tiroteo, la narrativa indaga en la soledad y la dureza del entorno desértico.
          </p>
        </div>

        <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6 text-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block border-b border-zinc-800 pb-3">
            Ficha del Proyecto
          </span>
          <div>
            <span className="text-zinc-500 block text-xs uppercase font-semibold">Estado</span>
            <span className="text-white font-semibold text-base">Posproducción / Etalonaje</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs uppercase font-semibold">Localización</span>
            <span className="text-white font-semibold text-base">Tabernas (Almería)</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs uppercase font-semibold">Dirección</span>
            <span className="text-white font-semibold text-base">Barto Muñoz</span>
          </div>
        </div>
      </section>

      {/* 3. FOTOGRAMA PANORÁMICO 1 (FOTO 1 A PANTALLA COMPLETA) */}
      <section className="relative w-full h-[80vh] my-12 overflow-hidden">
        <Image
          src="/phil-weasley/foto-1.jpg"
          alt="Rodaje Phil Weasley"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className="absolute bottom-10 left-8 sm:left-20 max-w-xl">
          <span className="text-xs uppercase tracking-widest font-bold text-zinc-400 block mb-2">01 / El Terreno</span>
          <p className="text-lg text-white font-medium">La escala natural de los cañones de Tabernas definió la composición de cada encuadre.</p>
        </div>
      </section>

      {/* 4. BLOQUE EDITORIAL DE 2 COLUMNAS (TEXTO + GRID FOTOS 2 Y 3) */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            DESAFÍO TÉCNICO & LUZ
          </span>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Luz natural sin concesiones.
          </h3>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Elegir Almería supuso enfrentarse a dinámicas de iluminación solar extremas. Trabajar con perfiles cromáticos Log y ajustar el rendimiento óptico nos permitió preservar el detalle en las altas luces de la arena sin perder textura en las sombras.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-2.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 mt-8">
            <Image src="/phil-weasley/foto-3.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
        </div>
      </section>

      {/* 5. GRID ASIMÉTRICO ESTILO BENTO (FOTOS 4 A 8) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative h-[450px] rounded-3xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-4.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="relative h-[450px] rounded-3xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-5.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="relative h-[350px] rounded-3xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-6.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="relative h-[350px] rounded-3xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-7.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="relative h-[350px] rounded-3xl overflow-hidden border border-zinc-800">
            <Image src="/phil-weasley/foto-8.jpg" alt="" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </section>

      {/* 6. BANNER A PANTALLA COMPLETA CON CITA (FOTO 9) */}
      <section className="relative w-full min-h-[70vh] my-20 flex items-center justify-center text-center p-8 overflow-hidden">
        <Image src="/phil-weasley/foto-9.jpg" alt="" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <p className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight italic">
            «El western no es solo acción; es la mirada silenciosa entre el personaje y la inmensidad del horizonte.»
          </p>
          <span className="text-xs uppercase tracking-widest text-zinc-400 block font-semibold">
            — Notas de Dirección
          </span>
        </div>
      </section>

      {/* 7. MOSAICO EDITORIAL MASONRY CON EL RESTO DE FOTOS (FOTOS 10 A 30) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            GALERÍA DE PROCESO
          </span>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            El rodaje fotograma a fotograma.
          </h3>
        </div>

        {/* Mosaico multinivel estilo revista de cine */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {Array.from({ length: 21 }, (_, index) => {
            const numeroFoto = index + 10 // Desde la foto-10 a la foto-30
            return (
              <div 
                key={numeroFoto} 
                className="relative rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-500 transition-all duration-500 group break-inside-avoid"
              >
                <Image
                  src={`/phil-weasley/foto-${numeroFoto}.jpg`}
                  alt={`Phil Weasley Rodaje ${numeroFoto}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                  <span className="text-xs text-white font-mono uppercase tracking-widest">
                    Fotograma #{numeroFoto}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>Phil Weasley · Producido por YFILMING en Tabernas, Almería.</p>
      </footer>

    </div>
  )
}