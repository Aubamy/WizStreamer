import React, { useEffect, useRef, useState } from 'react';
import '../css/audioroom.css';

export default function Audioroom() {
  const [micOn, setMicOn] = useState(true);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Collins Emelumba' },
    { id: 2, name: 'Ada' },
    { id: 3, name: 'Daniel' },
  ]);
  const micTrackRef = useRef(null);

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micTrackRef.current = stream.getAudioTracks()[0];
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const toggleMic = () => {
    if (micTrackRef.current) {
      const enabled = !micOn;
      micTrackRef.current.enabled = enabled;
      setMicOn(enabled);
    }
  };

  const leaveRoom = () => {
    micTrackRef.current?.stop();
    alert('You left the room.');
    window.location.href = '/dashboard';
  };

  useEffect(() => {
    startAudio();
    return () => micTrackRef.current?.stop();
  }, []);

  return (
    <div className="audio-room-container">
      <h2 className="room-title">🎙️ Audio Room</h2>

      <div className="participants-section">
        {participants.map(user => (
          <div key={user.id} className="participant-bubble">
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      <div className="audio-controls">
        <button onClick={toggleMic} className={`audio-btn ${micOn ? 'on' : 'off'}`}>
          {micOn ? '🔊 Mic On' : '🔇 Mic Off'}
        </button>
        <button onClick={leaveRoom} className="leave-btn">🚪 Leave Room</button>
      </div>
    </div>
  );
}
