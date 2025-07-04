import React, { useState } from 'react'; // Import React and the useState hook
import '../css/chart.css'; // Import the custom CSS for this chat page
import Navigation from '../component/Navigation'; // Import navigation handlers from custom Navigation hook

export default function Chart() { // Define and export the Chart functional component
  const [activeChat, setActiveChat] = useState(null); // Track which chat is currently active
  const [messages, setMessages] = useState({}); // Store all messages, grouped by contact name
  const [input, setInput] = useState(''); // Store the message currently typed in input box
  const [showStickers, setShowStickers] = useState(false); // Boolean to toggle sticker panel visibility
  const user = 'You'; // Set the name of the current user (hardcoded here)

  const chats = [ // List of contacts to show in sidebar
    { name: 'Collins Emelumba', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Ada', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Idara', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Best ✌️', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Daniel', avatar: 'https://i.pravatar.cc/150?img=5' }
  ];

  const stickers = ['😀', '😂', '😍', '😎', '😭', '🔥', '🎉', '❤️', '👍', '😡']; // List of sticker emojis

  const { livestreamClick } = Navigation(); // Extract the livestreamClick function from Navigation hook

  const formatTime = () => { // Function to return current time in HH:MM format
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = (text = input) => { // Function to send a message or sticker
    if (text.trim() === '' || !activeChat) return; // Do nothing if input is empty or no active chat

    const newMessage = { // Create a new message object
      user,
      text,
      time: formatTime(), // Attach timestamp
      status: 'Delivered' // Default status
    };

    setMessages(prev => ({ // Update message state by appending to active chat
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage] // Keep existing messages and add new one
    }));

    if (text === input) setInput(''); // Clear input if it came from the input box (not sticker)
  };

  const getLastMessage = (chatName) => { // Helper to get last message of each chat
    const chatMessages = messages[chatName];
    return chatMessages && chatMessages.length > 0
      ? chatMessages[chatMessages.length - 1].text
      : 'No messages yet';
  };

  return ( // Begin JSX return
    <div className={`chat-app-container ${activeChat ? 'chat-active' : ''}`}> {/* Root container with active class toggle */}

      <div className="chat-sidebar"> {/* Sidebar showing contacts */}
        <input type="text" placeholder="🔍 Search chats..." className="chat-search" /> {/* Static search input */}

        <div className="chat-list"> {/* Contact list area */}
          {chats.map((chat, index) => ( // Map over contact list
            <div
              key={index}
              className={`chat-item ${activeChat === chat.name ? 'active' : ''}`} // Highlight if active
              onClick={() => {
                setActiveChat(chat.name); // Set the clicked chat as active
                setShowStickers(false); // Hide sticker panel on new chat
              }}
            >
              <img src={chat.avatar} alt={chat.name} className="chat-avatar" /> {/* Contact avatar */}
              <div className="chat-details"> {/* Contact name and last message */}
                <div className="chat-name">{chat.name}</div>
                <div className="last-message">{getLastMessage(chat.name)}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="go-live-btn" onClick={livestreamClick}> {/* Button to go live */}
          🚀 Go Live
        </button>
      </div>

      <div className="chat-main-area"> {/* Main chat conversation area */}
        {activeChat && ( // Only show if a chat is selected
          <>
            <div className="chat-header"> {/* Header with back button */}
              <button className="back-btn" onClick={() => setActiveChat(null)}>← Back</button> {/* Back to list */}
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="User avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }} // User avatar styling
              />
            </div>

            <div className="chat-window"> {/* Scrollable message view area */}
              {(messages[activeChat] || []).map((msg, i, arr) => ( // Map messages for current chat
                <div key={i} className="message-bubble"> {/* Each message bubble */}
                  <div><strong>{msg.user}:</strong> {msg.text}</div> {/* Sender name and message */}
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#cbd5e1',
                    marginTop: '5px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{msg.time}</span> {/* Show time */}
                    {msg.user === user && ( // If it's your message
                      <span style={{ fontStyle: 'italic' }}>
                        {i === arr.length - 1 ? 'sent' : msg.status} {/* Show 'sent' if last msg */}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticker toggle button */}
            <div className="sticker-toggle-bar">
              <button className="toggle-sticker-btn" onClick={() => setShowStickers(!showStickers)}>
                {showStickers ? '🙈 Hide Stickers' : '😊 Stickers'} {/* Toggle sticker text */}
              </button>
            </div>

            {/* Sticker panel */}
            {showStickers && (
              <div className="sticker-panel">
                {stickers.map((sticker, index) => ( // Map over sticker list
                  <button
                    key={index}
                    className="sticker-btn"
                    onClick={() => handleSend(sticker)} // Send sticker as message
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            )}

            <div className="chat-input-bar"> {/* Input and send button */}
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={input} // Bind to input state
                onChange={(e) => setInput(e.target.value)} // Update input on change
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Send on Enter
              />
              <button onClick={() => handleSend()} className="send-btn">Send</button> {/* Send button */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// CHECK