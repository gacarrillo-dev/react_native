import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Stacklayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Scanner' }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  )
}

export default Stacklayout