import { getGasolinerasPorProvincia, getProvincias } from '@/app/api/routes';
import { RespuestaGasolineras, Gasolinera, Provincia } from '@/types/gasolineras';

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

export async function cargarGasolinerasPorProvincia(provinciaId : string, signal?: AbortSignal){

    const arrayGasolineras : any[] = [];

    const gasolineras = await getGasolinerasPorProvincia(provinciaId, signal);

      for(var gasolinera_ of gasolineras){
        var gasolinera = gasolinera_ as Gasolinera;
    
        const gasolineraActual: Record<string, any> = {
          id: gasolinera["IDEESS"]
        };

        var rotulo: string = gasolinera["Rótulo"].replaceAll("+", " "); 
        rotulo= rotulo.replaceAll("%2C", ","); 
        rotulo = rotulo.trim(); 
    
        if(!gasolineraActual["Rótulo"] && rotulo != ""){
          gasolineraActual["Rótulo"] = rotulo;
        }
    
        var color = getBrandColor(rotulo || "SIN RÓTULO");
        if(!gasolineraActual["Color"]){
          gasolineraActual["Color"] = color;
        }
    
        if(!gasolineraActual["Inicial"]){
          gasolineraActual["Inicial"] = getInitial(rotulo)?getInitial(rotulo):"S";
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
          gasolineraActual["Maps"] = getGoogleMapsUrl(rotulo, gasolinera["Dirección"], gasolinera["Localidad"]);
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

    return arrayGasolineras;
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
  var query = localidad ? rotulo+', '+direccion+', '+localidad : direccion;


  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

