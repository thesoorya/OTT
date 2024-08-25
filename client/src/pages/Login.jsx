import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search); 
    const emailFromSignup = params.get('email');
    if (emailFromSignup) {
      setEmail(emailFromSignup);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <p>
            New User? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
