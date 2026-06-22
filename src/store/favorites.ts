import { Movie } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface FavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    const stored = await AsyncStorage.getItem("favorites");
    if (stored) {
      set({ favorites: JSON.parse(stored) });
    }
  },

  addFavorite: async (movie) => {
    const updated = [...get().favorites, movie];
    set({ favorites: updated });
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  },

  removeFavorite: async (movieId) => {
    const updated = get().favorites.filter((m) => m.id !== movieId);
    set({ favorites: updated });
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  },

  isFavorite: (movieId) => {
    return get().favorites.some((m) => m.id === movieId);
  },
}));
