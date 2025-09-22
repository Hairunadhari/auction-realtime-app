require('dotenv').config();

const connectDB  = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// ?koneksi kdatabase
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});