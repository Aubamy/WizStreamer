import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Firebase environment setup
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let app, auth, db;
try {
  if (Object.keys(firebaseConfig).length > 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.error("Firebase configuration is missing.");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Stickers
const stickers = ['❤️', '😂', '👍', '🔥', '🎉', '😊', '🤩', '👋', '🌟', '🥳', '🚀', '💯', '👏', '🎵', '💡', '🌈', '👑', '💪', '🌸', '✨'];

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationSuccess, setShowDonationSuccess] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const chatMessagesEndRef = useRef(null);
  const videoRef = useRef(null); // New ref for video

  // Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Firebase auth
  useEffect(() => {
    if (!auth) {
      setIsAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }
        } catch (error) {
          console.error("Error signing in:", error);
        }
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, [auth, initialAuthToken]);

  // Fetch chat messages
  useEffect(() => {
    if (!db || !isAuthReady || !user) return;

    const chatCollectionRef = collection(db, `artifacts/${appId}/public/data/chatMessages`);
    const q = query(chatCollectionRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatMessages(messages);
    }, (error) => {
      console.error("Error fetching chat messages:", error);
    });

    return () => unsubscribe();
  }, [db, isAuthReady, user]);

  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!db || !user || chatMessage.trim() === '') return;

    try {
      const chatCollectionRef = collection(db, `artifacts/${appId}/public/data/chatMessages`);
      await addDoc(chatCollectionRef, {
        userId: user.uid,
        username: username || `User-${user.uid.substring(0, 5)}`,
        messageText: chatMessage,
        timestamp: serverTimestamp()
      });
      setChatMessage('');
      setShowStickers(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendSticker = (stickerEmoji) => {
    setChatMessage((prevMessage) => prevMessage + stickerEmoji);
  };

  const handleDonate = () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) return;

    setShowDonationSuccess(true);
    setDonationAmount('');
    setTimeout(() => setShowDonationSuccess(false), 3000);
    console.log(`Simulating donation of ${amount} to the streamer.`);
  };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
        <p className="ml-4">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col lg:flex-row p-4 rounded-lg">
      {/* Main Content */}
      <div className="flex-1 lg:w-3/4 flex flex-col pr-0 lg:pr-4">
        {/* Live Camera Feed */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-4 aspect-video flex items-center justify-center relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Info and Donation */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-4">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Awesome Streamer's Live Show!</h2>
          <p className="text-gray-300 mb-4">
            Welcome to the stream! Enjoy the content, join the chat, and consider supporting the stream!
          </p>

          <div className="mt-6 p-4 border border-purple-600 rounded-lg bg-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-purple-300">Support the Stream!</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Donation amount (e.g., 5.00)"
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <button
                onClick={handleDonate}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Donate
              </button>
            </div>
            {showDonationSuccess && (
              <p className="mt-3 text-green-400 text-sm animate-fade-in">Thank you for your generous donation!</p>
            )}
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="lg:w-1/4 bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col h-[calc(100vh-2rem)] lg:h-auto">
        <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">Live Chat</h2>

        {user && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Your Username:</label>
            <input
              type="text"
              id="username"
              placeholder={`Enter username (e.g., User-${user.uid.substring(0, 5)})`}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Your ID: <span className="font-mono text-xs">{user.uid}</span></p>
          </div>
        )}

        <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto mb-4 border border-gray-700">
          {chatMessages.length === 0 ? (
            <p className="text-gray-400 text-center italic mt-4">No messages yet. Say hello!</p>
          ) : (
            chatMessages.map((msg) => (
              <div key={msg.id} className="mb-2 text-sm">
                <span className={`font-semibold ${msg.userId === user?.uid ? 'text-green-400' : 'text-blue-300'}`}>
                  {msg.username}:
                </span>{' '}
                <span className="text-gray-200">{msg.messageText}</span>
              </div>
            ))
          )}
          <div ref={chatMessagesEndRef} />
        </div>

        <div className="relative">
          {showStickers && (
            <div className="absolute bottom-full left-0 w-full bg-gray-700 p-3 rounded-lg shadow-lg grid grid-cols-5 gap-2 z-10 border border-gray-600 mb-2">
              {stickers.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => handleSendSticker(sticker)}
                  className="p-1 text-2xl hover:bg-gray-600 rounded-md transition duration-200"
                >
                  {sticker}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStickers(!showStickers)}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              disabled={!user}
            >
              😀
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!user}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!user}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
