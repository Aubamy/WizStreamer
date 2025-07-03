import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = 'dae228839d7b4d05adb0fdd14505c12b'; // Your Agora App ID
const CHANNEL = 'test-channel';
const TOKEN = null;

export default function CallPage() {
  const clientRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [localTrack, setLocalTrack] = useState(null);
  const [remoteTrack, setRemoteTrack] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    AgoraRTC.setLogLevel(AgoraRTC.LOG_NONE);

    const initCall = async () => {
      clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTrack(cameraTrack);

      localVideoRef.current && cameraTrack.play(localVideoRef.current);

      clientRef.current.on('user-published', async (user, mediaType) => {
        await clientRef.current.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteTrack = user.videoTrack;
          setRemoteTrack(remoteTrack);
          remoteVideoRef.current && remoteTrack.play(remoteVideoRef.current);
        }
      });

      await clientRef.current.join(APP_ID, CHANNEL, TOKEN || null, null);
      await clientRef.current.publish([microphoneTrack, cameraTrack]);
      setJoined(true);
    };

    initCall();

    return () => {
      if (clientRef.current) {
        clientRef.current.leave();
        AgoraRTC.createMicrophoneAndCameraTracks().then(([mic, cam]) => {
          mic.close();
          cam.close();
        });
      }
    };
  }, []);

  const toggleMic = () => {
    clientRef.current.localTracks[0].setEnabled(!micOn);
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    clientRef.current.localTracks[1].setEnabled(!camOn);
    setCamOn(!camOn);
  };

  const leaveCall = async () => {
    await clientRef.current.leave();
    window.location.reload();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setCopySuccess('✅ Link copied!'))
      .catch(() => setCopySuccess('❌ Failed to copy'));
    
    setTimeout(() => setCopySuccess(''), 3000); // Reset after 3 seconds
  };

  return (
    <div style={styles.page}>
      <div style={styles.videoWrapper}>
        <div ref={localVideoRef} style={styles.localVideo}></div>
        <div ref={remoteVideoRef} style={styles.remoteVideo}></div>
      </div>

      <div style={styles.controls}>
        <button onClick={toggleMic} style={styles.controlBtn}>
          {micOn ? '🎤 Mic On' : '🔇 Mic Off'}
        </button>
        <button onClick={toggleCam} style={styles.controlBtn}>
          {camOn ? '📷 Cam On' : '🚫 Cam Off'}
        </button>
        <button onClick={leaveCall} style={{ ...styles.controlBtn, background: '#e11d48' }}>
          ❌ Leave
        </button>
        <button onClick={copyLink} style={{ ...styles.controlBtn, background: '#22c55e' }}>
          🔗 Share Link
        </button>
        {copySuccess && <span style={{ color: '#22c55e', marginLeft: 10 }}>{copySuccess}</span>}
      </div>
    </div>
  );
}


// CHECK

const styles = {
  page: {
    height: '100vh',
    background: '#0f172a',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  videoWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '80%',
    width: '100%',
  },
  localVideo: {
    width: '300px',
    height: '200px',
    background: '#1e293b',
    borderRadius: '12px',
  },
  remoteVideo: {
    width: '60vw',
    height: '60vh',
    background: '#334155',
    borderRadius: '12px',
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  controlBtn: {
    background: '#2563eb',
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    color: 'white',
  },
};
