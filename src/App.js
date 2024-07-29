import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { HistoryPage } from './components/HistoryPage'; 

function App() {
  return (
    <WeatherProvider>
      <Router>
        <div className="App">
          <div>
            <h3
              style={{
                color: "white",
                backgroundColor: "grey",
                textAlign: "center",
                height: "3rem",
                padding: "10px",
                marginBottom: "10px",
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Weather
            </h3>
          </div>

          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>

          <CurrentWeather />
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;
