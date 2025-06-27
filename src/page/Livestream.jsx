import React, { useRef, useState, useEffect } from 'react';
import '../css/livestream.css';
import Live from '../component/Live';
import LiveChat from '../component/LiveChat';

export default function Livestream() {

  return (
        <>
      <div className='Content'>
          <div className="camara-section">
            <Live/>
          </div>
          <div className="chat-section">
            <LiveChat/>
          </div>
      </div>
    </>
  )
}
