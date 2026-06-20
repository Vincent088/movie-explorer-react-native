import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { strings } from "@/constants";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.message}>{message}</ThemedText>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <ThemedText style={styles.buttonText}>
            {strings.common.retry}
          </ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#E50914",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
