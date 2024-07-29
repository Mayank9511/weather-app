import React from "react";
import { useWeather } from "../context/WeatherContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const getWeatherIcon = (description) => {
  switch (description.toLowerCase()) {
    case "sunny":
      return "☀️"; 
    case "rainy":
      return "🌧️"; 
    case "mist":
      return "🌫️"; 
    default:
      return "⛅"; 
  }
};

export const CurrentWeather = () => {
  const { weatherData } = useWeather();

  if (!weatherData) {
    return (
      <div
        style={{
          padding: "20px",
        }}
      >
        <h5>Select a city to see the weather</h5>
      </div>
    );
  }

  const labels = weatherData.weather.map((day) => {
    const date = new Date(day.day);
    return date.getDate(); 
  });

  const temperatures = weatherData.weather.map((day) => day.temperature);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        fill: true,  
        backgroundColor: "rgba(75, 192, 192, 0.2)",  
        borderColor: "rgba(75, 192, 192, 1)",  
        pointBackgroundColor: "rgba(75, 192, 192, 1)",  
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Month",
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2>{weatherData.name}</h2>
      <Line
        style={{
          margin: "20px",
          maxHeight: "50vh",
          maxWidth: "70vw",
        }}
        data={data}
        options={options}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {weatherData.weather.map((day, index) => {
          const date = new Date(day.day);

          const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          const dayName = dayNames[date.getDay()];

          return (
            <div style={{
                padding: "10px",
                margin: "10px",
                alignItems: "center",
                justifyContent: "center"
            }} key={index}>
              <div>
                {dayName} {getWeatherIcon(day.description)}
              </div>
              <div>{day.temperature}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
