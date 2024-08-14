import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from 'react';


const BarcodeHome = () => {

   const [hasPermission, setHasPermisson] = useState(false);
   const [scanned, setScanned] = useState(false);

   useEffect(() => {
      (async () => {
         const { status } = await BarCodeScanner.requestPermissionsAsync();
         setHasPermisson(status);
      })();
   }, []);

   const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
   };

   if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
   }
   if (hasPermission === false) {
      return <Text>No access to camera</Text>;
   }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
      </View>
  );
}


export default BarcodeHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});