import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoritesStore } from '../../store/favorites';
import { Movie } from '../../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/inception.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'A thief who steals corporate secrets.',
  release_date: '2010-07-16',
  vote_average: 8.8,
  genre_ids: [28, 878],
};

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
    jest.clearAllMocks();
  });

  it('starts with an empty favorites list', () => {
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('adds a movie to favorites', async () => {
    await useFavoritesStore.getState().addFavorite(mockMovie);
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    expect(useFavoritesStore.getState().favorites[0].id).toBe(1);
  });

  it('removes a movie from favorites', async () => {
    await useFavoritesStore.getState().addFavorite(mockMovie);
    await useFavoritesStore.getState().removeFavorite(1);
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('isFavorite returns true for a saved movie', async () => {
    await useFavoritesStore.getState().addFavorite(mockMovie);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
  });

  it('isFavorite returns false for a movie not in favorites', () => {
    expect(useFavoritesStore.getState().isFavorite(999)).toBe(false);
  });

  it('persists favorites to AsyncStorage on add', async () => {
    await useFavoritesStore.getState().addFavorite(mockMovie);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([mockMovie]),
    );
  });
});
