'use client';

import { createContext, useContext } from 'react';

type Dictionary = {
  mainTitle: string;
  mainTitleCities: Array<string>;
  featuredRoutes: string;
  searchPlaceholder: string;
  searchButton: string;
  searchingButton: string;
  itineraryFor: string;
  openGoogleMapsButton: string;
  startPoint: string;
  endPoint: string;
  imageUnavailable: string;
  loadingItinerary: string;
  cityTooLong: string;
  skipToContent: string;
  opensInNewTab: string;
  rating: string;
  fromPreviousStop: string;
  lead: string;
  discover: {
    title: string;
    firstParagraph: string;
    secondParagraph: string;
  },
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