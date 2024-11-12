import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement'; 
import Login from './Login';
import Footer from './Footer';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]); // Add new product to the state
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard products={products} />} />
            <Route path="/product-management" element={<ProductManagement onAddProduct={addProduct} />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
