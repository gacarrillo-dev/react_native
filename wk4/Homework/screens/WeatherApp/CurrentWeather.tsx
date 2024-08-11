import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import useFetch from "../../hooks/useFetch";
import { API_KEY } from "@env";

const CurrentWeatherScreen = () => {
  const { data, loading, error } = useFetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=West Warwick`
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.location}>
        {data.location.name}, {data.location.region}
      </Text>
      <Image
        source={{ uri: `https:${data.current.condition.icon}` }}
        style={styles.icon}
      />
      <Text style={styles.description}>{data.current.condition.text}</Text>
      <Text style={styles.temp}>{data.current.temp_f}°F</Text>
      <Text style={styles.feels}>Feels like {data.current.feelslike_f}</Text>
      <Text style={styles.feels}>{data.location.country}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 32,
    marginTop: 5,
    marginBottom: 10,
  },
  feels: {
    fontSize: 18,
    marginTop: 5,
  },
  temp: {
    fontSize: 48,
  },
});

export default CurrentWeatherScreen;
