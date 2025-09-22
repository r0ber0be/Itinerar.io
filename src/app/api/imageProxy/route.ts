import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const photoName = searchParams.get('photoName');

  if (!photoName) {
    return new NextResponse('O nome da foto é obrigatório', { status: 400 });
  }

  const API_KEY = process.env.ITINERARIO_KEY_MAPS;
  if (!API_KEY) {
    return new NextResponse('Há um problema na configuração do servidor', { status: 500 });
  }

  const googlePhotoUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${API_KEY}&maxWidthPx=400`;

  try {
    const imageResponse = await fetch(googlePhotoUrl);

    if (!imageResponse.ok) {
      return new NextResponse('Erro ao buscar a imagem do Google', { status: imageResponse.status });
    }

    const contentType = imageResponse.headers.get('content-type');

    const headers = new Headers();
    headers.set('Content-Type', contentType || 'application/octet-stream');
    headers.set(
      'Cache-Control',
      'public, max-age=86400, s-maxage=2592000'
    );

    return new Response(imageResponse.body, {
      headers: headers,
    });

  } catch (error) {
    console.error('Erro no proxy de imagem:', error);
    return new NextResponse('Erro interno no servidor', { status: 500 });
  }
}