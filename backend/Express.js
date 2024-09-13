// server.js or app.js

const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Define the /api/persons route
app.get('/api/persons', (req, res) => {
  // Sample data or fetch data from the database
  res.json([{ personId: 1, lastName: 'Doe', firstName: 'John', address: '123 Main St', city: 'New York' }]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
