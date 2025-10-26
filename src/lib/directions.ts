"use server"

const BASE_URL = process.env.DIRECTIONS_BASE_URL;
const API_KEY = process.env.ITINERARIO_KEY_MAPS;

export async function getItineraryDirections(placeIds: string[], lang: string) {
  if (placeIds.length < 2) return null;
  
  const origin = `place_id:${placeIds[0]}`;
  const destination = `place_id:${placeIds.at(-1)}`;
  const waypointIds = placeIds.slice(1, -1).map(id => `place_id:${id}`);

  if (!BASE_URL || !API_KEY) {
    console.error("Erro ao buscar direções: variáveis de ambiente necessárias não configuradas.");
    return null;
  }

  // optimize:waypoints=true otimiza a ordem das paradas
  const params = new URLSearchParams({
    origin,
    destination,
    key: API_KEY,
    language: lang,
    mode: "driving", // ou walking, transit
  });

  if (waypointIds.length > 0) {
    params.set("waypoints", `optimize:true|${waypointIds.join("|")}`);
  }

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Erro na API de Direções: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar direções:", error);
    return null;
  }
}