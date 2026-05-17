const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../config/db');
const { validateRegister } = require('../utils/validators');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { email, password } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email deja utilise' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hash]
    );

    return res.status(201).json({ id: result.insertId, email });
  } catch (err) {
    console.error('Erreur register:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe obligatoires' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const user = rows[0];

    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
      return res.json({ token, user: { id: user.id, email: user.email } });
    }

    return res.status(401).json({ error: 'Identifiants invalides' });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
