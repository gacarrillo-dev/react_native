import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";

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

const PhotoGallery: React.FC = () => {
  const [filteredData, setFilteredData] = useState<ImageData[]>(imageData);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = imageData.filter((item) =>
      item.id.toString().includes(text)
    );
    setFilteredData(filtered);
  };

  const handleImagePress = (image: ImageData) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item.url }} style={styles.imageThumbnail} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by ID..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // This prop controls the grid layout
        contentContainerStyle={styles.grid}
      />
      {selectedImage && (
        <Modal
          visible={!!selectedImage}
          transparent={true}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={handleCloseModal}
          >
            <Image
              source={{ uri: selectedImage.url }}
              style={styles.fullImage}
            />
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:"white"
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  grid: {
    alignItems: "center",
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default PhotoGallery;
