import React, { useRef, useState, useEffect } from 'react';
import '../css/login.css'
import stream from '../assets/stream.jpg';
export default function Login(){
    return(
        <>
        
        <div className="livestream-signin-section">
            <div className="image"><img src={stream} alt="" /></div>
        <div className="signin-card">
          <h2>Welcome to GameVerse Stream</h2>
          <p className="signin-subtext">Sign in to join or start your stream</p>
          <form className="signin-form">
            <input type="text" placeholder="Username or Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
          <div className="signin-footer">
            <p>Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </div>
        </>
    )
}