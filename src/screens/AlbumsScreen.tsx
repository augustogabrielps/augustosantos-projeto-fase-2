import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  ListRenderItem,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import api from '../services/api';

type AlbumsScreenProps = NativeStackScreenProps<RootStackParamList, 'Albums'>;

type Album = {
  userId: number;
  id: number;
  title: string;
};

const AlbumsScreen: React.FC<AlbumsScreenProps> = ({ route, navigation }) => {
  const { userId, userName } = route.params;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<Album[]>(`/albums?userId=${userId}`);
        if (!mounted) return;
        setAlbums(res.data);
      } catch (err) {
        setError('Não foi possível carregar os álbuns.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAlbums();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const renderItem: ListRenderItem<Album> = ({ item: album }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{album.title}</Text>
      <Pressable
        onPress={() => navigation.navigate('Photos', { albumId: album.id, albumTitle: album.title })}
      >
        <Text style={styles.link}>Ver fotos</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={`Álbuns de ${userName}`} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList<Album>
            data={albums}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={albums.length === 0 ? styles.emptyContainer : undefined}
            ListEmptyComponent={<Text>Sem álbuns.</Text>}
          />
        )}
      </View>
    </View>
  );
};

export default AlbumsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, paddingHorizontal: 12, paddingTop: 12, paddingBottom: 12 },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    // Android elevation
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 8,
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
  error: { color: 'red' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 },
});
