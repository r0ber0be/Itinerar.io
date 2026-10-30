"use client";

import { ItineraryResult } from '@/app/actions';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from './providers/TranslationProvider';
import StarSVG from './svg/star';
import PinSVG from './svg/pin';
import ArrowLeftSVG from './svg/arrowLeft';

interface ResultsSectionProps {
  state: ItineraryResult;
  searchedCity: string;
}

export default function ResultsSection({ state, searchedCity }: Readonly<ResultsSectionProps>) {
  const { places, legs } = state;
  const dictionary = useTranslation();
  const lang = useParams<{ lang?: string }>()?.lang ?? 'pt-br';

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
    <section aria-labelledby="results-title" className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 id="results-title" className="text-2xl font-bold break-words">
          {dictionary.itineraryFor} <span className="text-accent">{searchedCity}</span>
        </h2>

        { googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-primary hover:bg-primary-hover text-on-primary font-bold h-12 px-6 rounded-2xl transition-colors duration-300 inline-flex items-center justify-center gap-2 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <PinSVG />
            {dictionary.openGoogleMapsButton}
            <span className="sr-only">{dictionary.opensInNewTab}</span>
          </a>
        )}
      </div>

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
            <li key={id} className="relative rounded-2xl overflow-hidden bg-card">
              { isStartingPoint && (
                <div className="absolute top-3 left-3 bg-primary text-on-primary text-xs font-bold px-2.5 py-1.5 rounded-lg z-10">
                  { dictionary.startPoint }
                </div>
              )}

              { isFinalPoint && !isStartingPoint && (
                <div className="absolute top-3 right-3 bg-foreground text-background text-xs font-bold px-2.5 py-1.5 rounded-lg z-10">
                  { dictionary.endPoint }
                </div>
              )}

              { legInfo && (
                <div className="absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-black/70 text-white rounded-lg z-40">
                  <p className="font-semibold inline-flex items-center gap-1.5">
                    <ArrowLeftSVG />
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
                  // Sem foto, um painel com a inicial do lugar no lugar de um aviso de erro.
                  <div className="w-full h-48 bg-primary/10 grid place-items-center">
                    <span aria-hidden="true" className="text-7xl font-bold text-accent/40">
                      { displayName.text.charAt(0) }
                    </span>
                    <span className="sr-only">{ dictionary.imageUnavailable }</span>
                  </div>
                )}

                { rating &&
                  <div className="absolute right-4 bottom-1 z-20">
                    <p className="text-lg font-bold px-2.5 py-1 grid grid-flow-col auto-cols-max items-center gap-1 rounded-lg bg-black/70 text-white tabular-nums">
                      <span className="sr-only">{dictionary.rating}:</span>
                      {rating.toLocaleString(lang)} <StarSVG />
                    </p>
                  </div>
                }
              </div>

              <div className="relative p-4 grid grid-cols-[auto_1fr] gap-x-3">
                {/* A ordem já vem do <ol>; o número é só a marca visual da parada. */}
                <span aria-hidden="true" className="size-7 mt-0.5 rounded-full bg-primary text-on-primary grid place-items-center text-sm font-bold tabular-nums">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg break-words">{displayName.text}</h3>
                  { editorialSummary
                    ? <p className="text-sm mt-1 text-pretty">{editorialSummary.text}</p>
                    : <></>
                  }
                  <p className="text-muted text-xs mt-2 break-words">
                    {formattedAddress}
                  </p>
                </div>
              </div>
            </li>
          )}
        )}
      </ol>
    </section>
  );
}