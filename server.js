const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config()

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Init Middleware
app.use(express.json());

// define Routes
app.use('/api/resthomes', require('./routes/api/resthomes'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/residents', require('./routes/api/residents'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`));
