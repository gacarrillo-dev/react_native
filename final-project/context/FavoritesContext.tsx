// contexts/FavoritesContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventData {
  id: string;
  name: string;
  date: string;
  venue: string;
  imageUrl: string;
  city: string;
  state: string;
}

interface FavoritesContextProps {
  favorites: EventData[];
  addFavorite: (event: EventData) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<EventData[]>([]);

  useEffect(() => {
    // Load favorites from AsyncStorage on mount
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    // Save favorites to AsyncStorage whenever it changes
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const addFavorite = (event: EventData) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === event.id);
      if (!isAlreadyFavorite) {
        return [...prevFavorites, event];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (eventId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== eventId));
  };

  const isFavorite = (eventId: string) => {
    return favorites.some((fav) => fav.id === eventId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
