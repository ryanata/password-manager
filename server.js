// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const mongoose = require('mongoose');
const User = require('./model/user');

// ENV
require('dotenv').config();

// Database
const url = process.env.MONGODB_URI; 
mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
    // Change database for mongoose to Pwdly
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

// APIs
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// Port
const PORT = process.env.PORT || 5000;  

// App intialization
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Post requests
app.use('/api', registerRouter);
app.use('/api', loginRouter);

// Heroku deployment
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Listen to port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));