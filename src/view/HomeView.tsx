import { WeatherCard } from "@/src/components/WeatherCard";
import { colors, spacing } from "@/src/styles/theme";
import { CitySuggestion } from "@/src/types/WeatherTypes";
import { useWeatherViewModel } from "@/src/viewmodel/useWeatherViewModel";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeView() {
  const {
    query,
    setQuery,
    suggestions,
    weather,
    loading,
    error,
    searchSuggestions,
    selectCity,
  } = useWeatherViewModel();

  function formatSuggestion(item: CitySuggestion): string {
    const parts = [item.name];
    if (item.state) parts.push(item.state);
    parts.push(item.country);
    return parts.join(", ");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>🌤 Clima</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma cidade..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.button} onPress={searchSuggestions}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator color={colors.primary} size="large" />}

        {error && <Text style={styles.error}>{error}</Text>}

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${item.lat}-${item.lon}-${index}`}
            style={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => selectCity(item)}
              >
                <Text style={styles.suggestionText}>
                  {formatSuggestion(item)}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {weather && !loading && <WeatherCard data={weather} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.md,
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  searchRow: {
    flexDirection: "row",
    width: "100%",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 14,
  },
  list: {
    width: "100%",
    marginBottom: spacing.md,
  },
  suggestionItem: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: 4,
  },
  suggestionText: {
    color: colors.text,
    fontSize: 14,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
});
