import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { ThemedText } from "@/components/themed-text";
import { strings } from "@/constants";
import { Movie } from "@/types";
import { MovieCard } from "./MovieCard";

export const getNumColumns = (width: number) => {
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
  const listRef = useRef<FlatList<Movie>>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard movie={item} onPress={onMoviePress} />
    ),
    [onMoviePress],
  );

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setShowScrollTop(e.nativeEvent.contentOffset.y > 300);
    },
    [],
  );

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        key={numColumns}
        data={movies}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        onEndReached={hasMore ? onLoadMore : undefined}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop} activeOpacity={0.8}>
          <Ionicons name="chevron-up" size={22} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
