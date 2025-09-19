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
}

export interface ItineraryResult {
  places: ItineraryPlace[];
  error?: string;
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
    }));
    
    // OTIMIZANDO A ROTA E REORDENANDO A LISTA
    if (formattedPlaces.length > 1) {
      const placeIds = formattedPlaces.map(place => place.id);
      
      const directionsResponse = await getItineraryDirections(placeIds);
      
      // Verifica se a otimização funcionou e reordena
      if (directionsResponse && directionsResponse.routes[0]?.waypoint_order) {
        const optimizedOrder = directionsResponse.routes[0].waypoint_order;
        
        // Separa os pontos intermediários do início e fim
        const origin = formattedPlaces[0];
        const destination = formattedPlaces[formattedPlaces.length - 1];
        const originalWaypoints = formattedPlaces.slice(1, -1);
        
        // Reordena os waypoints
        const optimizedWaypoints = optimizedOrder.map((index: number) => originalWaypoints[index]);
      
        const reorderedPlaces = [origin, ...optimizedWaypoints, destination];
        formattedPlaces = reorderedPlaces;
      }
    }
    return { places: formattedPlaces };
  } catch (error) {
    console.error(error);
    return { places: [], error: "Ocorreu um erro inesperado ao buscar o itinerário." };
  }
}