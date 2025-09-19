import { ItineraryResult } from '@/app/actions';

interface ResultsSectionProps {
  state: ItineraryResult;
}

export default function ResultsSection({ state }: ResultsSectionProps) {
  if (state.error) {
    return <p className="text-center text-red-500 mt-4">{state.error}</p>;
  }

  if (!state.places || state.places.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4">Sugestões de Roteiro para {state.places.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.places.map((place) => (
          <div key={place.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            {place.photoUrl ? (
              <img
                src={place.photoUrl}
                alt={place.displayName.text}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagem não disponível</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{place.displayName.text}</h3>
              <p className="text-gray-600 text-sm mt-1">{place.formattedAddress}</p>
              {place.rating && <p className="mt-2">Avaliação: {place.rating} ⭐</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}