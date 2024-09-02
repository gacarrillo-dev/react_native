import { Tabs } from "expo-router/tabs";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const ForecastLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}>
      <Tabs.Screen name="index" options={{ title: "3 day forecast",
         tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />
         )
       }} />
      <Tabs.Screen name="sevenDay" options={{ title: "7 day forecast",
         tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "calendar-number" : "calendar-number-outline"} color={color} />
         )
       }} />
    </Tabs>
  );
};

export default ForecastLayout;
