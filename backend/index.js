require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const express = require('express');
const getDB = require('./lib/db');

const app = express();
app.use(express.json());

// Add your authentication routes here!
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Example route using native MongoDB driver (for legacy code)
app.get('/api/products', async (req, res) => {
  try {
    const db = await getDB(); // native connection
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Connect to MongoDB using Mongoose and start Express server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Mongoose connected');
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 API listening on ${port}`));
})
.catch(err => {
  console.error('❌ Mongoose connection error:', err);
  process.exit(1);
});
