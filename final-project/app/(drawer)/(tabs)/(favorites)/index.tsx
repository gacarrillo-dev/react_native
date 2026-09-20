// app/favorites/index.tsx

import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FavoritesContext } from "../../../../context/FavoritesContext"; // Adjust the path
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from '@react-navigation/native';

const FavoritesScreen = () => {

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ marginLeft: 10 }}
        >
          <AntDesign name="menu-fold" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { favorites, removeFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.noFavoritesText}>You have no favorite events.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const handleRemoveFavorite = () => {
            removeFavorite(item.id);
          };

          return (
            <View style={styles.eventItem}>
              <Link href={`/(events)/${item.id}`} asChild>
                <TouchableOpacity>
                  {item.imageUrl && (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.eventImage}
                    />
                  )}
                </TouchableOpacity>
              </Link>
              <View style={styles.eventHeader}>
                <Link href={`/(events)/${item.id}`} asChild>
                  <TouchableOpacity>
                    <Text style={styles.eventName}>{item.name}</Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity onPress={handleRemoveFavorite}>
                  <AntDesign name="heart" size={24} color="#e74c3c" />
                </TouchableOpacity>
              </View>
              <Text style={styles.eventDetails}>Date: {item.date}</Text>
              <Text style={styles.eventDetails}>Venue: {item.venue}</Text>
              <Text style={styles.eventDetails}>City: {item.city}, {item.state}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Container for the entire screen
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  // Styles for when there are no favorites
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#666',
  },
  // Styles for each event item
  eventItem: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#6e45e2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  // Header containing the event name and favorite icon
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e45e2',
    flex: 1,
    flexWrap: 'wrap',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});


export default FavoritesScreen;
