const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 8081;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json()); 

let pool;

async function initDb() {
  pool = await mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'ahfg567ATJ77!',  
    database: 'labos_angular'
  });
}
initDb();

app.get('/', (req, res) => {
  res.send('Backend works');
});

//REGISTRACIJA
app.post('/register', async (req, res) => {
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
    console.error('Greška na /register:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

//LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      conn.release();
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = users[0];

    if (user.password !== password) {
      conn.release();
      return res.status(401).json({ message: 'Invalid username or password' });
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
    console.error('Error on /login:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
});

//PROFILE
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const conn = await pool.getConnection();
    const [users] = await conn.query('SELECT id, username, email, name FROM users WHERE id = ?', [userId]);

    conn.release();

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(users[0]);

  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
});

//COMMENTS
app.get('/api/comments', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [comments] = await conn.query('SELECT * FROM comments ORDER BY timestamp DESC');
    conn.release();
    res.json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ message: 'An error occurred while fetching comments' });
  }
});
app.post('/api/comments', async (req, res) => {
  const { userId, username, content } = req.body;

  if (!userId || !username || !content) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO comments (user_id, username, content) VALUES (?, ?, ?)', [userId, username, content]);
    conn.release();
    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'An error occurred while adding comment' });
  }
});
app.put('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;

  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query('UPDATE comments SET content = ? WHERE id = ? AND user_id = ?', [content, id, userId]);
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    res.json({ message: 'Comment updated' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query('DELETE FROM comments WHERE id = ? AND user_id = ?', [id, userId]);
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});