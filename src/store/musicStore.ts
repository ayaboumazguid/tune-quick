import { create } from 'zustand';
import { sync } from '@tonk/keepsync';

interface Song {
  id: string;
  title: string;
  artist: string;
  addedBy: string;
  createdAt: Date;
}

interface UserProfile {
  id: string;
  username: string;
  bio: string;
  favoriteSongs: Song[];
  connections: string[]; // Array of user IDs
  avatarUrl?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

interface MusicStoreState {
  currentUser: UserProfile | null;
  users: UserProfile[];
  messages: Message[];
  songs: Song[];
  // Actions
  addSong: (song: Omit<Song, 'id' | 'createdAt'>) => void;
  removeSong: (songId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addConnection: (userId: string) => void;
  removeConnection: (userId: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
}

export const useMusicStore = create<MusicStoreState>(
  sync(
    (set, get) => ({
      currentUser: null,
      users: [],
      messages: [],
      songs: [],

    addSong: (songData) => set((state) => ({
      songs: [...state.songs, {
        ...songData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        addedBy: state.currentUser?.id || ''
      }]
    })),

    removeSong: (songId) => set((state) => ({
      songs: state.songs.filter(song => song.id !== songId)
    })),

    updateProfile: (profile) => set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, ...profile } : null
    })),

    addConnection: (userId) => set((state) => ({
      currentUser: state.currentUser ? {
        ...state.currentUser,
        connections: [...state.currentUser.connections, userId]
      } : null
    })),

    removeConnection: (userId) => set((state) => ({
      currentUser: state.currentUser ? {
        ...state.currentUser,
        connections: state.currentUser.connections.filter(id => id !== userId)
      } : null
    })),

    sendMessage: (receiverId, content) => set((state) => ({
      messages: [...state.messages, {
        id: crypto.randomUUID(),
        senderId: state.currentUser?.id || '',
        receiverId,
        content,
        timestamp: new Date()
      }]
    }))
    }),
    {
      docId: "music-store"
    }
  )
);