import * as React from 'react';
import { useMusicStore } from '../stores/musicStore';
import './Home.css';

interface Post {
  id: string;
  content: string;
  timestamp: Date;
  comments: Comment[];
  author: {
    username: string;
  };
}

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
  };
}

export const Home: React.FC = () => {
  const { posts } = useMusicStore();

  return (
    <div className="home-container">
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="username">{post.author.username}</span>
              <span className="timestamp">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="comments-section">
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="username">{comment.author.username}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};