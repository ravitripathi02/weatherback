const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// OpenWeather API Key - Replace 'YOUR_API_KEY' with your actual API key
const apiKey = "eec90fb4a0b54f4444192b7f582ed1e8";
const weatherAPIBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
const baseUrl="https://weatherback-seven.vercel.app/"
// Weather endpoint
app.post('/', async (req, res) => {
  try {
    const { location } = req.body;
    const weatherData = await getWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

async function getWeatherData(location) {
  console.log(location);
  const response = await axios.get(weatherAPIBaseUrl, {
    params: {
      q: location,
      appid: apiKey,
      units: "metric", // Use 'imperial' for Fahrenheit
    },
  });
  const weatherData = {
    location: response.data.name,
    country: response.data.sys.country,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    description: response.data.weather[0].description,
    speed: response.data.wind.speed,
    icon: response.data.weather[0].icon,
  };
  console.log(weatherData);
  return weatherData;
}

app.listen(port, () => {
  console.log(`Weather app backend listening at http://localhost:${port}`);
});
