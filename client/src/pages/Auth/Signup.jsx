// src/components/Signup.js
import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../components/Store/AuthUser';
import BackBar from '../../components/BackBar/BackBar';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, email, password });
  };

  return (
    <div>
      <BackBar />
      <div className="form-container">
        <form className="form-content" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
          <p>
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
