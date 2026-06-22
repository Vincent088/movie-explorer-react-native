import { strings } from "@/constants";
import { searchMovies } from "@/services";
import { Movie } from "@/types";
import { useEffect, useState } from "react";

interface UseSearchResult {
  results: Movie[];
  loading: boolean;
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

export const useSearch = (): UseSearchResult => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchSearch = async (
    searchQuery: string,
    pageNumber: number,
    reset: boolean = false,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(searchQuery, pageNumber);
      setResults((prev) => (reset ? data.results : [...prev, ...data.results]));
      setHasMore(pageNumber < data.total_pages);
    } catch (err: any) {
      setError(err.message || strings.errors.unknown);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setPage(1);
      setHasMore(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const debounce = setTimeout(() => {
      setPage(1);
      fetchSearch(query, 1, true);
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  const loadMore = () => {
    if (!loading && hasMore && query.trim() !== "") {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSearch(query, nextPage);
    }
  };

  const retry = () => {
    if (query.trim() !== "") fetchSearch(query, 1, true);
  };

  return { results, loading, error, query, setQuery, hasMore, loadMore, retry };
};
