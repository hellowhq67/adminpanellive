"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Style.module.css';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get('/api/products'); // Replace 'http://localhost:3001/api/products' with your actual API endpoint
      const products = response.data.products;

      const formattedData = products.map((product, index) => ({
        name: product.category,
        uv: product.category.length,
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast.error('Failed to fetch product data');
    }
  };

  const handleClick = (data, index) => {
    setActiveIndex(index);
  };

  const activeItem = data[activeIndex];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cards}>
          <h2>Total Products</h2>
          <p>{data.length}</p>
        </div>
        <div className={styles.cards}>
          <h2>Total Users</h2>
          <p>2</p>
        </div>
        <div className={styles.cards}>
          <h2>Total Orders</h2>
          <p>{data.length}</p>
        </div>
      </div>
      <div style={{ width: '100%', height: '100vh' }}>
        <p>Click each rectangle</p>
        <ResponsiveContainer height={400}>
          <BarChart width={120} height={40} data={data}>
            <Bar dataKey="uv" onClick={handleClick}>
              {data.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? '#82ca9d' : '#8884d8'}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="content">{activeItem ? `Price of "${activeItem.name}": ${activeItem.uv}` : ''}</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
