import { Drawer } from "expo-router/drawer";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function drawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{ drawerPosition: "right", drawerType: "slide", swipeEnabled: true, headerShown: false  }}>
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: "Home", title: "Home" }}
      />
      <Drawer.Screen
        name="(wk3)"
        options={{ drawerLabel: "Week 3 - Photo Gallery", title: "Week 3" }}
      />
      <Drawer.Screen
        name="(wk4)"
        options={{ drawerLabel: "Week 4 - Weather App", title: "Week 4" }}
      />
      <Drawer.Screen
        name="(wk5)"
        options={{ drawerLabel: "Week 5 - Barcode Scanner", title: "Week 5" }}
      />
      <Drawer.Screen
        name="(wk6)/index"
        options={{ drawerLabel: "Week 6 - Shake to Charge", title: "Week 6" }}
      />
    </Drawer>
  );
}
