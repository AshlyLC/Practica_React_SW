import { useState, useEffect } from "react";
import StarshipCard from "./StarshipCard"; 

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  hyperdrive_rating: string;
}

export default function Starships() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Starship[]>([]); 

  const mockShips: Starship[] = [
    {
      name: "Millennium Falcon",
      model: "YT-1300 light freighter",
      manufacturer: "Corellian Engineering Corporation",
      starship_class: "Light freighter",
      max_atmosphering_speed: "1050",
      crew: "4",
      passengers: "6",
      cargo_capacity: "100000",
      hyperdrive_rating: "0.5"
    },
    {
      name: "X-wing",
      model: "T-65 X-wing",
      manufacturer: "Incom Corporation",
      starship_class: "Starfighter",
      max_atmosphering_speed: "1050",
      crew: "1",
      passengers: "0",
      cargo_capacity: "110",
      hyperdrive_rating: "1.0"
    },
    {
      name: "TIE Fighter",
      model: "TIE/ln space superiority fighter",
      manufacturer: "Sienar Fleet Systems",
      starship_class: "Starfighter",
      max_atmosphering_speed: "1200",
      crew: "1",
      passengers: "0",
      cargo_capacity: "65",
      hyperdrive_rating: "None"
    }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://swapi.dev/api/starships/");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const apiData = await response.json();
        
        if (apiData.results && Array.isArray(apiData.results)) {
          setData(apiData.results);
          setError(null);
        } else {
          throw new Error("Formato de datos inválido");
        }
      } catch (error) {
        console.error("Error al cargar datos reales:", error);
        
        setData(mockShips);
        setError("No fue posible obtener datos en tiempo real. Mostrando información de demostración.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Cargando naves espaciales...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center max-w-md">
            <div className="bg-yellow-900 border border-yellow-400 text-yellow-200 px-6 py-4 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-2">⚠️ Modo demostración</h2>
              <p className="text-sm">Mostrando información de ejemplo. Los datos en tiempo real no están disponibles.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Reintentar conexión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      {/* Mostrar advertencia si hay error pero tenemos datos de ejemplo */}
      {error && (
        <div className="bg-yellow-900 border border-yellow-400 text-yellow-200 px-6 py-4 rounded-lg mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">⚠️ Error ⚠️</h2>
          <p className="text-sm">No fue posible obtener datos en tiempo real. Se muestra la información de demostración.</p>
        </div>
      )}

      {/* Grid de naves usando el componente StarshipCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship, index) => (
          <StarshipCard
            key={`${ship.name}-${ship.model}-${index}`}
            name={ship.name}
            model={ship.model}
            manufacturer={ship.manufacturer}
            starship_class={ship.starship_class}
            max_atmosphering_speed={ship.max_atmosphering_speed}
            crew={ship.crew}
            passengers={ship.passengers}
            cargo_capacity={ship.cargo_capacity}
            hyperdrive_rating={ship.hyperdrive_rating}
          />
        ))}
      </div>

      {/* Mensaje si no hay naves para mostrar */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No se encontraron naves espaciales.</p>
        </div>
      )}
    </div>
  );
}