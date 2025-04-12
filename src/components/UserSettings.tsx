import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './UserSettings.css';

interface User {
  username: string;
}

interface MusicStoreState {
  currentUser: User | null;
}

interface MusicStore extends MusicStoreState {
  updateUserCredentials: (updates: { username?: string; password?: string }) => void;
}

export const UserSettings: React.FC = () => {
  const { currentUser, updateUserCredentials } = useMusicStore();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updates: { username?: string; password?: string } = {};
    if (username !== currentUser?.username) {
      updates.username = username;
    }
    if (password) {
      updates.password = password;
    }

    updateUserCredentials(updates);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};