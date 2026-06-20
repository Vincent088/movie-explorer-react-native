import { ThemedView } from "@/components/themed-view";
import { ActivityIndicator, StyleSheet } from "react-native";

export const LoadingIndicator = () => {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
