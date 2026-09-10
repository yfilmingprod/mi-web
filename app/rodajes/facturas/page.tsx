'use client'

import React, { useState, useMemo } from "react";

interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  qty: number;
  price: number;
}

export default function FacturasPage() {
  // Configuración de documento
  const [docType, setDocType] = useState<"factura" | "proforma">("factura");
  const [numDoc, setNumDoc] = useState("FAC-2026-001");
  const [fechaEmision, setFechaEmision] = useState("10/09/2026");
  const [vencimiento, setVencimiento] = useState("Contado / 30 días");

  // Impuestos
  const [applyIrpf, setApplyIrpf] = useState(true);
  const [irpfPercent, setIrpfPercent] = useState<number>(7);
  const [ivaPercent, setIvaPercent] = useState<number>(21);

  // Datos del Emisor (Yoel)
  const [emisorNombre, setEmisorNombre] = useState("Yoel Martínez Pérez");
  const [emisorNif, setEmisorNif] = useState("45604219A");
  const [emisorDireccion, setEmisorDireccion] = useState("Camino del palmeral 46, nº7");
  const [emisorTelefono, setEmisorTelefono] = useState("606 44 87 80");
  const [emisorEmail, setEmisorEmail] = useState("yfilmingprod@gmail.com");
  const [iban, setIban] = useState("ES28 0049 1126 8628 1006 7481");

  // Datos del Cliente
  const [clienteNombre, setClienteNombre] = useState("[Nombre / Razón Social del Cliente]");
  const [clienteCif, setClienteCif] = useState("B98765432");
  const [clienteDireccion, setClienteDireccion] = useState("Avenida Principal, 45");
  const [clienteCiudad, setClienteCiudad] = useState("28002 Madrid, España");
  const [clienteEmail, setClienteEmail] = useState("info@cliente.com");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      title: "Servicio de grabación en exteriores - Jornada 1",
      description: "Incluye cobertura técnica de rodaje en exterior y entrega de 6 fotografías procesadas.",
      qty: 1,
      price: 103.31,
    },
    {
      id: "2",
      title: "Servicio de grabación en exteriores - Jornada 2",
      description: "Incluye cobertura técnica de rodaje en exterior y entrega de 6 fotografías procesadas.",
      qty: 1,
      price: 103.31,
    },
    {
      id: "3",
      title: "Edición y montaje de vídeo final",
      description: "Postproducción de vídeo con corrección de color, etalonaje y hasta 2 rondas de revisiones/cambios incluidas.",
      qty: 1,
      price: 206.6,
    },
  ]);

  const handleDocTypeChange = (newType: "factura" | "proforma") => {
    setDocType(newType);
    if (newType === "proforma") {
      setNumDoc((prev) => (prev.startsWith("FAC-") ? prev.replace("FAC-", "PRO-") : prev.startsWith("PRO-") ? prev : `PRO-${prev}`));
    } else {
      setNumDoc((prev) => (prev.startsWith("PRO-") ? prev.replace("PRO-", "FAC-") : prev.startsWith("FAC-") ? prev : `FAC-${prev}`));
    }
  };

  const { baseImponible, cuotaIva, retencionIrpf, totalLiquido } = useMemo(() => {
    const base = items.reduce((acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0), 0);
    const iva = base * (ivaPercent / 100);
    const irpf = applyIrpf ? base * (irpfPercent / 100) : 0;
    const total = base + iva - irpf;
    return {
      baseImponible: base,
      cuotaIva: iva,
      retencionIrpf: irpf,
      totalLiquido: total,
    };
  }, [items, ivaPercent, applyIrpf, irpfPercent]);

  const formatEuro = (val: number) => {
    return val.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
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
      title: "Nuevo concepto o servicio",
      description: "Descripción detallada del trabajo realizado...",
      qty: 1,
      price: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-800">
      {/* Estilos CSS específicos para la impresión limpia a PDF */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .page-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          input {
            border-color: transparent !important;
            background: transparent !important;
          }
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* BARRA SUPERIOR DE HERRAMIENTAS (no se imprime) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            ● Cálculo Automático Activo
          </span>
          <p className="text-xs text-slate-500 mt-1">Cualquier importe que cambies se sumará en tiempo real.</p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Tipo de Documento */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-sm">
            <span className="text-slate-600 font-medium">Tipo:</span>
            <select
              value={docType}
              onChange={(e) => handleDocTypeChange(e.target.value as "factura" | "proforma")}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="factura">Factura Oficial</option>
              <option value="proforma">Factura Proforma</option>
            </select>
          </div>

          {/* Selector IRPF */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-sm">
            <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-slate-700">
              <input
                type="checkbox"
                checked={applyIrpf}
                onChange={(e) => setApplyIrpf(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <span>IRPF</span>
            </label>
            <select
              value={irpfPercent}
              onChange={(e) => setIrpfPercent(Number(e.target.value))}
              disabled={!applyIrpf}
              className={`bg-white border border-slate-200 text-slate-800 text-xs rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer ${
                !applyIrpf ? "opacity-50" : ""
              }`}
            >
              <option value={7}>7% (Nuevo autónomo)</option>
              <option value={15}>15% (General)</option>
              <option value={19}>19%</option>
            </select>
          </div>

          {/* Selector IVA */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-sm">
            <span className="text-slate-600 font-medium">IVA:</span>
            <select
              value={ivaPercent}
              onChange={(e) => setIvaPercent(Number(e.target.value))}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value={21}>21%</option>
              <option value={10}>10%</option>
              <option value={4}>4%</option>
              <option value={0}>0% (Exento)</option>
            </select>
          </div>

          {/* Botón Descargar PDF */}
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs md:text-sm px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Descargar en PDF
          </button>
        </div>
      </div>

      {/* CONTENEDOR DE FACTURA */}
      <main className="page-container max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-md border border-slate-200 text-slate-700">
        
        {/* Aviso de Proforma si está seleccionada */}
        {docType === "proforma" && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center gap-2">
            <span className="font-bold text-sm">ℹ️</span>
            <span>
              <strong>DOCUMENTO INFORMATIVO:</strong> Esta factura proforma no tiene validez fiscal ni contable (Art. 6 RD 1619/2012). Se emite a título informativo para la confirmación del presupuesto pactado.
            </span>
          </div>
        )}

        {/* Encabezado */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {docType === "proforma" ? "FACTURA PROFORMA" : "FACTURA"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {docType === "proforma" ? "Presupuesto previo vinculante" : "Servicios Audiovisuales"}
            </p>
          </div>
          <div className="text-left md:text-right space-y-1">
            <p className="text-sm">
              <span className="font-semibold text-slate-600">
                {docType === "proforma" ? "Nº Proforma:" : "Nº Factura:"}{" "}
              </span>
              <input
                type="text"
                value={numDoc}
                onChange={(e) => setNumDoc(e.target.value)}
                className="font-mono text-slate-900 font-semibold bg-transparent hover:bg-slate-100 rounded px-1 outline-none text-left md:text-right w-36"
              />
            </p>
            <p className="text-sm">
              <span className="font-semibold text-slate-600">Fecha de emisión: </span>
              <input
                type="text"
                value={fechaEmision}
                onChange={(e) => setFechaEmision(e.target.value)}
                className="text-slate-900 bg-transparent hover:bg-slate-100 rounded px-1 outline-none text-left md:text-right w-32"
              />
            </p>
            <p className="text-sm">
              <span className="font-semibold text-slate-600">Vencimiento: </span>
              <input
                type="text"
                value={vencimiento}
                onChange={(e) => setVencimiento(e.target.value)}
                className="text-slate-900 bg-transparent hover:bg-slate-100 rounded px-1 outline-none text-left md:text-right w-36"
              />
            </p>
          </div>
        </header>

        {/* Datos Fiscales Emisor y Cliente */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {/* Emisor */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Emisor (Tus Datos)</h2>
            <div className="space-y-1 text-sm">
              <input
                type="text"
                value={emisorNombre}
                onChange={(e) => setEmisorNombre(e.target.value)}
                className="font-bold text-slate-900 bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1"
              />
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">NIF:</span>
                <input
                  type="text"
                  value={emisorNif}
                  onChange={(e) => setEmisorNif(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Dirección:</span>
                <input
                  type="text"
                  value={emisorDireccion}
                  onChange={(e) => setEmisorDireccion(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Teléfono:</span>
                <input
                  type="text"
                  value={emisorTelefono}
                  onChange={(e) => setEmisorTelefono(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Email:</span>
                <input
                  type="text"
                  value={emisorEmail}
                  onChange={(e) => setEmisorEmail(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Cliente */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cliente (Receptor)</h2>
            <div className="space-y-1 text-sm">
              <input
                type="text"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                className="font-bold text-slate-900 bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1"
                placeholder="Nombre o Empresa"
              />
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">CIF/NIF:</span>
                <input
                  type="text"
                  value={clienteCif}
                  onChange={(e) => setClienteCif(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900 font-mono text-xs"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Dirección:</span>
                <input
                  type="text"
                  value={clienteDireccion}
                  onChange={(e) => setClienteDireccion(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Ciudad:</span>
                <input
                  type="text"
                  value={clienteCiudad}
                  onChange={(e) => setClienteCiudad(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-slate-500 w-16">Email:</span>
                <input
                  type="text"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                  className="bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabla de Conceptos */}
        <section className="overflow-x-auto my-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-2">Descripción del Servicio</th>
                <th className="py-3 px-2 text-center w-20">Cant.</th>
                <th className="py-3 px-2 text-right w-32">Precio Base</th>
                <th className="py-3 px-2 text-right w-32">Total Base</th>
                <th className="py-3 px-1 text-center w-8 no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition">
                  <td className="py-3 px-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(item.id, "title", e.target.value)}
                      className="font-semibold text-slate-900 bg-transparent w-full outline-none hover:bg-slate-100 rounded px-1"
                    />
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="text-xs text-slate-500 bg-transparent w-full outline-none hover:bg-slate-100 rounded px-1 resize-none mt-0.5"
                    />
                  </td>
                  <td className="py-3 px-2 text-center align-top">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                      className="w-16 text-center bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-1 py-1 font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-right align-top">
                    <div className="flex items-center justify-end gap-1">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                        className="w-24 text-right bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-1.5 py-1 font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                      <span className="text-slate-400 font-mono text-xs">€</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right align-top font-mono font-semibold text-slate-900">
                    {formatEuro(item.qty * item.price)}
                  </td>
                  <td className="py-3 px-1 text-center align-top no-print">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      title="Eliminar fila"
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botón para añadir concepto */}
          <div className="mt-3 no-print">
            <button
              type="button"
              onClick={addItem}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md px-3 py-1.5 transition inline-flex items-center gap-1.5"
            >
              <span>+</span> Añadir concepto
            </button>
          </div>
        </section>

        {/* Resumen Económico e Instrucciones de Pago */}
        <section className="flex flex-col md:flex-row justify-between items-start pt-6 border-t border-slate-200 gap-6">
          <div className="w-full md:w-1/2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Instrucciones de Pago</h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5 text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Método de pago:</span> Transferencia bancaria
              </p>
              <p>
                <span className="font-medium text-slate-900">Titular:</span> {emisorNombre}
              </p>
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-900">IBAN:</span>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="font-mono bg-transparent w-full outline-none hover:bg-slate-200/50 rounded px-1 text-slate-800"
                />
              </div>
              <p>
                <span className="font-medium text-slate-900">Concepto de pago:</span>{" "}
                <span className="font-medium text-indigo-600">
                  {docType === "proforma" ? `Proforma ${numDoc}` : `Factura ${numDoc}`}
                </span>
              </p>
            </div>
            <p className="text-xs text-slate-400 italic">
              * Los derechos de uso del material audiovisual quedan cedidos tras el pago íntegro de la presente factura.
            </p>
          </div>

          <div className="w-full md:w-5/12 space-y-2">
            <div className="flex justify-between py-1 text-sm text-slate-600">
              <span>Base Imponible:</span>
              <span className="font-mono font-medium text-slate-900">{formatEuro(baseImponible)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-slate-600">
              <span>IVA ({ivaPercent}%):</span>
              <span className="font-mono font-medium text-slate-900">+ {formatEuro(cuotaIva)}</span>
            </div>
            {applyIrpf && (
              <div className="flex justify-between py-1 text-sm text-red-600">
                <span>Retención IRPF (-{irpfPercent}%):</span>
                <span className="font-mono font-medium">- {formatEuro(retencionIrpf)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t-2 border-slate-800 text-slate-900">
              <span className="text-base font-bold">Total a Percibir:</span>
              <span className="text-lg font-bold font-mono text-indigo-700">{formatEuro(totalLiquido)}</span>
            </div>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="mt-12 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 space-y-1">
          <p>Gracias por su confianza. Factura emitida de conformidad con la legislación fiscal vigente.</p>
          {docType === "proforma" && (
            <p className="text-[11px] text-amber-700 italic">
              * Nota legal: Este documento carece de validez fiscal y registral. La factura ordinaria definitiva será expedida una vez abonado o confirmado el servicio.
            </p>
          )}
        </footer>
      </main>
    </div>
  );
}