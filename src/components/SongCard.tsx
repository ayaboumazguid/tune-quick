import * as React from 'react';
import { useMusicStore } from '../stores/musicStore';

interface Song {
  id: string;
  title: string;
  artist: string;
  addedBy: string;
  genre: string;
  createdAt: Date;
}

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const { addSong } = useMusicStore();
  
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={() => addSong({ ...song })}>Add to Favorites</button>
    </div>
  );
};