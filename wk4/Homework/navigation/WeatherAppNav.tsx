import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CurrentWeather from '../screens/WeatherApp/CurrentWeather';
import ForecastTabs from '../screens/WeatherApp/ForecastTabs';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const WeatherAppNav = () => {
  return (
   <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Current Weather" component={CurrentWeather} />
        <Drawer.Screen name="Forecast" component={ForecastTabs} />
      </Drawer.Navigator>
   </NavigationContainer>
      
  );
};

export default WeatherAppNav;
