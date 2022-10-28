// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const { headerMiddleware } = require('./middleware/headerMiddleware');
const PORT = process.env.PORT || 5000;  

connectDB();

// Middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(headerMiddleware);

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/verification', require('./routes/verificationRoutes'));

// Heroku deployment
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Error handling
app.use(errorHandler);

// Listen to port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));