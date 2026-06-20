export const API = {
  endpoints: {
    popularMovies: "/movie/popular",
    searchMovies: "/search/movie",
    movieDetail: (id: number) => `/movie/${id}`,
  },
};
