'use client';

import { useFormStatus } from "react-dom";

export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <div className="grid place-items-center w-full">
      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl px-6 py-3 w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
      >
        Buscar
      </button>
    </div>
  )
}