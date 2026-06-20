import { ThemedText } from "@/components/themed-text";
import { API } from "@/constants/api";
import { Movie } from "@/types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `${API.imageUrl}${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(movie)}>
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} style={styles.poster} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={styles.info}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {movie.title}
        </ThemedText>
        <ThemedText style={styles.date}>{movie.release_date}</ThemedText>
        <ThemedText style={styles.rating}>
          ⭐ {movie.vote_average.toFixed(1)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  placeholder: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#333",
  },
  info: {
    padding: 8,
    gap: 4,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  date: {
    fontSize: 11,
    color: "#999",
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
  },
});
