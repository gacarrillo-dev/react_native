import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { useState, useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";

const BarcodeScanner = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <ThemedView />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>We need access to your camera</ThemedText>
        <Button onPress={requestPermission} title="Grant permission" />
      </ThemedView>
    );
  }

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: any;
    data: any;
  }) => {
    setScanned(true);
    try {
      const response = await fetch(data); 
      const responseText = await response.text(); // Get raw text response
  
      if (response.ok && response.headers.get("Content-Type")?.includes("application/json")) {
        const productData = JSON.parse(responseText); // Parse JSON if valid
        console.log("Product Data:", productData); // For debugging
  
        // Alert showing only the URL (string)
        Alert.alert("Product URL", `Scanned URL: ${data}`, [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
  
        // Navigate and pass product data to another screen
        router.push({
          pathname: '/(drawer)/(wk5)/(scanner)/details',
          params: {
            productData: JSON.stringify(productData),
          },
        });
      } else {
        Alert.alert("Error", "Failed to fetch product data or response is not JSON.", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      }
    } catch (error) {
      console.error("Error:", error); // Log error for debugging
      Alert.alert("Error", "An error occurred while fetching product data.", [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
    }
  };
  
  
  

  return (
    <ThemedView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default BarcodeScanner;
