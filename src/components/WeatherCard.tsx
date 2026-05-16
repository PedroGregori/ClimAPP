import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherDisplayData } from '@/src/types/WeatherTypes';
import { colors, spacing } from '@/src/styles/theme';

interface Props {
  data: WeatherDisplayData;
}

export function WeatherCard({ data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        {data.city}, {data.country}
      </Text>
      <Text style={styles.temp}>{data.temp}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.feelsLike}>Sensação térmica: {data.feelsLike}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  city: {
    color: colors.textMuted,
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  temp: {
    color: colors.text,
    fontSize: 72,
    fontWeight: 'bold',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  feelsLike: {
    color: colors.textMuted,
    fontSize: 14,
  },
});