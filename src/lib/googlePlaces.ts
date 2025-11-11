const BASE_URL = process.env.PLACES_BASE_URL;
const API_KEY = process.env.ITINERARIO_KEY_MAPS;

export async function getTuristicPlaces(city: string, lang: string) {
  const url = `${BASE_URL}:searchText`;
  let query = "";

  if(lang === "en") {
    query = `Top tourist attractions and landmarks in ${city}`;
  } else {
    query = `Lugares interessantes e pontos turísticos em ${city}`;
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY || "",
    // Campos que queremos receber na resposta. Essencial para controlar custos!
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.photos,places.id,places.location,places.editorialSummary,places.types",
  };

  const body = JSON.stringify({
    textQuery: query,
    languageCode: lang,
    maxResultCount: 9,
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
    data.places.forEach((element: any) => {
      console.log(element.photos[0].googleMapsUri)
    });
    return data.places || [];

  } catch (error) {
    console.error("Erro ao buscar lugares:", error);
    return [];
  }
}