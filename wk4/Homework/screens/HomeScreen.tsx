import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <ImageBackground 
      source={{ uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/07/red-sunset-anime-wallpaper.jpg' }} // Replace with your own image URL
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>to my React Native Course Project Showcase</Text>
        <Text style={styles.description}>*hidden menu on right (swipe left)
          
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default HomeScreen;
