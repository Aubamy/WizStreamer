import React, { useState } from 'react';
import '../css/chart.css';
import Navigation from '../component/Navigation';

export default function Chart() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const user = 'You';

  const chats = [
    { name: 'Collins Emelumba', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Ada', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Idara', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Best ✌️', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Daniel', avatar: 'https://i.pravatar.cc/150?img=5' }
  ];

  const stickers = ['😀', '😂', '😍', '😎', '😭', '🔥', '🎉', '❤️', '👍', '😡'];

  const { livestreamClick } = Navigation();

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = (text = input) => {
    if (text.trim() === '' || !activeChat) return;

    const newMessage = {
      user,
      text,
      time: formatTime(),
      status: 'Delivered'
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    if (text === input) setInput('');
  };

  const getLastMessage = (chatName) => {
    const chatMessages = messages[chatName];
    return chatMessages && chatMessages.length > 0
      ? chatMessages[chatMessages.length - 1].text
      : 'No messages yet';
  };

  return (
    <div className={`chat-app-container ${activeChat ? 'chat-active' : ''}`}>
      <div className="chat-sidebar">
        <input type="text" placeholder="🔍 Search chats..." className="chat-search" />

        <div className="chat-list">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`chat-item ${activeChat === chat.name ? 'active' : ''}`}
              onClick={() => {
                setActiveChat(chat.name);
                setShowStickers(false);
              }}
            >
              <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
              <div className="chat-details">
                <div className="chat-name">{chat.name}</div>
                <div className="last-message">{getLastMessage(chat.name)}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="go-live-btn" onClick={livestreamClick}>
          🚀 Go Live
        </button>
      </div>

      <div className="chat-main-area">
        {activeChat && (
          <>
            <div className="chat-header">
              <button className="back-btn" onClick={() => setActiveChat(null)}>← Back</button>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="User avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            </div>

            <div className="chat-window">
              {(messages[activeChat] || []).map((msg, i, arr) => (
                <div key={i} className="message-bubble">
                  <div><strong>{msg.user}:</strong> {msg.text}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#cbd5e1',
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{msg.time}</span>
                    {msg.user === user && (
                      <span style={{ fontStyle: 'italic' }}>
                        {i === arr.length - 1 ? 'sent' : msg.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticker toggle button */}
            <div className="sticker-toggle-bar">
              <button className="toggle-sticker-btn" onClick={() => setShowStickers(!showStickers)}>
                {showStickers ? '🙈 Hide Stickers' : '😊 Stickers'}
              </button>
            </div>

            {/* Sticker panel */}
            {showStickers && (
              <div className="sticker-panel">
                {stickers.map((sticker, index) => (
                  <button
                    key={index}
                    className="sticker-btn"
                    onClick={() => handleSend(sticker)}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            )}

            <div className="chat-input-bar">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={() => handleSend()} className="send-btn">Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
