import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'; // Import social media icons
import '../css/entrypage.css'; // Import the custom CSS for the entry page
import stream from '../assets/stream.jpg'; // Import the livestream image

export default function EntryPage() { // Define and export the EntryPage component
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  const [isRegistering, setIsRegistering] = useState(false); // Track if user is in registration or login mode

  const [formData, setFormData] = useState({ // State for form input fields
    username: '',      // Registration: username field
    email: '',         // Registration: email field
    password: '',      // Shared between login and register
    identifier: '',    // Login: either username or email
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update specific form field by name
  };

  // Handle form submission (both register and login)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    if (isRegistering) { // If in register mode
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('wiz_user', JSON.stringify(user)); // Save user data to localStorage
      alert(`Registered as ${formData.username}`); // Show registration alert
      navigate('/dashboard'); // Navigate to dashboard after registering
    } else { // If in login mode
      const savedUser = JSON.parse(localStorage.getItem('wiz_user')); // Get stored user
      if (
        savedUser &&
        (formData.identifier === savedUser.username || formData.identifier === savedUser.email) &&
        formData.password === savedUser.password
      ) {
        alert(`Welcome back, ${savedUser.username}`); // Show login success alert
        navigate('/dashboard'); // Navigate to dashboard after successful login
      } else {
        alert('Invalid credentials. Try again.'); // Login failed alert
      }
    }
  };

  return (
    <div className="entry-container"> {/* Root container */}
      <div className="entry-image"> {/* Left image section */}
        <img src={stream} alt="Livestream" /> {/* Show livestream image */}
        <div className="entry-caption">Stream your world in real-time 🎥</div> {/* Caption under image */}
      </div>

      <div className="entry-form-section"> {/* Right form section */}
        <div className="entry-card"> {/* Card for form content */}
          <h2>{isRegistering ? 'Create an Account' : 'Welcome to Wiz Stream'}</h2> {/* Title depends on mode */}
          <p className="entry-subtext">
            {isRegistering
              ? 'Register to start your stream'
              : 'Sign in to join or start your stream'}
          </p>

          {/* Form input fields and submit */}
          <form onSubmit={handleSubmit} className="entry-form">
            {isRegistering ? ( // Show registration fields
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </>
            ) : ( // Show login fields
              <>
                <input
                  type="text"
                  name="identifier"
                  placeholder="Username or Email"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <button type="submit" className="entry-button">
              {isRegistering ? 'Register' : 'Sign In'} {/* Submit button label changes */}
            </button>
          </form>

          {/* Social media login section (non-functional for now) */}
          <div className="social-login">
            <p>or continue with</p>
            <div className="social-icons">
              <span className="icon google"><FaGoogle /></span>
              <span className="icon facebook"><FaFacebookF /></span>
              <span className="icon twitter"><FaTwitter /></span>
            </div>
          </div>

          {/* Toggle between register and sign in */}
          <div className="toggle-form">
            {isRegistering ? (
              <p>
                Already have an account?{' '}
                <span onClick={() => setIsRegistering(false)}>Sign in</span> {/* Switch to login */}
              </p>
            ) : (
              <p>
                Don’t have an account?{' '}
                <span onClick={() => setIsRegistering(true)}>Register here</span> {/* Switch to register */}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
