import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
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
  const [filteredData, setFilteredData] =
    React.useState<ImageData[]>(imageData);
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

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item.url }} style={styles.imageThumbnail} />
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
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
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
  },
});

export default PhotoGalleryScreen;
