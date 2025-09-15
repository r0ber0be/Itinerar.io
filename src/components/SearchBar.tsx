export default function SearchBar() {
  return (
    <div className="w-full grid place-items-center mt-5 mb-3">
      <div className="relative w-full md:w-2/3 lg:w-2/3">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5}
          stroke="currentColor" 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
          />
        </svg>

        <input
          type="text" 
          placeholder="Pesquisar cidade" 
          className="w-full px-10 py-3 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
    </div>
  )
}