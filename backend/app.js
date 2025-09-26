const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');
const cors = require("cors");
const path = require("path");


// Izinkan akses dari React (5173)
app.use(cors());

// middleware
app.use(express.json());

//route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.use('/api/users', userRoutes);

app.use('/api/items', itemRoutes);

// bikin folder uploads bisa diakses publik
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(notFound);

module.exports = app;