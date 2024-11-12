import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Login successful!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error logging in');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Account created! Please log in.');
        setIsSignUp(false);
      } else {
        setMessage(data.message || 'Sign-up failed');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setMessage('Error signing up');
    }
  };

  return (
    <div className="container-login">
      <div className="form-container-login">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {message && <p className="login-message">{message}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-login"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-login"
        />
        <button onClick={isSignUp ? handleSignUp : handleLogin} className="button-login">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
        <p className="toggle-link-login" onClick={handleToggle}>
          {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
        </p>
      </div>
    </div>
  );
}

export default Login;
