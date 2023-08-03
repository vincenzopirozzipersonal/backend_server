const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password
  });

  try {
    await user.save();
    res.json({ message: 'User registered successfully' });  // use res.json() here
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });  // and also here
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Here, you should hash the input password and compare with the hashed password in your DB
  // This will depend on how you hashed the password when storing the user
  // Let's assume you're using bcrypt for password hashing
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // If we made it this far, the login is valid
  // Normally here you would issue a token for the user to use for authentication
  // For simplicity, we'll just return a success message
  res.json({ message: 'Logged in successfully' });
});


module.exports = router;
