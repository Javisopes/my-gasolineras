"use client";
import { getProvincias } from '@/app/api/routes';
import { cargarGasolinerasPorProvincia } from '@/app/services/gasolineraService';
import { Gasolinera, Provincia } from '@/types/gasolineras';
import React from 'react';
import { useEffect, useState } from "react";

export default function GasolineraPage() {

  const [provinciaId, setProvinciaId] = useState("");
  const [arrayGasolineras, setGasolineras] = useState<Gasolinera[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provincias, setProvincias] = useState<Provincia[]>([]); // esto también cambia, ver abajo

    useEffect(() => {
      getProvincias().then(setProvincias);
    }, []);

    useEffect(() => {
      if (!provinciaId) {
        return;
      }

      const controller = new AbortController();
      setError(null);

      cargarGasolineras(provinciaId, controller.signal);

      return () => controller.abort();
    }, [provinciaId]);

    async function cargarGasolineras(provinciaId: string, signal?: AbortSignal) {
      setCargando(true);
      try {
        const arrayGasolineras = await cargarGasolinerasPorProvincia(provinciaId, signal); 
        setGasolineras(arrayGasolineras);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("Error al cargar gasolineras");
      } finally {
        setCargando(false);
      }
    }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-color min-h-screen texto-color ">
      <h1 className="text-2xl font-bold mb-6">Gasolineras</h1>

        <select
        value={provinciaId}
        onChange={(e) => setProvinciaId(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2"
      >
        <option value="">Selecciona una provincia</option>
        {provincias.map((p) => (
          <option key={p.IDPovincia} value={p.IDPovincia}>
            {p.Provincia}
          </option>
        ))}
      </select>

      {!provinciaId && (
        <p className="mt-4 text-gray-500">Elige una provincia para ver las gasolineras.</p>
      )}
      {cargando && <p className="mt-4">Cargando los datos…</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {Object.values(arrayGasolineras).map((g: any) => (
          <React.Fragment key={g.id}>
            <div key={g.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{ backgroundColor: g["Color"] }}
                >
                  {g["Inicial"]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between max-w-full">
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">{g["Rótulo"]}</h2>
                      <a style={{ color: g["Color"] }} href={g["Maps"]} target="_blank" rel="noopener noreferrer">
                        Maps
                      </a>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs px-2.5 py-1.5 w-fit max-w-full">
                    <ClockIcon className="w-3.5 h-3.5 shrink-0" style={{ color: g["Color"] }} />
                    <span className="font-medium texto-color">{g["Horario"] || "No disponible"}</span>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 w-fit max-w-full mb-4">
                    <PinIcon className="w-3.5 h-3.5 shrink-0" style={{ color: g["Color"] }} />
                    <span className="font-medium texto-color"><strong>{g.Localidad} - {g["Dirección"]}</strong></span>
                  </p>

                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {g.Precios && Object.keys(g.Precios).length > 0 ? (
                  Object.entries(g.Precios).map(([nombreCombustible, valor]: [string, any]) => (
                    <span 
                      className="text-xs font-medium px-2.5 py-1 rounded-full texto-color"
                      key={nombreCombustible} 
                      style={{ 
                        backgroundColor: g["Color"]+"1A", 
                        padding: "4px 8px", 
                        borderRadius: "4px", 
                        fontSize: "0.9em" 
                      }}
                    >
                      {nombreCombustible} <strong>{valor} €/L</strong>
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#999", fontSize: "0.9em" }}>Sin precios registrados</span>
                )}
              </div>

            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
