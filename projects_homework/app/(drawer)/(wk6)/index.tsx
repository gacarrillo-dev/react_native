import { StyleSheet, Text, View, ProgressBarAndroid } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { Accelerometer } from "expo-sensors";
import * as Battery from "expo-battery";
import { useState, useEffect } from "react";

import React from "react";

const ShakeToCharge = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [shakeDetected, setShakeDetected] = useState(false);

  useEffect(() => {
    const getBatteryLevel = async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      setBatteryLevel(0);
    };

    getBatteryLevel();

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > 1.78) {
        // Adjust this threshold as needed
        setShakeDetected(true);
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    if (shakeDetected) {
      setBatteryLevel((prevLevel) => {
        if (prevLevel < 100) {
          return prevLevel + 1;
        } else {
          return 100;
        }
      });
      setShakeDetected(false);
    }
  }, [shakeDetected]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{`Battery Level: ${batteryLevel.toFixed(
        0
      )}%`}</ThemedText>
      <ThemedView style={styles.progressBar}>
        <ThemedView
          style={[
            styles.progressBar,
            {
              width: `${batteryLevel}%`,
              backgroundColor:
                batteryLevel > 80
                  ? "green"
                  : batteryLevel > 40
                  ? "yellow"
                  : "red",
            },
          ]}
        />
      </ThemedView>
      {batteryLevel === 100 && (
        <ThemedText style={[styles.text, {marginTop: 20}]}>Fully Charged!</ThemedText>
      )}
    </ThemedView>
  );
};

export default ShakeToCharge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  progressBar: {
    width: "80%",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
});
