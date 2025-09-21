"use server"

import { getTuristicPlaces, getPhotoUrl } from "@/lib/googlePlaces";
import { getItineraryDirections } from "@/lib/directions";

export interface ItineraryPlace {
  id: string;
  displayName: { text: string };
  formattedAddress: string;
  rating?: number;
  websiteUri?: string;
  photoUrl?: string;
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

export async function generateItinerary(
  prevState: any,
  formData: FormData
): Promise<ItineraryResult> {
  
  const city = formData.get("city") as string;

  if (!city) {
    return { places: [], error: "Por favor, digite o nome de uma cidade." };
  }

  try {
    const placesFromAPI = await getTuristicPlaces(city);

    if (!placesFromAPI || placesFromAPI.length === 0) {
      return { places: [], error: `Nenhum ponto turístico encontrado para "${city}".` };
    }

    let formattedPlaces: ItineraryPlace[] = placesFromAPI.map((place: any) => ({
      id: place.id,
      displayName: place.displayName,
      formattedAddress: place.formattedAddress,
      rating: place.rating,
      websiteUri: place.websiteUri,
      photoUrl: place.photos?.[0]?.name ? getPhotoUrl(place.photos[0].name) : undefined,
      location: {
        lat: place.location.latitude,
        lng: place.location.longitude,
      },
    }));

    let legs: Leg[] | undefined = undefined;
    let mapData: ItineraryResult['mapData'] = undefined;
    
    // OTIMIZANDO A ROTA E REORDENANDO A LISTA
    if (formattedPlaces.length > 1) {
      const placeIds = formattedPlaces.map(place => place.id);
      const directionsResponse = await getItineraryDirections(placeIds);
      
      // Verifica se a otimização funcionou e reordena
      if (directionsResponse && directionsResponse.routes[0]) {
        const route = directionsResponse.routes[0];
        
        legs = route.legs;
        mapData = {
          bounds: route.bounds,
          polyline: route.overview_polyline.points,
        };
        
        if (route.waypoint_order) {
          const optimizedOrder = route.waypoint_order;
          
          const origin = formattedPlaces[0];
          const destination = formattedPlaces[formattedPlaces.length - 1];
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