import React, { useState } from 'react';
import '../css/chart.css';
import Navigation from '../component/Navigation';

export default function Chart() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const user = 'User1';

  const chats = [
    'Collins Emelumba',
    'Ada',
    'Idara',
    'Best ✌️',
    'Daniel'
  ];

  const {
    createcallClick,
    audioroomClick,
    livestreamClick,
    chartClick
  } = Navigation();

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { user, text: input }]);
    setInput('');
  };

  return (
    <div className="chat-app-container">
      <div className="chat-sidebar">
        <input type="text" placeholder="🔍 Search chats..." className="chat-search" />
        
        <div className="chat-list">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`chat-item ${activeChat === chat ? 'active' : ''}`}
              onClick={() => {
                setActiveChat(chat);
                setMessages([]); // optional: reset messages per chat
              }}
            >
              {chat}
            </div>
          ))}
        </div>

        <button className="go-live-btn" onClick={livestreamClick}>
          🚀 Go Live
        </button>
      </div>

      <div className="chat-main-area">
        <div className="chat-header">
          Chatting as <strong>{user}</strong>
          <select className="user-select" defaultValue={user}>
            <option value="User1">Collins Aubamy</option>
            <option value="User2">User2</option>
          </select>
        </div>

        <div className="chat-window">
          {activeChat ? (
            <>
              {messages.map((msg, i) => (
                <div key={i} className="message-bubble">
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              ))}
            </>
          ) : (
            <p className="empty-message">💬 Select a chat to start messaging</p>
          )}
        </div>

        {activeChat && (
          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="send-btn">Send</button>
          </div>
        )}
      </div>
    </div>
  );
}
