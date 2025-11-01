"use client";
import { useEffect } from "react";

export default function AdsBanner() {
  useEffect(() => {
    // Define as opções globais ANTES de carregar o script
    (globalThis as any).atOptions = {
      key: "4fe21a10a0b0042241108ed0e0dfd043",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    // Cria o script do anunciante
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//www.highperformanceformat.com/4fe21a10a0b0042241108ed0e0dfd043/invoke.js";
    script.async = true;

    // Injeta o script no contêiner do anúncio
    const container = document.getElementById("ad-container");
    if (container) container.appendChild(script);
  }, []);

  return (
    <aside className="hidden lg:block col-span-2 mt-2.5">
      <div
        id="ad-container"
        className="w-[160px] h-[600px] mx-auto bg-transparent"
      ></div>
    </aside>
  );
}
