// Import React and needed hooks
import React, { useRef, useState, useEffect } from 'react';
// Import PeerJS for WebRTC
import Peer from 'peerjs';
// Import styles for the livestream page
import '../css/livestream.css';
// Import custom navigation utility
import Navigation from './Navigation';
// Import Link for navigation
import { Link } from 'react-router-dom';

// Define the Live component
export default function Live() {
  const videoRef = useRef(null); // Ref for the <video> element
  const peerRef = useRef(null); // Ref to store the PeerJS instance
  const connectionsRef = useRef([]); // Ref to store viewer connections

  const [stream, setStream] = useState(null); // Media stream state
  const [isStreaming, setIsStreaming] = useState(false); // Streaming state
  const [startTime, setStartTime] = useState(null); // Stream start time
  const [elapsedTime, setElapsedTime] = useState('00:00'); // Timer display
  const [chatInput, setChatInput] = useState(''); // Chat input field
  const [messages, setMessages] = useState([]); // Array of chat messages

  const stickers = ['❤️', '😂', '👍', '🔥', '🎉', '😊']; // List of stickers for chat

  // Function to start streaming
  const startStreaming = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // Ask for camera/mic access
      setStream(mediaStream); // Save stream
      videoRef.current.srcObject = mediaStream; // Show video locally
      setIsStreaming(true); // Mark as streaming
      setStartTime(Date.now()); // Set timer start

      const peer = new Peer('streamer1'); // Create Peer with fixed ID
      peerRef.current = peer; // Save peer instance

      peer.on('open', (id) => {
        console.log('Streamer Peer ID:', id); // Log peer ID
      });

      peer.on('call', (call) => {
        call.answer(mediaStream); // Answer incoming calls with our stream
      });

      peer.on('connection', (conn) => {
        connectionsRef.current.push(conn); // Save data connection
        conn.on('data', (msg) => {
          setMessages(prev => [...prev, { id: Date.now(), text: `Viewer: ${msg}` }]); // Append viewer message
        });
      });
    } catch (error) {
      console.error('Stream error:', error); // Log any errors
    }
  };

  // Function to stop the stream
  const stopStreaming = () => {
    stream?.getTracks().forEach(track => track.stop()); // Stop all video/audio tracks
    setStream(null); // Clear stream
    setIsStreaming(false); // Not streaming
    setElapsedTime('00:00'); // Reset timer
    peerRef.current?.destroy(); // Destroy peer connection
  };

  // Update the stream timer every second
  useEffect(() => {
    let timer;
    if (isStreaming && startTime) {
      timer = setInterval(() => {
        const diff = Date.now() - startTime;
        const mins = String(Math.floor(diff / 60000)).padStart(2, '0');
        const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setElapsedTime(`${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [isStreaming, startTime]);

  // Function to send chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return; // Skip if empty
    connectionsRef.current.forEach(conn => conn.send(chatInput)); // Send to all
    setMessages(prev => [...prev, { id: Date.now(), text: `You: ${chatInput}` }]); // Add to UI
    setChatInput(''); // Clear input
  };

  // Function to add emoji to message
  const addSticker = (emoji) => {
    setChatInput(prev => prev + emoji); // Add emoji to chat input
  };

  // Get navigation functions
  const {
    createcallClick,
    audioroomClick,
    livestreamClick,
    chartClickl,
    dashboardClick
  } = Navigation();

  // Render UI
  return (
    <div className="livestream-page">
      {/* Header section */}
      <header className="livestream-header">
        <span className="live-badge">LIVE</span> {/* Live label */}
        <span className="live-timer">{elapsedTime}</span> {/* Elapsed time */}
        <h1 className="stream-title">Livestream Event</h1> {/* Stream title */}
        <Link to={'/dashboard'}>
          <button style={{marginLeft:'500px', marginBottom:'30px'}}>Back</button> {/* Back to dashboard */}
        </Link>
      </header>

      {/* Video display area */}
      <div className="video-wrapper">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="video-player"
        />
        <div className="stream-controls">
          {isStreaming ? (
            <button onClick={stopStreaming} className="stop-btn">Stop Stream</button> // Stop stream button
          ) : (
            <button onClick={startStreaming} className="start-btn">Start Stream</button> // Start stream button
          )}
        </div>
      </div>

      {/* Chat panel (optional - uncomment if needed) */}
      {/* 
      <aside className="chat-panel">
        <div className="chat-header">Live Chat</div>
        <div className="chat-box">
          {messages.map(msg => (
            <div key={msg.id} className="chat-message">{msg.text}</div>
          ))}
        </div>
        <div className="sticker-row">
          {stickers.map((emoji, index) => (
            <button key={index} onClick={() => addSticker(emoji)}>{emoji}</button>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Message + emoji"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </aside>
      */}
    </div>
  );
}
