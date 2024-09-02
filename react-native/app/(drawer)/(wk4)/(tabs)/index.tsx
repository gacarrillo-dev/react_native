import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useForecast } from "@/hooks/useForecast";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";




const ThreeDayForecast = () => {
  const { weather, isLoading, error } = useForecast();

  const getDayName = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
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

  // Extract the forecast data
  const forecastDays = weather.forecast.forecastday;

  const renderForecastItem = ({ item }: { item: any }) => (
    <ThemedView style={styles.forecastItem}>
      <ThemedText style={styles.date}>{getDayName(item.date)}</ThemedText>
      <Image
        source={{ uri: `https:${item.day.condition.icon}` }}
        style={styles.icon}
      />
      <ThemedText style={styles.description}>{item.day.condition.text}</ThemedText>
      <ThemedText style={styles.temp}>{item.day.mintemp_f}°F | {item.day.maxtemp_f}°F</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.location}>
        {weather.location.name}, {weather.location.region}
      </ThemedText>
      <FlatList
        data={forecastDays}
        renderItem={renderForecastItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.forecastList}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  forecastList: {
    width: "100%",
  },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
  },
  description: {
    fontSize: 16,
  },
  temp: {
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default ThreeDayForecast;
