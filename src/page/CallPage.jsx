import React, { useEffect, useRef, useState } from 'react'; // React core and hooks
import AgoraRTC from 'agora-rtc-sdk-ng'; // Agora SDK for real-time video/audio
import { useParams } from 'react-router-dom'; // React Router hook to get URL params

const APP_ID = 'dae228839d7b4d05adb0fdd14505c12b'; // Your Agora App ID
const TOKEN = null; // Token (null means not using secured token)

export default function CallPage() {
  const { channelId } = useParams(); // Get the dynamic route param from URL
  const CHANNEL = channelId || 'test-channel'; // Fallback to default if not provided

  const clientRef = useRef(null); // Ref to store Agora client instance
  const localVideoRef = useRef(null); // Ref for the local video DOM element
  const remoteVideoRef = useRef(null); // Ref for the remote video DOM element
  const localTracksRef = useRef([]); // Store local tracks (audio + video)
  const [micOn, setMicOn] = useState(true); // State to toggle mic
  const [camOn, setCamOn] = useState(true); // State to toggle cam
  const [copySuccess, setCopySuccess] = useState(''); // Copy link feedback

  useEffect(() => {
    AgoraRTC.setLogLevel(AgoraRTC.LOG_NONE); // Optional: disable Agora logs

    // Init the call setup
    const initCall = async () => {
      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }); // Create Agora client
      clientRef.current = client; // Save to ref

      // Create tracks for microphone and camera
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = [microphoneTrack, cameraTrack]; // Store locally

      cameraTrack.play(localVideoRef.current); // Play local camera in corner

      // When remote user publishes video/audio
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType); // Subscribe to the stream
        if (mediaType === 'video') {
          user.videoTrack.play(remoteVideoRef.current); // Play their video
        }
        if (mediaType === 'audio') {
          user.audioTrack.play(); // Play their audio
        }
      });

      // Clear remote video when user leaves
      client.on('user-unpublished', () => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.innerHTML = ''; // Clear video element
        }
      });

      await client.join(APP_ID, CHANNEL, TOKEN || null, null); // Join the channel
      await client.publish([microphoneTrack, cameraTrack]); // Publish your stream
    };

    initCall(); // Call the init function

    return () => {
      leaveCall(); // Cleanup when component unmounts
    };
  }, [CHANNEL]);

  // Toggle mic on/off
  const toggleMic = () => {
    const micTrack = localTracksRef.current[0]; // Get mic track
    if (micTrack) {
      micTrack.setEnabled(!micOn); // Enable/disable
      setMicOn(!micOn); // Update state
    }
  };

  // Toggle camera on/off
  const toggleCam = () => {
    const camTrack = localTracksRef.current[1]; // Get cam track
    if (camTrack) {
      camTrack.setEnabled(!camOn); // Enable/disable
      setCamOn(!camOn); // Update state
    }
  };

  // Leave call function
  const leaveCall = async () => {
    try {
      await clientRef.current?.leave(); // Leave Agora channel
      localTracksRef.current.forEach(track => track.close()); // Stop local tracks
    } catch (e) {
      console.error('Error leaving call:', e); // Handle error
    } finally {
      window.location.href = '/'; // Redirect to homepage
    }
  };

  // Copy call link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href) // Copy URL
      .then(() => setCopySuccess('✅ Link copied!')) // Success message
      .catch(() => setCopySuccess('❌ Failed')); // Error message
    setTimeout(() => setCopySuccess(''), 3000); // Reset after 3s
  };

  return (
    <div style={styles.page}> {/* Main container */}
      <div style={styles.videoWrapper}> {/* Wrapper for videos */}
        <div ref={remoteVideoRef} style={styles.remoteVideo}></div> {/* Remote user video */}
        <div ref={localVideoRef} style={styles.localVideo}></div> {/* Local (your) video */}
      </div>

      <div style={styles.controls}> {/* Button control bar */}
        <button onClick={toggleMic} style={styles.controlBtn}>
          {micOn ? '🎤 Mic On' : '🔇 Mic Off'} {/* Mic state display */}
        </button>
        <button onClick={toggleCam} style={styles.controlBtn}>
          {camOn ? '📷 Cam On' : '🚫 Cam Off'} {/* Cam state display */}
        </button>
        <button onClick={leaveCall} style={{ ...styles.controlBtn, background: '#e11d48' }}>
          ❌ Leave {/* Leave call */}
        </button>
        <button onClick={copyLink} style={{ ...styles.controlBtn, background: '#22c55e' }}>
          🔗 Share Link {/* Copy call link */}
        </button>
        {copySuccess && <span style={{ color: '#22c55e', marginLeft: 10 }}>{copySuccess}</span>}
      </div>
    </div>
  );
}

// Inline CSS styles used in the component
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
