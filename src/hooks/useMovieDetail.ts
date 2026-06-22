import { useCallback, useEffect, useState } from 'react';
import { MovieDetail } from '@/types';
import { getMovieDetail } from '@/services';
import { strings } from '@/constants';

interface UseMovieDetailResult {
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useMovieDetail = (id: number): UseMovieDetailResult => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetail(id);
        if (isMounted) setMovie(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || strings.errors.unknown);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [id, retryCount]);

  const refresh = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return { movie, loading, error, refresh };
};
