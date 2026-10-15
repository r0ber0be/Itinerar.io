"use client";

import { ItineraryResult } from '@/app/actions';
import { useMemo } from 'react';
import { useTranslation } from './providers/TranslationProvider';
import StarSVG from './svg/star';
import PinSVG from './svg/pin';

interface ResultsSectionProps {
  state: ItineraryResult;
  searchedCity: string;
}

export default function ResultsSection({ state, searchedCity }: Readonly<ResultsSectionProps>) {
  const { places, legs } = state;
  const dictionary = useTranslation();

  const googleMapsUrl = useMemo(() => {
    if (places.length < 2) {
      return '';
    }

    const baseUrl = 'https://www.google.com/maps/dir/';

    const origin = `origin=${encodeURIComponent(places[0].formattedAddress)}`;
    const destination = `destination=${encodeURIComponent(places.at(-1)!.formattedAddress)}`;

    const waypoints = places
      .slice(1, -1)
      .map(place => encodeURIComponent(place.formattedAddress))
      .join('|');

    return `${baseUrl}?api=1&${origin}&${destination}&waypoints=${waypoints}&travelmode=driving`;
  }, [places]);

  if (state.error) {
    return <p role="alert" className="text-center text-red-700 dark:text-red-400 mt-4">{state.error}</p>;
  }

  if (places.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="results-title" className="container mx-auto px-0 py-4 md:p-4 mt-3">
      <h2 id="results-title" className="text-2xl font-bold mb-4 break-words">
        {dictionary.itineraryFor} <span className="text-blue-700 dark:text-blue-400">{searchedCity}</span>
      </h2>

      { googleMapsUrl && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700font-bold my-4 py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-base md:text-lg text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <PinSVG />
          {dictionary.openGoogleMapsButton}
          <span className="sr-only">{dictionary.opensInNewTab}</span>
        </a>
      )}

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { places.map((place, index) => {
          const isStartingPoint = index === 0;
          const isFinalPoint = index === places.length - 1;
          
          const legInfo = (index > 0 && legs) ? {
            distance: legs[index - 1].distance.text,
            duration: legs[index - 1].duration.text,
          } : undefined;

          const { id, photoUrl, displayName, rating, editorialSummary, formattedAddress } = place;
          return (
            <li key={id} className="relative border rounded-lg overflow-hidden shadow-lg transition-transform motion-safe:hover:scale-105">
              { isStartingPoint && (
                <div className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold p-2 rounded-lg z-10">
                  { dictionary.startPoint }
                </div>
              )}

              { isFinalPoint && !isStartingPoint && (
                <div className="absolute top-2 right-2 bg-red-700 text-white text-xs font-bold p-2 rounded-lg z-10">
                  { dictionary.endPoint }
                </div>
              )}

              { legInfo && (
                <div className="absolute top-2 left-2 p-2 text-xs bg-blue-700 text-white rounded-lg z-40">
                  <p className="font-semibold">
                    <span aria-hidden="true">{'<-'}</span>
                    <span className="sr-only">{dictionary.fromPreviousStop}</span>
                    {' '}{legInfo.duration} ({legInfo.distance})
                  </p>
                </div>
              )}

              <div className="relative">
                { photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName.text}
                    width={400}
                    height={192}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-700">
                      { dictionary.imageUnavailable }
                    </span>
                  </div>
                )}

                { rating &&
                  <div className="absolute right-4 bottom-1 z-20">
                    <p className="text-xl font-bold p-2 grid grid-flow-col auto-cols-max items-center gap-1 rounded-lg bg-black/60 text-white">
                      <span className="sr-only">{dictionary.rating}:</span>
                      {rating} <StarSVG />
                    </p>
                  </div>
                }
              </div>

              <div className="relative p-4">
                <h3 className="font-bold text-lg break-words">{displayName.text}</h3>
                { editorialSummary
                  ? <p className="text-sm mt-1">{editorialSummary.text}</p>
                  : <></>
                }
                <p className="text-gray-700 dark:text-gray-300 text-xs mt-1 break-words">
                  {formattedAddress}
                </p>
              </div>
            </li>
          )}
        )}
      </ol>
    </section>
  );
}