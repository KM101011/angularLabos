import { Router } from "express";

const router = Router();

//nedovrs
router.post('/register', async (req, res) => {
  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length > 0) {
      conn.release();
      return res.status(409).json({ message: 'Username already exists' });
    }

    const [result] = await conn.query('INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)', [username, password, email, name]);
    conn.release();
    return res.status(201).json({ message: 'User registered', userId: result.insertId });

  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      conn.release();
      return res.status(401).json({ message: 'Invalid username' });
    }

    const user = users[0];
    if (user.password !== password) {
      conn.release();
      return res.status(401).json({ message: 'Invalid password' });
    }

    conn.release();
    return res.status(200).json({ 
      message: 'Login successful', 
      userId: user.id, 
      username: user.username,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
})
