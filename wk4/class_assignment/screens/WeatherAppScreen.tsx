import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Placeholder for WeatherAppScreen
const WeatherAppScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Weather App Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherAppScreen;
