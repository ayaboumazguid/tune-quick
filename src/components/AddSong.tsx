import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './AddSong.css';

interface AddSongProps {
  onClose: () => void;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  createdAt: Date;
  addedBy: string;
}

export const AddSong: React.FC<AddSongProps> = ({ onClose }) => {
  const { addSong, availableGenres } = useMusicStore();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && artist && selectedGenre) {
      addSong({
        title,
        artist,
        genre: selectedGenre,
        addedBy: 'user', // or any appropriate user identifier
        createdAt: new Date()
      });
      onClose();
    }
  };

  return (
    <div className="add-song-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Song</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-song-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="artist">Artist</label>
            <input
              id="artist"
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Enter artist name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              required
              className="genre-select"
            >
              <option value="">Select a genre</option>
              {availableGenres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
};