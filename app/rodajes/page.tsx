'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Rodaje {
  id: string;
  titulo: string;
  rol: string;
  estado: string;
  fecha: string;
  detalles: string;
  enlace: string;
}

interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  qty: number;
  price: number;
}

const PROYECTOS_INICIALES: Rodaje[] = [
  {
    id: '1',
    titulo: 'Phil Weasley',
    rol: 'Director & Cámara',
    estado: 'POSTPRODUCCIÓN',
    fecha: '2026',
    detalles: 'Etalonaje de color, diseño de sonido y masterización final.',
    enlace: '/rodajes/phil-weasley'
  },
  {
    id: '2',
    titulo: 'Amor Procesado',
    rol: 'Dirección',
    estado: 'PREPRODUCCIÓN',
    fecha: '2026',
    detalles: 'Plan de rodaje de exteriores y secuencias nocturnas en preparación.',
    enlace: '/rodajes/amor-procesado'
  },
  {
    id: '3',
    titulo: 'Miel',
    rol: 'Camera Man & Ay. Dirección',
    estado: 'POSTPRODUCCIÓN',
    fecha: '2026',
    detalles: 'Edición de montaje y sincronización de pistas de audio.',
    enlace: '/rodajes/miel'
  },
  {
    id: '4',
    titulo: 'Taller de Verano',
    rol: 'Dirección / Formación',
    estado: 'EN RODAJE',
    fecha: '2026',
    detalles: 'Módulo formativo intensivo de 5 jornadas y material de estudio.',
    enlace: '/rodajes/taller-verano'
  },
  {
    id: '5',
    titulo: 'Frontera',
    rol: 'Dir. Producción',
    estado: 'PREPRODUCCIÓN',
    fecha: '2026',
    detalles: 'Planificación logística, contratos y permisos de localización.',
    enlace: '#'
  },
  {
    id: '6',
    titulo: 'Fototaxia & Parpadear',
    rol: 'Cámara & Producción',
    estado: 'FINALIZADO',
    fecha: '2026',
    detalles: 'Copias maestras entregadas y material de archivo preservado.',
    enlace: '#'
  }
];

