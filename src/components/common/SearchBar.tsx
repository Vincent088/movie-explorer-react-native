import { strings } from "@/constants";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={strings.home.searchPlaceholder}
        placeholderTextColor="#555"
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
    backgroundColor: "#222",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
});
