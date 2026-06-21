import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { SearchBar } from "@/components/common/SearchBar";
import { MovieList } from "@/components/movie/MovieList";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { strings } from "@/constants";
import { useMovies } from "@/hooks/useMovies";
import { useSearch } from "@/hooks/useSearch";
import { Movie } from "@/types";

export default function HomeScreen() {
  const router = useRouter();
  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
    hasMore,
    loadMore,
    refresh,
  } = useMovies();
  const {
    results,
    loading: searchLoading,
    error: searchError,
    query,
    setQuery,
    hasMore: searchHasMore,
    loadMore: searchLoadMore,
    retry: searchRetry,
  } = useSearch();

  const isSearching = query.trim().length > 0;

  const displayMovies = useMemo(
    () => (isSearching ? results : movies),
    [isSearching, results, movies],
  );
  const displayLoading = isSearching ? searchLoading : moviesLoading;
  const displayHasMore = isSearching ? searchHasMore : hasMore;
  const displayLoadMore = isSearching ? searchLoadMore : loadMore;

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      router.push({ pathname: "/movie/[id]", params: { id: movie.id } });
    },
    [router],
  );

  if (displayLoading && displayMovies.length === 0 && !isSearching) {
    return <LoadingIndicator />;
  }

  if (moviesError && movies.length === 0 && !isSearching) {
    return <ErrorMessage message={moviesError} onRetry={refresh} />;
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          {strings.home.title}
        </ThemedText>
        <SearchBar value={query} onChangeText={setQuery} />
        <MovieList
          movies={displayMovies}
          loading={displayLoading}
          hasMore={displayHasMore}
          onLoadMore={displayLoadMore}
          onMoviePress={handleMoviePress}
          error={isSearching ? searchError : null}
          onRetry={isSearching ? searchRetry : undefined}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
