import React, { useRef, useState, useEffect } from 'react';
import Peer from 'peerjs';
import '../css/livestream.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

export default function Live() {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const connectionsRef = useRef([]);
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const stickers = ['❤️', '😂', '👍', '🔥', '🎉', '😊'];

  const startStreaming = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      setIsStreaming(true);
      setStartTime(Date.now());

      const peer = new Peer('streamer1');
      peerRef.current = peer;

      peer.on('open', (id) => {
        console.log('Streamer Peer ID:', id);
      });

      peer.on('call', (call) => {
        call.answer(mediaStream);
      });

      peer.on('connection', (conn) => {
        connectionsRef.current.push(conn);
        conn.on('data', (msg) => {
          setMessages(prev => [...prev, { id: Date.now(), text: `Viewer: ${msg}` }]);
        });
      });
    } catch (error) {
      console.error('Stream error:', error);
    }
  };

  const stopStreaming = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsStreaming(false);
    setElapsedTime('00:00');
    peerRef.current?.destroy();
  };

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
    return () => clearInterval(timer);
  }, [isStreaming, startTime]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    connectionsRef.current.forEach(conn => conn.send(chatInput));
    setMessages(prev => [...prev, { id: Date.now(), text: `You: ${chatInput}` }]);
    setChatInput('');
  };

  const addSticker = (emoji) => {
    setChatInput(prev => prev + emoji);
  };

  const {
    createcallClick,
    audioroomClick,
    livestreamClick,
    chartClickl,
    dashboardClick
  } = Navigation();

  return (
    <div className="livestream-page">
      <header className="livestream-header">
        <span className="live-badge">LIVE</span>
        <span className="live-timer">{elapsedTime}</span>
        <h1 className="stream-title">Livestream Event</h1>
        <Link to={'/dashboard'}>
          <button>Back</button>
        </Link>
      </header>

      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted playsInline className="video-player" />
        <div className="stream-controls">
          {isStreaming ? (
            <button onClick={stopStreaming} className="stop-btn">Stop Stream</button>
          ) : (
            <button onClick={startStreaming} className="start-btn">Start Stream</button>
          )}
        </div>
      </div>

      {/* <aside className="chat-panel">
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
      </aside> */}
    </div>
  );
}
