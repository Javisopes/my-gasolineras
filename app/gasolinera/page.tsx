"use client";
import {  } from '@/app/gasolinera/page.css';
import { getProvincias } from '@/app/api/routes';
import { cargarGasolinerasPorFiltros } from '@/app/services/gasolineraService';
import { Gasolinera, Municipio, Provincia, Filtros, Combustible, OpcionesFiltro, PosiblesFiltros, FILTROS } from '@/types/gasolineras';
import {cargarMunicipiosPorProvincia} from '@/app/services/municipioService';
import {cargarCombustibles} from '@/app/services/combustibleService';
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { IconMapPin, IconBuildingCommunity, IconGasStation, IconArrowsSort } from "@tabler/icons-react";


import React from 'react';
import { useEffect, useState, useId } from "react";

export default function GasolineraPage() {

  const [provincias, setProvincias] = useState<Provincia[]>([]); // esto también cambia, ver abajo
  const [arrayGasolineras, setGasolineras] = useState<Gasolinera[]>([]);
  const [arrayMunicipios, setMunicipios] = useState<Municipio[]>([]);
  const [arrayCombustibles, setCombustibles] = useState<any[]>([]);
  const [recargarTriggerProvincia, setRecargarTriggerProvincia] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Filtros>({
    provincia: "",
    municipio: "",
    combustible: "",
    orden:"alfabetico",
  });
  const ORDEN_POR_DEFECTO: PosiblesFiltros = "alfabetico";
  const ORDEN_POR_PRECIO: PosiblesFiltros = "precio";
  //const ORDEN_POR_PROXIMIDAD: PosiblesFiltros = "proximidad";

  const actualizarFiltros = (cambios: Partial<Filtros>) => {
    setFiltros((prev) => ({ ...prev, ...cambios }));
  };

    useEffect(() => {
      getProvincias().then(setProvincias);
    }, []);

    useEffect(() => {

      if (!filtros.provincia) {
        return;
      }

      var provinciaId = filtros.provincia;

      const controller = new AbortController();
      setError(null);
        
      cargarGasolineras();

      async function cargarGasolineras() {

        try {
          setCargando(true);

          var gasolinerasFiltradas = await cargarGasolinerasPorFiltros(filtros,controller.signal);
          if(!gasolinerasFiltradas){
            setError('No se encontraron gasolineras');
          }

          if(!filtros.municipio){
            var municipios = await cargarMunicipiosPorProvincia(provinciaId, gasolinerasFiltradas, controller.signal);
            if(!municipios){
              setError('No se encontraron municipios');
            }
            setMunicipios(municipios);
          }

          if(!filtros.combustible){
            if(filtros.orden === FILTROS.precio){
              setError('Para filtrar por precio debes seleccionar un combustible antes');
            }
            var combustibles = await cargarCombustibles(gasolinerasFiltradas, controller.signal);
            if(!combustibles){
              setError('No hay combustibles disponibles');
            }
            setCombustibles(Array.from(combustibles));
          }

          if(filtros.orden === FILTROS.proximidad){
            setError('De momento aun no está disponible el filtro por proximidad');
          }

          setGasolineras(gasolinerasFiltradas);

          setCargando(false);

        } catch (e) {
          if ((e as Error).name !== "AbortError") setError("Error durante la carga de datos");
        }
      }

      return () => controller.abort();

    }, [filtros,recargarTriggerProvincia]);

  return (
    <div className="w-screen max-w-4xl mx-auto p-5 bg-color min-h-screen texto-color ">
      <h1 className="text-2xl font-bold mb-2">Gasolineras APP</h1>

    <section className="filtros">
      <header className="filtros_cabecera">
        <span className="filtros_titulo">
          <IconAdjustmentsHorizontal color="#c2410c" size={18} stroke={1.75} aria-hidden="true" />
          Filtros
        </span>

          <button
            type="button"
            className="filtros_limpiar"
            onClick={()=>{
              actualizarFiltros({municipio: "", combustible: "", orden: ORDEN_POR_DEFECTO})
            }}
          >
            Limpiar
          </button>

      </header>
      <div className="filtros_cuerpo">
        <ComboboxProvincia
          provincias={provincias}
          provinciaId={filtros.provincia}
          setProvinciaId={(id) => {
            actualizarFiltros({provincia: id, municipio: "", combustible: "", orden: ORDEN_POR_DEFECTO})
            setMunicipios([]);
            if(!id) setGasolineras([]);
          }}
        />

        {filtros.provincia && (
          <>
            <div className="filtros_cuerpo_part">
              <ComboboxCombustible
                combustibles={arrayCombustibles}
                combustibleId={filtros.combustible}
                setCombustibleId={(id) => {
                  if(!id){
                    actualizarFiltros({combustible: id, orden: ORDEN_POR_DEFECTO})
                  }else{
                    actualizarFiltros({combustible: id, orden: ORDEN_POR_PRECIO})
                  }
                }}
              />
              <ComboboxMunicipio
                municipios={arrayMunicipios}
                municipioId={filtros.municipio}
                setMunicipioId={(id) => {
                  actualizarFiltros({municipio: id})
                }}
              />
            </div>
            <div className="p-1">
              <OrdenFiltroChips value={filtros.orden} onChange={(ordenFiltro) => actualizarFiltros({orden: ordenFiltro})} />
            </div>
          </>
        )}
      </div>
    </section>

      
      
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
                <div className="min-w-0 w-[85%]">
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
                    <span className="font-medium texto-color"><strong>{g.Localidad}</strong> - {g["Dirección"]}</span>
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
                        backgroundColor: g["Color"] ? g["Color"]+"1A" : "", 
                        boxShadow: filtros.combustible === nombreCombustible && g["Color"] ? `0 0 0 2px ${g["Color"]}` : "none",
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

  useEffect(() => {
    if (!provinciaId) setQuery("");
  }, [provinciaId]);

  const filtradas = provincias.filter(p =>
    p.Provincia.toLowerCase().includes(query.toLowerCase())
  );

  const seleccionar = (p: Provincia) => {
    setProvinciaId(p.IDPovincia);
    setQuery(p.Provincia);
    setAbierto(false);
  };

  const limpiar = () => {
    setQuery("");
    setProvinciaId("");
    setAbierto(false);
  };

  return (
    <div className="relative w-full p-1 campo-icono">
      <IconMapPin size={16} stroke={1.75} />
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
        className={`w-full rounded-lg border border-gray-600 p-2 ${query ? "pr-8" : ""}`}
      />

      {query && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={limpiar}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 text-2xl leading-none w-6 h-6 flex items-center justify-center"
          aria-label="Limpiar selección"
        >
          ×
        </button>
      )}

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

  useEffect(() => {
    if (!municipioId) setQuery("");
  }, [municipioId]);


  const filtradas = municipios.filter(m =>
    m.Municipio.toLowerCase().includes(query.toLowerCase())
  );

  const seleccionar = (m: Municipio) => {
    setMunicipioId(m.IDMunicipio);
    setQuery(m.Municipio);
    setAbierto(false);
  };

    const limpiar = () => {
      setQuery("");
      setMunicipioId("");
      setAbierto(false);
    };

  return (
    <div className="relative w-full p-1 campo-icono">
      <IconBuildingCommunity size={16} stroke={1.75} />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
          if (e.target.value === "") setMunicipioId("");
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)} 
        placeholder="Población..."
        className={`w-full rounded-lg border border-gray-600 p-2 ${query ? "pr-8" : ""}`}
      />
      {query && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={limpiar}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 text-2xl leading-none w-6 h-6 flex items-center justify-center"
          aria-label="Limpiar selección"
        >
          ×
        </button>
      )}
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

