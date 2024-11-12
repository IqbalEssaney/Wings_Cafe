// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/product-management">Product Management</Link>
      <Link to="/user-management">User Management</Link>
    </nav>
  );
}

export default Navbar;
