export const API = {
  baseUrl: process.env.EXPO_PUBLIC_TMDB_BASE_URL!,
  apiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY!,
  imageUrl: process.env.EXPO_PUBLIC_TMDB_IMAGE_URL!,
  endpoints: {
    popularMovies: "/movie/popular",
    searchMovies: "/search/movie",
    movieDetail: (id: number) => `/movie/${id}`,
  },
};
