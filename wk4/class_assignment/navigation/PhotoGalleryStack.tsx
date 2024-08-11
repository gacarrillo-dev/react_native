import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotoDetailScreen from '../screens/PhotoDetailScreen';
import PhotoGalleryScreen from '../screens/PhotoGalleryScreen';
import FullScreenModal from '../screens/FullScreenModal';

export type RootStackParamList = {
  GalleryHome: undefined;
  PhotoDetail: { id: number; url: string };
  FullScreenModal: { url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const PhotoGalleryStack = () => {
  return (
      <Stack.Navigator initialRouteName="GalleryHome">
        <Stack.Screen name="GalleryHome" component={PhotoGalleryScreen} />
        <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
        <Stack.Screen
          name="FullScreenModal"
          component={FullScreenModal}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  );
};

export default PhotoGalleryStack;