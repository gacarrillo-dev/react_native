import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedInput } from "@/components/ThemedInput";

interface ImageData {
  id: number;
  url: string;
}

const generateImageData = (): ImageData[] => {
  const imageData: ImageData[] = [];
  for (let i = 1; i < 70; i++) {
    imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
  }
  return imageData;
};

const imageData = generateImageData();

const PhotoGalleryScreen = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = React.useState<ImageData[]>(imageData);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = imageData.filter((item) =>
      item.id.toString().includes(text)
    );
    setFilteredData(filtered);
  };

  const handleImagePress = (image: ImageData) => {
    router.push({
      pathname: "/details",
      params: { id: image.id.toString(), url: image.url },
    });
  };

  // Reanimated Hooks for scroll and animation
  const marginVertical = useSharedValue(2);
  const rotation = useSharedValue(0); // New shared value for rotation

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const newMargin = 2 + event.contentOffset.y / 30;
      if (newMargin < 2) {
        marginVertical.value = 2;
      } else if (newMargin > 20) {
        marginVertical.value = 20;
      } else {
        marginVertical.value = newMargin;
      }

      // Update the rotation based on scroll position
      rotation.value = withTiming(event.contentOffset.y / 100, { duration: 200 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: marginVertical.value,
      transform: [
        { rotate: `${rotation.value}rad` }, // Apply rotation based on the scroll
      ],
    };
  });

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Animated.Image
        sharedTransitionTag={`tag-${item.url}`}
        source={{ uri: item.url }}
        style={[styles.imageThumbnail, animatedStyle]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <ThemedInput
          style={styles.searchInput}
          placeholder="Search by ID..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <Animated.FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          onScroll={scrollHandler}
          scrollEventThrottle={16} // Ensures smooth scroll events
        />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#151718",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  grid: {
    alignItems: "center",
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});

export default PhotoGalleryScreen;
