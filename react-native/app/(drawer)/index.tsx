import { Image, StyleSheet, Platform } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{ uri: "https://images.alphacoders.com/135/1353187.png" }}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My React-Native Coursework</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Project 1: Photo Gallery</ThemedText>
        <ThemedText>
          Explore my first project where I dive into the basics of React Native.
          This project showcases my understanding of core concepts such as
          components, state, and props.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Project 2: Weather App</ThemedText>
        <ThemedText>
          This project demonstrates my ability to integrate external APIs into a
          React Native app. I implemented data fetching, state management, and
          real-time updates.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Project 3: Barcode Scanner</ThemedText>
        <ThemedText>
          In this project, I learned to persist data locally on the device using
          Async Storage. Check out how I manage user preferences and maintain
          app state across sessions.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Project 4: Shake to Charge</ThemedText>
        <ThemedText>
          In this project, I learned to persist data locally on the device using
          Async Storage. Check out how I manage user preferences and maintain
          app state across sessions.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Final Project: Full-Featured App
        </ThemedText>
        <ThemedText>
          My final project is a full-featured application that combines
          everything I've learned in the course. It includes navigation, API
          integration, local storage, and more.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 250,
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
});
