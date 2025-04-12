import * as React from 'react';
import { useMusicStore } from '../stores/musicStore';
import './GenreSelector.css';
import { useState } from 'react';

export const GenreSelector: React.FC = () => {
  const { currentUser, updateUserPreferences } = useMusicStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    currentUser?.favoriteGenres || []
  );
  
  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 
    'Classical', 'Electronic', 'Country', 'Folk',
    'Metal', 'Blues', 'Reggae', 'Latin', 'K-pop'
  ];

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      const updated = prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      setHasChanges(true);
      return updated;
    });
  };

  const handleSave = () => {
    updateUserPreferences({ genres: selectedGenres });
    setHasChanges(false);
  };

  return (
    <div className="genre-selector">
      <div className="genre-header">
        <h3>Select Your Favorite Genres</h3>
        {hasChanges && (
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        )}
      </div>
      <div className="genre-buttons">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`genre-button ${
              selectedGenres.includes(genre) ? 'selected' : ''
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

