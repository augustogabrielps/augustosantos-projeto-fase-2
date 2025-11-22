import axios from 'axios';

// JSONPlaceholder API (original)
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

// My JSON Server base URL (SEU repositório)
const MY_JSON_SERVER_BASE_URL =
  'https://my-json-server.typicode.com/augustogabrielps/augustosantos-projeto-fase-2';

// Types for Photos coming from My JSON Server
export type RemotePhoto = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  dateTime: string; // ISO string
};

// Fetch photos for a given albumId
export async function fetchPhotosByAlbumId(
  albumId: number
): Promise<RemotePhoto[]> {
  try {
    const response = await axios.get<RemotePhoto[]>(
      `${MY_JSON_SERVER_BASE_URL}/photos`,
      {
        params: { albumId },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching photos:', error);
    throw new Error('Failed to fetch photos from My JSON Server.');
  }
}

export default api;
