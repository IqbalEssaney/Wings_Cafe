import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [barColors, setBarColors] = useState([]);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Generate unique colors for the bar chart
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  useEffect(() => {
    const uniqueColors = Array.from({ length: products.length }, getRandomColor);
    setBarColors(uniqueColors);
  }, [products]);

  // Prepare graph data
  const graphData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Number of Products Added',
        data: products.map((_, index) => index + 1), // For demo purposes, use index + 1 as count
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Products' },
        ticks: { font: { size: 16 } },
      },
      y: {
        title: { display: true, text: 'Count' },
        ticks: { font: { size: 16 }, beginAtZero: true },
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  // Image carousel to display product images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <div className="chart-container">
          <Bar data={graphData} options={options} />
        </div>
        <div className="image-container">
          {products.length > 0 && products[currentImageIndex].image && (
            <img src={products[currentImageIndex].image} alt="Product" className="rotating-image" />
          )}
        </div>
      </div>

      <h2>Welcome to Wings Cafe Stock Inventory</h2>
    </div>
  );
}

export default Dashboard;
