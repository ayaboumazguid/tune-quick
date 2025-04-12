import * as React from 'react';
import { useState } from 'react';
import { useMusicStore } from '../stores/musicStore';
import './Home.css';

export const Home: React.FC = () => {
  const { currentUser, posts, deleteComment } = useMusicStore();
  const [newComment, setNewComment] = useState<string>('');

  const handleDeleteComment = (postId: string, commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(postId, commentId);
    }
  };

  return (
    <div className="home-container">
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="username">{post.username}</span>
              <span className="timestamp">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="post-content">{post.content}</p>
            
            <div className="comments-section">
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="username">{comment.username}</span>
                    {currentUser?.id === comment.userId && (
                      <button 
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(post.id, comment.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="comment-form">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <button 
                className="submit-comment-btn"
                onClick={() => {
                  if (newComment.trim()) {
                    // Add comment logic here
                    setNewComment('');
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};