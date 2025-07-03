import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = 'dae228839d7b4d05adb0fdd14505c12b';
const CHANNEL = 'test-channel'; // Static channel
const TOKEN = null;

export default function CallPage() {
  const clientRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localTracksRef = useRef([]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    AgoraRTC.setLogLevel(AgoraRTC.LOG_NONE);

    const initCall = async () => {
      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      clientRef.current = client;

      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = [microphoneTrack, cameraTrack];

      cameraTrack.play(localVideoRef.current);

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          user.videoTrack.play(remoteVideoRef.current);
        }
        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });

      await client.join(APP_ID, CHANNEL, TOKEN || null, null);
      await client.publish([microphoneTrack, cameraTrack]);
    };

    initCall();

    return () => {
      leaveCall();
    };
  }, []);

  const toggleMic = () => {
    const micTrack = localTracksRef.current[0];
    if (micTrack) {
      micTrack.setEnabled(!micOn);
      setMicOn(!micOn);
    }
  };

  const toggleCam = () => {
    const camTrack = localTracksRef.current[1];
    if (camTrack) {
      camTrack.setEnabled(!camOn);
      setCamOn(!camOn);
    }
  };

  const leaveCall = async () => {
    try {
      await clientRef.current?.leave();
      localTracksRef.current.forEach(track => track.close());
    } catch (e) {
      console.error('Error leaving call:', e);
    } finally {
      window.location.reload();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setCopySuccess('✅ Link copied!'))
      .catch(() => setCopySuccess('❌ Failed'));
    setTimeout(() => setCopySuccess(''), 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.videoWrapper}>
        <div ref={remoteVideoRef} style={styles.remoteVideo}></div>
        <div ref={localVideoRef} style={styles.localVideo}></div>
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
    position: 'relative',
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    background: '#334155',
    borderRadius: '12px',
  },
  localVideo: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '240px',
    height: '160px',
    background: '#1e293b',
    border: '2px solid white',
    borderRadius: '12px',
    zIndex: 10,
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
