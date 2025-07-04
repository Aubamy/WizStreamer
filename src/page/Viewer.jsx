// Import React core functions
import React, { useEffect, useRef, useState } from 'react';
// Import PeerJS for WebRTC connection
import Peer from 'peerjs';
// Import CSS styles for the livestream
import '../css/livestream.css';
// Import Link for navigation
import { Link } from 'react-router-dom';

// Define the Viewer component
export default function Viewer() {
  const videoRef = useRef(null); // Reference to the video element to display the stream
  const peerRef = useRef(null); // Reference to the PeerJS instance
  const connRef = useRef(null); // Reference to the chat data connection with streamer
  const [chatInput, setChatInput] = useState(''); // State to store message input
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const stickers = ['❤️', '😂', '👍', '🔥', '🎉', '😊']; // Array of sticker emojis

  useEffect(() => {
    const peer = new Peer(); // Create a new PeerJS instance (viewer)
    peerRef.current = peer;

    peer.on('open', (id) => { // When viewer peer is connected and gets an ID
      console.log('Viewer Peer ID:', id);

      const conn = peer.connect('streamer1'); // Connect to streamer with peer ID "streamer1"
      connRef.current = conn;

      conn.on('open', () => { // When chat connection opens
        console.log('Connected to streamer for chat');
        conn.send('👋 Viewer joined the stream!'); // Send join message to streamer
      });

      conn.on('data', (msg) => { // Handle incoming chat messages from streamer
        setMessages(prev => [...prev, { id: Date.now(), text: `Streamer: ${msg}` }]);
      });

      // Delay the call slightly to ensure streamer is ready
      setTimeout(() => {
        const call = peer.call('streamer1', null); // Make a call to streamer (no media to send from viewer)
        call.on('stream', (remoteStream) => { // When receiving stream from streamer
          console.log('Receiving stream from streamer');
          videoRef.current.srcObject = remoteStream; // Set remote stream to video element
        });
        call.on('error', err => console.error('Call error:', err)); // Handle call errors
      }, 1500); // 1.5 second delay
    });

    return () => {
      peer.destroy(); // Cleanup peer connection when component unmounts
    };
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return; // Do nothing if input is empty
    connRef.current?.send(chatInput); // Send message to streamer via PeerJS data channel
    setMessages(prev => [...prev, { id: Date.now(), text: `You: ${chatInput}` }]); // Add message to chat history
    setChatInput(''); // Clear input field
  };

  const addSticker = (emoji) => {
    setChatInput(prev => prev + emoji); // Append selected emoji to input field
  };

  return (
    <div className="livestream-page"> {/* Main container */}
      <header className="livestream-header"> {/* Header section */}
        <span className="live-badge">LIVE</span> {/* Live badge */}
        <h1 className="stream-title">Watching Live</h1> {/* Title */}
        <Link to="/dashboard"> {/* Back to dashboard button */}
          <button style={{marginLeft:'1000px'}}>Back</button>
        </Link>
      </header>

      <div className="video-wrapper"> {/* Video container */}
        <video ref={videoRef} autoPlay playsInline className="video-player" /> {/* Streamed video */}
      </div>

      <aside className="chat-panel"> {/* Chat sidebar */}
        <div className="chat-header">Live Chat</div> {/* Chat title */}
        <div className="chat-box"> {/* Chat messages */}
          {messages.map(msg => (
            <div key={msg.id} className="chat-message">{msg.text}</div> // Render each message
          ))}
        </div>
        <div className="sticker-row"> {/* Sticker emojis */}
          {stickers.map((emoji, index) => (
            <button key={index} onClick={() => addSticker(emoji)}>{emoji}</button> // Add emoji to input
          ))}
        </div>
        <div className="chat-input"> {/* Message input area */}
          <input
            type="text"
            placeholder="Message + emoji"
            value={chatInput} // Input value
            onChange={(e) => setChatInput(e.target.value)} // Update on change
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter key
          />
          <button onClick={handleSendMessage}>Send</button> {/* Send button */}
        </div>
      </aside>
    </div>
  );
}
