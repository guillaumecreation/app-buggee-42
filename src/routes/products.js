const express = require('express');

const pool = require('../config/db');
const verifyToken = require('../middleware/auth');
const { validateProduct } = require('../utils/validators');

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, price, stock, created_at FROM products ORDER BY id DESC');
    return res.json({ count: rows.length, products: rows });
  } catch (err) {
    console.error('Erreur GET products:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/products/:id
router.get('/:id', verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, name, price, stock, created_at FROM products WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error('Erreur GET product:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/products
router.post('/', verifyToken, async (req, res) => {
  const errors = validateProduct(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { name, price, stock } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
      [name, price, stock]
    );
    return res.status(201).json({ id: result.insertId, name, price, stock });
  } catch (err) {
    console.error('Erreur POST product:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return res.json({ success: true, message: `Produit ${id} supprime` });
  } catch (err) {
    console.error('Erreur DELETE product:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
