import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "@/components/ThemedView";
import { Link, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function LandingPage() {
  const router = useRouter();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1, // Infinite loop
      true // Reverse on repeat
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#6e45e2", "#88d3ce"]} style={styles.background}>
        <ThemedView style={styles.homeContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Local Events</Text>

            <Animated.View style={[styles.imageContainer, animatedStyle]}>
              <Image
                source={require("../../assets/images/eventscom_cover.jpg")}
                style={styles.eventImage}
              />
            </Animated.View>

            <Text style={styles.eventDescription}>
              Discover the best local events happening nearby. Whether
              you're into monster trucks, art & theater, sports, or live music, we have something for
              everyone!
            </Text>

            <View style={styles.buttonContainer}>
              {/* Login Button */}
                <TouchableOpacity style={styles.authButton} onPress={()=> router.replace('/login')}>
                  <LinearGradient
                    colors={["#6e45e2", "#88d3ce"]}
                    style={styles.authButtonGradient}
                  >
                    <Text style={styles.authButtonText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
          

              {/* Sign Up Button */}
              
                <TouchableOpacity style={styles.authButton} onPress={()=> router.replace('/signup')}> 
                  <LinearGradient
                    colors={["#6e45e2", "#88d3ce"]}
                    style={styles.authButtonGradient}
                  >
                    <Text style={styles.authButtonText}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>
              
            </View>
          </ScrollView>
        </ThemedView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  homeContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6e45e2",
  },
  imageContainer: {
    width: "80%",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  eventDescription: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  authButton: {
    width: "48%",
    borderRadius: 30,
  },
  authButtonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
