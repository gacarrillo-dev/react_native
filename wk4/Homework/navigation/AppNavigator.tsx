import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import WeatherAppNav from './WeatherAppNav';
import PhotoGalleryStack from './PhotoGalleryStack';
import BarcodeHome from '../screens/BarcodeScanner/BarcodeHome';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
          drawerType: 'slide',
          swipeEnabled: true,
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Wk3: PhotoGallery" component={PhotoGalleryStack} />
        <Drawer.Screen name="Wk4: WeatherApp" component={WeatherAppNav} />
        <Drawer.Screen name="Wk5: Barcode Scanner" component={BarcodeHome} />
        <Drawer.Screen name="Wk6:" component={HomeScreen} />
        <Drawer.Screen name="Wk7:" component={HomeScreen} />
        <Drawer.Screen name="Wk8:" component={HomeScreen} />
        <Drawer.Screen name="Wk9:" component={HomeScreen} />
        <Drawer.Screen name="Wk10:" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
