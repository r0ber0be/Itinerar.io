import { ItineraryResult } from '@/app/actions';
import { useMemo } from 'react';

interface ResultsSectionProps {
  state: ItineraryResult;
  searchedCity: string;
}

export default function ResultsSection({ state, searchedCity }: ResultsSectionProps) {
  const { places, legs } = state;

  const googleMapsUrl = useMemo(() => {
    if (!places || places.length < 2) {
      return '';
    }

    const baseUrl = 'https://www.google.com/maps/dir/';

    const origin = `origin=${encodeURIComponent(places[0].formattedAddress)}`;
    const destination = `destination=${encodeURIComponent(places[places.length - 1].formattedAddress)}`;

    const waypoints = places
      .slice(1, -1)
      .map(place => encodeURIComponent(place.formattedAddress))
      .join('|');

    return `${baseUrl}?api=1&${origin}&${destination}&waypoints=${waypoints}&travelmode=driving`;
  }, [places]);

  if (state.error) {
    return <p className="text-center text-red-500 mt-4">{state.error}</p>;
  }

  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 mt-3">
      <h2 className="text-2xl font-bold mb-4">
        Roteiro para {searchedCity}
      </h2>

      { googleMapsUrl && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 font-bold my-4 py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Abrir Rota no Google Maps
        </a>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { places.map((place, index) => {
          const isStartingPoint = index === 0;
          const isFinalPoint = index === places.length - 1;
          
          const legInfo = (index > 0 && legs) ? {
            distance: legs[index - 1].distance.text,
            duration: legs[index - 1].duration.text,
          } : undefined;

          return (
            <div key={place.id} className="relative border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              { isStartingPoint && (
                <div className="absolute top-2 left-2 bg-green-500 text-xs font-bold p-2 rounded-lg z-10">
                  Ponto de Partida
                </div>
              )}

              { isFinalPoint && !isStartingPoint && (
                <div className="absolute top-2 right-2 bg-red-500 text-xs font-bold p-2 rounded-lg z-10">
                  Ponto Final
                </div>
              )}
              
              { legInfo && (
                <div className="absolute top-2 left-2 p-2 text-xs bg-blue-500 rounded-lg">
                  <p className="font-semibold">
                    {'<-'} Há {legInfo.duration} ({legInfo.distance})
                  </p>
                </div>
              )}

              { place.photoUrl ? (
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
          )}
        )}
      </div>
    </div>
  );
}