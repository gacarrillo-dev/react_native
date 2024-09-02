import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useWeather } from '@/hooks/useWeather';

const CurrentWeatherScreen = () => {
  const { weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  if (!weather) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>No weather data available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.location}>
        {weather.location.name}, {weather.location.region}
      </ThemedText>
      <Image
        source={{ uri: `https:${weather.current.condition.icon}` }}
        style={styles.icon}
      />
      <ThemedText style={styles.description}>{weather.current.condition.text}</ThemedText>
      <ThemedText style={styles.temp}>{weather.current.temp_f}°F</ThemedText>
      <ThemedText style={styles.feels}>Feels like {weather.current.feelslike_f}°F</ThemedText>
      <ThemedText style={styles.feels}>{weather.location.country}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 24,
    marginTop: 5,
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 10,
    paddingTop: 22,
  },
  feels: {
    fontSize: 18,
    marginTop: 5,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default CurrentWeatherScreen;