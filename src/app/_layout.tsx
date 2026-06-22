import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import { useEffect } from "react";
import { useFavoritesStore } from "@/store/favorites";

export default function RootLayout() {
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', gestureEnabled: true }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="movie/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
