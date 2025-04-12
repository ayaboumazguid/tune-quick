import * as React from 'react';
import { useMusicStore } from '../store/musicStore';

export const Profile = () => {
  const { currentUser } = useMusicStore();
  
  return (
    <div>
      <h1>Profile</h1>
      {currentUser && (
        <div>
          <h2>{currentUser.username}</h2>
          <p>{currentUser.bio}</p>
        </div>
      )}
    </div>
  );
};