const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');

// middleware
app.use(express.json());

//route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.use('/api/users', userRoutes);

app.use(notFound);

module.exports = app;