function ComboboxCombustible({ combustibles, combustibleId, setCombustibleId }: {
  combustibles: Combustible[];
  combustibleId: string;
  setCombustibleId: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!combustibleId) setQuery("");
  }, [combustibleId]);


  const filtradas = combustibles.filter(c =>
    c.NombreProducto.toLowerCase().includes(query.toLowerCase())
  );

  const seleccionar = (c: Combustible) => {
    setCombustibleId(c.NombreProducto);
    setQuery(c.NombreProducto);
    setAbierto(false);
  };

    const limpiar = () => {
      setQuery("");
      setCombustibleId("");
      setAbierto(false);
    };

  return (
    <div className="relative w-full p-1 campo-icono">
      <IconGasStation size={16} stroke={1.75} />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
          if (e.target.value === "") setCombustibleId("");
        }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)} 
        placeholder="Combustible..."
        className={`w-full rounded-lg border border-gray-600 p-2 ${query ? "pr-8" : ""}`}
      />
      {query && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={limpiar}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 text-2xl leading-none w-6 h-6 flex items-center justify-center"
          aria-label="Limpiar selección"
        >
          ×
        </button>
      )}
      {abierto && filtradas.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
          {filtradas.map((c) => (
            <li
              key={c.NombreProducto}
              onClick={() => seleccionar(c)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {c.NombreProducto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OrdenFiltroChips({ value, onChange }: {
  value: PosiblesFiltros;
  onChange: (orden: PosiblesFiltros) => void;
}) {
  const seleccionar = (id: PosiblesFiltros) => {
    onChange(id === value ? value : id);
  };
 
  return (
    <div className="flex items-center gap-3 w-full rounded-lg p-2">
      <IconArrowsSort
        className="h-4 w-4 shrink-0 text-gray-500"
        aria-hidden="true"
      />
      <span id="orden-label" className="sr-only">
        Ordenar por
      </span>

      <div
        role="radiogroup"
        aria-labelledby="orden-label"
        title="Ordenar por"
        className="flex flex-wrap gap-2"
      >
 
        <div role="radiogroup" aria-labelledby="orden-label" className="flex flex-wrap gap-2">
          {OpcionesFiltro.map((of) => {
            const activo = value === of.id;
            return (
              <button
                key={of.id}
                type="button"
                role="radio"
                aria-checked={activo}
                onClick={() => seleccionar(of.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                  activo
                    ? "border-orange-700 bg-orange-700 text-white"
                    : "border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {of.etiqueta}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
