import React, { useState } from 'react'; // Import React and useState hook for managing local state
import '../css/dashboard.css'; // Import the dashboard-specific CSS file
import Navigation from '../component/Navigation'; // Import custom navigation logic from Navigation.js
import { Link, useNavigate } from 'react-router-dom'; // Import React Router tools for navigation

export default function Dashboard() { // Define the Dashboard functional component
  const [modalContent, setModalContent] = useState(null); // State to manage modal content
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  const openModal = (content) => setModalContent(content); // Function to open modal with specific content
  const closeModal = () => setModalContent(null); // Function to close the modal
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar on mobile

  const {
    audioroomClick, // Function to handle audio room creation
    livestreamClick, // Function to handle livestream creation
    chartClick, // Function to navigate to chat/messaging
    overviewClick, // Function to go to dashboard overview
    loginClick, // Function to navigate to login/start page
    viewerClick, // Function to go to stream viewer page
    activityClick,
    moderationClick
  } = Navigation(); // Extract navigation functions from custom Navigation hook

  const handleCreateCall = () => { // Function to create a new video call
    const channelId = Math.random().toString(36).substring(2, 10); // Generate a random 8-character call ID
    navigate(`/call/${channelId}`); // Navigate to the call route with that ID
  };

  return ( // Return JSX structure
    <div className="main-dashboard"> {/* Main dashboard container */}

      <button className="mobile-menu-btn" onClick={toggleSidebar}>☰</button> {/* Mobile sidebar toggle button */}

      <aside className={`main-sidebar ${sidebarOpen ? 'open' : ''}`}> {/* Sidebar, with mobile toggle class */}
        <div className="sidebar-header">
          <h2>WIZ STREAMEER</h2> {/* App title/logo */}
        </div>
        <nav className="sidebar-nav"> {/* Navigation links container */}
          <ul>
            <li className="nav-item" onClick={chartClick}>💬 Chat Messaging</li> {/* Navigate to chat */}
            <li className="nav-item" onClick={moderationClick}>🛡️ Chat Moderation</li> {/* Static nav item */}
            <li className="nav-item" onClick={activityClick}>📈 Activity Feeds</li> {/* Static nav item */}
            <li className="nav-item active"> {/* Grouped nav item for video/audio */}
              🎥 Video & Audio
              <ul className="sub-nav"> {/* Sub-navigation list */}
                <li className="sub-nav-item" onClick={overviewClick}>📊 Overview</li> {/* Go to overview */}
                <li className="sub-nav-item" onClick={viewerClick}>📞 Watch Stream</li> {/* Go to livestream viewer */}
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content" onClick={() => setSidebarOpen(false)}> {/* Main content area */}
        <header className="header">
          <h1>🎧 Video & Audio Overview</h1> {/* Page header */}
        </header>

        <section className="intro-section"> {/* Section for starting livestream/audio/call */}
          <h2 style={{textAlign:"left"}}>Getting Started with Video & Audio</h2> {/* Section heading */}
          <p>Launch a new video call, audio room, or livestream with ease using our tools.</p> {/* Description */}
          <div className="button-group"> {/* Container for action buttons */}
            <button className="action-btn" onClick={handleCreateCall}>🎥 Create Call</button> {/* Create video call */}
            <button className="action-btn" onClick={audioroomClick}>🎙️ Create Audio Room</button> {/* Create audio room */}
            <button className="action-btn" onClick={livestreamClick}>📡 Create Livestream</button> {/* Create livestream */}
          </div>
        </section>

        <section className="keys-section"> {/* Placeholder for showing API/app keys */}
          <h2 style={{textAlign:"left"}}>🔑 App Access Keys</h2> {/* Section heading */}
          <p>Manage your API access securely from here.</p> {/* Section description */}
        </section>

        <div className="start"> {/* Get started button section */}
          <button onClick={livestreamClick}>Get Started📞</button> {/* Navigate to login/start page */}
        </div>
      </main>

      {modalContent && ( // Conditional rendering: show modal only if modalContent exists
        <div className="modal-overlay" onClick={closeModal}> {/* Modal background overlay */}
          <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Modal container (clicking inside doesn't close) */}
            <h3>{modalContent}</h3> {/* Modal title */}
            <p>This is a placeholder for the <strong>{modalContent}</strong> creation modal.</p> {/* Modal message */}
            <button className="close-btn" onClick={closeModal}>Close</button> {/* Close modal button */}
          </div>
        </div>
      )}
    </div>
  );
}
