import React, { useEffect, useRef, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
import '../css/audioroom.css'; // 👈 Import CSS here

// const APP_ID = 'YOUR_AGORA_APP_ID';
// const CHANNEL = 'audio-room';
// const TOKEN = null;

export default function AudioRoom() {
const [participants, setParticipants] = useState(['You']);
  const [micOn, setMicOn] = useState(false);
  const micTrackRef = useRef(null);

  const toggleMic = async () => {
    if (!micOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micTrackRef.current = stream;
        setMicOn(true);
      } catch (err) {
        console.error('Mic access denied:', err);
      }
    } else {
      micTrackRef.current?.getTracks().forEach((track) => track.stop());
      setMicOn(false);
    }
  };

  const leaveRoom = () => {
    micTrackRef.current?.getTracks().forEach((track) => track.stop());
    setMicOn(false);
    alert('You have left the room');
  };

  return (
    <div className="page">
      <h1 className="title">🎧 Audio Room</h1>

      <div className="participant-list">
        {participants.map((user, index) => (
          <div className="user-tile" key={index}>
            {user} {user === 'You' && micOn ? '🎙️' : ''}
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="btn" onClick={toggleMic}>
          {micOn ? 'Mute Mic' : 'Unmute Mic'}
        </button>
        <button className="btn leave" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>
    </div>
  );
}
