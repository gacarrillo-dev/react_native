import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import useFetch from "../../../hooks/useFetch";
import { API_KEY } from "@env";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const SevenDayForecast = () => {
  const { data, loading, error } = useFetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=West Warwick&days=7`
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  // Extract the forecast data
  const forecastDays = data.forecast.forecastday;

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const renderForecastItem = ({ item }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.date}>{getDayName(item.date)}</Text>
      <Image
        source={{ uri: `https:${item.day.condition.icon}` }}
        style={styles.icon}
      />
      <Text style={styles.description}>{item.day.condition.text}</Text>
      <Text style={styles.temp}>
        {item.day.mintemp_f}°F | {item.day.maxtemp_f}°F
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.location}>
        {data.location.name}, {data.location.region}
      </Text>
      <FlatList
        data={forecastDays}
        renderItem={renderForecastItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.forecastList}
      />
    </View>
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
});

export default SevenDayForecast;
