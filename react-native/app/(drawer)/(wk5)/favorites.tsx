import { View, Text, Image, StyleSheet, FlatList, Button, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Function to fetch favorites from AsyncStorage
  const getFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      if (existingFavorites) {
        setFavorites(JSON.parse(existingFavorites));
      } else {
        setFavorites([]); // If no favorites, set empty list
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Function to remove item from favorites
  const removeFavorite = async (id: number) => {
    try {
      const updatedFavorites = favorites.filter((item: any) => item.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert('Removed', 'Product has been removed from your favorites!');
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Use useFocusEffect to refresh the list every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      getFavorites(); // Call getFavorites to refresh the list
    }, [])
  );

  // Render favorite items
  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <ThemedText style={styles.productName}>{item.title}</ThemedText>
        <ThemedText style={styles.productPrice}>${item.price}</ThemedText>
        <Button title="Remove" onPress={() => removeFavorite(item.id)} />
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Your Favorites</ThemedText>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ThemedText>No favorites added yet.</ThemedText>}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  favoriteItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#353b48',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Favorites;
