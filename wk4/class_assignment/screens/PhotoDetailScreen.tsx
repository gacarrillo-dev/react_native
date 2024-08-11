import React from 'react';
import { View, Image, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, url } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: url });
  }, [navigation, url]);

  return (
    <View style={{ flex: 1,  alignItems: 'center', marginTop:10 }}>
      <Image source={{ uri: url }} style={{ width: 300, height: 300, borderRadius: 20 }} />
      <Button
        title="View Fullscreen"
        onPress={() => navigation.navigate('FullScreenModal', { url })}
      />
      <Text>This is an image and it looks cool!</Text>
    </View>
  );
};

export default PhotoDetailScreen;
