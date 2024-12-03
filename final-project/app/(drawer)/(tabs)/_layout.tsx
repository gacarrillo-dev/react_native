import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6e45e2',
        headerShown: false,
      }}>
    
      <Tabs.Screen
        name="(events)"
        options={{
          title: "Near You",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search-circle" : "search-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart-circle" : "heart-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
