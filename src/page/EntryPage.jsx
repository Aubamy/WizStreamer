import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import '../css/entrypage.css';
import stream from '../assets/stream.jpg';

export default function EntryPage() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    identifier: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('wiz_user', JSON.stringify(user));
      alert(`Registered as ${formData.username}`);
      navigate('/dashboard');
    } else {
      const savedUser = JSON.parse(localStorage.getItem('wiz_user'));
      if (
        savedUser &&
        (formData.identifier === savedUser.username || formData.identifier === savedUser.email) &&
        formData.password === savedUser.password
      ) {
        alert(`Welcome back, ${savedUser.username}`);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Try again.');
      }
    }
  };

  return (
    <div className="entry-container">
      <div className="entry-image">
        <img src={stream} alt="Livestream" />
        <div className="caption">Stream your world in real-time 🎥</div>
      </div>
      <div className="entry-form-section">
        <div className="entry-card">
          <h2>{isRegistering ? 'Create an Account' : 'Welcome to Wiz Stream'}</h2>
          <p className="entry-subtext">
            {isRegistering ? 'Register to start your stream' : 'Sign in to join or start your stream'}
          </p>
          <form onSubmit={handleSubmit} className="entry-form">
            {isRegistering ? (
              <>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              </>
            ) : (
              <>
                <input type="text" name="identifier" placeholder="Username or Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              </>
            )}
            <button type="submit">{isRegistering ? 'Register' : 'Sign In'}</button>
          </form>

          <div className="social-login">
            <p>or continue with</p>
            <div className="social-icons">
              <span className="icon google"><FaGoogle /></span>
              <span className="icon facebook"><FaFacebookF /></span>
              <span className="icon twitter"><FaTwitter /></span>
            </div>
          </div>

          <div className="toggle-form">
            {isRegistering ? (
              <p>Already have an account? <span onClick={() => setIsRegistering(false)}>Sign in</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => setIsRegistering(true)}>Register here</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
