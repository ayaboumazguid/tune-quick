const BASE_URL = 'your-api-url';

export const api = {
  fetchSongs: async () => {
    const response = await fetch(`${BASE_URL}/songs`);
    return response.json();
  },
  
  updateProfile: async (profile: Partial<UserProfile>) => {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
    return response.json();
  }
};