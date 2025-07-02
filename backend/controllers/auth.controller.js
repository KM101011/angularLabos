const express = require('express');
const router = express.Router();
const AuthService = require("../services/auth.service");

const conn = require("../db.config");

router.post('/register', async (req, res) => {

  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log(username, password, email, name);
  try {
     const [result] = await AuthService.register(username, password, email, name); 

    //const [result] = await (await conn).execute('INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)', [username, password, email, name]);

    console.log(result);
    if (result.insertId <= 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    return res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
})

router.post('/login', async (req, res) => { 
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [users] = await AuthService.login(username); 
    //const [users] = await (await conn).execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ 
      message: 'Login successful', 
      userId: user.id, 
      username: user.username,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Login failed' });
  }
})
module.exports = router;