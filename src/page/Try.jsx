// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// // Ensure __app_id, __firebase_config, and __initial_auth_token are defined in the environment.
// // These are provided by the Canvas environment for Firebase integration.
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// // Initialize Firebase app if config is available
// let app;
// let auth;
// let db;

// try {
//   if (Object.keys(firebaseConfig).length > 0) {
//     app = initializeApp(firebaseConfig);
//     auth = getAuth(app);
//     db = getFirestore(app);
//   } else {
//     console.error("Firebase configuration is missing. Chat and Donation features requiring persistence will not work.");
//   }
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
// }

// // Define a list of emojis to use as stickers
// const stickers = [
//   '❤️', '😂', '👍', '🔥', '🎉', '😊', '🤩', '👋', '🌟', '🥳',
//   '🚀', '💯', '👏', '🎵', '💡', '🌈', '👑', '💪', '🌸', '✨'
// ];

// const Sidebar = ({ setActiveView }) => (
//   <div className="w-64 bg-gray-950 text-gray-300 p-4 flex flex-col rounded-l-lg shadow-lg">
//     <div className="flex items-center mb-8">
//       <div className="text-purple-400 text-3xl mr-3">🚀</div>
//       <h1 className="text-xl font-bold text-white">Video Demo App</h1>
//     </div>

//     <nav className="flex-1">
//       <ul>
//         <li className="mb-2">
//           <button
//             onClick={() => setActiveView('overview')}
//             className="w-full text-left p-3 rounded-md hover:bg-gray-800 transition duration-200 flex items-center"
//           >
//             <span className="mr-3 text-lg">📊</span> Overview
//           </button>
//         </li>
//         <li className="mb-2">
//           <button
//             onClick={() => setActiveView('chatMessaging')}
//             className="w-full text-left p-3 rounded-md hover:bg-gray-800 transition duration-200 flex items-center"
//           >
//             <span className="mr-3 text-lg">💬</span> Chat Messaging
//           </button>
//         </li>
//         <li className="mb-2">
//           <button
//             onClick={() => setActiveView('chatModeration')}
//             className="w-full text-left p-3 rounded-md hover:bg-gray-800 transition duration-200 flex items-center"
//           >
//             <span className="mr-3 text-lg">🛡️</span> Chat Moderation
//           </button>
//         </li>
//         <li className="mb-2">
//           <button
//             onClick={() => setActiveView('activityFeeds')}
//             className="w-full text-left p-3 rounded-md hover:bg-gray-800 transition duration-200 flex items-center"
//           >
//             <span className="mr-3 text-lg">🔔</span> Activity Feeds
//           </button>
//         </li>
//         <li className="mb-2">
//           <button
//             onClick={() => setActiveView('videoAudio')}
//             className="w-full text-left p-3 rounded-md bg-purple-700 text-white hover:bg-purple-600 transition duration-200 flex items-center"
//           >
//             <span className="mr-3 text-lg">🎥</span> Video & Audio
//           </button>
//         </li>
//         <li className="ml-6">
//           <button
//             onClick={() => setActiveView('overview')}
//             className="w-full text-left p-2 rounded-md hover:bg-gray-800 transition duration-200 text-sm"
//           >
//             Overview
//           </button>
//         </li>
//         <li className="ml-6">
//           <button
//             onClick={() => setActiveView('callTypes')}
//             className="w-full text-left p-2 rounded-md hover:bg-gray-800 transition duration-200 text-sm"
//           >
//             Call Types
//           </button>
//         </li>
//       </ul>
//     </nav>

//     <div className="mt-auto">
//       <h3 className="text-lg font-semibold text-white mb-2">App Access Keys</h3>
//       <p className="text-sm text-gray-500">Manage your API keys here.</p>
//     </div>
//   </div>
// );

// const ChatSection = ({ user, username, setUsername, chatMessage, setChatMessage, handleSendMessage, handleSendSticker, showStickers, setShowStickers, chatMessages, chatMessagesEndRef }) => (
//   <div className="w-full lg:w-1/3 bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col h-[calc(100vh-2rem)] lg:h-auto">
//     <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">Live Chat</h2>

//     {user && (
//       <div className="mb-4">
//         <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Your Username:</label>
//         <input
//           type="text"
//           id="username"
//           placeholder={`Enter username (e.g., User-${user.uid.substring(0, 5)})`}
//           className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <p className="text-xs text-gray-500 mt-1">Your ID: <span className="font-mono text-xs">{user.uid}</span></p>
//       </div>
//     )}

//     {/* Chat Messages Display */}
//     <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-y-auto mb-4 border border-gray-700">
//       {chatMessages.length === 0 ? (
//         <p className="text-gray-400 text-center italic mt-4">No messages yet. Say hello!</p>
//       ) : (
//         chatMessages.map((msg, index) => (
//           <div key={msg.id} className="mb-2 text-sm">
//             <span className={`font-semibold ${msg.userId === user?.uid ? 'text-green-400' : 'text-blue-300'}`}>
//               {msg.username}:
//             </span>{' '}
//             <span className="text-gray-200">{msg.messageText}</span>
//           </div>
//         ))
//       )}
//       <div ref={chatMessagesEndRef} /> {/* For auto-scrolling */}
//     </div>

