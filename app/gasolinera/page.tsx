"use client";
import { getProvincias, getMunicipiosPorProvincia } from '@/app/api/routes';
import { cargarGasolinerasPorProvincia, cargarGasolinerasPorMunicipio } from '@/app/services/gasolineraService';
import { Gasolinera, Municipio, Provincia } from '@/types/gasolineras';
import {cargarMunicipios} from '@/app/services/municipioService';
import React from 'react';
import { useEffect, useState } from "react";

export default function GasolineraPage() {

  const [provincias, setProvincias] = useState<Provincia[]>([]); // esto también cambia, ver abajo
  const [provinciaId, setProvinciaId] = useState("");
  const [arrayGasolineras, setGasolineras] = useState<Gasolinera[]>([]);
  const [municipioId, setMunicipioId] = useState("");
  const [municipioNombre, setMunicipioNombre] = useState("");
  const [arrayMunicipios, setMunicipios] = useState<Municipio[]>([]); 
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      getProvincias().then(setProvincias);
    }, []);

    useEffect(() => {

      if (!provinciaId) {
        return;
      }

      const controller = new AbortController();
      setError(null);
        
      cargarMunicipiosYGasolineras();

      async function cargarMunicipiosYGasolineras() {

        try {
          setCargando(true);

          var gasolinerasFiltradas = await cargarGasolinerasPorProvincia(provinciaId, controller.signal)
          if(!gasolinerasFiltradas){
            setError('No se encontraron gasolineras');
          }
          setGasolineras(gasolinerasFiltradas);

          var municipios = await cargarMunicipios(provinciaId, gasolinerasFiltradas, controller.signal);
          if(!municipios){
            setError('No se encontraron municipios');
          }
          setMunicipios(municipios);

          setCargando(false);

        } catch (e) {
          if ((e as Error).name !== "AbortError") setError("Error durante la carga de datos");
        }
      }

      return () => controller.abort();

    }, [provinciaId]);

    useEffect(() => {

      if (!municipioId) {
        return;
      }

      const controller = new AbortController();
      setError(null);
      console.log(municipioId);



      cargarGasolinerasDeMunicipio();

      async function cargarGasolinerasDeMunicipio() {
        try{
          setCargando(true);

          var arrayGasolineras = await cargarGasolinerasPorMunicipio(municipioId, controller.signal); 
          if(!arrayGasolineras){
            setError('No se encontraron gasolineras');
          }
          setGasolineras(arrayGasolineras);

          setCargando(false);

        } catch (e) {
          if ((e as Error).name !== "AbortError") setError("Error durante la carga de datos");
        }
      }

      return () => controller.abort();

    }, [municipioId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-color min-h-screen texto-color ">
      <h1 className="text-2xl font-bold mb-2">Gasolineras</h1>

      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-gray-700 p-3 rounded-lg mb-3 text-sm">
        <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p>
          <span className="text-red-500 font-bold">*</span> Toda la información de la web proviene de{" "}
          <span className="font-semibold">Minetur</span> (Ministerio de Industria, Energía y Turismo de España)
        </p>
      </div>
      
        {/*<select
        value={provinciaId}
        onChange={(e) => setProvinciaId(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2 m-1"
      >
        <option value="">Selecciona una provincia</option>
        {provincias.map((p) => (
          <option key={p.IDPovincia} value={p.IDPovincia}>
            {p.Provincia}
          </option>
        ))}
      </select>*/}

      <ComboboxProvincia
        provincias={provincias}
        provinciaId={provinciaId}
        setProvinciaId={setProvinciaId}
      />

      {provinciaId && (
        <ComboboxMunicipio
          municipios={arrayMunicipios}
          municipioId={municipioId}
          setMunicipioId={setMunicipioId}
        />
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

function ComboboxProvincia({ provincias, provinciaId, setProvinciaId }: {
  provincias: Provincia[];
  provinciaId: string;
  setProvinciaId: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);

  const filtradas = provincias.filter(p =>
    p.Provincia.toLowerCase().includes(query.toLowerCase())
  );

  const seleccionar = (p: Provincia) => {
    setProvinciaId(p.IDPovincia);
    setQuery(p.Provincia);
    setAbierto(false);
  };

  return (
    <div className="relative w-full m-1">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
          if (e.target.value === "") setProvinciaId("");
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)} 
        placeholder="Escribe una provincia..."
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      {abierto && filtradas.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
          {filtradas.map((p) => (
            <li
              key={p.IDPovincia}
              onClick={() => seleccionar(p)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {p.Provincia}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ComboboxMunicipio({ municipios, municipioId, setMunicipioId }: {
  municipios: Municipio[];
  municipioId: string;
  setMunicipioId: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);

  const filtradas = municipios.filter(m =>
    m.Municipio.toLowerCase().includes(query.toLowerCase())
  );

  const seleccionar = (m: Municipio) => {
    setMunicipioId(m.IDMunicipio);
    setQuery(m.Municipio);
    setAbierto(false);
  };

  return (
    <div className="relative w-full m-1">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
          if (e.target.value === "") setMunicipioId("");
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)} 
        placeholder="Escribe un municipio..."
        className="w-full rounded-lg border border-gray-300 p-2"
      />
      {abierto && filtradas.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
          {filtradas.map((m) => (
            <li
              key={m.IDMunicipio}
              onClick={() => seleccionar(m)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {m.Municipio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
