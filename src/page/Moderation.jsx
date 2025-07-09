import React, { useState } from 'react';
import '../css/moderation.css';

export default function Moderation() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ada', text: 'Hello everyone!' },
    { id: 2, user: 'John', text: 'This is 🔥🔥' },
    { id: 3, user: 'Spammer', text: 'Buy fake ID cards here!' }
  ]);
  const [bannedUsers, setBannedUsers] = useState([]);

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const banUser = (username) => {
    setBannedUsers((prev) => [...prev, username]);
    setMessages((prev) => prev.filter((msg) => msg.user !== username));
  };

  return (
    <div className="moderation-container">
      <h2>🛡️ Chat Moderation Panel</h2>

      {bannedUsers.length > 0 && (
        <div className="banned-list">
          <strong>Banned Users:</strong>
          <div className="banned-tags">
            {bannedUsers.map((user, index) => (
              <span key={index} className="banned-pill">{user}</span>
            ))}
          </div>
        </div>
      )}

      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-header">
              <span className="user-badge">{msg.user}</span>
            </div>
            <div className="message-body">
              {msg.text}
            </div>
            <div className="moderation-actions">
              <button className="delete-btn" onClick={() => deleteMessage(msg.id)}>🗑️ Delete</button>
              <button className="ban-btn" onClick={() => banUser(msg.user)}>🚫 Ban</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
