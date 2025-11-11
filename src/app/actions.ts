"use server"

import { getTuristicPlaces } from "@/lib/googlePlaces";
import { getItineraryDirections } from "@/lib/directions";
import { unstable_cache as cache } from 'next/cache';

export interface ItineraryPlace {
  id: string;
  displayName: { text: string };
  formattedAddress: string;
  rating?: number;
  photoUrl?: string;
  editorialSummary?: {
    text: string;
  }
  location: {
    lat: number;
    lng: number;
  };
}

interface Leg {
  distance: { text: string };
  duration: { text: string };
}

export interface ItineraryResult {
  places: ItineraryPlace[];
  error?: string;
  mapData?: {
    bounds: any;
    polyline: string;
  };
  legs?: Leg[];
}

async function resolveItinerary(city: string, lang: string): Promise<ItineraryResult> {
  try {
    const placesFromAPI = await getTuristicPlaces(city, lang);

    if (!placesFromAPI || placesFromAPI.length === 0) {
      return { places: [], error: `Nenhum ponto turístico encontrado para "${city}".` };
    }

    let formattedPlaces: ItineraryPlace[] = placesFromAPI.map((place: any) => ({
      id: place.id,
      displayName: place.displayName,
      formattedAddress: place.formattedAddress,
      rating: place.rating,
      editorialSummary: place.editorialSummary,
      photoUrl: place.photos?.[0]?.name ? `/api/imageProxy?photoName=${place.photos[0].name}` : undefined,
      location: {
        lat: place.location.latitude,
        lng: place.location.longitude,
      },
    }));

    let legs: Leg[] | undefined = undefined;
    let mapData: ItineraryResult['mapData'] = undefined;

    if (formattedPlaces.length > 1) {
      const placeIds = formattedPlaces.map(place => place.id);
      const directionsResponse = await getItineraryDirections(placeIds, lang);

      if (directionsResponse?.routes[0]) {
        const route = directionsResponse.routes[0];
        legs = route.legs;
        mapData = {
          bounds: route.bounds,
          polyline: route.overview_polyline.points,
        };

        if (route.waypoint_order) {
          const optimizedOrder = route.waypoint_order;
          const origin = formattedPlaces[0];
          const destination = formattedPlaces.at(-1);
          const originalWaypoints = formattedPlaces.slice(1, -1);
          const optimizedWaypoints = optimizedOrder.map((index: number) => originalWaypoints[index]);
          const reorderedPlaces = [origin, ...optimizedWaypoints, destination];
          formattedPlaces = reorderedPlaces;
        }
      }
    }
    return { places: formattedPlaces, legs, mapData };
  } catch (error) {
    console.error(error);
    return { places: [], error: "Ocorreu um erro inesperado ao buscar o itinerário." };
  }
}

export const fetchItinerary = cache(
  resolveItinerary,
  ['itineraries'], // Chave base do cache
  {
    revalidate: 259200, // 72 horas
    tags: ['itineraries'],
  }
);