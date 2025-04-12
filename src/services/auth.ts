import { useMusicStore } from '../stores/musicStore';

export const authService = {
  login: async (username: string, password: string) => {
    // Implement login logic
    // On success:
    useMusicStore.getState().updateUserProfile({
      username,
      bio: '',
      favoriteSingers: [],
      connections: []
    });
  },
  
  logout: async () => {
    useMusicStore.setState({ currentUser: null });
  }
};