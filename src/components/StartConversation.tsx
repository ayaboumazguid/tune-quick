import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './StartConversation.css';

interface StartConversationProps {
  onClose: () => void;
  onSelectUser: (userId: string) => void;
}

export const StartConversation: React.FC<StartConversationProps> = ({
  onClose,
  onSelectUser,
}) => {
  const { users, currentUser } = useMusicStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.id !== currentUser?.id &&
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="start-conversation">
      <div className="search-header">
        <h3>New Conversation</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="user-search"
      />

      <div className="users-results">
        {filteredUsers.map(user => (
          <button
            key={user.id}
            className="user-result-item"
            onClick={() => onSelectUser(user.id)}
          >
            <div className="user-avatar">
              {user.username[0].toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              {user.bio && (
                <span className="user-bio">{user.bio}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};