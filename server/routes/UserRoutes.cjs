const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-_id rid username address phone email password ');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
