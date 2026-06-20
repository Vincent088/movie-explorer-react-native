import { API } from "@/constants";
import { MovieDetail, TMDBResponse } from "@/types";
import api from "./api";

export const getPopularMovies = async (
  page: number = 1,
): Promise<TMDBResponse> => {
  const response = await api.get(API.endpoints.popularMovies, {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<TMDBResponse> => {
  const response = await api.get(API.endpoints.searchMovies, {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(API.endpoints.movieDetail(id));
  return response.data;
};
