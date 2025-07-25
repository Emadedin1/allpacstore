require('dotenv').config();          // load .env first!
const express = require('express');
const getDB   = require('./lib/db');

const app = express();
app.use(express.json());

// example route using native driver
app.get('/api/products', async (req, res) => {
  try {
    const db = await getDB();                       // grab the shared connection
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

getDB()                                             // first call opens the conn
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`🚀 API listening on ${port}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

