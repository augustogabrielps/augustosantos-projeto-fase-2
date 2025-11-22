import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  ListRenderItem,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import { fetchPhotosByAlbumId, RemotePhoto } from '../services/api';

type PhotosScreenProps = NativeStackScreenProps<RootStackParamList, 'Photos'>;

const PhotosScreen: React.FC<PhotosScreenProps> = ({ route, navigation }) => {
  const { albumId, albumTitle } = route.params;

  const [photos, setPhotos] = useState<RemotePhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPhotosByAlbumId(albumId);
        if (!mounted) return;
        setPhotos(res);
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar fotos.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [albumId]);

  const renderItem: ListRenderItem<RemotePhoto> = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('PhotoDetail', { photo: item })}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.link}>Ver fotos</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Header title={albumTitle} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList<RemotePhoto>
            data={photos}
            keyExtractor={(p) => p.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={photos.length === 0 ? styles.emptyContainer : undefined}
            ListEmptyComponent={<Text>Sem fotos neste álbum.</Text>}
          />
        )}
      </View>
    </View>
  );
};

export default PhotosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, paddingHorizontal: 12, paddingTop: 12, paddingBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    // subtle border and shadow
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  meta: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600' },
  link: { marginTop: 8, color: '#007AFF', fontSize: 13 },
  error: { color: 'red' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 },
});

