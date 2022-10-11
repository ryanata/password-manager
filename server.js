const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');           
const PORT = process.env.PORT || 5000;  
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
app.post('/api/register', (req, res, next) => 
{
  const { email, password } = req.body;
  console.log(post);
  res.status(200).json({
    message: 'User created for ' + email + ' with password ' + password
  });
});

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