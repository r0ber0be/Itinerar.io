const BASE_URL = process.env.PLACES_BASE_URL;
const API_KEY = process.env.ITINERARIO_KEY_MAPS;

export async function getTuristicPlaces(city: string) {
  const url = `${BASE_URL}:searchText`;
  const query = `Lugares interessantes e pontos turísticos em ${city}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY || "",
    // Campos que queremos receber na resposta. Essencial para controlar custos!
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.photos,places.id,places.location",
  };

  const body = JSON.stringify({
    textQuery: query,
    languageCode: "pt-br",
    maxResultCount: 3,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Google Places: ${response.statusText}`);
    }

    const data = await response.json();
    return data.places || [];

  } catch (error) {
    console.error("Erro ao buscar lugares:", error);
    return [];
  }
}