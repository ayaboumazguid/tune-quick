import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './Messages.css';

export const Messages: React.FC = () => {
  const { currentUser, messages, sendMessage, markMessageAsRead } = useMusicStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewConversation, setShowNewConversation] = useState(false);

  const conversationPartners = Array.from(new Set([
    ...messages.map(m => m.senderId),
    ...messages.map(m => m.receiverId)
  ])).filter(id => id !== currentUser?.id);

  const conversationMessages = messages.filter(m => 
    (m.senderId === selectedUser && m.receiverId === currentUser?.id) ||
    (m.senderId === currentUser?.id && m.receiverId === selectedUser)
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && newMessage.trim()) {
      sendMessage(selectedUser, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="messages-container">
      <div className="users-list">
        <h2>Conversations</h2>
        {conversationPartners.map(userId => (
          <button
            key={userId}
            onClick={() => setSelectedUser(userId)}
            className={`user-button ${selectedUser === userId ? 'active' : ''}`}
          >
            {userId}
            {messages.some(m => 
              m.senderId === userId && 
              m.receiverId === currentUser?.id && 
              !m.read
            ) && <span className="unread-badge" />}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="messages-list">
              {conversationMessages.map(message => (
                <div 
                  key={message.id}
                  className={`message ${
                    message.senderId === currentUser?.id ? 'sent' : 'received'
                  }`}
                  onClick={() => markMessageAsRead(message.id)}
                >
                  <p>{message.content}</p>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};