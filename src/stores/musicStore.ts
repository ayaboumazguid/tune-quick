import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface SongData {
  title: string;
  artist: string;
  genre: string;
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
        'Classical', 'Electronic', 'Country', 'Folk',
        'Metal', 'Blues', 'Reggae', 'Latin', 'K-pop'
      ],

      createPost: (content: string) => set((state) => ({
        posts: [...state.posts, {
          id: crypto.randomUUID(),
          userId: state.currentUser?.id || '',
          content,
          likes: [],
          comments: [],
          createdAt: new Date()
        }]
      })),

      likePost: (postId: string) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId ? { ...post, likes: [...post.likes, state.currentUser?.id || ''] } : post
        )
      })),

      addSong: (songData: SongData) => set((state) => ({
        songs: [...state.songs, {
          id: crypto.randomUUID(),
          ...songData,
          createdAt: new Date()
        }]
      })),

      sendMessage: (receiverId: string, content: string) => set((state) => ({
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          senderId: state.currentUser?.id || '',
          receiverId,
          content,
          timestamp: new Date(),
          read: false
        }]
      })),

      updateUserProfile: (updates: UserProfileUpdates) => set((state) => ({
        currentUser: state.currentUser ? {
          ...state.currentUser,
          ...updates
        } : null
      })),

      login: async (username: string, password: string) => {
        await Promise.resolve();
      },

      markMessageAsRead: (messageId: string) => set((state) => ({
        messages: state.messages.map(message =>
          message.id === messageId ? { ...message, read: true } : message
        )
      })),

      addComment: (postId: string, content: string) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId ? { ...post, comments: [...post.comments, { id: crypto.randomUUID(), content }] } : post
        )
      })),

      deleteSong: (id: string) => set((state) => ({
        songs: state.songs.filter(song => song.id !== id)
      })),

      deleteComment: (postId: string, commentId: string) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId 
            ? {
                ...post,
                comments: post.comments.filter(comment => comment.id !== commentId)
              }
            : post
        )
      }))
    }),
    {
      name: 'music-store'
    }
  )
);
