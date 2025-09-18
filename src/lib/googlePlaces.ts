const BASE_URL = "https://places.googleapis.com/v1/places";
const API_KEY = process.env.ITINERARIO_KEY_MAPS;

export async function getTuristicPlaces() {
 const url = `${BASE_URL}:searchText`;
  const query = `Pontos turísticos em ${"Rio de janeiro"}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY || "",
    // Campos que queremos receber na resposta. Essencial para controlar custos!
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.photos,places.id",
  };

  const body = JSON.stringify({
    textQuery: query,
    languageCode: "pt-BR",
    maxResultCount: 1,
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

    console.log(data.places)
    return data.places || [];

  } catch (error) {
    console.error("Erro ao buscar lugares:", error);
    return [];
  }
}