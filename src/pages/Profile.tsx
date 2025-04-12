import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { GenreSelector } from '../components/GenreSelector';
import './Profile.css';

export const Profile: React.FC = () => {
  const { currentUser, updateUserProfile, availableGenres } = useMusicStore();
  const [showGenres, setShowGenres] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleBioSave = () => {
    if (currentUser) {
      updateUserProfile({
        username: currentUser.username,
        bio: bio,
        favoriteSingers: currentUser.favoriteSingers || [],
        connections: []
      });
      setIsEditingBio(false);
    }
  };

  if (!currentUser) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="profile-container">
      <h1>{currentUser.username}'s Profile</h1>
      
      <div className="bio-section">
        {isEditingBio ? (
          <div className="bio-edit">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />
            <button onClick={handleBioSave} className="save-button">
              Save Bio
            </button>
          </div>
        ) : (
          <div className="bio-display">
            <p>{currentUser.bio || 'No bio yet'}</p>
            <button 
              onClick={() => setIsEditingBio(true)}
              className="edit-button"
            >
              Edit Bio
            </button>
          </div>
        )}
      </div>

      <div className="selected-genres">
        <h3>Your Genres</h3>
        <div className="genre-tags">
          {currentUser.favoriteGenres.map(genre => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setShowGenres(!showGenres)}
        className="toggle-genres-button"
      >
        {showGenres ? 'Hide Genre Selection' : 'Select Genres'}
      </button>

      {showGenres && <GenreSelector />}
    </div>
  );
};

export const Discover = () => {
  return (    <main>
      <h1>Discover New Music</h1>
    </main>
  );
};