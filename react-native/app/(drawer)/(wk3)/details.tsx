import React from 'react';
import { View, Image, Button, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


const PhotoDetailScreen = () => {
  const { id, url } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: url as string }} style={styles.images} />
      <Button
        title="View Fullscreen"
        onPress={() => router.push({ pathname: '/(drawer)/(wk3)/modal', params: { id, url } })}
      />
      <ThemedText>This is image number: {id}</ThemedText>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     padding: 16,
   },
   images: {
     width: 300,
     height: 300,
     borderRadius: 20,
     marginBottom: 20,
   },
 });



export default PhotoDetailScreen;


