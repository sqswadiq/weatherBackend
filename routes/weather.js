// routes/weather.js
const express = require('express');
const axios = require('axios');
const Weather = require('../models/WeatherModel');
const router = express.Router();

router.get('/current', async (req, res) => {
  const { city } = req.query;
  console.log("this is city",city);
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`);
    const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`);
  
console.log("response",response);

    console.log("response2",response2);
    
    const { temp } = response.data.main;
    const { description, icon } = response.data.weather[0];

    const weatherData = new Weather({ location: city, temperature: temp, description, icon, date: new Date() });
    await weatherData.save();

    res.json(weatherData);
  } catch (err) {
    res.status(500).send('Error fetching weather data');
  }
});

router.get('/history', async (req, res) => {
  const { from, to, location } = req.query;
  try {
    const data = await Weather.find({
      location,
      date: { $gte: new Date(from), $lte: new Date(to) }
    });
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching historical data');
  }
});

module.exports = router;
