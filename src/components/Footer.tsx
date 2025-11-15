"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'pt-br';
  
  return (
    <footer role="contentinfo" className="text-center py-8 text-sm border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <Link 
            href={`/${lang}`}
            className="hover:text-blue-500 transition-colors"
          >
            {lang === 'en' ? 'Home' : 'Inicío'}
          </Link>
          <span className="hidden md:inline">•</span>
          <Link 
            href={`/${lang}/privacy`}
            className="hover:text-blue-500 transition-colors"
          >
            {lang === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
          </Link>
          <span className="hidden md:inline">•</span>
          <Link 
            href={`/${lang}/about`}
            className="hover:text-blue-500 transition-colors"
          >
            {lang === 'en' ? 'About' : 'Sobre'}
          </Link>
        </div>
        
        <p className="text-gray-300 dark:text-gray-400 mb-2"
>
          © {currentYear} Itinerar - {lang === 'en' ? 'All rights reserved' : 'Todos os direitos reservados'}.
        </p>
        
        <div className="text-xs text-gray-400">Unleashed Giants</div>
      </div>
    </footer>
  )
}