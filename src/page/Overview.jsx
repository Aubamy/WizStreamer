import React from 'react'; // Import React library
import { FaVideo, FaCalendarAlt, FaHistory, FaArrowLeft, FaPlusCircle } from 'react-icons/fa'; // Import FontAwesome icons
import Navigation from '../component/Navigation'; // Import custom navigation logic (hooks or object)
import '../css/overview.css'; // Import overview page styling

// Main component for Overview page
export default function Overview() {

  // Array of upcoming livestream events
  const upcomingStreams = [
    { title: 'DevOps Bootcamp', date: '2025-06-30', time: '3:00 PM' },
    { title: 'UI/UX Design Tips', date: '2025-07-01', time: '12:00 PM' },
    { title: 'UI/UX Design Tips', date: '2025-07-01', time: '12:00 PM' },
    { title: 'UI/UX Design Tips', date: '2025-07-01', time: '12:00 PM' },
    { title: 'UI/UX Design Tips', date: '2025-07-01', time: '12:00 PM' },
  ];

  // Destructure navigation functions from Navigation component
  const {
    createcallClick,   // Navigate to call creation page
    audioroomClick,    // Navigate to audio room
    livestreamClick,   // Navigate to livestream page
    chartClick,        // Navigate to chat page
    dashboardClick,    // Navigate back to dashboard
  } = Navigation();

  return (
    <div className="overview-container"> {/* Root container */}

      {/* Top bar with back and "Go Live" buttons */}
      <div className="overview-topbar">
        <button className="back-btn" onClick={dashboardClick}> {/* Back button */}
          <FaArrowLeft className="btn-icon" /> {/* Back icon */}
        </button>

        <button className="go-live-btn" onClick={livestreamClick}> {/* Go Live button */}
          <FaPlusCircle className="btn-icon" /> {/* Plus icon */}
          <span>Go Live</span> {/* Text next to icon */}
        </button>
      </div>

      {/* Header title for the page */}
      <div className="overview-header">
        <h1>🎥 Livestream Overview</h1>
      </div>

      {/* Three main status cards section */}
      <section className="status-cards">
        {/* Live Now card */}
        <div className="status-card live">
          <div className="icon-box">
            <FaVideo /> {/* Video camera icon */}
          </div>
          <div>
            <h3>Live Now</h3>
            <p>1 stream</p> {/* You can make this dynamic later */}
          </div>
        </div>

        {/* Scheduled streams card */}
        <div className="status-card scheduled">
          <div className="icon-box">
            <FaCalendarAlt /> {/* Calendar icon */}
          </div>
          <div>
            <h3>Scheduled</h3>
            <p>{upcomingStreams.length} upcoming</p> {/* Count from array */}
          </div>
        </div>

        {/* Past streams card */}
        <div className="status-card past">
          <div className="icon-box">
            <FaHistory /> {/* Clock/history icon */}
          </div>
          <div>
            <h3>Past Streams</h3>
            <p>12 completed</p> {/* Static for now */}
          </div>
        </div>
      </section>

      {/* List of upcoming livestream events */}
      <section className="upcoming-section">
        <h2>📅 Upcoming Streams</h2>
        <ul>
          {upcomingStreams.map((stream, idx) => ( // Loop over each stream
            <li key={idx}> {/* Unique key using index */}
              <strong>{stream.title}</strong> {/* Stream title */}
              <span>{stream.date} • {stream.time}</span> {/* Date and time */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
