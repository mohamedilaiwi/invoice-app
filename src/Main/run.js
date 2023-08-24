import express from 'express';
import { GetAllInvoices } from '../SQL_STORE/Server.mjs';

// Create an instance of the Express app
const app = express();

// Define a route for the 'GET' request
app.get('/api/data', (req, res) => {
  // Simulate data for the response
  const [rows] = GetAllInvoices();

  // Send the data as JSON response
  res.json(rows);
});

// Start the server on port 3000
const port = 3036;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});