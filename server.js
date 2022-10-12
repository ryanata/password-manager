// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');   

// APIs
const registerRouter = require('./routes/register');

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