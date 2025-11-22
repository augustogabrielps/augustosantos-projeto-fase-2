import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
  ListRenderItem,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import api from '../services/api';

type UsersScreenProps = NativeStackScreenProps<RootStackParamList, 'Users'>;

type User = {
  id: number;
  name: string;
  email: string;
};

const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<User[]>('/users');
        if (!mounted) return;
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        setError('Não foi possível carregar os usuários.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (!text) {
      setFilteredUsers(users);
      return;
    }
    const q = text.toLowerCase();
    setFilteredUsers(users.filter((u) => u.name.toLowerCase().includes(q)));
  };

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Pressable
        onPress={() => navigation.navigate('Albums', { userId: item.id, userName: item.name })}
      >
        <Text style={styles.link}>Ver álbuns</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rootPadding}>
        <Header title="Usuários" />

        <TextInput
          style={styles.search}
          placeholder="Buscar usuário..."
          value={searchTerm}
          onChangeText={handleSearch}
          autoCorrect={false}
          returnKeyType="search"
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList<User>
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={filteredUsers.length === 0 ? styles.emptyContainer : undefined}
            ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
          />
        )}
      </View>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 0,
  },
  rootPadding: {
    flex: 1,
    padding: 12,
  },
  search: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android elevation
    elevation: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  email: {
    color: '#666',
    marginTop: 4,
  },
  link: {
    marginTop: 8,
    color: '#007AFF',
    fontWeight: '600',
  },
  error: {
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
