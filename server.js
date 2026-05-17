require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const productsRoutes = require('./src/routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API app-buggee-42 - Examen BC04 4.2 Maintenance corrective',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      products: ['GET /api/products', 'GET /api/products/:id', 'POST /api/products', 'DELETE /api/products/:id']
    },
    compte_test: 'test@test.com / password123'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route inconnue' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
});
