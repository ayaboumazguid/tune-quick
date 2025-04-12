import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './Discover.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  addedBy: string;
  createdAt: Date;
}

interface SongData {
  title: string;
  artist: string;
  genre: string;
  createdAt: Date;
}

interface AddSongModalProps {
  onClose: () => void;
}

export const AddSongModal: React.FC<AddSongModalProps> = ({ onClose }) => {
  return (
    <div className="add-song-modal">
      <h2>Add New Song</h2>
      <form>
        <input type="text" placeholder="Song Title" />
        <input type="text" placeholder="Artist" />
        <input type="text" placeholder="Genre" />
        <button type="submit">Add Song</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export const Discover: React.FC = () => {
  const { addSong, deleteSong, availableGenres, songs } = useMusicStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter(song => (
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && artist && selectedGenre) {
      addSong({ title, artist, genre: selectedGenre, createdAt: new Date() });
      setTitle('');
      setArtist('');
      setSelectedGenre('');
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      deleteSong(id);
    }
  };

  const [filterGenre, setFilterGenre] = useState('');
  return (
    <div className="discover-container">
      <div className="discover-header">
        <h1>Discover Music</h1>
        <button 
          className="add-song-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add Song
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-song-modal">
            <div className="modal-header">
              <h2>Add New Song</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddSong} className="add-song-form">
              <div className="form-group">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Song title"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Artist name"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  required
                >
                  <option value="">Select genre</option>
                  {availableGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Add Song
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {availableGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="songs-grid">
        {filteredSongs.map(song => (
          <div key={song.id} className="song-card">
            <div className="song-header">
              <h3>{song.title}</h3>
              <button 
                onClick={() => handleDelete(song.id)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
            <p>{song.artist}</p>
            <span className="genre-tag">{song.genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