//     {/* Chat Input and Sticker Picker */}
//     <div className="relative"> {/* Container for input and sticker picker */}
//       {/* Sticker Picker */}
//       {showStickers && (
//         <div className="absolute bottom-full left-0 w-full bg-gray-700 p-3 rounded-lg shadow-lg grid grid-cols-5 gap-2 z-10 border border-gray-600 mb-2">
//           {stickers.map((sticker, index) => (
//             <button
//               key={index}
//               onClick={() => handleSendSticker(sticker)}
//               className="p-1 text-2xl hover:bg-gray-600 rounded-md transition duration-200"
//             >
//               {sticker}
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => setShowStickers(!showStickers)}
//           className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//           disabled={!user}
//         >
//           😀 {/* Emoji icon for stickers */}
//         </button>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={chatMessage}
//           onChange={(e) => setChatMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//           disabled={!user}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={!user}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const MainContent = ({ view, user, username, setUsername, chatMessage, setChatMessage, handleSendMessage, handleSendSticker, showStickers, setShowStickers, chatMessages, chatMessagesEndRef, donationAmount, setDonationAmount, showDonationSuccess, setShowDonationSuccess, handleDonate }) => {

//   const videoRef = useRef(null);
//   const [cameraStatus, setCameraStatus] = useState('idle'); // idle, granted, denied, error

//   useEffect(() => {
//     if (view === 'overview' || view === 'videoAudio') {
//       const startCamera = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             setCameraStatus('granted');
//           }
//         } catch (err) {
//           console.error("Error accessing camera: ", err);
//           setCameraStatus('denied');
//           // Provide user feedback without using alert()
//           // For example, display a message in the video area
//         }
//       };
//       startCamera();

//       // Clean up stream on unmount or view change
//       return () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           const tracks = videoRef.current.srcObject.getTracks();
//           tracks.forEach(track => track.stop());
//           videoRef.current.srcObject = null;
//         }
//       };
//     }
//   }, [view]);


//   return (
//     <div className="flex-1 bg-gray-800 p-6 rounded-r-lg shadow-xl flex flex-col">
//       {view === 'overview' || view === 'videoAudio' ? (
//         <>
//           <h2 className="text-3xl font-bold mb-6 text-white">Video & Audio Overview</h2>
//           <p className="text-gray-300 mb-6">
//             Easily create a new call, audio room, or livestream quickly using our server-side Video and Audio SDKs.
//           </p>

//           <div className="flex gap-4 mb-8">
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">📞</span> Create Call
//             </button>
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">🎤</span> Create Audio Room
//             </button>
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">🔴</span> Create Livestream
//             </button>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-4 flex-1">
//             {/* Live Stream / Camera Feed Area */}
//             <div className="flex-1 bg-gray-900 rounded-lg shadow-md overflow-hidden aspect-video relative">
//               {cameraStatus === 'granted' ? (
//                 <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg"></video>
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400">
//                   {cameraStatus === 'denied' ? (
//                     <p className="p-4 text-center">
//                       Camera access denied. Please allow camera permissions in your browser settings to see the video feed.
//                     </p>
//                   ) : cameraStatus === 'error' ? (
//                     <p className="p-4 text-center">
//                       Error accessing camera. Please check if your camera is connected and not in use by another application.
//                     </p>
//                   ) : (
//                     <p className="p-4 text-center">
//                       Loading camera feed... Please allow camera access if prompted.
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Donation Section - Combined with Overview */}
//             <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col">
//                 <h3 className="text-xl font-semibold mb-3 text-purple-300">Support the Stream!</h3>
//                 <div className="flex items-center gap-2 mb-4">
//                 <input
//                     type="number"
//                     min="1"
//                     step="0.01"
//                     placeholder="Donation amount (e.g., 5.00)"
//                     className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     value={donationAmount}
//                     onChange={(e) => setDonationAmount(e.target.value)}
//                 />
//                 <button
//                     onClick={handleDonate}
//                     className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                     Donate
//                 </button>
//                 </div>
//                 {showDonationSuccess && (
//                 <p className="mt-1 text-green-400 text-sm animate-fade-in">Thank you for your generous donation!</p>
//                 )}
//             </div>
//           </div>
//         </>
//       ) : view === 'chatMessaging' ? (
//         <ChatSection
//           user={user}
//           username={username}
//           setUsername={setUsername}
//           chatMessage={chatMessage}
//           setChatMessage={setChatMessage}
//           handleSendMessage={handleSendMessage}
//           handleSendSticker={handleSendSticker}
//           showStickers={showStickers}
//           setShowStickers={setShowStickers}
//           chatMessages={chatMessages}
//           chatMessagesEndRef={chatMessagesEndRef}
//         />
//       ) : view === 'chatModeration' ? (
//         <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
//           <p>Chat Moderation features will go here.</p>
//         </div>
//       ) : view === 'activityFeeds' ? (
//         <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
//           <p>Activity Feeds content will go here.</p>
//         </div>
//       ) : view === 'callTypes' ? (
//         <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-xl">
//           <h3 className="text-2xl font-bold mb-4 text-white">Call Types</h3>
//           <p className="mb-4">Here you can manage different types of calls and streams.</p>
//           <div className="flex gap-4">
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">📞</span> Manage Calls
//             </button>
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">🎧</span> Manage Audio Rooms
//             </button>
//             <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//               <span className="mr-2">🔴</span> Manage Livestreams
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
//           <p>Select an option from the sidebar.</p>
//         </div>
//       )}
//     </div>
//   );
// };


