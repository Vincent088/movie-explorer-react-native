import { useRouter } from "expo-router";
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
  } = useSearch();

  const isSearching = query.trim().length > 0;
  const displayMovies = isSearching ? results : movies;
  const displayLoading = isSearching ? searchLoading : moviesLoading;
  const displayError = isSearching ? searchError : moviesError;
  const displayHasMore = isSearching ? searchHasMore : hasMore;
  const displayLoadMore = isSearching ? searchLoadMore : loadMore;

  const handleMoviePress = (movie: Movie) => {
    router.push({ pathname: "/movie/[id]", params: { id: movie.id } });
  };

  if (displayLoading && displayMovies.length === 0) {
    return <LoadingIndicator />;
  }

  if (displayError && displayMovies.length === 0) {
    return <ErrorMessage message={displayError} onRetry={refresh} />;
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
