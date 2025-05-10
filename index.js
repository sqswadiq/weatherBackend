require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weather');
 
const app = express(); 


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/weather', weatherRoutes);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
