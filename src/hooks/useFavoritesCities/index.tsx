import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FavoritesCities } from '~/types';
import { DeviceStorage } from '~/utils/DeviceStorage';

type Props = {
  children: React.ReactNode;
};

export type FavoritesCitiesProviderContextType = {
  favoritesCities: FavoritesCities;
  toggleFavoritesCities(city: string): void;
};

const FavoritesCitiesProviderContext = createContext(
  {} as FavoritesCitiesProviderContextType,
);

function FavoritesCitiesProvider({ children }: Props): JSX.Element {
  const [favoritesCities, setFavoritesCities] = useState<FavoritesCities>([]);

  const storeFavoritesData = useCallback(async (data: FavoritesCities) => {
    await DeviceStorage.storeData('favorites', data);
  }, []);

  const toggleFavoritesCities = useCallback<
    FavoritesCitiesProviderContextType['toggleFavoritesCities']
  >(
    (city) => {
      const favoriteIndex = favoritesCities.findIndex(
        (favoriteCity) => favoriteCity === city,
      );
      if (favoriteIndex !== -1) {
        favoritesCities.splice(favoriteIndex, 1);
        setFavoritesCities([...favoritesCities]);
        storeFavoritesData(favoritesCities);
      } else {
        favoritesCities.push(city);
        setFavoritesCities([...favoritesCities]);
        storeFavoritesData(favoritesCities);
      }
    },
    [favoritesCities, storeFavoritesData],
  );

  const value = useMemo(
    () => ({
      favoritesCities,
      toggleFavoritesCities,
    }),
    [favoritesCities, toggleFavoritesCities],
  );

  useEffect(() => {
    async function getFavoritesData() {
      const favoriteStoredData = await DeviceStorage.getData<FavoritesCities>(
        'favorites',
      );
      if (!favoriteStoredData) return;
      setFavoritesCities(favoriteStoredData);
    }

    getFavoritesData();
  }, []);

  return (
    <FavoritesCitiesProviderContext.Provider value={value}>
      {children}
    </FavoritesCitiesProviderContext.Provider>
  );
}

const useFavoritesCities = (): FavoritesCitiesProviderContextType => {
  const context = useContext(FavoritesCitiesProviderContext);
  if (!context) {
    throw new Error(
      'useFavoritesCities must be used within an FavoritesCitiesProvider.',
    );
  }
  return context;
};

export { FavoritesCitiesProvider, useFavoritesCities };
