import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SongData, Post as ImportedPost, MusicStoreState } from '../types';

interface User {
  id: string;
  username: string;
  password: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  createdAt: Date;
}

interface UserProfile {
  id: string;
  username: string;
  bio: string;
  favoriteGenres: string[];
  favoriteSingers: string[];
  connections: string[];
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Comment {
  id: string;
  content: string;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
}

interface MusicStoreState {
  currentUser: User | null;
  songs: Song[];
  messages: Message[];
  posts: Post[];
  availableGenres: string[];
  addSong: (songData: SongData) => void;
  sendMessage: (receiverId: string, content: string) => void;
  updateUserProfile: (updates: UserProfileUpdates) => void;
  login: (username: string, password: string) => Promise<void>;
  markMessageAsRead: (messageId: string) => void;
  createPost: (content: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deleteSong: (id: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
}

interface UserProfileUpdates {
  username: string;
  bio: string;
  favoriteSingers: string[];
  connections: string[];
}

export const useMusicStore = create<MusicStoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      songs: [],
      messages: [],
      posts: [],
      availableGenres: [
        'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz',
        'Classical', 'Electronic', 'Country', 'Folk'
      ],

      addSong: (songData) => set((state) => ({
        songs: [
          {
            ...songData,
            id: crypto.randomUUID(),
            createdAt: new Date()
          },
          ...state.songs
        ]
      })),

      sendMessage: (receiverId, content) => set((state) => ({
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          senderId: state.currentUser?.id ?? '',
          receiverId,
          content,
          timestamp: new Date(),
          read: false
        }]
      })),

      updateUserProfile: (updates) => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null
      })),

      login: async (username, password) => set({ currentUser: { id: crypto.randomUUID(), username, password } }),

      markMessageAsRead: (messageId) => set((state) => ({
        messages: state.messages.map(m => m.id === messageId ? { ...m, read: true } : m)
      })),

      createPost: (content) => set((state) => ({
        posts: [...state.posts, {
          id: crypto.randomUUID(),
          userId: state.currentUser?.id ?? '',
          content,
          likes: [],
          comments: [],
          createdAt: new Date()
        }]
      })),

      likePost: (postId) => set((state) => ({
        posts: state.posts.map(p => p.id === postId ? { ...p, likes: [...p.likes, state.currentUser?.id ?? ''] } : p)
      })),

      addComment: (postId, content) => set((state) => ({
        posts: state.posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, { id: crypto.randomUUID(), content }] } : p)
      })),

      deleteSong: (id) => set((state) => ({
        songs: state.songs.filter(song => song.id !== id)
      })),

      deleteComment: (postId, commentId) => set((state) => ({
        posts: state.posts.map(p => p.id === postId ? { ...p, comments: p.comments.filter(c => c.id !== commentId) } : p)
      }))
    }),
    {
      name: 'music-store'
    }
  )
);
