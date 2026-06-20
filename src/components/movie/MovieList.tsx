import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { ThemedText } from "@/components/themed-text";
import { strings } from "@/constants";
import { Movie } from "@/types";
import { FlatList, StyleSheet } from "react-native";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onMoviePress: (movie: Movie) => void;
}

export const MovieList = ({
  movies,
  loading,
  hasMore,
  onLoadMore,
  onMoviePress,
}: MovieListProps) => {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={onMoviePress} />
      )}
      contentContainerStyle={styles.content}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <LoadingIndicator /> : null}
      ListEmptyComponent={
        !loading ? (
          <ThemedText style={styles.empty}>{strings.home.noResults}</ThemedText>
        ) : null
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
