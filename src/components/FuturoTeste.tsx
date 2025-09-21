export default function Teste() {
  return (
    <div>
      <div className="container mx-auto p-4 mt-6">
        <h2 className="text-2xl font-bold mb-4">Sugestões de Roteiro para São Paulo</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="p-4 flex flex-col justify-between bg-white text-gray-800"> 
              <div>
                <h3 className="font-bold text-xl">Parque Ibirapuera</h3>
                <p className="text-gray-600 text-sm mt-1">Av. Pedro Álvares Cabral, s/n - Vila Mariana, São Paulo - SP, 04094-050, Brasil</p>
              </div>
              <p className="mt-4 text-gray-700 font-semibold">Avaliação: 4.8 ⭐</p>
              {/* Você pode adicionar o websiteUri aqui se quiser */}
            </div>

            {/* Lado Direito: Imagem */}
            {/* 3. Este div será sua coluna da direita */}
            <div className="w-full h-48 md:h-auto overflow-hidden"> {/* md:h-auto para preencher a altura na grid */}
              <img
                src="https://places.googleapis.com/v1/places/ChIJ0RGdBvFZzpQRQeWcrwlhk8s/photos/AciIO2fyyUWACafcFjxELdMK6zkdBJF-Si6-CrnRpdhg_WAk9kgQbFmjrOXiYgjnyI2iu2cFMGXDs0RZh2r0FjSfouqacOgj1zJrNF95Qxn4sAa6UUTAWpg5QvdZu6bUQD4lfx9wSxmuSxsf7Zx09JJIvABR2bqPDWY-REeqfAXAyFVkjcTgEGbgKIkfvRo8KIVZEONUHSf4Iv72lwFYqG04vO4oZUNfX6dUIYh0ADpL8wLWHKA4mUaXD9arZJASXoO9rWQRNmtZiTj747PZ5MmF0dCcvKFN8qXWu3JSNDi19caC4N5d-nyPhqgRMXRZxePPMlIhXOl_z9t6c3fFa-tlhqWuk0k7ONy6f-ULa7obn1hAsNSuiE0xg2mD8jUTU6z1aKz6nGvSobJVM-v9Y-q_PuWyaCmX90ISXoqiTPVftpqCe2Vv/media?key=AIzaSyCFMwAq8F7aIPfAV0Hx_RH61jl0Ux0dx6s&maxWidthPx=400"
                alt="Parque Ibirapuera"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border h-[250px] relative overflow-hidden rounded-lg shadow-lg">
        {/* Lado esquerdo */}
        <img 
          src="https://places.googleapis.com/v1/places/ChIJ0RGdBvFZzpQRQeWcrwlhk8s/photos/AciIO2fyyUWACafcFjxELdMK6zkdBJF-Si6-CrnRpdhg_WAk9kgQbFmjrOXiYgjnyI2iu2cFMGXDs0RZh2r0FjSfouqacOgj1zJrNF95Qxn4sAa6UUTAWpg5QvdZu6bUQD4lfx9wSxmuSxsf7Zx09JJIvABR2bqPDWY-REeqfAXAyFVkjcTgEGbgKIkfvRo8KIVZEONUHSf4Iv72lwFYqG04vO4oZUNfX6dUIYh0ADpL8wLWHKA4mUaXD9arZJASXoO9rWQRNmtZiTj747PZ5MmF0dCcvKFN8qXWu3JSNDi19caC4N5d-nyPhqgRMXRZxePPMlIhXOl_z9t6c3fFa-tlhqWuk0k7ONy6f-ULa7obn1hAsNSuiE0xg2mD8jUTU6z1aKz6nGvSobJVM-v9Y-q_PuWyaCmX90ISXoqiTPVftpqCe2Vv/media?key=AIzaSyCFMwAq8F7aIPfAV0Hx_RH61jl0Ux0dx6s&maxWidthPx=400"
          alt="Parque Ibirapuera" 
          className="absolute inset-0 w-12/12 h-full object-cover place-items-end"
        />
        <div className="classname-left bg-white h-full grid place-items-start p-6 relative z-10">
          <div className="text-left">
            <h2 className="text-2xl text-gray-800 font-bold">Parque Ibirapuera</h2>
            <p className="mt-2 text-gray-600">Av. Pedro Álvares Cabral, s/n - Vila Mariana, São Paulo - SP</p>
          </div>
          <div></div>
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Avaliação: 4.8 ⭐</p>
          </div>
        </div>
      </div> 
    </div>
  )
}