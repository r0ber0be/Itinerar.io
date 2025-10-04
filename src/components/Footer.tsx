export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-4 text-sm">
      <div className="mx-auto max-w-7xl">
        <p className="text-gray-500">
          © {currentYear} Itinerar - Todos os direitos reservados.
        </p>
        <div className="text-xs text-gray-400 mt-2">Unleashed Giants - Awin</div>
      </div>
    </footer>
  )
}