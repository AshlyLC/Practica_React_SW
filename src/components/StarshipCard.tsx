// Componente independiente para mostrar la tarjeta de cada nave
// Recibe todas las propiedades de la nave como props
interface StarshipCardProps {
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

export default function StarshipCard({
  name,
  model,
  manufacturer,
  starship_class,
  max_atmosphering_speed,
  crew,
  passengers,
  cargo_capacity,
  hyperdrive_rating
}: StarshipCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-400 transition-colors">
      {/* Nombre de la nave como título */}
      <h2 className="text-xl font-bold mb-2 text-yellow-400">
        {name}
      </h2>
      
      {/* Detalles de la nave */}
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold text-gray-400">Modelo:</span>{" "}
          {model}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Fabricante:</span>{" "}
          {manufacturer}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Clase:</span>{" "}
          {starship_class}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Velocidad:</span>{" "}
          {max_atmosphering_speed}
        </p>
        <p>
          <span className="font-semibold text-gray-400">
            Tripulación:
          </span>{" "}
          {crew}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Pasajeros:</span>{" "}
          {passengers}
        </p>
        <p>
          <span className="font-semibold text-gray-400">
            Capacidad de carga:
          </span>{" "}
          {cargo_capacity}
        </p>
        <p>
          <span className="font-semibold text-gray-400">
            Hiperimpulsor:
          </span>{" "}
          {hyperdrive_rating}
        </p>
      </div>
    </div>
  );
}