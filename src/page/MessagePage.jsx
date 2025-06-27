import React, { useState } from 'react';
import '../css/MessagePage.css';
import '../css/home.css'
import Chartfriends from '../component/Chartfriends';
import { div } from 'framer-motion/client';

export default function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('User1');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = { id: Date.now(), user, text: input };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <>
       
    <div className="message-page">
      <div className="user-switch">
        <label>Select User:</label>
        <select value={user} onChange={(e) => setUser(e.target.value)}>
          <option value="User1">you</option>
          {/* <option value="User2">User2</option> */}
        </select>
      </div>

      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.user === user ? 'self' : 'other'}`}
          >
            <span className="chat-user">{msg.user}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>

    </>
  );
}
