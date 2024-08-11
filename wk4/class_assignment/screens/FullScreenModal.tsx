import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'FullScreenModal'>;

const FullScreenModal: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.fullImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default FullScreenModal;
