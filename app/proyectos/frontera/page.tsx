'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MonitorPlay, 
  Calendar, 
  MapPin, 
  Film, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  Clapperboard,
  Mail,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'Preproducción', semanas: 2 },
  { name: 'Rodaje (1 Jornada)', semanas: 0.5 },
  { name: 'Postproducción', semanas: 5 },
];

const TECHNICAL_CREW = [
  { role: 'Dirección', name: 'Paola García Costas' },
  { role: 'Dirección de Fotografía', name: 'Fernando Fernández' },
  { role: 'Director de Producción & Ayte. Dirección', name: 'Yoel Martínez' },
  { role: 'Guion Original', name: 'Ana Piedra' },
  { role: 'Música Original', name: 'Carlos M. Jara' },
  { role: 'Montaje', name: 'Jimena Valero' },
  { role: 'Maquillaje y Caracterización', name: 'Lucía Sorroche' },
  { role: 'Sonido Directo', name: 'Eve Concilio' },
  { role: 'Postproducción de Sonido', name: 'Curros Burguillos' },
  { role: 'Ayudante de Producción', name: 'Lorena González' },
];

function AutoCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full bg-zinc-950">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`Referencia visual ${idx + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-90 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
}

function TabButton({ 
  id, 
  label, 
  icon: Icon, 
  activeTab, 
  onClick 
}: { 
  id: string; 
  label: string; 
  icon: any; 
  activeTab: string; 
  onClick: (id: string) => void;
}) {
  const isActive = activeTab === id;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 ${
        isActive
          ? 'border-white text-white bg-zinc-900/60'
          : 'border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/30'
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function ImageCarousel({ images, altText }: { images: string[]; altText: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-80 flex items-center justify-center bg-zinc-950 border-b border-zinc-800 group overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`${altText} - Imagen ${currentIndex + 1}`}
        className="max-w-full max-h-full object-contain transition-opacity duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/75 p-2 rounded-full text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente imagen"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/75 p-2 rounded-full text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 flex gap-1.5">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-zinc-700 w-1.5'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FronteraPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* BOTÓN VOLVER */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Volver a Proyectos
        </Link>
      </div>

      {/* HERO SECTION */}
      <header className="relative h-[38vh] min-h-[300px] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: 'url("/frontera/portada.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em] block mb-2">
            Dossier de Producción
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-white">
            FRONTERA
          </h1>
          <p className="text-zinc-400 italic text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
            "Una historia mínima sobre dos personas detenidas ante un mismo límite."
          </p>
        </div>
      </header>

      {/* KPI BAR */}
      <section className="bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Clock className="text-zinc-400 shrink-0" size={18} />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Duración</div>
              <div className="text-sm font-semibold text-zinc-200">4 Minutos</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MonitorPlay className="text-zinc-400 shrink-0" size={18} />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Formato</div>
              <div className="text-sm font-semibold text-zinc-200">2.39:1 Panavision</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="text-zinc-400 shrink-0" size={18} />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Rodaje</div>
              <div className="text-sm font-semibold text-zinc-200">1 Jornada</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-zinc-400 shrink-0" size={18} />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Localización</div>
              <div className="text-sm font-semibold text-zinc-200">Almería / Tabernas</div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 mt-8">
        <nav role="tablist" className="flex flex-wrap justify-center border-b border-zinc-900 mb-10">
          <TabButton id="general" label="Visión General" icon={Film} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="casting" label="El Duelo (Casting)" icon={Users} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="equipo" label="Equipo Técnico" icon={Clapperboard} activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="plan" label="Plan Operativo" icon={BarChart3} activeTab={activeTab} onClick={setActiveTab} />
        </nav>

        <div className="pb-20">
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-14">
              <section className="max-w-3xl mx-auto space-y-4 text-zinc-400 text-base leading-relaxed">
                <h2 className="text-xs uppercase tracking-widest font-mono text-zinc-500 text-center mb-6">
                  Sinopsis Argumental
                </h2>
                <p>
                  En un paisaje abierto, hostil y dominado por un silencio sepulcral, dos personas se ven obligadas a detenerse en seco frente a un límite invisible. En el tejido del relato, este umbral se materializa en la sobriedad de un muro bajo de piedra o en el lecho agrietado de un riachuelo completamente seco.
                </p>
                <p>
                  No se miran al principio. No saben cómo articular en palabras precisas el dolor crónico que llevan dentro. Entre ambos existe un pasado oscuro que se niegan a nombrar, una herida profundamente compartida y una decisión crucial completamente pendiente.
                </p>
              </section>

              <blockquote className="max-w-3xl mx-auto p-8 rounded-2xl border border-zinc-900 bg-zinc-950 text-center">
                <h3 className="text-xs uppercase tracking-widest font-mono text-zinc-500 mb-3">Nota de Intención</h3>
                <p className="text-zinc-300 italic text-base md:text-lg leading-relaxed mb-4">
                  "FRONTERA nace de la extrema dificultad de afrontar una decisión drástica cuando esta no solo te define a ti, sino que afecta de manera irreversible a la persona que tienes delante. El conflicto real no es lo que ocurre fuera, sino lo que no se atreven a decirse."
                </p>
                <cite className="not-italic text-xs font-mono tracking-widest text-zinc-500 uppercase">
                  — Juan G. Verdú (Creador)
                </cite>
              </blockquote>

              <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-mono text-zinc-500 mb-4">
                    Dispositivo Narrativo
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    El tono del cortometraje es contenido, sobrio e introspectivo. Sin artificios ni explicaciones sobreexpuestas, la tensión se construye mediante elementos mínimos:
                  </p>
                  <ul className="space-y-3 text-xs tracking-wide">
                    {[
                      'Miradas esquivas y sostenidas frente al vacío',
                      'Distancia espacial como termómetro dramático',
                      'Paisaje sonoro orgánico: viento árido y respiración',
                      'Montaje de ritmo pausado y cortes por eje',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-300">
                        <ChevronRight size={14} className="text-zinc-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-64 rounded-2xl border border-zinc-900 overflow-hidden bg-zinc-950">
                  <AutoCarousel images={['/frontera/paisaje1.jpg', '/frontera/paisaje2.jpg']} />
                </div>
              </section>
            </div>
          )}

          {/* TAB: CASTING */}
          {activeTab === 'casting' && (
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <article className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden flex flex-col justify-between">
                <ImageCarousel 
                  images={['/frontera/actor1.jpg', '/frontera/actor2.jpg', '/frontera/actor3.jpg']} 
                  altText="Juan G. Verdú" 
                />
                <div className="p-6">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">
                    Personaje 1 / Creador
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Juan G. Verdú</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Un hombre marcado por la culpa. Su corporalidad rígida comunica el peso antes que el diálogo. Carga con una decisión pasada no resuelta; su conflicto no consiste en cruzar físicamente la línea, sino en sostener la presencia del otro.
                  </p>
                </div>
              </article>

              <article className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden flex flex-col justify-between">
                <ImageCarousel 
                  images={['/frontera/actriz1.jpg', '/frontera/actriz3.jpg', '/frontera/actriz5.jpg']} 
                  altText="Veronica Gregory" 
                />
                <div className="p-6">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">
                    Personaje 2
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Veronica Gregory</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    La contraparte firme que sostiene la mirada. Su energía no es de confrontación activa, sino de resistencia frontal. Es el personaje que fuerza la resolución del silencio, obligando a desarmar la huida defensiva de su acompañante.
                  </p>
                </div>
              </article>
            </div>
          )}

          {/* TAB: EQUIPO TÉCNICO */}
          {activeTab === 'equipo' && (
            <section className="max-w-3xl mx-auto">
              <p className="text-center text-zinc-400 text-sm mb-8 italic">
                Estructura de producción dimensionada para un rodaje controlado con cámara cinematográfica y foco en la atmósfera.
              </p>
              
              <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden">
                <div className="py-4 px-6 bg-zinc-900/50 border-b border-zinc-900">
                  <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                    Ficha Técnica de Cabeceras
                  </span>
                </div>
                
                <div className="divide-y divide-zinc-900 px-6">
                  {TECHNICAL_CREW.map(({ role, name }, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5">
                      <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">{role}</span>
                      <span className="text-sm font-semibold text-zinc-200 mt-0.5 sm:mt-0">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB: PLAN */}
          {activeTab === 'plan' && (
            <section className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950">
                  <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-1">Preproducción</div>
                  <div className="text-2xl font-bold text-white">2 semanas</div>
                </div>
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950">
                  <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-1">Rodaje</div>
                  <div className="text-2xl font-bold text-white">1 jornada</div>
                </div>
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950">
                  <div className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-1">Postproducción</div>
                  <div className="text-2xl font-bold text-white">4 - 6 semanas</div>
                </div>
              </div>

              <div className="h-64 w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" stroke="#71717a" tick={{ fill: '#71717a', fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" stroke="#71717a" tick={{ fill: '#a1a1aa', fontSize: 11 }} width={140} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#f4f4f5', fontSize: '12px' }}
                    />
                    <Bar dataKey="semanas" fill="#e4e4e7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* ACCIONES Y CONTACTO */}
          <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
            <div>PROYECTO SELECCIONADO PARA FICAL 2026</div>
            <div className="flex gap-4">
              <a 
                href="mailto:contacto@yfilming.com" 
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Mail size={14} /> Contactar Producción
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
