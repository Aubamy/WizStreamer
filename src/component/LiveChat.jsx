// Import React and useState hook
import React, { useState } from 'react';
// Import CSS for chat sidebar
import '../css/LiveChart.css';

// Define an array of sticker emojis
const stickers = [/* same as before */]; // You can fill in: '😂', '🔥', etc.

// Define the ChatSidebar component
const ChatSidebar = () => {
  const [messages, setMessages] = useState([]); // State to hold list of chat messages
  const [input, setInput] = useState(''); // State to hold current input text
  const [showStickers, setShowStickers] = useState(false); // Toggle to show/hide sticker panel

  // Function to send a message
  const sendMessage = () => {
    if (input.trim() === '') return; // Do not send if input is empty
    setMessages([...messages, input]); // Add new message to messages array
    setInput(''); // Clear input field
    setShowStickers(false); // Hide sticker panel after sending
  };

  // Function to add a sticker emoji to input field
  const handleStickerClick = (sticker) => {
    setInput((prev) => prev + sticker); // Append selected emoji to current input
  };

  // JSX to render the chat sidebar UI
  return (
    <div className="chat-container"> {/* Main chat container */}
      <div className="chat-header">Live Chat 💬</div> {/* Header title */}

      <div className="chat-messages"> {/* Message list section */}
        {messages.map((msg, idx) => ( // Loop through all messages
          <div key={idx} className="chat-message-bubble">
            {msg} {/* Render each message */}
          </div>
        ))}
      </div>

      <div className="chat-footer"> {/* Footer with input and buttons */}
        <input
          className="chat-input"
          value={input} // Bind input state to input field
          onChange={(e) => setInput(e.target.value)} // Update input on change
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key press
          placeholder="Type a message..."
        />
        <button className="chat-send-btn" onClick={sendMessage}>Send</button> {/* Send button */}
        <button className="chat-sticker-btn" onClick={() => setShowStickers(!showStickers)}>😊</button> {/* Toggle stickers */}
      </div>

      {showStickers && ( // Conditionally render sticker panel
        <div className="chat-sticker-panel">
          {stickers.map((sticker, idx) => ( // Loop through all stickers
            <span
              key={idx}
              className="chat-sticker"
              onClick={() => handleStickerClick(sticker)} // Add sticker on click
            >
              {sticker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the component so it can be used elsewhere
export default ChatSidebar;