// const App = () => {
//   const [activeView, setActiveView] = useState('overview'); // Default view
//   const [user, setUser] = useState(null);
//   const [username, setUsername] = useState('');
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [donationAmount, setDonationAmount] = useState('');
//   const [showDonationSuccess, setShowDonationSuccess] = useState(false);
//   const [isAuthReady, setIsAuthReady] = useState(false);
//   const [showStickers, setShowStickers] = useState(false);
//   const chatMessagesEndRef = useRef(null);

//   // --- Firebase Authentication Setup ---
//   useEffect(() => {
//     if (!auth) {
//       setIsAuthReady(true);
//       return;
//     }

//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         try {
//           if (initialAuthToken) {
//             await signInWithCustomToken(auth, initialAuthToken);
//           } else {
//             await signInAnonymously(auth);
//           }
//         } catch (error) {
//           console.error("Error signing in:", error);
//         }
//       }
//       setIsAuthReady(true);
//     });

//     return () => unsubscribe();
//   }, [auth, initialAuthToken]);

//   // --- Chat Message Fetching (Real-time with Firestore) ---
//   useEffect(() => {
//     if (!db || !isAuthReady || !user) {
//       return;
//     }

//     const chatCollectionRef = collection(db, `artifacts/${appId}/public/data/chatMessages`);
//     const q = query(chatCollectionRef, orderBy('timestamp'));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const messages = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setChatMessages(messages);
//     }, (error) => {
//       console.error("Error fetching chat messages:", error);
//     });

//     return () => unsubscribe();
//   }, [db, isAuthReady, user]);

//   // --- Scroll to bottom of chat messages ---
//   useEffect(() => {
//     if (chatMessagesEndRef.current) {
//       chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chatMessages]);

//   // --- Handle Sending Chat Message ---
//   const handleSendMessage = async () => {
//     if (!db || !user || chatMessage.trim() === '') {
//       console.warn("Cannot send message: Firebase not ready, no user, or empty message.");
//       return;
//     }

//     try {
//       const chatCollectionRef = collection(db, `artifacts/${appId}/public/data/chatMessages`);
//       await addDoc(chatCollectionRef, {
//         userId: user.uid,
//         username: username || `User-${user.uid.substring(0, 5)}`,
//         messageText: chatMessage,
//         timestamp: serverTimestamp()
//       });
//       setChatMessage('');
//       setShowStickers(false);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // --- Handle sending a sticker ---
//   const handleSendSticker = (stickerEmoji) => {
//     setChatMessage((prevMessage) => prevMessage + stickerEmoji);
//   };

//   // --- Handle Donation ---
//   const handleDonate = () => {
//     const amount = parseFloat(donationAmount);
//     if (isNaN(amount) || amount <= 0) {
//       return;
//     }

//     setShowDonationSuccess(true);
//     setDonationAmount('');

//     setTimeout(() => {
//       setShowDonationSuccess(false);
//     }, 3000);

//     console.log(`Simulating donation of ${amount} to the streamer.`);
//   };

//   if (!isAuthReady) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
//         <p className="ml-4">Loading application...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex p-4">
//       <Sidebar setActiveView={setActiveView} />
//       <MainContent
//         view={activeView}
//         user={user}
//         username={username}
//         setUsername={setUsername}
//         chatMessage={chatMessage}
//         setChatMessage={setChatMessage}
//         handleSendMessage={handleSendMessage}
//         handleSendSticker={handleSendSticker}
//         showStickers={showStickers}
//         setShowStickers={setShowStickers}
//         chatMessages={chatMessages}
//         chatMessagesEndRef={chatMessagesEndRef}
//         donationAmount={donationAmount}
//         setDonationAmount={setDonationAmount}
//         showDonationSuccess={showDonationSuccess}
//         setShowDonationSuccess={setShowDonationSuccess}
//         handleDonate={handleDonate}
//       />
//     </div>
//   );
// };

// export default App;
