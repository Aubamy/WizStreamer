import React from 'react';
import { FaVideo, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import Navigation from '../component/Navigation';
import '../css/overview.css';

const Overview = () => {
  const upcomingStreams = [
    { title: 'DevOps Bootcamp', date: '2025-06-30', time: '3:00 PM' },
    { title: 'UI/UX Design Tips', date: '2025-07-01', time: '12:00 PM' },
  ];

   const{
         createcallClick,
         audioroomClick,
         livestreamClick,
         chartClick,
         dashboardClick
    
      } = Navigation();

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Livestream Overview</h1>
        <button className="go-live-btn"onClick={livestreamClick} >+ Go Live</button>
      </div>

      <div className="status-cards">
        <div className="status-card live">
          <FaVideo size={28} />
          <div>
            <h3>Live Now</h3>
            <p>1 stream</p>
          </div>
        </div>
        <div className="status-card scheduled">
          <FaCalendarAlt size={28} />
          <div>
            <h3>Scheduled</h3>
            <p>{upcomingStreams.length} upcoming</p>
          </div>
        </div>
        <div className="status-card past">
          <FaHistory size={28} />
          <div>
            <h3>Past Streams</h3>
            <p>12 completed</p>
          </div>
        </div>
      </div>

      <div className="upcoming-section">
        <h2>Upcoming Streams</h2>
        <ul>
          {upcomingStreams.map((stream, idx) => (
            <li key={idx}>
              <strong>{stream.title}</strong>
              <span>{stream.date} • {stream.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
