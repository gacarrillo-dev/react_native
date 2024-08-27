import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function PhotoGalleryLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ title: "Photo Gallery" }} />
      <Stack.Screen name="details" options={{ title: "Photo Details" }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Full Screen Image" }}
      />
    </Stack>
  );
}
