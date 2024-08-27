import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useRouter, useLocalSearchParams } from 'expo-router'
import axios from "axios";


const Details = () => {
  const { productData } = useLocalSearchParams();
  console.log(productData);
  const product = JSON.parse(productData as string);
  console.log(product);

  useEffect(() => {
    axios.get(product.url).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (

      <ThemedView>
        <ThemedText>Details</ThemedText>
        <ThemedText>{product.name}</ThemedText>
        <ThemedText>{product.description}</ThemedText>
        <ThemedText>{product.price}</ThemedText>
        <ThemedText>{product.image}</ThemedText>
        <ThemedText>{product.rating}</ThemedText>
      </ThemedView>
  );
}

export default Details