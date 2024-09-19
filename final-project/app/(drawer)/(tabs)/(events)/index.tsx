// app/home/index.tsx

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import { FavoritesContext } from '@/context/FavoritesContext'; // Adjust the import path as necessary
import { useNavigation, DrawerActions } from '@react-navigation/native';

// Import Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const API_KEY = 'dlloQlkEZNoqA8vILXAKkWWSb0tTSJN0'; // Replace with your Ticketmaster API Key

interface EventData {
  id: string;
  name: string;
  date: string;
  venue: string;
  imageUrl: string;
  city: string;
  state: string;
}

const HomePage = () => {
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

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Event type filter state
  const [eventType, setEventType] = useState<string>('');

  // Search functionality states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  // Date range filter state
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Radius filter state
  const [radius, setRadius] = useState<number>(50); // Default radius in miles

  // Sorting option state
  const [sortOption, setSortOption] = useState<string>('relevance,asc');

  // Access favorites context
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  // Reanimated shared value for filter height
  const filterHeight = useSharedValue(0);

  // State to control filter visibility
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  // Animated style for filters container
  const animatedFilterStyle = useAnimatedStyle(() => {
    return {
      height: filterHeight.value,
      opacity: filterHeight.value === 0 ? 0 : 1,
    };
  });

  // Pagination states
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState<number | null>(null); // Total pages available
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  // Function to reset filters
  const resetFilters = () => {
    setEventType('');
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setEndDate(null);
    setRadius(50); // Default radius
    setSortOption('relevance,asc'); // Default sort option
    setEvents([]); // Clear events
    setPage(0); // Reset page number
  };

  // Debounce the search query input to optimize API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setEvents([]); // Clear current events
    setPage(0); // Reset page
  }, [eventType, debouncedSearchQuery, endDate, radius, sortOption]);

  useEffect(() => {
    let isMounted = true; // To prevent setting state after unmount

    (async () => {
      try {
        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetchingMore(true);
        }
        setError(null);

        // Request permission to access the location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get the user's location
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Prepare API parameters
        const params: any = {
          apikey: API_KEY,
          latlong: `${latitude},${longitude}`,
          radius: radius,
          sort: 'date,asc',
          size: 20, // Number of events per page
          page: page, // Current page number
        };

        // Add event type filter
        if (eventType) {
          params.classificationName = eventType;
        }

        // Add search query filter
        if (debouncedSearchQuery) {
          params.keyword = debouncedSearchQuery;
        }

        // Set startDateTime to today's date
        const today = moment().startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        params.startDateTime = today;

        // Add end date filter
        if (endDate) {
          params.endDateTime =
            moment(endDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }

        // Fetch events from Ticketmaster
        const response = await axios.get(
          'https://app.ticketmaster.com/discovery/v2/events.json',
          { params }
        );

        // Handle cases where no events are returned
        const eventsData = response.data._embedded?.events.map((event: any) => ({
          id: event.id,
          name: event.name,
          date: event.dates.start.localDate,
          venue: event._embedded.venues[0].name,
          imageUrl: event.images.length > 0 ? event.images[0].url : null,
          city: event._embedded.venues[0].city.name,
          state: event._embedded.venues[0].state.name,
        }));

        if (isMounted) {
          setEvents((prevEvents) => [...prevEvents, ...(eventsData || [])]);

          // Update total pages
          const pageInfo = response.data.page;
          setTotalPages(pageInfo.totalPages);

          if (page === 0) {
            setLoading(false);
          } else {
            setIsFetchingMore(false);
          }
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        if (isMounted) {
          setError('Failed to fetch events');
          setLoading(false);
          setIsFetchingMore(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchQuery, eventType, endDate, radius, sortOption, page]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6e45e2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {/* Reset Filters Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Toggle Button for Filters */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => {
          if (filtersVisible) {
            filterHeight.value = withTiming(0, { duration: 300 });
          } else {
            filterHeight.value = withTiming(300, { duration: 300 });
          }
          setFiltersVisible(!filtersVisible);
        }}
      >
        <Text style={styles.toggleButtonText}>
          {filtersVisible ? 'Hide Filters' : 'Show Filters'}
        </Text>
      </TouchableOpacity>

      {/* Animated Filters Container */}
      <Animated.View style={[styles.filtersContainer, animatedFilterStyle]}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Event Type Filter */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={eventType}
            style={styles.picker}
            onValueChange={(itemValue) => setEventType(itemValue)}
          >
            <Picker.Item label="All Event Types" value="" />
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="Sports" value="sports" />
            <Picker.Item label="Arts & Theatre" value="arts & theatre" />
            <Picker.Item label="Film" value="film" />
            <Picker.Item label="Miscellaneous" value="miscellaneous" />
          </Picker>
        </View>

        {/* End Date Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>End Date:</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              {endDate ? moment(endDate).format('MMM DD, YYYY') : 'Select End Date'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        {/* Radius Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Search Radius: {radius} miles</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={radius}
            onValueChange={(value) => setRadius(value)}
            minimumTrackTintColor="#6e45e2"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#6e45e2"
          />
        </View>

        {/* Sorting Options */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOption(itemValue)}
          >
            <Picker.Item label="Relevance" value="relevance,asc" />
            <Picker.Item label="Date" value="date,asc" />
            <Picker.Item label="Distance" value="distance,asc" />
            <Picker.Item label="Name" value="name,asc" />
          </Picker>
        </View>

        {/* Reset Filters Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
      </Animated.View>

      {events.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events found.</Text>
          {/* Reset Filters Button */}
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const favorite = isFavorite(item.id);

            const handleFavoritePress = () => {
              if (favorite) {
                removeFavorite(item.id);
              } else {
                addFavorite(item);
              }
            };

            return (
              <View style={styles.eventItem}>
                <Link href={`/${item.id}`} asChild>
                  <TouchableOpacity>
                    {item.imageUrl && (
                      <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
                    )}
                  </TouchableOpacity>
                </Link>
                <View style={styles.eventHeader}>
                  <Link href={`/${item.id}`} asChild>
                    <TouchableOpacity>
                      <Text style={styles.eventName}>{item.name}</Text>
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity onPress={handleFavoritePress}>
                    <AntDesign
                      name={favorite ? 'heart' : 'hearto'}
                      size={20}
                      color="#e74c3c"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.eventDetails}>Date: {item.date}</Text>
                <Text style={styles.eventDetails}>Venue: {item.venue}</Text>
                <Text style={styles.eventDetails}>
                  Location: {item.city}, {item.state}
                </Text>
              </View>
            );
          }}
          onEndReached={() => {
            if (totalPages !== null && page + 1 < totalPages && !isFetchingMore) {
              setPage((prevPage) => prevPage + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            return isFetchingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#6e45e2" />
              </View>
            ) : null;
          }}
        />
      )}
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
  // Loader style
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // No events found container
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 18,
    color: '#666',
  },
  // Error container
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  // Toggle button for filters
  toggleButton: {
    padding: 10,
    backgroundColor: '#6e45e2',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Animated filters container
  filtersContainer: {
    overflow: 'hidden',
  },
  // Styles for the search bar
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  // Styles for filters
  filterContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerButton: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  // Picker container
  pickerContainer: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
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
  // Reset Filters Button
  resetButton: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Footer loader for infinite scrolling
  footerLoader: {
    paddingVertical: 20,
  },
});

export default HomePage;
