import React from 'react';
import '../css/activity.css'; // Make sure you have this CSS file

const activityData = [
  { id: 1, time: '2 mins ago', text: 'Collins started a livestream.' },
  { id: 2, time: '5 mins ago', text: 'Ada joined the "DevTalk" audio room.' },
  { id: 3, time: '8 mins ago', text: 'Daniel sent a message in "DesignTips" chat.' },
  { id: 4, time: '10 mins ago', text: 'Best ✌️ joined the livestream "CodeLive".' },
  { id: 5, time: '12 mins ago', text: 'Idara scheduled a stream: "Next Big Thing".' },
];

export default function Activity() {
  return (
    <div className="activity-feed-container">
      <h2 className="feed-header">📢 Activity Feed</h2>
      <ul className="feed-list">
        {activityData.map(activity => (
          <li key={activity.id} className="feed-item">
            <span className="feed-text">{activity.text}</span>
            <span className="feed-time">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
