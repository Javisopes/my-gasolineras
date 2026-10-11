import { cargarGasolinerasPorProvincia } from '@/app/services/gasolineraService';
import { Filtros } from '@/types/gasolineras';

interface CacheData<T> {
  datosGasolineras: T;
  expira: number;
}

export async function obtenerGasolinerasPorProvincia(provinciaId:string, signal?: AbortSignal): Promise<any[]> {
  const LLAVE_CACHE = 'provincia_'+provinciaId;
  const TIEMPO_EXPIRACION = 3 * 60 * 1000; // 3 minutos en milisegundos

  const cacheGuardada = localStorage.getItem(LLAVE_CACHE);
  const ahora = new Date().getTime();

  if (cacheGuardada) {
    const cache: CacheData<any> = JSON.parse(cacheGuardada);
    
    if (ahora < cache.expira) {
      return cache.datosGasolineras;
    }
  }

  const nuevosDatos = await cargarGasolinerasPorProvincia(provinciaId, signal)

  const copiaSeguridad: CacheData<any> = {
    datosGasolineras: nuevosDatos,
    expira: ahora + TIEMPO_EXPIRACION
  };
  localStorage.setItem(LLAVE_CACHE, JSON.stringify(copiaSeguridad));

  return nuevosDatos;
}

