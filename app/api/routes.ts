import { RespuestaGasolineras, Gasolinera, Provincia, Municipio } from '@/types/gasolineras';

export async function getGasolineras(
  provincia: string
): Promise<Gasolinera[]> {
  const urlGasolineras = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

  const response = await fetch(urlGasolineras, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error('No es posible recuperar los datos');
  }

  const data: RespuestaGasolineras = await response.json();

  return data.ListaEESSPrecio;
}

export async function getProvincias(){
  const urlProvincias = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/';

  const response = await fetch(urlProvincias, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error('No es posible recuperar los datos de las provincias');
  }

  const data: Provincia[] = await response.json();

  return data;
}

export async function getGasolinerasPorProvincia(
  provinciaId: string,
  signal?: AbortSignal
): Promise<Gasolinera[]> {
  const urlGasolineras = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${provinciaId}`;

  const response = await fetch(urlGasolineras, {
    signal,
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error('No es posible recuperar los datos de las gasolineras por provincia');
  }

  const data: RespuestaGasolineras = await response.json();  

  return data.ListaEESSPrecio;
}


export async function getGasolinerasPorMunicipio(
  municipioId: string,
  signal?: AbortSignal
): Promise<Gasolinera[]> {
  const urlGasolineras = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${municipioId}`;

  const response = await fetch(urlGasolineras, {
    signal,
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error('No es posible recuperar los datos de las gasolineras municipio');
  }

  const data: RespuestaGasolineras = await response.json();  

  return data.ListaEESSPrecio;
}

export async function getMunicipiosPorProvincia(provinciaId: string):Promise<Municipio[]>{

const urlMunicipios = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${provinciaId}`;

  const response = await fetch(urlMunicipios, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error('No es posible recuperar los datos de los Municipios');
  }

  const data : Municipio[] = await response.json();

  return data;

}