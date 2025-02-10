// Import Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define the /ping route
app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

// Set the port the app will listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
