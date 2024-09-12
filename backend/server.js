const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MySQL Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',     // Replace with your DB host
  user: 'root',          // Replace with your DB user
  password: 'lakshya0408',  // Replace with your DB password
  database: 'balaji_db' // Replace with your DB name
});

// Connect to the Database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// API endpoint to handle form data submission
app.post('/api/submit', (req, res) => {
  const { personId, lastName, firstName, address, city } = req.body;
  
  const query = 'INSERT INTO persons (personId, lastName, firstName, address, city) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [personId, lastName, firstName, address, city], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      res.status(200).send('Data successfully inserted');
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
