import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { strings } from "@/constants";
import { API } from "@/constants/api";
import { useMovieDetail } from "@/hooks/useMovieDetail";
import { useFavoritesStore } from "@/store/favorites";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { movie, loading, error, refresh } = useMovieDetail(Number(id));

  const isFav = useFavoritesStore((state) =>
    state.favorites.some((m) => m.id === Number(id)),
  );
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} onRetry={refresh} />;
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `${API.imageUrl}${movie.backdrop_path}`
    : null;

  const handleFavoritePress = () => {
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {backdropUrl ? (
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
        ) : (
          <View style={styles.backdropPlaceholder} />
        )}

        <SafeAreaView edges={["bottom"]} style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              {movie.title}
            </ThemedText>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={26}
                color={isFav ? "#E50914" : "#888"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.rating}>
              ⭐ {movie.vote_average.toFixed(1)}
            </ThemedText>
            <ThemedText style={styles.meta}>{movie.release_date}</ThemedText>
            {movie.runtime > 0 && (
              <ThemedText style={styles.meta}>{movie.runtime} min</ThemedText>
            )}
          </View>

          {movie.genres.length > 0 && (
            <View style={styles.genreContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreTag}>
                  <ThemedText style={styles.genreText}>{genre.name}</ThemedText>
                </View>
              ))}
            </View>
          )}

          <ThemedText style={styles.sectionTitle}>
            {strings.detail.overview}
          </ThemedText>
          <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView
        edges={["top"]}
        style={styles.backContainer}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  backdropPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#1a1a1a",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 22,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  rating: {
    fontSize: 15,
    fontWeight: "600",
  },
  meta: {
    fontSize: 13,
    color: "#888",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreTag: {
    backgroundColor: "#E50914",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  genreText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 4,
  },
  overview: {
    fontSize: 15,
    lineHeight: 24,
    color: "#aaa",
  },
  backContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    gap: 0,
  },
  backText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 2,
  },
});
