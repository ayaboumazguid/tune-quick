import React from 'react';
import { useMusicStore } from '../store/musicStore';

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
  };
}

export const SongCard = ({ song }: SongCardProps) => {
  const { addSong } = useMusicStore();
  
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <button onClick={() => addSong({ ...song, addedBy: 'user' })}>Add to Favorites</button>
    </div>
  );
};