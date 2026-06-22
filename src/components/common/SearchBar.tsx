import { strings } from "@/constants";
import { useColorScheme, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#222" : "#e8e8e8",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={strings.home.searchPlaceholder}
        placeholderTextColor={isDark ? "#777" : "#999"}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
});
