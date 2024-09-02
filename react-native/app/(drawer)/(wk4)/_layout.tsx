import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Drawer } from 'expo-router/drawer'
import React from 'react'

const WeatherLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ drawerLabel: "Current Weather", title: "Current Weather" }} />
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Forecast", title: "Forecast" }} />
    </Drawer>
  )
}

export default WeatherLayout;