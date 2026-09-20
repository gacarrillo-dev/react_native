// components/ProtectedRoute.tsx

import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to landing page after component has mounted
      router.replace('/(auth)/landing');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6e45e2" />
      </View>
    );
  }

  if (!user) {
    // Optionally, render null or a placeholder while redirecting
    return null;
  }

  return <>{children}</>;
}
