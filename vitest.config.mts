import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  // Os testes não dependem de CSS; evita carregar o plugin do Tailwind no Vite.
  css: {
    postcss: {},
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    env: {
      NEXT_PUBLIC_BASE_URL: "https://itinerar.com.br",
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}"],
      reporter: ["text-summary", "lcov"],
    },
  },
});
