import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // 🔁 Update if deploying online
const STREAM_ID = 'wiz123'; // Static stream ID for now

export default function StreamerPage() {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const localStreamRef = useRef(null);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(SOCKET_SERVER_URL);

    // Join stream room as streamer
    socketRef.current.emit('join-stream', { streamId: STREAM_ID, role: 'streamer' });

    // Get webcam/mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      });

    // When a viewer joins, start WebRTC connection
    socketRef.current.on('viewer-joined', async (viewerId) => {
      const peer = new RTCPeerConnection();
      peersRef.current[viewerId] = peer;

      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current);
      });

      peer.onicecandidate = (e) => {
        if (e.candidate) {
          socketRef.current.emit('ice-candidate', {
            targetId: viewerId,
            candidate: e.candidate
          });
        }
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socketRef.current.emit('offer', { viewerId, offer });
    });

    socketRef.current.on('answer', async ({ viewerId, answer }) => {
      const peer = peersRef.current[viewerId];
      if (peer) {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice-candidate', ({ from, candidate }) => {
      const peer = peersRef.current[from];
      if (peer) {
        peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on('chat', (message) => {
      setChatMessages((prev) => [...prev, message]);
    });

    return () => {
      Object.values(peersRef.current).forEach(peer => peer.close());
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const message = { sender: 'Streamer', text: chatInput };
    socketRef.current.emit('chat', { streamId: STREAM_ID, message });
    setChatInput('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔴 Broadcasting Live</h2>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: 600, borderRadius: 8 }} />

      <div style={{ marginTop: 20 }}>
        <h3>Live Chat</h3>
        <div style={{ height: 200, overflowY: 'auto', border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          {chatMessages.map((msg, i) => (
            <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>
          ))}
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          style={{ padding: 8, width: '70%' }}
        />
        <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>Send</button>
      </div>
    </div>
  );
}
