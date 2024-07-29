import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import data from "../resources/weatherReport.json";
import cities from "../resources/cities.json";
import { useWeather } from "../context/WeatherContext";
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const {setWeatherData} = useWeather();
  const [showHistory, setShowHistory] = useState(false);
  const [city, setCity] = useState("New York");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const updateSearchHistory = (newCity) => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(newCity)) {
      console.log("new city: ", newCity);
      history.push(newCity);
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  };
  
  const handleHistory = () => {
    navigate('/history');
  }

  /*---- To be discussed ---- */
  // const handleSearch = () => { }

  const fetchWeatherData = async (selectedCity) => {
    try {
      const cityWeather = data.cities.find(
        (cityData) => cityData.name === selectedCity
      );

      console.log("data: ", cityWeather);
      if (cityWeather) {
        setWeatherData(cityWeather);
        setError(null);
        updateSearchHistory(selectedCity);
      } else {
        setError("City not found");
        setWeatherData(null);
      }
    } catch (err) {
      setError("Error fetching data");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div>
      <div
        style={{
          padding: "10px 30px",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Autocomplete
          style={{
            width: "83%"
          }}
          id="city-autocomplete"
          freeSolo
          options={cities.map((option) => option.name)} 
          value={city}
          onChange={(event, newValue) => {
            setCity(newValue);
            fetchWeatherData(newValue); 
          }}
          renderInput={(params) => <TextField {...params} label="Enter City" />}
        />
        {/* <button
          style={{
            width: "10%",
            borderRadius: "5px",
            border: "2px solid lightblue",
            backgroundColor: "white",
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          {" "}
          Search
        </button> */}
        <button
          style={{
            width: "15%",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "purple",
            cursor: "pointer",
          }}
          onClick={handleHistory}
        >
          {" "}
          History{" "}
        </button>
      </div>
    </div>
  );
};
