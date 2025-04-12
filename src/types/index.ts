export interface User {
  id: string;
  username: string;
  bio: string;
  favoriteGenres: string[];
  favoriteSingers: string[];
  connections: string[];
}

export interface SongData {
  id: string;
  title: string;
  artist: string;
  genre: string;
  addedBy: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

export interface MusicStoreState {
  currentUser: User | null;
  users: User[];
  songs: SongData[];
  posts: Post[];
  availableGenres: string[];
  updateUserPreferences: (preferences: { genres?: string[] }) => void;
  updateUserCredentials: (updates: { username?: string; password?: string }) => void;
  addSong: (song: Omit<SongData, 'id' | 'createdAt' | 'addedBy'>) => void;
}