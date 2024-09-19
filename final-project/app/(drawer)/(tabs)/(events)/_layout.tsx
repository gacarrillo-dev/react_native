// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

// Optional: Custom header title component for consistent styling
const CustomHeaderTitle = ({ title }: { title: string }) => (
  <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', }}>
    {title}
  </Text>
);

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        // Global screen options applied to all screens
        headerStyle: {
          backgroundColor: '#6e45e2', // Header background color
        },
        headerTintColor: '#fff', // Header text and icons color
        headerTitleStyle: {
          fontWeight: 'bold', // Header title font weight
        },
        headerTitleAlign: 'center', // Header title alignment
        animation: 'slide_from_right', // Default transition animation
      }}
    >
      {/* Home Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Events Near You', // Header title for the home screen
        }}
      />

      {/* Event Details Screen */}
      <Stack.Screen
        name="[eventId]"
        options={{
          // Placeholder title; will be dynamically set in the component
          headerTitle: (props) => <CustomHeaderTitle title="Event Details" />,
          // Optional: Customize back button text
          headerBackTitle: 'Back',
        }}
      />

      {/* Additional screens can be added here */}
      
    </Stack>
  );
};

export default Layout;
