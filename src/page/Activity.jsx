import React from 'react';
import '../css/activity.css';

const activityData = [
  { id: 1, time: '2 mins ago', text: 'Collins started a livestream.' },
  { id: 2, time: '5 mins ago', text: 'Ada joined the "DevTalk" audio room.' },
  { id: 3, time: '8 mins ago', text: 'Daniel sent a message in "DesignTips" chat.' },
  { id: 4, time: '10 mins ago', text: 'Best ✌️ joined the livestream "CodeLive".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
];

export default function Activity() {
  return (
    <div className="activity-feed-container">
      <h2 className="feed-header">📢 Recent Activity</h2>
      <ul className="feed-list">
        {activityData.map(activity => (
          <li key={activity.id} className="feed-item">
            <div className="feed-details">
              <p className="feed-text">{activity.text}</p>
              <span className="feed-time">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
