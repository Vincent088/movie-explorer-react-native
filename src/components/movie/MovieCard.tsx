import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { API } from "@/constants/api";
import { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

const getRatingColor = (rating: number) => {
  if (rating >= 7) return "#27AE60";
  if (rating >= 5) return "#F39C12";
  return "#E50914";
};

export const MovieCard = memo(({ movie, onPress }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `${API.imageUrl}${movie.poster_path}`
    : null;

  const year = movie.release_date?.substring(0, 4) ?? "";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      {posterUrl ? (
        <Image
          source={{ uri: posterUrl }}
          style={styles.poster}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(movie.vote_average) }]}>
        <Text style={styles.ratingText}>★ {movie.vote_average.toFixed(1)}</Text>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        {year ? <Text style={styles.date}>{year}</Text> : null}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
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
    backgroundColor: "#2a2a2a",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  ratingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  date: {
    color: "#aaa",
    fontSize: 10,
    marginTop: 3,
  },
});
