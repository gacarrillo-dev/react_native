// app/_layout.tsx

import React from "react";
import { Drawer } from "expo-router/drawer";
import { AntDesign } from "@expo/vector-icons";
import ProtectedRoute from "@/components/ProtectedRouter";
import CustomDrawerContent from "../../components/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <ProtectedRoute>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6e45e2",
          },
          headerShown: false,
          headerTintColor: "#fff",
          drawerActiveTintColor: "#6e45e2",
          drawerInactiveTintColor: "gray",
          drawerStyle: {
            backgroundColor: "#fff",
          },
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="(profile)"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
        {/* Add more screens here */}
      </Drawer>
    </ProtectedRoute>
  );
}
