const API_KEY = process.env.ITINERARIO_KEY_MAPS;

export async function getItineraryDirections(placeIds: string[]) {
  if (placeIds.length < 2) return null;

  const url = "https://maps.googleapis.com/maps/api/directions/json";
  
  const origin = `place_id:${placeIds[0]}`;
  const destination = `place_id:${placeIds[placeIds.length - 1]}`;
  const waypoints = placeIds.slice(1, -1).map(id => `place_id:${id}`).join('|');

  // optimize:waypoints=true otimiza a ordem das paradas
  const params = new URLSearchParams({
    origin,
    destination,
    types: "tourist_attraction",
    waypoints: `optimize:true|${waypoints}`,
    key: API_KEY || "",
    language: "pt-BR",
    mode: "driving", // ou walking, transit
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Erro na API de Direções: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Erro ao buscar direções:", error);
    return null;
  }
}