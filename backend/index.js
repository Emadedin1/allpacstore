// Load env vars
require('dotenv').config();

const express = require('express');
const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('AllpacStore Backend Running');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);
});