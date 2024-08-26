// src/components/Login.js
import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../components/Store/AuthUser';
import BackBar from '../../components/BackBar/BackBar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
      <BackBar />
      <div className="form-container">
        <form className="form-content" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit" className="submit-btn">Login</button>
          <p>
            New user? <Link to="/register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
