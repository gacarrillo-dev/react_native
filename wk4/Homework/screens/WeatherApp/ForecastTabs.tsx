import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import ThreeDayForecast from "./Tabs/ThreeDayForecast";
import SevenDayForecast from "./Tabs/SevenDayForecast";

const Tab = createBottomTabNavigator();

const ForecastTabs = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === "3-Day Forecast") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "7-Day Forecast") {
              iconName = focused
                ? "calendar-number"
                : "calendar-number-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}>
        <Tab.Screen name="3-Day Forecast" component={ThreeDayForecast} />
        <Tab.Screen name="7-Day Forecast" component={SevenDayForecast} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ForecastTabs;
