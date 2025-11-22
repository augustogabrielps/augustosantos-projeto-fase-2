import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UsersScreen from '../screens/UsersScreen';
import AlbumsScreen from '../screens/AlbumsScreen';
import PhotosScreen from '../screens/PhotosScreen';
import PhotoDetailScreen from '../screens/PhotoDetailScreen';
import { RemotePhoto } from '../services/api';

export type RootStackParamList = {
  Users: undefined;
  Albums: { userId: number; userName: string };
  Photos: { albumId: number; albumTitle: string };
  PhotoDetail: { photo: RemotePhoto };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={UsersScreen} options={{ title: 'Users' }} />
        <Stack.Screen
          name="Albums"
          component={AlbumsScreen}
          options={({ route }) => ({ title: route.params.userName })}
        />
        <Stack.Screen
          name="Photos"
          component={PhotosScreen}
          options={({ route }) => ({ title: route.params.albumTitle })}
        />
        <Stack.Screen
          name="PhotoDetail"
          component={PhotoDetailScreen}
          options={({ route }) => ({ title: route.params.photo?.title ?? 'Photo' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

