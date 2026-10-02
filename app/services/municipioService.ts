import { Gasolinera, Municipio } from '@/types/gasolineras';
import { getProvincias, getMunicipiosPorProvincia } from '@/app/api/routes';

    export async function cargarMunicipios(provinciaId: string, gasolineras: Gasolinera[], signal?: AbortSignal): Promise<Municipio[]> {

      const municipiosConGasolinera = new Set(
        gasolineras.map(g => g.IDMunicipio)
      );

      var municipios = await getMunicipiosPorProvincia(provinciaId);

      try {
        return municipios.filter(m => municipiosConGasolinera.has(m.IDMunicipio));

      } catch (e) {
        if ((e as Error).name !== "AbortError"){
            throw new Error('Error al cargar municipios');
        }
        return [];
      }
    }


