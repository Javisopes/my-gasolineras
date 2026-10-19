import { getGasolinerasPorProvincia } from '@/app/api/routes';
import { Gasolinera, Filtros } from '@/types/gasolineras';
import {getInitial, getBrandColor, getGoogleMapsUrl} from '@/app/services/generalService';
import { obtenerGasolinerasPorProvincia } from '@/app/services/cacheService';

function crearArrayGasolineras(gasolineras:Gasolinera[]){
  const arrayGasolineras : any[] = [];

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
    if(!gasolineraActual["IDMunicipio"] && gasolinera["IDMunicipio"] != ""){
      gasolineraActual["IDMunicipio"] = gasolinera["IDMunicipio"];
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
    if(!gasolineraActual["Precios"]["Adblue"] && gasolinera["Precio Adblue"] != ""){
      gasolineraActual["Precios"]["Adblue"] = gasolinera["Precio Adblue"];
    }
    if(!gasolineraActual["Precios"]["Amoniaco"] && gasolinera["Precio Amoniaco"] != ""){
      gasolineraActual["Precios"]["Amoniaco"] = gasolinera["Precio Amoniaco"];
    }
    if(!gasolineraActual["Precios"]["Biodiesel"] && gasolinera["Precio Biodiesel"] != ""){
      gasolineraActual["Precios"]["Biodiesel"] = gasolinera["Precio Biodiesel"];
    }
    if(!gasolineraActual["Precios"]["Bioetanol"] && gasolinera["Precio Bioetanol"] != ""){
      gasolineraActual["Precios"]["Bioetanol"] = gasolinera["Precio Bioetanol"];
    }
    if(!gasolineraActual["Precios"]["Biogas Natural Comprimido"] && gasolinera["Precio Biogas Natural Comprimido"] != ""){
      gasolineraActual["Precios"]["Biogas Natural Comprimido"] = gasolinera["Precio Biogas Natural Comprimido"];
    }
    if(!gasolineraActual["Precios"]["Biogas Natural Licuado"] && gasolinera["Precio Biogas Natural Licuado"] != ""){
      gasolineraActual["Precios"]["Biogas Natural Licuado"] = gasolinera["Precio Biogas Natural Licuado"];
    }
    if(!gasolineraActual["Precios"]["Diésel Renovable"] && gasolinera["Precio Diésel Renovable"] != ""){
      gasolineraActual["Precios"]["Diésel Renovable"] = gasolinera["Precio Diésel Renovable"];
    }
    if(!gasolineraActual["Precios"]["Gas Natural Comprimido"] && gasolinera["Precio Gas Natural Comprimido"] != ""){
      gasolineraActual["Precios"]["Gas Natural Comprimido"] = gasolinera["Precio Gas Natural Comprimido"];
    }
    if(!gasolineraActual["Precios"]["Gas Natural Licuado"] && gasolinera["Precio Gas Natural Licuado"] != ""){
      gasolineraActual["Precios"]["Gas Natural Licuado"] = gasolinera["Precio Gas Natural Licuado"];
    }
    if(!gasolineraActual["Precios"]["Gases licuados del petróleo"] && gasolinera["Precio Gases licuados del petróleo"] != ""){
      gasolineraActual["Precios"]["Gases licuados del petróleo"] = gasolinera["Precio Gases licuados del petróleo"];
    }
    if(!gasolineraActual["Precios"]["Gasoleo A"] && gasolinera["Precio Gasoleo A"] != ""){
      gasolineraActual["Precios"]["Gasoleo A"] = gasolinera["Precio Gasoleo A"];
    }
    if(!gasolineraActual["Precios"]["Gasoleo B"] && gasolinera["Precio Gasoleo B"] != ""){
      gasolineraActual["Precios"]["Gasoleo B"] = gasolinera["Precio Gasoleo B"];
    }
    if(!gasolineraActual["Precios"]["Gasoleo Premium"] && gasolinera["Precio Gasoleo Premium"] != ""){
      gasolineraActual["Precios"]["Gasoleo Premium"] = gasolinera["Precio Gasoleo Premium"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 95 E5"] && gasolinera["Precio Gasolina 95 E5"] != ""){
      gasolineraActual["Precios"]["Gasolina 95 E5"] = gasolinera["Precio Gasolina 95 E5"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 95 E5 Premium"] && gasolinera["Precio Gasolina 95 E5 Premium"] != ""){
      gasolineraActual["Precios"]["Gasolina 95 E5 Premium"] = gasolinera["Precio Gasolina 95 E5 Premium"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 95 E10"] && gasolinera["Precio Gasolina 95 E10"] != ""){
      gasolineraActual["Precios"]["Gasolina 95 E10"] = gasolinera["Precio Gasolina 95 E10"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 95 E25"] && gasolinera["Precio Gasolina 95 E25"] != ""){
      gasolineraActual["Precios"]["Gasolina 95 E25"] = gasolinera["Precio Gasolina 95 E25"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 95 E85"] && gasolinera["Precio Gasolina 95 E85"] != ""){
      gasolineraActual["Precios"]["Gasolina 95 E85"] = gasolinera["Precio Gasolina 95 E85"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 98 E5"] && gasolinera["Precio Gasolina 98 E5"] != ""){
      gasolineraActual["Precios"]["Gasolina 98 E5"] = gasolinera["Precio Gasolina 98 E5"];
    }
    if(!gasolineraActual["Precios"]["Gasolina 98 E10"] && gasolinera["Precio Gasolina 98 E10"] != ""){
      gasolineraActual["Precios"]["Gasolina 98 E10"] = gasolinera["Precio Gasolina 98 E10"];
    }
    if(!gasolineraActual["Precios"]["Gasolina Renovable"] && gasolinera["Precio Gasolina Renovable"] != ""){
      gasolineraActual["Precios"]["Gasolina Renovable"] = gasolinera["Precio Gasolina Renovable"];
    }
    if(!gasolineraActual["Precios"]["Hidrogeno"] && gasolinera["Precio Hidrogeno"] != ""){
      gasolineraActual["Precios"]["Hidrogeno"] = gasolinera["Precio Hidrogeno"];
    }
    if(!gasolineraActual["Precios"]["Metanol"] && gasolinera["Precio Metanol"] != ""){
      gasolineraActual["Precios"]["Metanol"] = gasolinera["Precio Metanol"];
    }
    arrayGasolineras.push(gasolineraActual);
  }

  return arrayGasolineras;
}

export async function cargarGasolinerasPorFiltros(filtros:Filtros, signal?: AbortSignal){

  var arrayGasolinerasFiltradas = await obtenerGasolinerasPorProvincia(filtros.provincia, signal);

  if (filtros.municipio) {
    var municipioId = filtros.municipio;
    arrayGasolinerasFiltradas = arrayGasolinerasFiltradas.filter(g =>
      g.IDMunicipio.toLowerCase().includes(municipioId.toLowerCase())
    );
  }

  if (!filtros.precioasc && filtros.combustible) {
    arrayGasolinerasFiltradas = arrayGasolinerasFiltradas.filter(
      g => g.Precios[filtros.combustible]
    );
  }

  if (filtros.precioasc && filtros.combustible) {
    type Gasolinera = (typeof arrayGasolinerasFiltradas)[number];

    const getPrecio = (g: Gasolinera): number =>
      parseFloat(String(g.Precios?.[filtros.combustible]).replace(",", "."));

    arrayGasolinerasFiltradas = arrayGasolinerasFiltradas
      .filter((g) => !isNaN(getPrecio(g)))
      .sort((a, b) => getPrecio(a) - getPrecio(b));
  }

  return arrayGasolinerasFiltradas;
}

export async function cargarGasolinerasPorProvincia(provinciaId:string, signal?: AbortSignal){
  var gasolineras = await getGasolinerasPorProvincia(provinciaId, signal);
  return crearArrayGasolineras(gasolineras);
}