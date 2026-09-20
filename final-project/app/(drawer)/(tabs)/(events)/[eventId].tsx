// app/[eventId].tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router'; // Add this import
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const API_KEY = 'dlloQlkEZNoqA8vILXAKkWWSb0tTSJN0'; // Replace with your Ticketmaster API Key

const EventDetails = () => {
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


  const { eventId } = useLocalSearchParams();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json`,
          {
            params: {
              apikey: API_KEY,
            },
          }
        );
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    } else {
      setError('No event ID provided');
      setLoading(false);
    }
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6e45e2" />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Event not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {event.images && event.images.length > 0 && (
        <Image source={{ uri: event.images[0].url }} style={styles.eventImage} />
      )}
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDetails}>
        Date: {event.dates.start.localDate}
      </Text>
      <Text style={styles.eventDetails}>
        Time: {event.dates.start.localTime}
      </Text>
      <Text style={styles.eventDetails}>
        Venue: {event._embedded.venues[0].name}
      </Text>
      <Text style={styles.eventDetails}>
        Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name} {event._embedded.venues[0].state.name} {event._embedded.venues[0].postalCode}
      </Text>
      
      <Text style={styles.description}>
        {event.info || 'No description available.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6e45e2',
    marginTop: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EventDetails;
