// Import React and useState hook
import React, { useState } from 'react';
// Import CSS for chat sidebar
import '../css/LiveChart.css';

// Define an array of sticker emojis
const stickers = ['😂', '🔥', '❤️', '👍', '🎉', '😎', '🙌', '😭'];

// Define the ChatSidebar component
const ChatSidebar = () => {
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [input, setInput] = useState('');       // State for input text
  const [showStickers, setShowStickers] = useState(false); // Show/hide sticker panel

  // Send message function
  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, input]);
    setInput('');
    setShowStickers(false);
  };

  // Add sticker to input field (not send directly)
  const handleStickerClick = (sticker) => {
    setInput((prevInput) => prevInput + sticker);
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
        <button
          className="chat-sticker-btn"
          onClick={() => setShowStickers(!showStickers)}
        >
          😊
        </button>
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
