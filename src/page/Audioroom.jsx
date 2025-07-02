import React, { useEffect, useRef, useState } from 'react';
import '../css/audioroom.css';

export default function AudioRoom() {
  const [participants, setParticipants] = useState(['You']);
  const [micOn, setMicOn] = useState(false);
  const micTrackRef = useRef(null);

  // Simulate a guest joining and leaving
  useEffect(() => {
    const joinTimer = setTimeout(() => {
      setParticipants((prev) => [...prev, 'Guest']);
    }, 3000);

    const leaveTimer = setTimeout(() => {
      setParticipants((prev) => prev.filter((name) => name !== 'Guest'));
    }, 10000);

    return () => {
      clearTimeout(joinTimer);
      clearTimeout(leaveTimer);
      micTrackRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleMic = async () => {
    if (!micOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micTrackRef.current = stream;
        setMicOn(true);
      } catch (error) {
        console.error('Mic access denied:', error);
      }
    } else {
      micTrackRef.current?.getTracks().forEach((track) => track.stop());
      setMicOn(false);
    }
  };

  const leaveRoom = () => {
    micTrackRef.current?.getTracks().forEach((track) => track.stop());
    setMicOn(false);
    alert('You have left the room.');
  };

  return (
    <div className="page">
      <h1 className="title">🎧 Audio Room</h1>

      <div className="participant-list">
        {participants.map((name, idx) => (
          <div className="user-tile" key={idx}>
            {name} {name === 'You' && micOn ? '🎙️' : ''}
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
