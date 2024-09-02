import React from "react";
import { Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const FullScreenModal = () => {
  const { url } = useLocalSearchParams();

  if (!url) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No image URL provided!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: url as string }} style={styles.fullImage} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default FullScreenModal;
