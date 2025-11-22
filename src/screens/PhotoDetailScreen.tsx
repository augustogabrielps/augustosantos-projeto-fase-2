import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RemotePhoto } from '../services/api';

type PhotoDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen: React.FC<PhotoDetailScreenProps> = ({ route }) => {
  const { photo } = route.params as { photo: RemotePhoto };

  const formattedDate = photo.dateTime ? new Date(photo.dateTime).toLocaleString() : '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: photo.url }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.meta}>
        <Text style={styles.title}>{photo.title}</Text>

        <View style={styles.section}>
          <Text style={styles.info}>ID: {photo.id}</Text>
          <Text style={styles.info}>Album: {photo.albumId}</Text>
          {photo.dateTime ? <Text style={styles.info}>Data: {formattedDate}</Text> : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default PhotoDetailScreen;

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', padding: 12, alignItems: 'center' },
  imageWrapper: {
    width: '100%',
    height: 280,
    borderRadius: 8,
    backgroundColor: '#000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: 280, borderRadius: 8, backgroundColor: '#000' },
  meta: { width: '100%', marginTop: 16 },
  section: { marginTop: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  info: { color: '#666', marginBottom: 4, fontSize: 14 },
});
