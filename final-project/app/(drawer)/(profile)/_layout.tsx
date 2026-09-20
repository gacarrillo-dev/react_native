// app/favorites/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6e45e2', // Header background color
        },
        headerTintColor: '#fff', // Header text and icons color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center the header title
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile', // Title displayed in the header
        }}
      />
    </Stack>
  );
}
