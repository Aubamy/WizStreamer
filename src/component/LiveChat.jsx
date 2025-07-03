import React, { useState } from 'react';
import '../css/LiveChart.css';

const stickers = [/* same as before */];

const ChatSidebar = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, input]);
    setInput('');
    setShowStickers(false);
  };

  const handleStickerClick = (sticker) => {
    setInput((prev) => prev + sticker);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Live Chat 💬</div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message-bubble">
            {msg}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="chat-send-btn" onClick={sendMessage}>Send</button>
        <button className="chat-sticker-btn" onClick={() => setShowStickers(!showStickers)}>😊</button>
      </div>

      {showStickers && (
        <div className="chat-sticker-panel">
          {stickers.map((sticker, idx) => (
            <span
              key={idx}
              className="chat-sticker"
              onClick={() => handleStickerClick(sticker)}
            >
              {sticker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
