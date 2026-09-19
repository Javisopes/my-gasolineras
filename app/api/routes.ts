import { RespuestaGasolineras, Gasolinera } from '@/types/gasolineras';

export async function getGasolinerasPorProvincia(
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

  return data.ListaEESSPrecio.filter(
    (g) => g.Provincia.toUpperCase() === provincia.toUpperCase()
  );
}