import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  console.log("history: ",history);
  return (
    <div>
      <h2 style={{
        padding: "20px"
      }}>Search History</h2>
      <ul>
        {history.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
      <button
        style={{
          height: "35px", 
          margin: "20px", 
          borderRadius: "5px",
          color: "white",
          backgroundColor: "purple",
          cursor: "pointer",
        }}
        onClick={() => navigate('/')}
      >
        Back to Search
      </button>
    </div>
  );
};