export default function RodajesPage() {
  const [vistaActual, setVistaActual] = useState<'rodajes' | 'facturas'>('rodajes');

  // Datos del perfil activo
  const usuario = {
    nombre: 'Yoel Martínez Pérez',
    email: 'yoelmartinezperez@gmail.com',
    esAdmin: true
  };

  // Parámetros de la factura o presupuesto
  const [docType, setDocType] = useState<'factura' | 'proforma'>('factura');
  const [numDoc, setNumDoc] = useState('FAC-2026-001');
  const [fechaEmision, setFechaEmision] = useState('11/09/2026');
  const [vencimiento, setVencimiento] = useState('30 días / Contado');

  // Parámetros fiscales
  const [applyIrpf, setApplyIrpf] = useState(true);
  const [irpfPercent, setIrpfPercent] = useState<number>(7);
  const [ivaPercent, setIvaPercent] = useState<number>(21);

  // Datos del Emisor (Yoel)
  const [emisorNombre, setEmisorNombre] = useState('Yoel Martínez Pérez');
  const [emisorNif, setEmisorNif] = useState('45604219A');
  const [emisorDireccion, setEmisorDireccion] = useState('Camino del palmeral 46, nº7');
  const [emisorTelefono, setEmisorTelefono] = useState('606 44 87 80');
  const [emisorEmail, setEmisorEmail] = useState('yfilmingprod@gmail.com');
  const [iban, setIban] = useState('ES28 0049 1126 8628 1006 7481');

  // Datos del Cliente Receptor
  const [clienteNombre, setClienteNombre] = useState('Productora Audiovisual S.L.');
  const [clienteCif, setClienteCif] = useState('B98765432');
  const [clienteDireccion, setClienteDireccion] = useState('Avenida de la Industria, 14');
  const [clienteCiudad, setClienteCiudad] = useState('46001 València, España');
  const [clienteEmail, setClienteEmail] = useState('contacto@productora.com');

  // Conceptos facturables
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      title: 'Servicio de filmación en exteriores - Jornada 1',
      description: 'Cobertura con cámara de cine, ópticas fijas y monitorización técnica.',
      qty: 1,
      price: 103.31
    },
    {
      id: '2',
      title: 'Servicio de filmación en exteriores - Jornada 2',
      description: 'Grabación de secuencias diurnas y entrega de brutos respaldados.',
      qty: 1,
      price: 103.31
    },
    {
      id: '3',
      title: 'Montaje, etalonaje y diseño sonoro final',
      description: 'Postproducción completa en DaVinci Resolve con 2 revisiones incluidas.',
      qty: 1,
      price: 206.60
    }
  ]);

  const { baseImponible, cuotaIva, retencionIrpf, totalLiquido } = useMemo(() => {
    const base = items.reduce(
      (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
      0
    );
    const iva = base * (ivaPercent / 100);
    const irpf = applyIrpf ? base * (irpfPercent / 100) : 0;
    const total = base + iva - irpf;
    return {
      baseImponible: base,
      cuotaIva: iva,
      retencionIrpf: irpf,
      totalLiquido: total
    };
  }, [items, ivaPercent, applyIrpf, irpfPercent]);

  const formatEuro = (val: number) => {
    return val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  };

  const handleDocTypeChange = (newType: 'factura' | 'proforma') => {
    setDocType(newType);
    if (newType === 'proforma') {
      setNumDoc((prev) => (prev.startsWith('FAC-') ? prev.replace('FAC-', 'PRO-') : prev.startsWith('PRO-') ? prev : `PRO-${prev}`));
    } else {
      setNumDoc((prev) => (prev.startsWith('PRO-') ? prev.replace('PRO-', 'FAC-') : prev.startsWith('FAC-') ? prev : `FAC-${prev}`));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      title: 'Nuevo concepto de servicio audiovisual',
      description: 'Descripción detallada de la jornada o tarea técnica realizada...',
      qty: 1,
      price: 150.00
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-400">
      
      {}
      {/* Barra de navegación superior */}
      <header className="no-print sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 via-yellow-500/10 to-transparent border border-yellow-500/30 flex items-center justify-center font-black text-yellow-500 text-sm shadow-inner">
              YF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-yellow-500">
                  YFILMING WORKSPACE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Activo
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Control de Producción & Facturación</span>
            </div>
          </div>

          <nav className="flex items-center bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl text-xs font-semibold shadow-2xl">
            <button
              type="button"
              onClick={() => setVistaActual('rodajes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                vistaActual === 'rodajes'
                  ? 'bg-yellow-500 text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🎬</span>
              <span>Rodajes & Proyectos</span>
            </button>
            <button
              type="button"
              onClick={() => setVistaActual('facturas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                vistaActual === 'facturas'
                  ? 'bg-yellow-500 text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🧾</span>
              <span>Generador de Facturas</span>
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            <span className="text-zinc-300 font-mono text-[11px]">{usuario.email}</span>
          </div>

        </div>
      </header>

      {}
      {/* VISTA 1: TABLERO DE RODAJES */}
      {vistaActual === 'rodajes' && (
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 p-6 md:p-10 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/10 blur-[130px] pointer-events-none rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">PANEL PRIVADO DE CONTROL</span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">Hola, Yoel.</h1>
                <p className="text-zinc-400 max-w-2xl text-sm md:text-base">
                  Supervisa el estado de tus producciones activas, accede al desglose de proyectos o genera presupuestos y facturas oficiales listas para descargar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setVistaActual('facturas')}
                className="cursor-pointer group flex items-center gap-3 px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                <span>Nueva Factura / Proforma</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <span className="text-zinc-400 text-xs block">Proyectos Activos</span>
                <span className="text-2xl font-black text-white mt-1 block">5</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <span className="text-zinc-400 text-xs block">En Postproducción</span>
                <span className="text-2xl font-black text-yellow-400 mt-1 block">2</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <span className="text-zinc-400 text-xs block">En Preproducción</span>
                <span className="text-2xl font-black text-sky-400 mt-1 block">2</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <span className="text-zinc-400 text-xs block">Finalizados</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">1</span>
              </div>
            </div>
          </div>

          {/* Módulo destacado: Taller de Verano */}
          <div className="bg-zinc-950 border border-yellow-500/30 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">MÓDULO DE FORMACIÓN</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    5 Jornadas
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">Taller de Verano: Plan Diario</h2>
              </div>
              <Link
                href="/rodajes/taller-verano"
                className="text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
              >
                Abrir Workspace Completo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { dia: 'DÍA 1', icono: '🎬', titulo: 'Iniciación & Guion', desc: 'Lectura técnica, desglose de personajes y desglose de escenas.' },
                { dia: 'DÍA 2', icono: '💡', titulo: 'Interiores & Luz', desc: 'Esquemas de 3 puntos de luz, temperatura de color y sonido directo.' },
                { dia: 'DÍA 3', icono: '🎥', titulo: 'Exteriores', desc: 'Cámara en mano, ópticas anamórficas y control de luz natural.' },
                { dia: 'DÍA 4', icono: '🔥', titulo: 'Acción & Ritmo', desc: 'Planos secuencia complejos, coreografía de cámara y marcas de foco.' },
                { dia: 'DÍA 5', icono: '🏆', titulo: 'Montaje & Estreno', desc: 'Etalonaje en DaVinci, diseño sonoro y visionado de piezas finales.' }
              ].map((j, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800 hover:border-yellow-500/50 transition-all rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-extrabold text-yellow-400">{j.dia}</span>
                      <span className="text-base">{j.icono}</span>
                    </div>
                    <h3 className="font-bold text-white text-sm">{j.titulo}</h3>
                    <p className="text-zinc-400 text-xs mt-1">{j.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span>Drive listo</span>
                    <Link href="/rodajes/taller-verano" className="text-yellow-400 font-semibold hover:underline">
                      Ver docs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid de Proyectos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Filmografía & Rodajes Oficiales</h2>
              <span className="text-xs text-zinc-500">Área Privada YFILMING</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROYECTOS_INICIALES.map((rodaje) => (
                <div
                  key={rodaje.id}
                  className="bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 rounded-3xl p-6 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      {rodaje.estado}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{rodaje.fecha}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{rodaje.titulo}</h3>
                    <p className="text-xs font-medium text-yellow-500/90 mt-0.5">Rol: {rodaje.rol}</p>
                    <p className="text-xs text-zinc-400 mt-2">{rodaje.detalles}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Workspace privado</span>
                    {rodaje.enlace !== '#' ? (
                      <Link href={rodaje.enlace} className="text-yellow-400 font-bold hover:underline">
                        Acceder →
                      </Link>
                    ) : (
                      <span className="text-zinc-600">En archivo</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {}
      {/* VISTA 2: GENERADOR DE FACTURAS Y PROFORMAS */}
      {vistaActual === 'facturas' && (
        <div className="bg-zinc-900/40 min-h-[calc(100vh-65px)] p-4 md:p-8 space-y-6">
          
          <style dangerouslySetInnerHTML={{
            __html: `
              @media print {
                body {
                  background: #ffffff !important;
                  color: #0f172a !important;
                  padding: 0 !important;
                }
                header, .no-print {
                  display: none !important;
                }
                .invoice-sheet {
                  box-shadow: none !important;
                  border: none !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                input, textarea, select {
                  border: none !important;
                  background: transparent !important;
                }
              }
              input[type=number]::-webkit-inner-spin-button,
              input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type=number] {
                -moz-appearance: textfield;
              }
            `
          }} />

          {/* Barra de herramientas (No se imprime) */}
          <div className="no-print bg-zinc-950 border border-zinc-800 rounded-2xl p-4 md:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto">
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVistaActual('rodajes')}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-zinc-800 transition cursor-pointer"
              >
                <span>←</span>
                <span>Volver a Rodajes</span>
              </button>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-white">Generador Audiovisual</span>
                <span className="text-[11px] text-zinc-500 block">Cálculos automáticos en tiempo real</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              
              {/* Selector de tipo de documento */}
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <span className="text-zinc-400 font-medium">Documento:</span>
                <select
                  value={docType}
                  onChange={(e) => handleDocTypeChange(e.target.value as 'factura' | 'proforma')}
                  className="bg-zinc-950 text-white font-bold rounded px-2 py-1 outline-none border border-zinc-700 cursor-pointer"
                >
                  <option value="factura">Factura Oficial</option>
                  <option value="proforma">Factura Proforma</option>
                </select>
              </div>

              {/* Selector IRPF */}
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer select-none text-zinc-300 font-medium">
                  <input
                    type="checkbox"
                    checked={applyIrpf}
                    onChange={(e) => setApplyIrpf(e.target.checked)}
                    className="rounded text-yellow-500 focus:ring-0 cursor-pointer"
                  />
                  <span>IRPF</span>
                </label>
                <select
                  value={irpfPercent}
                  onChange={(e) => setIrpfPercent(Number(e.target.value))}
                  disabled={!applyIrpf}
                  className={`bg-zinc-950 text-white font-bold rounded px-1.5 py-1 outline-none border border-zinc-700 cursor-pointer ${
                    !applyIrpf ? 'opacity-40' : ''
                  }`}
                >
                  <option value={7}>7% (Nuevo Autónomo)</option>
                  <option value={15}>15% (General)</option>
                  <option value={19}>19%</option>
                </select>
              </div>

              {/* Selector IVA */}
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <span className="text-zinc-400 font-medium">IVA:</span>
                <select
                  value={ivaPercent}
                  onChange={(e) => setIvaPercent(Number(e.target.value))}
                  className="bg-zinc-950 text-white font-bold rounded px-2 py-1 outline-none border border-zinc-700 cursor-pointer"
                >
                  <option value={21}>21%</option>
                  <option value={10}>10%</option>
                  <option value={4}>4%</option>
                  <option value={0}>0% (Exento)</option>
                </select>
              </div>

              {/* Botón Imprimir / PDF */}
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-yellow-500/20 transition active:scale-95 cursor-pointer"
              >
                <span>🖨️</span>
                <span>Descargar en PDF</span>
              </button>

            </div>
          </div>

          {}
          {/* Hoja A4 Imprimible */}
          <div className="invoice-sheet bg-white text-slate-800 rounded-3xl p-8 md:p-14 shadow-2xl border border-zinc-300 max-w-4xl mx-auto space-y-8 font-sans">
            
            {/* Aviso informativo de Proforma */}
            {docType === 'proforma' && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                <span className="text-base">ℹ️</span>
                <span><strong>DOCUMENTO INFORMATIVO:</strong> Esta factura proforma no tiene validez fiscal ni contable (Art. 6 RD 1619/2012). Se emite a efectos presupuestarios previos al inicio del servicio.</span>
              </div>
            )}

            {/* Cabecera */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600 block">
                  YFILMING CINEMATOGRAPHY
                </span>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-1">
                  {docType === 'proforma' ? 'FACTURA PROFORMA' : 'FACTURA'}
                </h2>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  {docType === 'proforma' ? 'Presupuesto previo vinculante' : 'Servicios Audiovisuales Profesionales'}
                </p>
              </div>

              <div className="space-y-1 text-sm text-left md:text-right">
                <div className="flex items-center md:justify-end gap-2">
                  <span className="font-bold text-slate-700">
                    {docType === 'proforma' ? 'Nº Proforma:' : 'Nº Factura:'}
                  </span>
                  <input
                    type="text"
                    value={numDoc}
                    onChange={(e) => setNumDoc(e.target.value)}
                    className="font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 w-36 text-left md:text-right outline-none"
                  />
                </div>
                <div className="flex items-center md:justify-end gap-2">
                  <span className="text-slate-600">Fecha de Emisión:</span>
                  <input
                    type="text"
                    value={fechaEmision}
                    onChange={(e) => setFechaEmision(e.target.value)}
                    className="text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 w-32 text-left md:text-right outline-none"
                  />
                </div>
                <div className="flex items-center md:justify-end gap-2">
                  <span className="text-slate-600">Vencimiento:</span>
                  <input
                    type="text"
                    value={vencimiento}
                    onChange={(e) => setVencimiento(e.target.value)}
                    className="text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 w-36 text-left md:text-right outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Datos Emisor y Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              
              {/* Emisor (Yoel) */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Emisor (Tus Datos)
                </span>
                <input
                  type="text"
                  value={emisorNombre}
                  onChange={(e) => setEmisorNombre(e.target.value)}
                  className="w-full font-bold text-slate-900 bg-transparent outline-none text-base"
                />
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">NIF:</span>
                  <input
                    type="text"
                    value={emisorNif}
                    onChange={(e) => setEmisorNif(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Dirección:</span>
                  <input
                    type="text"
                    value={emisorDireccion}
                    onChange={(e) => setEmisorDireccion(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Teléfono:</span>
                  <input
                    type="text"
                    value={emisorTelefono}
                    onChange={(e) => setEmisorTelefono(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Email:</span>
                  <input
                    type="text"
                    value={emisorEmail}
                    onChange={(e) => setEmisorEmail(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
              </div>

              {/* Cliente Receptor */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Cliente / Receptor
                </span>
                <input
                  type="text"
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                  className="w-full font-bold text-slate-900 bg-transparent outline-none text-base"
                  placeholder="Nombre de la Empresa o Cliente"
                />
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">CIF/NIF:</span>
                  <input
                    type="text"
                    value={clienteCif}
                    onChange={(e) => setClienteCif(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full font-mono"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Dirección:</span>
                  <input
                    type="text"
                    value={clienteDireccion}
                    onChange={(e) => setClienteDireccion(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Ciudad:</span>
                  <input
                    type="text"
                    value={clienteCiudad}
                    onChange={(e) => setClienteCiudad(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
                <p className="text-xs text-slate-600 flex gap-2">
                  <span className="w-16 font-medium text-slate-400">Email:</span>
                  <input
                    type="text"
                    value={clienteEmail}
                    onChange={(e) => setClienteEmail(e.target.value)}
                    className="bg-transparent text-slate-800 outline-none w-full"
                  />
                </p>
              </div>

            </div>

            {}
            {/* Tabla de Conceptos */}
            <div className="space-y-3">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-2">Descripción del Servicio</th>
                    <th className="py-3 px-2 text-center w-20">Cant.</th>
                    <th className="py-3 px-2 text-right w-28">Precio Base</th>
                    <th className="py-3 px-2 text-right w-28">Total</th>
                    <th className="py-3 px-1 text-center w-8 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {items.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 transition">
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="font-bold text-slate-900 bg-transparent w-full outline-none"
                        />
                        <textarea
                          rows={1}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="text-xs text-slate-500 bg-transparent w-full outline-none resize-none mt-0.5"
                        />
                      </td>
                      <td className="py-3 px-2 text-center align-top">
                        <input
                          type="number"
                          step="any"
                          min="0"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                          className="w-16 text-center font-mono bg-slate-50 border border-slate-200 rounded px-1 py-1 outline-none"
                        />
                      </td>
                      <td className="py-3 px-2 text-right align-top">
                        <div className="flex items-center justify-end gap-1 font-mono">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-20 text-right bg-slate-50 border border-slate-200 rounded px-1 py-1 outline-none"
                          />
                          <span className="text-xs text-slate-400">€</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right align-top font-mono font-bold text-slate-900">
                        {formatEuro((Number(item.qty) || 0) * (Number(item.price) || 0))}
                      </td>
                      <td className="py-3 px-1 text-center align-top no-print">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-300 hover:text-red-500 transition font-bold px-1.5 py-0.5 rounded cursor-pointer"
                          title="Eliminar concepto"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="no-print pt-2">
                <button
                  type="button"
                  onClick={addItem}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>+</span>
                  <span>Añadir concepto / servicio</span>
                </button>
              </div>
            </div>

            {}
            {/* Totales y Datos Bancarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  Forma de Pago
                </span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5 text-slate-700">
                  <p><strong className="text-slate-900">Método:</strong> Transferencia Bancaria</p>
                  <p><strong className="text-slate-900">Titular:</strong> {emisorNombre}</p>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900">IBAN:</strong>
                    <input
                      type="text"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      className="font-mono text-slate-900 bg-transparent outline-none w-full"
                    />
                  </div>
                  <p>
                    <strong className="text-slate-900">Concepto:</strong>{' '}
                    <span className="text-yellow-700 font-mono font-bold">
                      {docType === 'proforma' ? `Proforma ${numDoc}` : `Factura ${numDoc}`}
                    </span>
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic leading-relaxed">
                  * Los derechos de explotación y uso del material quedan cedidos tras el abono íntegro de la factura.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 text-slate-600">
                  <span>Base Imponible:</span>
                  <span className="font-mono font-semibold text-slate-900">{formatEuro(baseImponible)}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-600">
                  <span>IVA ({ivaPercent}%):</span>
                  <span className="font-mono font-semibold text-slate-900">+ {formatEuro(cuotaIva)}</span>
                </div>
                {applyIrpf && (
                  <div className="flex justify-between py-1 text-red-600">
                    <span>Retención IRPF (-{irpfPercent}%):</span>
                    <span className="font-mono font-semibold">- {formatEuro(retencionIrpf)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-slate-900 text-slate-900 mt-2">
                  <span className="text-base font-black">Total a Percibir:</span>
                  <span className="text-xl font-black font-mono text-slate-950">{formatEuro(totalLiquido)}</span>
                </div>
              </div>

            </div>

            {/* Pie Legal */}
            <footer className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
              <p>Factura emitida de conformidad con el Real Decreto 1619/2012.</p>
            </footer>

          </div>

        </div>
      )}

    </div>
  );
}