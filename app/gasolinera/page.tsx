
import { getGasolinerasPorProvincia } from '@/app/api/routes';
import { Gasolinera } from '@/types/gasolineras';
import React from 'react';

const BRAND_COLORS: Record<string, string> = {
  repsol: "#E4032E",
  cepsa: "#00529B",
  galp: "#6E2585",
  bp: "#00854A",
  shell: "#FBCE07",
  petronor: "#EF7D00",
  avia: "#004B93",
  q8: "#E30613",
  campsa: "#003DA5",
  esso: "#ED1C24",
  carrefour: "#004E9E",
  alcampo: "#E4032E",
};

const FALLBACK_PALETTE = [
  "#0EA5A0", "#7C6FE0", "#E0748C", "#3B82C4", "#C2884A", "#5FA85A",
];

export default async function GasolineraPage() {

  const arrayGasolineras : any[] = [];

  const gasolineras = await getGasolinerasPorProvincia('VALENCIA / VALÈNCIA');

  for(var gasolinera_ of gasolineras){
    var gasolinera = gasolinera_ as Gasolinera;

    const gasolineraActual: Record<string, any> = {
      id: gasolinera["IDEESS"]
    };

    if(!gasolineraActual["Rótulo"] && gasolinera["Rótulo"] != ""){
      gasolineraActual["Rótulo"] = gasolinera["Rótulo"];
    }

    var color = getBrandColor(gasolinera["Rótulo"] || "SIN RÓTULO");
    if(!gasolineraActual["Color"]){
      gasolineraActual["Color"] = color;
    }

    if(!gasolineraActual["Inicial"]){
      gasolineraActual["Inicial"] = getInitial(gasolinera["Rótulo"])?getInitial(gasolinera["Rótulo"]):"S";
    }

    if(!gasolineraActual["Localidad"] && gasolinera["Localidad"] != ""){
      gasolineraActual["Localidad"] = gasolinera["Localidad"];
    }
    if(!gasolineraActual["Dirección"] && gasolinera["Dirección"] != ""){
    gasolineraActual["Dirección"] = gasolinera["Dirección"];
    }
    if(!gasolineraActual["Horario"] && gasolinera["Horario"] != ""){
      gasolineraActual["Horario"] = gasolinera["Horario"];
    }
    if(!gasolineraActual["Maps"]){
      gasolineraActual["Maps"] = getGoogleMapsUrl(gasolinera["Rótulo"], gasolinera["Dirección"], gasolinera["Localidad"]);
    }

    if(!gasolineraActual["Precios"]){
      gasolineraActual["Precios"] = {};
    }
    if(!gasolineraActual["Precios"]["Precio Adblue"] && gasolinera["Precio Adblue"] != ""){
      gasolineraActual["Precios"]["Precio Adblue"] = gasolinera["Precio Adblue"];
    }
    if(!gasolineraActual["Precios"]["Precio Amoniaco"] && gasolinera["Precio Amoniaco"] != ""){
      gasolineraActual["Precios"]["Precio Amoniaco"] = gasolinera["Precio Amoniaco"];
    }
    if(!gasolineraActual["Precios"]["Precio Biodiesel"] && gasolinera["Precio Biodiesel"] != ""){
      gasolineraActual["Precios"]["Precio Biodiesel"] = gasolinera["Precio Biodiesel"];
    }
    if(!gasolineraActual["Precios"]["Precio Bioetanol"] && gasolinera["Precio Bioetanol"] != ""){
      gasolineraActual["Precios"]["Precio Bioetanol"] = gasolinera["Precio Bioetanol"];
    }
    if(!gasolineraActual["Precios"]["Precio Biogas Natural Comprimido"] && gasolinera["Precio Biogas Natural Comprimido"] != ""){
      gasolineraActual["Precios"]["Precio Biogas Natural Comprimido"] = gasolinera["Precio Biogas Natural Comprimido"];
    }
    if(!gasolineraActual["Precios"]["Precio Biogas Natural Licuado"] && gasolinera["Precio Biogas Natural Licuado"] != ""){
      gasolineraActual["Precios"]["Precio Biogas Natural Licuado"] = gasolinera["Precio Biogas Natural Licuado"];
    }
    if(!gasolineraActual["Precios"]["Precio Diésel Renovable"] && gasolinera["Precio Diésel Renovable"] != ""){
      gasolineraActual["Precios"]["Precio Diésel Renovable"] = gasolinera["Precio Diésel Renovable"];
    }
    if(!gasolineraActual["Precios"]["Precio Gas Natural Comprimido"] && gasolinera["Precio Gas Natural Comprimido"] != ""){
      gasolineraActual["Precios"]["Precio Gas Natural Comprimido"] = gasolinera["Precio Gas Natural Comprimido"];
    }
    if(!gasolineraActual["Precios"]["Precio Gas Natural Licuado"] && gasolinera["Precio Gas Natural Licuado"] != ""){
      gasolineraActual["Precios"]["Precio Gas Natural Licuado"] = gasolinera["Precio Gas Natural Licuado"];
    }
    if(!gasolineraActual["Precios"]["Precio Gases licuados del petróleo"] && gasolinera["Precio Gases licuados del petróleo"] != ""){
      gasolineraActual["Precios"]["Precio Gases licuados del petróleo"] = gasolinera["Precio Gases licuados del petróleo"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasoleo A"] && gasolinera["Precio Gasoleo A"] != ""){
      gasolineraActual["Precios"]["Precio Gasoleo A"] = gasolinera["Precio Gasoleo A"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasoleo B"] && gasolinera["Precio Gasoleo B"] != ""){
      gasolineraActual["Precios"]["Precio Gasoleo B"] = gasolinera["Precio Gasoleo B"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasoleo Premium"] && gasolinera["Precio Gasoleo Premium"] != ""){
      gasolineraActual["Precios"]["Precio Gasoleo Premium"] = gasolinera["Precio Gasoleo Premium"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 95 E5"] && gasolinera["Precio Gasolina 95 E5"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 95 E5"] = gasolinera["Precio Gasolina 95 E5"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 95 E5 Premium"] && gasolinera["Precio Gasolina 95 E5 Premium"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 95 E5 Premium"] = gasolinera["Precio Gasolina 95 E5 Premium"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 95 E10"] && gasolinera["Precio Gasolina 95 E10"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 95 E10"] = gasolinera["Precio Gasolina 95 E10"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 95 E25"] && gasolinera["Precio Gasolina 95 E25"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 95 E25"] = gasolinera["Precio Gasolina 95 E25"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 95 E85"] && gasolinera["Precio Gasolina 95 E85"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 95 E85"] = gasolinera["Precio Gasolina 95 E85"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 98 E5"] && gasolinera["Precio Gasolina 98 E5"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 98 E5"] = gasolinera["Precio Gasolina 98 E5"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina 98 E10"] && gasolinera["Precio Gasolina 98 E10"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina 98 E10"] = gasolinera["Precio Gasolina 98 E10"];
    }
    if(!gasolineraActual["Precios"]["Precio Gasolina Renovable"] && gasolinera["Precio Gasolina Renovable"] != ""){
      gasolineraActual["Precios"]["Precio Gasolina Renovable"] = gasolinera["Precio Gasolina Renovable"];
    }
    if(!gasolineraActual["Precios"]["Precio Hidrogeno"] && gasolinera["Precio Hidrogeno"] != ""){
      gasolineraActual["Precios"]["Precio Hidrogeno"] = gasolinera["Precio Hidrogeno"];
    }
    if(!gasolineraActual["Precios"]["Precio Metanol"] && gasolinera["Precio Metanol"] != ""){
      gasolineraActual["Precios"]["Precio Metanol"] = gasolinera["Precio Metanol"];
    }

    arrayGasolineras.push(gasolineraActual);

  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-color min-h-screen">
      <h1 className="text-2xl font-bold texto-color mb-6">Gasolineras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getBrandColor(rotulo: string): string {
  const normalized = rotulo.toLowerCase();
  const known = Object.keys(BRAND_COLORS).find((brand) =>
    normalized.includes(brand)
  );
  if (known) return BRAND_COLORS[known];
  return FALLBACK_PALETTE[hashString(rotulo) % FALLBACK_PALETTE.length];
}

function getInitial(rotulo: string): string {
  return rotulo.trim().charAt(0).toUpperCase() || "?";
}

function getGoogleMapsUrl(rotulo: string, direccion: string, localidad?: string): string {

    console.log(direccion);
  // Combinar dirección + localidad mejora mucho la precisión del resultado,
  // sobre todo con direcciones tipo "Carretera Ontinyent km. 1"
  var query = localidad ? rotulo+', '+direccion+', '+localidad : direccion;


  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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
