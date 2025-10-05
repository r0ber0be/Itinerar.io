'use client';

import { createContext, useContext } from 'react';

type Dictionary = {
  mainTitle: string;
  featuredRoutes: string;
  searchPlaceholder: string;
  searchButton: string;
  itineraryFor: string;
  openGoogleMapsButton: string;
  startPoint: string;
  endPoint: string;
  imageUnavailable: string;
};

const TranslationContext = createContext<Dictionary | null>(null);

export function TranslationProvider({
  children,
  dictionary,
}: Readonly<{
  children: React.ReactNode;
  dictionary: Dictionary;
}>) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === null) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}