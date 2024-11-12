import React, { useState, useEffect } from 'react';
import './App.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password validation
  const validatePassword = (password) => {
    return password.length > 7 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  // Email validation
  const validateEmail = (email) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  // Handle user login
  const handleLogin = () => {
    if (!fullName || !email || !batchNumber) {
      setErrorMessage('Please enter your full name, email, and batch number.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email.');
    } else if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain both letters and digits.');
    } else {
      setIsLoggedIn(true);
      setErrorMessage('');
    }
  };

  // Fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users'); // Adjust API endpoint as needed
      const data = await response.json();
      if (data.success) {
        setUsers(data.users || []);
      } else {
        console.error('Error fetching users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  // Add or update user
  const handleUserSubmit = async () => {
    if (editingUser) {
      // Update the user if editing
      await updateUser();
    } else {
      // Add a new user
      await addUser();
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success) {
        // Fetch the updated users list after adding a new user
        fetchUsers();
        setNewUser({ name: '', role: '' });
      } else {
        console.error('Error adding user:', data.message);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success) {
        // Fetch the updated users list after updating a user
        fetchUsers();
        setEditingUser(null);
        setNewUser({ name: '', role: '' });
      } else {
        console.error('Error updating user:', data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        // Fetch the updated users list after deleting a user
        fetchUsers();
      } else {
        console.error('Error deleting user:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Batch Number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button onClick={handleUserSubmit}>
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </div>

      <h3>User List</h3>
      <table className="userlist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => { setEditingUser(user); setNewUser(user); }} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
