require('dotenv').config();
const express = require('express');
const connectDB=require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ message: 'Pong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
