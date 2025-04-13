import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './StartConversation.css';

interface User {
  id: string;
  username: string;
}

interface StartConversationProps {
  onClose: () => void;
  onSelectUser: (userId: string) => void;
}

export const StartConversation: React.FC<StartConversationProps> = ({
  onClose,
  onSelectUser,
}) => {
  const { users = [] } = useMusicStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="conversation-modal">
      <div className="modal-header">
        <h2>Start a Conversation</h2>
        <button onClick={onClose}>×</button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <div className="users-list">
        {filteredUsers.map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className="user-item"
          >
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
};