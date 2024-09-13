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
  database: 'balaji_db'  // Replace with your DB name
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

// API endpoint to fetch all persons
app.get('/api/persons', (req, res) => {
  const query = 'SELECT * FROM persons'; // Replace 'persons' with your table name

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results); // Send the fetched data as JSON
  });
});

// API endpoint to update a person
app.put('/api/persons/:personId', (req, res) => {
  const { personId } = req.params;
  const { lastName, firstName, address, city } = req.body;

  const query = 'UPDATE persons SET lastName = ?, firstName = ?, address = ?, city = ? WHERE personId = ?';
  db.query(query, [lastName, firstName, address, city, personId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Person not found');
    } else {
      res.status(200).send('Data successfully updated');
    }
  });
});

// API endpoint to delete a person
app.delete('/api/persons/:personId', (req, res) => {
  const { personId } = req.params;

  const query = 'DELETE FROM persons WHERE personId = ?';
  db.query(query, [personId], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Person not found');
    } else {
      res.status(200).send('Data successfully deleted');
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
