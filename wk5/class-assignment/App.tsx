import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    try {
      const response = await fetch(data + '.json'); // Fetch data from the Firebase Realtime Database
      if (response.ok) {
        const productData = await response.json();
        Alert.alert('Product URL', `Scanned URL: ${data}`, [{ text: 'OK', onPress: () => setScanned(false) }]);
      } else {
        Alert.alert('Error', 'Failed to fetch product data.', [{ text: 'OK', onPress: () => setScanned(false) }]);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching product data.', [{ text: 'OK', onPress: () => setScanned(false) }]);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
