import { getGasolinerasPorProvincia, getGasolinerasPorMunicipio, getProvincias } from '@/app/api/routes';
import { Gasolinera } from '@/types/gasolineras';
import {getInitial, getBrandColor, getGoogleMapsUrl} from '@/app/services/generalService';

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

export async function cargarGasolinerasPorProvincia(provinciaId : string, signal?: AbortSignal){

  var gasolineras = await getGasolinerasPorProvincia(provinciaId, signal);

 return crearArrayGasolineras(gasolineras);
}

export async function cargarGasolinerasPorMunicipio(MunicipioId : string, signal?: AbortSignal){

  var gasolineras = await getGasolinerasPorMunicipio(MunicipioId, signal);

  return crearArrayGasolineras(gasolineras);
}


