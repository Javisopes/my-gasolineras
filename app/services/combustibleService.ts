import { Gasolinera, Combustible } from '@/types/gasolineras';

  export async function cargarCombustibles(gasolineras: Gasolinera[],signal?: AbortSignal):Promise<Combustible[]>{

    var combustiblesFiltrados: { NombreProducto: string }[] = [];

    for(var gasolinera_ of gasolineras){
      Object.entries(gasolinera_["Precios"]).forEach(([nombreCombustible]) => {
        if (!combustiblesFiltrados.some(c => c.NombreProducto === nombreCombustible) && nombreCombustible !== "") {
          combustiblesFiltrados.push({ NombreProducto: nombreCombustible });
        }
      });
    }
    combustiblesFiltrados.sort((a, b) => 
      a.NombreProducto.localeCompare(b.NombreProducto)
    );
    return combustiblesFiltrados;
  }



