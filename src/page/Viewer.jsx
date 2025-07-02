import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import '../css/livestream.css';
import { Link } from 'react-router-dom';

export default function Viewer() {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const connRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const stickers = ['❤️', '😂', '👍', '🔥', '🎉', '😊'];

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', (id) => {
      console.log('Viewer Peer ID:', id);

      // Connect to streamer for chat
      const conn = peer.connect('streamer1');
      connRef.current = conn;

      conn.on('open', () => {
        console.log('Connected to streamer for chat');
        conn.send('👋 Viewer joined the stream!');
      });

      conn.on('data', (msg) => {
        setMessages(prev => [...prev, { id: Date.now(), text: `Streamer: ${msg}` }]);
      });

      // ✅ Delay the call slightly to give streamer time to set up
      setTimeout(() => {
        const call = peer.call('streamer1', null);
        call.on('stream', (remoteStream) => {
          console.log('Receiving stream from streamer');
          videoRef.current.srcObject = remoteStream;
        });
        call.on('error', err => console.error('Call error:', err));
      }, 1500); // small delay
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    connRef.current?.send(chatInput);
    setMessages(prev => [...prev, { id: Date.now(), text: `You: ${chatInput}` }]);
    setChatInput('');
  };

  const addSticker = (emoji) => {
    setChatInput(prev => prev + emoji);
  };

  return (
    <div className="livestream-page">
      <header className="livestream-header">
        <span className="live-badge">LIVE</span>
        <h1 className="stream-title">Watching Live</h1>
        <Link to="/dashboard">
          <button>Back</button>
        </Link>
      </header>

      <div className="video-wrapper">
        <video ref={videoRef} autoPlay playsInline className="video-player" />
      </div>

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
    </div>
  );
}
