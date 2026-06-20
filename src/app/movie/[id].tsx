import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorMessage } from '@/components/common/ErrorMessage';
import { LoadingIndicator } from '@/components/common/LoadingIndicator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API } from '@/constants/api';
import { strings } from '@/constants';
import { useMovieDetail } from '@/hooks/useMovieDetail';
import { useFavoritesStore } from '@/store/favorites';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { movie, loading, error, refresh } = useMovieDetail(Number(id));


  const isFav = useFavoritesStore(
    (state) => state.favorites.some((m) => m.id === Number(id))
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
      <ScrollView bounces={false}>
        {backdropUrl && (
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
        )}

        <SafeAreaView edges={['bottom']} style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              {movie.title}
            </ThemedText>
            <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={28}
                color={isFav ? '#E50914' : '#888'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.rating}>
              ⭐ {movie.vote_average.toFixed(1)}
            </ThemedText>
            <ThemedText style={styles.date}>{movie.release_date}</ThemedText>
            {movie.runtime > 0 && (
              <ThemedText style={styles.runtime}>{movie.runtime} min</ThemedText>
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

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {strings.detail.overview}
          </ThemedText>
          <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backText}>{'< '}{strings.common.back}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  runtime: {
    fontSize: 14,
    color: '#999',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 8,
  },
  overview: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
