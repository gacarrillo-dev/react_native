import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Details = () => {
  const { productData } = useLocalSearchParams();
  const product = JSON.parse(productData as string);

  const [isFavorited, setIsFavorited] = useState(false);

  // Function to save product to favorites
  const saveToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Check if the product is already favorited
      const alreadyFavorited = favoritesArray.some(
        (favProduct: any) => favProduct.id === product.id
      );

      if (alreadyFavorited) {
        Alert.alert('Already Favorited', 'This product is already in your favorites.');
        return;
      }

      favoritesArray.push(product); // Add product to favorites list
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

      setIsFavorited(true);
      Alert.alert('Favorited', 'Product has been added to your favorites!');
    } catch (error) {
      console.error('Error saving to favorites:', error);
    }
  };

  useEffect(() => {
    // Fetch and check if the item is already in favorites
    const checkIfFavorited = async () => {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      if (existingFavorites) {
        const favoritesArray = JSON.parse(existingFavorites);
        const alreadyFavorited = favoritesArray.some(
          (favProduct: any) => favProduct.id === product.id
        );
        setIsFavorited(alreadyFavorited);
      }
    };

    checkIfFavorited();
  }, [product.id]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Product Details</ThemedText>

      {/* Product Image */}
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Product Information */}
      <View style={styles.detailsContainer}>
        <ThemedText style={styles.productName}>{product.title}</ThemedText>
        <ThemedText style={styles.productDescription}>{product.description}</ThemedText>

        {/* Price & Rating */}
        <View style={styles.row}>
          <ThemedText style={styles.productPrice}>Price: ${product.price}</ThemedText>
          <ThemedText style={styles.productRating}>Rating: {product.rating}⭐</ThemedText>
        </View>

        {/* Favorite Button */}
        <Button
          title={isFavorited ? 'Already Favorited' : 'Add to Favorites'}
          onPress={saveToFavorites}
          disabled={isFavorited}
        />
      </View>
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
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: '#353b48',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  productRating: {
    fontSize: 18,
    color: '#ff9800',
  },
});

export default Details;
