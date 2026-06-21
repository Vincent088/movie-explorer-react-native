import { useCallback } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { ThemedText } from "@/components/themed-text";
import { strings } from "@/constants";
import { Movie } from "@/types";
import { MovieCard } from "./MovieCard";

const getNumColumns = (width: number) => {
  if (width >= 1200) return 6;
  if (width >= 900) return 5;
  if (width >= 600) return 4;
  if (width >= 480) return 3;
  return 2;
};

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onMoviePress: (movie: Movie) => void;
  error?: string | null;
  onRetry?: () => void;
}

export const MovieList = ({
  movies,
  loading,
  hasMore,
  onLoadMore,
  onMoviePress,
  error,
  onRetry,
}: MovieListProps) => {
  const { width } = useWindowDimensions();
  const numColumns = getNumColumns(width);

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard movie={item} onPress={onMoviePress} />
    ),
    [onMoviePress],
  );

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  return (
    <FlatList
      key={numColumns}
      data={movies}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      ListFooterComponent={loading && movies.length > 0 ? <LoadingIndicator /> : null}
      ListEmptyComponent={
        loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorMessage message={error} onRetry={onRetry} />
        ) : (
          <ThemedText style={styles.empty}>{strings.home.noResults}</ThemedText>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
});
