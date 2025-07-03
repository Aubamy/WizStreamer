import React, { useState } from 'react';
import '../css/dashboard.css';
import Navigation from '../component/Navigation';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [modalContent, setModalContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const {
    callpageClick,
    audioroomClick,
    livestreamClick,
    chartClick,
    overviewClick,
    loginClick
  } = Navigation();

  return (
    <div className="main-dashboard">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>☰</button>

      <aside className={`main-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>WIZ STREAMEER</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item" onClick={chartClick}>💬 Chat Messaging</li>
            <li className="nav-item">🛡️ Chat Moderation</li>
            <li className="nav-item">📈 Activity Feeds</li>
            <li className="nav-item active">
              🎥 Video & Audio
              <ul className="sub-nav">
                <li className="sub-nav-item" onClick={overviewClick}>📊 Overview</li>
                <Link to={'/viewer'}>
                  <li className="sub-nav-item">📞 Call Types</li>
                </Link>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content" onClick={() => setSidebarOpen(false)}>
        <header className="header">
          <h1>🎧 Video & Audio Overview</h1>
        </header>

        <section className="intro-section">
          <h2>Getting Started with Video & Audio</h2>
          <p>Launch a new video call, audio room, or livestream with ease using our tools.</p>
          <div className="button-group">
            <button className="action-btn" onClick={callpageClick}>🎥 Create Call</button>
            <button className="action-btn" onClick={audioroomClick}>🎙️ Create Audio Room</button>
            <button className="action-btn" onClick={livestreamClick}>📡 Create Livestream</button>
          </div>
        </section>

        <section className="keys-section">
          <h2>🔑 App Access Keys</h2>
          <p>Manage your API access securely from here.</p>
        </section>

        <div className="start">
          <button onClick={loginClick}>Get Started📞</button>
        </div>
      </main>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalContent}</h3>
            <p>This is a placeholder for the <strong>{modalContent}</strong> creation modal.</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
