import { useCallback, useEffect, useState } from "react";

import { strings } from "@/constants";
import { getPopularMovies } from "@/services";
import { Movie } from "@/types";

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export const useMovies = (): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async (pageNumber: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(pageNumber);
      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
      setHasMore(pageNumber < data.total_pages);
    } catch (err: any) {
      setError(err.message || strings.errors.unknown);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  }, [loading, hasMore, page, fetchMovies]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchMovies(1, true);
  }, [fetchMovies]);

  return { movies, loading, error, page, hasMore, loadMore, refresh };
};
