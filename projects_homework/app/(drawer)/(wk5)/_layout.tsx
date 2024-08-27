import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Barcodelayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}>
      <Tabs.Screen name="(scanner)" options={{ title: "Barcode Scanner",
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? "barcode" : "barcode-outline"} color={color} />
       )
       }} />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "star" : "star-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Barcodelayout;
