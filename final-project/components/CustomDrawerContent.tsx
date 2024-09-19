// app/CustomDrawerContent.tsx

import React, { useContext, useEffect, useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { supabase } from '../supabase';
import { AuthContext } from '../context/AuthContext';
import { AntDesign } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsername = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      setUsername(data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsername();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Reset the navigation stack and redirect to the landing page
      navigation.reset({
        index: 0,
        routes: [{ name: '(auth)/landing' }], // Adjust the route name as needed
      });
    } catch (error) {
      console.error('Error signing out:', error);
      alert('An error occurred while signing out.');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.username}>
            Welcome, {username || 'User'}
          </Text>
        )}
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={styles.logoutLabel}
        icon={({ color, size }) => (
          <AntDesign name="logout" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#6e45e2',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutLabel: {
    color: 'red',
  },
});
